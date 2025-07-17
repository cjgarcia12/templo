import * as yup from 'yup';

// Phone number regex for (XXX) XXX-XXXX format
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

// Email regex
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const youthCampRegistrationSchema = yup.object({
  // Personal Information
  participantName: yup
    .string()
    .required('Participant name is required')
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
    
  parentGuardianName: yup
    .string()
    .required('Parent/Guardian name is required')
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
    
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['Male', 'Female', 'Other'], 'Gender must be Male, Female, or Other'),
    
  age: yup
    .number()
    .required('Age is required')
    .integer('Age must be a whole number')
    .min(8, 'Minimum age is 8 years')
    .max(18, 'Maximum age is 18 years'),

  // Contact Information
  contactPhone: yup
    .string()
    .required('Contact phone is required')
    .matches(phoneRegex, 'Please enter a valid phone number (XXX) XXX-XXXX'),
    
  contactEmail: yup
    .string()
    .required('Contact email is required')
    .email('Please enter a valid email address')
    .matches(emailRegex, 'Please enter a valid email address')
    .lowercase(),
    
  emergencyContactName: yup
    .string()
    .required('Emergency contact name is required')
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
    
  emergencyContactPhone: yup
    .string()
    .required('Emergency contact phone is required')
    .matches(phoneRegex, 'Please enter a valid phone number (XXX) XXX-XXXX'),
    
  emergencyContactRelation: yup
    .string()
    .required('Emergency contact relation is required')
    .trim()
    .max(50, 'Relation cannot exceed 50 characters'),

  // Special Requirements (optional)
  accommodations: yup
    .string()
    .default('')
    .max(500, 'Accommodations cannot exceed 500 characters'),
    
  medicalConditions: yup
    .string()
    .default('')
    .max(500, 'Medical conditions cannot exceed 500 characters'),
    
  allergies: yup
    .string()
    .default('')
    .max(500, 'Allergies cannot exceed 500 characters'),
    
  dietaryRestrictions: yup
    .string()
    .default('')
    .max(500, 'Dietary restrictions cannot exceed 500 characters'),

  // Legal
  waiverAccepted: yup
    .boolean()
    .required('Waiver must be accepted')
    .oneOf([true], 'Waiver must be accepted to complete registration'),
    
  parentSignature: yup
    .string()
    .required('Parent/Guardian signature is required')
    .trim()
    .min(2, 'Signature must be at least 2 characters')
    .max(100, 'Signature cannot exceed 100 characters'),

  // Camp Information (optional, will be set by server)
  campYear: yup
    .number()
    .optional()
    .integer('Camp year must be a whole number')
    .min(2020, 'Invalid camp year')
    .max(2030, 'Invalid camp year'),
    
  campDates: yup
    .string()
    .optional()
    .max(100, 'Camp dates cannot exceed 100 characters')
});

export type YouthCampRegistrationInput = yup.InferType<typeof youthCampRegistrationSchema>; 