import { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { t } from "@/data/locales";
import { thoguthiData } from "@/data/thoguthiData";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/CustomSelect";
import { User, Phone, ArrowRight, Languages, Sun, Moon } from "lucide-react";
import tvkImage from "@/Images/TVK.jpeg";

export default function Login() {
  const { lang, setUser, setLang } = useApp();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [district, setDistrict] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDark, setIsDark] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!mobile.trim() || !/^\d{10}$/.test(mobile))
      errs.mobile = "Valid 10-digit mobile number required";
    if (!district) errs.district = "Please select your district";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setUser({ name, mobile, district });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, #F4C43018 40%, hsl(var(--primary) / 0.06) 70%, #F4C43010 100%)",
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.3), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F4C430 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)",
        }}
      />

      {/* Main Card: max-w-5xl, ~80vh */}
      <div
        className="relative z-10 w-full max-w-5xl mx-4 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          minHeight: "min(80vh, 620px)",
          maxHeight: "88vh",
          background: "white",
        }}
      >
        {/* Top-right controls (Lang + Theme) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ta" : "en")}
            data-testid="lang-toggle-login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide border transition-all hover:scale-105 active:scale-95"
            style={{
              borderColor: "hsl(var(--primary) / 0.3)",
              color: "hsl(var(--primary))",
              background: "hsl(var(--primary) / 0.06)",
            }}
          >
            <Languages size={13} strokeWidth={2.5} />
            {lang === "en" ? "தமிழ்" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-105 active:scale-95"
            style={{
              borderColor: "hsl(var(--primary) / 0.3)",
              color: "hsl(var(--primary))",
              background: "hsl(var(--primary) / 0.06)",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} strokeWidth={2.5} /> : <Moon size={14} strokeWidth={2.5} />}
          </button>
        </div>

        <div className="flex h-full" style={{ minHeight: "min(80vh, 620px)" }}>
          {/* Left Side: Brand Image */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <Image
              src={tvkImage}
              alt="TVK Brand"
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, hsl(var(--primary) / 0.15) 0%, transparent 50%, #F4C43022 100%)",
              }}
            />
            {/* Brand overlay text */}
            <div className="absolute bottom-8 left-6 right-6">
              <div
                className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2"
                style={{ background: "#F4C430", color: "#1a1a1a" }}
              >
                {lang === "ta" ? "தமிழக வேந்தர்கள்" : "TVK"}
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-7 py-8 md:px-10 overflow-y-auto dark:bg-zinc-950">
            <div className="w-full max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

              {/* Form header */}
              {/* <div className="mb-5">
                <h2 className="text-[15px] font-extrabold text-foreground">
                  {lang === "ta" ? "உங்கள் சுயவிவரத்தை அமைக்கவும்" : "Set Up Your Profile"}
                </h2>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {lang === "ta" ? "தொடர உங்கள் விவரங்களை உள்ளிடவும்" : "Enter your details to continue"}
                </p>
              </div> */}

              <div className="mb-5 space-y-1">
                <h1
                  className="text-xl md:text-2xl font-extrabold tracking-tight leading-snug"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {t("appName", lang)}
                </h1>

                <div className="flex items-center gap-1.5">
                  {/* <div
                    className="h-[2px] w-8 rounded-full"
                    style={{ background: "#F4C430" }}
                  /> */}
                  <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                    {t("appSubtitle", lang)}
                  </p>
                </div>

                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  {t("tvkSlogan", lang)}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
                {/* Name */}
                <div className="space-y-1">
                  <label className="font-base-bold text-text-100 px-0.5 block mb-2">
                    {lang === "ta" ? "முழு பெயர்" : "Full Name"}
                  </label>
                  <div className="relative group">
                    <User
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors"
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === "ta" ? "உங்கள் பெயர் உள்ளிடவும்" : "Enter your full name"}
                      className="w-full pl-10 pr-3.5 py-3 rounded border border-border/50 bg-muted/20 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      data-testid="input-name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[10px] font-medium text-destructive px-0.5">{errors.name}</p>
                  )}
                </div>

                {/* Mobile */}
                <div className="space-y-1">
                  <label className="font-base-bold text-text-100 px-0.5 block mb-2">
                    {lang === "ta" ? "கைபேசி எண்" : "Mobile Number"}
                  </label>
                  <div className="relative group">
                    <Phone
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors"
                    />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder={lang === "ta" ? "போனை உள்ளிடவும்" : "Enter 10-digit mobile number"}
                      className="w-full pl-10 pr-3.5 py-3 rounded border border-border/50 bg-muted/20 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      data-testid="input-mobile"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-[10px] font-medium text-destructive px-0.5">{errors.mobile}</p>
                  )}
                </div>

                {/* District */}
                <div className="space-y-1">
                  <label className="font-base-bold text-text-100 px-0.5 block mb-2">
                    {lang === "ta" ? "மாவட்டம்" : "District"}
                  </label>
                  <CustomSelect
                    value={district}
                    onChange={setDistrict}
                    options={[
                      {
                        value: "",
                        label: lang === "ta" ? "மாவட்டம் தேர்வு செய்யவும்" : "Select your district",
                      },
                      ...thoguthiData.map((d) => ({ value: d.district, label: d.district })),
                    ]}
                    placeholder={lang === "ta" ? "மாவட்டம் தேர்வு செய்யவும்" : "Select your district"}
                    data-testid="select-district-login"
                  />
                  {errors.district && (
                    <p className="text-[10px] font-medium text-destructive px-0.5">{errors.district}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 rounded flex items-center justify-center gap-2 text-[13px] font-black shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-[0.98] mt-2"
                  data-testid="btn-submit-profile"
                >
                  {lang === "ta" ? "தொடரவும்" : "Continue"}
                  <ArrowRight size={16} strokeWidth={3} />
                </Button>

                <p className="text-[10px] leading-relaxed text-center text-muted-foreground flex items-center justify-center gap-1.5 opacity-60 pt-1">
                  <span className="w-1 h-1 rounded-full bg-primary/40" />
                  {lang === "ta"
                    ? "நாங்கள் ஆதார் எண், OTP அல்லது வங்கி விவரங்களை சேகரிப்பதில்லை."
                    : "No Aadhaar, OTPs, or bank details collected."}
                  <span className="w-1 h-1 rounded-full bg-primary/40" />
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}