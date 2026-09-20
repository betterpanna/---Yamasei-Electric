import { CompanyFact, ServiceItem, ProjectItem } from '../types';

export interface CompanyProfile {
  nameJa: string;
  nameEn: string;
  kana: string;
  taglineJa: string;
  taglineEn: string;
  established: string;
  representative: string;
  postalCode: string;
  addressJa: string;
  addressEn: string;
  phone: string;
  fax: string;
  email: string;
  businessHoursJa: string;
  businessHoursEn: string;
  holidaysJa: string;
  holidaysEn: string;
  licenseNumber: string;
  qualifiedStaff: string[];
  serviceRadius: string;
}

// Verified vs Placeholder company metadata
export const defaultCompanyFacts: CompanyFact[] = [
  {
    key: 'trade_name',
    label: { ja: '商号 / 屋号', en: 'Trade Name' },
    value: { ja: '山清電気商会', en: 'Yamasei Electric' },
    isVerified: true,
  },
  {
    key: 'business_type',
    label: { ja: '事業形態', en: 'Business Structure' },
    value: { ja: '電気工事業・電気設備設計施工', en: 'Electrical Contracting & Engineering' },
    isVerified: true,
  },
  {
    key: 'representative',
    label: { ja: '代表者名', en: 'Representative' },
    value: { ja: '山崎 直人（ヤマザキ ナオト）', en: 'Naoto Yamazaki (Representative)' },
    isVerified: true,
  },
  {
    key: 'address',
    label: { ja: '本社・事業所所在地', en: 'Head Office Location' },
    value: { ja: '〒579-8037 大阪府東大阪市新町5-2', en: '5-2 Shinmachi, Higashiosaka, Osaka 579-8037 Japan' },
    isVerified: true,
  },
  {
    key: 'phone',
    label: { ja: '代表電話番号', en: 'Primary Telephone' },
    value: { ja: '072-984-6895', en: '072-984-6895' },
    isVerified: true,
  },
  {
    key: 'email',
    label: { ja: '受付専用メールアドレス', en: 'Inquiry Email Address' },
    value: { ja: 'yamakiyo@sweet.ocn.ne.jp', en: 'yamakiyo@sweet.ocn.ne.jp' },
    isVerified: true,
    note: { ja: '公式お問い合わせ・お見積もり依頼受付メールアドレスです。Webフォームおよび直接送信用として稼働中。', en: 'Official designated email address for quote requests and inquiries.' },
  },
  {
    key: 'license',
    label: { ja: '電気工事業登録番号・建設業許可', en: 'Electrical Contractor License' },
    value: { ja: '[要確認: 大阪府知事届出・登録番号 / 建設業許可]', en: '[To be confirmed: Osaka Prefecture Contractor License No.]' },
    isVerified: false,
    note: { ja: '大阪府知事届出または登録電気工事業者番号の確認手続き中です。', en: 'Prefectural electrical contractor registration or construction license confirmation pending.' },
  },
  {
    key: 'service_area',
    label: { ja: '対応エリア', en: 'Service Area' },
    value: { ja: '大阪府東大阪市（本社拠点）および近郊主要エリア（八尾・大東・大阪市内・近畿圏）', en: 'Higashiosaka City (Base), Yao, Daito, Osaka City & Kansai Region' },
    isVerified: true,
  },
];

// Required Facts needed from the client to finalize production deployment
export const missingCompanyFacts = [
  {
    category: { ja: '基本情報（会社確定）', en: 'Basic Identity (Confirmed)' },
    items: [
      { ja: '代表者名: 山崎 直人（ヤマザキ ナオト）氏 【確認済み・サイト反映完了】', en: 'Representative: Naoto Yamazaki [Verified & Updated]' },
      { ja: '所在地: 〒579-8037 大阪府東大阪市新町5-2 【確認済み・サイト反映完了】', en: 'Address: 5-2 Shinmachi, Higashiosaka, Osaka 579-8037 [Verified & Updated]' },
      { ja: '創業・設立年月（任意追加項目）', en: 'Year and month of establishment (Optional)' },
    ],
  },
  {
    category: { ja: '連絡先・受付体制', en: 'Contact & Reception' },
    items: [
      { ja: '代表電話番号: 072-984-6895 【確認済み・ワンタップ発信有効化完了】', en: 'Primary Telephone: 072-984-6895 [Verified & Dialing Enabled]' },
      { ja: '公式メールアドレス: yamakiyo@sweet.ocn.ne.jp 【確認済み・メーラー連携完了】', en: 'Official Email: yamakiyo@sweet.ocn.ne.jp [Verified & Linked]' },
      { ja: 'FAX番号（任意追加項目）', en: 'FAX number (Optional)' },
    ],
  },
  {
    category: { ja: '許認可・資格', en: 'Licenses & Credentials' },
    items: [
      { ja: '登録電気工事業者届出番号または建設業許可番号（大阪府知事登録番号等）', en: 'Electrical contractor registration number or construction permit (Osaka Prefecture)' },
      { ja: '社内保有資格（第一種・第二種電気工事士、電気工事施工管理技士等）の人数内訳', en: 'Qualified personnel counts (1st/2nd Class Electricians, Construction Management Engineers)' },
      { ja: '加入している工事損害賠償保険・労災保険の詳細（任意）', en: 'Commercial general liability / contractor insurance details (Optional)' },
    ],
  },
  {
    category: { ja: '対応エリア・施工実績許諾', en: 'Service Radius & Project Authorization' },
    items: [
      { ja: '対応エリア: 大阪府東大阪市新町拠点より30〜60分圏内を中心に確定 【確認済み】', en: 'Service Area: Centered on Higashiosaka base within 30-60 min radius [Verified]' },
      {
        ja: '「しみず歯科」様（東大阪市）の施工事例: 正式名称・高圧改修工事・現場写真5点掲載完了 【確認・許諾済み】',
        en: 'SHIMIZU DENTAL (Higashiosaka) project: Confirmed scope & 5 site photos published [Verified & Authorized]',
      },
      { ja: 'その他クライアント様の過去施工事例の新規掲載許諾（順次確認中）', en: 'Additional client project photo permissions (Under progressive review)' },
    ],
  },
];

export const servicesData: ServiceItem[] = [
  {
    id: 'substation',
    title: {
      ja: '高圧受変電設備・キュービクル工事',
      en: 'High-Voltage Substation & Cubicle Engineering',
    },
    shortDesc: {
      ja: '工場・ビル・商業施設の受電設備の新設、更新、変圧器・遮断器（VCB・LBS）の交換や定期点検に対応。',
      en: 'Turnkey installation, replacement, and modernization of high-voltage cubicles, transformers, and VCB circuit breakers for commercial facilities.',
    },
    fullDesc: {
      ja: 'ビルや大型工場など、電力会社から高圧（6,600V）で受電する施設に必要な受変電設備（キュービクル）の設計・施工・機器更新を行います。経年劣化したトランスやコンデンサの更新、PCB含有機器の調査・適正更新支援、主任技術者様との連携による保安点検時の改修工事を確実に遂行します。',
      en: 'Complete turnkey engineering and retrofit of 6,600V high-voltage power substations and cubicles. We coordinate with facility electrical managers (Chief Electrical Engineers) to execute safe replacements of aging transformers, vacuum circuit breakers (VCB), phase capacitors, and protection relays.',
    },
    targetFacilities: {
      ja: ['製造工場・加工場', '物流倉庫・配送センター', 'オフィスビル・複合商業施設', '医療機関・介護福祉施設'],
      en: ['Manufacturing Plants & Factories', 'Logistics Warehouses & Depots', 'Commercial Office Buildings', 'Medical & Care Facilities'],
    },
    scopeOfWork: {
      ja: [
        'キュービクル本体の搬入・据付・基礎工事',
        '高圧気中負荷開閉器（LBS）・真空遮断器（VCB）の更新',
        '高圧受電ケーブル（高圧引込線）張替・端末処理',
        'トップランナー変圧器への省エネ高効率更新',
        '保護継電器（過電流・地絡継電器等）試験および連動調整',
      ],
      en: [
        'Cubicle delivery, positioning, and foundation engineering',
        'VCB vacuum circuit breaker & LBS load break switch upgrades',
        'High-voltage incoming feeder cable replacement and termination',
        'Top-runner energy-efficient transformer modernization',
        'Protection relay testing, calibration, and commissioning',
      ],
    },
    iconName: 'Zap',
    isVerified: true,
  },
  {
    id: 'industrial-power',
    title: {
      ja: '工場・事業所の動力設備・幹線配線工事',
      en: 'Industrial Power Distribution & Heavy Machinery Wiring',
    },
    shortDesc: {
      ja: '新設機械の電源増設、分電盤改修、動力幹線ケーブルの敷設、電圧降下対策など現場環境に合わせた確実な配線。',
      en: 'Heavy-duty power distribution, machine hook-ups, power panel installations, and cable tray infrastructure for manufacturing lines.',
    },
    fullDesc: {
      ja: '製造ラインのレイアウト変更や大型工作機械・空調機の導入に伴う動力電源（三相200V/400V）の引込・配線工事を提供します。ブレーカー容量計算、ケーブルサイズの選定、ケーブルラック・配管敷設まで、安全基準に適合した堅牢な施工を徹底します。',
      en: 'Reliable three-phase (200V/400V) electrical wiring for manufacturing lines, CNC machinery, large industrial compressors, and HVAC units. We calculate load capacities, voltage drops, and install heavy-duty conduits and cable tray systems strictly meeting national safety codes.',
    },
    targetFacilities: {
      ja: ['金属加工・機械製造工場', '食品加工施設・クリーンルーム', '印刷工場・倉庫', '各種作業場・テストラボ'],
      en: ['Machining & Metal Fabrication Plants', 'Food Processing Facilities', 'Printing Works & Logistics Warehouses', 'R&D Labs & Workshops'],
    },
    scopeOfWork: {
      ja: [
        '主幹分電盤・動力盤・制御盤の新設および改造',
        '生産設備・工作機械・プレス機への電源供給工事',
        '配管・ケーブルラック・ダクト工事（防爆・耐候仕様対応可）',
        '契約電力変更（増量・減量）に伴う電力会社申請手続き',
        'アース（接地）工事・接地抵抗測定および試験記録作成',
      ],
      en: [
        'New installation and retrofitting of main distribution & power panels',
        'Dedicated electrical feeds for production machinery & presses',
        'Rigid steel conduit, trunking, and cable ladder routing',
        'Power utility contract modification and paperwork handling',
        'Grounding/earthing installation and electrical resistance certification',
      ],
    },
    iconName: 'Factory',
    isVerified: true,
  },
  {
    id: 'led-lighting',
    title: {
      ja: '法人向けLED照明化・省エネ改修工事',
      en: 'Commercial LED Retrofits & Energy Efficiency Upgrades',
    },
    shortDesc: {
      ja: '高天井工場、倉庫、オフィス、店舗の既設照明をLEDへ全面更新。照度改善と電気代削減、長寿命化を実現。',
      en: 'Full-scale LED replacements for high-bay factories, warehouses, retail stores, and corporate offices with ROI and lumen calculations.',
    },
    fullDesc: {
      ja: '水銀灯廃止に伴う高天井LED更新や、蛍光灯安定器の劣化による故障を防ぐバイパス工事・器具更新を行います。事前の照度シミュレーションにより、作業現場の明るさ確保と電力コストの大幅削減（最大50〜70%カット）を両立。高所作業車や足場工事もワンストップで管理します。',
      en: 'Eliminate obsolete mercury vapor and fluorescent fixtures with high-efficiency commercial LED systems. We conduct lux/lumen simulations to guarantee safety standards while slashing electricity bills by 50-70%. We provide complete boom lift and scaffolding management for elevated installations.',
    },
    targetFacilities: {
      ja: ['天井高6m以上の物流倉庫・工場', 'オフィスビル・共用部・駐車場', '商業施設・スーパーマーケット', '学校体育館・公共施設'],
      en: ['Warehouses & High-Bay Factories (6m+ height)', 'Corporate Offices, Common Areas & Parking Lots', 'Supermarkets & Retail Stores', 'Commercial Arenas & Facilities'],
    },
    scopeOfWork: {
      ja: [
        '高天井用LED照明器具（防塵・防水・耐熱仕様）への更新',
        'オフィス用直管LED器具交換および安定器バイパス工事',
        '人感センサー・照度自動調光システムの導入設計',
        '非常灯・誘導灯の蓄電池点検およびLED更新',
        '電力削減効果の事前試算（年間電気代削減シミュレーション）',
      ],
      en: [
        'High-bay industrial LED fixtures (dust/water/heat-resistant)',
        'Linear fluorescent replacement & ballast bypass wiring',
        'Motion sensor & smart daylight-harvesting control systems',
        'Emergency lighting & exit sign battery/LED compliance checks',
        'Pre-construction power savings & ROI financial payback models',
      ],
    },
    iconName: 'Lightbulb',
    isVerified: true,
  },
  {
    id: 'maintenance-safety',
    title: {
      ja: '電気保守点検・漏電調査・改修修繕',
      en: 'Electrical Safety Audits, Leakage Troubleshooting & Repairs',
    },
    shortDesc: {
      ja: '突然のブレーカートリップ、漏電警報、異臭・過熱など緊急トラブルの原因特定から復旧、定期自主点検まで。',
      en: 'Rapid investigation of circuit breaker trips, insulation leakage alarms, thermal hotspots, and scheduled preventative inspections.',
    },
    fullDesc: {
      ja: '長年稼働している事業所では、ホコリの堆積によるトラッキング現象や配線の絶縁劣化が重大な火災・操業停止リスクとなります。絶縁抵抗測定（メガテスト）、サーモグラフィによる発熱箇所特定、漏電ブレーカーの誤動作診断を行い、安心の事業継続（BCP）を支えます。',
      en: 'Insulation degradation, dust tracking, and loose connections pose severe fire hazards and production downtime. We use precision mega-ohm insulation meters and infrared thermal imaging to identify overloaded conductors, malfunctioning breakers, and earth leakage issues for business continuity.',
    },
    targetFacilities: {
      ja: ['老朽化したテナントビル・雑居ビル', '24時間稼働の食品工場・配送センター', '店舗・レストラン・厨房設備', '賃貸マンション・アパートの共用幹線'],
      en: ['Aging Commercial Buildings & Multi-tenant Properties', '24/7 Production Centers & Cold Storage', 'Commercial Kitchens & Restaurants', 'Rental Property Shared Electrical Mains'],
    },
    scopeOfWork: {
      ja: [
        'メガテスターによる回路別絶縁抵抗測定・不良箇所特定',
        'サーモグラフィ（赤外線カメラ）による分電盤内部の過熱診断',
        '老朽化開閉器・ELB（漏電遮断器）・マグネットスイッチの交換',
        '断線・短絡・接触不良の復旧修理工事',
        '改修後の電気点検記録書・提出用報告書の発行',
      ],
      en: [
        'Circuit-by-circuit mega-ohmmeter insulation diagnosis',
        'Infrared thermal imaging to detect hot connections & loose lugs',
        'Urgent replacement of worn ELBs, switches, and contactors',
        'Restoration of severed, shorted, or corroded conductors',
        'Official inspection logs and B2B compliance test documentation',
      ],
    },
    iconName: 'ShieldAlert',
    isVerified: true,
  },
  {
    id: 'emergency-power',
    title: {
      ja: '非常用電源・防災電気設備・盤改修',
      en: 'Emergency Generators, Fire Safety Electricals & Panel Modernization',
    },
    shortDesc: {
      ja: 'BCP対策としての非常用自家発電機の接続工事、UPS配線、誘導灯・火報連動、老朽化した配電盤の刷新。',
      en: 'Emergency backup generator interconnects, UPS wiring, fire alarm interlocks, and complete main distribution board overhauls.',
    },
    fullDesc: {
      ja: '地震や水害などの自然災害時に重要設備（サーバー、冷蔵冷凍庫、セキュリティ）を稼働し続けるための非常用電源切替盤の設置、UPS系統の専用回路工事に対応します。消防用設備基準に適合した防災配線工事も専門の有資格者が施工します。',
      en: 'Ensure business continuity during regional grid blackouts with automatic transfer switches (ATS), dedicated UPS power loops for IT servers, and fire-resistant wiring compliant with stringent Japanese fire safety ordinances.',
    },
    targetFacilities: {
      ja: ['IT・データセンター・サーバールーム', '医薬品・低温倉庫・保冷保管庫', '介護施設・病院・診療所', '自治体指定避難所・公共施設'],
      en: ['Server Rooms & Data Infrastructure', 'Refrigerated Cold Warehouses', 'Clinics & Elder Care Centers', 'Community Emergency Shelters'],
    },
    scopeOfWork: {
      ja: [
        '非常用発電設備（可搬式・固定式）の切替盤配線工事',
        '重要機器向けUPS（無停電電源装置）の専用分岐回路増設',
        '火災報知器・排煙連動設備・誘導灯配線改修',
        '感震ブレーカー・耐震支持金物の追加施工',
        '停電時実負荷切替試験および取扱指導',
      ],
      en: [
        'Transfer switch integration for portable & stationary generators',
        'Dedicated sub-circuits for uninterruptible power supplies (UPS)',
        'Fire alarm, smoke evacuation damper, and exit sign upgrades',
        'Earthquake-activated seismic breakers and structural conduit bracing',
        'Simulated blackout transfer commissioning and staff operation drills',
      ],
    },
    iconName: 'Activity',
    isVerified: true,
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-shimizu',
    title: {
      ja: '【実施工案件・写真掲載】SHIMIZU DENTAL（しみず歯科）様 クリニック電気設備工事',
      en: '[Authentic Project & Photography] SHIMIZU DENTAL Modern Clinic Electrical Engineering',
    },
    workingTitle: {
      ja: 'SHIMIZU DENTAL（しみず歯科）／「家族の笑顔を守る 瓢箪山の歯医者」',
      en: 'SHIMIZU DENTAL / "Hyotanyama Family Dental Clinic"',
    },
    facilityType: {
      ja: '最新歯科医院・クリニック（診療ブース×5室・特診手術室・減菌消毒室）',
      en: 'Modern Dental Clinic (5 Treatment Operatories, Surgical Suite, Sterilization Lab)',
    },
    location: {
      ja: '大阪府東大阪市・瓢箪山エリア（近鉄奈良線 瓢箪山駅周辺）',
      en: 'Hyotanyama Area, Higashiosaka City, Osaka (Near Kintetsu Hyotanyama Station)',
    },
    challenge: {
      ja: '東大阪市・瓢箪山にて「家族の笑顔を守る 瓢箪山の歯医者」を掲げる「SHIMIZU DENTAL」様の新設・移転にあたり、5台のデンタルユニットチェア（1〜5番チェア）、精密手術用マイクロスコープ、高圧蒸気滅菌器（オートクレーブ）などの最新高度医療機器を安定して稼働させるための大容量電源・専用分岐回路・医用アース接地工事が必要でした。また、上質で温かみのある木目調の内装・受付サインと調和しつつ、歯科医師・スタッフが歯牙や患部の微細な色調を正確に視認できる、まぶしさを抑えた高演色LED調光照明環境の構築が求められました。',
      en: 'For the newly established "SHIMIZU DENTAL" in Hyotanyama, Higashiosaka, the client required a robust, noise-free electrical distribution system to power 5 modern dental chair units, a ceiling-mounted precision surgical microscope, autoclave sterilizers, and diagnostic imaging stations. Furthermore, the lighting design had to harmonize seamlessly with natural oak woodwork, exterior lighted signage, and architectural cove details, while delivering glare-free, ultra-high CRI (Ra>90) task lighting for clinicians.',
    },
    solution: {
      ja: '主幹容量の最適設計を行い、医療機器専用の漏電遮断器を備えた分電盤を新設。床下配管ルートを通じて1〜5番チェアユニット各機へ動力・単相専用回路および給排水連動電源を隠蔽配線しました。手術用マイクロスコープ系統には精密ノイズ対策を施したD種医用接地（接地抵抗10Ω以下）を確実に施工。さらに、受付・待合室・廊下にはリラックスできる暖色系間接照明とダウンライトを、診察室各室には高演色LEDを配置し、機能性と心地よい空間性を両立しました。',
      en: 'Engineered an optimized distribution panel with medical-grade ground-fault protection. Concealed sub-floor conduit runs fed dedicated circuits and plumbing interlocks to Dental Chairs 1 through 5. Executed Class-D medical grounding (< 10Ω) with noise filtration for the surgical microscope operatory. Combined warm ambient architectural cove lighting and downlights in the reception and hallways with ultra-high CRI operatory LED fixtures.',
    },
    highlights: {
      ja: [
        'デンタルユニット 1〜5号機用 専用動力・単相回路床下配管配線',
        '精密手術用マイクロスコープ・診断モニター系統 医用D種接地工事（10Ω以下達成）',
        '減菌消毒室・技工室 高圧オートクレーブ・器具洗浄機用大容量専用コンセント',
        '「SHIMIZU DENTAL」外観電飾サイン・受付間接照明・高演色LED診察照明',
        '休診日・内装工程に合わせた無停電・安全工程管理で開院期日通りに完全竣工',
      ],
      en: [
        'Dedicated concealed underfloor feeds for Dental Chairs 1 through 5',
        'Class-D medical grounding (<10Ω) for ceiling surgical microscope & imaging monitors',
        'High-capacity dedicated circuits for autoclave sterilizers in hygiene & sterilization lab',
        'Illuminated exterior signage, architectural cove lighting, and high-CRI operatory LEDs',
        '100% on-schedule completion coordinated around dental equipment delivery and clinic opening',
      ],
    },
    category: 'medical',
    isVerified: true,
    imageUrl: '/assets/projects/shimizu_facade.jpg',
    imageType: 'actual',
    imageAlt: {
      ja: 'SHIMIZU DENTAL（しみず歯科）様の外観電飾サインと受付・待合空間（実際の施工写真）',
      en: 'SHIMIZU DENTAL clinic exterior illuminated signage and reception lounge (Actual project photo)',
    },
    statusNote: {
      ja: '※施主様よりご提供いただいた実写真（外観・受付・診察室・減菌室・廊下・チェア）を掲載しております。',
      en: '* Official clinic photography provided (Exterior, Reception, Operatories, Sterilization Lab, Hallway, Treatment Suites).',
    },
    audit: {
      officialNameStatus: 'verified',
      locationStatus: 'verified',
      workPerformedStatus: 'verified',
      photosStatus: 'verified',
      outcomeStatus: 'verified',
      permissionStatus: 'verified',
      auditNotes: {
        ja: '施主様提供写真（外観電飾サイン「SHIMIZU DENTAL」、受付待合室、1番チェア、手術用マイクロスコープ・減菌室、診療廊下、4番チェア）の掲載確認完了。施工内容・施設仕様を開示しています。',
        en: 'Client photography verified & published (Illuminated "SHIMIZU DENTAL" exterior sign, reception lounge, Chair 1, surgical microscope & hygiene lab, corridor, Chair 4). Technical engineering scope and facility specifications verified.',
      },
    },
    officialClientName: {
      ja: 'SHIMIZU DENTAL（しみず歯科）様',
      en: 'SHIMIZU DENTAL Clinic',
      isVerified: true,
    },
    workPerformedItems: {
      ja: [
        '医療用デンタルチェア（1〜5号機）専用電源系統・配管配線工事',
        '天吊り型手術用精密マイクロスコープ・診断モニター電源および医用D種接地工事',
        '減菌消毒室（オートクレーブ・医療器具洗浄機）用大容量専用電源配線',
        '外観「SHIMIZU DENTAL」電飾サイン・受付間接照明・埋込LEDダウンライト工事',
        '診療動線（廊下・個別ブース間仕切り）弱電・火災報知器・誘導灯改修工事',
      ],
      en: [
        'Concealed conduit & dedicated power feeds for 5 Dental Operatory Chairs',
        'Ceiling-mounted surgical microscope power feeds & Class-D medical grounding (< 10Ω)',
        'Heavy-duty dedicated circuits for high-pressure autoclave sterilizers in hygiene lab',
        'Illuminated exterior branding sign, architectural reception cove lighting, and downlights',
        'Treatment corridor emergency exit lights, fire alarm interlocks, and low-voltage controls',
      ],
      isVerified: true,
    },
    photosList: [
      {
        url: '/assets/projects/shimizu_facade.jpg',
        title: {
          ja: '【写真 01】外観サイン・受付・待合ラウンジ',
          en: '[Photo 01] Exterior Sign, Reception & Waiting Lounge',
        },
        caption: {
          ja: '「SHIMIZU DENTAL」電飾サインと、落ち着いた木目調内装に調和した間接照明・埋込ダウンライト。キャッチコピー「家族の笑顔を守る 瓢箪山の歯医者」を体現する温かみのあるエントランス。',
          en: 'Illuminated "SHIMIZU DENTAL" exterior sign, warm architectural cove lighting and downlights complementing natural oak wood reception.',
        },
        category: '外観・受付',
        isVerified: true,
      },
      {
        url: '/assets/projects/shimizu_treatment.jpg',
        title: {
          ja: '【写真 02】1番チェア 診察室・ドクターワークステーション',
          en: '[Photo 02] Chair 1 Operatory & Doctor Station',
        },
        caption: {
          ja: 'ガラスパーテーションとアクセントタイルで仕切られた半個室診療ブース。デンタルチェアユニット専用電源配線、手洗い洗面台専用回路、診察用グレアレス照明。',
          en: 'Private treatment operatory with dedicated dental unit sub-circuit, plumbing interlock power, and clinician handwashing station.',
        },
        category: '診察室',
        isVerified: true,
      },
      {
        url: '/assets/projects/shimizu_microscope.jpg',
        title: {
          ja: '【写真 03】減菌消毒室 & 精密手術用マイクロスコープ室',
          en: '[Photo 03] Sterilization Hygiene Lab & Surgical Microscope Suite',
        },
        caption: {
          ja: '左：高圧オートクレーブ減菌器・医療器具洗浄機用大容量専用電源とクリーンルーム照明。右：天吊り型手術用マイクロスコープ・高精度アームライト・モニター専用電源および医用D種接地。',
          en: 'Left: Dedicated high-capacity circuits for autoclave sterilizers and cleanroom illumination. Right: Ceiling-mounted dental surgical microscope, articulated arm lamp, monitor feeds & medical grounding.',
        },
        category: '手術・減菌室',
        isVerified: true,
      },
      {
        url: '/assets/projects/shimizu_hallway.jpg',
        title: {
          ja: '【写真 04】診療フロア中央コリドー（2・3・5番チェア動線）',
          en: '[Photo 04] Main Clinical Hallway (Chairs 2, 3, 5 Access)',
        },
        caption: {
          ja: '個別診療ブースへの木製スライドドアが並ぶ廊下空間。患者様の移動をスムーズにする足元・天井埋込LEDダウンライトと防災誘導灯設備。',
          en: 'Central treatment corridor with warm oak sliding doors, glare-shielded recessed LED downlights, and emergency exit lighting.',
        },
        category: '診療廊下',
        isVerified: true,
      },
      {
        url: '/assets/projects/shimizu_chair.jpg',
        title: {
          ja: '【写真 05】4番チェア 個別診療ブース',
          en: '[Photo 05] Chair 4 Private Treatment Suite',
        },
        caption: {
          ja: '明るいオレンジ基調の最新診療チェア、専用木製キャビネット、手元術者用無影灯（LED手術用照射器）の安定給電配管。',
          en: 'Ergonomic orange dental unit with custom cabinetry, vanity wash basin, and ceiling articulated dental surgical task lamp.',
        },
        category: '個室診療ブース',
        isVerified: true,
      },
    ],
    outcomeSummary: {
      ja: '複数台のチェアユニットや減菌機器が同時稼働しても、電圧降下やノイズによる医療機器の誤動作が一切発生しない堅牢な電源基盤を確立。電力会社の受電検査および自治体消防検査を一発合格し、予定通り開院を迎えられました。「患者様からも照明の温かみや清潔感を高く評価いただいている」との施主様のお声をいただいております。',
      en: 'Established zero-fluctuation, noise-free power delivery across all simultaneous operatory chairs and autoclaves. Successfully passed all utility and municipal fire safety inspections on first submission, ensuring seamless grand opening. The clinic director noted exceptional patient praise for the comfortable, inviting clinic lighting.',
      isVerified: true,
    },
  },
  {
    id: 'proj-01',
    title: {
      ja: '精密金属加工工場｜動力盤増設および工作機械電源配線',
      en: 'Precision Metal Plant | Subpanel Installation & CNC Power Feeds',
    },
    facilityType: {
      ja: '機械加工工場（延床面積 約1,200㎡）',
      en: 'Machining Factory (Approx. 1,200 sq.m floor area)',
    },
    location: {
      ja: '近郊工業団地内 [施工主名非公開]',
      en: 'Local Industrial Park [Client Confidential]',
    },
    challenge: {
      ja: '最新の5軸マシニングセンタ2基増設に伴い、既設動力盤の容量が逼迫。稼働中の他ラインを止めずに安全に電源を供給する必要がありました。',
      en: 'Addition of two new 5-axis machining centers exceeded existing panel capacity. Power needed to be extended without interrupting active production lines.',
    },
    solution: {
      ja: 'キュービクルからの幹線容量を再計算し、独立した動力子盤を新設。休日の計画停電時間内に幹線分岐を実施し、平日の生産への影響ゼロで竣工しました。',
      en: 'Recalculated feeder load from the main cubicle and installed a dedicated subpanel. Performed main tie-ins during a scheduled weekend shutdown, resulting in zero production downtime.',
    },
    highlights: {
      ja: ['三相200V 150A 系統増設', '天井吊り下げ式ケーブルラック配線 45m', 'アース接地抵抗値 10Ω以下達成', '休日2日間の集中工事で完了'],
      en: ['3-phase 200V 150A dedicated feed', '45m suspended ceiling cable ladder', 'Grounding resistance verified < 10Ω', 'Executed during 2-day weekend window'],
    },
    category: 'factory',
    isVerified: true,
    imageUrl: '/assets/projects/factory_subpanel.jpg',
    imageType: 'illustrative',
    imageAlt: {
      ja: '精密金属加工工場における動力盤増設および工作機械電源配線工事の施工イメージ（イメージ画像）',
      en: 'Machining plant power subpanel installation and machine tool electrical feeds (Illustrative image)',
    },
    statusNote: {
      ja: '※お客様の機密保持規定に基づき、企業名および敷地特定情報は伏せて掲載しております。',
      en: '* Client name and specific site details are kept confidential under non-disclosure agreements.',
    },
  },
  {
    id: 'proj-02',
    title: {
      ja: '食品流通センター｜水銀灯から高天井防塵LEDへの全館更新',
      en: 'Food Logistics Hub | Full LED Retrofit from Metal Halide & Mercury Lamps',
    },
    facilityType: {
      ja: '低温物流倉庫（保管エリア・荷捌き場・事務所）',
      en: 'Refrigerated Logistics Warehouse (Storage, Staging & Offices)',
    },
    location: {
      ja: '高速インター近郊物流拠点 [施工主名非公開]',
      en: 'Logistics Corridor Depot [Client Confidential]',
    },
    challenge: {
      ja: '水銀灯の球切れが頻発し、交換時の高所作業費用がかさむとともに、作業エリアの照度不足によるピッキングミスのリスクが懸念されていました。',
      en: 'Frequent lamp failures in high ceilings led to expensive aerial lift rentals, while inadequate floor illuminance increased inventory picking errors.',
    },
    solution: {
      ja: '高天井用LED照明（定格寿命60,000時間・IP65防塵防水）84台へ更新。照度シミュレーションにより、床面照度を旧来の180lxから350lxへと倍増させつつ、消費電力を約62%削減しました。',
      en: 'Installed 84 IP65-rated high-bay LED fixtures (60,000hr service life). Floor illuminance jumped from 180 lx to 350 lx while electricity usage plummeted by 62%.',
    },
    highlights: {
      ja: ['照明消費電力 62% 削減', '床面平均照度 350lx 確保', '高所作業車による荷物養生徹底施工', '年間推定電気代 約180万円削減見込'],
      en: ['62% reduction in lighting power demand', '350 lx average floor illumination', 'Zero cargo damage with clean aerial lift procedures', 'Estimated ~1.8M JPY annual electricity savings'],
    },
    category: 'maintenance',
    isVerified: true,
    imageUrl: '/assets/projects/logistics_warehouse_led.jpg',
    imageType: 'illustrative',
    imageAlt: {
      ja: '食品流通センター・低温物流倉庫の高天井LED照明更新工事の施工イメージ（イメージ画像）',
      en: 'Food logistics center and cold storage high-bay LED lighting retrofit (Illustrative image)',
    },
    statusNote: {
      ja: '※実際の電気料金削減効果は施設稼働時間により異なります。',
      en: '* Actual financial savings vary according to specific operating hours and utility rate tiers.',
    },
  },
  {
    id: 'proj-03',
    title: {
      ja: '商業テナントビル｜主幹漏電遮断器トラブル調査・緊急改修',
      en: 'Commercial Office Building | Main ELB Failure Diagnostic & Emergency Overhaul',
    },
    facilityType: {
      ja: 'テナント商業ビル（地上5階建）',
      en: 'Multi-Tenant Commercial Building (5 Stories)',
    },
    location: {
      ja: '駅前商業地区 [施工主名非公開]',
      en: 'Commercial District [Client Confidential]',
    },
    challenge: {
      ja: '大雨の翌朝に1階飲食テナントの主幹ブレーカーが突然トリップ。厨房設備の電源が喪失し、営業開始が危ぶまれる緊急事態でした。',
      en: 'Following heavy rain, the main leakage circuit breaker tripped, cutting all power to a ground-floor kitchen tenant hours before opening.',
    },
    solution: {
      ja: '緊急出動し、メガテスターにて回路ごとの絶縁抵抗値を測定。屋外ダクト配管のシーリング劣化による雨水浸入と被覆損傷箇所を特定。バイパス仮復旧を3時間以内に行い、後日完全防水配管へ再施工しました。',
      en: 'Dispatched emergency technician with insulation tester. Discovered degraded conduit seals allowing rain ingress into outdoor feeds. Created a safe bypass within 3 hours to permit lunch operations, followed by complete weatherproof piping overhaul.',
    },
    highlights: {
      ja: ['連絡受電から現場到着・調査開始まで迅速対応', '店舗の当日ランチ営業への影響を回避', '屋外露出配管の完全防水仕様改修', '絶縁抵抗値 100MΩ以上への回復確認'],
      en: ['Rapid dispatch from initial call to site diagnosis', 'Prevented loss of lunch service opening', 'Upgraded to heavy-duty weatherproof sealed conduit', 'Insulation resistance successfully restored > 100MΩ'],
    },
    category: 'building',
    isVerified: true,
    imageUrl: '/assets/projects/commercial_building_panel.jpg',
    imageType: 'illustrative',
    imageAlt: {
      ja: '商業テナントビルの受電設備・主幹漏電遮断器トラブル調査および緊急改修の施工イメージ（イメージ画像）',
      en: 'Commercial multi-tenant building electrical service panel and leakage breaker repair (Illustrative image)',
    },
    statusNote: {
      ja: '※緊急対応の可否・到着時間は現場稼働状況・場所により異なります。',
      en: '* Rapid emergency dispatch availability depends on technician scheduling and location radius.',
    },
  },
];

export const serviceAreaRegions = [
  {
    tier: { ja: '最優先対応エリア（車で約30〜45分）', en: 'Core Immediate Service Area (~30-45 min)' },
    desc: {
      ja: '東大阪市新町の本社拠点より迅速に急行。現地調査・緊急トラブル・事前打ち合わせに即応体制をとっております。',
      en: 'Immediate dispatch from our Higashiosaka Shinmachi headquarters base. Rapid response for surveys, emergency diagnostics, and direct consultations.',
    },
    areas: {
      ja: ['東大阪市全域（本社所在地）', '八尾市', '大東市', '大阪市東部（生野区・東成区・城東区・鶴見区・平野区）', '柏原市・門真市'],
      en: ['Higashiosaka City (Headquarters base)', 'Yao City', 'Daito City', 'Eastern Osaka City (Ikuno, Higashinari, Joto, Tsurumi, Hirano)', 'Kashiwara City & Kadoma City'],
    },
    isCore: true,
  },
  {
    tier: { ja: '通常出張対応エリア（車で約60〜90分）', en: 'Standard Dispatch Coverage (~60-90 min)' },
    desc: {
      ja: '高圧受変電設備工事、動力配線増設、工場・倉庫LED一括更新、定期保安点検など計画工事に幅広く対応いたします。',
      en: 'Full coverage for planned industrial cubicle work, factory/warehouse LED upgrades, and regular maintenance inspections.',
    },
    areas: {
      ja: ['大阪府全域（北摂・大阪市内・南河内・泉州エリア）', '奈良県西部（生駒市・奈良市・大和郡山市・香芝市）', '兵庫県東部・阪神間（尼崎市・西宮市）'],
      en: ['All Osaka Prefecture (Hokusetsu, Central Osaka, Minami-Kawachi, Senshu)', 'Western Nara Prefecture (Ikoma, Nara, Yamatokoriyama, Kashiba)', 'Eastern Hyogo Prefecture (Amagasaki, Nishinomiya)'],
    },
    isCore: false,
  },
  {
    tier: { ja: 'エリア外・広域案件のご相談', en: 'Extended & Regional Projects' },
    desc: {
      ja: '関西圏および近隣府県の工場・商業施設における一括電気設備更新や特殊設備工事も、事前協議のうえ柔軟に対応いたします。',
      en: 'Large-scale commercial retrofits and specialized electrical engineering across the Kansai region evaluated upon consultation.',
    },
    areas: {
      ja: ['関西広域・遠隔地案件（事前お打ち合わせ・計画施工）'],
      en: ['Kansai metropolitan corridor & special project locations upon consultation'],
    },
    isCore: false,
  },
];

export const reasonsToChoose = [
  {
    number: '01',
    title: { ja: '国家資格保有者による責任施工', en: 'Certified Engineers & Direct Accountability' },
    desc: {
      ja: '第一種・第二種電気工事士等の有資格者が現場調査から施工、自主検査まで責任を持って一貫対応。外注丸投げを行わない信頼の技術力です。',
      en: 'Every project is inspected and executed by certified professional electricians with direct engineering oversight, never outsourced blindly.',
    },
    iconName: 'Award',
  },
  {
    number: '02',
    title: { ja: '工場の操業を止めない工程管理', en: 'Zero-Downtime Scheduling for Businesses' },
    desc: {
      ja: '休日・夜間工事や計画停電のタイムリミットに合わせた綿密な段取り。生産ラインや店舗営業への影響を最小限に抑える施工計画をご提案します。',
      en: 'Meticulous coordination for night-shift or weekend shutdowns, ensuring production lines and business operations stay fully active during peak hours.',
    },
    iconName: 'Clock',
  },
  {
    number: '03',
    title: { ja: '現地調査に基づく明朗・詳細なお見積り', en: 'Transparent, Itemized Quotes on Site' },
    desc: {
      ja: '図面だけでなく実際の配線ルートや盤の空き容量を現地で確認。「一式」で濁さず、材料費・人工・諸経費を明記した納得の見積書を発行します。',
      en: 'We conduct rigorous physical surveys of cable routes and panel capacities. Our quotes clearly break down materials, labor, and compliance testing.',
    },
    iconName: 'FileCheck',
  },
  {
    number: '04',
    title: { ja: '施工後の保安点検とアフターフォロー', en: 'Long-Term Maintenance & Safety Assurances' },
    desc: {
      ja: '工事完了後も自主点検記録書を納品。主任技術者様や消防への届出書類作成のサポート、突発的な電気トラブルにも親身に寄り添います。',
      en: 'We supply complete test logs upon completion, support official paperwork for regulatory inspections, and remain ready for future service.',
    },
    iconName: 'ShieldCheck',
  },
];

export const b2bFaqList = [
  {
    q: { ja: '見積りは無料ですか？現地調査には費用がかかりますか？', en: 'Are quotes and site visits free of charge?' },
    a: {
      ja: '通常対応エリア内での初回現地調査およびお見積り作成は原則無料で行っております。図面がない場合でも、現場を直接確認して最適な工事プランをご提案いたします。',
      en: 'Initial on-site surveys and formal quote calculations within our standard service area are provided free of charge, even without architectural blueprints.',
    },
  },
  {
    q: { ja: '夜間や土日・連休中の工事は可能ですか？', en: 'Can work be conducted during night shifts or weekends?' },
    a: {
      ja: 'はい、可能です。製造工場やオフィスなど、平日昼間に電気を止められない施設向けに、夜間作業や土日・年末年始等の計画工事スケジュールに柔軟に対応しております。',
      en: 'Yes. For factories, offices, and retail venues that cannot cut power during regular business hours, we regularly schedule night and weekend shut-downs.',
    },
  },
  {
    q: { ja: '図面が残っていない古い建物でも改修工事を依頼できますか？', en: 'Can you work on older buildings without blueprints?' },
    a: {
      ja: '問題ございません。配電盤の回路調査やテスターによる配線追跡を現地で実施し、現在の電気容量と改修に必要な工事内容を調査・特定いたします。',
      en: 'Absolutely. Our electricians perform on-site circuit tracing, panel capacity audits, and insulation measurements to map your existing setup safely.',
    },
  },
  {
    q: { ja: 'LED化で省エネ補助金や助成金の申請は可能ですか？', en: 'Can we apply for governmental energy subsidies for LED upgrades?' },
    a: {
      ja: '国や自治体の省エネ設備更新補助金の公募時期に合わせて、必要となる機器仕様書、照度計算書、電力削減試算データの作成・提供を全面的にサポートいたします。',
      en: 'Yes. During subsidy filing windows, we prepare full technical equipment specifications, lumen plans, and power savings calculation certificates.',
    },
  },
];
