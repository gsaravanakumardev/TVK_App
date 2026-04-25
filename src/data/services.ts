export interface ServiceEligibility {
  incomeLimit: string;
  documents: string[];
  rules: string[];
}

export interface Service {
  id: string;
  category: string;
  categoryTa: string;
  name: string;
  nameTa: string;
  description: string;
  descriptionTa: string;
  eligibility: ServiceEligibility;
  applyUrl: string;
  trackUrl: string;
  icon: string;
  color: string;
}

export const services: Service[] = [
  // Revenue Services
  {
    id: "community-certificate",
    category: "Revenue Services",
    categoryTa: "வருவாய் சேவைகள்",
    name: "Community Certificate",
    nameTa: "சமூக சான்றிதழ்",
    description: "Obtain an official certificate declaring your community/caste for government purposes.",
    descriptionTa: "அரசு நோக்கங்களுக்காக உங்கள் சமுதாயம்/சாதியை அறிவிக்கும் அதிகாரப்பூர்வ சான்றிதழ் பெறுங்கள்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Aadhaar Card", "Birth Certificate", "School Certificate", "Residence Proof"],
      rules: ["Must be a Tamil Nadu resident", "Applicant must belong to the declared community"]
    },
    applyUrl: "https://tnedistrict.tn.gov.in/",
    trackUrl: "https://tnedistrict.tn.gov.in/",
    icon: "FileText",
    color: "blue"
  },
  {
    id: "nativity-certificate",
    category: "Revenue Services",
    categoryTa: "வருவாய் சேவைகள்",
    name: "Nativity Certificate",
    nameTa: "பூர்வீக சான்றிதழ்",
    description: "Certificate proving your birthplace/nativity in Tamil Nadu.",
    descriptionTa: "தமிழ்நாட்டில் உங்கள் பிறந்த இடம்/பூர்வீகத்தை நிரூபிக்கும் சான்றிதழ்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Aadhaar Card", "Birth Certificate", "Parent's Nativity Certificate", "School TC"],
      rules: ["Must be born in Tamil Nadu", "Parents must be natives of Tamil Nadu"]
    },
    applyUrl: "https://tnedistrict.tn.gov.in/",
    trackUrl: "https://tnedistrict.tn.gov.in/",
    icon: "MapPin",
    color: "blue"
  },
  {
    id: "income-certificate",
    category: "Revenue Services",
    categoryTa: "வருவாய் சேவைகள்",
    name: "Income Certificate",
    nameTa: "வருமான சான்றிதழ்",
    description: "Official certificate stating your annual family income for government schemes.",
    descriptionTa: "அரசு திட்டங்களுக்காக உங்கள் ஆண்டு குடும்ப வருமானத்தை குறிப்பிடும் அதிகாரப்பூர்வ சான்றிதழ்.",
    eligibility: {
      incomeLimit: "Varies by scheme",
      documents: ["Aadhaar Card", "Salary Slip / Income Proof", "Bank Passbook", "Residence Proof"],
      rules: ["All income sources must be declared", "Income certificate valid for 1 year"]
    },
    applyUrl: "https://tnedistrict.tn.gov.in/",
    trackUrl: "https://tnedistrict.tn.gov.in/",
    icon: "IndianRupee",
    color: "blue"
  },
  {
    id: "first-graduate-certificate",
    category: "Revenue Services",
    categoryTa: "வருவாய் சேவைகள்",
    name: "First Graduate Certificate",
    nameTa: "முதல் பட்டதாரி சான்றிதழ்",
    description: "Certificate for students who are the first graduates in their family.",
    descriptionTa: "தங்கள் குடும்பத்தில் முதல் பட்டதாரிகளாக இருக்கும் மாணவர்களுக்கான சான்றிதழ்.",
    eligibility: {
      incomeLimit: "Family income below ₹2.5 Lakh/year",
      documents: ["Aadhaar Card", "Parent's Educational Certificates", "Income Certificate", "Degree Certificate"],
      rules: ["No family member should have a degree before the applicant", "Must be from Tamil Nadu"]
    },
    applyUrl: "https://tnedistrict.tn.gov.in/",
    trackUrl: "https://tnedistrict.tn.gov.in/",
    icon: "GraduationCap",
    color: "blue"
  },
  {
    id: "obc-certificate",
    category: "Revenue Services",
    categoryTa: "வருவாய் சேவைகள்",
    name: "OBC Certificate",
    nameTa: "ஓபிசி சான்றிதழ்",
    description: "Other Backward Classes certificate for availing government reservations.",
    descriptionTa: "அரசு இட ஒதுக்கீட்டை பயன்படுத்திக்கொள்வதற்கான பிற பிற்படுத்தப்பட்ட வகுப்பினர் சான்றிதழ்.",
    eligibility: {
      incomeLimit: "Annual family income below ₹8 Lakh",
      documents: ["Aadhaar Card", "Community Certificate", "Income Certificate", "Birth Certificate"],
      rules: ["Must belong to OBC category notified by government", "Income must be within limit"]
    },
    applyUrl: "https://tnedistrict.tn.gov.in/",
    trackUrl: "https://tnedistrict.tn.gov.in/",
    icon: "Award",
    color: "blue"
  },
  {
    id: "legal-heir-certificate",
    category: "Revenue Services",
    categoryTa: "வருவாய் சேவைகள்",
    name: "Legal Heir Certificate",
    nameTa: "சட்டபூர்வ வாரிசு சான்றிதழ்",
    description: "Certificate identifying legal heirs of a deceased person for inheritance purposes.",
    descriptionTa: "மரபுரிமை நோக்கங்களுக்காக இறந்த நபரின் சட்டப்பூர்வ வாரிசுகளை அடையாளம் காணும் சான்றிதழ்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Death Certificate of Deceased", "Aadhaar Card", "Relationship Proof", "Residence Proof"],
      rules: ["Applicant must be direct legal heir", "Death certificate is mandatory"]
    },
    applyUrl: "https://tnedistrict.tn.gov.in/",
    trackUrl: "https://tnedistrict.tn.gov.in/",
    icon: "Users",
    color: "blue"
  },

  // Social Welfare
  {
    id: "marriage-assistance",
    category: "Social Welfare",
    categoryTa: "சமூக நலன்",
    name: "Marriage Assistance Schemes",
    nameTa: "திருமண உதவி திட்டங்கள்",
    description: "Financial assistance for marriages of women from economically weaker sections.",
    descriptionTa: "பொருளாதாரத்தில் பின்தங்கிய பிரிவினர் திருமணங்களுக்கு நிதியுதவி.",
    eligibility: {
      incomeLimit: "Annual family income below ₹72,000",
      documents: ["Aadhaar Card", "Community Certificate", "Income Certificate", "Age Proof", "Marriage Invitation"],
      rules: ["Bride must be 18+ years", "Groom must be 21+ years", "Only for first marriage"]
    },
    applyUrl: "https://www.tn.gov.in/",
    trackUrl: "https://www.tn.gov.in/",
    icon: "Heart",
    color: "pink"
  },
  {
    id: "girl-child-protection",
    category: "Social Welfare",
    categoryTa: "சமூக நலன்",
    name: "Girl Child Protection Scheme",
    nameTa: "பெண் குழந்தை பாதுகாப்பு திட்டம்",
    description: "Scheme to protect girl children and provide financial benefits upon maturity.",
    descriptionTa: "பெண் குழந்தைகளை பாதுகாக்கவும் முதிர்ச்சியடையும்போது நிதி சலுகைகள் வழங்கவும் திட்டம்.",
    eligibility: {
      incomeLimit: "Annual family income below ₹72,000",
      documents: ["Girl Child's Birth Certificate", "Aadhaar Card of Parents", "Income Certificate", "Community Certificate"],
      rules: ["Applicable for families with maximum 2 girl children", "Must register within 1 year of birth"]
    },
    applyUrl: "https://www.tn.gov.in/",
    trackUrl: "https://www.tn.gov.in/",
    icon: "Star",
    color: "pink"
  },

  // Land Records
  {
    id: "patta-transfer",
    category: "Land Records",
    categoryTa: "நில பதிவுகள்",
    name: "Patta Transfer",
    nameTa: "பட்டா மாற்றம்",
    description: "Transfer of land ownership records (Patta) after purchase or inheritance.",
    descriptionTa: "கொள்முதல் அல்லது மரபுரிமைக்குப் பின் நில உரிமை பதிவுகளை (பட்டா) மாற்றுதல்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Sale Deed / Inheritance Documents", "Old Patta", "Aadhaar Card", "Encumbrance Certificate"],
      rules: ["Property must be registered in Tamil Nadu", "Applicable stamp duty must be paid"]
    },
    applyUrl: "https://eservices.tn.gov.in/",
    trackUrl: "https://eservices.tn.gov.in/",
    icon: "Landmark",
    color: "green"
  },
  {
    id: "chitta",
    category: "Land Records",
    categoryTa: "நில பதிவுகள்",
    name: "Chitta",
    nameTa: "சிட்டா",
    description: "Land ownership document maintained by Village Administrative Officer.",
    descriptionTa: "கிராம நிர்வாக அலுவலரால் பராமரிக்கப்படும் நில உரிமை ஆவணம்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Patta Copy", "Aadhaar Card", "Survey Number Details"],
      rules: ["Land must be registered agricultural land", "Owner's name must match revenue records"]
    },
    applyUrl: "https://eservices.tn.gov.in/",
    trackUrl: "https://eservices.tn.gov.in/",
    icon: "FileSearch",
    color: "green"
  },
  {
    id: "a-register",
    category: "Land Records",
    categoryTa: "நில பதிவுகள்",
    name: "A-Register",
    nameTa: "ஏ-பதிவேடு",
    description: "Primary register containing details of agricultural land parcels.",
    descriptionTa: "விவசாய நில பகுதிகளின் விவரங்களை கொண்ட முதன்மை பதிவேடு.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Patta Number", "Survey Number", "Aadhaar Card"],
      rules: ["Applicable for agricultural land only", "Available through online portal"]
    },
    applyUrl: "https://eservices.tn.gov.in/",
    trackUrl: "https://eservices.tn.gov.in/",
    icon: "BookOpen",
    color: "green"
  },

  // Social Security
  {
    id: "old-age-pension",
    category: "Social Security",
    categoryTa: "சமூக பாதுகாப்பு",
    name: "Old Age Pension",
    nameTa: "வயதான காலம் ஓய்வூதியம்",
    description: "Monthly pension for senior citizens above 60 years from BPL families.",
    descriptionTa: "BPL குடும்பங்களிலிருந்து 60 வயதுக்கு மேற்பட்ட மூத்த குடிமக்களுக்கு மாதாந்திர ஓய்வூதியம்.",
    eligibility: {
      incomeLimit: "Below Poverty Line (BPL)",
      documents: ["Aadhaar Card", "Age Proof", "BPL Card", "Bank Passbook"],
      rules: ["Age must be 60 years or above", "Must be BPL family member", "Must be Tamil Nadu resident for 5+ years"]
    },
    applyUrl: "https://www.tnpds.gov.in/",
    trackUrl: "https://www.tnpds.gov.in/",
    icon: "UserCheck",
    color: "orange"
  },
  {
    id: "widow-pension",
    category: "Social Security",
    categoryTa: "சமூக பாதுகாப்பு",
    name: "Widow Pension",
    nameTa: "விதவை ஓய்வூதியம்",
    description: "Monthly financial assistance for widows from economically weaker sections.",
    descriptionTa: "பொருளாதாரத்தில் பின்தங்கிய பிரிவினர் விதவைகளுக்கு மாதாந்திர நிதியுதவி.",
    eligibility: {
      incomeLimit: "Annual income below ₹75,000",
      documents: ["Aadhaar Card", "Husband's Death Certificate", "Income Certificate", "Bank Passbook"],
      rules: ["Widow must not have remarried", "Age between 18-60 years", "Must be Tamil Nadu resident"]
    },
    applyUrl: "https://www.tnpds.gov.in/",
    trackUrl: "https://www.tnpds.gov.in/",
    icon: "Shield",
    color: "orange"
  },
  {
    id: "disability-pension",
    category: "Social Security",
    categoryTa: "சமூக பாதுகாப்பு",
    name: "Disability Pension",
    nameTa: "மாற்றுத்திறனாளி ஓய்வூதியம்",
    description: "Monthly financial support for persons with disabilities.",
    descriptionTa: "மாற்றுத்திறனாளிகளுக்கு மாதாந்திர நிதி உதவி.",
    eligibility: {
      incomeLimit: "Annual income below ₹75,000",
      documents: ["Aadhaar Card", "Disability Certificate (40%+ disability)", "Income Certificate", "Bank Passbook"],
      rules: ["Minimum 40% permanent disability", "Certified by District Medical Board"]
    },
    applyUrl: "https://www.tnpds.gov.in/",
    trackUrl: "https://www.tnpds.gov.in/",
    icon: "HeartHandshake",
    color: "orange"
  },

  // Utilities and Police
  {
    id: "tangedco-bill",
    category: "Utilities & Police",
    categoryTa: "பயன்பாடுகள் மற்றும் காவல்துறை",
    name: "TANGEDCO Bill Payment",
    nameTa: "தமிழ்நாடு மின்சாரம் கட்டணம்",
    description: "Pay electricity bills online through TANGEDCO portal.",
    descriptionTa: "TANGEDCO போர்டல் மூலம் மின்சார கட்டணங்களை ஆன்லைனில் செலுத்துங்கள்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Consumer Number", "Aadhaar Card (optional)"],
      rules: ["Valid consumer number required", "Payment accepted via UPI/Net Banking/Cards"]
    },
    applyUrl: "https://www.tnebnet.org/",
    trackUrl: "https://www.tnebnet.org/",
    icon: "Zap",
    color: "yellow"
  },
  {
    id: "fir-status",
    category: "Utilities & Police",
    categoryTa: "பயன்பாடுகள் மற்றும் காவல்துறை",
    name: "FIR Status",
    nameTa: "எஃப்ஐஆர் நிலை",
    description: "Check the status of your First Information Report (FIR) online.",
    descriptionTa: "உங்கள் முதல் தகவல் அறிக்கை (FIR) நிலையை ஆன்லைனில் சரிபாருங்கள்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["FIR Number", "Police Station Name"],
      rules: ["FIR number required to check status"]
    },
    applyUrl: "https://www.tamilnadupolice.gov.in/",
    trackUrl: "https://www.tamilnadupolice.gov.in/",
    icon: "FileSearch",
    color: "yellow"
  },
  {
    id: "csr-status",
    category: "Utilities & Police",
    categoryTa: "பயன்பாடுகள் மற்றும் காவல்துறை",
    name: "CSR Status",
    nameTa: "சிஎஸ்ஆர் நிலை",
    description: "Check status of Community Service Register complaint.",
    descriptionTa: "சமூக சேவை பதிவு புகாரின் நிலையை சரிபாருங்கள்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["CSR Number", "Police Station Name"],
      rules: ["CSR number required to check status"]
    },
    applyUrl: "https://www.tamilnadupolice.gov.in/",
    trackUrl: "https://www.tamilnadupolice.gov.in/",
    icon: "ClipboardList",
    color: "yellow"
  },
  {
    id: "lost-document",
    category: "Utilities & Police",
    categoryTa: "பயன்பாடுகள் மற்றும் காவல்துறை",
    name: "Lost Document Reporting",
    nameTa: "தொலைந்த ஆவண புகார்",
    description: "Report lost documents online to get a police acknowledgment.",
    descriptionTa: "காவல் ஒப்புதல் பெற ஆன்லைனில் தொலைந்த ஆவணங்களை புகாரளியுங்கள்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Aadhaar Card", "Description of Lost Documents"],
      rules: ["Report must be filed at nearest police station", "Online complaint can be converted to FIR"]
    },
    applyUrl: "https://www.tamilnadupolice.gov.in/",
    trackUrl: "https://www.tamilnadupolice.gov.in/",
    icon: "AlertCircle",
    color: "yellow"
  },

  // Women's Welfare
  {
    id: "magalir-urimai",
    category: "Women's Welfare",
    categoryTa: "மகளிர் நலன்",
    name: "Kalaignar Magalir Urimai Thogai",
    nameTa: "கலைஞர் மகளிர் உரிமைத் தொகை",
    description: "Monthly ₹1000 financial assistance to eligible women heads of family.",
    descriptionTa: "தகுதியான குடும்பத் தலைவி பெண்களுக்கு மாதம் ₹1000 நிதி உதவி.",
    eligibility: {
      incomeLimit: "Annual family income below ₹2.5 Lakh",
      documents: ["Aadhaar Card", "Bank Passbook", "Ration Card", "Income Certificate"],
      rules: ["Woman must be head of household", "Age 18-60 years", "Must have bank account"]
    },
    applyUrl: "https://www.tn.gov.in/",
    trackUrl: "https://www.tn.gov.in/",
    icon: "BadgeIndianRupee",
    color: "pink"
  },

  // Education
  {
    id: "pudhumai-penn",
    category: "Education",
    categoryTa: "கல்வி",
    name: "Pudhumai Penn",
    nameTa: "புதுமை பெண்",
    description: "Monthly stipend of ₹1000 for girls studying in government schools from 6th to 12th standard.",
    descriptionTa: "6 முதல் 12 வது வகுப்பு வரை அரசு பள்ளிகளில் படிக்கும் மாணவிகளுக்கு மாதம் ₹1000 கல்வி உதவித்தொகை.",
    eligibility: {
      incomeLimit: "Must study in government school",
      documents: ["Aadhaar Card", "School ID Card", "Bank Passbook (in student's name)"],
      rules: ["Must be enrolled in government school", "Standards 6 to 12", "Regular attendance required"]
    },
    applyUrl: "https://www.tn.gov.in/",
    trackUrl: "https://www.tn.gov.in/",
    icon: "BookOpen",
    color: "purple"
  },
  {
    id: "tamil-pudhalvan",
    category: "Education",
    categoryTa: "கல்வி",
    name: "Tamil Pudhalvan",
    nameTa: "தமிழ் புதல்வன்",
    description: "Scholarship scheme for meritorious students from government schools.",
    descriptionTa: "அரசு பள்ளிகளில் இருந்து சிறந்த மாணவர்களுக்கான உதவித்தொகை திட்டம்.",
    eligibility: {
      incomeLimit: "Annual family income below ₹2 Lakh",
      documents: ["Mark Sheets", "Aadhaar Card", "Income Certificate", "School Certificate"],
      rules: ["Must have scored above 75% in previous exam", "Must study in government school"]
    },
    applyUrl: "https://www.tn.gov.in/",
    trackUrl: "https://www.tn.gov.in/",
    icon: "Trophy",
    color: "purple"
  },
  {
    id: "naan-mudhalvan",
    category: "Education",
    categoryTa: "கல்வி",
    name: "Naan Mudhalvan",
    nameTa: "நான் முதல்வன்",
    description: "Skill development and employment program for youth.",
    descriptionTa: "இளைஞர்களுக்கான திறன் மேம்பாடு மற்றும் வேலைவாய்ப்பு திட்டம்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Aadhaar Card", "Educational Certificates", "Passport Photo"],
      rules: ["Age 14-35 years", "Must be Tamil Nadu resident"]
    },
    applyUrl: "https://naanmudhalvan.tn.gov.in/",
    trackUrl: "https://naanmudhalvan.tn.gov.in/",
    icon: "Lightbulb",
    color: "purple"
  },

  // Grievance Redressal
  {
    id: "roads-complaint",
    category: "Grievance Redressal",
    categoryTa: "புகார் நிவாரணம்",
    name: "Roads Complaint",
    nameTa: "சாலை புகார்",
    description: "Register complaints about damaged roads, potholes, and road maintenance issues.",
    descriptionTa: "சேதமடைந்த சாலைகள், குழிகள் மற்றும் சாலை பராமரிப்பு சிக்கல்களை புகாரளியுங்கள்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Location Details", "Photo Evidence (optional)"],
      rules: ["Must provide exact location", "Complaint will be forwarded to concerned department"]
    },
    applyUrl: "https://www.cmcell.tn.gov.in/",
    trackUrl: "https://www.cmcell.tn.gov.in/",
    icon: "Construction",
    color: "red"
  },
  {
    id: "water-issue",
    category: "Grievance Redressal",
    categoryTa: "புகார் நிவாரணம்",
    name: "Water Issue",
    nameTa: "தண்ணீர் சிக்கல்",
    description: "Report drinking water supply issues, pipeline leaks, and water quality problems.",
    descriptionTa: "குடிநீர் வழங்கல் சிக்கல்கள், குழாய் கசிவுகள் மற்றும் நீர் தர சிக்கல்களை புகாரளியுங்கள்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Location Details", "Consumer Number (if applicable)"],
      rules: ["Complaint must include specific location", "Emergency water issues: Call 1800-425-4368"]
    },
    applyUrl: "https://www.cmcell.tn.gov.in/",
    trackUrl: "https://www.cmcell.tn.gov.in/",
    icon: "Droplets",
    color: "red"
  },
  {
    id: "street-lights",
    category: "Grievance Redressal",
    categoryTa: "புகார் நிவாரணம்",
    name: "Street Lights",
    nameTa: "தெரு விளக்குகள்",
    description: "Report non-functioning or damaged street lights in your area.",
    descriptionTa: "உங்கள் பகுதியில் செயல்படாத அல்லது சேதமடைந்த தெரு விளக்குகளை புகாரளியுங்கள்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Location Details", "Street Light Number (if visible)"],
      rules: ["Must provide exact location", "Provide photo if possible"]
    },
    applyUrl: "https://www.cmcell.tn.gov.in/",
    trackUrl: "https://www.cmcell.tn.gov.in/",
    icon: "Lightbulb",
    color: "red"
  },
  {
    id: "cm-helpline",
    category: "Grievance Redressal",
    categoryTa: "புகார் நிவாரணம்",
    name: "Chief Minister Helpline",
    nameTa: "முதலமைச்சர் உதவி மையம்",
    description: "Direct helpline to Chief Minister's office for public grievances.",
    descriptionTa: "பொது புகார்களுக்கு முதலமைச்சர் அலுவலகத்திற்கு நேரடி உதவி மையம்.",
    eligibility: {
      incomeLimit: "No income limit",
      documents: ["Aadhaar Card", "Complaint Details"],
      rules: ["Call 1100 for immediate assistance", "Online complaint can also be registered"]
    },
    applyUrl: "https://www.cmcell.tn.gov.in/",
    trackUrl: "https://www.cmcell.tn.gov.in/",
    icon: "Phone",
    color: "red"
  }
];

export const categories = [...new Set(services.map(s => s.category))];

export default services;
