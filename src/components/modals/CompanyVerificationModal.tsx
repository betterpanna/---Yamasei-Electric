import React from 'react';
import { Language } from '../../types';
import { defaultCompanyFacts, missingCompanyFacts } from '../../data/companyData';
import { X, ShieldCheck, AlertCircle, CheckCircle2, FileText, Building2, MapPin, Phone, Mail, Award } from 'lucide-react';

// NOTE: This modal is no longer wired up in the live site (see App.tsx) as part
// of the redesign that removed internal build/audit tooling from the
// customer-facing UI. Kept self-contained here so the project still type-checks.
interface CompanyVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const copy = {
  ja: {
    title: '掲載情報の確認状況および公開前確認事項',
    desc: '山清電気商会のウェブサイトでは、誠実で信頼性の高いB2B取引を担保するため、確認済みの公式情報のみを実名掲載し、未確認項目を明瞭に区分しております。',
    verifiedHeading: '現在確認済みの情報',
    unverifiedHeading: '正式公開に向けてご提示が必要な事項(要確認)',
    clientHelp: '事業者様へ: 正式な代表者名、会社住所、登録電気工事業番号等の確定情報をご提供いただくことで、即時に本番サイトへ反映可能です。',
    closeBtn: '閉じる',
  },
  en: {
    title: 'Company Fact Verification Status & Pre-Publication Checklist',
    desc: 'Yamasei Electric adheres to strict business integrity standards. Only confirmed corporate data is shown as verified, while pending items are clearly demarcated.',
    verifiedHeading: 'Confirmed Verified Details',
    unverifiedHeading: 'Items Requiring Final Confirmation Before Publication',
    clientHelp: 'Notice for Business Owners: Provide the registered representative name, office address, and contractor permit numbers to instantly update production records.',
    closeBtn: 'Close',
  },
};

export const CompanyVerificationModal: React.FC<CompanyVerificationModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;
  const t = copy[lang];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500 text-slate-950">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{t.title}</h3>
              <p className="text-xs text-slate-300">
                {lang === 'ja' ? '確認済み情報と公開前確認チェックリスト' : 'Verified Facts & Pre-Publication Audit Checklist'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-sm">
          {/* Executive Summary of Verified vs Placeholder Status */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-950">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm mb-1">{t.desc}</h4>
                <p className="text-xs text-amber-900 leading-relaxed">{t.clientHelp}</p>
              </div>
            </div>
          </div>

          {/* Section 1: Proposed Architecture & Headlines (Prompt Requirement) */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-700" />
              <span>{lang === 'ja' ? '【提案】サイト構成と見出し対訳' : 'Proposed Sitemap & Headline Equivalents'}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1 text-xs">
                  日本語 (Japanese - Default)
                </span>
                <p className="font-bold text-slate-800 mb-1">
                  メイン見出し: 「工場の生産ラインから、ビル・施設の受変電設備まで。確かな国家資格技術で、貴社の安定操業を支える。」
                </p>
                <p className="text-amber-700 font-semibold mb-2">
                  CTAボタン: 「無料現地調査・お見積りを依頼する」
                </p>
                <p className="text-slate-600 text-[11px]">
                  構成: 1. ホーム 2. 事業内容 3. 会社概要 4. 施工事例 5. 対応エリア 6. 見積・お問い合わせ 7. 個人情報保護方針
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1 text-xs">
                  English Version
                </span>
                <p className="font-bold text-slate-800 mb-1">
                  Main Headline: "From factory production lines to commercial substations. Certified engineering ensuring safe, reliable business operations."
                </p>
                <p className="text-amber-700 font-semibold mb-2">
                  CTA Button: "Request Free Site Survey & Quote"
                </p>
                <p className="text-slate-600 text-[11px]">
                  Structure: 1. Home 2. Services 3. About Us 4. Work Examples 5. Service Area 6. Contact / Quote 7. Privacy Policy
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Currently Displayed Company Facts */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-700" />
              <span>{t.verifiedHeading} & 現行ステータス</span>
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {defaultCompanyFacts.map((fact) => (
                <div
                  key={fact.key}
                  className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    fact.isVerified ? 'bg-emerald-50/40' : 'bg-amber-50/30'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-slate-500">
                      {fact.label[lang]}
                    </span>
                    <p className="font-medium text-slate-900">{fact.value[lang]}</p>
                    {fact.note && (
                      <p className="text-[11px] text-amber-800">{fact.note[lang]}</p>
                    )}
                  </div>
                  <div>
                    {fact.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {lang === 'ja' ? '確認済み' : 'Verified'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {lang === 'ja' ? '要確認（仮表示）' : 'Pending Verification'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Short List of Company Facts Needed to Finish Site (Prompt Requirement) */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{t.unverifiedHeading}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {missingCompanyFacts.map((cat, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-3 bg-white">
                  <h5 className="font-bold text-xs text-slate-800 pb-1.5 mb-2 border-b border-slate-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{cat.category[lang]}</span>
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold shrink-0">•</span>
                        <span>{item[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-sm transition-colors"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
