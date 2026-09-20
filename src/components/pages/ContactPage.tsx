import React, { useState, useEffect } from 'react';
import { Language, PageId, InquiryFormData } from '../../types';
import { translations } from '../../data/translations';
import { defaultCompanyFacts, servicesData } from '../../data/companyData';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Paperclip,
  X,
  FileText,
  Lock,
  Copy,
  Check,
  Clock,
  MapPin,
} from 'lucide-react';

interface ContactPageProps {
  lang: Language;
  setCurrentPage: (page: PageId) => void;
  preselectedServiceId?: string;
  prefilledDesc?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  lang,
  setCurrentPage,
  preselectedServiceId,
  prefilledDesc,
}) => {
  const t = translations[lang].contact;

  const [formData, setFormData] = useState<InquiryFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    preferredContact: 'any',
    serviceCategory: preselectedServiceId || 'substation',
    projectLocation: '',
    desiredTimeline: '',
    description: prefilledDesc || '',
    privacyConsent: false,
    attachments: [],
    honeypot: '',
  });

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceCategory: preselectedServiceId }));
    }
    if (prefilledDesc) {
      setFormData((prev) => ({ ...prev, description: prefilledDesc }));
    }
  }, [preselectedServiceId, prefilledDesc]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceId: string;
    submittedAt: string;
    targetEmail: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const phoneFact = defaultCompanyFacts.find((f) => f.key === 'phone');
  const emailFact = defaultCompanyFacts.find((f) => f.key === 'email');
  const addressFact = defaultCompanyFacts.find((f) => f.key === 'address');

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const mapQuery = encodeURIComponent(addressFact?.value.ja || '大阪府東大阪市新町5-2');
  const mapEmbedSrc = mapsApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${mapQuery}&language=${lang === 'ja' ? 'ja' : 'en'}`
    : undefined;
  const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments = [...formData.attachments];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (newAttachments.length >= 3) {
        alert(lang === 'ja' ? '添付ファイルは最大3点までとなります。' : 'Maximum 3 files allowed.');
        break;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(lang === 'ja' ? '1ファイルあたり10MB以下にしてください。' : 'File size must be under 10MB.');
        continue;
      }
      newAttachments.push({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }

    setFormData({ ...formData, attachments: newAttachments });
  };

  const removeAttachment = (index: number) => {
    const next = [...formData.attachments];
    next.splice(index, 1);
    setFormData({ ...formData, attachments: next });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Spam honeypot detection
    if (formData.honeypot) {
      console.warn('Bot submission trapped via honeypot field.');
      return;
    }

    // Validation
    if (!formData.companyName.trim() || !formData.contactName.trim()) {
      setSubmitError(t.errorRequired);
      return;
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      setSubmitError(t.errorEmailOrPhone);
      return;
    }

    if (!formData.privacyConsent) {
      setSubmitError(t.errorConsent);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const refId = `YMS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const timestamp = new Date().toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US');
      const targetEmail = emailFact?.value[lang] || 'yamakiyo@sweet.ocn.ne.jp';

      // Keep a local copy so the customer can retrieve/copy it again if needed.
      // This form has no backend: the inquiry is only actually sent once the
      // customer's email app opens (below) and they press send.
      try {
        const storedInquiries = JSON.parse(localStorage.getItem('yamasei_inquiries') || '[]');
        storedInquiries.push({ refId, timestamp, ...formData });
        localStorage.setItem('yamasei_inquiries', JSON.stringify(storedInquiries));
      } catch (err) {
        console.error('Storage note:', err);
      }

      setSubmissionResult({
        referenceId: refId,
        submittedAt: timestamp,
        targetEmail,
      });

      // Open the customer's email app with the inquiry pre-filled so it
      // actually reaches the company (there is no server to receive this form).
      window.location.href = buildMailtoLink(refId, timestamp, targetEmail);
    }, 400);
  };

  const buildInquiryText = (refId: string, timestamp: string) =>
    lang === 'ja'
      ? `【お問い合わせ控え】
受付番号: ${refId}
日時: ${timestamp}
貴社名: ${formData.companyName}
ご担当者: ${formData.contactName}
ご連絡先: ${formData.email} / ${formData.phone}
希望連絡方法: ${formData.preferredContact}
工事種目: ${formData.serviceCategory}
施設場所: ${formData.projectLocation}
希望時期: ${formData.desiredTimeline}
内容:
${formData.description}`
      : `[Inquiry Summary]
Reference: ${refId}
Date: ${timestamp}
Company: ${formData.companyName}
Contact: ${formData.contactName}
Email/Phone: ${formData.email} / ${formData.phone}
Preferred Contact: ${formData.preferredContact}
Service: ${formData.serviceCategory}
Location: ${formData.projectLocation}
Timeline: ${formData.desiredTimeline}
Description:
${formData.description}`;

  const buildMailtoLink = (refId: string, timestamp: string, targetEmail: string) => {
    const subject =
      lang === 'ja'
        ? `【電気設備工事のお問い合わせ】${formData.companyName || ''}`
        : `Electrical Contracting Inquiry - ${formData.companyName || ''}`;
    return `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      buildInquiryText(refId, timestamp)
    )}`;
  };

  const copyInquiryPayload = () => {
    if (!submissionResult) return;
    navigator.clipboard.writeText(
      buildInquiryText(submissionResult.referenceId, submissionResult.submittedAt)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
          {lang === 'ja' ? '無料現地調査・お見積り' : 'Request a Quote / Site Survey'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Workflow Guidance Card */}
      <div className="bg-slate-100/90 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-slate-700 font-medium">
            {lang === 'ja' ? (
              <>
                <strong className="text-slate-900 font-bold">お取引の流れ: </strong>
                ご要望の確認 → 現地調査・図面確認（無料） → 詳細項目別お見積り → ご納得後に着工
              </>
            ) : (
              <>
                <strong className="text-slate-900 font-bold">Procedure: </strong>
                Requirement Review → Free On-Site Survey → Itemized Quote → Work Commences
              </>
            )}
          </p>
        </div>
      </div>

      {/* Confirmation View after Successful Submission */}
      {submissionResult ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 text-emerald-600">
            <CheckCircle2 className="w-8 h-8 shrink-0" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {lang === 'ja' ? 'お問い合わせ内容を準備しました' : 'Your inquiry is ready to send'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {lang === 'ja'
                  ? 'お使いのメールアプリが開き、宛先と内容が入力された状態になります。内容をご確認のうえ「送信」を押してお送りください。開かない場合は下のボタンからお試しいただくか、内容をコピーして送信してください。'
                  : "Your email app should now be open with the message pre-filled. Please review it and press send. If it didn't open, use the button below or copy the details to send manually."}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-1">
              <span className="font-bold text-slate-500">{t.referenceNumber}</span>
              <span className="font-mono font-bold text-slate-900 text-base">
                {submissionResult.referenceId}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-bold text-slate-500">
                {lang === 'ja' ? '送信先メールアドレス' : 'Sending To'}
              </span>
              <span className="font-medium text-slate-800">
                {submissionResult.targetEmail}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={buildMailtoLink(submissionResult.referenceId, submissionResult.submittedAt, submissionResult.targetEmail)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold px-5 py-3 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{lang === 'ja' ? 'メールアプリを開いて送信する' : 'Open Email App to Send'}</span>
            </a>

            <button
              type="button"
              onClick={copyInquiryPayload}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copied : t.copyPayload}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSubmissionResult(null);
                setFormData({
                  companyName: '',
                  contactName: '',
                  email: '',
                  phone: '',
                  preferredContact: 'any',
                  serviceCategory: 'substation',
                  projectLocation: '',
                  desiredTimeline: '',
                  description: '',
                  privacyConsent: false,
                  attachments: [],
                  honeypot: '',
                });
              }}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-4 py-2.5"
            >
              {t.sendAnother}
            </button>
          </div>
        </div>
      ) : (
        /* The Inquiry Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Banner */}
              {submitError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Bot Honeypot field (hidden) */}
              <div className="hidden" aria-hidden="true">
                <label>Do not fill this</label>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              {/* Company & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.companyLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.companyPlaceholder}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.nameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.emailLabel} <span className="text-slate-400 font-normal">（メールまたは電話のいずれか必須）</span>
                  </label>
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {t.preferredContactLabel}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <label
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      formData.preferredContact === 'email'
                        ? 'border-amber-500 bg-amber-50 font-bold text-slate-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={() => setFormData({ ...formData, preferredContact: 'email' })}
                      className="sr-only"
                    />
                    <span>{t.prefEmail}</span>
                  </label>

                  <label
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      formData.preferredContact === 'phone'
                        ? 'border-amber-500 bg-amber-50 font-bold text-slate-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={() => setFormData({ ...formData, preferredContact: 'phone' })}
                      className="sr-only"
                    />
                    <span>{t.prefPhone}</span>
                  </label>

                  <label
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      formData.preferredContact === 'any'
                        ? 'border-amber-500 bg-amber-50 font-bold text-slate-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value="any"
                      checked={formData.preferredContact === 'any'}
                      onChange={() => setFormData({ ...formData, preferredContact: 'any' })}
                      className="sr-only"
                    />
                    <span>{t.prefAny}</span>
                  </label>
                </div>
              </div>

              {/* Service Category & Facility Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.serviceLabel}
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title[lang]}
                      </option>
                    ))}
                    <option value="other">{lang === 'ja' ? 'その他・総合相談' : 'Other / General Inquiry'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.locationLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.locationPlaceholder}
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {t.timelineLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.timelinePlaceholder}
                  value={formData.desiredTimeline}
                  onChange={(e) => setFormData({ ...formData, desiredTimeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {t.descLabel}
                </label>
                <textarea
                  rows={4}
                  placeholder={t.descPlaceholder}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Optional Attachments (Upload drawings/photos) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  {t.uploadLabel}
                </label>
                <p className="text-[11px] text-slate-500">{t.uploadHint}</p>

                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{lang === 'ja' ? 'ファイルを選択' : 'Select Files'}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                  </label>

                  {formData.attachments.length > 0 && (
                    <span className="text-xs text-slate-500">
                      {formData.attachments.length} {lang === 'ja' ? 'ファイル選択中' : 'file(s) selected'}
                    </span>
                  )}
                </div>

                {formData.attachments.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {formData.attachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{att.name}</span>
                          <span className="text-slate-400 text-[10px]">
                            ({(att.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(idx)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-xs text-slate-700 leading-relaxed">
                    {t.privacyCheck}（
                    <button
                      type="button"
                      onClick={() => setCurrentPage('privacy')}
                      className="text-amber-700 underline font-semibold"
                    >
                      {t.privacyLink}
                    </button>
                    ）
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t.submitting}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>{t.submitBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Sidebar: Direct Contact Details & Trust */}
          <div className="lg:col-span-4 space-y-6">
            {/* Phone Inquiries Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>{t.infoBoxTitle}</span>
              </div>

              <div className="space-y-2">
                <a
                  href={`tel:${phoneFact?.isVerified ? phoneFact?.value[lang].replace(/[^0-9]/g, '') : '0000000000'}`}
                  className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold text-amber-400 hover:text-amber-300 tracking-tight transition-colors group"
                  title={lang === 'ja' ? 'タップしてお電話で発信' : 'Tap to dial now'}
                >
                  <span>{phoneFact?.value[lang]}</span>
                </a>
                <p className="text-xs text-slate-400">{t.infoBoxNote}</p>
                <p className="text-[11px] text-amber-300/90 font-medium">
                  {lang === 'ja'
                    ? '※スマートフォン・端末からタップして直接お電話いただけます'
                    : '※Tap number above to call directly from your device'}
                </p>
              </div>

              <div className="text-xs text-slate-300 pt-3 border-t border-slate-800 space-y-1">
                <p className="font-semibold text-white">
                  {lang === 'ja' ? '受付時間:' : 'Hours:'}
                </p>
                <p className="text-slate-400">
                  {lang === 'ja'
                    ? '平日 8:30〜17:30（お電話受付）'
                    : 'Weekdays 8:30-17:30 (Phone inquiries open)'}
                </p>
              </div>
            </div>

            {/* Email Inquiries & Drawing Submission Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>{lang === 'ja' ? 'メール窓口・図面送付' : 'Direct Email & Plans'}</span>
              </div>

              <div className="space-y-2">
                <a
                  href={`mailto:${emailFact?.value[lang] || 'yamakiyo@sweet.ocn.ne.jp'}`}
                  className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-amber-400 hover:text-amber-300 tracking-tight transition-colors break-all group"
                  title={lang === 'ja' ? 'タップしてメールを作成' : 'Tap to compose email'}
                >
                  <span>{emailFact?.value[lang] || 'yamakiyo@sweet.ocn.ne.jp'}</span>
                </a>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'ja'
                    ? 'CAD図面、現地写真、工事仕様書などの添付送付も上記メール宛に直接お送りいただけます。'
                    : 'Directly send CAD schematics, site photographs, or tender documents to our verified inbox.'}
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:${emailFact?.value[lang] || 'yamakiyo@sweet.ocn.ne.jp'}?subject=${encodeURIComponent(lang === 'ja' ? '【電気設備工事相談・見積依頼】山清電気商会 御中' : 'Electrical Contracting Inquiry - Yamasei Electric')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-950" />
                    <span>{lang === 'ja' ? 'メールソフトを起動する' : 'Open Mail App'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Office Location Map Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 pb-4 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'ja' ? '本社所在地' : 'Head Office Location'}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {addressFact?.value[lang]}
                </p>
              </div>

              {mapEmbedSrc ? (
                <iframe
                  title={lang === 'ja' ? '山清電気商会 本社地図' : 'Yamasei Electric head office map'}
                  src={mapEmbedSrc}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              ) : (
                <div className="h-[220px] flex items-center justify-center bg-slate-100 text-xs text-slate-500 px-6 text-center">
                  {lang === 'ja'
                    ? '地図を表示するにはGoogle Maps APIキーの設定が必要です。'
                    : 'Set a Google Maps API key to display the map.'}
                </div>
              )}

              <div className="p-4 border-t border-slate-100">
                <a
                  href={mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 underline"
                >
                  <span>{lang === 'ja' ? 'Google マップで経路を見る' : 'Get directions on Google Maps'}</span>
                </a>
              </div>
            </div>

            {/* Actual Service Area Card */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-3 shadow-xs text-xs text-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'ja' ? '出張対応エリア' : 'Actual Service Area'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage('service-area')}
                  className="text-amber-700 hover:text-amber-800 font-bold underline text-xs"
                >
                  {lang === 'ja' ? '詳細マップ' : 'Area Map'}
                </button>
              </div>
              <p className="leading-relaxed font-semibold text-slate-900">
                {lang === 'ja'
                  ? '東大阪市新町の本社拠点より車で約30〜60分圏内を中心に対応'
                  : 'Core service area within ~30-60 min driving radius from Higashiosaka base'}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'ja'
                  ? '東大阪市・八尾市・大東市・大阪市内および近隣市区町村の工場・商業施設・オフィスビルへ迅速にお伺いします。緊急の漏電調査やブレーカー遮断トラブルも即応体制をとっております。※隣接エリアも事前ご相談にて柔軟に対応いたします。'
                  : 'Fast dispatch to factories, commercial complexes, and office buildings across Higashiosaka, Yao, Daito, Osaka City, and surrounding municipalities. Emergency support available.'}
              </p>
            </div>

            {/* Privacy & B2B Security Promise */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3 shadow-xs text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>{lang === 'ja' ? '守秘義務・情報管理の徹底' : 'Strict Confidentiality'}</span>
              </div>
              <p className="leading-relaxed">
                {lang === 'ja'
                  ? 'お客様からお預かりした施設情報・図面・お問い合わせ内容は、お見積り作成および施工管理の目的にのみ使用し、第三者への開示・提供は一切行いません。'
                  : 'Facility drawings and specifications submitted are handled strictly under confidentiality agreements for quotation purposes only.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
