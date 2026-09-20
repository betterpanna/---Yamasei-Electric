import React from 'react';
import { Language } from '../types';
import { defaultCompanyFacts } from '../data/companyData';
import { Phone, Mail } from 'lucide-react';

interface MobileBottomBarProps {
  lang: Language;
  onNavigateToContact: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  lang,
  onNavigateToContact,
}) => {
  const phoneFact = defaultCompanyFacts.find((f) => f.key === 'phone');
  const isVerifiedPhone = phoneFact?.isVerified || false;

  const handlePhoneClick = () => {
    if (isVerifiedPhone && phoneFact?.value[lang]) {
      window.location.href = `tel:${phoneFact.value[lang].replace(/[^0-9]/g, '')}`;
    } else {
      onNavigateToContact();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white border-t border-slate-200 p-2 safe-area-bottom">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handlePhoneClick}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-800 active:bg-slate-50 transition-colors text-sm font-bold"
        >
          <Phone className="w-4 h-4 text-slate-500" />
          <span>{lang === 'ja' ? '電話する' : 'Call'}</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToContact}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold active:bg-amber-600 transition-colors text-sm"
        >
          <Mail className="w-4 h-4" />
          <span>{lang === 'ja' ? 'お見積り依頼' : 'Get a Quote'}</span>
        </button>
      </div>
    </div>
  );
};
