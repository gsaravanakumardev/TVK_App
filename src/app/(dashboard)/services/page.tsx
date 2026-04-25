"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/data/locales";
import { services, categories } from "@/data/services";
import { Search } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  const { lang } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredServices = services.filter(s => {
    const matchesCategory = selectedCategory === "all" || s.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameTa.includes(searchQuery) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryColors: Record<string, string> = {
    "Revenue Services": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    "Social Welfare": "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800",
    "Land Records": "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
    "Social Security": "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
    "Utilities & Police": "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
    "Women's Welfare": "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
    "Education": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
    "Grievance Redressal": "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder={t("search", lang)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            data-testid="input-services-search"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2" data-testid="category-filter">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
          }`}
          data-testid="filter-all"
        >
          {t("allCategories", lang)} ({services.length})
        </button>
        {categories.map(cat => {
          const count = services.filter(s => s.category === cat).length;
          const isActive = selectedCategory === cat;
          const colorClass = isActive
            ? "bg-primary text-primary-foreground border-primary"
            : `${categoryColors[cat] || "bg-card text-muted-foreground border-border"} hover:border-primary`;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${colorClass}`}
              data-testid={`filter-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {lang === "ta"
                ? (services.find(s => s.category === cat)?.categoryTa || cat)
                : cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div>
        <p className="text-xs text-muted-foreground mb-3">
          {filteredServices.length} {lang === "ta" ? "சேவைகள்" : "services found"}
        </p>
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">{t("noResults", lang)}</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${lang === "ta" ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"}`}>
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
