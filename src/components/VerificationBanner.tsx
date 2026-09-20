import React, { useState } from 'react';
import { Language } from '../types';
import { ShieldAlert, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface VerificationBannerProps {
  lang: Language;
  onOpenModal: () => void;
  onOpenSitemapModal: () => void;
}

export const VerificationBanner: React.FC<VerificationBannerProps> = ({
  lang,
  onOpenModal,
  onOpenSitemapModal,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500/15 via-slate-100 to-amber-500/10 border-b border-amber-200/80 px-4 py-2.5 text-xs text-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold shrink-0">
            !
          </span>
          <p className="font-medium text-slate-800">
            {lang === 'ja' ? (
              <>
                <strong className="text-slate-900 font-bold">【情報掲載方針】</strong>
                実在する確認済み企業情報のみを掲載しています。未確認の代表者名・登記住所・許認可番号は明確にプレースホルダー表示としています。
              </>
            ) : (
              <>
                <strong className="text-slate-900 font-bold">[Verification Standard]</strong>
                Only verified business data is published. Missing items like representative name, address, or permit numbers are demarcated as placeholders.
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-500 hover:decoration-amber-800 transition-colors"
          >
            <span>{lang === 'ja' ? '確認済み・未確認項目リストを見る' : 'View Verification Checklist'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onOpenSitemapModal}
            className="hidden sm:inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs px-2 py-0.5 rounded bg-white/70 border border-slate-200 hover:bg-white"
          >
            <span>{lang === 'ja' ? 'サイト構成・SEO情報' : 'Sitemap & SEO'}</span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-500 hover:text-slate-800 ml-1 rounded-md"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
