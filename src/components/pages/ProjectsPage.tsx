import React, { useState } from 'react';
import { Language, PageId } from '../../types';
import { projectsData } from '../../data/companyData';
import {
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers,
  Camera,
  Sparkles,
} from 'lucide-react';

interface ProjectsPageProps {
  lang: Language;
  setCurrentPage: (page: PageId) => void;
  onSelectProject?: (id: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  lang,
  setCurrentPage,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'factory' | 'building' | 'maintenance' | 'medical'>('all');

  const filteredProjects =
    filter === 'all' ? projectsData : projectsData.filter((p) => p.category === filter);

  const handleOpenDetail = (id: string) => {
    onSelectProject?.(id);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
          {lang === 'ja' ? '確かな技術と施工事例' : 'Engineering Case Studies'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {lang === 'ja' ? '施工実績・事例紹介' : 'Projects & Work Examples'}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {lang === 'ja'
            ? '工場増設に伴う動力盤新設、水銀灯から高天井LEDへの更新、緊急漏電トラブルの復旧修繕など、実際の現場で培った技術実績をご紹介します。'
            : 'Explore real-world industrial and commercial electrical installations, machinery feeder expansions, and high-bay LED retrofits.'}
        </p>
      </div>

      {/* NDA Confidentiality Badge */}
      <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Shield className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {lang === 'ja'
            ? '※企業秘密保持およびセキュリティの観点から、施主様企業名および詳細な所在番地は非公開としております。同種設備の改修検討の参考としてご覧ください。'
            : '* Under non-disclosure and security policies, specific client corporate names and addresses are anonymized. Reference data is provided for engineering feasibility evaluations.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            filter === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {lang === 'ja' ? 'すべての事例' : 'All Projects'}
        </button>

        <button
          type="button"
          onClick={() => setFilter('factory')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            filter === 'factory'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {lang === 'ja' ? '工場・動力配線' : 'Industrial & Machinery'}
        </button>

        <button
          type="button"
          onClick={() => setFilter('maintenance')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            filter === 'maintenance'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {lang === 'ja' ? 'LED更新・省エネ' : 'LED Retrofits'}
        </button>

        <button
          type="button"
          onClick={() => setFilter('building')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            filter === 'building'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {lang === 'ja' ? 'ビル・緊急修繕' : 'Building & Repairs'}
        </button>

        <button
          type="button"
          onClick={() => setFilter('medical')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            filter === 'medical'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {lang === 'ja' ? '医療・クリニック' : 'Medical & Clinics'}
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {filteredProjects.map((project) => {
          const isActualPhoto = project.imageType === 'actual';

          return (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Responsive Hero Image Banner */}
              {project.imageUrl && (
                <div
                  onClick={() => handleOpenDetail(project.id)}
                  className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[340px] w-full bg-slate-950 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt ? project.imageAlt[lang] : project.title[lang]}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Photo Status Badge */}
                  <div className="absolute top-4 left-4">
                    {isActualPhoto ? (
                      <span className="text-xs font-bold text-white bg-slate-900/85 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lang === 'ja' ? '施工実績・実写真' : 'Actual Project Photo'}</span>
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-100 bg-slate-900/85 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-slate-300" />
                        <span>{lang === 'ja' ? 'イメージ画像' : 'Illustrative Image'}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Category Overlaid at Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
                    {project.workingTitle && (
                      <div className="text-xs text-amber-300 font-bold mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{project.workingTitle[lang]}</span>
                      </div>
                    )}
                    <h3 className="text-lg sm:text-2xl font-bold text-white line-clamp-2">
                      {project.title[lang]}
                    </h3>
                  </div>
                </div>
              )}

              {/* Project Header Bar */}
              <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                    {project.facilityType[lang]}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {project.location[lang]}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(project.id)}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-400 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <span>{lang === 'ja' ? '詳細ページを見る' : 'View Details'}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors shrink-0"
                  >
                    <span>{lang === 'ja' ? '類似工事の見積りを依頼' : 'Quote Similar Project'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                  {isActualPhoto ? (
                    <>
                      <Camera className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        {lang === 'ja'
                          ? '施主様よりご提供・許諾いただいた現場写真を掲載しています。'
                          : 'Site photography provided and authorized by the client is shown below.'}
                      </p>
                    </>
                  ) : (
                    <>
                      <Layers className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        {lang === 'ja'
                          ? 'この事例の写真は施設の種別を伝えるための「イメージ画像」です。施主様の機密保持のため実際の現場写真は非公開ですが、記載の課題・施工内容は実際の施工実績に基づきます。'
                          : 'The photo shown is an illustrative image representing the facility type. Under client confidentiality, actual job site photos are not published, but the challenge and engineering scope described reflect real work performed.'}
                      </p>
                    </>
                  )}
                </div>

                {/* Photo Thumbnails Strip (Verified Photo Projects Only) */}
                {project.photosList && project.photosList.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-amber-600" />
                        <span>{lang === 'ja' ? '現場記録写真:' : 'Site Photos:'}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(project.id)}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800"
                      >
                        {lang === 'ja' ? 'すべて見る →' : 'View All →'}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {project.photosList.map((p, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => handleOpenDetail(project.id)}
                          className="group/photo relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer"
                        >
                          <img
                            src={p.url}
                            alt={p.title ? p.title[lang] : p.caption[lang]}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover/photo:scale-108 transition-transform duration-300"
                          />
                          {p.category && (
                            <span className="absolute bottom-1.5 left-1.5 bg-slate-950/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                              {p.category}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Challenge */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'ja' ? '課題・ご相談内容' : 'Client Challenge & Need'}</span>
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {project.challenge[lang]}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-5 rounded-2xl border space-y-2 bg-amber-50/50 border-amber-200">
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-amber-900">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'ja' ? '施工内容・ソリューション' : 'Engineering Solution'}</span>
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {project.solution[lang]}
                    </p>
                  </div>
                </div>

                {/* Technical Highlights */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    {lang === 'ja' ? '主な施工仕様・成果ハイライト' : 'Key Specifications & Engineering Results'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {project.highlights[lang].map((hl, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Note & Detail Link */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
                  <span>{project.statusNote[lang]}</span>
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(project.id)}
                    className="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-amber-700 transition-colors self-start sm:self-auto"
                  >
                    <span>{lang === 'ja' ? '詳細仕様・実績を見る →' : 'View Specifications & Results →'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
