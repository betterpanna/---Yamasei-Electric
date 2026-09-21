import React, { useState, useEffect, useRef } from 'react';
import { Language, PageId, InquiryFormData } from '../../types';
import { translations } from '../../data/translations';
import { defaultCompanyFacts, servicesData } from '../../data/companyData';
import { TurnstileWidget, TurnstileWidgetHandle } from '../TurnstileWidget';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Lock,
  Copy,
  Check,
  Clock,
  MapPin,
} from 'lucide-react';

// Supabase Edge Function that validates the Turnstile token server-side and
// inserts the inquiry into public.inquiries. No Supabase API key is sent:
// the function has verify_jwt disabled and is meant to be called directly
// from the browser.
const SUBMIT_INQUIRY_ENDPOINT = 'https://bjdsqisygrrssgflmkzt.supabase.co/functions/v1/submit-inquiry';

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
    referenceId: string | null;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<'pending' | 'ready' | 'expired' | 'error'>('pending');
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  const phoneFact = defaultCompanyFacts.find((f) => f.key === 'phone');
  const emailFact = defaultCompanyFacts.find((f) => f.key === 'email');
  const addressFact = defaultCompanyFacts.find((f) => f.key === 'address');

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const mapQuery = encodeURIComponent(addressFact?.value.ja || '大阪府東大阪市新町5-2');
  const mapEmbedSrc = mapsApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${mapQuery}&language=${lang === 'ja' ? 'ja' : 'en'}`
    : undefined;
  const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const resetTurnstile = () => {
    turnstileRef.current?.reset();
    setTurnstileToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Prevent duplicate submissions from double-clicks or a slow network.
    if (isSubmitting) return;

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

    if (turnstileSiteKey && turnstileStatus === 'error') {
      setSubmitError(t.errorTurnstileUnavailable);
      return;
    }

    if (!turnstileToken) {
      setSubmitError(t.errorTurnstileMissing);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SUBMIT_INQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          preferred_contact: formData.preferredContact,
          service_category: formData.serviceCategory,
          project_location: formData.projectLocation,
          desired_timeline: formData.desiredTimeline,
          description: formData.description,
          privacy_consent: formData.privacyConsent,
          turnstile_token: turnstileToken,
        }),
      });

      // A Turnstile token can only be redeemed once; get a fresh one ready
      // for either a retry after failure or a brand new submission.
      resetTurnstile();

      let data: Record<string, unknown> = {};
      try {
        data = await response.json();
      } catch {
        // Non-JSON or empty body; fall through to status-based handling.
      }

      if (!response.ok) {
        const serverMessage = typeof data.error === 'string' ? data.error : undefined;
        setSubmitError(serverMessage || t.errorGeneral);
        return;
      }

      const referenceId =
        (typeof data.id === 'string' && data.id) ||
        (typeof data.reference === 'string' && data.reference) ||
        (typeof data.inquiry_id === 'string' && data.inquiry_id) ||
        null;

      setSubmissionResult({ referenceId });
    } catch (err) {
      console.error('Inquiry submission failed:', err);
      resetTurnstile();
      setSubmitError(t.errorNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fallback used only when the online submission fails or Turnstile can't
  // load, so the visitor still has a one-click way to reach us with what
  // they already typed.
  const buildInquiryText = () =>
    lang === 'ja'
      ? `【お問い合わせ内容】
貴社名: ${formData.companyName}
ご担当者: ${formData.contactName}
ご連絡先: ${formData.email} / ${formData.phone}
希望連絡方法: ${formData.preferredContact}
工事種目: ${formData.serviceCategory}
施設場所: ${formData.projectLocation}
希望時期: ${formData.desiredTimeline}
内容:
${formData.description}`
      : `[Inquiry Details]
Company: ${formData.companyName}
Contact: ${formData.contactName}
Email/Phone: ${formData.email} / ${formData.phone}
Preferred Contact: ${formData.preferredContact}
Service: ${formData.serviceCategory}
Location: ${formData.projectLocation}
Timeline: ${formData.desiredTimeline}
Description:
${formData.description}`;

  const buildFallbackMailtoLink = (targetEmail: string) => {
    const subject =
      lang === 'ja'
        ? `【電気設備工事のお問い合わせ】${formData.companyName || ''}`
        : `Electrical Contracting Inquiry - ${formData.companyName || ''}`;
    return `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildInquiryText())}`;
  };

  const copyInquiryPayload = () => {
    navigator.clipboard.writeText(buildInquiryText());
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
                {t.successTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t.successMessage}
              </p>
            </div>
          </div>

          {submissionResult.referenceId && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
              <span className="font-bold text-slate-500">{t.referenceNumber}</span>
              <span className="font-mono font-bold text-slate-900 text-base">
                {submissionResult.referenceId}
              </span>
            </div>
          )}

          <div className="pt-2">
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
                  honeypot: '',
                });
              }}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium"
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
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                  <div className="pt-2 border-t border-red-200/70 flex flex-wrap items-center gap-3">
                    <span className="font-bold text-red-800">{t.fallbackHeading}</span>
                    <a
                      href={buildFallbackMailtoLink(emailFact?.value[lang] || 'yamakiyo@sweet.ocn.ne.jp')}
                      className="inline-flex items-center gap-1.5 bg-white border border-red-300 hover:bg-red-100 text-red-800 font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{t.fallbackEmailBtn}</span>
                    </a>
                    <button
                      type="button"
                      onClick={copyInquiryPayload}
                      className="inline-flex items-center gap-1.5 bg-white border border-red-300 hover:bg-red-100 text-red-800 font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? t.copied : t.copyPayload}</span>
                    </button>
                  </div>
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

              {/* Attachment Note (no upload picker - files must be emailed directly) */}
              <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-3">
                {t.attachmentNote}
              </p>

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

              {/* Cloudflare Turnstile (bot / spam verification) */}
              {turnstileSiteKey ? (
                <div className="space-y-1.5">
                  <TurnstileWidget
                    ref={turnstileRef}
                    siteKey={turnstileSiteKey}
                    onToken={(token) => {
                      setTurnstileToken(token);
                      setTurnstileStatus('ready');
                    }}
                    onExpire={() => {
                      setTurnstileToken(null);
                      setTurnstileStatus('expired');
                    }}
                    onError={() => {
                      setTurnstileToken(null);
                      setTurnstileStatus('error');
                    }}
                  />
                  {turnstileStatus === 'expired' && (
                    <p className="text-xs text-amber-700">{t.errorTurnstileMissing}</p>
                  )}
                  {turnstileStatus === 'error' && (
                    <p className="text-xs text-red-600">{t.errorTurnstileUnavailable}</p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                  {t.errorTurnstileUnavailable}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !turnstileSiteKey}
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
