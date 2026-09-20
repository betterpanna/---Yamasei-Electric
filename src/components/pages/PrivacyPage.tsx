import React from 'react';
import { Language, PageId } from '../../types';
import { Lock, ShieldCheck, ArrowLeft, Building2 } from 'lucide-react';

interface PrivacyPageProps {
  lang: Language;
  setCurrentPage: (page: PageId) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ lang, setCurrentPage }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'ja' ? 'ホームに戻る' : 'Back to Home'}</span>
        </button>

        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <Lock className="w-7 h-7 text-amber-500" />
          <span>{lang === 'ja' ? '個人情報保護方針（プライバシーポリシー）' : 'Privacy & Confidentiality Policy'}</span>
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'ja' ? '最終改定日: 2026年9月20日' : 'Last Updated: September 20, 2026'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'ja' ? '1. 基本方針' : '1. Fundamental Principles'}
          </h2>
          <p>
            {lang === 'ja'
              ? '山清電気商会（以下「当社」）は、法人のお客様および取引関係者様の個人情報ならびに企業秘密の重要性を深く認識し、個人情報の保護に関する法律（個人情報保護法）その他の関連法令・ガイドラインを遵守して、適正な取り扱いと安全管理を徹底いたします。'
              : 'Yamasei Electric Co. ("We") acknowledges the supreme importance of corporate confidentiality and personal identifiable information. We strictly observe applicable data privacy regulations and security directives.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'ja' ? '2. 取得する情報' : '2. Information Collected'}
          </h2>
          <p>
            {lang === 'ja'
              ? '当社は、ウェブサイトのお問い合わせ・お見積りフォーム、お電話、メール等を通じて以下の情報を取得することがあります。'
              : 'Through our website inquiry forms, emails, and direct phone consultations, we may collect:'}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{lang === 'ja' ? '貴社名・屋号・事業所名・代表者名・ご担当者名' : 'Company name, facility title, and contact personnel name'}</li>
            <li>{lang === 'ja' ? '郵便番号・施設住所・施工予定場所' : 'Postal address, site coordinates, and facility physical location'}</li>
            <li>{lang === 'ja' ? '電話番号・FAX番号・メールアドレス' : 'Phone, FAX, and email addresses'}</li>
            <li>{lang === 'ja' ? '電気設備図面、現場写真、工事仕様に関する技術資料' : 'Electrical schematics, facility photos, and engineering specifications'}</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'ja' ? '3. 利用目的' : '3. Purpose of Processing'}
          </h2>
          <p>
            {lang === 'ja'
              ? '取得した情報は、以下の目的の達成に必要な範囲でのみ利用いたします。'
              : 'Information is collected exclusively for:'}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{lang === 'ja' ? '電気工事のお見積り作成および現地調査の実施' : 'Preparing quotation estimates and executing physical site surveys'}</li>
            <li>{lang === 'ja' ? 'ご相談・お問い合わせに対する回答および技術的打ち合わせ' : 'Responding to technical questions and conducting engineering meetings'}</li>
            <li>{lang === 'ja' ? '工事契約の締結・施工管理・安全自主点検書類の作成' : 'Contract execution, project management, and regulatory compliance logs'}</li>
            <li>{lang === 'ja' ? '施工完了後の保安点検およびアフターサービスのご案内' : 'Post-commissioning warranty and safety inspection follow-ups'}</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'ja' ? '4. 第三者への開示・提供の禁止' : '4. Prohibition of Third-Party Disclosure'}
          </h2>
          <p>
            {lang === 'ja'
              ? '当社は、法令に基づく正当な開示要請がある場合を除き、お客様の事前の同意を得ることなく個人情報や図面情報を第三者に開示・提供することは一切ございません。'
              : 'We never sell, rent, or disclose facility schematics or client identities to third parties without explicit consent, except under lawful government subpoenas.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'ja' ? '5. 安全管理措置' : '5. Security Measures'}
          </h2>
          <p>
            {lang === 'ja'
              ? '当社は、取り扱う個人情報の漏えい、滅失または毀損の防止その他の安全管理のため、適切な物理的・技術的セキュリティ対策を講じます。'
              : 'We implement administrative and technical security measures against data leakage, loss, or unauthorized tampering.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'ja' ? '6. お問い合わせ窓口' : '6. Privacy Inquiries'}
          </h2>
          <p>
            {lang === 'ja'
              ? '個人情報の取り扱いに関するご質問・ご相談は、山清電気商会のお問い合わせ窓口（Webフォームまたは代表電話）までご連絡ください。'
              : 'For privacy inquiries or data review requests, please contact Yamasei Electric via our inquiry form.'}
          </p>
        </section>
      </div>
    </div>
  );
};
