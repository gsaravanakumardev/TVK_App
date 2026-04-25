import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/data/locales";
import { services } from "@/data/services";
import { thoguthiData } from "@/data/thoguthiData";
import Link from "next/link";
import {
  Award, MapPin, Grid, TrendingUp, Star,
  ChevronRight, Search, Bookmark
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

const totalConstituencies = thoguthiData.reduce((sum, d) => sum + d.constituencies.length, 0);

export default function Dashboard() {
  const { lang, recentServices, favorites } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = searchQuery.trim()
    ? services.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nameTa.includes(searchQuery) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const recentServiceItems = recentServices
    .map(id => services.find(s => s.id === id))
    .filter(Boolean) as typeof services;

  const favoriteItems = favorites
    .map(id => services.find(s => s.id === id))
    .filter(Boolean) as typeof services;

  return (
    <div className="space-y-6">
      {/* Global Search */}
      <div className="relative" data-testid="global-search">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder={t("search", lang)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          data-testid="input-search"
        />
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            {t("searchResults", lang)} ({filteredServices.length})
          </h2>
          {filteredServices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">{t("noResults", lang)}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      )}

      {!searchQuery.trim() && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: t("totalServices", lang), value: services.length, icon: <Grid size={20} />, color: "text-blue-500" },
              { label: t("activeCategories", lang), value: 8, icon: <Award size={20} />, color: "text-primary" },
              { label: t("districts", lang), value: 38, icon: <MapPin size={20} />, color: "text-green-600" },
              { label: t("constituencies", lang), value: totalConstituencies, icon: <TrendingUp size={20} />, color: "text-secondary-foreground" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg px-4 py-4" data-testid={`stat-card-${idx}`}>
                <div className={`mb-2 ${stat.color}`}>{stat.icon}</div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recently Used Services */}
          {recentServiceItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" />
                  {t("recentServices", lang)}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recentServiceItems.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          )}

          {/* Favorite Services */}
          {favoriteItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Bookmark size={16} className="text-secondary-foreground" />
                  {t("favoriteServices", lang)}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favoriteItems.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          )}

          {/* All Services Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Star size={16} className="text-secondary-foreground" />
                {t("allServices", lang)}
              </h2>
              <Link href="/services" className="flex items-center gap-1 text-xs text-primary hover:underline" data-testid="link-view-all-services">
                {t("viewAll", lang)} <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {services.slice(0, 8).map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
