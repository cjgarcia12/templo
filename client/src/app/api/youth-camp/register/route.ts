import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import YouthCampRegistration from '@/models/YouthCampRegistration';
import { requireApiKey } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'participantName',
      'parentGuardianName',
      'gender',
      'age',
      'contactPhone',
      'contactEmail',
      'emergencyContactName',
      'emergencyContactPhone',
      'emergencyContactRelation',
      'waiverAccepted',
      'parentSignature'
    ];
    
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // Validate waiver acceptance
    if (!body.waiverAccepted) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Waiver must be accepted to complete registration' 
        },
        { status: 400 }
      );
    }
    
    // Validate age range
    const age = parseInt(body.age);
    if (isNaN(age) || age < 8 || age > 18) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Age must be between 8 and 18 years' 
        },
        { status: 400 }
      );
    }
    
    // Check for duplicate registration (same participant name and email)
    const existingRegistration = await YouthCampRegistration.findOne({
      participantName: body.participantName,
      contactEmail: body.contactEmail,
      campYear: new Date().getFullYear(),
      status: { $ne: 'cancelled' }
    });
    
    if (existingRegistration) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A registration with this participant name and email already exists' 
        },
        { status: 400 }
      );
    }
    
    // Create new registration
    const registration = new YouthCampRegistration({
      participantName: body.participantName?.trim(),
      parentGuardianName: body.parentGuardianName?.trim(),
      gender: body.gender,
      age: age,
      contactPhone: body.contactPhone?.trim(),
      contactEmail: body.contactEmail?.trim()?.toLowerCase(),
      emergencyContactName: body.emergencyContactName?.trim(),
      emergencyContactPhone: body.emergencyContactPhone?.trim(),
      emergencyContactRelation: body.emergencyContactRelation?.trim(),
      accommodations: body.accommodations?.trim() || '',
      medicalConditions: body.medicalConditions?.trim() || '',
      allergies: body.allergies?.trim() || '',
      dietaryRestrictions: body.dietaryRestrictions?.trim() || '',
      waiverAccepted: body.waiverAccepted,
      parentSignature: body.parentSignature?.trim(),
      campYear: new Date().getFullYear(),
      campDates: 'August 6-9, 2025'
    });
    
    await registration.save();
    
    return NextResponse.json({
      success: true,
      message: 'Youth camp registration submitted successfully!',
      registrationId: registration._id,
      data: {
        participantName: registration.participantName,
        campDates: registration.campDates,
        registrationDate: registration.registrationDate,
        status: registration.status
      }
    });
    
  } catch (error) {
    console.error('Youth camp registration error:', error);
    
    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      const mongooseError = error as Error & { errors: Record<string, { message: string }> };
      const validationErrors = Object.values(mongooseError.errors).map(err => err.message);
      return NextResponse.json(
        { 
          success: false, 
          error: `Validation failed: ${validationErrors.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit registration. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve registrations (for admin use)
export async function GET(request: NextRequest) {
  try {
    // Require API key for admin access
    const authError = requireApiKey(request);
    if (authError) return authError;
    
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const year = searchParams.get('year');
    
    // Build query
    const query: { status?: string; campYear?: number } = {};
    if (status) query.status = status;
    if (year) query.campYear = parseInt(year);
    
    const registrations = await YouthCampRegistration.find(query)
      .sort({ registrationDate: -1 })
      .select('-__v')
      .lean();
    
    return NextResponse.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
    
  } catch (error) {
    console.error('Failed to fetch registrations:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch registrations' 
      },
      { status: 500 }
    );
  }
} 