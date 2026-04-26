"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { t } from "@/data/locales";
import {
  LayoutDashboard,
  Grid,
  MapPin,
  AlertTriangle,
  Shield,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Phone,
  User,
  LogOut,
  Menu,
  X,
  Languages,
  Settings,
  Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";

interface NavItem {
  path: string;
  labelKey: keyof typeof import("@/data/locales").translations["en"];
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: "/dashboard", labelKey: "dashboard", icon: <LayoutDashboard size={18} /> },
  { path: "/services", labelKey: "services", icon: <Grid size={18} /> },
  { path: "/intelligence", labelKey: "intelligence", icon: <MapPin size={18} /> },
  { path: "/issues", labelKey: "issues", icon: <AlertTriangle size={18} /> },
  { path: "/peoples-hall", labelKey: "peoplesHall", icon: <Landmark size={18} /> },
  { path: "/settings", labelKey: "settings", icon: <Settings size={18} /> },
  { path: "/privacy", labelKey: "privacy", icon: <Shield size={18} /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed, user, setUser } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => setUser(null);

  /* Sidebar text colours adapt to light (white sidebar) vs dark mode */
  const inactiveColor = darkMode ? "rgba(255,255,255,0.75)" : "hsl(0 0% 28%)";
  const hoverBg = darkMode ? "rgba(244,196,48,0.15)" : "rgba(244,196,48,0.18)";
  const hoverColor = darkMode ? "#F4C430" : "#1A1A1A";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-50 md:z-auto h-full flex flex-col
          bg-sidebar text-sidebar-foreground
          transition-all duration-200 ease-in-out
          ${sidebarCollapsed ? "w-12" : "w-64"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        data-testid="sidebar"
        style={{ position: "relative", borderRight: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid hsl(var(--sidebar-border))" }}
      >
        {/* Sidebar Header — always TVK red */}
        <div
          className={`flex items-center gap-3 ${sidebarCollapsed ? "justify-center px-2 py-4" : "px-4 py-4"}`}
          style={{ background: "#C8102E", borderBottom: "1px solid rgba(0,0,0,0.15)" }}
        >
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold leading-tight truncate" style={{ color: "#F4C430" }}>
                {t("appName", lang)}
              </span>
              <span className="text-xs text-white/60 truncate">{t("appSubtitle", lang)}</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: "#F4C430", color: "#1A1A1A" }}>
              MV
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 py-3 flex flex-col gap-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/dashboard" && pathname?.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center gap-3 px-2 py-2.5 rounded-md transition-all duration-150 cursor-pointer text-sm
                  ${sidebarCollapsed ? "justify-center" : ""}
                  ${isActive ? "font-semibold" : ""}
                `}
                style={isActive
                  ? { background: "#F4C430", color: "#1A1A1A" }
                  : { color: inactiveColor }
                }
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = hoverBg;
                    (e.currentTarget as HTMLElement).style.color = hoverColor;
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "";
                    (e.currentTarget as HTMLElement).style.color = inactiveColor;
                  }
                }}
                data-testid={`nav-${item.path.replace("/", "") || "home"}`}
                onClick={() => setMobileMenuOpen(false)}
                title={sidebarCollapsed ? t(item.labelKey, lang) : undefined}
              >
                {item.icon}
                {!sidebarCollapsed && (
                  <span className="truncate">{t(item.labelKey, lang)}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div
          className={`px-2 py-3 flex flex-col gap-1.5 ${sidebarCollapsed ? "items-center" : ""}`}
          style={{ borderTop: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid hsl(var(--sidebar-border))" }}
        >
          {/* Dark Mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-150 text-sm"
            style={{ color: inactiveColor }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = hoverBg; (e.currentTarget as HTMLElement).style.color = hoverColor; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = inactiveColor; }}
            data-testid="toggle-dark-mode"
            title={darkMode ? t("lightMode", lang) : t("darkMode", lang)}
          >
            {darkMode
              ? <Sun size={16} className="shrink-0" style={{ color: "#F4C430" }} />
              : <Moon size={16} className="shrink-0" />
            }
            {!sidebarCollapsed && <span>{darkMode ? t("lightMode", lang) : t("darkMode", lang)}</span>}
          </button>

          {/* Language toggle — yellow pill */}
          <button
            onClick={() => setLang(lang === "en" ? "ta" : "en")}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-150 text-sm font-semibold"
            style={{ background: "#F4C430", color: "#1A1A1A" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#FFD95A")}
            onMouseLeave={e => (e.currentTarget.style.background = "#F4C430")}
            data-testid="toggle-language"
            title={lang === "en" ? "தமிழ்" : "English"}
          >
            <Languages size={16} className="shrink-0" />
            {!sidebarCollapsed && <span>{lang === "en" ? "தமிழ்" : "English"}</span>}
          </button>

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-150 text-sm"
              style={{ color: inactiveColor }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)"; (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = inactiveColor; }}
              data-testid="btn-logout"
              title={t("logout", lang)}
            >
              <LogOut size={16} className="shrink-0" />
              {!sidebarCollapsed && <span>{t("logout", lang)}</span>}
            </button>
          )}
        </div>

        {/* Collapse toggle at top 80px */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
          style={{ top: "80px", background: "#F4C430", color: "#1A1A1A", border: "2px solid #C8102E" }}
          data-testid="sidebar-toggle"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 py-4 border-b border-border bg-card">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <div className="flex-1 min-w-0">
            <Breadcrumb />
          </div>
          {user && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                <User size={14} className="text-muted-foreground" />
                <span className="text-sm font-medium hidden sm:block">{user.name}</span>
              </div>
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-4 py-4" data-testid="main-content">
          {children}
        </main>

        {/* Emergency Helpline Footer */}
        <footer className="px-4 py-3 border-t border-border bg-card">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Phone size={12} className="text-destructive" />
              <span className="font-semibold text-foreground">108</span>
              <span>{t("emergency", lang)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone size={12} style={{ color: "#C8102E" }} />
              <span className="font-semibold text-foreground">181</span>
              <span>{t("womenHelpline", lang)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone size={12} style={{ color: "#C9A000" }} />
              <span className="font-semibold text-foreground">1100</span>
              <span>{t("cmHelpline", lang)}</span>
            </div>
            <span className="ml-auto hidden md:block">{t("footerNote", lang)}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
