export type Language = 'ja' | 'en';

export type PageId = 'home' | 'services' | 'about' | 'projects' | 'project-detail' | 'service-area' | 'contact' | 'privacy';

export interface ServiceItem {
  id: string;
  title: { ja: string; en: string };
  shortDesc: { ja: string; en: string };
  fullDesc: { ja: string; en: string };
  targetFacilities: { ja: string[]; en: string[] };
  scopeOfWork: { ja: string[]; en: string[] };
  iconName: string;
  isVerified: boolean;
}

export interface ProjectVerificationAudit {
  officialNameStatus: 'pending' | 'verified';
  locationStatus: 'pending' | 'verified';
  workPerformedStatus: 'pending' | 'verified';
  photosStatus: 'pending' | 'verified';
  outcomeStatus: 'pending' | 'verified';
  permissionStatus: 'pending' | 'verified';
  auditNotes: { ja: string; en: string };
}

export interface ProjectPhoto {
  url: string;
  caption: { ja: string; en: string };
  isVerified: boolean;
  title?: { ja: string; en: string };
  category?: string;
}

export interface ProjectItem {
  id: string;
  title: { ja: string; en: string };
  workingTitle?: { ja: string; en: string };
  facilityType: { ja: string; en: string };
  location: { ja: string; en: string };
  challenge: { ja: string; en: string };
  solution: { ja: string; en: string };
  highlights: { ja: string[]; en: string[] };
  category: 'factory' | 'building' | 'commercial' | 'maintenance' | 'medical';
  isVerified: boolean;
  statusNote: { ja: string; en: string };
  imageUrl?: string;
  imageType?: 'actual' | 'illustrative';
  imageAlt?: { ja: string; en: string };
  // Specific verification tracking fields
  audit?: ProjectVerificationAudit;
  officialClientName?: { ja: string; en: string; isVerified: boolean };
  workPerformedItems?: { ja: string[]; en: string[]; isVerified: boolean };
  photosList?: ProjectPhoto[];
  outcomeSummary?: { ja: string; en: string; isVerified: boolean };
}

export interface CompanyFact {
  key: string;
  label: { ja: string; en: string };
  value: { ja: string; en: string };
  isVerified: boolean;
  note?: { ja: string; en: string };
}

export interface InquiryFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone' | 'any';
  serviceCategory: string;
  projectLocation: string;
  desiredTimeline: string;
  description: string;
  privacyConsent: boolean;
  attachments: { name: string; size: number; type: string }[];
  honeypot: string;
}
