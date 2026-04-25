import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const routeLabels: Record<string, Record<string, string>> = {
  "/": { en: "Home", ta: "முகப்பு" },
  "/services": { en: "Services", ta: "சேவைகள்" },
  "/intelligence": { en: "Constituency Intelligence", ta: "தொகுதி தகவல்கள்" },
  "/issues": { en: "Issues & Incidents", ta: "சிக்கல்கள் மற்றும் புகார்கள்" },
  "/privacy": { en: "Privacy Policy", ta: "தனியுரிமை கொள்கை" },
  "/settings": { en: "Settings", ta: "அமைப்புகள்" },
  "/peoples-hall": { en: "People's Hall", ta: "மக்கள் மன்றம்" },
  "/under-development": { en: "Under Development", ta: "வளர்ச்சியில் உள்ளது" },
};

export default function Breadcrumb() {
  const location = usePathname() ?? "/";
  const { lang } = useApp();

  const segments = location.split("/").filter(Boolean);
  const crumbs: { label: string; path: string }[] = [
    { label: lang === "ta" ? "முகப்பு" : "Home", path: "/" }
  ];

  let currentPath = "";
  for (const seg of segments) {
    currentPath += "/" + seg;
    const label = routeLabels[currentPath]?.[lang] || seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    crumbs.push({ label, path: currentPath });
  }

  if (crumbs.length === 1 && location === "/") {
    return (
      <div className="flex items-center gap-1 text-sm text-muted-foreground" data-testid="breadcrumb">
        <Home size={14} className="text-primary" />
        <span className="text-foreground font-medium">{lang === "ta" ? "முகப்பு" : "Home"}</span>
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-1 text-sm" data-testid="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((crumb, idx) => (
        <div key={crumb.path} className="flex items-center gap-1">
          {idx > 0 && <ChevronRight size={14} className="text-muted-foreground" />}
          {idx === 0 && <Home size={14} className="text-primary mr-0.5" />}
          {idx < crumbs.length - 1 ? (
            <Link href={crumb.path} className="text-muted-foreground hover:text-foreground transition-colors capitalize">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium capitalize">{crumb.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
