import React, { useState } from 'react';
import { Language, PageId } from '../../types';
import { X, Calculator, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb, Zap, Factory } from 'lucide-react';

interface QuoteEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onApplyEstimate: (data: { service: string; desc: string }) => void;
}

export const QuoteEstimatorModal: React.FC<QuoteEstimatorModalProps> = ({
  isOpen,
  onClose,
  lang,
  onApplyEstimate,
}) => {
  const [projectType, setProjectType] = useState<'led' | 'machinery' | 'panel'>('led');
  const [facilityScale, setFacilityScale] = useState<'small' | 'medium' | 'large'>('medium');
  const [urgency, setUrgency] = useState<'normal' | 'holiday'>('normal');

  if (!isOpen) return null;

  // Approximate ballpark modeling for typical Japanese B2B electrical jobs
  const calculateEstimate = () => {
    let baseMin = 150000;
    let baseMax = 300000;
    let titleJa = '';
    let titleEn = '';

    if (projectType === 'led') {
      titleJa = 'LED照明更新・省エネ化工事';
      titleEn = 'Commercial LED Lighting Retrofit';
      if (facilityScale === 'small') {
        baseMin = 180000;
        baseMax = 350000;
      } else if (facilityScale === 'medium') {
        baseMin = 450000;
        baseMax = 850000;
      } else {
        baseMin = 1200000;
        baseMax = 2500000;
      }
    } else if (projectType === 'machinery') {
      titleJa = '工場機械動力電源・増設配線';
      titleEn = 'Machinery Power Feed & Subpanel Wiring';
      if (facilityScale === 'small') {
        baseMin = 120000;
        baseMax = 250000;
      } else if (facilityScale === 'medium') {
        baseMin = 300000;
        baseMax = 600000;
      } else {
        baseMin = 800000;
        baseMax = 1800000;
      }
    } else {
      titleJa = '高圧キュービクル・分電盤改修';
      titleEn = 'Cubicle & Main Distribution Board Retrofit';
      if (facilityScale === 'small') {
        baseMin = 300000;
        baseMax = 600000;
      } else if (facilityScale === 'medium') {
        baseMin = 800000;
        baseMax = 1600000;
      } else {
        baseMin = 2000000;
        baseMax = 4500000;
      }
    }

    if (urgency === 'holiday') {
      baseMin = Math.round(baseMin * 1.15);
      baseMax = Math.round(baseMax * 1.18);
    }

    return { baseMin, baseMax, titleJa, titleEn };
  };

  const est = calculateEstimate();

  const handleApplyToForm = () => {
    const scaleLabel =
      facilityScale === 'small' ? '小規模（店舗・事務所・小作業場）' : facilityScale === 'medium' ? '中規模（〜1,000㎡ 工場/倉庫）' : '大規模（1,000㎡超 工場/ビル）';
    const urgencyLabel = urgency === 'holiday' ? '休日または夜間施工希望' : '通常平日施工希望';

    const desc =
      lang === 'ja'
        ? `【事前試算条件】種別: ${est.titleJa} / 規模感: ${scaleLabel} / 日程条件: ${urgencyLabel}（概算目安: ¥${est.baseMin.toLocaleString()} 〜 ¥${est.baseMax.toLocaleString()} 税抜）\n現地調査と正式なお見積りをお願いします。`
        : `[Preliminary Estimator Specs] Category: ${est.titleEn} / Scale: ${facilityScale} / Schedule: ${urgency} (Estimated Range: ¥${est.baseMin.toLocaleString()} - ¥${est.baseMax.toLocaleString()} excl. tax). Requesting formal site survey.`;

    onApplyEstimate({
      service: projectType === 'led' ? 'led-lighting' : projectType === 'machinery' ? 'industrial-power' : 'substation',
      desc,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 text-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500 text-slate-950">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {lang === 'ja' ? '工事費用 概算シミュレータ' : 'Ballpark Cost Estimator'}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'ja' ? '施設規模と工事内容から大まかな予算感を試算' : 'Interactive rough project budgeting guide'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm">
          {/* Step 1: Project Type */}
          <div>
            <label className="block font-bold text-xs text-slate-700 mb-2">
              {lang === 'ja' ? '1. ご検討中の工事種別' : '1. Select Project Type'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setProjectType('led')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  projectType === 'led'
                    ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                }`}
              >
                <Lightbulb className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                <span className="text-xs block">{lang === 'ja' ? 'LED照明更新' : 'LED Retrofit'}</span>
              </button>

              <button
                type="button"
                onClick={() => setProjectType('machinery')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  projectType === 'machinery'
                    ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                }`}
              >
                <Factory className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                <span className="text-xs block">{lang === 'ja' ? '機械動力配線' : 'Machinery Power'}</span>
              </button>

              <button
                type="button"
                onClick={() => setProjectType('panel')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  projectType === 'panel'
                    ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                }`}
              >
                <Zap className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                <span className="text-xs block">{lang === 'ja' ? 'キュービクル/盤' : 'Panel / Substation'}</span>
              </button>
            </div>
          </div>

          {/* Step 2: Scale */}
          <div>
            <label className="block font-bold text-xs text-slate-700 mb-2">
              {lang === 'ja' ? '2. 施設の規模感・台数目安' : '2. Facility Scope & Volume'}
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFacilityScale('small')}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  facilityScale === 'small'
                    ? 'border-slate-900 bg-slate-900 text-white font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold block">{lang === 'ja' ? '小規模' : 'Small'}</span>
                <span className="text-[10px] opacity-80">{lang === 'ja' ? '店舗・事務所' : 'Offices/Shops'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFacilityScale('medium')}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  facilityScale === 'medium'
                    ? 'border-slate-900 bg-slate-900 text-white font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold block">{lang === 'ja' ? '中規模' : 'Medium'}</span>
                <span className="text-[10px] opacity-80">{lang === 'ja' ? '〜1,000㎡ 工場・倉庫' : 'Factory/Depot'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFacilityScale('large')}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  facilityScale === 'large'
                    ? 'border-slate-900 bg-slate-900 text-white font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold block">{lang === 'ja' ? '大規模' : 'Large'}</span>
                <span className="text-[10px] opacity-80">{lang === 'ja' ? '1,000㎡超 工場群' : 'Multi-Bay Plant'}</span>
              </button>
            </div>
          </div>

          {/* Step 3: Work Hours Schedule */}
          <div>
            <label className="block font-bold text-xs text-slate-700 mb-2">
              {lang === 'ja' ? '3. 施工時間帯のご希望' : '3. Preferred Work Hours'}
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setUrgency('normal')}
                className={`p-2 rounded-lg border text-center transition-all ${
                  urgency === 'normal'
                    ? 'border-slate-900 bg-slate-900 text-white font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {lang === 'ja' ? '平日昼間（標準工程）' : 'Weekdays (Standard)'}
              </button>

              <button
                type="button"
                onClick={() => setUrgency('holiday')}
                className={`p-2 rounded-lg border text-center transition-all ${
                  urgency === 'holiday'
                    ? 'border-slate-900 bg-slate-900 text-white font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {lang === 'ja' ? '夜間または休日計画停電時' : 'Night / Weekend Shutdown'}
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-900">
                {lang === 'ja' ? '概算費用の目安（税抜）' : 'Ballpark Budget Range (Excl. Tax)'}
              </span>
              <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded">
                {lang === 'ja' ? '現地調査で確定' : 'Finalized On-Site'}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-slate-900 my-2 tracking-tight">
              ¥{est.baseMin.toLocaleString()}
              <span className="text-sm font-normal text-slate-500 mx-2">〜</span>
              ¥{est.baseMax.toLocaleString()}
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              {lang === 'ja'
                ? '※上記は一般的な工事仕様に基づく目安です。配線距離、既存盤の空き、高所足場、電力会社申請の要否により変動します。正確な金額は無料現地調査にてご提示します。'
                : '* Approximation based on typical parameters. Final quotes depend on wire run distance, panel capacity, aerial lifts, and utility filings.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-2"
          >
            {lang === 'ja' ? '閉じる' : 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleApplyToForm}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-xs transition-colors"
          >
            <span>{lang === 'ja' ? 'この条件で見積・現地調査を依頼' : 'Apply Specs to Quote Form'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
