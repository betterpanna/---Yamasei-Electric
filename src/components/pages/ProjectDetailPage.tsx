import React, { useState } from 'react';
import { Language, PageId } from '../../types';
import { projectsData } from '../../data/companyData';
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Camera,
  CheckCircle2,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Sparkles,
  Zap,
  Layers,
  Shield,
} from 'lucide-react';

interface ProjectDetailPageProps {
  lang: Language;
  projectId: string;
  setCurrentPage: (page: PageId) => void;
  onSelectProject?: (id: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  lang,
  projectId,
  setCurrentPage,
  onSelectProject,
}) => {
  const project = projectsData.find((p) => p.id === projectId) || projectsData[0];
  const isShimizu = project.id === 'proj-shimizu';

  // Lightbox modal state for high-res photo inspection
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = project.photosList || [];

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && photos.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && photos.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Back Navigation Bar */}
      <div className="pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={() => {
            setCurrentPage('projects');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'ja' ? '施工実績一覧に戻る' : 'Back to All Projects'}</span>
        </button>
      </div>

      {/* Hero Visual Banner (If Project has Image) */}
      {project.imageUrl && (
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 aspect-[21/9] min-h-[260px] sm:min-h-[340px] flex flex-col justify-end p-6 sm:p-10 group">
          <img
            src={project.imageUrl}
            alt={project.imageAlt ? project.imageAlt[lang] : project.title[lang]}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white bg-slate-900/85 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{project.location[lang]}</span>
              </span>

              {project.imageType === 'actual' ? (
                <span className="text-xs font-bold text-white bg-slate-900/85 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Camera className="w-3 h-3 text-amber-400" />
                  <span>{lang === 'ja' ? '施工実績・実写真' : 'Actual Project Photo'}</span>
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-100 bg-slate-900/85 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Layers className="w-3 h-3 text-slate-300" />
                  <span>{lang === 'ja' ? 'イメージ画像' : 'Illustrative Image'}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
              {project.title[lang]}
            </h1>

            {project.workingTitle && (
              <p className="text-sm sm:text-base text-amber-300 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{project.workingTitle[lang]}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Project Title Header (if no hero image was used) */}
      {!project.imageUrl && (
        <div className="space-y-4">
          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full inline-block">
            {project.facilityType[lang]}
          </span>

          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
            {project.title[lang]}
          </h1>
        </div>
      )}

      {/* Verified Notice / Disclosure Banner */}
      {isShimizu ? (
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {lang === 'ja' ? '施主様提供の現場写真を掲載' : 'Client-Provided Site Photography'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'ja'
                  ? '施主様よりご提供・許諾いただいた実際の外観・診察室・減菌室・手術用マイクロスコープ・診療廊下の現場写真を掲載しております。'
                  : 'Official photography of the exterior, operatory suites, sterilization lab, surgical microscope, and clinical corridors has been provided and authorized by the client.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const galleryEl = document.getElementById('project-photos-gallery');
              if (galleryEl) {
                galleryEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="shrink-0 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>{lang === 'ja' ? '写真ギャラリーを見る' : 'View Photos Gallery'}</span>
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {lang === 'ja' ? '写真の表示について' : 'About This Photo'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'ja'
                  ? '本事例のヘッダー写真は設備形態をお伝えするための「イメージ画像」です。施主様の機密保持のため実際の現場写真は非公開ですが、記載の課題・施工内容はすべて当社の実施工に基づくものです。'
                  : 'The header visual is an illustrative image representing the facility type. Under client confidentiality, actual job site photography is not published, but the challenge and engineering scope described reflect real work performed by Yamasei Electric.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>{lang === 'ja' ? '類似工事の見積・相談' : 'Request Similar Quote'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3 Core Business Questions: Need, Work Performed, Outcome */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-500" />
            <span>{lang === 'ja' ? '案件サマリー（課題・施工内容・成果）' : 'Project Breakdown (Need, Scope & Outcome)'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'ja'
              ? '医療・商業・工場施設のお客様からよくいただくご相談にお応えした具体的な電気エンジニアリング実績です。'
              : 'Detailed breakdown answering customer needs, engineering methodology, and measurable outcomes.'}
          </p>
        </div>

        {/* 1. Customer's Need / Challenge */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center shadow-xs">
              1
            </span>
            <div>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                {lang === 'ja' ? 'お客様のご要望・課題' : "Client Need & Challenge"}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {lang === 'ja' ? 'どのようなご相談・背景でしたか？' : 'What was the initial requirement?'}
              </h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 leading-relaxed text-xs sm:text-sm text-slate-700 space-y-3">
            <p>{project.challenge[lang]}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">
                  {lang === 'ja' ? '施設区分・規模' : 'Facility Type'}
                </span>
                <span className="text-slate-600">{project.facilityType[lang]}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">
                  {lang === 'ja' ? '所在地・エリア' : 'Location'}
                </span>
                <span className="text-slate-600">{project.location[lang]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Work Performed */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 font-bold text-sm flex items-center justify-center shadow-xs">
              2
            </span>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {lang === 'ja' ? '山清電気商会の施工内容' : 'Engineering & Work Performed'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {lang === 'ja' ? '具体的にどのような工事を行いましたか？' : 'What electrical work was executed?'}
              </h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 leading-relaxed text-xs sm:text-sm text-slate-700 space-y-4">
            <p>{project.solution[lang]}</p>

            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-900 block">
                {lang === 'ja' ? '主な施工項目・技術ポイント:' : 'Key Engineering Deliverables:'}
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights[lang].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Outcome & Results */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
              3
            </span>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                {lang === 'ja' ? '竣工成果・効果' : 'Project Outcome & Client Impact'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {lang === 'ja' ? '工事によってどのような効果が得られましたか？' : 'What was the final outcome?'}
              </h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 leading-relaxed text-xs sm:text-sm text-slate-800 space-y-4">
            <p className="font-medium">{project.outcomeSummary ? project.outcomeSummary[lang] : project.solution[lang]}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center shadow-2xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  {lang === 'ja' ? '医療用接地抵抗' : 'Medical Grounding'}
                </span>
                <span className="font-bold text-emerald-700 text-base">10Ω以下</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{lang === 'ja' ? 'D種接地完全適合' : 'Class-D Validated'}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center shadow-2xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  {lang === 'ja' ? '絶縁抵抗値' : 'Insulation'}
                </span>
                <span className="font-bold text-emerald-700 text-base">100MΩ以上</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{lang === 'ja' ? '法定基準クリア' : 'Exceeds Code'}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center shadow-2xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  {lang === 'ja' ? '高演色照明' : 'Color Rendering'}
                </span>
                <span className="font-bold text-emerald-700 text-base">Ra 90+</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{lang === 'ja' ? '歯牙色調正確再現' : 'Clinical Grade'}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center shadow-2xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  {lang === 'ja' ? '消防・受電検査' : 'Inspections'}
                </span>
                <span className="font-bold text-emerald-700 text-base">{lang === 'ja' ? '一発合格' : '100% Pass'}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{lang === 'ja' ? '予定通り開院' : 'On Schedule'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Real Site Photography Gallery or Photo Disclosure Status */}
      {photos.length > 0 ? (
        <div id="project-photos-gallery" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                REAL SITE PHOTOGRAPHY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-6 h-6 text-amber-500" />
                <span>{lang === 'ja' ? '現場記録写真ギャラリー' : 'Official Project Photography'}</span>
              </h2>
            </div>

            <span className="text-xs text-slate-500 font-medium">
              {lang === 'ja'
                ? '※クリックすると高精細拡大写真と施工解説を表示します'
                : '* Click any photo to inspect full resolution with engineering notes'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title ? photo.title[lang] : photo.caption[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />

                  {photo.category && (
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                      {photo.category}
                    </span>
                  )}

                  <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white p-1.5 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-amber-400" />
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  {photo.title && (
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {photo.title[lang]}
                    </h4>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {photo.caption[lang]}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{lang === 'ja' ? '掲載許諾確認済' : 'Authorized Photo'}</span>
                    </span>
                    <span className="font-mono text-slate-400">Photo {idx + 1} / {photos.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                PHOTOGRAPHY & DISCLOSURE STATUS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-6 h-6 text-amber-500" />
                <span>{lang === 'ja' ? '現場写真の公開ステータスについて' : 'Job Site Photography Disclosure'}</span>
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {lang === 'ja' ? '機密保持規程（NDA）対象案件' : 'Subject to Client NDA'}
            </span>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'ja'
                    ? '自社現場写真の提供準備中（イメージ画像にて掲載中）'
                    : 'Official Site Photos Pending (Represented by Illustrative Visual)'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'ja'
                    ? '本案件は、施主様および管理会社様との機密保持規程（NDA）および施設セキュリティ保持の観点から、Web上での現場実写の一般公開を控え、施設種別・工事規模を表すイメージ画像を用いております。'
                    : 'To comply with client non-disclosure agreements and facility security requirements, public disclosure of job site photos is restricted. An illustrative visual is used to represent the facility scale and installation type.'}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'ja'
                    ? 'なお、類似施設における電気容量計算書、系統図面、導入機器の選定基準、施工計画などの詳細につきましては、個別のお打ち合わせおよび現地調査時に守秘義務の範囲内でご案内可能です。同様の工事をご検討中のお客様はお気軽にご相談ください。'
                    : 'Engineering calculations, single-line diagrams, equipment specifications, and project management plans can be reviewed during private consultations or on-site surveys. Please contact us if you are considering a similar facility upgrade.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {lang === 'ja'
                  ? '※山清電気商会では、全案件において施主様のプライバシーと企業機密を厳格に保護いたします。'
                  : '* Yamasei Electric strictly adheres to client confidentiality and data privacy.'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shrink-0"
              >
                <span>{lang === 'ja' ? 'この事例について相談・見積依頼' : 'Inquire About This Project'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Fullscreen Photo View */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-800 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Photo {lightboxIndex + 1} of {photos.length}
                </span>
                {photos[lightboxIndex].category && (
                  <span className="text-xs text-slate-400 border border-slate-700 px-2 py-0.5 rounded-md">
                    {photos[lightboxIndex].category}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title={lang === 'ja' ? '閉じる' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Display with Prev/Next Navigation */}
            <div className="relative bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[440px] max-h-[55vh]">
              <img
                src={photos[lightboxIndex].url}
                alt={photos[lightboxIndex].title ? photos[lightboxIndex].title[lang] : photos[lightboxIndex].caption[lang]}
                referrerPolicy="no-referrer"
                className="max-h-[55vh] w-auto max-w-full object-contain"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all backdrop-blur-xs border border-white/20"
                title={lang === 'ja' ? '前の写真' : 'Previous'}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all backdrop-blur-xs border border-white/20"
                title={lang === 'ja' ? '次の写真' : 'Next'}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Caption & Details */}
            <div className="p-6 space-y-2 bg-slate-900 border-t border-slate-800">
              {photos[lightboxIndex].title && (
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {photos[lightboxIndex].title[lang]}
                </h3>
              )}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {photos[lightboxIndex].caption[lang]}
              </p>

              <div className="flex flex-wrap items-center justify-between pt-3 text-xs text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'ja' ? '山清電気商会 施工管理・安全自主検査済' : 'Inspected & Commissioned by Yamasei Electric'}</span>
                </span>

                <span className="text-slate-500">
                  {lang === 'ja' ? 'キーボードの矢印キーまたは左右ボタンで写真を切替可能' : 'Use arrow buttons to navigate'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Bar */}
      <div className="p-8 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {lang === 'ja' ? '医院・クリニック・医療施設の電気設備工事をご検討中の方へ' : 'Need Commercial Electrical Services for Your Facility?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'ja'
              ? '休診日・夜間の計画施工や、デンタルユニット・高圧滅菌器用電源、まぶしさを抑えた高演色LED化など、現場の事情に配慮した丁寧な施工をご提案します。'
              : 'We provide specialized off-hours installations, medical equipment feeds, and energy audits.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors shadow-xs"
          >
            <span>{lang === 'ja' ? '現地調査・お見積りを依頼' : 'Request Site Survey & Quote'}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
