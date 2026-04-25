/* =========================================================
   People's Hall — Mock Data
   மக்கள் மன்றம் — போலி தரவு
   ========================================================= */

// ── IDEAS ──────────────────────────────────────────────────
export type IdeaStatus = "new" | "under_review" | "approved" | "implemented";
export type IdeaCategory = "Agriculture" | "Healthcare" | "Education" | "Transport" | "Environment" | "Safety" | "Infrastructure" | "Welfare";

export interface Idea {
  id: string;
  title: string;
  title_ta: string;
  description: string;
  description_ta: string;
  category: IdeaCategory;
  author: string;
  district: string;
  date: string;
  upvotes: number;
  status: IdeaStatus;
  tags: string[];
}

export const mockIdeas: Idea[] = [
  {
    id: "idea-01",
    title: "Solar Panels on All Government School Rooftops",
    title_ta: "அனைத்து அரசு பள்ளி கூரைகளிலும் சூரிய ஆற்றல் பலகைகள்",
    description: "Install solar panels on government school rooftops to generate clean energy and reduce electricity bills. Surplus power can be fed back to the grid to fund school development activities.",
    description_ta: "அரசு பள்ளி கூரைகளில் சூரிய ஆற்றல் பலகைகளை நிறுவி சுத்தமான ஆற்றல் உற்பத்தி செய்யலாம். மிகுதியான மின்சாரம் கிரிட்டுக்கு திருப்பி அனுப்பி பள்ளி மேம்பாட்டு நடவடிக்கைகளுக்கு நிதி திரட்டலாம்.",
    category: "Education",
    author: "Karthik R.",
    district: "Coimbatore",
    date: "2026-03-12",
    upvotes: 2847,
    status: "approved",
    tags: ["solar", "energy", "schools", "green"]
  },
  {
    id: "idea-02",
    title: "Free High-Speed WiFi in All Government Hospitals",
    title_ta: "அனைத்து அரசு மருத்துவமனைகளிலும் இலவச அதிவேக வைஃபை",
    description: "Provide free WiFi in all government hospitals so patients and families can access health records, telemedicine services, and stay connected during long hospital stays.",
    description_ta: "அனைத்து அரசு மருத்துவமனைகளிலும் இலவச வைஃபை வழங்க வேண்டும். நோயாளிகள் மற்றும் குடும்பங்கள் சுகாதார பதிவுகளை அணுகவும் தொலைமருத்துவ சேவைகளை பயன்படுத்தவும் இது உதவும்.",
    category: "Healthcare",
    author: "Priya M.",
    district: "Chennai",
    date: "2026-03-18",
    upvotes: 1923,
    status: "under_review",
    tags: ["wifi", "hospitals", "healthcare", "digital"]
  },
  {
    id: "idea-03",
    title: "Electric Mini-Buses for Last-Mile Village Connectivity",
    title_ta: "கிராம இறுதிமைல் இணைப்புக்கு மின்சார மினி பேருந்துகள்",
    description: "Deploy electric mini-buses (10-15 seat) on fixed routes connecting villages to nearby towns, funded through green energy subsidies. Reduces pollution and transport costs for rural residents.",
    description_ta: "கிராமங்களை அருகிலுள்ள நகரங்களுடன் இணைக்கும் நிலையான பாதைகளில் மின்சார மினி பேருந்துகளை (10-15 இருக்கை) நிறுவ வேண்டும். இது மாசை குறைக்கும் மற்றும் கிராம மக்களின் போக்குவரத்து செலவை குறைக்கும்.",
    category: "Transport",
    author: "Murugan S.",
    district: "Tirunelveli",
    date: "2026-02-28",
    upvotes: 3156,
    status: "under_review",
    tags: ["electric", "bus", "rural", "transport", "ev"]
  },
  {
    id: "idea-04",
    title: "Digital Panchayat Library with Tablets for All Villages",
    title_ta: "அனைத்து கிராமங்களுக்கும் டிஜிட்டல் பஞ்சாயத்து நூலகம்",
    description: "Set up a digital library in every panchayat office with tablets preloaded with Tamil educational content, government scheme information, job portals, and e-books.",
    description_ta: "ஒவ்வொரு பஞ்சாயத்து அலுவலகத்திலும் தமிழ் கல்வி உள்ளடக்கம், அரசு திட்ட தகவல்கள், வேலை வாய்ப்பு போர்ட்டல்கள் மற்றும் மின்னூல்கள் ஏற்றப்பட்ட டேப்லெட்டுகளுடன் டிஜிட்டல் நூலகம் அமைக்க வேண்டும்.",
    category: "Education",
    author: "Lakshmi K.",
    district: "Salem",
    date: "2026-01-15",
    upvotes: 1578,
    status: "implemented",
    tags: ["library", "digital", "panchayat", "education", "village"]
  },
  {
    id: "idea-05",
    title: "Mandatory Rainwater Harvesting for New Constructions",
    title_ta: "புதிய கட்டுமானங்களுக்கு கட்டாய மழை நீர் சேகரிப்பு",
    description: "Make rainwater harvesting systems mandatory for all new residential and commercial buildings above 1000 sq ft. Provide government subsidies for installation in existing buildings.",
    description_ta: "1000 சதுர அடிக்கு மேல் உள்ள அனைத்து புதிய குடியிருப்பு மற்றும் வணிக கட்டிடங்களுக்கு மழை நீர் சேகரிப்பு அமைப்புகளை கட்டாயமாக்க வேண்டும். தற்போதுள்ள கட்டிடங்களில் நிறுவலுக்கு அரசு மானியம் வழங்க வேண்டும்.",
    category: "Environment",
    author: "Anand B.",
    district: "Trichy",
    date: "2026-02-10",
    upvotes: 4231,
    status: "approved",
    tags: ["rainwater", "water", "environment", "construction"]
  },
  {
    id: "idea-06",
    title: "Mobile Health Units for Tribal and Remote Areas",
    title_ta: "பழங்குடியினர் மற்றும் தொலைதூர பகுதிகளுக்கு மொபைல் சுகாதார அலகுகள்",
    description: "Deploy fully equipped mobile health vans to tribal, hilly, and coastal remote areas on a weekly schedule. Include basic diagnostics, medicine dispensing, and telemedicine connectivity.",
    description_ta: "பழங்குடியினர், மலை மற்றும் கடலோர தொலைதூர பகுதிகளுக்கு வாராந்திர அட்டவணையில் முழுவதுமாக சித்தப்படுத்தப்பட்ட மொபைல் சுகாதார வேன்களை அனுப்ப வேண்டும்.",
    category: "Healthcare",
    author: "Selvi T.",
    district: "Nilgiris",
    date: "2026-03-05",
    upvotes: 2109,
    status: "under_review",
    tags: ["health", "tribal", "mobile", "rural", "medicine"]
  },
  {
    id: "idea-07",
    title: "Women Safety App with Real-Time Location Sharing",
    title_ta: "நிகழ்நேர இருப்பிட பகிர்வுடன் மகளிர் பாதுகாப்பு செயலி",
    description: "A state-developed app where women can share live location with family, send SOS alerts to nearest police station, and access helpline numbers instantly.",
    description_ta: "மகளிர் குடும்பத்தினருடன் நேரடி இருப்பிடத்தை பகிரவும், அருகிலுள்ள காவல் நிலையத்திற்கு SOS எச்சரிக்கைகளை அனுப்பவும், உதவி மையம் எண்களை உடனடியாக அணுகவும் உதவும் அரசு உருவாக்கிய செயலி.",
    category: "Safety",
    author: "Deepa V.",
    district: "Vellore",
    date: "2026-03-20",
    upvotes: 5892,
    status: "approved",
    tags: ["women", "safety", "app", "SOS", "police"]
  },
  {
    id: "idea-08",
    title: "Night Shelters with Skill Training for Daily Wage Workers",
    title_ta: "கூலி தொழிலாளர்களுக்கு இரவு தங்குமிட மற்றும் திறன் பயிற்சி",
    description: "Establish night shelters for daily wage migrant workers with free meals, medical checkups, and skill development training to help them access better employment opportunities.",
    description_ta: "தினக்கூலி புலம்பெயர் தொழிலாளர்களுக்கு இலவச உணவு, மருத்துவ பரிசோதனை மற்றும் திறன் மேம்பாட்டு பயிற்சியுடன் இரவு தங்குமிட வசதி அமைக்க வேண்டும்.",
    category: "Welfare",
    author: "Rajan P.",
    district: "Chennai",
    date: "2026-01-30",
    upvotes: 3417,
    status: "implemented",
    tags: ["shelter", "workers", "welfare", "training"]
  },
  {
    id: "idea-09",
    title: "Smart Water Meters for Equitable Distribution",
    title_ta: "சமன்பாடான விநியோகத்திற்கு ஸ்மார்ட் நீர் மீட்டர்கள்",
    description: "Install smart water meters in all urban areas to monitor usage, detect leakages, and ensure fair distribution. Data available to citizens through a public dashboard.",
    description_ta: "பயன்பாட்டை கண்காணிக்கவும், கசிவுகளை கண்டறியவும், நியாயமான விநியோகத்தை உறுதிசெய்யவும் அனைத்து நகர்ப்புற பகுதிகளிலும் ஸ்மார்ட் நீர் மீட்டர்களை நிறுவ வேண்டும்.",
    category: "Infrastructure",
    author: "Vijay C.",
    district: "Coimbatore",
    date: "2026-02-14",
    upvotes: 1847,
    status: "new",
    tags: ["water", "smart", "infrastructure", "meter"]
  },
  {
    id: "idea-10",
    title: "Tree Avenue Restoration Along All State Highways",
    title_ta: "அனைத்து மாநில நெடுஞ்சாலைகளிலும் மரங்கள் நடும் திட்டம்",
    description: "Plant native tree species on both sides of all state highways to restore shade, reduce road temperatures, support biodiversity, and improve air quality for commuters.",
    description_ta: "அனைத்து மாநில நெடுஞ்சாலைகளின் இரு புறங்களிலும் நாட்டு மரங்களை நட்டு நிழல் மீட்டெடுத்து, சாலை வெப்பநிலை குறைத்து, உயிரியல் பன்மையை ஆதரிக்கவும் மேம்படுத்தவும் வேண்டும்.",
    category: "Agriculture",
    author: "Natarajan K.",
    district: "Madurai",
    date: "2026-03-01",
    upvotes: 2634,
    status: "under_review",
    tags: ["trees", "highway", "green", "environment", "agriculture"]
  }
];

// ── POLICY PROPOSALS ──────────────────────────────────────
export type PolicyStatus = "active" | "closed" | "implemented";

export interface Policy {
  id: string;
  title: string;
  title_ta: string;
  description: string;
  description_ta: string;
  department: string;
  department_ta: string;
  date: string;
  deadline: string;
  votesFor: number;
  votesAgainst: number;
  status: PolicyStatus;
  tag: string;
}

export const mockPolicies: Policy[] = [
  {
    id: "pol-01",
    title: "Tamil Nadu New Industrial Policy 2026",
    title_ta: "தமிழ்நாடு புதிய தொழில் கொள்கை 2026",
    description: "A comprehensive industrial policy aiming to attract ₹10 lakh crore in investments over 5 years, create 20 lakh jobs, focus on EVs, semiconductors, aerospace, and renewable energy sectors.",
    description_ta: "5 ஆண்டுகளில் ₹10 லட்சம் கோடி முதலீடு ஈர்க்கவும், 20 லட்சம் வேலை வாய்ப்புகளை உருவாக்கவும், EV, செமிகண்டக்டர், விமான போக்குவரத்து மற்றும் புதுப்பிக்கத்தக்க ஆற்றல் துறைகளில் கவனம் செலுத்தவும் நோக்கிய விரிவான தொழில் கொள்கை.",
    department: "Industries Department",
    department_ta: "தொழில்துறை",
    date: "2026-03-01",
    deadline: "2026-05-01",
    votesFor: 187432,
    votesAgainst: 23891,
    status: "active",
    tag: "Economy"
  },
  {
    id: "pol-02",
    title: "Free Breakfast Scheme — Extension to Government Colleges",
    title_ta: "இலவச காலை உணவு திட்டம் — அரசு கல்லூரிகளுக்கு விரிவாக்கம்",
    description: "Extend the successful CM Breakfast Scheme from government schools to all government colleges and polytechnics, providing free nutritious breakfast to approximately 5 lakh college students daily.",
    description_ta: "வெற்றிகரமான முதலமைச்சர் காலை உணவு திட்டத்தை அரசு பள்ளிகளிலிருந்து அனைத்து அரசு கல்லூரிகள் மற்றும் பாலிடெக்னிக்குகளுக்கு விரிவாக்கி தினமும் சுமார் 5 லட்சம் கல்லூரி மாணவர்களுக்கு இலவச சத்தான காலை உணவு வழங்க வேண்டும்.",
    department: "School Education Department",
    department_ta: "பள்ளிக் கல்வி துறை",
    date: "2026-02-15",
    deadline: "2026-04-15",
    votesFor: 342109,
    votesAgainst: 8234,
    status: "active",
    tag: "Education"
  },
  {
    id: "pol-03",
    title: "Green Tamil Nadu — 100 Crore Tree Planting Mission",
    title_ta: "பசுமை தமிழ்நாடு — 100 கோடி மர நடும் இயக்கம்",
    description: "A 10-year mission to plant 100 crore native trees across Tamil Nadu — in forest land, highway verges, river banks, school campuses, and urban parks — to restore the green cover to 33%.",
    description_ta: "10 ஆண்டு இலக்கில் தமிழ்நாடு முழுவதும் — காடுகள், நெடுஞ்சாலை ஓரங்கள், ஆற்றங்கரைகள், பள்ளி வளாகங்கள் மற்றும் நகர்ப்புற பூங்காக்களில் — 100 கோடி நாட்டு மரங்கள் நட்டு பசுமை பரப்பை 33% க்கு மீட்டெடுக்கும் திட்டம்.",
    department: "Environment & Forests",
    department_ta: "சுற்றுச்சூழல் மற்றும் காடுகள் துறை",
    date: "2026-01-26",
    deadline: "2026-04-30",
    votesFor: 412783,
    votesAgainst: 11247,
    status: "active",
    tag: "Environment"
  },
  {
    id: "pol-04",
    title: "EV Subsidy Scheme for Auto-Rickshaw Drivers",
    title_ta: "ஆட்டோ ரிக்ஷா ஓட்டுநர்களுக்கு மின்சார வாகன மானியம்",
    description: "Provide ₹1.5 lakh subsidy and 0% interest loan for auto-rickshaw drivers to convert to electric vehicles. Includes free charging infrastructure at 500 government locations across the state.",
    description_ta: "ஆட்டோ ரிக்ஷா ஓட்டுநர்கள் மின்சார வாகனங்களுக்கு மாற ₹1.5 லட்சம் மானியம் மற்றும் 0% வட்டி கடன் வழங்க வேண்டும். மாநிலம் முழுவதும் 500 அரசு இடங்களில் இலவச சார்ஜிங் உள்கட்டமைப்பு அமைக்க வேண்டும்.",
    department: "Transport Department",
    department_ta: "போக்குவரத்து துறை",
    date: "2026-02-01",
    deadline: "2026-03-31",
    votesFor: 289314,
    votesAgainst: 31872,
    status: "closed",
    tag: "Transport"
  },
  {
    id: "pol-05",
    title: "Amma Veedu Scheme Phase 2 — Urban Housing Push",
    title_ta: "அம்மா வீடு திட்டம் கட்டம் 2 — நகர்ப்புற வீட்டுவசதி",
    description: "Phase 2 extends Amma Veedu housing scheme to urban slum dwellers — providing 2 lakh new homes in Chennai, Coimbatore, Madurai, Trichy, and Salem with basic infrastructure by 2028.",
    description_ta: "கட்டம் 2 அம்மா வீடு திட்டத்தை நகர்ப்புற குடிசைவாசிகளுக்கு விரிவாக்குகிறது — 2028 க்குள் சென்னை, கோயம்புத்தூர், மதுரை, திருச்சி மற்றும் சேலத்தில் அடிப்படை உள்கட்டமைப்புடன் 2 லட்சம் புதிய வீடுகள் வழங்கப்படும்.",
    department: "Housing & Urban Development",
    department_ta: "வீட்டுவசதி மற்றும் நகர்ப்புற வளர்ச்சி துறை",
    date: "2025-12-01",
    deadline: "2026-02-28",
    votesFor: 521034,
    votesAgainst: 19873,
    status: "implemented",
    tag: "Housing"
  },
  {
    id: "pol-06",
    title: "Universal Basic Income Pilot — 5 Districts",
    title_ta: "அனைவருக்கும் அடிப்படை வருமான முன்னோட்ட திட்டம் — 5 மாவட்டங்கள்",
    description: "A 2-year UBI pilot in Ariyalur, Nagapattinam, Ramanathapuram, Krishnagiri, and Theni districts — providing ₹2,000/month unconditionally to all adult citizens below poverty line.",
    description_ta: "அரியலூர், நாகப்பட்டினம், இராமநாதபுரம், கிருஷ்ணகிரி மற்றும் தேனி மாவட்டங்களில் 2 ஆண்டு UBI முன்னோட்டம் — வறுமை கோட்டிற்கு கீழ் உள்ள அனைத்து வயது வந்த குடிமக்களுக்கும் நிபந்தனையின்றி மாதம் ₹2,000 வழங்கப்படும்.",
    department: "Finance Department",
    department_ta: "நிதி துறை",
    date: "2026-03-10",
    deadline: "2026-06-10",
    votesFor: 398241,
    votesAgainst: 87432,
    status: "active",
    tag: "Welfare"
  }
];

// ── SERVICE RATINGS ────────────────────────────────────────
export interface ServiceRatingData {
  serviceId: string;
  serviceName: string;
  serviceName_ta: string;
  department: string;
  totalRatings: number;
  avgRating: number;
  breakdown: { stars: number; count: number }[];
}

export const mockServiceRatings: ServiceRatingData[] = [
  {
    serviceId: "sr-01",
    serviceName: "Ration Shop (PDS)",
    serviceName_ta: "இராசன் கடை (PDS)",
    department: "Food & Civil Supplies",
    totalRatings: 48291,
    avgRating: 3.8,
    breakdown: [
      { stars: 5, count: 14832 },
      { stars: 4, count: 16203 },
      { stars: 3, count: 9814 },
      { stars: 2, count: 4981 },
      { stars: 1, count: 2461 }
    ]
  },
  {
    serviceId: "sr-02",
    serviceName: "Amma Unavagam (Canteen)",
    serviceName_ta: "அம்மா உணவகம்",
    department: "Municipal Administration",
    totalRatings: 62843,
    avgRating: 4.5,
    breakdown: [
      { stars: 5, count: 32148 },
      { stars: 4, count: 18293 },
      { stars: 3, count: 8492 },
      { stars: 2, count: 2831 },
      { stars: 1, count: 1079 }
    ]
  },
  {
    serviceId: "sr-03",
    serviceName: "Revenue Department Services",
    serviceName_ta: "வருவாய் துறை சேவைகள்",
    department: "Revenue",
    totalRatings: 34129,
    avgRating: 3.1,
    breakdown: [
      { stars: 5, count: 6892 },
      { stars: 4, count: 9843 },
      { stars: 3, count: 8912 },
      { stars: 2, count: 5612 },
      { stars: 1, count: 2870 }
    ]
  },
  {
    serviceId: "sr-04",
    serviceName: "Government Hospital OPD",
    serviceName_ta: "அரசு மருத்துவமனை வெளிநோயாளர் பிரிவு",
    department: "Health & Family Welfare",
    totalRatings: 89412,
    avgRating: 3.9,
    breakdown: [
      { stars: 5, count: 28943 },
      { stars: 4, count: 31204 },
      { stars: 3, count: 17823 },
      { stars: 2, count: 8431 },
      { stars: 1, count: 3011 }
    ]
  },
  {
    serviceId: "sr-05",
    serviceName: "Bus Concession Pass",
    serviceName_ta: "பேருந்து சலுகை பாஸ்",
    department: "Transport",
    totalRatings: 21893,
    avgRating: 4.2,
    breakdown: [
      { stars: 5, count: 9842 },
      { stars: 4, count: 7934 },
      { stars: 3, count: 2813 },
      { stars: 2, count: 893 },
      { stars: 1, count: 411 }
    ]
  },
  {
    serviceId: "sr-06",
    serviceName: "Income Certificate Issuance",
    serviceName_ta: "வருமான சான்றிதழ் வழங்கல்",
    department: "Revenue",
    totalRatings: 43812,
    avgRating: 3.5,
    breakdown: [
      { stars: 5, count: 10934 },
      { stars: 4, count: 14231 },
      { stars: 3, count: 11203 },
      { stars: 2, count: 5129 },
      { stars: 1, count: 2315 }
    ]
  },
  {
    serviceId: "sr-07",
    serviceName: "School Enrollment (RTE)",
    serviceName_ta: "பள்ளி சேர்க்கை (RTE)",
    department: "School Education",
    totalRatings: 18234,
    avgRating: 4.1,
    breakdown: [
      { stars: 5, count: 7823 },
      { stars: 4, count: 6412 },
      { stars: 3, count: 2934 },
      { stars: 2, count: 812 },
      { stars: 1, count: 253 }
    ]
  },
  {
    serviceId: "sr-08",
    serviceName: "Aadhaar Enrolment Centre",
    serviceName_ta: "ஆதார் பதிவு மையம்",
    department: "Revenue / UIDAI",
    totalRatings: 56482,
    avgRating: 2.9,
    breakdown: [
      { stars: 5, count: 8492 },
      { stars: 4, count: 12831 },
      { stars: 3, count: 13948 },
      { stars: 2, count: 12394 },
      { stars: 1, count: 8817 }
    ]
  }
];

// ── FINANCIAL TRANSACTIONS ─────────────────────────────────
export type TxnType = "release" | "expenditure" | "tender";
export type TxnStatus = "completed" | "in_progress" | "approved";

export interface FinancialTxn {
  id: string;
  department: string;
  department_ta: string;
  project: string;
  project_ta: string;
  amountCrore: number;
  date: string;
  type: TxnType;
  status: TxnStatus;
  district: string;
  beneficiaries?: string;
}

export const mockTransactions: FinancialTxn[] = [
  {
    id: "txn-001",
    department: "Roads & Bridges",
    department_ta: "சாலைகள் மற்றும் பாலங்கள் துறை",
    project: "NH-44 Four-Lane Expansion (Krishnagiri–Salem)",
    project_ta: "NH-44 நான்கு வழிப்பாதை விரிவாக்கம் (கிருஷ்ணகிரி–சேலம்)",
    amountCrore: 2840,
    date: "2026-03-15",
    type: "release",
    status: "in_progress",
    district: "Salem",
    beneficiaries: "12 lakh commuters"
  },
  {
    id: "txn-002",
    department: "School Education",
    department_ta: "பள்ளிக் கல்வி துறை",
    project: "New Classroom Construction in 1,200 Government Schools",
    project_ta: "1,200 அரசு பள்ளிகளில் புதிய வகுப்பறை கட்டுமானம்",
    amountCrore: 1240,
    date: "2026-03-10",
    type: "tender",
    status: "approved",
    district: "State-wide",
    beneficiaries: "8.4 lakh students"
  },
  {
    id: "txn-003",
    department: "Health & Family Welfare",
    department_ta: "சுகாதாரம் மற்றும் குடும்ப நலன் துறை",
    project: "Medical Equipment Procurement — 50 District Hospitals",
    project_ta: "50 மாவட்ட மருத்துவமனைகளில் மருத்துவ உபகரண கொள்முதல்",
    amountCrore: 890,
    date: "2026-03-08",
    type: "expenditure",
    status: "completed",
    district: "State-wide",
    beneficiaries: "75 lakh patients annually"
  },
  {
    id: "txn-004",
    department: "Social Welfare",
    department_ta: "சமூக நலன் துறை",
    project: "CM Breakfast Scheme — March 2026 Payment Release",
    project_ta: "முதலமைச்சர் காலை உணவு திட்டம் — மார்ச் 2026 கட்டண வெளியீடு",
    amountCrore: 312,
    date: "2026-03-01",
    type: "release",
    status: "completed",
    district: "State-wide",
    beneficiaries: "21 lakh school children"
  },
  {
    id: "txn-005",
    department: "Water Resources",
    department_ta: "நீர் வளங்கள் துறை",
    project: "Cauvery Delta Modernisation — Phase II",
    project_ta: "காவிரி டெல்டா நவீனமயமாக்கல் — கட்டம் II",
    amountCrore: 4200,
    date: "2026-02-28",
    type: "release",
    status: "in_progress",
    district: "Thanjavur",
    beneficiaries: "5.8 lakh farmers"
  },
  {
    id: "txn-006",
    department: "Housing",
    department_ta: "வீட்டுவசதி துறை",
    project: "Amma Veedu Phase 2 — Urban Unit Construction",
    project_ta: "அம்மா வீடு கட்டம் 2 — நகர்ப்புற அலகு கட்டுமானம்",
    amountCrore: 6800,
    date: "2026-02-20",
    type: "tender",
    status: "approved",
    district: "Chennai, Coimbatore",
    beneficiaries: "2 lakh families"
  },
  {
    id: "txn-007",
    department: "Agriculture",
    department_ta: "வேளாண்மை துறை",
    project: "Free Drip Irrigation Kit Distribution — Farmers",
    project_ta: "விவசாயிகளுக்கு இலவச சொட்டு நீர்ப்பாசன கருவி விநியோகம்",
    amountCrore: 430,
    date: "2026-02-15",
    type: "expenditure",
    status: "completed",
    district: "Tirunelveli, Thoothukudi",
    beneficiaries: "1.2 lakh farmers"
  },
  {
    id: "txn-008",
    department: "Transport",
    department_ta: "போக்குவரத்து துறை",
    project: "Chennai Metro Rail Phase 2 — Tender Award",
    project_ta: "சென்னை மெட்ரோ ரயில் கட்டம் 2 — ஒப்பந்த வழங்கல்",
    amountCrore: 14200,
    date: "2026-02-10",
    type: "tender",
    status: "approved",
    district: "Chennai",
    beneficiaries: "40 lakh daily commuters"
  },
  {
    id: "txn-009",
    department: "Renewable Energy",
    department_ta: "புதுப்பிக்கத்தக்க ஆற்றல் துறை",
    project: "Rooftop Solar Scheme — 10,000 Govt Buildings",
    project_ta: "கூரை சூரிய ஆற்றல் திட்டம் — 10,000 அரசு கட்டிடங்கள்",
    amountCrore: 2100,
    date: "2026-02-05",
    type: "release",
    status: "in_progress",
    district: "State-wide"
  },
  {
    id: "txn-010",
    department: "Rural Development",
    department_ta: "ஊரக வளர்ச்சி துறை",
    project: "Village Road Connectivity — PMGSY 2026 Tranche",
    project_ta: "கிராம சாலை இணைப்பு — PMGSY 2026 தவணை",
    amountCrore: 1890,
    date: "2026-01-30",
    type: "release",
    status: "completed",
    district: "All 38 Districts",
    beneficiaries: "3.4 lakh villages"
  },
  {
    id: "txn-011",
    department: "Sports & Youth Affairs",
    department_ta: "விளையாட்டு மற்றும் இளையோர் நலன் துறை",
    project: "District Sports Complexes — 10 New Facilities",
    project_ta: "மாவட்ட விளையாட்டு வளாகங்கள் — 10 புதிய வசதிகள்",
    amountCrore: 560,
    date: "2026-01-25",
    type: "tender",
    status: "approved",
    district: "Multiple Districts"
  },
  {
    id: "txn-012",
    department: "Women & Child Development",
    department_ta: "மகளிர் மற்றும் குழந்தை வளர்ச்சி துறை",
    project: "Kalaignar Magalir Urimai Thittam — Q4 Disbursement",
    project_ta: "கலைஞர் மகளிர் உரிமை திட்டம் — Q4 வழங்கல்",
    amountCrore: 7200,
    date: "2026-01-20",
    type: "expenditure",
    status: "completed",
    district: "State-wide",
    beneficiaries: "1.02 crore women"
  }
];

// ── SIGNATURE CAMPAIGNS ────────────────────────────────────
export type CampaignStatus = "active" | "govt_responded" | "debate_scheduled" | "closed";

export interface Campaign {
  id: string;
  title: string;
  title_ta: string;
  description: string;
  description_ta: string;
  target: 10000 | 500000;
  currentSignatures: number;
  deadline: string;
  status: CampaignStatus;
  category: string;
  district?: string;
  outcome?: string;
  outcome_ta?: string;
  govtResponse?: string;
  govtResponse_ta?: string;
}

export const mockCampaigns: Campaign[] = [
  {
    id: "camp-01",
    title: "₹1,000 Minimum Daily Wage for Construction Workers",
    title_ta: "கட்டுமான தொழிலாளர்களுக்கு ₹1,000 குறைந்தபட்ச தினக்கூலி",
    description: "Demand the state government to revise the minimum daily wage for unorganised construction workers from ₹600 to ₹1,000 — in line with rising cost of living and inflation.",
    description_ta: "கட்டமைப்பு வாராமல் உள்ள கட்டுமான தொழிலாளர்களுக்கான குறைந்தபட்ச தினக்கூலியை ₹600 இலிருந்து ₹1,000 ஆக திருத்த அரசை கோருகிறோம் — உயரும் வாழ்க்கை செலவு மற்றும் பணவீக்கத்திற்கு ஏற்ப.",
    target: 10000,
    currentSignatures: 8432,
    deadline: "2026-04-30",
    status: "active",
    category: "Labour Rights"
  },
  {
    id: "camp-02",
    title: "Mandatory CCTV & GPS in All School Buses",
    title_ta: "அனைத்து பள்ளி பேருந்துகளிலும் கட்டாய CCTV மற்றும் GPS",
    description: "All school buses in Tamil Nadu must be fitted with CCTV cameras and real-time GPS tracking, with live feed accessible to parents via a mobile app.",
    description_ta: "தமிழ்நாட்டில் அனைத்து பள்ளி பேருந்துகளும் CCTV கேமராக்கள் மற்றும் நிகழ்நேர GPS கண்காணிப்புடன் பொருத்தப்பட வேண்டும். பெற்றோர்கள் மொபைல் செயலி மூலம் நேரடி காட்சிகளை அணுக முடியும்.",
    target: 10000,
    currentSignatures: 12891,
    deadline: "2026-01-31",
    status: "govt_responded",
    category: "Child Safety",
    outcome: "GO issued — all private school buses must comply by June 2026",
    outcome_ta: "அரசு ஆணை பிறப்பிக்கப்பட்டது — அனைத்து தனியார் பள்ளி பேருந்துகளும் ஜூன் 2026 க்குள் இணங்க வேண்டும்",
    govtResponse: "Tamil Nadu School Education Department has issued GO Ms. No. 47 mandating CCTV and GPS in all school buses. Compliance deadline: June 30, 2026.",
    govtResponse_ta: "தமிழ்நாடு பள்ளிக் கல்வி துறை அனைத்து பள்ளி பேருந்துகளிலும் CCTV மற்றும் GPS கட்டாயமாக்கும் GO Ms. எண். 47 ஐ வெளியிட்டுள்ளது. இணக்க கடைசி நாள்: ஜூன் 30, 2026."
  },
  {
    id: "camp-03",
    title: "Complete Ban on Single-Use Plastics in Tamil Nadu",
    title_ta: "தமிழ்நாட்டில் ஒருமுறை பயன்படுத்தப்படும் பிளாஸ்டிக்குகளுக்கு முழு தடை",
    description: "Enforce a complete ban on all single-use plastics including carry bags, straws, plates, and cutlery across Tamil Nadu with strict penalties for manufacturers, distributors, and retailers.",
    description_ta: "தமிழ்நாடு முழுவதும் தோல்பைகள், குழாய்கள், தட்டுகள் மற்றும் கரண்டிகள் உட்பட அனைத்து ஒருமுறை பயன்படுத்தப்படும் பிளாஸ்டிக்குகளுக்கும் முழு தடை விதிக்க வேண்டும்.",
    target: 500000,
    currentSignatures: 234567,
    deadline: "2026-05-31",
    status: "active",
    category: "Environment"
  },
  {
    id: "camp-04",
    title: "Free 300 Units Electricity for Farmers",
    title_ta: "விவசாயிகளுக்கு 300 யூனிட் இலவச மின்சாரம்",
    description: "Increase the free electricity limit for farmers from 200 units to 300 units per month to support rising energy costs in agricultural pump operations and farm mechanisation.",
    description_ta: "விவசாய பம்ப் இயக்கங்கள் மற்றும் பண்ணை இயந்திரமயமாக்கலில் உயரும் ஆற்றல் செலவை சமாளிக்க விவசாயிகளுக்கான இலவச மின்சார வரம்பை மாதம் 200 யூனிட்டில் இருந்து 300 யூனிட்டாக உயர்த்த வேண்டும்.",
    target: 500000,
    currentSignatures: 487342,
    deadline: "2026-03-31",
    status: "debate_scheduled",
    category: "Agriculture",
    outcome: "Scheduled for debate in Tamil Nadu Legislative Assembly on May 12, 2026",
    outcome_ta: "மே 12, 2026 அன்று தமிழ்நாடு சட்டமன்றத்தில் விவாதத்திற்கு திட்டமிடப்பட்டுள்ளது"
  },
  {
    id: "camp-05",
    title: "Compulsory Tamil Language Teaching in All CBSE Schools",
    title_ta: "அனைத்து CBSE பள்ளிகளிலும் கட்டாய தமிழ் மொழி கல்வி",
    description: "Make Tamil a compulsory language subject in all CBSE and ICSE schools operating in Tamil Nadu, from Class 1 to Class 10.",
    description_ta: "தமிழ்நாட்டில் செயல்படும் அனைத்து CBSE மற்றும் ICSE பள்ளிகளிலும் வகுப்பு 1 முதல் வகுப்பு 10 வரை தமிழை கட்டாய மொழி பாடமாக ஆக்க வேண்டும்.",
    target: 10000,
    currentSignatures: 10342,
    deadline: "2026-02-28",
    status: "govt_responded",
    category: "Education & Language",
    outcome: "State government has filed an appeal in Madras HC. Circular issued to all private schools.",
    outcome_ta: "மாநில அரசு சென்னை உயர் நீதிமன்றத்தில் மேல்முறையீடு செய்தது. அனைத்து தனியார் பள்ளிகளுக்கும் சுற்றறிக்கை வெளியிட்டது.",
    govtResponse: "The School Education Minister confirmed Tamil will be mandatory in all private schools from 2026-27 academic year.",
    govtResponse_ta: "2026-27 கல்வியாண்டிலிருந்து அனைத்து தனியார் பள்ளிகளிலும் தமிழ் கட்டாயமாக இருக்கும் என்று பள்ளிக் கல்வி அமைச்சர் உறுதிப்படுத்தினார்."
  }
];
