import React from 'react';
import { Language, PageId } from '../../types';
import { translations } from '../../data/translations';
import { servicesData, projectsData, reasonsToChoose, b2bFaqList } from '../../data/companyData';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Factory,
  Lightbulb,
  CheckCircle2,
  FileText,
  MapPin,
  ChevronRight,
  HelpCircle,
  Clock,
  Award,
  Camera,
  Layers,
} from 'lucide-react';

interface HomePageProps {
  lang: Language;
  setCurrentPage: (page: PageId) => void;
  onSelectProject?: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  setCurrentPage,
  onSelectProject,
}) => {
  const t = translations[lang];

  const handleOpenProjectDetail = (id: string) => {
    onSelectProject?.(id);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-blue-500" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-amber-500" />;
      case 'ShieldAlert':
        return <ShieldCheck className="w-6 h-6 text-emerald-500" />;
      default:
        return <Zap className="w-6 h-6 text-amber-500" />;
    }
  };

  const getReasonIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-6 h-6 text-amber-600" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-amber-600" />;
      case 'FileCheck':
        return <FileText className="w-6 h-6 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 text-white pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.35] text-white">
              <span className="block">{t.hero.titleLine1}</span>
              <span className="block mt-1 text-amber-400">
                {t.hero.titleLine2}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {t.hero.subtext}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-base px-7 py-3.5 rounded-xl transition-colors"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('services')}
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-slate-800 text-white font-medium text-base px-6 py-3.5 rounded-xl border border-slate-700 transition-colors"
              >
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14 pt-8 border-t border-slate-800">
            {t.home.stats.map((stat, idx) => (
              <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold block mb-1">
                  {stat.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-100">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
              {lang === 'ja' ? '確かな施工種目' : 'Verified Capabilities'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.home.servicesHeading}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.home.servicesSubheading}
            </p>
          </div>

          <button
            onClick={() => handleNav('services')}
            className="inline-flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors self-start md:self-auto"
          >
            <span>{lang === 'ja' ? '全サービスの工事範囲を見る' : 'Explore All Services'}</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.slice(0, 5).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors">
                  {getServiceIcon(service.iconName)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {service.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {service.shortDesc[lang]}
                </p>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {lang === 'ja' ? '主な対象施設' : 'Target Facilities'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.targetFacilities[lang].slice(0, 2).map((fac, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleNav('services')}
                  className="text-xs font-bold text-slate-900 group-hover:text-amber-600 flex items-center gap-1 transition-colors"
                >
                  <span>{lang === 'ja' ? '詳細仕様・施工範囲' : 'Scope Details'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-xs text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold px-2.5 py-1 rounded transition-colors"
                >
                  {lang === 'ja' ? '見積依頼' : 'Quote'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THREE-STEP PROCESS */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
              {lang === 'ja' ? 'ご発注の流れ' : 'Transparent Process'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.home.flowHeading}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t.home.flowSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.home.flowSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative"
              >
                <div className="inline-block text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => handleNav('contact')}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              <span>{lang === 'ja' ? '現地調査・お見積りを依頼する' : 'Book a Free Site Survey'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (REASONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
            {lang === 'ja' ? '山清電気商会の強み' : 'Our Commitments'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.home.reasonsHeading}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {t.home.reasonsSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasonsToChoose.map((reason) => (
            <div
              key={reason.number}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-amber-300 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 text-amber-600">
                {getReasonIcon(reason.iconName)}
              </div>
              <span className="text-xs font-bold text-slate-400 block mb-1">
                POINT {reason.number}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                {reason.title[lang]}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {reason.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WORK EXAMPLES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
              {lang === 'ja' ? '確かな技術の実績' : 'Project Portfolio'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.home.projectsHeading}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t.home.projectsSubheading}
            </p>
          </div>

          <button
            onClick={() => handleNav('projects')}
            className="inline-flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors"
          >
            <span>{t.home.viewAllProjects}</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projectsData.map((project) => {
            const isActualPhoto = project.imageType === 'actual';

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Responsive Image Header */}
                {project.imageUrl && (
                  <div
                    onClick={() => handleOpenProjectDetail(project.id)}
                    className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt ? project.imageAlt[lang] : project.title[lang]}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                    <div className="absolute top-3 left-3">
                      {isActualPhoto ? (
                        <span className="text-[11px] font-bold text-white bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          <Camera className="w-3 h-3 text-amber-400" />
                          <span>{lang === 'ja' ? '施工実績・実写真' : 'Actual Project Photo'}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-100 bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          <Layers className="w-3 h-3 text-slate-300" />
                          <span>{lang === 'ja' ? 'イメージ画像' : 'Illustrative Image'}</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3">
                      <span className="text-white text-xs sm:text-sm font-bold drop-shadow-xs line-clamp-1">
                        {project.title[lang]}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {project.facilityType[lang]}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {project.location[lang]}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700 block mb-1">
                        {lang === 'ja' ? '【ご相談の課題】' : '[Client Challenge]'}
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {project.challenge[lang]}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg border bg-amber-50/50 border-amber-200">
                      <span className="font-bold block mb-1 text-amber-900">
                        {lang === 'ja' ? '【施工内容】' : '[Our Solution]'}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {project.solution[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <ul className="space-y-1 text-xs text-slate-600">
                      {project.highlights[lang].slice(0, 2).map((hl, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline underline-offset-2 transition-colors"
                  >
                    {lang === 'ja' ? '類似工事の見積相談' : 'Request Quote'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenProjectDetail(project.id)}
                    className="text-xs font-bold text-slate-800 hover:text-amber-700 flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <span>{lang === 'ja' ? '詳細を見る →' : 'View Details →'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FAQ ACCORDION SUMMARY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
            FAQ
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {lang === 'ja' ? 'よくあるご質問（B2B法人様向け）' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {b2bFaqList.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-start gap-2.5 mb-2">
                <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{faq.q[lang]}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                {faq.a[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              {lang === 'ja' ? '迅速な現場調査・お見積り対応' : 'Fast On-Site Evaluation'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
              {t.home.ctaBannerTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.home.ctaBannerSub}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>{t.home.ctaBannerBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
