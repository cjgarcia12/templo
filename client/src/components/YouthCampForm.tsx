"use client";

import { useState } from 'react';
import { publicPost } from '@/lib/api';
import SuccessModal from './SuccessModal';
import WaiverModal from './WaiverModal';
import { useLanguage } from '@/context/LanguageContext';

interface FormData {
  participantName: string;
  parentGuardianName: string;
  sex: string;
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
  sex: '',
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
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWaiverModal, setShowWaiverModal] = useState(false);
  const [registrationData, setRegistrationData] = useState<{
    registrationId?: string;
    participantName?: string;
  }>({});

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
    if (!formData.participantName.trim()) newErrors.participantName = t('participant_name_required');
    if (!formData.parentGuardianName.trim()) newErrors.parentGuardianName = t('parent_guardian_name_required');
    if (!formData.sex) newErrors.sex = t('sex_required');
    if (!formData.age) newErrors.age = t('age_required');
    if (!formData.contactPhone.trim()) newErrors.contactPhone = t('contact_phone_required');
    if (!formData.contactEmail.trim()) newErrors.contactEmail = t('contact_email_required');
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = t('emergency_contact_name_required');
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = t('emergency_contact_phone_required');
    if (!formData.emergencyContactRelation.trim()) newErrors.emergencyContactRelation = t('emergency_contact_relation_required');
    if (!formData.parentSignature.trim()) newErrors.parentSignature = t('parent_signature_required');
    
    // Age validation
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 13 ) {
      newErrors.age = t('age_must_be_13_older');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = t('valid_email_address');
    }
    
    // Phone validation
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (formData.contactPhone && !phoneRegex.test(formData.contactPhone)) {
      newErrors.contactPhone = t('valid_phone_number');
    }
    if (formData.emergencyContactPhone && !phoneRegex.test(formData.emergencyContactPhone)) {
      newErrors.emergencyContactPhone = t('valid_phone_number');
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
      const result = await publicPost<{ success: boolean; error?: string; registrationId?: string }>('/youth-camp/register', formData);
      
      if (result.success) {
        setRegistrationData({
          registrationId: result.registrationId,
          participantName: formData.participantName
        });
        setShowSuccessModal(true);
        setFormData(initialFormData);
        setErrors({});
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || t('registration_failed'));
      }
    } catch (error: unknown) {
      setSubmitStatus('error');
      setSubmitMessage(t('network_error'));
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setSubmitStatus('idle');
    setRegistrationData({});
  };

  return (
    <>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        registrationId={registrationData.registrationId}
        participantName={registrationData.participantName}
      />

      {/* Waiver Modal */}
      <WaiverModal
        isOpen={showWaiverModal}
        onClose={() => setShowWaiverModal(false)}
        participantAge={parseInt(formData.age) || undefined}
      />

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-brown mb-4">
            {t('youth_camp_registration')}
          </h2>
          <p className="text-lg text-text-dark/80 mb-2">
            {t('youth_camp_dates')}
          </p>
          <p className="text-text-dark/70">
            {t('youth_camp_description')}
          </p>
        </div>

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
          <h3 className="text-xl font-semibold text-primary-brown mb-4">{t('personal_information')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="participantName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('participant_name')} *
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
                placeholder={t('participant_name_placeholder')}
              />
              {errors.participantName && <p className="text-red-500 text-sm mt-1">{errors.participantName}</p>}
            </div>

            <div>
              <label htmlFor="parentGuardianName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('parent_guardian_name')} *
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
                placeholder={t('parent_guardian_name_placeholder')}
              />
              {errors.parentGuardianName && <p className="text-red-500 text-sm mt-1">{errors.parentGuardianName}</p>}
            </div>

            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
                {t('sex')} *
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.sex ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{t('select_sex')}</option>
                <option value="Male">{t('male')}</option>
                <option value="Female">{t('female')}</option>
              </select>
              {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                {t('age')} *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="13"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('age_placeholder')}
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary-brown mb-4">{t('contact_information')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                {t('contact_phone')} *
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
                placeholder={t('contact_phone_placeholder')}
              />
              {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                {t('contact_email')} *
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
                placeholder={t('contact_email_placeholder')}
              />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary-brown mb-4">{t('emergency_contact')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('emergency_contact_name')} *
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
                placeholder={t('emergency_contact_name_placeholder')}
              />
              {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
            </div>

            <div>
              <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                {t('emergency_contact_phone')} *
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
                placeholder={t('emergency_contact_phone_placeholder')}
              />
              {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
            </div>

            <div>
              <label htmlFor="emergencyContactRelation" className="block text-sm font-medium text-gray-700 mb-1">
                {t('relationship')} *
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
                placeholder={t('relationship_placeholder')}
              />
              {errors.emergencyContactRelation && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactRelation}</p>}
            </div>
          </div>
        </div>

        {/* Special Requirements */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary-brown mb-4">{t('special_requirements_medical')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="accommodations" className="block text-sm font-medium text-gray-700 mb-1">
                {t('special_accommodations')}
              </label>
              <textarea
                id="accommodations"
                name="accommodations"
                value={formData.accommodations}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold"
                placeholder={t('special_accommodations_placeholder')}
              />
            </div>

            <div>
              <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-1">
                {t('medical_conditions')}
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold"
                placeholder={t('medical_conditions_placeholder')}
              />
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                {t('allergies')}
              </label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold"
                placeholder={t('allergies_placeholder')}
              />
            </div>

            <div>
              <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
                {t('dietary_restrictions')}
              </label>
              <textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold"
                placeholder={t('dietary_restrictions_placeholder')}
              />
            </div>
          </div>
        </div>

        {/* Waiver */}
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-red-800">{t('liability_waiver_agreement')}</h3>
            <button
              type="button"
              onClick={() => setShowWaiverModal(true)}
              className="text-primary-brown hover:text-primary-brown/80 underline text-sm font-medium"
            >
              {t('view_full_waiver')}
            </button>
          </div>
          
          <div className="bg-white p-4 rounded border text-sm text-gray-700 mb-4">
            <p className="mb-3">
              <strong>COMPREHENSIVE RELEASE AND WAIVER OF LIABILITY, ASSUMPTION OF RISK, AND INDEMNITY AGREEMENT</strong>
            </p>
            <p className="mb-3">
              <strong>PLEASE READ CAREFULLY - THIS IS A LEGAL DOCUMENT THAT AFFECTS YOUR LEGAL RIGHTS</strong>
            </p>
            <p className="mb-3">
              {t('waiver_summary')}
            </p>
            <p className="text-blue-600 font-medium">
              <button 
                type="button"
                onClick={() => setShowWaiverModal(true)}
                className="hover:text-blue-800 underline"
              >
                {t('click_read_complete_waiver')}
              </button>
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
                <span className="font-medium">{t('waiver_agreement_accepted')} *</span>
                <br />
                <span className="text-red-600">{t('waiver_acceptance_required')}</span>
              </label>
            </div>
            {errors.waiverAccepted && (
              <p className="text-red-500 text-sm">{t('waiver_must_be_accepted')}</p>
            )}

            <div>
              <label htmlFor="parentSignature" className="block text-sm font-medium text-gray-700 mb-1">
                {parseInt(formData.age) >= 18 ? t('digital_signature') : t('parent_guardian_digital_signature')} *
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
                placeholder={parseInt(formData.age) >= 18 ? t('digital_signature_placeholder') : t('parent_digital_signature_placeholder')}
              />
              {errors.parentSignature && <p className="text-red-500 text-sm mt-1">{errors.parentSignature}</p>}
              <p className="text-xs text-gray-500 mt-1">
                {parseInt(formData.age) >= 18 
                  ? t('digital_signature_agreement')
                  : t('adult_signature_agreement')
                }
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
                {t('submitting_registration')}
              </span>
            ) : (
              t('submit_registration')
            )}
          </button>
        </div>
      </form>
    </div>
    </>
  );
} 