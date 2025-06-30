"use client";

import { useState } from 'react';
// import { useLanguage } from '@/context/LanguageContext';

interface FormData {
  participantName: string;
  parentGuardianName: string;
  gender: string;
  age: string;
  contactPhone: string;
  contactEmail: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  accommodations: string;
  medicalConditions: string;
  allergies: string;
  dietaryRestrictions: string;
  waiverAccepted: boolean;
  parentSignature: string;
}

const initialFormData: FormData = {
  participantName: '',
  parentGuardianName: '',
  gender: '',
  age: '',
  contactPhone: '',
  contactEmail: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelation: '',
  accommodations: '',
  medicalConditions: '',
  allergies: '',
  dietaryRestrictions: '',
  waiverAccepted: false,
  parentSignature: ''
};

export default function YouthCampForm() {
  // const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'contactPhone' || name === 'emergencyContactPhone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    // Required field validation
    if (!formData.participantName.trim()) newErrors.participantName = 'Participant name is required';
    if (!formData.parentGuardianName.trim()) newErrors.parentGuardianName = 'Parent/Guardian name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    if (!formData.emergencyContactRelation.trim()) newErrors.emergencyContactRelation = 'Emergency contact relation is required';
    if (!formData.parentSignature.trim()) newErrors.parentSignature = 'Parent/Guardian signature is required';
    
    // Age validation
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 8 || age > 18) {
      newErrors.age = 'Age must be between 8 and 18 years';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (formData.contactPhone && !phoneRegex.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }
    if (formData.emergencyContactPhone && !phoneRegex.test(formData.emergencyContactPhone)) {
      newErrors.emergencyContactPhone = 'Please enter a valid phone number';
    }
    
    // Waiver validation
    if (!formData.waiverAccepted) {
      newErrors.waiverAccepted = true;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/youth-camp/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage('Registration submitted successfully! We will contact you soon.');
        setFormData(initialFormData);
        setErrors({});
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Registration failed. Please try again.');
      }
    } catch (error: unknown) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-brown mb-4">
          Youth Camp Registration 2025
        </h2>
        <p className="text-lg text-text-dark/80 mb-2">
          August 6-9, 2025
        </p>
        <p className="text-text-dark/70">
          Ages 13 and up • A fun-filled Christian camp experience
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {submitMessage}
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {submitMessage}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary-brown mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="participantName" className="block text-sm font-medium text-gray-700 mb-1">
                Participant Name *
              </label>
              <input
                type="text"
                id="participantName"
                name="participantName"
                value={formData.participantName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.participantName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter participant's full name"
              />
              {errors.participantName && <p className="text-red-500 text-sm mt-1">{errors.participantName}</p>}
            </div>

            <div>
              <label htmlFor="parentGuardianName" className="block text-sm font-medium text-gray-700 mb-1">
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                id="parentGuardianName"
                name="parentGuardianName"
                value={formData.parentGuardianName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.parentGuardianName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter parent/guardian's full name"
              />
              {errors.parentGuardianName && <p className="text-red-500 text-sm mt-1">{errors.parentGuardianName}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.gender ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="8"
                max="18"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Age (8-18)"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary-brown mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone *
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.contactPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="(XXX) XXX-XXXX"
              />
              {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
              />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary-brown mb-4">Emergency Contact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact Name *
              </label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Emergency contact full name"
              />
              {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
            </div>

            <div>
              <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact Phone *
              </label>
              <input
                type="tel"
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="(XXX) XXX-XXXX"
              />
              {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
            </div>

            <div>
              <label htmlFor="emergencyContactRelation" className="block text-sm font-medium text-gray-700 mb-1">
                Relationship *
              </label>
              <input
                type="text"
                id="emergencyContactRelation"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.emergencyContactRelation ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Grandparent, Aunt, etc."
              />
              {errors.emergencyContactRelation && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactRelation}</p>}
            </div>
          </div>
        </div>

        {/* Special Requirements */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary-brown mb-4">Special Requirements & Medical Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="accommodations" className="block text-sm font-medium text-gray-700 mb-1">
                Special Accommodations
              </label>
              <textarea
                id="accommodations"
                name="accommodations"
                value={formData.accommodations}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold"
                placeholder="Any special accommodations needed..."
              />
            </div>

            <div>
              <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-1">
                Medical Conditions
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold"
                placeholder="Any medical conditions we should know about..."
              />
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                Allergies
              </label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold"
                placeholder="Any allergies (food, medication, environmental)..."
              />
            </div>

            <div>
              <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
                Dietary Restrictions
              </label>
              <textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold"
                placeholder="Any dietary restrictions or preferences..."
              />
            </div>
          </div>
        </div>

        {/* Waiver */}
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-xl font-semibold text-red-800 mb-4">Liability Waiver & Agreement</h3>
          
          <div className="bg-white p-4 rounded border text-sm text-gray-700 mb-4 max-h-40 overflow-y-auto">
            <p className="mb-3">
              <strong>RELEASE AND WAIVER OF LIABILITY</strong>
            </p>
            <p className="mb-3">
              I, the undersigned parent/guardian, understand that participation in the Youth Camp activities involves inherent risks, including but not limited to physical injury, property damage, or other harm. In consideration of my child&apos;s participation in the Youth Camp program organized by Templo Adoracion Y Alabanza, I hereby:
            </p>
            <p className="mb-3">
              1. <strong>RELEASE AND HOLD HARMLESS</strong> Templo Adoracion Y Alabanza, its pastors, staff, volunteers, and representatives from any and all claims, demands, or causes of action arising out of or related to any loss, damage, or injury, including death, that may be sustained by my child or by any property belonging to my child while participating in the Youth Camp or while on the premises where the activities are being conducted.
            </p>
            <p className="mb-3">
              2. <strong>ASSUME ALL RISKS</strong> associated with my child&apos;s participation, including but not limited to: risks of injury from activities, premises conditions, equipment use, transportation, and other participants.
            </p>
            <p className="mb-3">
              3. <strong>AUTHORIZE MEDICAL TREATMENT</strong> in case of emergency. I give permission for camp staff to authorize emergency medical treatment for my child if I cannot be reached immediately.
            </p>
            <p className="mb-3">
              4. <strong>ACKNOWLEDGE</strong> that I have read this waiver and understand its terms, and I sign it voluntarily with full knowledge of its significance.
            </p>
            <p>
              This waiver shall be binding upon my heirs, successors, and assigns.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="waiverAccepted"
                name="waiverAccepted"
                checked={formData.waiverAccepted}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-primary-gold focus:ring-primary-gold border-gray-300 rounded"
              />
              <label htmlFor="waiverAccepted" className="text-sm text-gray-700">
                <span className="font-medium">I have read, understood, and agree to the terms of the liability waiver above. *</span>
                <br />
                <span className="text-red-600">Required: You must accept this waiver to complete registration.</span>
              </label>
            </div>
            {errors.waiverAccepted && (
              <p className="text-red-500 text-sm">You must accept the waiver to complete registration.</p>
            )}

            <div>
              <label htmlFor="parentSignature" className="block text-sm font-medium text-gray-700 mb-1">
                Parent/Guardian Digital Signature *
              </label>
              <input
                type="text"
                id="parentSignature"
                name="parentSignature"
                value={formData.parentSignature}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.parentSignature ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Type your full name as digital signature"
              />
              {errors.parentSignature && <p className="text-red-500 text-sm mt-1">{errors.parentSignature}</p>}
              <p className="text-xs text-gray-500 mt-1">
                By typing your name above, you are providing a digital signature and agreeing to all terms.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-md font-medium text-white transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-brown hover:bg-primary-brown/90 focus:outline-none focus:ring-2 focus:ring-primary-gold'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Registration...
              </span>
            ) : (
              'Submit Registration'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 