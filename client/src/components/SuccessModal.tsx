"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrationId?: string;
  participantName?: string;
}

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  registrationId, 
  participantName 
}: SuccessModalProps) {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
            <svg 
              className="w-8 h-8 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center text-primary-brown mb-4">
            {t('registration_successful')}
          </h3>

          {/* Message */}
          <div className="text-center mb-6">
            <p className="text-gray-700 mb-3">
              {participantName ? `${participantName}'s` : ''} {t('registration_submitted_successfully')}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>{t('camp_dates')}:</strong> {t('youth_camp_dates')}
            </p>
            {registrationId && (
              <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <strong>{t('registration_id')}:</strong> {registrationId}
              </p>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">{t('whats_next')}</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>{t('review_registration_2_3_days')}</li>
              <li>{t('receive_confirmation_email')}</li>
              <li>{t('contact_us_questions')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-primary-brown/5 border border-primary-brown/20 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-primary-brown mb-2">{t('contact_us_modal')}</h4>
            <p className="text-sm text-gray-700">
              <strong>{t('address')}:</strong> 209 S 7th Street, Wilmington, NC<br/>
              <strong>{t('phone')}:</strong> Contact church for details<br/>
              <strong>{t('questions')}</strong> Speak with Pastor or church staff
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-primary-brown text-white px-4 py-2 rounded-md hover:bg-primary-brown/90 transition-colors font-medium"
            >
              {t('submit_another_registration')}
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              {t('return_to_home')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 