"use client";
import { useApp } from "@/context/AppContext";
import { Shield, Lock, Info, AlertTriangle } from "lucide-react";

export default function PrivacyPage() {
  const { lang } = useApp();

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-lg px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">
              {lang === "ta" ? "தனியுரிமை கொள்கை" : "Privacy Policy"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {lang === "ta" ? "கடைசியாக புதுப்பிக்கப்பட்டது: ஏப்ரல் 2025" : "Last updated: April 2025"}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {lang === "ta"
            ? "My Vetry Tamil Nadu உங்கள் தனியுரிமையை மதிக்கிறது. இந்த கொள்கை நாங்கள் எந்த தகவல்களை சேகரிக்கிறோம், எவ்வாறு பயன்படுத்துகிறோம் என்பதை விளக்குகிறது."
            : "My Vetry Tamil Nadu respects your privacy. This policy explains what information we collect, how we use it, and your rights."
          }
        </p>
      </div>

      {/* Data We Collect */}
      <div className="bg-card border border-border rounded-lg px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Lock size={16} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            {lang === "ta" ? "நாங்கள் சேகரிக்கும் தகவல்கள்" : "Information We Collect"}
          </h2>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✓</span>
            <div>
              <p className="font-medium text-foreground">
                {lang === "ta" ? "நாங்கள் சேகரிப்பது:" : "We collect:"}
              </p>
              <ul className="text-muted-foreground text-xs mt-1 space-y-1">
                <li>• {lang === "ta" ? "பெயர் (சுயவிவர அமைப்பிற்காக)" : "Name (for profile setup)"}</li>
                <li>• {lang === "ta" ? "மொபைல் எண் (அடையாளத்திற்காக)" : "Mobile number (for identification)"}</li>
                <li>• {lang === "ta" ? "மாவட்டம் (சேவைகளை தனிப்பயனாக்க)" : "District (to personalize services)"}</li>
                <li>• {lang === "ta" ? "மொழி மற்றும் தீம் விருப்பங்கள்" : "Language and theme preferences"}</li>
                <li>• {lang === "ta" ? "பிடித்தமான மற்றும் சமீபத்திய சேவைகள்" : "Favorite and recent services (locally)"}</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-500 mt-0.5">✗</span>
            <div>
              <p className="font-medium text-foreground">
                {lang === "ta" ? "நாங்கள் சேகரிப்பதில்லை:" : "We do NOT collect:"}
              </p>
              <ul className="text-muted-foreground text-xs mt-1 space-y-1">
                <li>• {lang === "ta" ? "ஆதார் எண்" : "Aadhaar number"}</li>
                <li>• {lang === "ta" ? "OTP அல்லது கடவுச்சொல்" : "OTPs or passwords"}</li>
                <li>• {lang === "ta" ? "வங்கி கணக்கு விவரங்கள்" : "Bank account details"}</li>
                <li>• {lang === "ta" ? "நிதி தகவல்கள்" : "Financial information"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Data Storage */}
      <div className="bg-card border border-border rounded-lg px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-blue-500" />
          <h2 className="text-sm font-semibold text-foreground">
            {lang === "ta" ? "தரவு சேமிப்பு" : "Data Storage"}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          {lang === "ta"
            ? "உங்கள் சுயவிவரம் மற்றும் விருப்பங்கள் உங்கள் சாதனத்தில் உள்ளூரில் மட்டுமே சேமிக்கப்படுகின்றன (localStorage). எந்த தரவும் வெளி சேவையகங்களுக்கு அனுப்பப்படுவதில்லை."
            : "Your profile and preferences are stored only locally on your device (localStorage). No data is transmitted to external servers."
          }
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-card border border-border rounded-lg px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} className="text-orange-500" />
          <h2 className="text-sm font-semibold text-foreground">
            {lang === "ta" ? "அறிவிப்பு" : "Disclaimer"}
          </h2>
        </div>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            {lang === "ta"
              ? "இந்த தளம் தமிழ்நாடு அரசு சேவைகளுக்கான வழிகாட்டியாக மட்டுமே செயல்படுகிறது. 'இப்போது விண்ணப்பிக்கவும்' அல்லது 'நிலையை கண்காணிக்கவும்' என்ற பொத்தான்களை கிளிக் செய்யும்போது, அதிகாரப்பூர்வ தமிழ்நாடு அரசு தளங்களுக்கு திருப்பி அனுப்பப்படுவீர்கள்."
              : "This platform acts as a directory/guide for Tamil Nadu Government services. When you click 'Apply Now' or 'Track Status', you are redirected to official Tamil Nadu Government portals."
            }
          </p>
          <p>
            {lang === "ta"
              ? "இந்த தளம் அரசு ஆவணங்களை நேரடியாக செயலாக்குவதில்லை. காட்டப்படும் அனைத்து சேவை விவரங்களும் குறிப்பு நோக்கத்திற்காக மட்டுமே."
              : "This platform does not process government documents directly. All service details shown are for reference purposes only."
            }
          </p>
          <p>
            {lang === "ta"
              ? "அரசு சேவைகளுக்கான அதிகாரப்பூர்வ தகவல்களுக்கு tn.gov.in ஐ பார்க்கவும்."
              : "For official information on government services, please visit tn.gov.in."
            }
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-card border border-border rounded-lg px-4 py-4">
        <h2 className="text-sm font-semibold text-foreground mb-2">
          {lang === "ta" ? "தொடர்பு" : "Contact"}
        </h2>
        <p className="text-xs text-muted-foreground">
          {lang === "ta"
            ? "தனியுரிமை கொள்கை குறித்த கேள்விகளுக்கு, CM Helpline: 1100 அல்லது அதிகாரப்பூர்வ தமிழ்நாடு அரசு போர்டல்கள் மூலம் தொடர்பு கொள்ளவும்."
            : "For questions about this privacy policy, contact through CM Helpline: 1100 or through official Tamil Nadu Government portals."
          }
        </p>
      </div>
    </div>
  );
}
