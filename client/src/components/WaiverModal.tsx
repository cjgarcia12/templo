"use client";

import React, { useState } from 'react';

interface WaiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  participantAge?: number;
}

export default function WaiverModal({ isOpen, onClose, participantAge }: WaiverModalProps) {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  if (!isOpen) return null;

  const isAdult = participantAge && participantAge >= 18;

  const waiverContent = {
    en: {
      title: "COMPREHENSIVE RELEASE AND WAIVER OF LIABILITY, ASSUMPTION OF RISK, AND INDEMNITY AGREEMENT",
      subtitle: "PLEASE READ CAREFULLY - THIS IS A LEGAL DOCUMENT THAT AFFECTS YOUR LEGAL RIGHTS",
      sections: [
        {
          title: "1. ACKNOWLEDGMENT OF RISKS:",
          content: "I understand that participation in Youth Camp activities involves inherent and other risks including, but not limited to: physical injury, emotional distress, property damage, illness, permanent disability, paralysis, or death. These risks may result from the activities themselves, the conduct of participants, staff, or volunteers, the conditions of facilities or equipment, weather conditions, or the negligence of any party. I understand that these risks cannot be eliminated regardless of the care taken to avoid injuries."
        },
        {
          title: "2. ASSUMPTION OF RISK:",
          content: "I voluntarily assume all risks associated with participation in the Youth Camp, whether known or unknown, including travel to and from the camp location, accommodation, meals, recreational activities, devotional activities, and all other camp-related activities."
        },
        {
          title: "3. RELEASE AND WAIVER:",
          content: `I, for myself ${isAdult ? '' : 'and on behalf of my minor child'}, hereby release, waive, discharge, and covenant not to sue the Church, its pastors, staff, board members, volunteers, representatives, successors, and assigns from any and all liability, claims, demands, actions, and causes of action whatsoever arising out of or related to any loss, damage, or injury, including death, that may be sustained while participating in the Youth Camp or while on the premises where activities are conducted.`
        },
        {
          title: "4. INDEMNIFICATION:",
          content: `I agree to indemnify and hold harmless the Church from any loss or liability incurred as a result of ${isAdult ? 'my' : 'my child\'s'} participation in the Youth Camp, including attorney fees and costs.`
        },
        {
          title: "5. MEDICAL AUTHORIZATION:",
          content: `I authorize the Church staff to obtain emergency medical treatment for ${isAdult ? 'me' : 'my child'} if necessary. I understand that the Church will attempt to contact me in case of medical emergency, but if I cannot be reached immediately, I authorize camp staff to make medical decisions in the best interest of ${isAdult ? 'the participant' : 'my child'}. I agree to be financially responsible for any medical expenses incurred.`
        },
        {
          title: "6. TRANSPORTATION:",
          content: "I acknowledge that transportation may be provided by the Church or volunteers, and I assume all risks associated with such transportation."
        },
        {
          title: "7. CONDUCT AND DISCIPLINE:",
          content: `I understand that ${isAdult ? 'I am' : 'my child is'} expected to follow all camp rules and guidelines. The Church reserves the right to dismiss any participant whose conduct is deemed inappropriate, disruptive, or dangerous, without refund.`
        },
        {
          title: "8. MEDIA RELEASE:",
          content: `I grant permission for the Church to use photographs, videos, or other media of ${isAdult ? 'me' : 'my child'} taken during the Youth Camp for promotional, educational, or ministry purposes.`
        },
        {
          title: "9. SEVERABILITY:",
          content: "If any portion of this agreement is deemed invalid, the remainder shall continue in full force and effect."
        },
        {
          title: "10. GOVERNING LAW:",
          content: "This agreement shall be governed by the laws of the state where the Church is located."
        }
      ],
      finalStatement: "I HAVE READ THIS WAIVER AND RELEASE, UNDERSTAND ITS TERMS, UNDERSTAND THAT I HAVE GIVEN UP SUBSTANTIAL RIGHTS BY SIGNING IT, AND SIGN IT FREELY AND VOLUNTARILY WITHOUT ANY INDUCEMENT."
    },
    es: {
      title: "LIBERACIÓN INTEGRAL Y EXENCIÓN DE RESPONSABILIDAD, ASUNCIÓN DE RIESGO, Y ACUERDO DE INDEMNIZACIÓN",
      subtitle: "LEA CUIDADOSAMENTE - ESTE ES UN DOCUMENTO LEGAL QUE AFECTA SUS DERECHOS LEGALES",
      sections: [
        {
          title: "1. RECONOCIMIENTO DE RIESGOS:",
          content: "Entiendo que la participación en las actividades del Campamento Juvenil involucra riesgos inherentes y otros riesgos incluyendo, pero no limitado a: lesiones físicas, angustia emocional, daño a la propiedad, enfermedad, discapacidad permanente, parálisis, o muerte. Estos riesgos pueden resultar de las actividades mismas, la conducta de participantes, personal, o voluntarios, las condiciones de las instalaciones o equipo, condiciones climáticas, o la negligencia de cualquier parte. Entiendo que estos riesgos no pueden ser eliminados sin importar el cuidado tomado para evitar lesiones."
        },
        {
          title: "2. ASUNCIÓN DE RIESGO:",
          content: "Voluntariamente asumo todos los riesgos asociados con la participación en el Campamento Juvenil, sean conocidos o desconocidos, incluyendo viaje hacia y desde la ubicación del campamento, alojamiento, comidas, actividades recreativas, actividades devocionales, y todas las demás actividades relacionadas con el campamento."
        },
        {
          title: "3. LIBERACIÓN Y EXENCIÓN:",
          content: `Yo, por mí mismo ${isAdult ? '' : 'y en nombre de mi hijo menor'}, por este medio libero, exonero, descargo, y me comprometo a no demandar a la Iglesia, sus pastores, personal, miembros de la junta, voluntarios, representantes, sucesores, y cesionarios de toda responsabilidad, reclamos, demandas, acciones, y causas de acción de cualquier tipo que surjan de o estén relacionadas con cualquier pérdida, daño, o lesión, incluyendo la muerte, que pueda ser sufrida mientras participa en el Campamento Juvenil o mientras esté en las instalaciones donde se realizan las actividades.`
        },
        {
          title: "4. INDEMNIZACIÓN:",
          content: `Acepto indemnizar y eximir de responsabilidad a la Iglesia de cualquier pérdida o responsabilidad incurrida como resultado de ${isAdult ? 'mi' : 'la'} participación de ${isAdult ? '' : 'mi hijo'} en el Campamento Juvenil, incluyendo honorarios de abogados y costos.`
        },
        {
          title: "5. AUTORIZACIÓN MÉDICA:",
          content: `Autorizo al personal de la Iglesia a obtener tratamiento médico de emergencia para ${isAdult ? 'mí' : 'mi hijo'} si es necesario. Entiendo que la Iglesia intentará contactarme en caso de emergencia médica, pero si no pueden localizarme inmediatamente, autorizo al personal del campamento a tomar decisiones médicas en el mejor interés ${isAdult ? 'del participante' : 'de mi hijo'}. Acepto ser financieramente responsable por cualquier gasto médico incurrido.`
        },
        {
          title: "6. TRANSPORTE:",
          content: "Reconozco que el transporte puede ser proporcionado por la Iglesia o voluntarios, y asumo todos los riesgos asociados con dicho transporte."
        },
        {
          title: "7. CONDUCTA Y DISCIPLINA:",
          content: `Entiendo que ${isAdult ? 'se espera que yo siga' : 'se espera que mi hijo siga'} todas las reglas y pautas del campamento. La Iglesia se reserva el derecho de despedir a cualquier participante cuya conducta sea considerada inapropiada, disruptiva, o peligrosa, sin reembolso.`
        },
        {
          title: "8. LIBERACIÓN DE MEDIOS:",
          content: `Otorgo permiso para que la Iglesia use fotografías, videos, u otros medios ${isAdult ? 'míos' : 'de mi hijo'} tomados durante el Campamento Juvenil para propósitos promocionales, educativos, o ministeriales.`
        },
        {
          title: "9. SEPARABILIDAD:",
          content: "Si cualquier porción de este acuerdo se considera inválida, el resto continuará en pleno vigor y efecto."
        },
        {
          title: "10. LEY APLICABLE:",
          content: "Este acuerdo se regirá por las leyes del estado donde se encuentra ubicada la Iglesia."
        }
      ],
      finalStatement: "HE LEÍDO ESTA EXENCIÓN Y LIBERACIÓN, ENTIENDO SUS TÉRMINOS, ENTIENDO QUE HE RENUNCIADO A DERECHOS SUSTANCIALES AL FIRMARLA, Y LA FIRMO LIBRE Y VOLUNTARIAMENTE SIN NINGUNA INDUCCIÓN."
    }
  };

  const content = waiverContent[language];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-primary-brown">
              {language === 'en' ? 'Youth Camp Waiver' : 'Exención del Campamento Juvenil'}
            </h2>
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-2 mx-4">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                language === 'en' 
                  ? 'bg-primary-brown text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                language === 'es' 
                  ? 'bg-primary-brown text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Español
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none">
            <h3 className="text-lg font-bold text-red-800 mb-4">
              {content.title}
            </h3>
            
            <p className="text-base font-semibold text-red-700 mb-6">
              {content.subtitle}
            </p>

            <div className="mb-6">
              <p className="mb-4">
                {language === 'en' 
                  ? `In consideration of being permitted to participate in the Youth Camp program organized by Templo Adoracion Y Alabanza ("the Church"), I acknowledge and agree to the following terms:`
                  : `En consideración de que se me permita participar en el programa del Campamento Juvenil organizado por Templo Adoracion Y Alabanza ("la Iglesia"), reconozco y acepto los siguientes términos:`
                }
              </p>
            </div>

            {content.sections.map((section, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {section.title}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-bold text-red-800">
                {content.finalStatement}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-primary-brown text-white px-6 py-2 rounded-md hover:bg-primary-brown/90 transition-colors font-medium"
            >
              {language === 'en' ? 'Close' : 'Cerrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 