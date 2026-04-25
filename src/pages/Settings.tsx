import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { thoguthiData } from "@/data/thoguthiData";
import CustomSelect from "@/components/CustomSelect";
import {
  User, Phone, MapPin, Sun, Moon, Languages, Bell, BellOff,
  Shield, Info, Trash2, ChevronRight, Check, Bookmark, Clock,
  Palette, Globe
} from "lucide-react";

export default function Settings() {
  const { lang, setLang, darkMode, setDarkMode, user, setUser, favorites, recentServices } = useApp();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", mobile: user?.mobile || "", district: user?.district || "" });
  const [profileSaved, setProfileSaved] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);

  const saveProfile = () => {
    if (!profileForm.name.trim() || !profileForm.district) return;
    setUser({ ...user!, name: profileForm.name.trim(), mobile: profileForm.mobile, district: profileForm.district });
    setEditingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const isTa = lang === "ta";

  return (
    <div className="max-w-2xl space-y-6">

      {/* Profile Section */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between" style={{ background: "rgba(200,16,46,0.04)" }}>
          <div className="flex items-center gap-2">
            <User size={15} style={{ color: "#C8102E" }} />
            <span className="text-sm font-semibold text-foreground">{isTa ? "சுயவிவரம்" : "Profile"}</span>
          </div>
          {!editingProfile && (
            <button
              onClick={() => { setEditingProfile(true); setProfileForm({ name: user?.name || "", mobile: user?.mobile || "", district: user?.district || "" }); }}
              className="text-xs px-3 py-1 rounded-full font-medium transition-colors"
              style={{ background: "#F4C430", color: "#1A1A1A" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#FFD95A")}
              onMouseLeave={e => (e.currentTarget.style.background = "#F4C430")}
            >
              {isTa ? "திருத்து" : "Edit"}
            </button>
          )}
        </div>

        <div className="px-4 py-4 space-y-4">
          {profileSaved && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.2)" }}>
              <Check size={13} /> {isTa ? "சுயவிவரம் சேமிக்கப்பட்டது" : "Profile saved successfully"}
            </div>
          )}

          {!editingProfile ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ background: "#C8102E" }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.district} {isTa ? "மாவட்டம்" : "District"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-lg px-3 py-2.5 bg-muted/40">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Phone size={11} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{isTa ? "கைபேசி" : "Mobile"}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{user?.mobile || "—"}</p>
                </div>
                <div className="rounded-lg px-3 py-2.5 bg-muted/40">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <MapPin size={11} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{isTa ? "மாவட்டம்" : "District"}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{user?.district}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">{isTa ? "பெயர்" : "Full Name"}</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 transition-colors"
                  style={{ focusBorderColor: "#C8102E" } as any}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">{isTa ? "கைபேசி எண்" : "Mobile Number"}</label>
                <input
                  type="tel"
                  value={profileForm.mobile}
                  onChange={e => setProfileForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">{isTa ? "மாவட்டம்" : "District"}</label>
                <CustomSelect
                  value={profileForm.district}
                  onChange={val => setProfileForm(f => ({ ...f, district: val }))}
                  options={thoguthiData.map(d => ({ value: d.district, label: d.district }))}
                  placeholder={isTa ? "மாவட்டம் தேர்வு செய்யவும்" : "Select District"}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={saveProfile}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  style={{ background: "#F4C430", color: "#1A1A1A" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#FFD95A")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#F4C430")}
                >
                  {isTa ? "சேமி" : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditingProfile(false)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:bg-muted transition-colors"
                >
                  {isTa ? "ரத்துசெய்" : "Cancel"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2" style={{ background: "rgba(200,16,46,0.04)" }}>
          <Palette size={15} style={{ color: "#C8102E" }} />
          <span className="text-sm font-semibold text-foreground">{isTa ? "தோற்றம்" : "Appearance"}</span>
        </div>
        <div className="divide-y divide-border">
          {/* Dark Mode */}
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted">
                {darkMode ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className="text-indigo-400" />}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{isTa ? "இருட்டு பயன்முறை" : "Dark Mode"}</p>
                <p className="text-xs text-muted-foreground">{darkMode ? (isTa ? "இயக்கப்பட்டுள்ளது" : "Currently enabled") : (isTa ? "முடக்கப்பட்டுள்ளது" : "Currently disabled")}</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none"
              style={{ background: darkMode ? "#F4C430" : "hsl(var(--muted))" }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                style={{ transform: darkMode ? "translateX(20px)" : "translateX(0)" }}
              />
            </button>
          </div>

          {/* Language */}
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted">
                <Globe size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{isTa ? "மொழி" : "Language"}</p>
                <p className="text-xs text-muted-foreground">{lang === "en" ? "English" : "தமிழ்"}</p>
              </div>
            </div>
            <button
              onClick={() => setLang(lang === "en" ? "ta" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={{ background: "#F4C430", color: "#1A1A1A" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#FFD95A")}
              onMouseLeave={e => (e.currentTarget.style.background = "#F4C430")}
            >
              <Languages size={12} />
              {lang === "en" ? "தமிழ்" : "English"}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2" style={{ background: "rgba(200,16,46,0.04)" }}>
          <Bell size={15} style={{ color: "#C8102E" }} />
          <span className="text-sm font-semibold text-foreground">{isTa ? "அறிவிப்புகள்" : "Notifications"}</span>
        </div>
        <div className="divide-y divide-border">
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted">
                {notifEnabled ? <Bell size={16} className="text-green-500" /> : <BellOff size={16} className="text-muted-foreground" />}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{isTa ? "தகவல் அறிவிப்புகள்" : "Service Updates"}</p>
                <p className="text-xs text-muted-foreground">{isTa ? "சேவை புதுப்பிப்புகள் பெறவும்" : "Get notified about service changes"}</p>
              </div>
            </div>
            <button
              onClick={() => setNotifEnabled(v => !v)}
              className="relative w-11 h-6 rounded-full transition-colors duration-200"
              style={{ background: notifEnabled ? "#F4C430" : "hsl(var(--muted))" }}
            >
              <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200" style={{ transform: notifEnabled ? "translateX(20px)" : "translateX(0)" }} />
            </button>
          </div>
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted">
                <Phone size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{isTa ? "SMS அறிவிப்பு" : "SMS Alerts"}</p>
                <p className="text-xs text-muted-foreground">{isTa ? "கைபேசிக்கு SMS பெறவும்" : "Receive SMS to your mobile"}</p>
              </div>
            </div>
            <button
              onClick={() => setNotifSMS(v => !v)}
              className="relative w-11 h-6 rounded-full transition-colors duration-200"
              style={{ background: notifSMS ? "#F4C430" : "hsl(var(--muted))" }}
            >
              <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200" style={{ transform: notifSMS ? "translateX(20px)" : "translateX(0)" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2" style={{ background: "rgba(200,16,46,0.04)" }}>
          <Info size={15} style={{ color: "#C8102E" }} />
          <span className="text-sm font-semibold text-foreground">{isTa ? "உங்கள் செயல்பாடு" : "Your Activity"}</span>
        </div>
        <div className="grid grid-cols-2 gap-0 divide-x divide-border">
          <div className="px-4 py-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Bookmark size={14} style={{ color: "#C8102E" }} />
            </div>
            <p className="text-2xl font-bold text-foreground">{favorites.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{isTa ? "நெச்சிய சேவைகள்" : "Saved Services"}</p>
          </div>
          <div className="px-4 py-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Clock size={14} style={{ color: "#C8102E" }} />
            </div>
            <p className="text-2xl font-bold text-foreground">{recentServices.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{isTa ? "சமீபத்திய சேவைகள்" : "Recent Services"}</p>
          </div>
        </div>
      </div>

      {/* Privacy & About */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          <a
            href="/privacy"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted">
                <Shield size={16} className="text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{isTa ? "தனியுரிமை கொள்கை" : "Privacy Policy"}</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </a>
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted">
                <Info size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{isTa ? "பயன்பாடு பற்றி" : "About This App"}</p>
                <p className="text-xs text-muted-foreground">My Vetry Tamil Nadu · v1.0</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">TVK</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2" style={{ background: "rgba(239,68,68,0.04)" }}>
          <Trash2 size={15} className="text-destructive" />
          <span className="text-sm font-semibold text-destructive">{isTa ? "ஆபத்தான மண்டலம்" : "Danger Zone"}</span>
        </div>
        <div className="px-4 py-4">
          <p className="text-xs text-muted-foreground mb-3">{isTa ? "இது உங்கள் சுயவிவரத்தையும் விருப்பங்களையும் நீக்கும்." : "This will clear your profile and all preferences from this device."}</p>
          <button
            onClick={() => setUser(null)}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors"
          >
            {isTa ? "வெளியேறி சுயவிவரத்தை நீக்கு" : "Sign Out & Clear Data"}
          </button>
        </div>
      </div>
    </div>
  );
}
