import React from 'react';
import { Language, PageId } from '../../types';
import { serviceAreaRegions } from '../../data/companyData';
import {
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface ServiceAreaPageProps {
  lang: Language;
  setCurrentPage: (page: PageId) => void;
}

export const ServiceAreaPage: React.FC<ServiceAreaPageProps> = ({
  lang,
  setCurrentPage,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
          {lang === 'ja' ? '確実なフットワーク' : 'Coverage Radius'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {lang === 'ja' ? '対応エリア・出張対応方針' : 'Service Area & Dispatch Policy'}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {lang === 'ja'
            ? '山清電気商会は、迅速な現地調査と責任あるアフターフォローを担保するため、無理な遠隔地対応を謳わず、確実に質の高い工事を提供できる営業範囲を定めています。'
            : 'To guarantee swift response times and dependable maintenance, Yamasei Electric focuses on defined industrial and commercial corridors where we provide direct engineering oversight.'}
        </p>
      </div>

      {/* Headquarters Base Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm text-slate-900">
            {lang === 'ja' ? '本社拠点' : 'Headquarters Base'}
          </h4>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            {lang === 'ja'
              ? '本社所在地(大阪府東大阪市新町5-2)を基点に、東大阪市・八尾市・大東市・大阪市および近郊工業地帯へ最短30〜45分で駆け付け可能です。'
              : 'Based at 5-2 Shinmachi, Higashiosaka, Osaka, we provide rapid 30-45 min dispatch across Higashiosaka, Yao, Daito, Osaka City, and surrounding industrial hubs.'}
          </p>
        </div>
      </div>

      {/* Coverage Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {serviceAreaRegions.map((region, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 border flex flex-col justify-between ${
              region.isCore
                ? 'bg-white border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    region.isCore
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {region.tier[lang]}
                </span>
                {region.isCore && (
                  <span className="text-xs font-bold text-amber-600">
                    {lang === 'ja' ? '最速対応' : 'Priority'}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {region.isCore
                  ? lang === 'ja'
                    ? '最優先・迅速駆け付けエリア'
                    : 'Immediate Dispatch Zone'
                  : region.tier[lang]}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {region.desc[lang]}
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {lang === 'ja' ? '対象地域・主要拠点' : 'Covered Municipalities'}
                </span>
                <div className="space-y-1.5">
                  {region.areas[lang].map((area, aIdx) => (
                    <div
                      key={aIdx}
                      className="text-xs bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-700 flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  region.isCore
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{lang === 'ja' ? 'この地域での現地調査を依頼' : 'Request Survey in This Area'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* On-Site Survey Commitments */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <span>{lang === 'ja' ? '現地調査・出張に関するお約束' : 'On-Site Survey Commitments'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900">
              {lang === 'ja' ? '1. 初回現地調査は原則無料' : '1. Free Initial Site Survey'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'ja'
                ? '対応エリア内での初回現地確認、設備容量の診断、お見積りの作成は無料です。無理な営業やしつこい勧誘は一切行いません。'
                : 'Initial on-site surveys and estimate generation within our standard service area are 100% complimentary without sales pressure.'}
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900">
              {lang === 'ja' ? '2. 図面なし・古い建物でも対応' : '2. Accommodating Older Facilities Without Plans'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'ja'
                ? '図面が紛失している場合でも、専門技術者がテスターで既存回路を追い、盤の空きスペースを実測した上で安全な施工計画を立案します。'
                : 'Even when original electrical schematics are missing, our electricians trace circuits and measure real panel capacities safely.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
