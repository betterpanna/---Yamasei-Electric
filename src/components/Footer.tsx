import React from 'react';
import { PageId, Language } from '../types';
import { translations } from '../data/translations';
import { servicesData, defaultCompanyFacts, GOOGLE_MAPS_ADDRESS_URL, PHONE_TEL_HREF } from '../data/companyData';
import { Zap, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  lang,
}) => {
  const t = translations[lang];

  const handleNav = (id: PageId) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addressFact = defaultCompanyFacts.find((f) => f.key === 'address');
  const phoneFact = defaultCompanyFacts.find((f) => f.key === 'phone');
  const emailFact = defaultCompanyFacts.find((f) => f.key === 'email');

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-slate-800">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">山清電気商会</span>
                <p className="text-xs text-slate-400 tracking-wide">
                  Yamasei Electric Co.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {lang === 'ja'
                ? '工場・ビル・物流倉庫・商業施設向けの電気設備工事、高圧受変電、幹線動力配線、LED照明更新、安全保守点検。有資格者による責任施工で、貴社の安定稼働を支援します。'
                : 'Commercial and industrial electrical contracting, high-voltage substations, factory power distribution, LED retrofits, and preventative safety audits by licensed electricians.'}
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <a
                href={GOOGLE_MAPS_ADDRESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === 'ja' ? '本社所在地をGoogleマップで開く(新しいタブで開きます)' : 'Open head office location in Google Maps (opens in a new tab)'}
                className="flex items-start gap-2 text-slate-400 hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 rounded-sm transition-colors"
              >
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{addressFact?.value[lang]}</span>
              </a>
              <a
                href={PHONE_TEL_HREF}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{phoneFact?.value[lang]}</span>
              </a>
              <a
                href={`mailto:${emailFact?.value[lang] || 'yamakiyo@sweet.ocn.ne.jp'}`}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{emailFact?.value[lang]}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {(
                [
                  ['home', t.nav.home],
                  ['services', t.nav.services],
                  ['about', t.nav.about],
                  ['projects', t.nav.projects],
                  ['service-area', t.nav.serviceArea],
                  ['contact', t.nav.contact],
                ] as [PageId, string][]
              ).map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => handleNav(id)}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.serviceLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleNav('services')}
                    className="hover:text-white text-left transition-colors"
                  >
                    {s.title[lang]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* B2B Quotation Desk */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'ja' ? '法人様向け お見積り窓口' : 'B2B Quotation Desk'}
            </h4>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'ja'
                  ? '新設配線・キュービクル更新・LED改修など、図面有無に関わらず無料現地調査を承ります。'
                  : 'Site surveys & itemized estimates for industrial wiring, cubicles, and LED upgrades.'}
              </p>
              <button
                onClick={() => handleNav('contact')}
                className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{lang === 'ja' ? 'お問い合わせ・お見積り' : 'Inquiries & Free Quote'}</span>
              </button>
              <a
                href={PHONE_TEL_HREF}
                className="block text-center text-slate-300 hover:text-white font-medium text-xs py-2"
              >
                <Phone className="w-3.5 h-3.5 inline mr-1.5" />
                <span>{phoneFact?.value[lang]}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <p>{t.footer.copyright}</p>
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              {t.nav.privacy}
            </button>
          </div>

          <p className="text-[11px] text-slate-500 text-center sm:text-right max-w-md">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};
