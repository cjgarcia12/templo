import mongoose, { Schema, Document } from 'mongoose';

export interface IYouthCampRegistration extends Document {
  // Personal Information
  participantName: string;
  parentGuardianName: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  
  // Contact Information
  contactPhone: string;
  contactEmail: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  
  // Special Requirements
  accommodations: string;
  medicalConditions: string;
  allergies: string;
  dietaryRestrictions: string;
  
  // Legal
  waiverAccepted: boolean;
  parentSignature: string;
  
  // Registration Details
  registrationDate: Date;
  status: 'pending' | 'approved' | 'cancelled';
  
  // Camp Information
  campYear: number;
  campDates: string;
}

const YouthCampRegistrationSchema = new Schema<IYouthCampRegistration>({
  // Personal Information
  participantName: {
    type: String,
    required: [true, 'Participant name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    minlength: [2, 'Name must be at least 2 characters']
  },
  parentGuardianName: {
    type: String,
    required: [true, 'Parent/Guardian name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    minlength: [2, 'Name must be at least 2 characters']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: 'Gender must be Male, Female, or Other'
    }
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [8, 'Minimum age is 8 years'],
    max: [18, 'Maximum age is 18 years'],
    validate: {
      validator: Number.isInteger,
      message: 'Age must be a whole number'
    }
  },
  
  // Contact Information
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true,
    match: [/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number (XXX) XXX-XXXX']
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  emergencyContactName: {
    type: String,
    required: [true, 'Emergency contact name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    minlength: [2, 'Name must be at least 2 characters']
  },
  emergencyContactPhone: {
    type: String,
    required: [true, 'Emergency contact phone is required'],
    trim: true,
    match: [/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number (XXX) XXX-XXXX']
  },
  emergencyContactRelation: {
    type: String,
    required: [true, 'Emergency contact relation is required'],
    trim: true,
    maxlength: [50, 'Relation cannot exceed 50 characters']
  },
  
  // Special Requirements
  accommodations: {
    type: String,
    default: '',
    maxlength: [500, 'Accommodations cannot exceed 500 characters'],
    trim: true
  },
  medicalConditions: {
    type: String,
    default: '',
    maxlength: [500, 'Medical conditions cannot exceed 500 characters'],
    trim: true
  },
  allergies: {
    type: String,
    default: '',
    maxlength: [500, 'Allergies cannot exceed 500 characters'],
    trim: true
  },
  dietaryRestrictions: {
    type: String,
    default: '',
    maxlength: [500, 'Dietary restrictions cannot exceed 500 characters'],
    trim: true
  },
  
  // Legal
  waiverAccepted: {
    type: Boolean,
    required: [true, 'Waiver must be accepted'],
    validate: {
      validator: function(v: boolean) {
        return v === true;
      },
      message: 'Waiver must be accepted to complete registration'
    }
  },
  parentSignature: {
    type: String,
    required: [true, 'Parent/Guardian signature is required'],
    trim: true,
    minlength: [2, 'Signature must be at least 2 characters'],
    maxlength: [100, 'Signature cannot exceed 100 characters']
  },
  
  // Registration Details
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'approved', 'cancelled'],
      message: 'Status must be pending, approved, or cancelled'
    },
    default: 'pending'
  },
  
  // Camp Information
  campYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: [2020, 'Invalid camp year'],
    max: [2030, 'Invalid camp year']
  },
  campDates: {
    type: String,
    default: 'August 6-9, 2025',
    trim: true,
    maxlength: [100, 'Camp dates cannot exceed 100 characters']
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
YouthCampRegistrationSchema.index({ registrationDate: -1 });
YouthCampRegistrationSchema.index({ status: 1 });
YouthCampRegistrationSchema.index({ campYear: 1 });
YouthCampRegistrationSchema.index({ contactEmail: 1 });
YouthCampRegistrationSchema.index({ participantName: 1 });

// Compound index for duplicate checking
YouthCampRegistrationSchema.index({ 
  participantName: 1, 
  contactEmail: 1, 
  campYear: 1 
});

const YouthCampRegistration = mongoose.model<IYouthCampRegistration>('YouthCampRegistration', YouthCampRegistrationSchema);

export default YouthCampRegistration; 