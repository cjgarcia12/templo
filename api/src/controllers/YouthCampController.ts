import { Request, Response } from 'express';
import YouthCampRegistration, { IYouthCampRegistration } from '@/models/YouthCampRegistration';
import connectDB from '@/db/connection';
import { youthCampRegistrationSchema, YouthCampRegistrationInput } from '@/validation/youthCampValidation';
import { AppError } from '@/middleware/errorHandler';

export class YouthCampController {
  /**
   * Create a new youth camp registration
   */
  async createRegistration(data: YouthCampRegistrationInput): Promise<IYouthCampRegistration> {
    try {
      await connectDB();

      // Validate input data
      const validatedData = await youthCampRegistrationSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true
      });

      // Check for duplicate registration (same participant name and email)
      const existingRegistration = await YouthCampRegistration.findOne({
        participantName: validatedData.participantName,
        contactEmail: validatedData.contactEmail,
        campYear: validatedData.campYear || new Date().getFullYear(),
        status: { $ne: 'cancelled' }
      });

      if (existingRegistration) {
        throw new AppError(
          'A registration with this participant name and email already exists',
          400
        );
      }

      // Create new registration
      const registration = new YouthCampRegistration({
        ...validatedData,
        campYear: validatedData.campYear || new Date().getFullYear(),
        campDates: validatedData.campDates || 'August 6-9, 2025'
      });

      await registration.save();

      return registration;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error creating youth camp registration:', error);
      throw new AppError('Failed to create registration', 500);
    }
  }

  /**
   * Get all registrations with optional filtering
   */
  async getAllRegistrations(filters: {
    status?: 'pending' | 'approved' | 'cancelled';
    year?: number;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ registrations: IYouthCampRegistration[]; total: number }> {
    try {
      await connectDB();

      // Build query
      const query: Record<string, any> = {};
      if (filters.status) query.status = filters.status;
      if (filters.year) query.campYear = filters.year;

      // Get total count
      const total = await YouthCampRegistration.countDocuments(query);

      // Get paginated results
      const registrations = await YouthCampRegistration.find(query)
        .sort({ registrationDate: -1 })
        .limit(filters.limit || 50)
        .skip(filters.offset || 0)
        .select('-__v')
        .lean();

      return { registrations, total };
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw new AppError('Failed to fetch registrations', 500);
    }
  }

  /**
   * Get registration by ID
   */
  async getRegistrationById(id: string): Promise<IYouthCampRegistration | null> {
    try {
      await connectDB();

      const registration = await YouthCampRegistration.findById(id).select('-__v');
      
      if (!registration) {
        throw new AppError('Registration not found', 404);
      }

      return registration;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error fetching registration by ID:', error);
      throw new AppError('Failed to fetch registration', 500);
    }
  }

  /**
   * Update registration status
   */
  async updateRegistrationStatus(
    id: string, 
    status: 'pending' | 'approved' | 'cancelled'
  ): Promise<IYouthCampRegistration> {
    try {
      await connectDB();

      const registration = await YouthCampRegistration.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!registration) {
        throw new AppError('Registration not found', 404);
      }

      return registration;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error updating registration status:', error);
      throw new AppError('Failed to update registration status', 500);
    }
  }

  /**
   * Delete registration
   */
  async deleteRegistration(id: string): Promise<void> {
    try {
      await connectDB();

      const registration = await YouthCampRegistration.findByIdAndDelete(id);

      if (!registration) {
        throw new AppError('Registration not found', 404);
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error deleting registration:', error);
      throw new AppError('Failed to delete registration', 500);
    }
  }

  /**
   * Get registration statistics
   */
  async getRegistrationStats(year?: number): Promise<{
    total: number;
    byStatus: Record<string, number>;
    bySex: Record<string, number>;
    averageAge: number;
  }> {
    try {
      await connectDB();

      const query = year ? { campYear: year } : {};

      // Get total count
      const total = await YouthCampRegistration.countDocuments(query);

      // Get status breakdown
      const statusStats = await YouthCampRegistration.aggregate([
        { $match: query },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);

      const byStatus = statusStats.reduce((acc: Record<string, number>, stat: any) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {} as Record<string, number>);

      // Get sex breakdown
      const sexStats = await YouthCampRegistration.aggregate([
        { $match: query },
        { $group: { _id: '$sex', count: { $sum: 1 } } }
      ]);

      const bySex = sexStats.reduce((acc: Record<string, number>, stat: any) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {} as Record<string, number>);

      // Get average age
      const ageStats = await YouthCampRegistration.aggregate([
        { $match: query },
        { $group: { _id: null, averageAge: { $avg: '$age' } } }
      ]);

      const averageAge = ageStats.length > 0 ? Math.round(ageStats[0].averageAge * 10) / 10 : 0;

      return {
        total,
        byStatus,
        bySex,
        averageAge
      };
    } catch (error) {
      console.error('Error getting registration statistics:', error);
      throw new AppError('Failed to get registration statistics', 500);
    }
  }

  /**
   * Check if registration is still open
   */
  isRegistrationOpen(): boolean {
    // Registration is open until August 10, 2025
    const registrationDeadline = new Date('2025-08-10T23:59:59');
    const now = new Date();
    
    return now < registrationDeadline;
  }

  /**
   * Get registration deadline info
   */
  getRegistrationInfo(): {
    isOpen: boolean;
    deadline: string;
    daysRemaining: number;
    campDates: string;
  } {
    const deadline = new Date('2025-08-10T23:59:59');
    const now = new Date();
    const isOpen = now < deadline;
    const daysRemaining = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    return {
      isOpen,
      deadline: deadline.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      daysRemaining,
      campDates: 'August 6-9, 2025'
    };
  }
} 