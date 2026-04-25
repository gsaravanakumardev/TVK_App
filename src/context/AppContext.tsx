"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "@/data/locales";

interface UserProfile {
  name: string;
  mobile: string;
  district: string;
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  favorites: string[];
  toggleFavorite: (serviceId: string) => void;
  recentServices: string[];
  addRecentService: (serviceId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [lang, setLang] = useState<Language>("en");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentServices, setRecentServices] = useState<string[]>([]);

  // Hydration from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedUser = localStorage.getItem("user");
    const savedFavorites = localStorage.getItem("favorites");
    const savedRecent = localStorage.getItem("recentServices");

    if (savedLang) setLang(savedLang);
    if (savedDarkMode) setDarkMode(savedDarkMode);
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRecent) setRecentServices(JSON.parse(savedRecent));
    
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("lang", lang);
  }, [lang, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("recentServices", JSON.stringify(recentServices));
  }, [recentServices, isHydrated]);

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  const addRecentService = (serviceId: string) => {
    setRecentServices(prev => {
      const filtered = prev.filter(id => id !== serviceId);
      return [serviceId, ...filtered].slice(0, 5);
    });
  };

  // Prevent flash of unstyled content during hydration if necessary
  // For now we just render children to allow SEO and Initial Load
  return (
    <AppContext.Provider value={{
      lang, setLang,
      darkMode, setDarkMode,
      sidebarCollapsed, setSidebarCollapsed,
      user, setUser,
      favorites, toggleFavorite,
      recentServices, addRecentService
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
