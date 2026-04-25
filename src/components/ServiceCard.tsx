import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { t } from "@/data/locales";
import { Service } from "@/data/services";
import {
  FileText, MapPin, IndianRupee, GraduationCap, Award, Users,
  Heart, Star, Landmark, FileSearch, BookOpen, UserCheck, Shield,
  HeartHandshake, Zap, ClipboardList, AlertCircle, Phone, Construction,
  Droplets, Lightbulb, Trophy, BadgeIndianRupee, Bookmark, BookmarkCheck, X
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={20} />,
  MapPin: <MapPin size={20} />,
  IndianRupee: <IndianRupee size={20} />,
  GraduationCap: <GraduationCap size={20} />,
  Award: <Award size={20} />,
  Users: <Users size={20} />,
  Heart: <Heart size={20} />,
  Star: <Star size={20} />,
  Landmark: <Landmark size={20} />,
  FileSearch: <FileSearch size={20} />,
  BookOpen: <BookOpen size={20} />,
  UserCheck: <UserCheck size={20} />,
  Shield: <Shield size={20} />,
  HeartHandshake: <HeartHandshake size={20} />,
  Zap: <Zap size={20} />,
  ClipboardList: <ClipboardList size={20} />,
  AlertCircle: <AlertCircle size={20} />,
  Phone: <Phone size={20} />,
  Construction: <Construction size={20} />,
  Droplets: <Droplets size={20} />,
  Lightbulb: <Lightbulb size={20} />,
  Trophy: <Trophy size={20} />,
  BadgeIndianRupee: <BadgeIndianRupee size={20} />,
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  green: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  yellow: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  pink: "bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  red: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
};

interface Props {
  service: Service;
}

/* Eligibility Modal Component */
function EligibilityModal({ service, lang, onClose }: {
  service: Service;
  lang: string;
  onClose: () => void;
}) {
  const name = lang === "ta" ? service.nameTa : service.name;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
      data-testid="eligibility-modal-backdrop"
    >
      <div
        className="bg-card rounded-xl w-full max-w-md"
        style={{ border: "2px solid #C8102E" }}
        onClick={e => e.stopPropagation()}
        data-testid="eligibility-modal"
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-t-xl"
          style={{ background: "#C8102E" }}
        >
          <div>
            <h3 className="font-bold text-white text-sm">{name}</h3>
            <p className="text-xs text-white/70 mt-0.5">
              {lang === "ta" ? "தகுதி தகவல்" : "Eligibility Information"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            data-testid="btn-close-modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-4 py-4 space-y-4">
          {/* Income Limit */}
          <div className="rounded-lg px-3 py-3" style={{ background: "rgba(200,16,46,0.06)", border: "1px solid rgba(200,16,46,0.2)" }}>
            <p className="text-xs font-bold mb-1" style={{ color: "#C8102E" }}>
              {lang === "ta" ? "வருமான வரம்பு" : "Income Limit"}
            </p>
            <p className="text-sm text-foreground font-medium">{service.eligibility.incomeLimit}</p>
          </div>

          {/* Required Documents */}
          <div>
            <p className="text-xs font-bold mb-2 text-foreground">
              {lang === "ta" ? "தேவையான ஆவணங்கள்" : "Required Documents"}
            </p>
            <div className="space-y-1.5">
              {service.eligibility.documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 text-[10px] font-bold" style={{ background: "#F4C430", color: "#1A1A1A" }}>
                    {i + 1}
                  </span>
                  {doc}
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Rules */}
          <div>
            <p className="text-xs font-bold mb-2 text-foreground">
              {lang === "ta" ? "தகுதி விதிகள்" : "Eligibility Rules"}
            </p>
            <div className="space-y-1.5">
              {service.eligibility.rules.map((rule, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#C8102E" }} />
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: "#F4C430", color: "#1A1A1A" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FFD95A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F4C430"; }}
            data-testid="btn-modal-close"
          >
            {lang === "ta" ? "மூடு" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServiceCard({ service }: Props) {
  const { lang, favorites, toggleFavorite, addRecentService } = useApp();
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const router = useRouter();
  const isFav = favorites.includes(service.id);

  const handleApplyOrTrack = () => {
    addRecentService(service.id);
    router.push("/under-development");
  };

  const name = lang === "ta" ? service.nameTa : service.name;
  const description = lang === "ta" ? service.descriptionTa : service.description;

  return (
    <>
      <div
        className="bg-card border border-border rounded-lg flex flex-col"
        data-testid={`card-service-${service.id}`}
      >
        <div className="px-4 py-4 flex-1">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorMap[service.color] || colorMap.blue}`}>
              {iconMap[service.icon] || <FileText size={20} />}
            </div>
            <button
              onClick={() => toggleFavorite(service.id)}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid={`btn-favorite-${service.id}`}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              {isFav
                ? <BookmarkCheck size={16} style={{ color: "#C8102E" }} />
                : <Bookmark size={16} />
              }
            </button>
          </div>
          <h3 className="font-semibold text-foreground text-sm mb-1 leading-snug">{name}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
        </div>

        <div className="px-4 pb-4 flex flex-col gap-2">
          {/* Apply Now + Track Status — both yellow palette */}
          <div className="flex gap-2">
            <button
              className="flex-1 text-xs h-8 rounded-md font-semibold transition-colors"
              style={{ background: "#F4C430", color: "#1A1A1A" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FFD95A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F4C430"; }}
              onClick={handleApplyOrTrack}
              data-testid={`btn-apply-${service.id}`}
            >
              {t("applyNow", lang)}
            </button>
            <button
              className="flex-1 text-xs h-8 rounded-md font-semibold transition-colors"
              style={{ background: "#F4C430", color: "#1A1A1A" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FFD95A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F4C430"; }}
              onClick={handleApplyOrTrack}
              data-testid={`btn-track-${service.id}`}
            >
              {t("trackStatus", lang)}
            </button>
          </div>
          {/* Check Eligibility — opens popup modal */}
          <button
            className="w-full text-xs h-8 rounded-md font-medium transition-colors border"
            style={{ borderColor: "#C8102E", color: "#C8102E", background: "transparent" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(200,16,46,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            onClick={() => setShowEligibilityModal(true)}
            data-testid={`btn-eligibility-${service.id}`}
          >
            {t("checkEligibility", lang)}
          </button>
        </div>
      </div>

      {/* Eligibility Popup Modal */}
      {showEligibilityModal && (
        <EligibilityModal
          service={service}
          lang={lang}
          onClose={() => setShowEligibilityModal(false)}
        />
      )}
    </>
  );
}
