"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/data/locales";
import { thoguthiData } from "@/data/thoguthiData";
import { TrendingUp, Users, IndianRupee, CheckCircle2, Clock, MapPin } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";

interface ConstituencyData {
  name: string;
  population: number;
  totalBudget: number;
  utilized: number;
  issuesTotal: number;
  issuesResolved: number;
  issuesPending: number;
}

function generateConstituencyData(name: string): ConstituencyData {
  const seed = name.charCodeAt(0) + name.length;
  const population = 100000 + (seed * 3721) % 400000;
  const totalBudget = 5 + (seed * 137) % 45;
  const utilizedPct = 40 + (seed * 17) % 55;
  const utilized = Math.round(totalBudget * utilizedPct / 100);
  const issuesTotal = 50 + (seed * 7) % 450;
  const issuesResolved = Math.round(issuesTotal * (0.5 + (seed % 40) / 100));
  return {
    name,
    population,
    totalBudget,
    utilized,
    issuesTotal,
    issuesResolved,
    issuesPending: issuesTotal - issuesResolved,
  };
}

export default function IntelligencePage() {
  const { lang, user } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState(() => user?.district || "");
  const [selectedConstituency, setSelectedConstituency] = useState("");

  const districtData = thoguthiData.find(d => d.district === selectedDistrict);
  const constituencies = districtData?.constituencies || [];

  const constData = selectedConstituency
    ? generateConstituencyData(selectedConstituency)
    : null;

  const districtTotal = selectedDistrict && districtData
    ? districtData.constituencies.reduce((acc, c) => {
        const d = generateConstituencyData(c);
        return {
          population: acc.population + d.population,
          totalBudget: acc.totalBudget + d.totalBudget,
          utilized: acc.utilized + d.utilized,
          issuesTotal: acc.issuesTotal + d.issuesTotal,
          issuesResolved: acc.issuesResolved + d.issuesResolved,
        };
      }, { population: 0, totalBudget: 0, utilized: 0, issuesTotal: 0, issuesResolved: 0 })
    : null;

  const formatNumber = (n: number) =>
    n >= 100000 ? `${(n / 100000).toFixed(1)} Lakh` : n.toLocaleString("en-IN");

  const formatCrore = (n: number) => `₹${n.toFixed(1)} Cr`;

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            {t("selectDistrict", lang)}
          </label>
          <CustomSelect
            value={selectedDistrict}
            onChange={(val) => { setSelectedDistrict(val); setSelectedConstituency(""); }}
            options={[
              { value: "", label: t("selectDistrict", lang) },
              ...thoguthiData.map(d => ({ value: d.district, label: d.district }))
            ]}
            placeholder={t("selectDistrict", lang)}
            data-testid="select-district"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            {t("selectConstituency", lang)}
          </label>
          <CustomSelect
            value={selectedConstituency}
            onChange={setSelectedConstituency}
            options={[
              { value: "", label: t("selectConstituency", lang) },
              ...constituencies.map(c => ({ value: c, label: c }))
            ]}
            placeholder={t("selectConstituency", lang)}
            disabled={!selectedDistrict}
            data-testid="select-constituency"
          />
        </div>
      </div>

      {!selectedDistrict && (
        <div className="text-center py-16 text-muted-foreground">
          <MapPin size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">{lang === "ta" ? "மாவட்டம் தேர்வு செய்யவும்" : "Please select a district to view intelligence data"}</p>
        </div>
      )}

      {/* District Overview */}
      {selectedDistrict && districtTotal && (
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">
            {selectedDistrict} {lang === "ta" ? "மாவட்ட கண்ணோட்டம்" : "District Overview"}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-blue-500" />
                <span className="text-xs text-muted-foreground">{t("totalPopulation", lang)}</span>
              </div>
              <div className="text-xl font-bold text-foreground">{formatNumber(districtTotal.population)}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{districtData?.constituencies.length} {t("constituencies", lang)}</div>
            </div>
            <div className="bg-card border border-border rounded-lg px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee size={16} className="text-green-500" />
                <span className="text-xs text-muted-foreground">{t("totalBudget", lang)}</span>
              </div>
              <div className="text-xl font-bold text-foreground">{formatCrore(districtTotal.totalBudget)}</div>
              <div className="text-xs text-green-600 mt-0.5">{formatCrore(districtTotal.utilized)} {t("utilized", lang)}</div>
            </div>
            <div className="bg-card border border-border rounded-lg px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground">{t("budgetUtilization", lang)}</span>
              </div>
              <div className="text-xl font-bold text-foreground">
                {Math.round(districtTotal.utilized / districtTotal.totalBudget * 100)}%
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                <div
                  className="bg-primary h-1.5 rounded-full"
                  style={{ width: `${Math.round(districtTotal.utilized / districtTotal.totalBudget * 100)}%` }}
                />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-orange-500" />
                <span className="text-xs text-muted-foreground">{t("issueResolution", lang)}</span>
              </div>
              <div className="text-xl font-bold text-foreground">
                {Math.round(districtTotal.issuesResolved / districtTotal.issuesTotal * 100)}%
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {districtTotal.issuesResolved}/{districtTotal.issuesTotal} {t("resolved", lang)}
              </div>
            </div>
          </div>

          {/* Constituency Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-muted/40 border-b border-border">
              <h3 className="text-xs font-semibold text-foreground">
                {lang === "ta" ? "தொகுதி வாரியாக விவரம்" : "Constituency-wise Breakdown"}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="constituency-table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                      {lang === "ta" ? "தொகுதி" : "Constituency"}
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                      {t("totalPopulation", lang)}
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                      {t("budgetUtilization", lang)}
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                      {t("issueResolution", lang)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {constituencies.map(c => {
                    const d = generateConstituencyData(c);
                    const utilPct = Math.round(d.utilized / d.totalBudget * 100);
                    const resPct = Math.round(d.issuesResolved / d.issuesTotal * 100);
                    const isSelected = c === selectedConstituency;
                    return (
                      <tr
                        key={c}
                        onClick={() => setSelectedConstituency(c === selectedConstituency ? "" : c)}
                        className={`border-b border-border last:border-b-0 cursor-pointer transition-colors ${isSelected ? "bg-accent/50" : "hover:bg-muted/30"}`}
                        data-testid={`row-constituency-${c}`}
                      >
                        <td className="px-4 py-2.5 font-medium text-foreground text-xs">{c}</td>
                        <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">{formatNumber(d.population)}</td>
                        <td className="px-4 py-2.5 text-right text-xs">
                          <span className={`font-medium ${utilPct >= 70 ? "text-green-600" : utilPct >= 50 ? "text-yellow-600" : "text-red-600"}`}>
                            {utilPct}%
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right text-xs">
                          <span className={`font-medium ${resPct >= 70 ? "text-green-600" : resPct >= 50 ? "text-yellow-600" : "text-red-600"}`}>
                            {resPct}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Specific Constituency Detail */}
      {constData && selectedConstituency && (
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">
            {selectedConstituency} {lang === "ta" ? "தொகுதி விவரங்கள்" : "Constituency Details"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Budget Card */}
            <div className="bg-card border border-border rounded-lg px-4 py-4">
              <h3 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                <IndianRupee size={14} className="text-green-500" />
                {t("budgetUtilization", lang)}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{t("totalBudget", lang)}</span>
                  <span className="text-sm font-bold text-foreground">{formatCrore(constData.totalBudget)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{t("utilized", lang)}</span>
                  <span className="text-sm font-bold text-green-600">{formatCrore(constData.utilized)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{lang === "ta" ? "மீதமுள்ளது" : "Remaining"}</span>
                  <span className="text-sm font-bold text-orange-500">{formatCrore(constData.totalBudget - constData.utilized)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${Math.round(constData.utilized / constData.totalBudget * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  {Math.round(constData.utilized / constData.totalBudget * 100)}% {t("utilized", lang)}
                </p>
              </div>
            </div>

            {/* Issue Resolution Card */}
            <div className="bg-card border border-border rounded-lg px-4 py-4">
              <h3 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-primary" />
                {t("issueResolution", lang)}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{lang === "ta" ? "மொத்த புகார்கள்" : "Total Issues"}</span>
                  <span className="text-sm font-bold text-foreground">{constData.issuesTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-green-500" /> {t("resolved", lang)}
                  </span>
                  <span className="text-sm font-bold text-green-600">{constData.issuesResolved}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} className="text-orange-500" /> {t("pending", lang)}
                  </span>
                  <span className="text-sm font-bold text-orange-500">{constData.issuesPending}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-400"
                    style={{ width: `${Math.round(constData.issuesResolved / constData.issuesTotal * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  {Math.round(constData.issuesResolved / constData.issuesTotal * 100)}% {t("resolved", lang)}
                </p>
              </div>
            </div>

            {/* Population Card */}
            <div className="bg-card border border-border rounded-lg px-4 py-4">
              <h3 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users size={14} className="text-blue-500" />
                {t("totalPopulation", lang)}
              </h3>
              <div className="text-3xl font-extrabold text-foreground">{formatNumber(constData.population)}</div>
              <p className="text-xs text-muted-foreground mt-1">{selectedConstituency} {lang === "ta" ? "தொகுதியில்" : "Constituency"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
