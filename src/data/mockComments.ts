export interface Comment {
  id: string;
  author: string;
  district: string;
  text: string;
  text_ta: string;
  date: string;
  likes: number;
}

const d = (s: string) => s;

export const mockComments: Record<string, Comment[]> = {
  "idea-01": [
    { id: "c1", author: "Ramesh K.", district: "Coimbatore", text: "Excellent idea! Schools in our area already have space on rooftops. The government should prioritise this.", text_ta: "சிறந்த யோசனை! எங்கள் பகுதியில் உள்ள பள்ளிகளுக்கு கூரையில் இடம் இருக்கிறது. அரசு இதை முன்னுரிமையாக கவனிக்க வேண்டும்.", date: "2026-03-14", likes: 47 },
    { id: "c2", author: "Meena S.", district: "Tiruppur", text: "We should also consider windmills in coastal districts like Thoothukudi where solar alone may not be enough.", text_ta: "தூத்துக்குடி போன்ற கடலோர மாவட்டங்களில் காற்றாலை ஆலைகளையும் கருத்தில் கொள்ள வேண்டும்.", date: "2026-03-16", likes: 23 },
    { id: "c3", author: "Arun P.", district: "Salem", text: "This will also reduce the school's electricity bill and the savings can be used for student welfare activities.", text_ta: "இது பள்ளியின் மின்சார கட்டணத்தையும் குறைக்கும் மற்றும் சேமிப்புகளை மாணவர் நலன் செயல்பாடுகளுக்கு பயன்படுத்தலாம்.", date: "2026-03-18", likes: 31 },
  ],
  "idea-02": [
    { id: "c4", author: "Preethi R.", district: "Chennai", text: "Waiting in hospitals for hours with no connectivity is very stressful. This idea is long overdue.", text_ta: "தொடர்பு இல்லாமல் மருத்துவமனையில் மணிக்கணக்கில் காத்திருப்பது மிகவும் அழுத்தமாக இருக்கும். இந்த யோசனை தாமதமாகிவிட்டது.", date: "2026-03-20", likes: 88 },
    { id: "c5", author: "Dr. Kannan", district: "Vellore", text: "WiFi will also help doctors access patient history remotely and telemedicine will become more efficient.", text_ta: "WiFi மருத்துவர்களுக்கும் தொலைவிலிருந்து நோயாளி வரலாறை அணுக உதவும் மற்றும் தொலைமருத்துவம் மிகவும் திறமையாக இருக்கும்.", date: "2026-03-22", likes: 55 },
  ],
  "idea-03": [
    { id: "c6", author: "Murugan P.", district: "Tirunelveli", text: "We travel 15 km to reach the bus stand. A mini-bus service would save so much time and money.", text_ta: "பேருந்து நிலையத்திற்கு 15 கி.மீ பயணிக்கிறோம். மினி பேருந்து சேவை நிறைய நேரம் மற்றும் பணம் மிச்சப்படுத்தும்.", date: "2026-03-02", likes: 102 },
    { id: "c7", author: "Selvi A.", district: "Virudhunagar", text: "Electric buses will reduce pollution significantly in rural areas which already suffer from pesticide-related air quality issues.", text_ta: "மின்சார பேருந்துகள் கிராமப்புற பகுதிகளில் மாசை கணிசமாக குறைக்கும்.", date: "2026-03-05", likes: 67 },
  ],
  "idea-04": [
    { id: "c8", author: "Lakshmi T.", district: "Salem", text: "Already implemented in some panchayats near Salem. The impact on children's education has been amazing!", text_ta: "சேலம் அருகில் சில பஞ்சாயத்துகளில் ஏற்கனவே செயல்படுத்தப்பட்டுள்ளது. குழந்தைகளின் கல்வியில் தாக்கம் அற்புதமாக உள்ளது!", date: "2026-01-18", likes: 44 },
    { id: "c9", author: "Venkat S.", district: "Dharmapuri", text: "Rural children deserve equal access to digital resources. This is a great step towards bridging the digital divide.", text_ta: "கிராமக் குழந்தைகள் டிஜிட்டல் வளங்களுக்கு சம அணுகல் பெறுவதற்கு தகுதியானவர்கள்.", date: "2026-01-22", likes: 38 },
  ],
  "idea-05": [
    { id: "c10", author: "Anand R.", district: "Trichy", text: "Chennai already has this but enforcement is weak. Strict penalties with doorstep inspections are needed.", text_ta: "சென்னையில் இது ஏற்கனவே உள்ளது ஆனால் அமலாக்கம் பலவீனமாக உள்ளது. கடுமையான அபராதங்களுடன் வீட்டு பரிசோதனை தேவை.", date: "2026-02-12", likes: 156 },
    { id: "c11", author: "Kavitha N.", district: "Vellore", text: "Our apartment has been collecting rainwater for 3 years. Our water bill reduced by 40%. Works brilliantly!", text_ta: "எங்கள் அபார்ட்மெண்ட் 3 ஆண்டுகளாக மழை நீர் சேகரிக்கிறது. நீர் கட்டணம் 40% குறைந்தது. மிகவும் நன்றாக வேலை செய்கிறது!", date: "2026-02-15", likes: 93 },
    { id: "c12", author: "Ragu M.", district: "Madurai", text: "Groundwater levels are critically low. This is urgent and should be implemented state-wide immediately.", text_ta: "நிலத்தடி நீர் மட்டம் மிகவும் குறைவாக உள்ளது. இது அவசரமானது மற்றும் உடனடியாக மாநில அளவில் செயல்படுத்தப்பட வேண்டும்.", date: "2026-02-18", likes: 211 },
  ],
  "idea-07": [
    { id: "c13", author: "Deepa S.", district: "Vellore", text: "This app is absolutely essential. Women's safety has been a major concern. Government must act fast.", text_ta: "இந்த செயலி முற்றிலும் அவசியம். மகளிர் பாதுகாப்பு ஒரு பெரிய கவலையாக உள்ளது. அரசு விரைவாக செயல்பட வேண்டும்.", date: "2026-03-22", likes: 287 },
    { id: "c14", author: "Inspector Priya", district: "Chennai", text: "From a law enforcement perspective, real-time location sharing would significantly improve our response time.", text_ta: "சட்ட அமலாக்க கண்ணோட்டத்தில், நிகழ்நேர இருப்பிட பகிர்வு எங்கள் மறுமொழி நேரத்தை கணிசமாக மேம்படுத்தும்.", date: "2026-03-24", likes: 134 },
  ],
  "idea-08": [
    { id: "c15", author: "Rajan K.", district: "Chennai", text: "Migrant workers live in terrible conditions. This is a basic human rights issue that needs immediate action.", text_ta: "புலம்பெயர் தொழிலாளர்கள் மோசமான நிலைமைகளில் வாழ்கின்றனர். இது உடனடி நடவடிக்கை தேவைப்படும் அடிப்படை மனித உரிமை பிரச்சினை.", date: "2026-02-01", likes: 178 },
    { id: "c16", author: "Muthu A.", district: "Kancheepuram", text: "Already some NGOs run such shelters but they are underfunded. Government backing will make this scalable.", text_ta: "சில NGOக்கள் ஏற்கனவே இப்படிப்பட்ட தங்குமிடங்களை நடத்துகின்றன ஆனால் நிதி பற்றாக்குறையால் அவை கஷ்டப்படுகின்றன.", date: "2026-02-04", likes: 92 },
  ],
  "idea-09": [
    { id: "c17", author: "Vijay C.", district: "Coimbatore", text: "Smart meters are used in Bangalore and Delhi successfully. Tamil Nadu should follow immediately.", text_ta: "ஸ்மார்ட் மீட்டர்கள் பெங்களூரு மற்றும் டெல்லியில் வெற்றிகரமாக பயன்படுத்தப்படுகின்றன. தமிழ்நாடு உடனடியாக பின்பற்ற வேண்டும்.", date: "2026-02-16", likes: 62 },
  ],
  "idea-10": [
    { id: "c18", author: "Natarajan V.", district: "Madurai", text: "The highway from Madurai to Trichy used to have beautiful tree canopies. They were all cut. Please restore!", text_ta: "மதுரையிலிருந்து திருச்சி வரையிலான நெடுஞ்சாலையில் அழகான மரங்கள் இருந்தன. அவை அனைத்தும் வெட்டப்பட்டன. திரும்ப நட்டு வளர்க்க வேண்டும்!", date: "2026-03-03", likes: 143 },
  ],
  "pol-01": [
    { id: "c20", author: "Suresh I.", district: "Chennai", text: "The EV and semiconductor focus is the right strategy. Tamil Nadu has the talent pool to support this.", text_ta: "EV மற்றும் செமிகண்டக்டர் கவனம் சரியான மூலோபாயம். தமிழ்நாட்டில் இதற்கு தேவையான திறமையான மனிதவளம் உள்ளது.", date: "2026-03-05", likes: 203 },
    { id: "c21", author: "Priya R.", district: "Coimbatore", text: "We need strong environmental safeguards in this policy. Industrial growth should not come at the cost of ecology.", text_ta: "இந்த கொள்கையில் வலுவான சுற்றுச்சூழல் பாதுகாப்புகள் தேவை. தொழில்துறை வளர்ச்சி சூழலியலை பலியிட்டு வரக்கூடாது.", date: "2026-03-08", likes: 89 },
    { id: "c22", author: "Karthik M.", district: "Trichy", text: "What about MSMEs? The policy should equally support small and medium enterprises, not just large investors.", text_ta: "MSME பற்றி என்ன? கொள்கை பெரும் முதலீட்டாளர்கள் மட்டுமல்ல சிறு மற்றும் நடுத்தர நிறுவனங்களையும் சமமாக ஆதரிக்க வேண்டும்.", date: "2026-03-10", likes: 127 },
  ],
  "pol-02": [
    { id: "c23", author: "Kavitha A.", district: "Chennai", text: "My daughter is in college and struggles with food expenses. This will be a huge relief for many families.", text_ta: "என் மகள் கல்லூரியில் படிக்கிறாள் மற்றும் உணவு செலவுகளில் சிரமப்படுகிறாள். இது பல குடும்பங்களுக்கு பெரும் நிவாரணமாக இருக்கும்.", date: "2026-02-18", likes: 412 },
    { id: "c24", author: "Prof. Anand", district: "Madurai", text: "Studies show students perform better when properly nourished. This is an investment in human capital.", text_ta: "ஆய்வுகள் சரியாக ஊட்டமளிக்கப்பட்ட மாணவர்கள் சிறப்பாக செயல்படுகிறார்கள் என்று காட்டுகின்றன. இது மனித மூலதனில் ஒரு முதலீடு.", date: "2026-02-20", likes: 198 },
  ],
  "pol-03": [
    { id: "c25", author: "Eco Warrior T.", district: "Nilgiris", text: "The Nilgiris biosphere needs more protection. Planting native species is key — no eucalyptus or invasive species!", text_ta: "நீலகிரி உயிர்க்கோளம் அதிக பாதுகாப்பு தேவைப்படுகிறது. நாட்டு மரங்கள் நடுவது முக்கியம் — யூகலிப்டஸ் அல்லது படையெடுப்பு இனங்கள் வேண்டாம்!", date: "2026-01-28", likes: 256 },
    { id: "c26", author: "Mani R.", district: "Salem", text: "100 crore trees is ambitious but possible. Citizen volunteers should be included in the planting drives.", text_ta: "100 கோடி மரங்கள் லட்சியமிக்கது ஆனால் சாத்தியமானது. குடிமக்கள் தன்னார்வலர்களை நடும் திட்டங்களில் சேர்க்க வேண்டும்.", date: "2026-01-30", likes: 187 },
  ],
  "pol-04": [
    { id: "c27", author: "Ravi Auto", district: "Chennai", text: "I drive an auto for 15 years. Converting to electric will save me ₹4,000/month in fuel costs. Please implement this!", text_ta: "நான் 15 ஆண்டுகளாக ஆட்டோ ஓட்டுகிறேன். மின்சாரத்திற்கு மாறினால் மாதம் ₹4,000 எரிபொருள் செலவு மிச்சப்படும். தயவுசெய்து செயல்படுத்துங்கள்!", date: "2026-02-05", likes: 634 },
    { id: "c28", author: "Sundar M.", district: "Coimbatore", text: "The 0% interest loan is the key enabler. Most auto drivers cannot afford the upfront cost of an EV.", text_ta: "0% வட்டி கடன் முக்கிய இயக்கி. பெரும்பாலான ஆட்டோ ஓட்டுநர்களுக்கு EV இன் முன்கூட்டிய செலவு감당ிக்க முடியாது.", date: "2026-02-08", likes: 421 },
  ],
  "pol-06": [
    { id: "c29", author: "Dr. Suba R.", district: "Ariyalur", text: "UBI has shown success in pilot programs globally. This is a bold step and Tamil Nadu should be proud.", text_ta: "UBI உலகளவில் முன்னோட்ட திட்டங்களில் வெற்றி காட்டியுள்ளது. இது ஒரு தைரியமான படியாகும் மற்றும் தமிழ்நாடு பெருமைப்படவேண்டும்.", date: "2026-03-12", likes: 303 },
    { id: "c30", author: "Kumar T.", district: "Nagapattinam", text: "The poverty line cutoff must be regularly revised. Many families above official poverty line still struggle.", text_ta: "வறுமை கோட்டு வரையறை தொடர்ந்து திருத்தப்பட வேண்டும். அதிகாரப்பூர்வ வறுமை கோட்டிற்கு மேலே உள்ள பல குடும்பங்களும் கஷ்டப்படுகின்றன.", date: "2026-03-14", likes: 145 },
  ],
  "sr-01": [
    { id: "c31", author: "Geetha R.", district: "Tirunelveli", text: "The monthly ration is usually available on time but the quality of rice could be better in our shop.", text_ta: "மாத இராசன் பொதுவாக சரியான நேரத்தில் கிடைக்கும் ஆனால் எங்கள் கடையில் அரிசியின் தரம் சிறப்பாக இருக்கலாம்.", date: "2026-03-10", likes: 12 },
    { id: "c32", author: "Selvam K.", district: "Trichy", text: "The digital ration card system is a big improvement. No more long queues for the card itself.", text_ta: "டிஜிட்டல் இராசன் அட்டை முறை ஒரு பெரிய முன்னேற்றம். அட்டைக்காக நீண்ட வரிசை இனி இல்லை.", date: "2026-03-12", likes: 28 },
  ],
  "sr-02": [
    { id: "c33", author: "Kannan S.", district: "Chennai", text: "₹5 idli is a lifesaver for daily wage workers like me. The quality is consistently good.", text_ta: "₹5 இட்லி என்னைப்போன்ற தினக்கூலி தொழிலாளர்களுக்கு உதவியாக இருக்கிறது. தரம் தொடர்ந்து நல்லதாக இருக்கிறது.", date: "2026-02-28", likes: 95 },
  ],
  "sr-08": [
    { id: "c34", author: "Priya V.", district: "Vellore", text: "Waited 4 hours at the Aadhaar centre. The process must be streamlined. Online appointment booking would help.", text_ta: "ஆதார் மையத்தில் 4 மணி நேரம் காத்திருந்தேன். இந்த செயல்முறை மேம்படுத்தப்பட வேண்டும். ஆன்லைன் நியமன பதிவு உதவும்.", date: "2026-03-05", likes: 178 },
    { id: "c35", author: "Arjun M.", district: "Salem", text: "The biometric device at our centre is often broken. We get sent home and asked to come back next week!", text_ta: "எங்கள் மையத்தில் உள்ள பயோமெட்ரிக் சாதனம் அடிக்கடி கோளாறாகிறது. எங்களை திரும்ப அனுப்பி அடுத்த வாரம் வரச் சொல்கிறார்கள்!", date: "2026-03-08", likes: 234 },
  ],
  "txn-001": [
    { id: "c36", author: "Senthil K.", district: "Salem", text: "The highway expansion is very much needed. The current road condition is terrible and accidents are frequent.", text_ta: "நெடுஞ்சாலை விரிவாக்கம் மிகவும் தேவையானது. தற்போதைய சாலை நிலைமை மோசமாக உள்ளது மற்றும் விபத்துகள் அடிக்கடி நடக்கின்றன.", date: "2026-03-16", likes: 87 },
  ],
  "txn-005": [
    { id: "c37", author: "Farmer Raj", district: "Thanjavur", text: "The Cauvery delta depends entirely on this modernisation project. Please ensure quality construction.", text_ta: "காவிரி டெல்டா முற்றிலும் இந்த நவீனமயமாக்கல் திட்டத்தை சார்ந்துள்ளது. தரமான கட்டுமானத்தை உறுதிப்படுத்துங்கள்.", date: "2026-03-01", likes: 203 },
    { id: "c38", author: "Agri Expert N.", district: "Nagapattinam", text: "Modern irrigation channels will reduce water wastage by 40%. This is a game-changer for Tamil Nadu agriculture.", text_ta: "நவீன நீர்ப்பாசன கால்வாய்கள் நீர் விரயத்தை 40% குறைக்கும். இது தமிழ்நாடு விவசாயத்திற்கு ஒரு திருப்புமுனை.", date: "2026-03-03", likes: 156 },
  ],
  "camp-01": [
    { id: "c39", author: "Mason Raja", district: "Chennai", text: "I build houses for others but cannot afford rent for my own family. ₹1,000/day is the bare minimum.", text_ta: "நான் பிறருக்காக வீடு கட்டுகிறேன் ஆனால் என் சொந்த குடும்பத்திற்கு வாடகை கட்ட முடியவில்லை. ₹1,000 ஒரு நாள் குறைந்தபட்சம்.", date: "2026-04-01", likes: 392 },
    { id: "c40", author: "Labour Union TN", district: "Coimbatore", text: "Our union has been demanding this for 3 years. The current ₹600 wage was set in 2019 and hasn't been revised.", text_ta: "எங்கள் சங்கம் 3 ஆண்டுகளாக இதை கோருகிறது. தற்போதைய ₹600 கூலி 2019 இல் நிர்ணயிக்கப்பட்டது மற்றும் திருத்தப்படவில்லை.", date: "2026-04-02", likes: 267 },
    { id: "c41", author: "Vasantha M.", district: "Madurai", text: "My husband is a construction worker. He earns ₹550-₹600 per day but rising costs make it impossible to manage.", text_ta: "என் கணவர் கட்டுமான தொழிலாளி. அவர் ஒரு நாளைக்கு ₹550-₹600 சம்பாதிக்கிறார் ஆனால் உயரும் செலவுகள் நிர்வகிக்க முடியாமல் செய்கின்றன.", date: "2026-04-03", likes: 445 },
  ],
  "camp-02": [
    { id: "c42", author: "Parent S.", district: "Chennai", text: "After the tragic school bus accident last year, this petition is absolutely critical. Safety cannot be compromised.", text_ta: "கடந்த ஆண்டு நடந்த பள்ளி பேருந்து விபத்திற்கு பிறகு, இந்த மனு முற்றிலும் முக்கியமானது. பாதுகாப்பில் சமரசம் செய்யக்கூடாது.", date: "2026-01-20", likes: 523 },
    { id: "c43", author: "Teacher K.", district: "Madurai", text: "GPS tracking should be mandatory. As a teacher, we also need to know if children reached school safely.", text_ta: "GPS கண்காணிப்பு கட்டாயமாக வேண்டும். ஒரு ஆசிரியராக, குழந்தைகள் பாதுகாப்பாக பள்ளி வந்தார்களா என்று நாங்களும் தெரிந்துகொள்ள வேண்டும்.", date: "2026-01-22", likes: 387 },
  ],
  "camp-03": [
    { id: "c44", author: "Environment A.", district: "Nilgiris", text: "The beaches are still littered with plastic despite the partial ban. A complete ban with strict enforcement is needed now.", text_ta: "பகுதி தடை இருந்தாலும் கடற்கரைகள் இன்னும் பிளாஸ்டிக்கால் நிரம்பி உள்ளன. கடுமையான அமலாக்கத்துடன் முழு தடை இப்போதே தேவை.", date: "2026-04-10", likes: 289 },
  ],
  "camp-04": [
    { id: "c45", author: "Farmer R.", district: "Trichy", text: "200 units is not enough for pump operation during summer. At least 300 units are needed for one pump running 8 hours.", text_ta: "கோடையில் பம்ப் இயக்கத்திற்கு 200 யூனிட் போதவில்லை. 8 மணி நேரம் ஒரு பம்ப் இயங்க குறைந்தது 300 யூனிட் தேவை.", date: "2026-03-15", likes: 678 },
    { id: "c46", author: "Agri Assoc.", district: "Thanjavur", text: "Delta farmers face double burden — irregular monsoon AND high electricity costs. Please support this campaign!", text_ta: "டெல்டா விவசாயிகள் இரட்டை சுமையை எதிர்கொள்கிறார்கள் — ஒழுங்கற்ற பருவமழை மற்றும் அதிக மின்சார செலவு. இந்த பிரச்சாரத்தை ஆதரியுங்கள்!", date: "2026-03-18", likes: 512 },
  ],
  "camp-05": [
    { id: "c47", author: "Tamil Scholar", district: "Chennai", text: "Tamil is our mother tongue and identity. Every child in this state deserves to learn it properly.", text_ta: "தமிழ் நமது தாய்மொழி மற்றும் அடையாளம். இந்த மாநிலில் உள்ள ஒவ்வொரு குழந்தைக்கும் அதை சரியாக கற்றுக்கொள்ள தகுதியுண்டு.", date: "2026-01-10", likes: 445 },
    { id: "c48", author: "CBSE Parent", district: "Coimbatore", text: "My children go to CBSE school but I want them to be fluent in Tamil. This policy is welcome!", text_ta: "என் குழந்தைகள் CBSE பள்ளியில் படிக்கிறார்கள் ஆனால் அவர்கள் தமிழில் சரளமாக பேசவேண்டும் என்று விரும்புகிறேன். இந்த கொள்கை வரவேற்கத்தக்கது!", date: "2026-01-12", likes: 312 },
  ],
};
