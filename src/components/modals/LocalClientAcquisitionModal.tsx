import React, { useState } from 'react';
import { Language } from '../../types';
import {
  X,
  Share2,
  MapPin,
  Search,
  CheckCircle2,
  Copy,
  Check,
  Building,
  FileText,
  Mail,
  QrCode,
  ExternalLink,
  ShieldCheck,
  Star,
  Camera,
  TrendingUp,
  ArrowRight,
  Info,
} from 'lucide-react';

interface LocalClientAcquisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const LocalClientAcquisitionModal: React.FC<LocalClientAcquisitionModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'gbp' | 'gsc' | 'share'>('gbp');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const emailSignatureJa = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
山清電気商会（Yamasei Electric）
法人電気設備工事・受変電・LED更新・保安管理
〒000-0000 [要確認: 正式所在地]
TEL: 0X-XXXX-XXXX [要確認: 電話番号]
FAX: 0X-XXXX-XXXX [要確認]
E-mail: info@yamasei-denki.example.jp [要確認]
Web: https://yamasei-denki.example.jp/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
※工場・ビル・店舗の現地調査・お見積りは無料です。`;

  const quotationTextJa = `【施工実績・会社情報のご案内】
弊社Webサイトにて、これまでの電気設備工事事例、保有国家資格、
出張対応エリア等を公開しております。ぜひご参照ください。
https://yamasei-denki.example.jp/`;

  const businessCardTextJa = `表面: 山清電気商会 代表者名 / 資格 / 連絡先
裏面: 【事業内容】高圧受変電・キュービクル / 工場動力配線 / LED更新 / 保守点検
Webサイト: https://yamasei-denki.example.jp/
（※QRコード貼付推奨）`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-7 flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ja' ? '地域B2B顧客獲得ガイド' : 'Local B2B Client Growth'}</span>
              </span>
              <span className="text-xs text-slate-400">
                {lang === 'ja' ? 'Google連携 & ダイレクト共有キット' : 'Google Tools & Direct Referral Kit'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'ja'
                ? '近隣企業からの相談・見積依頼を確実に増やす実践ガイド'
                : 'Local B2B Inquiries & Client Acquisition Manual'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {lang === 'ja'
                ? '良いデザインに加え、「明確な工事ページ」「実施工事例」「Google掲載」「簡単な問合せ導線」が問合せを生みます。'
                : 'Service pages, real project examples, Google listing, and frictionless contact bring qualified inquiries.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('gbp')}
            className={`pb-3 px-4 font-bold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'gbp'
                ? 'border-amber-500 text-slate-900 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>{lang === 'ja' ? '1. Googleビジネスプロフィール登録' : '1. Google Business Profile'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gsc')}
            className={`pb-3 px-4 font-bold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'gsc'
                ? 'border-amber-500 text-slate-900 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-4 h-4 text-blue-600" />
            <span>{lang === 'ja' ? '2. Search Consoleで検索需要を分析' : '2. Search Console Analytics'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('share')}
            className={`pb-3 px-4 font-bold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'share'
                ? 'border-amber-500 text-slate-900 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ja' ? '3. 既存顧客・パートナー直接共有キット' : '3. Direct Share & Referral Kit'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700">
          {/* TAB 1: GOOGLE BUSINESS PROFILE */}
          {activeTab === 'gbp' && (
            <div className="space-y-6">
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-base">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>
                    {lang === 'ja'
                      ? 'Googleマップ・ローカル検索（無料）で地域企業から見つけてもらう'
                      : 'Free Visibility on Google Search and Maps for Local B2B'}
                  </span>
                </div>
                <p className="leading-relaxed">
                  {lang === 'ja'
                    ? 'Googleは検索とマップ上でビジネスプロフィールを無料で提供しています。近隣の工場や施設管理者が「地域名 電気工事」「キュービクル 点検」と検索した際に最優先で表示されます。'
                    : 'Google offers the business profile for free on Search and Maps. Local facility managers and property owners find certified contractors here first.'}
                </p>
              </div>

              {/* Step by step checklist */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'ja' ? '登録・設定チェックリスト' : 'GBP Setup & Verification Checklist'}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-[11px]">1</span>
                      {lang === 'ja' ? '確認済みの正確な企業情報' : 'Accurate Verified Information'}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === 'ja'
                        ? '屋号は「山清電気商会」と正確に登録。電話番号、営業時間（平日8:30〜17:30）、会社所在地をWebサイト表記と完全一致させます（NAP一致）。'
                        : 'Register the official business name "山清電気商会". Keep Phone, Address, and Hours completely identical to your website (NAP consistency).'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-[11px]">2</span>
                      {lang === 'ja' ? '自社Webサイトリンクの設定' : 'Website Link Connection'}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === 'ja'
                        ? 'プロフィール内の「ウェブサイト」項目に、本サイトURL（https://yamasei-denki.example.jp/）を登録。事業内容・見積依頼フォームへ直結させます。'
                        : 'Link your official website URL so visitors on Google Maps can immediately review your confirmed services and submit quote requests.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-[11px]">3</span>
                      {lang === 'ja' ? '出張対応エリア（サービス提供地域）の指定' : 'Define Actual Service Area'}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === 'ja'
                        ? '拠点から車で約60分圏内の市区町村、周辺主要工業団地を指定登録。検索されたエリア内の企業に対して上位表示が促されます。'
                        : 'Specify service delivery zones (cities within 60-minute driving radius and local industrial parks) to target nearby facility managers.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-[11px]">4</span>
                      {lang === 'ja' ? '現場写真・機材・社用車の写真' : 'Real Equipment & Team Photos'}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === 'ja'
                        ? '社用車、工具、分電盤、計測器、作業風景（守秘義務に抵触しない許諾済み写真）をアップロード。実在性と技術の信頼度が一気に向上します。'
                        : 'Upload real photos of fleet trucks, measurement instruments, clean panels, and authorized work sites. Never use stock photos.'}
                    </p>
                  </div>
                </div>

                {/* Customer Reviews Section */}
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
                    <Star className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                    <span>{lang === 'ja' ? '実際の顧客からのクチコミ（レビュー）獲得' : 'Collect Reviews from Real Clients'}</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {lang === 'ja'
                      ? '施工完了後の引き渡し時や定期点検時に、「Googleのクチコミにご感想をいただけますと励みになります」とショートリンクをご案内。丁寧な対応と確かな技術への評価が、次の新規法人の見積依頼を呼び込みます。'
                      : 'Ask satisfied facility managers and building owners for honest feedback after commissioning. Real B2B reviews build immediate trust for new inquiries.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE SEARCH CONSOLE */}
          {activeTab === 'gsc' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-900 text-base">
                  <Search className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>
                    {lang === 'ja'
                      ? 'Google Search Consoleで「どんな検索語で訪問されているか」を把握する'
                      : 'Understand Search Queries that Bring Local Businesses'}
                  </span>
                </div>
                <p className="leading-relaxed">
                  {lang === 'ja'
                    ? 'Search Consoleにサイトを登録すると、近隣企業が「どの地域名」「どの工事名（キュービクル、LED、動力配線）」で検索して自社サイトに流入しているかを正確に把握できます。'
                    : 'Adding your website to Search Console allows you to discover the exact search terms local businesses use to find you, enabling targeted content updates.'}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>{lang === 'ja' ? 'Search Console 連携手順' : 'Search Console Setup Steps'}</span>
                </h4>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-slate-900 block">
                      {lang === 'ja' ? 'ステップ1: プロパティの追加' : 'Step 1: Add Property'}
                    </span>
                    <p className="text-slate-600 text-xs">
                      {lang === 'ja'
                        ? 'Google Search Consoleにて「URLプレフィックス」または「ドメイン」で本サイトURLを登録し、所有権を確認します。'
                        : 'Register https://yamasei-denki.example.jp/ in Search Console and complete domain or HTML tag verification.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <span className="font-bold text-slate-900 block">
                      {lang === 'ja' ? 'ステップ2: XMLサイトマップの送信' : 'Step 2: Submit XML Sitemap'}
                    </span>
                    <p className="text-slate-600 text-xs">
                      {lang === 'ja'
                        ? '「サイトマップ」メニューから、以下のURLを送信して各サービスページおよび施工事例ページを速やかにインデックスさせます。'
                        : 'Submit your sitemap URL to ensure every confirmed service page and project example is indexed by Googlebot.'}
                    </p>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 text-amber-400 font-mono text-xs">
                      <span>https://yamasei-denki.example.jp/sitemap.xml</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('https://yamasei-denki.example.jp/sitemap.xml', 'sitemap-url')}
                        className="text-xs bg-slate-800 text-slate-200 px-2 py-1 rounded hover:bg-slate-700 flex items-center gap-1"
                      >
                        {copiedKey === 'sitemap-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'sitemap-url' ? 'コピー済' : 'コピー'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-slate-900 block">
                      {lang === 'ja' ? 'ステップ3: クエリレポートの定期確認' : 'Step 3: Analyze Search Terms'}
                    </span>
                    <p className="text-slate-600 text-xs">
                      {lang === 'ja'
                        ? '「検索パフォーマンス」タブで「表示回数」「クリック数」「掲載順位」を確認。「近隣市名 + 電気工事」や「特定設備 + 修繕」の順位をモニタリングし、サービスページの文章を改善します。'
                        : 'Review search impressions and click-through rates. Focus on keywords like "[City Name] electrical repair" or "substation inspection factory".'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIRECT SHARING KIT */}
          {activeTab === 'share' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-base">
                  <Share2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    {lang === 'ja'
                      ? '検索順位が上がるのを待たずに、既存顧客・パートナーから今すぐ問合せを得る'
                      : 'Bring Immediate Inquiries from Existing Partners & Clients'}
                  </span>
                </div>
                <p className="leading-relaxed">
                  {lang === 'ja'
                    ? '検索エンジンの上位表示には一定の時間がかかります。しかし、見積書、名刺、メール署名、会社案内にサイトURLやQRコードを記載することで、初日から関連性の高い見込み客がサイトを訪問します。'
                    : 'Search visibility takes time; putting the site link on quotations, business cards, email signatures, and company profiles brings relevant visitors right away.'}
                </p>
              </div>

              {/* Copyable Templates */}
              <div className="space-y-4">
                {/* 1. Quotations */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-bold text-slate-900">
                        {lang === 'ja' ? '【見積書・請求書】貼付用テキスト' : 'Quotation & Invoice Footer Snippet'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(quotationTextJa, 'quote-text')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    >
                      {copiedKey === 'quote-text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'quote-text' ? 'コピー完了' : 'テキストをコピー'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-sans">
                    {quotationTextJa}
                  </pre>
                </div>

                {/* 2. Business Cards */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-slate-700" />
                      <span className="text-sm font-bold text-slate-900">
                        {lang === 'ja' ? '【名刺裏面】記載用フォーマット' : 'Business Card Backside Format'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(businessCardTextJa, 'card-text')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    >
                      {copiedKey === 'card-text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'card-text' ? 'コピー完了' : 'フォーマットをコピー'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-sans">
                    {businessCardTextJa}
                  </pre>
                </div>

                {/* 3. Email Signature */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-bold text-slate-900">
                        {lang === 'ja' ? '【業務メール署名】スニペット' : 'Email Signature Template'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(emailSignatureJa, 'sig-text')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    >
                      {copiedKey === 'sig-text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'sig-text' ? 'コピー完了' : '署名をコピー'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-mono">
                    {emailSignatureJa}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            {lang === 'ja'
              ? '実施工事例の蓄積と地域パートナー連携が、もっとも安定した見積依頼を生み出します。'
              : 'Confirmed real work and direct local sharing generate the most qualified inquiries.'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
          >
            {lang === 'ja' ? '閉じる' : 'Close Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};
