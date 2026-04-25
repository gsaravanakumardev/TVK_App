import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, RotateCcw } from "lucide-react";

interface QA {
  id: number;
  q: string;
  q_ta: string;
  a: string;
  a_ta: string;
  category: string;
}

const QA_LIST: QA[] = [
  {
    id: 1,
    category: "People's Hall",
    q: "How does People's Hall work?",
    q_ta: "மக்கள் மன்றம் எவ்வாறு செயல்படுகிறது?",
    a: "People's Hall (மக்கள் மன்றம்) is a civic platform with 5 sections: Public Ideas (submit & upvote ideas), Policy Voting (vote on government policies), Rate Services (evaluate govt services), Financial Monitor (track spending), and Signature Campaigns (sign petitions). All interactions are saved locally.",
    a_ta: "மக்கள் மன்றம் என்பது 5 பகுதிகளுடன் கூடிய குடிமக்கள் தளம்: பொது யோசனைகள் (யோசனைகளை சமர்ப்பி மற்றும் ஆதரி), கொள்கை வாக்கெடுப்பு (அரசு கொள்கைகளில் வாக்களி), சேவை மதிப்பீடு (அரசு சேவைகளை மதிப்பிடு), நிதி கண்காணிப்பு (செலவை கண்காணி), மற்றும் கையொப்ப பிரச்சாரங்கள் (மனுக்களில் கையொப்மிடு). அனைத்து தகவல்களும் உள்ளூரில் சேமிக்கப்படும்."
  },
  {
    id: 2,
    category: "Campaigns",
    q: "What happens when a petition gets 10,000 signatures?",
    q_ta: "ஒரு மனுவிற்கு 10,000 கையொப்பங்கள் கிடைத்தால் என்ன ஆகும்?",
    a: "When a petition reaches 10,000 signatures, the Government of Tamil Nadu is obligated to formally respond within 30 days. The response will be published on the People's Hall platform for all citizens to see.",
    a_ta: "ஒரு மனு 10,000 கையொப்பங்களை எட்டும்போது, தமிழ்நாடு அரசு 30 நாட்களுக்குள் முறையாக பதில் அளிக்க கடமைப்பட்டுள்ளது. பதில் அனைத்து குடிமக்களும் பார்க்க மக்கள் மன்றம் தளத்தில் வெளியிடப்படும்."
  },
  {
    id: 3,
    category: "Campaigns",
    q: "What happens when a petition gets 5,00,000 signatures?",
    q_ta: "5,00,000 கையொப்பங்கள் கிடைத்தால் என்ன ஆகும்?",
    a: "A petition crossing 5,00,000 (5 lakh) signatures is scheduled for a formal debate in the Tamil Nadu Legislative Assembly. Members of the Assembly are required to deliberate on the issue and report back to citizens.",
    a_ta: "5,00,000 (5 லட்சம்) கையொப்பங்களை தாண்டிய மனு தமிழ்நாடு சட்டமன்றத்தில் முறையான விவாதத்திற்கு திட்டமிடப்படும். சட்டமன்ற உறுப்பினர்கள் பிரச்சினையை விவாதித்து குடிமக்களுக்கு அறிவிக்க வேண்டும்."
  },
  {
    id: 4,
    category: "Services",
    q: "How do I apply for a ration card?",
    q_ta: "இராசன் அட்டைக்கு எப்படி விண்ணப்பிப்பது?",
    a: "To apply for a ration card in Tamil Nadu: 1) Visit your nearest Taluk office or apply at tnpds.gov.in 2) Fill Form A (new card) 3) Submit: Aadhaar card, address proof, income proof, family photos. Processing time is 30–45 days.",
    a_ta: "தமிழ்நாட்டில் இராசன் அட்டைக்கு விண்ணப்பிக்க: 1) உங்கள் அருகிலுள்ள தாலுக்கா அலுவலகத்திற்கு செல்லுங்கள் அல்லது tnpds.gov.in இல் விண்ணப்பிக்கவும் 2) படிவம் A பூர்த்தி செய்யவும் 3) ஆதார் அட்டை, முகவரி சான்று, வருமான சான்று, குடும்ப புகைப்படங்கள் சமர்ப்பிக்கவும். செயல்படும் காலம் 30–45 நாட்கள்."
  },
  {
    id: 5,
    category: "Services",
    q: "How do I get an income certificate?",
    q_ta: "வருமான சான்றிதழ் எப்படி பெறுவது?",
    a: "Apply for an income certificate at your local Tahsildar office or online at tnedistrict.tn.gov.in. Required documents: Aadhaar, ration card, last 3 months salary slip or self-declaration. Certificate is issued within 7 working days.",
    a_ta: "உங்கள் உள்ளூர் தகசிலதார் அலுவலகத்தில் அல்லது tnedistrict.tn.gov.in இல் ஆன்லைனில் வருமான சான்றிதழுக்கு விண்ணப்பிக்கவும். தேவையான ஆவணங்கள்: ஆதார், இராசன் அட்டை, கடந்த 3 மாத சம்பள சீட்டு அல்லது சுய-அறிவிப்பு. 7 வேலை நாட்களில் சான்றிதழ் வழங்கப்படும்."
  },
  {
    id: 6,
    category: "Schemes",
    q: "What is the CM Breakfast Scheme?",
    q_ta: "முதலமைச்சர் காலை உணவு திட்டம் என்றால் என்ன?",
    a: "The CM Breakfast Scheme provides free nutritious breakfast to students in government schools from Classes 1 to 5. It started in 2022 and now covers over 21 lakh children across Tamil Nadu. The menu includes idli, pongal, and upma.",
    a_ta: "முதலமைச்சர் காலை உணவு திட்டம் 1 முதல் 5 ஆம் வகுப்பு வரை அரசு பள்ளி மாணவர்களுக்கு இலவச சத்தான காலை உணவு வழங்குகிறது. இது 2022 இல் தொடங்கி இப்போது தமிழ்நாடு முழுவதும் 21 லட்சத்திற்கும் அதிகமான குழந்தைகளை உள்ளடக்கியுள்ளது. மெனுவில் இட்லி, பொங்கல் மற்றும் உப்புமா உள்ளன."
  },
  {
    id: 7,
    category: "Schemes",
    q: "What is Kalaignar Magalir Urimai Thittam?",
    q_ta: "கலைஞர் மகளிர் உரிமை திட்டம் என்றால் என்ன?",
    a: "Kalaignar Magalir Urimai Thittam provides ₹1,000 per month to eligible women heads of household. To be eligible, the family must have an annual income below ₹2.5 lakh, and the woman must be between 21–60 years. Over 1 crore women benefit from this scheme.",
    a_ta: "கலைஞர் மகளிர் உரிமை திட்டம் தகுதியான மகளிர் குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 வழங்குகிறது. தகுதிக்கு, குடும்பத்தின் ஆண்டு வருமானம் ₹2.5 லட்சத்திற்கு கீழ் இருக்க வேண்டும், மற்றும் மகளிர் 21–60 வயதுக்கு இடையில் இருக்க வேண்டும். 1 கோடிக்கும் அதிகமான மகளிர் இந்த திட்டத்தால் பயன்பெறுகிறார்கள்."
  },
  {
    id: 8,
    category: "Schemes",
    q: "How to apply for Amma Veedu scheme?",
    q_ta: "அம்மா வீடு திட்டத்திற்கு எவ்வாறு விண்ணப்பிப்பது?",
    a: "Amma Veedu scheme provides free houses to landless rural families. Apply at your local Panchayat or Block Development Office. Required: Aadhaar, ration card, income certificate below ₹2 lakh, land ownership document (if applicable), bank details.",
    a_ta: "அம்மா வீடு திட்டம் நிலமில்லாத கிராமப்புற குடும்பங்களுக்கு இலவச வீடுகளை வழங்குகிறது. உங்கள் உள்ளூர் பஞ்சாயத்து அல்லது வட்டார வளர்ச்சி அலுவலகத்தில் விண்ணப்பிக்கவும். தேவையானவை: ஆதார், இராசன் அட்டை, ₹2 லட்சத்திற்கு கீழ் வருமான சான்றிதழ், நில உரிமை ஆவணம், வங்கி விவரங்கள்."
  },
  {
    id: 9,
    category: "Services",
    q: "How to report a road pothole?",
    q_ta: "சாலை குழியை எவ்வாறு புகார் செய்வது?",
    a: "Report road potholes through: 1) Call 1100 (CM Helpline) 2) Use the Tamil Nadu Grievance Portal at cms.tn.gov.in 3) Tweet @CMOTamilNadu or @TNHighwaysDept. For city roads, contact your Corporation/Municipality hotline. You can track your complaint with the reference number.",
    a_ta: "சாலை குழிகளை புகார் செய்ய: 1) 1100 (முதலமைச்சர் உதவி மையம்) அழைக்கவும் 2) cms.tn.gov.in இல் தமிழ்நாடு குறைதீர்வு போர்ட்டல் பயன்படுத்தவும் 3) @CMOTamilNadu அல்லது @TNHighwaysDept ட்வீட் செய்யவும். நகர சாலைகளுக்கு, உங்கள் மாநகராட்சி/நகராட்சி ஹாட்லைனை தொடர்பு கொள்ளவும்."
  },
  {
    id: 10,
    category: "Services",
    q: "What documents are needed for a birth certificate?",
    q_ta: "பிறப்பு சான்றிதழுக்கு என்ன ஆவணங்கள் தேவை?",
    a: "For a birth certificate, you need: Hospital discharge summary, Parents' Aadhaar cards, Parents' marriage certificate (if available), Ration card, and a completed application form. Apply at the local Panchayat/Municipality within 21 days of birth. Late registration requires an affidavit.",
    a_ta: "பிறப்பு சான்றிதழுக்கு: மருத்துவமனை டிஸ்சார்ஜ் சுருக்கம், பெற்றோரின் ஆதார் அட்டைகள், பெற்றோரின் திருமண சான்றிதழ் (இருந்தால்), இராசன் அட்டை, பூர்த்தி செய்யப்பட்ட விண்ணப்பப் படிவம் தேவை. பிறந்த 21 நாட்களுக்குள் உள்ளூர் பஞ்சாயத்து/நகராட்சியில் விண்ணப்பிக்கவும். தாமத பதிவுக்கு உறுதிமொழி தேவை."
  },
  {
    id: 11,
    category: "TVK",
    q: "What is TVK?",
    q_ta: "TVK என்றால் என்ன?",
    a: "TVK (Tamilaga Vetri Kazhagam / தமிழக வெற்றி கழகம்) is a political party founded in 2024. It was founded by actor-turned-politician Vijay. The party's ideology focuses on social justice, welfare state, environmental protection, and progressive governance for Tamil Nadu.",
    a_ta: "TVK (தமிழக வெற்றி கழகம்) என்பது 2024 இல் நிறுவப்பட்ட ஒரு அரசியல் கட்சி. நடிகரிலிருந்து அரசியல்வாதியாக மாறிய விஜயால் நிறுவப்பட்டது. கட்சியின் கொள்கை சமூக நீதி, நலன்புரி அரசு, சுற்றுச்சூழல் பாதுகாப்பு மற்றும் தமிழ்நாட்டிற்கான முற்போக்கு ஆட்சியில் கவனம் செலுத்துகிறது."
  },
  {
    id: 12,
    category: "TVK",
    q: "Who is the president of TVK?",
    q_ta: "TVK தலைவர் யார்?",
    a: "Thiru Vijay (born Joseph Vijay) is the President of Tamilaga Vetri Kazhagam (TVK). He is a renowned Tamil film actor who transitioned to politics. TVK was officially launched in 2024 with Vijay as its founding president.",
    a_ta: "திரு. விஜய் (ஜோசஃப் விஜய்) தமிழக வெற்றி கழகத்தின் (TVK) தலைவர். புகழ்பெற்ற தமிழ் திரைப்பட நடிகரான அவர் அரசியலுக்கு நுழைந்தார். TVK 2024 இல் விஜயை நிறுவனத் தலைவராகக் கொண்டு அதிகாரப்பூர்வமாக தொடங்கப்பட்டது."
  },
  {
    id: 13,
    category: "People's Hall",
    q: "How to submit a public idea?",
    q_ta: "பொது யோசனை எப்படி சமர்ப்பிப்பது?",
    a: "In People's Hall → Public Ideas tab, click 'Submit Idea'. Fill in your idea title, select a category (Agriculture, Healthcare, Education, etc.), write a detailed description, and click Submit. Your idea will be reviewed and other citizens can upvote it.",
    a_ta: "மக்கள் மன்றம் → பொது யோசனைகள் தாவலில், 'யோசனை சேர்க்க' என்பதை கிளிக் செய்யவும். உங்கள் யோசனையின் தலைப்பை பூர்த்தி செய்யவும், வகையை தேர்ந்தெடுக்கவும் (வேளாண்மை, சுகாதாரம், கல்வி, முதலியன), விரிவான விவரத்தை எழுதவும், மற்றும் சமர்ப்பி என்பதை கிளிக் செய்யவும். உங்கள் யோசனை மதிப்பாய்வு செய்யப்படும் மற்றும் மற்ற குடிமக்கள் ஆதரவு வோட்டு அளிக்கலாம்."
  },
  {
    id: 14,
    category: "People's Hall",
    q: "How to vote on a government policy?",
    q_ta: "அரசு கொள்கையில் எவ்வாறு வாக்களிப்பது?",
    a: "Go to People's Hall → Policy Voting tab. You will see active government policy proposals. Click 'Support' (green) to vote in favour or 'Oppose' (red) to vote against. Each citizen can vote once per policy. Closed or implemented policies show the final vote tally.",
    a_ta: "மக்கள் மன்றம் → கொள்கை வாக்கெடுப்பு தாவலுக்கு செல்லவும். செயலில் உள்ள அரசு கொள்கை முன்மொழிவுகளை நீங்கள் காண்பீர்கள். ஆதரவாக வாக்களிக்க 'ஆதரவு' (பச்சை) என்பதை அல்லது எதிராக வாக்களிக்க 'எதிர்ப்பு' (சிவப்பு) என்பதை கிளிக் செய்யவும். ஒவ்வொரு குடிமகனும் ஒரு கொள்கையில் ஒருமுறை வாக்களிக்கலாம்."
  },
  {
    id: 15,
    category: "People's Hall",
    q: "How to rate a government service?",
    q_ta: "அரசு சேவையை எவ்வாறு மதிப்பிடுவது?",
    a: "In People's Hall → Rate Services tab, find the service you have used. Click the stars (1–5) to give your rating, optionally write feedback, and click Submit Rating. Your rating contributes to the overall service quality score visible to all citizens.",
    a_ta: "மக்கள் மன்றம் → சேவை மதிப்பீடு தாவலில், நீங்கள் பயன்படுத்திய சேவையை கண்டறியவும். உங்கள் மதிப்பீட்டை வழங்க நட்சத்திரங்களை (1–5) கிளிக் செய்யவும், விரும்பினால் கருத்தை எழுதவும், மற்றும் மதிப்பீட்டை சமர்ப்பி என்பதை கிளிக் செய்யவும்."
  },
  {
    id: 16,
    category: "People's Hall",
    q: "How to track government financial transactions?",
    q_ta: "அரசு நிதி பரிவர்த்தனைகளை எவ்வாறு கண்காணிப்பது?",
    a: "Go to People's Hall → Financial Monitor tab. You can see all recent government fund releases, expenditures, and tenders. Filter by type, status, or search by project/department name. Summary cards at the top show total allocated, released, and spent amounts.",
    a_ta: "மக்கள் மன்றம் → நிதி கண்காணிப்பு தாவலுக்கு செல்லவும். அனைத்து சமீபத்திய அரசு நிதி வெளியீடுகள், செலவுகள் மற்றும் ஒப்பந்தங்களை நீங்கள் காணலாம். வகை, நிலை, அல்லது திட்டம்/துறை பெயர் மூலம் வடிகட்டவும்."
  },
  {
    id: 17,
    category: "Helplines",
    q: "What is the CM Helpline number?",
    q_ta: "முதலமைச்சர் உதவி மைய எண் என்ன?",
    a: "CM Helpline: 1100 (available 24/7). Other important numbers: 108 – Emergency/Ambulance, 181 – Women Helpline, 100 – Police, 101 – Fire, 1073 – Highway Accident Rescue, 1098 – Child Helpline (CHILDLINE).",
    a_ta: "முதலமைச்சர் உதவி மையம்: 1100 (24/7 கிடைக்கும்). மற்ற முக்கியமான எண்கள்: 108 – அவசரம்/ஆம்புலன்ஸ், 181 – மகளிர் உதவி மையம், 100 – காவல்துறை, 101 – தீயணைப்பு, 1073 – நெடுஞ்சாலை விபத்து மீட்பு, 1098 – குழந்தைகள் உதவி மையம்."
  },
  {
    id: 18,
    category: "Services",
    q: "How to get a caste certificate?",
    q_ta: "சாதி சான்றிதழ் எவ்வாறு பெறுவது?",
    a: "Apply for a caste/community certificate at the Tahsildar office or online at tnedistrict.tn.gov.in. Required: Aadhaar, ration card, school transfer certificate, and proof of community. For SC/ST certificates, a school certificate with community notation is required. Issued within 7–15 days.",
    a_ta: "தகசிலதார் அலுவலகத்தில் அல்லது tnedistrict.tn.gov.in இல் ஆன்லைனில் சாதி/சமூக சான்றிதழுக்கு விண்ணப்பிக்கவும். தேவையானவை: ஆதார், இராசன் அட்டை, பள்ளி இடமாற்று சான்றிதழ், சமூகம் பற்றிய சான்று. SC/ST சான்றிதழுக்கு, சமூக குறிப்புடன் பள்ளி சான்றிதழ் தேவை. 7–15 நாட்களுக்குள் வழங்கப்படும்."
  },
  {
    id: 19,
    category: "Environment",
    q: "What is the Green TN mission?",
    q_ta: "பசுமை தமிழ்நாடு இயக்கம் என்றால் என்ன?",
    a: "The Green Tamil Nadu Mission aims to plant 100 crore (1 billion) native trees across the state over 10 years. The goal is to increase Tamil Nadu's green cover from the current 23% to 33% of the geographical area. It focuses on native species, highway avenues, river banks, and school campuses.",
    a_ta: "பசுமை தமிழ்நாடு இயக்கம் 10 ஆண்டுகளில் மாநிலம் முழுவதும் 100 கோடி (1 பில்லியன்) நாட்டு மரங்கள் நடுவதை நோக்கமாக கொண்டுள்ளது. தமிழ்நாட்டின் பசுமை பரப்பை தற்போதைய 23% இலிருந்து 33% ஆக உயர்த்துவது இலக்கு."
  },
  {
    id: 20,
    category: "Schemes",
    q: "How to apply for the EV subsidy scheme?",
    q_ta: "EV மானிய திட்டத்திற்கு எவ்வாறு விண்ணப்பிப்பது?",
    a: "The EV subsidy scheme for auto drivers provides ₹1.5 lakh subsidy plus 0% interest loan. Apply at the Regional Transport Office (RTO) with your auto permit, Aadhaar, bank passbook, and a quotation from a TNSTC-empanelled EV dealer. Processing time is 30 days.",
    a_ta: "ஆட்டோ ஓட்டுநர்களுக்கான EV மானிய திட்டம் ₹1.5 லட்சம் மானியம் மற்றும் 0% வட்டி கடன் வழங்குகிறது. உங்கள் ஆட்டோ அனுமதி, ஆதார், வங்கி பாஸ்புக் மற்றும் TNSTC பட்டியலிடப்பட்ட EV விற்பனையாளரிடமிருந்து மேற்கோள் மூலம் பிராந்திய போக்குவரத்து அலுவலகத்தில் விண்ணப்பிக்கவும்."
  },
  {
    id: 21,
    category: "Schemes",
    q: "What is the free electricity scheme for farmers?",
    q_ta: "விவசாயிகளுக்கான இலவச மின்சார திட்டம் என்ன?",
    a: "Tamil Nadu provides free electricity up to 200 units per month for agricultural pump sets used for irrigation. Farmers must register their pump with TANGEDCO. The scheme applies to pump sets up to 10 HP. Meters are now mandatory to track usage.",
    a_ta: "தமிழ்நாடு நீர்ப்பாசனத்திற்கு பயன்படுத்தப்படும் விவசாய பம்ப் செட்டுகளுக்கு மாதம் 200 யூனிட் வரை இலவச மின்சாரம் வழங்குகிறது. விவசாயிகள் TANGEDCO உடன் தங்கள் பம்பை பதிவு செய்ய வேண்டும். திட்டம் 10 HP வரை பம்ப் செட்டுகளுக்கு பொருந்தும்."
  },
  {
    id: 22,
    category: "Services",
    q: "How to get a student bus pass?",
    q_ta: "மாணவர் பேருந்து பாஸ் எவ்வாறு பெறுவது?",
    a: "For a student bus pass: 1) Get a bonafide certificate from your school/college 2) Visit the nearest TNSTC depot or MTC bus terminus 3) Submit: bonafide certificate, Aadhaar, passport photo, fee (if applicable). Bus passes are valid for the academic year and give discounted/free travel.",
    a_ta: "மாணவர் பேருந்து பாஸுக்கு: 1) உங்கள் பள்ளி/கல்லூரியிலிருந்து பிணைஞர் சான்றிதழ் பெறவும் 2) அருகிலுள்ள TNSTC டிப்போ அல்லது MTC பேருந்து நிலையத்திற்கு செல்லவும் 3) பிணைஞர் சான்றிதழ், ஆதார், பாஸ்போர்ட் புகைப்படம், கட்டணம் (பொருந்தினால்) சமர்ப்பிக்கவும்."
  },
  {
    id: 23,
    category: "Services",
    q: "What documents are needed for Aadhaar enrollment?",
    q_ta: "ஆதார் பதிவுக்கு என்ன ஆவணங்கள் தேவை?",
    a: "For Aadhaar enrollment, you need: 1 proof of Identity (Passport/PAN/Voter ID/Driving License) AND 1 proof of Address (Bank passbook/Utility bill/Ration card/Passport). For children under 5, only a birth certificate and parent's Aadhaar are required.",
    a_ta: "ஆதார் பதிவுக்கு தேவையானவை: 1 அடையாள சான்று (பாஸ்போர்ட்/PAN/வாக்காளர் அடையாள அட்டை/ஓட்டுநர் உரிமம்) மற்றும் 1 முகவரி சான்று (வங்கி பாஸ்புக்/பயன்பாட்டு கட்டண ரசீது/இராசன் அட்டை/பாஸ்போர்ட்). 5 வயதிற்கு உட்பட்ட குழந்தைகளுக்கு பிறப்பு சான்றிதழ் மற்றும் பெற்றோரின் ஆதார் மட்டும் தேவை."
  },
  {
    id: 24,
    category: "Education",
    q: "How to enroll children in government schools?",
    q_ta: "அரசு பள்ளியில் குழந்தைகளை எவ்வாறு சேர்ப்பது?",
    a: "Government school enrollment is open from April to June. Visit the nearest government school with: child's birth certificate, parents' Aadhaar, immunisation record, residence proof. Under RTE Act, 25% seats in private schools are reserved for economically weaker sections — apply online at tnschools.gov.in.",
    a_ta: "அரசு பள்ளி சேர்க்கை ஏப்ரல் முதல் ஜூன் வரை திறந்திருக்கும். அருகிலுள்ள அரசு பள்ளிக்கு குழந்தையின் பிறப்பு சான்றிதழ், பெற்றோரின் ஆதார், தடுப்பூசி பதிவு, வசிப்பிட சான்று கொண்டு செல்லவும். RTE சட்டத்தின் கீழ் தனியார் பள்ளிகளில் 25% இடங்கள் பொருளாதாரத்தில் பலவீனமான பிரிவினருக்கு ஒதுக்கப்பட்டுள்ளன."
  },
  {
    id: 25,
    category: "Schemes",
    q: "What is the Universal Basic Income (UBI) pilot?",
    q_ta: "அனைவருக்கும் அடிப்படை வருமான (UBI) முன்னோட்டம் என்ன?",
    a: "The UBI Pilot is a 2-year experiment in 5 districts (Ariyalur, Nagapattinam, Ramanathapuram, Krishnagiri, Theni) providing ₹2,000 per month unconditionally to all BPL adults. The goal is to study impact on consumption, health, and employment before a possible state-wide rollout.",
    a_ta: "UBI முன்னோட்டம் 5 மாவட்டங்களில் (அரியலூர், நாகப்பட்டினம், இராமநாதபுரம், கிருஷ்ணகிரி, தேனி) 2 ஆண்டு சோதனை ஆகும். BPL வயது வந்தோர் அனைவருக்கும் நிபந்தனையின்றி மாதம் ₹2,000 வழங்கப்படும். சாத்தியமான மாநில அளவிலான திட்டத்திற்கு முன்பு நுகர்வு, சுகாதாரம் மற்றும் வேலைவாய்ப்பில் தாக்கத்தை ஆய்வு செய்வது இலக்கு."
  }
];

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  qaId?: number;
}

interface ChatBotProps {
  lang: string;
}

function findAnswer(input: string, lang: string): QA | null {
  const lower = input.toLowerCase().trim();
  if (!lower) return null;
  let best: QA | null = null;
  let bestScore = 0;
  for (const qa of QA_LIST) {
    const question = (lang === "ta" ? qa.q_ta : qa.q).toLowerCase();
    const words = lower.split(/\s+/);
    let score = 0;
    for (const w of words) {
      if (w.length > 2 && (question.includes(w) || qa.a.toLowerCase().includes(w))) score++;
    }
    if (score > bestScore) { bestScore = score; best = qa; }
  }
  return bestScore > 0 ? best : null;
}

export default function ChatBot({ lang }: ChatBotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: lang === "ta"
        ? "வணக்கம்! நான் மக்கள் மன்றம் உதவியாளர். கீழே உள்ள கேள்விகளை கிளிக் செய்யுங்கள் அல்லது நீங்கள் விரும்பியதை தட்டச்சு செய்யுங்கள்."
        : "Hello! I'm the People's Hall assistant. Click any question below or type your own query."
    }
  ]);
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState<number[]>([]);
  const [msgId, setMsgId] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const categories = ["all", ...Array.from(new Set(QA_LIST.map(q => q.category)))];

  const handleQA = (qa: QA) => {
    const userMsg: Message = { id: msgId, role: "user", text: lang === "ta" ? qa.q_ta : qa.q };
    const botMsg: Message = { id: msgId + 1, role: "bot", text: lang === "ta" ? qa.a_ta : qa.a, qaId: qa.id };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setAnswered(prev => prev.includes(qa.id) ? prev : [...prev, qa.id]);
    setMsgId(prev => prev + 2);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");
    const userMsg: Message = { id: msgId, role: "user", text: userText };
    const found = findAnswer(userText, lang);
    const botMsg: Message = {
      id: msgId + 1,
      role: "bot",
      text: found
        ? (lang === "ta" ? found.a_ta : found.a)
        : (lang === "ta"
          ? "மன்னிக்கவும், அந்த கேள்விக்கு எனக்கு பதில் தெரியவில்லை. கீழே உள்ள கேள்விகளில் ஒன்றை முயற்சிக்கவும்."
          : "Sorry, I couldn't find an answer to that. Please try one of the questions below.")
    };
    if (found) setAnswered(prev => prev.includes(found.id) ? prev : [...prev, found.id]);
    setMessages(prev => [...prev, userMsg, botMsg]);
    setMsgId(prev => prev + 2);
  };

  const reset = () => {
    setMessages([{
      id: 0, role: "bot",
      text: lang === "ta"
        ? "வணக்கம்! நான் மக்கள் மன்றம் உதவியாளர். கீழே உள்ள கேள்விகளை கிளிக் செய்யுங்கள் அல்லது நீங்கள் விரும்பியதை தட்டச்சு செய்யுங்கள்."
        : "Hello! I'm the People's Hall assistant. Click any question below or type your own query."
    }]);
    setAnswered([]);
    setMsgId(1);
  };

  const filteredQA = activeCategory === "all" ? QA_LIST : QA_LIST.filter(q => q.category === activeCategory);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105"
        style={{ background: open ? "#1A1A1A" : "#C8102E", color: "#F4C430" }}
        title={lang === "ta" ? "மக்கள் மன்றம் உதவியாளர்" : "People's Hall Assistant"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "560px", border: "2px solid #C8102E", background: "hsl(var(--card))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ background: "#C8102E" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(244,196,48,0.25)" }}>
              <Bot size={16} style={{ color: "#F4C430" }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">{lang === "ta" ? "மக்கள் மன்றம் உதவியாளர்" : "People's Hall Assistant"}</div>
              <div className="text-xs text-white/60">{lang === "ta" ? "25 கேள்விகள் · தமிழ் / English" : "25 Questions · Tamil / English"}</div>
            </div>
            <button onClick={reset} title="Reset" className="p-1 rounded hover:bg-white/10">
              <RotateCcw size={14} className="text-white/70" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] text-xs px-3 py-2 rounded-2xl leading-relaxed"
                  style={m.role === "user"
                    ? { background: "#C8102E", color: "#fff", borderBottomRightRadius: "4px" }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--foreground))", borderBottomLeftRadius: "4px" }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Category filter */}
          <div className="shrink-0 px-3 pt-2 border-t border-border">
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="shrink-0 text-xs px-2 py-1 rounded-full font-medium transition-colors"
                  style={activeCategory === cat
                    ? { background: "#C8102E", color: "#fff" }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
                  }
                >
                  {cat === "all" ? (lang === "ta" ? "அனைத்தும்" : "All") : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Question chips — ALWAYS visible */}
          <div className="shrink-0 px-3 py-2 border-t border-border">
            <div className="text-xs text-muted-foreground mb-1.5 font-medium">{lang === "ta" ? "கேள்விகள்:" : "Questions:"}</div>
            <div className="flex flex-col gap-1 max-h-[120px] overflow-y-auto">
              {filteredQA.map(qa => (
                <button
                  key={qa.id}
                  onClick={() => handleQA(qa)}
                  className="text-left text-xs px-3 py-1.5 rounded-lg transition-colors w-full"
                  style={answered.includes(qa.id)
                    ? { background: "rgba(244,196,48,0.15)", color: "#C9A000", border: "1px solid rgba(244,196,48,0.4)" }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }
                  }
                  onMouseEnter={e => { if (!answered.includes(qa.id)) (e.currentTarget as HTMLElement).style.background = "rgba(200,16,46,0.08)"; }}
                  onMouseLeave={e => { if (!answered.includes(qa.id)) (e.currentTarget as HTMLElement).style.background = "hsl(var(--muted))"; }}
                >
                  {answered.includes(qa.id) ? "✓ " : ""}{lang === "ta" ? qa.q_ta : qa.q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="shrink-0 flex items-center gap-2 px-3 pb-3 pt-2 border-t border-border">
            <input
              className="flex-1 text-xs border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:border-[#C8102E]"
              placeholder={lang === "ta" ? "கேள்வி தட்டச்சு செய்யவும்..." : "Type your question..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "#C8102E", color: "#fff" }}
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
