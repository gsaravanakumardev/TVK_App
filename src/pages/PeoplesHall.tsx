"use client";
import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Lightbulb, Vote, Star, Receipt, FileSignature,
  ThumbsUp, ThumbsDown, Check, ChevronRight, ArrowUp,
  Users, AlertCircle, BadgeCheck, Clock, Filter,
  TrendingUp, Building2, Landmark, Search, Plus, X,
  MessageSquare, CheckCircle2, BarChart3, ExternalLink,
  ShoppingBag, Utensils, Wallet, Activity, Bus, BookOpen, Fingerprint, MapPin
} from "lucide-react";
import {
  mockIdeas, mockPolicies, mockServiceRatings, mockTransactions, mockCampaigns,
  type Idea, type IdeaCategory, type IdeaStatus
} from "@/data/peoplesHall";
import { useToast } from "@/hooks/use-toast";
import DetailPanel from "@/components/DetailPanel";
import ChatBot from "@/components/ChatBot";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area
} from "recharts";

type SelectedItem = { type: Tab; id: string } | null;

type Tab = "ideas" | "policies" | "ratings" | "finance" | "campaigns";

const TABS: { id: Tab; label: string; label_ta: string; icon: React.ReactNode }[] = [
  { id: "ideas", label: "Public Ideas", label_ta: "பொது யோசனைகள்", icon: <Lightbulb size={15} /> },
  { id: "policies", label: "Policy Voting", label_ta: "கொள்கை வாக்கெடுப்பு", icon: <Vote size={15} /> },
  { id: "ratings", label: "Rate Services", label_ta: "சேவை மதிப்பீடு", icon: <Star size={15} /> },
  { id: "finance", label: "Financial Monitor", label_ta: "நிதி கண்காணிப்பு", icon: <Receipt size={15} /> },
  { id: "campaigns", label: "Campaigns", label_ta: "கையொப்பம் பிரச்சாரங்கள்", icon: <FileSignature size={15} /> },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string; label_ta: string }> = {
  new: { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300", label: "New", label_ta: "புதியது" },
  under_review: { bg: "bg-yellow-100 dark:bg-yellow-900/40", text: "text-yellow-700 dark:text-yellow-300", label: "Under Review", label_ta: "மதிப்பாய்வில்" },
  approved: { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-700 dark:text-green-300", label: "Approved", label_ta: "அங்கீகரிக்கப்பட்டது" },
  implemented: { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-300", label: "Implemented", label_ta: "செயல்படுத்தப்பட்டது" },
  active: { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-700 dark:text-green-300", label: "Active", label_ta: "செயலில்" },
  closed: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400", label: "Closed", label_ta: "மூடப்பட்டது" },
  implemented_pol: { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-300", label: "Implemented", label_ta: "செயல்படுத்தப்பட்டது" },
  govt_responded: { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-700 dark:text-green-300", label: "Govt Responded", label_ta: "அரசு பதில் அளித்தது" },
  debate_scheduled: { bg: "bg-red-100 dark:bg-red-900/40", text: "text-red-700 dark:text-red-300", label: "Assembly Debate", label_ta: "சட்டமன்ற விவாதம்" },
  release: { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300", label: "Fund Release", label_ta: "நிதி வெளியீடு" },
  expenditure: { bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-700 dark:text-orange-300", label: "Expenditure", label_ta: "செலவு" },
  tender: { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-300", label: "Tender", label_ta: "ஒப்பந்தம்" },
  completed: { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-700 dark:text-green-300", label: "Completed", label_ta: "நிறைவடைந்தது" },
  in_progress: { bg: "bg-yellow-100 dark:bg-yellow-900/40", text: "text-yellow-700 dark:text-yellow-300", label: "In Progress", label_ta: "நடந்துகொண்டிருக்கிறது" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] ?? { bg: "bg-gray-100", text: "text-gray-600", label: status, label_ta: status };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={size} fill={s <= Math.round(rating) ? "#F4C430" : "none"} stroke={s <= Math.round(rating) ? "#F4C430" : "hsl(var(--muted-foreground)/0.3)"} className={s <= Math.round(rating) ? "drop-shadow-[0_0_2px_rgba(244,196,48,0.4)]" : ""} />
      ))}
    </div>
  );
}

function getDepartmentIcon(dept: string, size: number = 16) {
  const d = dept.toLowerCase();
  if (d.includes("food") || d.includes("pds")) return <ShoppingBag size={size} />;
  if (d.includes("municipal") || d.includes("canteen")) return <Utensils size={size} />;
  if (d.includes("revenue")) return <Wallet size={size} />;
  if (d.includes("health")) return <Activity size={size} />;
  if (d.includes("transport")) return <Bus size={size} />;
  if (d.includes("education")) return <BookOpen size={size} />;
  if (d.includes("uidai")) return <Fingerprint size={size} />;
  return <Building2 size={size} />;
}

function StarPicker({ value, onChange, lang }: { value: number; onChange: (v: number) => void; lang: string }) {
  const [hover, setHover] = useState(0);
  const activeRating = hover || value;

  const labels: Record<number, { en: string; ta: string; color: string; icon: string }> = {
    1: { en: "Poor", ta: "மிக மோசம்", color: "#ef4444", icon: "😞" },
    2: { en: "Fair", ta: "சுமார்", color: "#f97316", icon: "😐" },
    3: { en: "Good", ta: "நல்லது", color: "#eab308", icon: "😊" },
    4: { en: "Very Good", ta: "மிகவும் நன்று", color: "#16a34a", icon: "😃" },
    5: { en: "Excellent", ta: "சிறப்பானது", color: "#15803d", icon: "🤩" },
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4, 5].map(s => (
          <button key={s}
            onClick={() => onChange(s)}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            className="group relative transition-all duration-300 hover:scale-125 active:scale-95"
          >
            {/* Glow Background */}
            {activeRating >= s && (
              <div className="absolute inset-0 blur-lg opacity-40 animate-pulse" style={{ backgroundColor: "#F4C430" }} />
            )}

            <Star
              size={32}
              fill={activeRating >= s ? "#F4C430" : "transparent"}
              stroke={activeRating >= s ? "#F4C430" : "hsl(var(--muted-foreground)/0.4)"}
              className={`relative z-10 transition-all duration-500 ${activeRating >= s ? "drop-shadow-[0_0_12px_rgba(244,196,48,0.6)] scale-110" : "grayscale"}`}
              strokeWidth={activeRating >= s ? 2 : 1.5}
            />

            {/* Pulse effect for selected star */}
            {value === s && (
              <div className="absolute inset-0 rounded-full border-2 border-[#F4C430] animate-ping opacity-20" />
            )}
          </button>
        ))}
      </div>

      <div className="h-10 flex items-center justify-center overflow-hidden">
        {activeRating > 0 && (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 animate-in slide-in-from-bottom-2 fade-in duration-300 shadow-lg shadow-black/10">
            <span className="text-xl">{labels[activeRating]?.icon}</span>
            <span
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: labels[activeRating]?.color }}
            >
              {lang === "ta" ? labels[activeRating]?.ta : labels[activeRating]?.en}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// IDEAS TAB
// ─────────────────────────────────────────────────────────────
function IdeasTab({ lang, onSelect }: { lang: string; onSelect?: (id: string) => void }) {
  const { toast } = useToast();
  const [upvoted, setUpvoted] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("ph_upvoted") || "[]"); } catch { return []; }
  });
  const [ideas, setIdeas] = useState(mockIdeas);
  const [filter, setFilter] = useState<IdeaCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<IdeaStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newIdea, setNewIdea] = useState({ title: "", category: "Education" as IdeaCategory, description: "" });

  const toggleUpvote = (id: string) => {
    const already = upvoted.includes(id);
    const next = already ? upvoted.filter(x => x !== id) : [...upvoted, id];
    setUpvoted(next);
    localStorage.setItem("ph_upvoted", JSON.stringify(next));
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, upvotes: i.upvotes + (already ? -1 : 1) } : i));
    if (!already) toast({ title: lang === "ta" ? "வாக்கு பதிவாயிற்று!" : "Upvoted!", description: lang === "ta" ? "உங்கள் ஆதரவு பதிவு செய்யப்பட்டது." : "Your support has been recorded." });
  };

  const submitIdea = () => {
    if (!newIdea.title.trim() || !newIdea.description.trim()) {
      toast({ variant: "destructive", title: "Fill all fields", description: "Title and description are required." });
      return;
    }
    const created: Idea = {
      id: `idea-u${Date.now()}`,
      title: newIdea.title,
      title_ta: newIdea.title,
      description: newIdea.description,
      description_ta: newIdea.description,
      category: newIdea.category,
      author: "You",
      district: "Your District",
      date: new Date().toISOString().split("T")[0],
      upvotes: 1,
      status: "new",
      tags: []
    };
    setIdeas(prev => [created, ...prev]);
    setUpvoted(prev => { const n = [...prev, created.id]; localStorage.setItem("ph_upvoted", JSON.stringify(n)); return n; });
    setShowForm(false);
    setNewIdea({ title: "", category: "Education", description: "" });
    toast({ title: lang === "ta" ? "யோசனை சமர்ப்பிக்கப்பட்டது!" : "Idea Submitted!", description: lang === "ta" ? "உங்கள் யோசனை மதிப்பாய்வில் உள்ளது." : "Your idea is now under review." });
  };

  const categories: (IdeaCategory | "all")[] = ["all", "Agriculture", "Healthcare", "Education", "Transport", "Environment", "Safety", "Infrastructure", "Welfare"];
  const filtered = ideas
    .filter(i => filter === "all" || i.category === filter)
    .filter(i => statusFilter === "all" || i.status === statusFilter)
    .filter(i => !search || i.title.toLowerCase().includes(search.toLowerCase()) || (lang === "ta" && i.title_ta.includes(search)));

  // Category chart data
  const chartData = categories.filter(c => c !== "all").map(cat => ({
    name: cat,
    count: ideas.filter(i => i.category === cat).length
  }));

  return (
    <div className="space-y-6">
      {/* Header & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-4">
          <div>
            <h2 className="text-xl font-black text-foreground tracking-tight">{lang === "ta" ? "மக்கள் யோசனைகள்" : "Public Ideas"}</h2>
            <p className="text-sm text-muted-foreground mt-1">{lang === "ta" ? "மாநில வளர்ச்சிக்கான உங்கள் யோசனைகளை முன்வையுங்கள்" : "Put forward your ideas for the development of the state"}</p>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
            style={{ background: "#C8102E", color: "#fff" }}
          >
            <Plus size={20} strokeWidth={3} />
            {lang === "ta" ? "யோசனை சேர்க்க" : "Submit Idea"}
          </button>
        </div>

        {/* Analytics Chart */}
        <div className="lg:col-span-8 h-[160px] bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-4 flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">{lang === "ta" ? "யோசனை வகை" : "Ideas by Category"}</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(200,16,46,0.05)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }}
              />
              <Bar dataKey="count" fill="#C8102E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Submit form */}
      {showForm && (
        <div className="rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-md p-6 space-y-4 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-foreground">{lang === "ta" ? "புதிய யோசனை" : "New Idea"}</h3>
            <button onClick={() => setShowForm(false)} className="p-2 rounded-full hover:bg-muted/50"><X size={20} className="text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full border border-border/50 rounded-xl px-4 py-3 text-sm bg-muted/20 text-foreground focus:outline-none focus:border-primary transition-all shadow-none"
              placeholder={lang === "ta" ? "யோசனையின் தலைப்பு..." : "Idea title..."}
              value={newIdea.title}
              onChange={e => setNewIdea(v => ({ ...v, title: e.target.value }))}
            />
            <select
              className="w-full border border-border/50 rounded-xl px-4 py-3 text-sm bg-muted/20 text-foreground focus:outline-none focus:border-primary transition-all shadow-none appearance-none"
              value={newIdea.category}
              onChange={e => setNewIdea(v => ({ ...v, category: e.target.value as IdeaCategory }))}
            >
              {categories.filter(c => c !== "all").map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <textarea
            className="w-full border border-border/50 rounded-xl px-4 py-3 text-sm bg-muted/20 text-foreground focus:outline-none focus:border-primary transition-all shadow-none resize-none"
            rows={4}
            placeholder={lang === "ta" ? "உங்கள் யோசனையை விவரமாக எழுதுங்கள்..." : "Describe your idea in detail..."}
            value={newIdea.description}
            onChange={e => setNewIdea(v => ({ ...v, description: e.target.value }))}
          />
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setShowForm(false)} className="px-6 py-2.5 text-sm font-bold rounded-xl border border-border text-muted-foreground hover:bg-muted/50 transition-colors">
              {lang === "ta" ? "ரத்து" : "Cancel"}
            </button>
            <button onClick={submitIdea} className="px-8 py-2.5 text-sm rounded-xl font-black transition-all active:scale-[0.98] shadow-lg shadow-secondary/20" style={{ background: "#F4C430", color: "#1A1A1A" }}>
              {lang === "ta" ? "சமர்ப்பி" : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center sticky top-0 z-10 py-2 bg-background/80 backdrop-blur-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full border border-border/50 rounded-2xl pl-12 pr-4 py-3 text-sm bg-muted/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-none"
            placeholder={lang === "ta" ? "யோசனைகளை தேடுங்கள்..." : "Search ideas..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border border-border/50 rounded-xl px-4 py-3 text-xs font-bold bg-card/40 text-foreground focus:outline-none focus:border-primary"
          value={filter}
          onChange={e => setFilter(e.target.value as IdeaCategory | "all")}
        >
          {categories.map(c => <option key={c} value={c}>{c === "all" ? (lang === "ta" ? "அனைத்து வகைகளும்" : "All Categories") : c}</option>)}
        </select>
        <select
          className="border border-border/50 rounded-xl px-4 py-3 text-xs font-bold bg-card/40 text-foreground focus:outline-none focus:border-primary"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as IdeaStatus | "all")}
        >
          {(["all", "new", "under_review", "approved", "implemented"] as const).map(s => (
            <option key={s} value={s}>{s === "all" ? (lang === "ta" ? "அனைத்து நிலைகளும்" : "All Status") : STATUS_COLORS[s]?.label}</option>
          ))}
        </select>
      </div>

      {/* Ideas list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground font-medium">{lang === "ta" ? "யோசனைகள் எதுவும் கிடைக்கவில்லை" : "No ideas found"}</div>
        )}
        {filtered.sort((a, b) => b.upvotes - a.upvotes).map(idea => (
          <div key={idea.id} className="group relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-5 flex gap-5 items-start cursor-pointer hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all active:scale-[0.99] duration-300" onClick={() => onSelect?.(idea.id)}>
            {/* Upvote */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <button
                onClick={e => { e.stopPropagation(); toggleUpvote(idea.id); }}
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all border shadow-sm group-hover:scale-110 active:scale-90"
                style={upvoted.includes(idea.id)
                  ? { background: "#F4C430", borderColor: "#C8102E", color: "#1A1A1A" }
                  : { background: "rgba(255,255,255,0.03)", borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }
                }
              >
                <ArrowUp size={20} strokeWidth={3} />
              </button>
              <span className="text-sm font-black text-foreground">{idea.upvotes.toLocaleString()}</span>
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: "rgba(200,16,46,0.1)", color: "#C8102E" }}>
                  {idea.category}
                </span>
                <StatusBadge status={idea.status} />
                <span className="text-[10px] font-bold text-muted-foreground ml-auto uppercase tracking-wide">{idea.district} · {idea.date}</span>
              </div>
              <h3 className="font-black text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                {lang === "ta" ? idea.title_ta : idea.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {lang === "ta" ? idea.description_ta : idea.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/30">
                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">by {idea.author}</span>
                {idea.tags.map(t => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-md bg-muted/50 text-muted-foreground font-bold tracking-tight">#{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// POLICY VOTING TAB
// ─────────────────────────────────────────────────────────────
function PoliciesTab({ lang, onSelect }: { lang: string; onSelect?: (id: string) => void }) {
  const { toast } = useToast();
  const [votes, setVotes] = useState<Record<string, "for" | "against">>(() => {
    try { return JSON.parse(localStorage.getItem("ph_policy_votes") || "{}"); } catch { return {}; }
  });
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(mockPolicies.map(p => [p.id, { for: p.votesFor, against: p.votesAgainst }]))
  );

  const vote = (policyId: string, choice: "for" | "against") => {
    if (votes[policyId]) {
      toast({ variant: "destructive", title: lang === "ta" ? "ஏற்கனவே வாக்களித்துவிட்டீர்கள்" : "Already Voted", description: lang === "ta" ? "இந்த கொள்கையில் நீங்கள் ஏற்கனவே வாக்களித்துவிட்டீர்கள்." : "You have already voted on this policy." });
      return;
    }
    const next = { ...votes, [policyId]: choice };
    setVotes(next);
    localStorage.setItem("ph_policy_votes", JSON.stringify(next));
    setCounts(prev => ({
      ...prev,
      [policyId]: {
        ...prev[policyId],
        [choice === "for" ? "for" : "against"]: prev[policyId][choice === "for" ? "for" : "against"] + 1
      }
    }));
    toast({ title: lang === "ta" ? "வாக்கு பதிவாயிற்று!" : "Vote Recorded!", description: choice === "for" ? (lang === "ta" ? "நீங்கள் ஆதரவாக வாக்களித்தீர்கள்" : "You voted in favour") : (lang === "ta" ? "நீங்கள் எதிராக வாக்களித்தீர்கள்" : "You voted against") });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-foreground tracking-tight">{lang === "ta" ? "கொள்கை வாக்கெடுப்பு" : "Policy Voting"}</h2>
        <p className="text-sm text-muted-foreground mt-1">{lang === "ta" ? "அரசு கொள்கை முன்மொழிவுகளில் வாக்களியுங்கள்" : "Vote on government policy proposals"}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPolicies.map(policy => {
          const c = counts[policy.id];
          const total = c.for + c.against;
          const forPct = total ? Math.round((c.for / total) * 100) : 50;
          const userVote = votes[policy.id];
          const statusKey = policy.status === "implemented" ? "implemented_pol" : policy.status;

          const chartData = [
            { name: "For", value: c.for, color: "#16a34a" },
            { name: "Against", value: c.against, color: "#ef4444" }
          ];

          return (
            <div key={policy.id} className="group relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-5 space-y-4 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300" onClick={() => onSelect?.(policy.id)}>
              <div className="flex flex-wrap items-start gap-3 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: "rgba(200,16,46,0.1)", color: "#C8102E" }}>
                      {policy.tag}
                    </span>
                    <StatusBadge status={statusKey} />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{lang === "ta" ? policy.title_ta : policy.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{lang === "ta" ? policy.description_ta : policy.description}</p>
                </div>
              </div>

              {/* Vote bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span style={{ color: "#16a34a" }}>{lang === "ta" ? "ஆதரவு" : "For"} — {c.for.toLocaleString()} ({forPct}%)</span>
                  <span style={{ color: "#dc2626" }}>{lang === "ta" ? "எதிர்ப்பு" : "Against"} — {c.against.toLocaleString()} ({100 - forPct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${forPct}%`, background: "#16a34a" }} />
                </div>
              </div>

              {/* Vote buttons */}
              {policy.status === "active" ? (
                userVote ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 size={14} className="text-green-500" />
                    {lang === "ta" ? `நீங்கள் "${userVote === "for" ? "ஆதரவாக" : "எதிராக"}" வாக்களித்தீர்கள்` : `You voted ${userVote === "for" ? "in favour" : "against"}`}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); vote(policy.id, "for"); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors"
                      style={{ borderColor: "#16a34a", color: "#16a34a" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#16a34a"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "#16a34a"; }}
                    >
                      <ThumbsUp size={14} /> {lang === "ta" ? "ஆதரவு" : "Support"}
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); vote(policy.id, "against"); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors"
                      style={{ borderColor: "#dc2626", color: "#dc2626" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#dc2626"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "#dc2626"; }}
                    >
                      <ThumbsDown size={14} /> {lang === "ta" ? "எதிர்ப்பு" : "Oppose"}
                    </button>
                    <span className="ml-auto text-xs text-muted-foreground self-center">
                      {lang === "ta" ? `கடைசி நாள்: ${policy.deadline}` : `Deadline: ${policy.deadline}`}
                    </span>
                  </div>
                )
              ) : (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <AlertCircle size={13} />
                  {lang === "ta" ? "வாக்கெடுப்பு முடிந்தது" : "Voting closed"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SERVICE RATINGS TAB
// ─────────────────────────────────────────────────────────────
function RatingsTab({ lang, onSelect }: { lang: string; onSelect?: (id: string) => void }) {
  const { toast } = useToast();
  const [userRatings, setUserRatings] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem("ph_svc_ratings") || "{}"); } catch { return {}; }
  });
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("ph_svc_submitted") || "[]"); } catch { return []; }
  });
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const submit = (serviceId: string) => {
    if (!userRatings[serviceId]) {
      toast({ variant: "destructive", title: lang === "ta" ? "மதிப்பீடு தேர்ந்தெடுக்கவும்" : "Select a rating", description: lang === "ta" ? "நட்சத்திரத்தை தேர்ந்தெடுக்கவும்" : "Please select a star rating first." });
      return;
    }
    const next = [...submitted, serviceId];
    setSubmitted(next);
    localStorage.setItem("ph_svc_submitted", JSON.stringify(next));
    localStorage.setItem("ph_svc_ratings", JSON.stringify(userRatings));
    setActiveForm(null);
    toast({ title: lang === "ta" ? "மதிப்பீடு பதிவாயிற்று!" : "Rating Submitted!", description: lang === "ta" ? "உங்கள் மதிப்பீட்டிற்கு நன்றி." : "Thank you for your feedback." });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-foreground tracking-tight">{lang === "ta" ? "அரசு சேவைகளை மதிப்பிடுங்கள்" : "Rate Government Services"}</h2>
          <p className="text-sm text-muted-foreground">{lang === "ta" ? "உங்கள் அனுபவத்தை பகிர்ந்து சேவைகளை மேம்படுத்த உதவுங்கள்" : "Share your experience and help improve state services"}</p>
        </div>
        <div className="flex items-center gap-4 bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl px-6 py-3">
          <div className="text-right">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">{lang === "ta" ? "மொத்த மதிப்பீடுகள்" : "Global Avg"}</div>
            <div className="text-xl font-black text-primary leading-none">4.2 <span className="text-[10px] text-muted-foreground">/ 5.0</span></div>
          </div>
          <div className="w-px h-8 bg-border/50" />
          <StarDisplay rating={4.2} size={16} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockServiceRatings.map(svc => {
          const done = submitted.includes(svc.serviceId);
          const currentRating = userRatings[svc.serviceId] || 0;
          const isFormOpen = activeForm === svc.serviceId;

          return (
            <div
              key={svc.serviceId}
              className={`group relative rounded-3xl border transition-all duration-500 overflow-hidden ${activeForm === svc.serviceId ? "border-primary/40 bg-card/80 ring-1 ring-primary/10" : "border-border/50 bg-card/40 hover:border-primary/30"
                }`}
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

              <div className="relative p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-inner">
                      {getDepartmentIcon(svc.department, 24)}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
                        {lang === "ta" ? svc.serviceName_ta : svc.serviceName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
                          {svc.department}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <div className="text-2xl font-black text-foreground">{svc.avgRating.toFixed(1)}</div>
                    <StarDisplay rating={svc.avgRating} size={12} />
                    <div className="text-[9px] font-bold text-muted-foreground uppercase mt-1 tracking-tighter">
                      {svc.totalRatings.toLocaleString()} {lang === "ta" ? "மதிப்பீடுகள்" : "reviews"}
                    </div>
                  </div>
                </div>

                {/* Pie Chart Distribution */}
                <div className="relative h-[200px] py-4 border-y border-border/20">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[5, 4, 3, 2, 1].map(s => {
                          const row = svc.breakdown.find(b => b.stars === s) || { stars: s, count: 0 };
                          return {
                            name: lang === "ta" ? `${s} நட்சத்திரங்கள்` : `${s} Stars`,
                            value: row.count,
                            stars: s
                          };
                        })}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {[5, 4, 3, 2, 1].map((s, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={s >= 4 ? "#16a34a" : (s === 3 ? "#facc15" : "#ef4444")}
                            className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: '16px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                          fontSize: '12px',
                          color: '#fff'
                        }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center Text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-3xl font-black text-foreground leading-none tracking-tighter">
                      {svc.avgRating.toFixed(1)}
                    </div>
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">
                      {lang === "ta" ? "மதிப்பீடு" : "Rating"}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-2">
                  {done ? (
                    <div className="flex items-center justify-center gap-4 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl animate-in fade-in zoom-in duration-500">
                      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
                        <Check size={20} strokeWidth={4} />
                      </div>
                      <div>
                        <div className="text-sm font-black text-foreground leading-tight">
                          {lang === "ta" ? "உங்கள் மதிப்பீடு சமர்ப்பிக்கப்பட்டது!" : "Submission Successful!"}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">{lang === "ta" ? "உங்கள் மதிப்பீடு:" : "Your rating:"}</span>
                          <StarDisplay rating={currentRating} size={10} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {!isFormOpen ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveForm(svc.serviceId); }}
                          className="w-full py-4 rounded-2xl text-sm font-black transition-all hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-primary/10 flex items-center justify-center gap-2 group/btn"
                          style={{ background: "#C8102E", color: "#fff" }}
                        >
                          <Star size={16} className="group-hover/btn:rotate-[72deg] transition-transform duration-500" />
                          {lang === "ta" ? "இப்போதே மதிப்பிடுங்கள்" : "Rate This Service"}
                        </button>
                      ) : (
                        <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-500">
                          <div className="text-center">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                              {lang === "ta" ? "உங்கள் அனுபவம் எப்படி இருந்தது?" : "How was your experience?"}
                            </p>
                            <StarPicker
                              lang={lang}
                              value={currentRating}
                              onChange={v => setUserRatings(prev => ({ ...prev, [svc.serviceId]: v }))}
                            />
                          </div>

                          {currentRating > 0 && (
                            <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-300">
                              <textarea
                                rows={2}
                                className="w-full border border-border/50 rounded-2xl px-5 py-4 text-sm bg-muted/20 text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/40 font-medium"
                                placeholder={lang === "ta" ? "உங்களுக்கு ஏதேனும் கருத்து உள்ளதா? (விரும்பினால்)..." : "Anything else you'd like to share? (Optional)"}
                                value={feedback[svc.serviceId] || ""}
                                onChange={e => setFeedback(prev => ({ ...prev, [svc.serviceId]: e.target.value }))}
                              />
                              <div className="flex gap-3">
                                <button
                                  onClick={() => setActiveForm(null)}
                                  className="flex-1 py-4 rounded-2xl text-sm font-black border border-border hover:bg-muted/50 transition-colors"
                                >
                                  {lang === "ta" ? "ரத்து" : "Cancel"}
                                </button>
                                <button
                                  onClick={() => submit(svc.serviceId)}
                                  className="flex-[2] py-4 rounded-2xl text-sm font-black transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
                                  style={{ background: "#F4C430", color: "#1A1A1A" }}
                                >
                                  {lang === "ta" ? "மதிப்பீட்டை அனுப்பு" : "Submit Rating"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// FINANCIAL MONITOR TAB
// ─────────────────────────────────────────────────────────────
function FinanceTab({ lang, onSelect }: { lang: string; onSelect?: (id: string) => void }) {
  const [typeFilter, setTypeFilter] = useState<"all" | "release" | "expenditure" | "tender">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "in_progress" | "approved">("all");
  const [search, setSearch] = useState("");

  const totalAllocated = mockTransactions.reduce((a, t) => a + t.amountCrore, 0);
  const totalReleased = mockTransactions.filter(t => t.type === "release").reduce((a, t) => a + t.amountCrore, 0);
  const totalSpent = mockTransactions.filter(t => t.type === "expenditure").reduce((a, t) => a + t.amountCrore, 0);

  const filtered = mockTransactions
    .filter(t => typeFilter === "all" || t.type === typeFilter)
    .filter(t => statusFilter === "all" || t.status === statusFilter)
    .filter(t => !search || t.project.toLowerCase().includes(search.toLowerCase()) || t.department.toLowerCase().includes(search.toLowerCase()));

  // Budget chart data
  const budgetData = [
    { name: lang === "ta" ? "ஒதுக்கப்பட்டது" : "Allocated", amt: totalAllocated, color: "#C8102E" },
    { name: lang === "ta" ? "வெளியிடப்பட்டது" : "Released", amt: totalReleased, color: "#16a34a" },
    { name: lang === "ta" ? "செலவிடப்பட்டது" : "Spent", amt: totalSpent, color: "#F4C430" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-4">
          <div>
            <h2 className="text-xl font-black text-foreground tracking-tight">{lang === "ta" ? "நிதி பரிவர்த்தனை கண்காணிப்பு" : "Financial Transaction Monitor"}</h2>
            <p className="text-sm text-muted-foreground mt-1">{lang === "ta" ? "அரசு திட்டங்களில் நிதி வெளிப்படைத்தன்மை" : "Transparency in government project funding"}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { label: lang === "ta" ? "மொத்த நிதி" : "Total Allocated", value: `₹${(totalAllocated / 100).toFixed(0)}K Cr`, color: "#C8102E", icon: <Landmark size={14} /> },
              { label: lang === "ta" ? "வெளியிடப்பட்டது" : "Released", value: `₹${(totalReleased / 100).toFixed(0)}K Cr`, color: "#16a34a", icon: <TrendingUp size={14} /> },
              { label: lang === "ta" ? "செலவிடப்பட்டது" : "Expended", value: `₹${(totalSpent / 100).toFixed(0)}K Cr`, color: "#F4C430", icon: <Receipt size={14} /> },
            ].map(c => (
              <div key={c.label} className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-4 flex items-center gap-4 transition-all hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}15`, color: c.color }}>
                  {c.icon}
                </div>
                <div>
                  <div className="text-lg font-black" style={{ color: c.color }}>{c.value}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{c.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Variance Chart */}
        <div className="lg:col-span-8 h-[240px] bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">{lang === "ta" ? "நிதி நிலைமை" : "Budget Snapshot"}</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetData} layout="vertical" margin={{ left: 10, right: 30, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} width={80} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }}
              />
              <Bar dataKey="amt" radius={[0, 6, 6, 0]} barSize={32}>
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center sticky top-0 z-10 py-2 bg-background/80 backdrop-blur-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full border border-border/50 rounded-2xl pl-12 pr-4 py-3 text-sm bg-muted/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-none"
            placeholder={lang === "ta" ? "திட்டம் அல்லது துறையை தேடுங்கள்..." : "Search project or department..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="border border-border/50 rounded-xl px-4 py-3 text-xs font-bold bg-card/40 text-foreground" value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)}>
          <option value="all">{lang === "ta" ? "அனைத்து வகைகளும்" : "All Types"}</option>
          <option value="release">{lang === "ta" ? "நிதி வெளியீடு" : "Fund Release"}</option>
          <option value="expenditure">{lang === "ta" ? "செலவு" : "Expenditure"}</option>
          <option value="tender">{lang === "ta" ? "ஒப்பந்தம்" : "Tender"}</option>
        </select>
        <select className="border border-border/50 rounded-xl px-4 py-3 text-xs font-bold bg-card/40 text-foreground" value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}>
          <option value="all">{lang === "ta" ? "அனைத்து நிலைகளும்" : "All Status"}</option>
          <option value="completed">{lang === "ta" ? "நிறைவடைந்தது" : "Completed"}</option>
          <option value="in_progress">{lang === "ta" ? "நடந்துகொண்டிருக்கிறது" : "In Progress"}</option>
          <option value="approved">{lang === "ta" ? "அங்கீகரிக்கப்பட்டது" : "Approved"}</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-card/20 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border/50">
                <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{lang === "ta" ? "திட்டம்" : "Project"}</th>
                <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground hidden md:table-cell">{lang === "ta" ? "துறை" : "Department"}</th>
                <th className="text-right px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{lang === "ta" ? "தொகை" : "Amount"}</th>
                <th className="text-center px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground hidden sm:table-cell">{lang === "ta" ? "வகை" : "Type"}</th>
                <th className="text-center px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{lang === "ta" ? "நிலை" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn, i) => (
                <tr key={txn.id} className={`border-b border-border/30 last:border-b-0 cursor-pointer hover:bg-primary/5 transition-all duration-200 ${i % 2 === 0 ? "" : "bg-card/20"}`} onClick={() => onSelect?.(txn.id)}>
                  <td className="px-5 py-4">
                    <div className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">{lang === "ta" ? txn.project_ta : txn.project}</div>
                    <div className="text-[10px] font-medium text-muted-foreground mt-0.5">{txn.district} · {txn.date}</div>
                    {txn.beneficiaries && <div className="text-[10px] font-bold text-primary flex items-center gap-1 mt-1"><Users size={10} />{txn.beneficiaries}</div>}
                  </td>
                  <td className="px-5 py-4 text-xs font-bold text-muted-foreground hidden md:table-cell">{lang === "ta" ? txn.department_ta : txn.department}</td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-black text-primary">₹{txn.amountCrore.toLocaleString()}</span>
                    <span className="text-[10px] font-black text-muted-foreground"> CR</span>
                  </td>
                  <td className="px-5 py-4 text-center hidden sm:table-cell"><StatusBadge status={txn.type} /></td>
                  <td className="px-5 py-4 text-center"><StatusBadge status={txn.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CAMPAIGNS TAB
// ─────────────────────────────────────────────────────────────
function CampaignsTab({ lang, onSelect }: { lang: string; onSelect?: (id: string) => void }) {
  const { toast } = useToast();
  const [signedCampaigns, setSignedCampaigns] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("ph_signed") || "[]"); } catch { return []; }
  });
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(mockCampaigns.map(c => [c.id, c.currentSignatures]))
  );

  const sign = (id: string) => {
    if (signedCampaigns.includes(id)) return;
    const next = [...signedCampaigns, id];
    setSignedCampaigns(next);
    localStorage.setItem("ph_signed", JSON.stringify(next));
    setCounts(prev => ({ ...prev, [id]: prev[id] + 1 }));
    toast({ title: lang === "ta" ? "கையொப்பமிட்டீர்கள்!" : "Petition Signed!", description: lang === "ta" ? "உங்கள் கையொப்பம் பதிவாயிற்று. நன்றி!" : "Your signature has been recorded. Thank you!" });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-foreground">{lang === "ta" ? "மக்கள் கோரிக்கை பிரச்சாரங்கள்" : "People's Petition Campaigns"}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {lang === "ta"
            ? "10,000 கையொப்பம் → அரசு பதில் அளிக்க வேண்டும் | 5,00,000 கையொப்பம் → சட்டமன்றத்தில் விவாதம்"
            : "10,000 signatures → Government must respond | 5,00,000 signatures → Debate in Assembly"}
        </p>
      </div>

      {/* Summary Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[180px] bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">{lang === "ta" ? "கையொப்பம் போக்கு" : "Signature Trends"}</p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { day: "Mon", count: 4200 }, { day: "Tue", count: 6800 }, { day: "Wed", count: 12000 },
              { day: "Thu", count: 18500 }, { day: "Fri", count: 24000 }, { day: "Sat", count: 32000 }, { day: "Sun", count: 45000 }
            ]}>
              <defs>
                <linearGradient id="colorSign" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C8102E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C8102E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }}
              />
              <Area type="monotone" dataKey="count" stroke="#C8102E" fillOpacity={1} fill="url(#colorSign)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl p-5 flex flex-col justify-center gap-4" style={{ background: "rgba(200,16,46,0.06)", border: "1px solid rgba(200,16,46,0.18)" }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-[11px] font-black text-foreground uppercase tracking-widest">{lang === "ta" ? "10,000 — அரசு பதில்" : "10,000 — Response"}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-[11px] font-black text-foreground uppercase tracking-widest">{lang === "ta" ? "5,00,000 — சட்டமன்றம்" : "5,00,000 — Assembly"}</span>
          </div>
          <p className="text-[10px] leading-relaxed text-muted-foreground mt-2 font-medium">
            {lang === "ta" ? "உங்கள் ஒரு கையொப்பம் பெரிய மாற்றத்தை ஏற்படுத்தும்." : "Your single signature can spark a historic debate."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCampaigns.map(camp => {
          const current = counts[camp.id];
          const target = camp.target;
          const pct = Math.min(100, Math.round((current / target) * 100));
          const isAlreadySigned = signedCampaigns.includes(camp.id);
          const achieved = current >= target;

          return (
            <div key={camp.id} className="group relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-6 space-y-5 cursor-pointer hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300" onClick={() => onSelect?.(camp.id)}>
              {/* Header */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: "rgba(200,16,46,0.1)", color: "#C8102E" }}>
                    {camp.category}
                  </span>
                  <StatusBadge status={camp.status} />
                  <span className="text-[10px] font-bold text-muted-foreground ml-auto uppercase tracking-wide">Ends: {camp.deadline}</span>
                </div>
                <h3 className="font-black text-lg text-foreground group-hover:text-primary transition-colors leading-tight">{lang === "ta" ? camp.title_ta : camp.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{lang === "ta" ? camp.description_ta : camp.description}</p>
              </div>

              {/* Progress Container */}
              <div className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border/30">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary">{current.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Signed</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-foreground">{pct}%</span>
                    <div className="text-[10px] font-medium text-muted-foreground">of {target.toLocaleString()}</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${pct}%`,
                      background: achieved
                        ? "linear-gradient(to right, #C8102E, #F4C430)"
                        : pct > 60
                          ? "linear-gradient(to right, #F4C430, #eab308)"
                          : "#C8102E"
                    }}
                  />
                  {target === 500000 && (
                    <div
                      className="absolute top-0 h-full w-0.5 bg-white/40"
                      style={{ left: `${(10000 / 500000) * 100}%` }}
                    />
                  )}
                </div>
              </div>

              {/* Govt response / outcome */}
              {(camp.govtResponse || camp.outcome) && (
                <div className="rounded-xl p-4 text-xs space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ background: camp.govtResponse ? "rgba(22,163,74,0.08)" : "rgba(200,16,46,0.06)", border: camp.govtResponse ? "1px solid rgba(22,163,74,0.25)" : "1px solid rgba(200,16,46,0.18)" }}>
                  <div className={`flex items-center gap-1.5 font-black uppercase tracking-widest ${camp.govtResponse ? "text-green-700 dark:text-green-400" : "text-primary"}`}>
                    {camp.govtResponse ? <BadgeCheck size={14} /> : <Landmark size={14} />}
                    {camp.govtResponse ? (lang === "ta" ? "அரசு பதில்" : "Govt Response") : (lang === "ta" ? "முடிவு" : "Outcome")}
                  </div>
                  <p className="font-medium leading-relaxed text-foreground opacity-80">{lang === "ta" ? (camp.govtResponse_ta || camp.outcome_ta) : (camp.govtResponse || camp.outcome)}</p>
                </div>
              )}

              {/* Sign button */}
              {camp.status === "active" && (
                isAlreadySigned ? (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 dark:bg-green-900/10 text-xs font-black text-green-600 dark:text-green-400">
                    <CheckCircle2 size={16} /> {lang === "ta" ? "கையொப்பமிட்டீர்கள்" : "Already Signed"}
                  </div>
                ) : (
                  <button
                    onClick={e => { e.stopPropagation(); sign(camp.id); }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-black transition-all active:scale-[0.98] shadow-lg shadow-primary/10"
                    style={{ background: "#C8102E", color: "#fff" }}
                  >
                    <FileSignature size={18} strokeWidth={3} />
                    {lang === "ta" ? "கையொப்பமிடுங்கள்" : "Sign Petition"}
                  </button>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function PeoplesHall() {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("campaigns");
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);

  const handleSelect = (type: Tab) => (id: string) => setSelectedItem({ type, id });

  const tabContent: Record<Tab, React.ReactNode> = {
    ideas: <IdeasTab lang={lang} onSelect={handleSelect("ideas")} />,
    policies: <PoliciesTab lang={lang} onSelect={handleSelect("policies")} />,
    ratings: <RatingsTab lang={lang} onSelect={handleSelect("ratings")} />,
    finance: <FinanceTab lang={lang} onSelect={handleSelect("finance")} />,
    campaigns: <CampaignsTab lang={lang} onSelect={handleSelect("campaigns")} />,
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header */}
      <div className="relative rounded-3xl p-8 overflow-hidden shadow-2xl shadow-primary/10 border border-primary/20" style={{ background: "linear-gradient(135deg, #C8102E 0%, #8b0a1f 100%)" }}>
        {/* Subtle decorative background elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-inner" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
            <Building2 size={40} className="text-yellow-400" />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">{lang === "ta" ? "மக்கள் மன்றம்" : "People's Hall"}</h1>
            <p className="text-base md:text-lg text-white/80 font-medium max-w-2xl leading-tight">
              {lang === "ta"
                ? "உங்கள் கருத்துக்கள் வழியாக ஜனநாயகத்தை வலிமைப்படுத்துங்கள். யோசனைகளை முன்வையுங்கள், திட்டங்களுக்கு வாக்களியுங்கள்."
                : "Strengthening democracy through your voice. Propose ideas, vote on policies, and monitor transparency."}
            </p>
          </div>
        </div>
      </div>

      {/* Modern High-End Tab Switcher */}
      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-2 flex gap-2 overflow-x-auto no-scrollbar shadow-xl shadow-black/5">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex-1 justify-center min-w-fit ${activeTab === tab.id
              ? "bg-primary text-white shadow-lg shadow-primary/30 active:scale-95"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
          >
            <span className={activeTab === tab.id ? "scale-110" : ""}>{tab.icon}</span>
            <span className="hidden lg:inline">{lang === "ta" ? tab.label_ta : tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {tabContent[activeTab]}
      </div>

      {/* Detail Panel */}
      {selectedItem && (
        <DetailPanel
          type={selectedItem.type}
          id={selectedItem.id}
          lang={lang}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* AI FAQ Chatbot */}
      <ChatBot lang={lang} />
    </div>
  );
}
