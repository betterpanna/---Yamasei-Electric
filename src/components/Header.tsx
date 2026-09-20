import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { translations } from '../data/translations';
import { defaultCompanyFacts } from '../data/companyData';
import { Phone, Mail, Menu, X, ArrowRight, Zap } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  lang,
  setLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const phoneFact = defaultCompanyFacts.find((f) => f.key === 'phone');
  const hasVerifiedPhone = phoneFact?.isVerified || false;
  const phoneDisplay = hasVerifiedPhone ? phoneFact?.value[lang] : '0X-XXXX-XXXX';
  const phoneTel = hasVerifiedPhone ? phoneFact?.value[lang].replace(/[^0-9]/g, '') : '0000000000';

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'service-area', label: t.nav.serviceArea },
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Company Brand */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-left leading-tight">
              <span className="block text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                山清電気商会
              </span>
              <span className="hidden sm:block text-[11px] tracking-wide text-slate-500">
                Yamasei Electric Co.
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-slate-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language, Phone (secondary), Inquiry (primary) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center rounded-full border border-slate-200 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setLang('ja')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === 'ja' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                日本語
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === 'en' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
              title={lang === 'ja' ? 'お電話でのご相談' : 'Call for consultation'}
            >
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="hidden xl:inline whitespace-nowrap">{phoneDisplay}</span>
              <span className="xl:hidden whitespace-nowrap">{lang === 'ja' ? '電話相談' : 'Call'}</span>
            </a>

            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>{lang === 'ja' ? 'お問い合わせ・お見積り' : 'Inquiries & Quote'}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Mobile Menu Trigger (also covers the tablet gap where the full nav is hidden) */}
          <div className="flex items-center gap-1.5 xl:hidden">
            <a
              href={`tel:${phoneTel}`}
              className="p-2.5 rounded-lg text-slate-700 border border-slate-200 md:hidden"
              aria-label={lang === 'ja' ? '電話をかける' : 'Call Yamasei Electric'}
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700"
              aria-label={lang === 'ja' ? 'メニューを開閉' : 'Toggle navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6">
          <nav className="flex flex-col gap-1 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-3 rounded-lg text-base ${
                  currentPage === item.id
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-3 rounded-lg text-base ${
                currentPage === 'contact' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-700'
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>

          <div className="flex items-center justify-center rounded-full border border-slate-200 p-0.5 text-xs font-medium mb-3 w-fit mx-auto">
            <button
              type="button"
              onClick={() => setLang('ja')}
              className={`px-3 py-1 rounded-full transition-colors ${
                lang === 'ja' ? 'bg-slate-900 text-white' : 'text-slate-500'
              }`}
            >
              日本語
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full transition-colors ${
                lang === 'en' ? 'bg-slate-900 text-white' : 'text-slate-500'
              }`}
            >
              English
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3.5 bg-amber-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span>{lang === 'ja' ? 'お問い合わせ・お見積り' : 'Inquiries & Free Quote'}</span>
            </button>

            <a
              href={`tel:${phoneTel}`}
              className="w-full py-3 border border-slate-200 text-slate-900 font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-slate-500" />
              <span>{lang === 'ja' ? `お電話でのご相談: ${phoneDisplay}` : `Call: ${phoneDisplay}`}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
