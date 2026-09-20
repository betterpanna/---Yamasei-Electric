import React from 'react';
import { Language, PageId } from '../../types';
import { defaultCompanyFacts } from '../../data/companyData';
import {
  Building2,
  Award,
  HardHat,
  CheckCircle2,
  ArrowRight,
  Scale,
} from 'lucide-react';

interface AboutPageProps {
  lang: Language;
  setCurrentPage: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  lang,
  setCurrentPage,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
          {lang === 'ja' ? '会社概要・技術理念' : 'About Yamasei Electric'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {lang === 'ja' ? '会社概要・技術へのこだわり' : 'Company Profile & Engineering Standards'}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {lang === 'ja'
            ? '山清電気商会は、法人施設・製造業・商業ビルを支える電気設備工事の専門施工店です。現場の安全を最優先にし、有資格者による直接管理と高品質な技術を提供します。'
            : 'Yamasei Electric provides commercial electrical engineering and installation services with certified accountability, uncompromising safety protocols, and meticulous craft.'}
        </p>
      </div>

      {/* Corporate Philosophy / Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <HardHat className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {lang === 'ja' ? '安全最優先の施工管理' : 'Safety First Protocol'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lang === 'ja'
              ? '電気火災や感電事故のリスクを根絶するため、作業前の検電・絶縁確認・KY（危険予知）活動を徹底。安全保護具の着用と二重安全確認を義務付けています。'
              : 'Zero-tolerance for hazardous shortcuts. Strict live-line testing, insulation verification, and dual-check isolation protocols on every job.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {lang === 'ja' ? '国家資格者による責任施工' : 'Certified Craftsmanship'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lang === 'ja'
              ? '第一種・第二種電気工事士等の資格保有者が、図面検討から現場配線、自主検査、竣工書類作成まで一貫して責任を担います。丸投げ外注はいたしません。'
              : 'Direct execution by licensed first- and second-class electricians. We do not blind-subcontract critical power installations.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {lang === 'ja' ? '明朗会計・詳細な見積書' : 'Transparent Accounting'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lang === 'ja'
              ? '「一式」表記で濁さず、電線・配管・ブレーカー・労務費・申請費用を項目別に明記。ご納得いただいた上で施工に着手する誠実な取引をお約束します。'
              : 'Itemized clarity. Material, labor, conduit, and permit filing costs are detailed line-by-line before work begins.'}
          </p>
        </div>
      </div>

      {/* Company Profile Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-500" />
            <span>{lang === 'ja' ? '会社概要' : 'Company Fact Sheet'}</span>
          </h2>
          <p className="text-xs text-slate-500 max-w-md">
            {lang === 'ja'
              ? '確認済みの情報のみ実名で掲載し、未確認の項目は明示しています。'
              : 'Only confirmed details are published as-is; pending items are clearly marked.'}
          </p>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
          <dl className="divide-y divide-slate-100">
            {defaultCompanyFacts.map((fact) => (
              <div
                key={fact.key}
                className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start"
              >
                <dt className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-700">
                  {fact.label[lang]}
                </dt>
                <dd className="sm:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-medium text-slate-900">
                    {fact.value[lang]}
                  </span>
                  <div>
                    {fact.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {lang === 'ja' ? '確認済み' : 'Verified'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        {lang === 'ja' ? '確認待ち' : 'Pending Verification'}
                      </span>
                    )}
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Call to Action Bar */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">
            {lang === 'ja' ? '電気設備の改修・増設をご検討中の法人様へ' : 'Ready to discuss your facility electrical needs?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {lang === 'ja'
              ? '現場調査・図面診断・お見積りは無料です。まずはお気軽にご相談ください。'
              : 'On-site surveys and preliminary consultations are provided free within our service radius.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentPage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0"
        >
          <span>{lang === 'ja' ? 'お問い合わせ・見積依頼へ' : 'Contact / Request Quote'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
