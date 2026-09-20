import React, { useState } from 'react';
import { Language } from '../../types';
import { X, FileCode, Check, Copy, ExternalLink, Globe, Search, Share2 } from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'schema' | 'seo'>('sitemap');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const xmlSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Homepage -->
  <url>
    <loc>https://yamasei-denki.example.jp/</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="https://yamasei-denki.example.jp/?lang=ja" />
    <xhtml:link rel="alternate" hreflang="en" href="https://yamasei-denki.example.jp/?lang=en" />
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Services Catalog -->
  <url>
    <loc>https://yamasei-denki.example.jp/services</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="https://yamasei-denki.example.jp/services?lang=ja" />
    <xhtml:link rel="alternate" hreflang="en" href="https://yamasei-denki.example.jp/services?lang=en" />
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- About & Engineering Credentials -->
  <url>
    <loc>https://yamasei-denki.example.jp/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Projects & Work Examples -->
  <url>
    <loc>https://yamasei-denki.example.jp/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Confirmed Service Area -->
  <url>
    <loc>https://yamasei-denki.example.jp/service-area</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Contact / Quote Request -->
  <url>
    <loc>https://yamasei-denki.example.jp/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Privacy Policy -->
  <url>
    <loc>https://yamasei-denki.example.jp/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  const jsonLdContent = `{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "山清電気商会",
  "alternateName": "Yamasei Electric Co.",
  "url": "https://yamasei-denki.example.jp",
  "telephone": "[要確認: 電話番号]",
  "email": "info@yamasei-denki.example.jp [要確認]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[要確認: 番地ビル名]",
    "addressLocality": "[要確認: 市区町村]",
    "addressRegion": "[要確認: 都道府県]",
    "addressCountry": "JP"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "17:30"
    }
  ],
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "指定対応エリア [要確認]"
  },
  "serviceType": [
    "高圧受変電設備工事（キュービクル新設・更新）",
    "工場動力設備配線（三相200V/400V幹線）",
    "法人向けLED照明更新工事・省エネ提案",
    "自家用電気工作物点検・漏電調査・改修"
  ]
}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 text-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500 text-slate-950">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {lang === 'ja' ? 'SEO構造化データ & XMLサイトマップ' : 'SEO Structured Data & XML Sitemap'}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'ja' ? '検索エンジン・Google ビジネスプロフィール連携仕様' : 'Search indexing & Local Business Schema'}
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

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('sitemap')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'sitemap'
                ? 'border-amber-500 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            XML Sitemap (sitemap.xml)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schema')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'schema'
                ? 'border-amber-500 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Schema.org (Electrician JSON-LD)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'seo'
                ? 'border-amber-500 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Google Business Profile & Meta
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {activeTab === 'sitemap' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">
                  {lang === 'ja' ? '全ページのクローラー巡回用URLマップ' : 'Crawler-ready clean multilingual URLs'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(xmlSitemapContent)}
                  className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded hover:bg-amber-100 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'コピー済み' : 'XMLをコピー'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto max-h-80 border border-slate-800">
                {xmlSitemapContent}
              </pre>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">
                  {lang === 'ja' ? 'ローカルビジネス（電気工事業）構造化マークアップ' : 'Structured Data for Search Knowledge Panel'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(jsonLdContent)}
                  className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded hover:bg-amber-100 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'コピー済み' : 'JSON-LDをコピー'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto max-h-80 border border-slate-800">
                {jsonLdContent}
              </pre>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-amber-600" />
                  <span>Google ビジネスプロフィール（GBP）連携ガイド</span>
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {lang === 'ja'
                    ? '公式Googleビジネスプロフィールを開設またはオーナー確認完了後、当サイトのURLを「ウェブサイト」項目へ登録することで、地域検索（「〇〇市 工場 電気工事」「キュービクル 更新 業者」等）におけるMEO（マップ検索順位）の向上と、信頼性の高いナレッジパネル表示が実現します。'
                    : 'Link this website URL to your verified Google Business Profile to boost local map-pack rankings for commercial electrical inquiries.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span>SNS・ビジネスチャット共有用 OGPメタタグ</span>
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {lang === 'ja'
                    ? 'Slack、Chatwork、Teams、メール等でURLを共有した際に、会社名・事業内容・信頼感のあるサムネイルカードが正しく展開されるよう、index.html内にOpenGraphおよびTwitter Cardが整備されています。'
                    : 'OpenGraph tags are configured to render professional preview cards on Slack, Teams, email, and social platforms.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg"
          >
            {lang === 'ja' ? '閉じる' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
