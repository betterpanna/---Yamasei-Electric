import React, { useState } from 'react';
import { Language, PageId, ServiceItem } from '../../types';
import { servicesData, defaultCompanyFacts, projectsData } from '../../data/companyData';
import {
  Zap,
  Factory,
  Lightbulb,
  ShieldCheck,
  Activity,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  FileCheck,
  AlertTriangle,
  Flame,
  LayoutGrid,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface ServicesPageProps {
  lang: Language;
  setCurrentPage: (page: PageId) => void;
  onSelectServiceForQuote?: (serviceId: string) => void;
  onSelectProject?: (projectId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  lang,
  setCurrentPage,
  onSelectServiceForQuote,
  onSelectProject,
}) => {
  // 'all' to show all services, or specific service ID for dedicated single service page
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(servicesData[0].id);

  const activeService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];
  const phoneFact = defaultCompanyFacts.find((f) => f.key === 'phone');
  const hasVerifiedPhone = phoneFact?.isVerified || false;
  const phoneDisplay = hasVerifiedPhone ? phoneFact?.value[lang] : '0X-XXXX-XXXX [要確認]';
  const phoneTel = hasVerifiedPhone ? phoneFact?.value[lang].replace(/[^0-9]/g, '') : '0000000000';

  const handleQuoteClick = (serviceId: string) => {
    if (onSelectServiceForQuote) {
      onSelectServiceForQuote(serviceId);
    }
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getServiceIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Zap':
        return <Zap className={`${className} text-amber-500`} />;
      case 'Factory':
        return <Factory className={`${className} text-blue-500`} />;
      case 'Lightbulb':
        return <Lightbulb className={`${className} text-amber-500`} />;
      case 'ShieldAlert':
        return <ShieldCheck className={`${className} text-emerald-500`} />;
      case 'Activity':
        return <Activity className={`${className} text-red-500`} />;
      default:
        return <Zap className={`${className} text-amber-500`} />;
    }
  };

  // Additional technical workflow steps for each confirmed service
  const serviceWorkflows: Record<string, { ja: string[]; en: string[] }> = {
    substation: {
      ja: [
        '1. 既存キュービクル外観・容量・絶縁測定および保守主任技術者様との事前打合せ',
        '2. 電力会社（一般送配電事業者）への受電計画事前申請・工事計画届出',
        '3. 計画停電日程の調整・安全仮設・機器撤去および基礎据付',
        '4. VCB・トランス・高圧ケーブル端末処理施工および保護継電器連動試験',
        '5. 竣工耐圧試験・絶縁抵抗測定・安全通電確認および点検記録書お引渡し',
      ],
      en: [
        '1. Initial cubicle survey & coordination with Chief Electrical Engineer',
        '2. Grid utility interconnection application & documentation',
        '3. Outage scheduling, safety isolation & heavy rigging to foundations',
        '4. VCB/Transformer termination & protection relay secondary injection test',
        '5. High-voltage withstand test, mega-ohm logs & official commissioning handover',
      ],
    },
    'industrial-power': {
      ja: [
        '1. 新設機械・設備の消費電力・定格電流・始動電流の確認と幹線容量計算',
        '2. 既設動力盤の空きスペース・ブレーカー増設可否調査および配管ルート選定',
        '3. ケーブルラック・金属電線管敷設および三相200V/400V幹線ケーブル通線',
        '4. 機械側端子箱への接続・アース（D種/C種接地）工事・確実なトルク締め',
        '5. 電圧測定・相回転（相順）チェック・絶縁測定および試運転立会い',
      ],
      en: [
        '1. Machinery power rating review & load capacity calculations',
        '2. Distribution panel breaker vacancy survey & conduit routing design',
        '3. Heavy-duty conduit/cable tray mounting & 3-phase conductor pulling',
        '4. Machine terminal lugs hookup, dedicated grounding & torque verification',
        '5. Voltage verification, phase rotation audit & test run supervision',
      ],
    },
    'led-lighting': {
      ja: [
        '1. 現場調査（天井高・既存器具台数・現況照度ルクス・点灯時間）の計測',
        '2. 最適なLED器具選定・照度シミュレーションおよび年間電気代削減試算',
        '3. 高所作業車・足場・安全通路の確保と操業時間外（休日・夜間）作業計画',
        '4. 安定器バイパス配線・LED器具交換・電源接続および調光センサー設定',
        '5. 施工後照度測定・点灯確認・産業廃棄物（水銀灯・蛍光管）適正処分マニフェスト発行',
      ],
      en: [
        '1. On-site lux baseline audit, fixture count, and operating hour analysis',
        '2. Fixture selection, photometric design & electrical bill payback model',
        '3. Boom lift & scaffolding deployment scheduled during off-hours',
        '4. Ballast bypass wiring, LED fixture installation & smart sensor tuning',
        '5. Post-installation lux audit, lighting inspection & certified disposal',
      ],
    },
    'maintenance-safety': {
      ja: [
        '1. 現場聞き取り（トリップ発生時の状況、異音・異臭、機器稼働状況）',
        '2. サーモグラフィによる分電盤内部端子・ブレーカーの熱点（ホットスポット）検査',
        '3. メガテスターによる電路別絶縁抵抗測定（0.1MΩ以上適合判定）と漏電回路特定',
        '4. 劣化ブレーカー・破損ケーブルの応急処置または新品部品交換復旧',
        '5. 原因分析・再発防止策のご提示および保安点検報告書の発行',
      ],
      en: [
        '1. Fault history review, trip symptom analysis & load profiling',
        '2. Infrared thermographic inspection for overheated lugs & terminals',
        '3. Branch insulation resistance mega-testing to isolate fault points',
        '4. Component replacement (aged ELB, contactors, damaged cabling)',
        '5. Root cause report & formal electrical safety certificate issuance',
      ],
    },
    'emergency-power': {
      ja: [
        '1. 非常時・BCP重要負荷（保安照明、サーバー、ポンプ、冷凍機等）の選定',
        '2. 発電機またはUPSの出力容量計算・切替開閉器（ATS）盤の連動設計',
        '3. 防災配線（耐火電線・耐熱電線）の配管敷設および消防協議事前確認',
        '4. 自動始動・停止シーケンス試験および模擬停電による切替動作確認',
        '5. 自主検査記録書・取扱説明および消防署検査立会いサポート',
      ],
      en: [
        '1. Critical load classification (servers, refrigeration, life safety)',
        '2. Generator/UPS capacity calculation & ATS transfer switch architecture',
        '3. Fire-rated cabling, conduit routing & fire department compliance',
        '4. Automated start/stop sequence testing & simulated power failure test',
        '5. Commissioning verification logs & fire authority inspection support',
      ],
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button
          type="button"
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:text-slate-900 transition-colors"
        >
          {lang === 'ja' ? 'ホーム' : 'Home'}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          type="button"
          onClick={() => {
            setViewMode('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`hover:text-slate-900 transition-colors ${viewMode === 'all' ? 'text-amber-600 font-bold' : ''}`}
        >
          {lang === 'ja' ? '事業内容・対応工事' : 'Services'}
        </button>
        {viewMode === 'single' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-xs sm:max-w-md">
              {activeService.title[lang]}
            </span>
          </>
        )}
      </nav>

      {/* Mode & Service Switcher Navigation Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
          <span className="font-bold text-slate-600 flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-amber-500" />
            <span>{lang === 'ja' ? '認定施工種別 専用ページ選択:' : 'Select Confirmed Service Page:'}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lang === 'ja' ? '全工事一覧で比較' : 'View All Services'}
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400">
              {lang === 'ja' ? '全5種目（国家資格直接施工）' : '5 Confirmed Services'}
            </span>
          </div>
        </div>

        {/* Individual Service Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {servicesData.map((service) => {
            const isSelected = viewMode === 'single' && selectedServiceId === service.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  setSelectedServiceId(service.id);
                  setViewMode('single');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {getServiceIcon(service.iconName, 'w-4 h-4')}
                <span>{service.title[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DEDICATED JAPANESE SERVICE PAGE (Single Service Deep-Dive View)       */}
      {/* ========================================================================= */}
      {viewMode === 'single' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          {/* Service Dedicated Hero Header */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                  <span>{lang === 'ja' ? '山清電気商会 認定施工種目' : 'Certified Service'}</span>
                </span>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-0.5 rounded-full">
                  {lang === 'ja' ? '国家資格者による責任施工' : 'Licensed Execution'}
                </span>
                <span className="text-xs text-slate-400">
                  {lang === 'ja' ? '工場・ビル・倉庫・店舗向け' : 'B2B Commercial & Industrial'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
                {lang === 'ja'
                  ? `【公式】${activeService.title.ja}（法人・施設向け）`
                  : `${activeService.title.en} | Commercial Engineering`}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {activeService.fullDesc[lang]}
              </p>

              {/* Service Specific Action & Phone Consultation Strip */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleQuoteClick(activeService.id)}
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'ja' ? 'この工事のお問い合わせ・お見積り（現地調査無料）' : 'Request Free Quote & Survey'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <a
                  href={`tel:${phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white font-bold text-xs sm:text-sm hover:bg-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ja' ? `お電話相談: ${phoneDisplay}` : `Call: ${phoneDisplay}`}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Actual Service Area Banner on Service Page */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-slate-950" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">
                    {lang === 'ja' ? '【出張対応エリア】この工事の対応地域' : 'Actual Service Area for This Service'}
                  </h2>
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                    {lang === 'ja' ? '迅速駆け付け' : 'Fast Response'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {lang === 'ja'
                    ? '自社拠点より車で約60分圏内の主要工業団地・商業施設・オフィスビルを中心に出張対応いたします。現地調査・お見積りは原則無料です。※隣接エリアや遠方現場につきましても事前ご相談にて柔軟に対応しております。'
                    : 'We dispatch throughout our core service area (approx. 60-min driving radius) for factories, warehouses, and commercial complexes. Adjacent areas served upon consultation.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCurrentPage('service-area');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-white border border-amber-300 hover:bg-amber-100 transition-colors shrink-0 shadow-2xs self-stretch sm:self-auto justify-center"
            >
              <span>{lang === 'ja' ? '出張エリア詳細マップ' : 'View Service Area Map'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
            </button>
          </div>

          {/* 2-Column Technical Specifications & Scope */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scope of Work */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'ja' ? '対応工事・施工仕様' : 'Scope of Work & Engineering Details'}
                </h3>
              </div>
              <ul className="space-y-3">
                {activeService.scopeOfWork[lang].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span className="font-medium text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                <p>
                  {lang === 'ja'
                    ? '※特殊機器の設置や防爆仕様、休業日・夜間の施工にも柔軟に対応いたします。'
                    : '※Explosion-proof specs, night shifts, and holiday shutdowns accommodated.'}
                </p>
              </div>
            </div>

            {/* Target Facilities & Typical Client Needs */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <Building className="w-5 h-5 text-blue-600" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'ja' ? '主な対象施設・業種' : 'Target Facilities & Industries'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeService.targetFacilities[lang].map((fac, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                <span className="font-bold text-slate-800 block">
                  {lang === 'ja' ? '【明朗な項目別見積り方針】' : '[Transparent Estimation Policy]'}
                </span>
                <p>
                  {lang === 'ja'
                    ? '事前の現地調査にて配線距離、幹線太さ、受電盤の空き容量を正確に確認し、材料費・労務費・諸経費を明記した項目別お見積書をご提示します。ご納得いただいてから着工いたします。'
                    : 'We inspect physical runs, conductor sizing, and panel capacity to produce a line-item estimate. Work begins only following client approval.'}
                </p>
              </div>
            </div>
          </div>

          {/* Workflow & Execution Steps for this Service */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-amber-600" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'ja' ? '施工手順・調査から引渡しまでの流れ' : 'Engineering Workflow & Handover Process'}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {lang === 'ja' ? '確実な工程管理' : 'Step-by-Step QA'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              {(serviceWorkflows[activeService.id]?.[lang] || [
                '1. お問い合わせ・現場ヒアリング',
                '2. 現地調査・図面確認（無料）',
                '3. 詳細項目別お見積りのご提示',
                '4. 有資格者による直接施工',
                '5. 自主安全検査・点検記録書お引渡し',
              ]).map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    STEP 0{idx + 1}
                  </span>
                  <p className="font-semibold text-slate-800 leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Effortless Contact & Quote Banner on Service Page */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                {lang === 'ja' ? '無料現地調査・お見積り窓口' : 'Direct Quote & Survey Request'}
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                {lang === 'ja'
                  ? `「${activeService.title.ja}」に関するご相談・お見積り`
                  : `Inquire about ${activeService.title.en}`}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'ja'
                  ? '「改修時期が近い」「増設が可能か確認したい」「他社の見積りと比較検討したい」など、図面の有無に関わらずお気軽にご相談ください。'
                  : 'Contact us for free site surveys, load assessments, and line-item quotes.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary Form Button */}
              <button
                type="button"
                onClick={() => handleQuoteClick(activeService.id)}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base px-6 py-4 rounded-2xl transition-colors"
              >
                <Mail className="w-5 h-5 text-slate-950" />
                <span>{lang === 'ja' ? 'お問い合わせ・お見積りフォームへ' : 'Request a Quote Online'}</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </button>

              {/* Tappable Phone Number */}
              <a
                href={`tel:${phoneTel}`}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-slate-700 bg-slate-800/90 text-white font-bold text-sm hover:bg-slate-700 transition-colors group"
                title={lang === 'ja' ? 'タップして電話発信' : 'Tap to call'}
              >
                <Phone className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <span className="text-[11px] text-slate-400 block">{lang === 'ja' ? 'お電話での直接ご相談' : 'Direct Phone Call'}</span>
                  <span className="text-base font-bold text-amber-400">{phoneDisplay}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ALL CONFIRMED SERVICES OVERVIEW CARDS                                   */}
      {/* ========================================================================= */}
      {viewMode === 'all' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {lang === 'ja' ? '全認定電気設備工事一覧' : 'All Confirmed Services & Engineering Capabilities'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'ja'
                ? '山清電気商会が直接施工を請け負う全5種目の工事概要です。各カードから専用詳細ページまたはお見積り依頼へ進めます。'
                : 'Complete listing of commercial electrical services performed by Yamasei Electric.'}
            </p>
          </div>

          <div className="space-y-12">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Header Banner */}
                <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      {getServiceIcon(service.iconName, 'w-7 h-7')}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                        SERVICE 0{index + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {service.title[lang]}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(service.id);
                        setViewMode('single');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-bold transition-colors"
                    >
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span>{lang === 'ja' ? '専用ページを見る' : 'View Dedicated Page'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuoteClick(service.id)}
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl transition-colors shrink-0"
                    >
                      <Mail className="w-4 h-4 text-slate-950" />
                      <span>{lang === 'ja' ? 'お問い合わせ・お見積り' : 'Inquiries & Quote'}</span>
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Service Area Pill */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong className="text-slate-900 font-bold">{lang === 'ja' ? '出張対応エリア: ' : 'Service Area: '}</strong>
                      {lang === 'ja'
                        ? '自社拠点より車で約60分圏内（工業団地・商業施設・オフィスビル）。※隣接エリアは事前ご相談にて対応'
                        : 'Core area within ~60 min drive. Surrounding areas upon request.'}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {service.fullDesc[lang]}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'ja' ? '対応工事・施工範囲' : 'Scope of Work'}</span>
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                        {service.scopeOfWork[lang].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-2">
                        <Building className="w-4 h-4 text-blue-600" />
                        <span>{lang === 'ja' ? '主な対象施設' : 'Target Facilities'}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.targetFacilities[lang].map((fac, i) => (
                          <div key={i} className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                            {fac}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Footer on Card */}
                  <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-3">
                    <a
                      href={`tel:${phoneTel}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900"
                    >
                      <Phone className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'ja' ? `お電話でのご相談: ${phoneDisplay}` : `Phone: ${phoneDisplay}`}</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedServiceId(service.id);
                          setViewMode('single');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs text-amber-700 hover:text-amber-800 font-bold underline px-2 py-1"
                      >
                        {lang === 'ja' ? '施工手順・詳細仕様を見る' : 'Read Full Specs & Process'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuoteClick(service.id)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <span>{lang === 'ja' ? '無料現地調査・見積依頼' : 'Request Survey'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
