import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/data/locales";
import { thoguthiData } from "@/data/thoguthiData";
import { AlertTriangle, CheckCircle2, Clock, Circle, Filter } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";

type IssueStatus = "Open" | "In Progress" | "Resolved";
type IssueCategory = "Roads" | "Water" | "Street Lights" | "Sanitation" | "Drainage" | "Public Safety" | "Health";

interface Issue {
  id: string;
  constituency: string;
  district: string;
  category: IssueCategory;
  description: string;
  status: IssueStatus;
  date: string;
  priority: "High" | "Medium" | "Low";
}

const issueCategories: IssueCategory[] = ["Roads", "Water", "Street Lights", "Sanitation", "Drainage", "Public Safety", "Health"];

function generateIssues(district: string, constituency: string): Issue[] {
  const seed = constituency.charCodeAt(0) + constituency.length;
  const count = 5 + (seed * 7) % 15;
  const statuses: IssueStatus[] = ["Open", "In Progress", "Resolved"];
  const priorities: Issue["priority"][] = ["High", "Medium", "Low"];
  const descriptions: Record<IssueCategory, string[]> = {
    "Roads": ["Pothole on main road", "Road damage near school", "Street needs resurfacing", "Speed breaker required"],
    "Water": ["No water supply for 3 days", "Water pipe leakage", "Contaminated water complaint", "Insufficient water pressure"],
    "Street Lights": ["Street light not working since 1 week", "Damaged lamp post", "New street light requested", "Faulty wiring"],
    "Sanitation": ["Garbage not collected", "Overflowing dustbin", "Open defecation area", "Public toilet needs repair"],
    "Drainage": ["Blocked drainage causing flooding", "Open drain is a safety hazard", "Sewage overflow", "Storm drain maintenance needed"],
    "Public Safety": ["Stray dogs menace", "Broken footpath", "Dangerous tree branch", "Unauthorized construction"],
    "Health": ["Mobile medical unit not visiting", "Primary health center closed", "Medicine shortage", "Vaccination camp needed"],
  };

  return Array.from({ length: count }, (_, i) => {
    const catIdx = (seed + i * 3) % issueCategories.length;
    const cat = issueCategories[catIdx];
    const descArr = descriptions[cat];
    const descIdx = (seed + i) % descArr.length;
    const statusIdx = (seed + i * 5) % 3;
    const priorityIdx = (seed + i * 2) % 3;
    const dayOffset = (seed + i * 11) % 60;
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    return {
      id: `${constituency.slice(0, 3).toUpperCase()}-${(1000 + i + seed).toString().slice(-3)}`,
      constituency,
      district,
      category: cat,
      description: descArr[descIdx],
      status: statuses[statusIdx],
      date: date.toLocaleDateString("en-IN"),
      priority: priorities[priorityIdx],
    };
  });
}

const statusConfig: Record<IssueStatus, { color: string; icon: React.ReactNode; label: Record<string, string> }> = {
  "Open": {
    color: "text-red-600 bg-red-50 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
    icon: <Circle size={12} />,
    label: { en: "Open", ta: "திறந்திருக்கும்" }
  },
  "In Progress": {
    color: "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
    icon: <Clock size={12} />,
    label: { en: "In Progress", ta: "செயல்பாட்டில்" }
  },
  "Resolved": {
    color: "text-green-600 bg-green-50 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
    icon: <CheckCircle2 size={12} />,
    label: { en: "Resolved", ta: "தீர்க்கப்பட்டது" }
  }
};

const priorityConfig: Record<Issue["priority"], string> = {
  "High": "text-red-600",
  "Medium": "text-yellow-600",
  "Low": "text-green-600",
};

export default function Issues() {
  const { lang, user } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState(() => user?.district || "");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | "all">("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const districtData = thoguthiData.find(d => d.district === selectedDistrict);
  const constituencies = districtData?.constituencies || [];

  const allIssues = selectedConstituency
    ? generateIssues(selectedDistrict, selectedConstituency)
    : selectedDistrict && districtData
      ? districtData.constituencies.flatMap(c => generateIssues(selectedDistrict, c))
      : [];

  const filteredIssues = allIssues.filter(issue => {
    const matchStatus = selectedStatus === "all" || issue.status === selectedStatus;
    const matchCat = selectedCategory === "all" || issue.category === selectedCategory;
    return matchStatus && matchCat;
  });

  const totalPages = Math.ceil(filteredIssues.length / rowsPerPage);
  const paginatedIssues = filteredIssues.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const statusCounts = {
    Open: allIssues.filter(i => i.status === "Open").length,
    "In Progress": allIssues.filter(i => i.status === "In Progress").length,
    Resolved: allIssues.filter(i => i.status === "Resolved").length,
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("selectDistrict", lang)}</label>
          <CustomSelect
            value={selectedDistrict}
            onChange={(val) => { setSelectedDistrict(val); setSelectedConstituency(""); setPage(1); }}
            options={[
              { value: "", label: lang === "ta" ? "அனைத்து மாவட்டங்களும்" : "All Districts" },
              ...thoguthiData.map(d => ({ value: d.district, label: d.district }))
            ]}
            placeholder={lang === "ta" ? "அனைத்து மாவட்டங்களும்" : "All Districts"}
            data-testid="select-issues-district"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("selectConstituency", lang)}</label>
          <CustomSelect
            value={selectedConstituency}
            onChange={(val) => { setSelectedConstituency(val); setPage(1); }}
            options={[
              { value: "", label: lang === "ta" ? "அனைத்து தொகுதிகளும்" : "All Constituencies" },
              ...constituencies.map(c => ({ value: c, label: c }))
            ]}
            placeholder={lang === "ta" ? "அனைத்து தொகுதிகளும்" : "All Constituencies"}
            disabled={!selectedDistrict}
            data-testid="select-issues-constituency"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("status", lang)}</label>
          <CustomSelect
            value={selectedStatus}
            onChange={(val) => { setSelectedStatus(val as IssueStatus | "all"); setPage(1); }}
            options={[
              { value: "all", label: lang === "ta" ? "அனைத்து நிலைகளும்" : "All Status" },
              { value: "Open", label: lang === "ta" ? "திறந்திருக்கும்" : "Open" },
              { value: "In Progress", label: lang === "ta" ? "செயல்பாட்டில்" : "In Progress" },
              { value: "Resolved", label: lang === "ta" ? "தீர்க்கப்பட்டது" : "Resolved" },
            ]}
            placeholder={lang === "ta" ? "அனைத்து நிலைகளும்" : "All Status"}
            data-testid="select-status"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("category", lang)}</label>
          <CustomSelect
            value={selectedCategory}
            onChange={(val) => { setSelectedCategory(val as IssueCategory | "all"); setPage(1); }}
            options={[
              { value: "all", label: lang === "ta" ? "அனைத்து வகைகளும்" : "All Categories" },
              ...issueCategories.map(c => ({ value: c, label: c }))
            ]}
            placeholder={lang === "ta" ? "அனைத்து வகைகளும்" : "All Categories"}
            data-testid="select-category"
          />
        </div>
      </div>

      {!selectedDistrict ? (
        <div className="text-center py-16 text-muted-foreground">
          <AlertTriangle size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">{lang === "ta" ? "புகார்களை காண மாவட்டம் தேர்வு செய்யவும்" : "Select a district to view issues & complaints"}</p>
        </div>
      ) : (
        <>
          {/* Status Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            {(["Open", "In Progress", "Resolved"] as IssueStatus[]).map(status => {
              const cfg = statusConfig[status];
              return (
                <div key={status} className="bg-card border border-border rounded-lg px-4 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.color}`}>
                      {cfg.icon} {cfg.label[lang] || status}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{statusCounts[status]}</div>
                  <div className="text-xs text-muted-foreground">{lang === "ta" ? "புகார்கள்" : "issues"}</div>
                </div>
              );
            })}
          </div>

          {/* Issues Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-muted/40 border-b border-border flex items-center justify-between">
              <h3 className="text-xs font-semibold text-foreground">
                {t("allComplaints", lang)} ({filteredIssues.length})
              </h3>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Filter size={12} /> {lang === "ta" ? "வடிகட்டப்பட்டது" : "Filtered"}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="issues-table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{t("complaintId", lang)}</th>
                    {!selectedConstituency && (
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{t("constituencies", lang)}</th>
                    )}
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{t("category", lang)}</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">{t("description", lang)}</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{t("status", lang)}</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">{t("date", lang)}</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{lang === "ta" ? "முன்னுரிமை" : "Priority"}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedIssues.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-xs text-muted-foreground">
                        {lang === "ta" ? "புகார்கள் எதுவும் இல்லை" : "No issues found"}
                      </td>
                    </tr>
                  ) : (
                    paginatedIssues.map(issue => {
                      const cfg = statusConfig[issue.status];
                      return (
                        <tr key={issue.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors" data-testid={`row-issue-${issue.id}`}>
                          <td className="px-4 py-2.5 text-xs font-mono text-foreground">{issue.id}</td>
                          {!selectedConstituency && (
                            <td className="px-4 py-2.5 text-xs text-foreground">{issue.constituency}</td>
                          )}
                          <td className="px-4 py-2.5 text-xs text-muted-foreground">{issue.category}</td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground hidden md:table-cell max-w-[200px] truncate">{issue.description}</td>
                          <td className="px-4 py-2.5">
                            <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border w-fit ${cfg.color}`}>
                              {cfg.icon} {cfg.label[lang] || issue.status}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground hidden sm:table-cell">{issue.date}</td>
                          <td className="px-4 py-2.5 text-xs">
                            <span className={`font-medium ${priorityConfig[issue.priority]}`}>{issue.priority}</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {lang === "ta" ? "பக்கம்" : "Page"} {page} / {totalPages} — {filteredIssues.length} {lang === "ta" ? "மொத்தம்" : "total"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 text-xs border border-border rounded-md hover:bg-muted disabled:opacity-40 transition-colors"
                    data-testid="btn-prev-page"
                  >
                    {lang === "ta" ? "முந்தைய" : "Prev"}
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                      pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-1 text-xs border rounded-md transition-colors ${page === pageNum ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}
                        data-testid={`btn-page-${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 text-xs border border-border rounded-md hover:bg-muted disabled:opacity-40 transition-colors"
                    data-testid="btn-next-page"
                  >
                    {lang === "ta" ? "அடுத்த" : "Next"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
