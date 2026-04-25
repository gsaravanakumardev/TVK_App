"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  Lightbulb, Vote, Star, Receipt, FileSignature,
  ThumbsUp, ThumbsDown, Check, ChevronRight, ArrowUp,
  Users, AlertCircle, BadgeCheck, Clock, Filter,
  TrendingUp, Building2, Landmark, Search, Plus, X,
  MessageSquare, CheckCircle2, BarChart3, ExternalLink
} from "lucide-react";
import {
  mockIdeas, mockPolicies, mockServiceRatings, mockTransactions, mockCampaigns,
  type Idea, type IdeaCategory, type IdeaStatus
} from "@/data/peoplesHall";
import { useToast } from "@/hooks/use-toast";
import DetailPanel from "@/components/DetailPanel";
import ChatBot from "@/components/ChatBot";

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
        <Star key={s} size={size} fill={s <= Math.round(rating) ? "#F4C430" : "none"} stroke={s <= Math.round(rating) ? "#C8102E" : "#aaa"} />
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s}
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <Star size={22} fill={(hover || value) >= s ? "#F4C430" : "none"} stroke={(hover || value) >= s ? "#C8102E" : "#aaa"} />
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// IDEAS TAB
// ─────────────────────────────────────────────────────────────
function IdeasTab({ lang, onSelect }: { lang: string; onSelect?: (id: string) => void }) {
  const { toast } = useToast();
  const [upvoted, setUpvoted] = useState<string[]>([]);
  const [ideas, setIdeas] = useState(mockIdeas);
  const [filter, setFilter] = useState<IdeaCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<IdeaStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newIdea, setNewIdea] = useState({ title: "", category: "Education" as IdeaCategory, description: "" });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ph_upvoted");
      if (saved) setUpvoted(JSON.parse(saved));
    } catch (e) { }
  }, []);

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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">{lang === "ta" ? "மக்கள் யோசனைகள்" : "Public Ideas"}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{lang === "ta" ? "மாநில வளர்ச்சிக்கான உங்கள் யோசனைகளை முன்வையுங்கள்" : "Put forward your ideas for the development of the state"}</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          style={{ background: "#C8102E", color: "#fff" }}
        >
          <Plus size={15} />
          {lang === "ta" ? "யோசனை சேர்க்க" : "Submit Idea"}
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground">{lang === "ta" ? "புதிய யோசனை" : "New Idea"}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>
          <input
            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:border-[#C8102E]"
            placeholder={lang === "ta" ? "யோசனையின் தலைப்பு..." : "Idea title..."}
            value={newIdea.title}
            onChange={e => setNewIdea(v => ({ ...v, title: e.target.value }))}
          />
          <select
            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:border-[#C8102E]"
            value={newIdea.category}
            onChange={e => setNewIdea(v => ({ ...v, category: e.target.value as IdeaCategory }))}
          >
            {categories.filter(c => c !== "all").map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea
            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:border-[#C8102E] resize-none"
            rows={3}
            placeholder={lang === "ta" ? "உங்கள் யோசனையை விவரமாக எழுதுங்கள்..." : "Describe your idea in detail..."}
            value={newIdea.description}
            onChange={e => setNewIdea(v => ({ ...v, description: e.target.value }))}
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowForm(false)} className="px-3 py-1.5 text-sm rounded-lg border border-border text-muted-foreground hover:bg-muted">
              {lang === "ta" ? "ரத்து" : "Cancel"}
            </button>
            <button onClick={submitIdea} className="px-4 py-1.5 text-sm rounded-lg font-semibold" style={{ background: "#F4C430", color: "#1A1A1A" }}>
              {lang === "ta" ? "சமர்ப்பி" : "Submit"}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full border border-border rounded-lg pl-8 pr-3 py-1.5 text-sm bg-background text-foreground focus:outline-none focus:border-[#C8102E]"
            placeholder={lang === "ta" ? "யோசனைகளை தேடுங்கள்..." : "Search ideas..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border border-border rounded-lg px-2 py-1.5 text-xs bg-background text-foreground focus:outline-none"
          value={filter}
          onChange={e => setFilter(e.target.value as IdeaCategory | "all")}
        >
          {categories.map(c => <option key={c} value={c}>{c === "all" ? (lang === "ta" ? "அனைத்து வகைகளும்" : "All Categories") : c}</option>)}
        </select>
        <select
          className="border border-border rounded-lg px-2 py-1.5 text-xs bg-background text-foreground focus:outline-none"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as IdeaStatus | "all")}
        >
          {(["all", "new", "under_review", "approved", "implemented"] as const).map(s => (
            <option key={s} value={s}>{s === "all" ? (lang === "ta" ? "அனைத்து நிலைகளும்" : "All Status") : STATUS_COLORS[s]?.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">{lang === "ta" ? "யோசனைகள் எதுவும் கிடைக்கவில்லை" : "No ideas found"}</div>
        )}
        {filtered.sort((a, b) => b.upvotes - a.upvotes).map(idea => (
          <div key={idea.id} className="rounded-xl border border-border bg-card p-4 flex gap-4 items-start cursor-pointer hover:border-[#C8102E] transition-colors group" onClick={() => onSelect?.(idea.id)}>
            <div className="flex flex-col items-center gap-1 shrink-0">
              <button
                onClick={e => { e.stopPropagation(); toggleUpvote(idea.id); }}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors border"
                style={upvoted.includes(idea.id)
                  ? { background: "#F4C430", borderColor: "#C8102E", color: "#1A1A1A" }
                  : { borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }
                }
              >
                <ArrowUp size={16} />
              </button>
              <span className="text-xs font-bold text-foreground">{idea.upvotes.toLocaleString()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(200,16,46,0.1)", color: "#C8102E" }}>
                  {idea.category}
                </span>
                <StatusBadge status={idea.status} />
                <span className="text-xs text-muted-foreground ml-auto">{idea.district} · {idea.date}</span>
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1">
                {lang === "ta" ? idea.title_ta : idea.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {lang === "ta" ? idea.description_ta : idea.description}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-muted-foreground">by {idea.author}</span>
                {idea.tags.map(t => (
                  <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">#{t}</span>
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
  const [votes, setVotes] = useState<Record<string, "for" | "against">>({});
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(mockPolicies.map(p => [p.id, { for: p.votesFor, against: p.votesAgainst }]))
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ph_policy_votes");
      if (saved) setVotes(JSON.parse(saved));
    } catch (e) { }
  }, []);

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
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-foreground">{lang === "ta" ? "கொள்கை வாக்கெடுப்பு" : "Policy Voting"}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{lang === "ta" ? "அரசு கொள்கை முன்மொழிவுகளில் வாக்களியுங்கள்" : "Vote on government policy proposals"}</p>
      </div>
      <div className="space-y-4">
        {mockPolicies.map(policy => {
          const c = counts[policy.id];
          const total = c.for + c.against;
          const forPct = total ? Math.round((c.for / total) * 100) : 50;
          const userVote = votes[policy.id];
          const statusKey = policy.status === "implemented" ? "implemented_pol" : policy.status;
          return (
            <div key={policy.id} className="rounded-xl border border-border bg-card p-4 space-y-3 cursor-pointer hover:border-[#C8102E] transition-colors" onClick={() => onSelect?.(policy.id)}>
              <div className="flex flex-wrap items-start gap-2 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(200,16,46,0.1)", color: "#C8102E" }}>
                      {policy.tag}
                    </span>
                    <StatusBadge status={statusKey} />
                    <span className="text-xs text-muted-foreground">{lang === "ta" ? policy.department_ta : policy.department}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{lang === "ta" ? policy.title_ta : policy.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{lang === "ta" ? policy.description_ta : policy.description}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span style={{ color: "#16a34a" }}>{lang === "ta" ? "ஆதரவு" : "For"} — {c.for.toLocaleString()} ({forPct}%)</span>
                  <span style={{ color: "#dc2626" }}>{lang === "ta" ? "எதிர்ப்பு" : "Against"} — {c.against.toLocaleString()} ({100 - forPct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${forPct}%`, background: "#16a34a" }} />
                </div>
              </div>
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
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a] hover:text-white"
                    >
                      <ThumbsUp size={14} /> {lang === "ta" ? "ஆதரவு" : "Support"}
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); vote(policy.id, "against"); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
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
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedRatings = localStorage.getItem("ph_svc_ratings");
      const savedSubmitted = localStorage.getItem("ph_svc_submitted");
      if (savedRatings) setUserRatings(JSON.parse(savedRatings));
      if (savedSubmitted) setSubmitted(JSON.parse(savedSubmitted));
    } catch (e) { }
  }, []);

  const submit = (serviceId: string) => {
    if (!userRatings[serviceId]) {
      toast({ variant: "destructive", title: lang === "ta" ? "மதிப்பீடு தேர்ந்தெடுக்கவும்" : "Select a rating", description: lang === "ta" ? "நட்சத்திரத்தை தேர்ந்தெடுக்கவும்" : "Please select a star rating first." });
      return;
    }
    const next = [...submitted, serviceId];
    setSubmitted(next);
    localStorage.setItem("ph_svc_submitted", JSON.stringify(next));
    localStorage.setItem("ph_svc_ratings", JSON.stringify(userRatings));
    toast({ title: lang === "ta" ? "மதிப்பீடு பதிவாயிற்று!" : "Rating Submitted!", description: lang === "ta" ? "உங்கள் மதிப்பீட்டிற்கு நன்றி." : "Thank you for your feedback." });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-foreground">{lang === "ta" ? "அரசு சேவைகளை மதிப்பிடுங்கள்" : "Rate Government Services"}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{lang === "ta" ? "உங்கள் அனுபவத்தை பகிர்ந்து சேவைகளை மேம்படுத்த உதவுங்கள்" : "Share your experience and help improve services"}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockServiceRatings.map(svc => {
          const done = submitted.includes(svc.serviceId);
          const forPct = (stars: number) => Math.round((stars / svc.totalRatings) * 100);
          return (
            <div key={svc.serviceId} className="rounded-xl border border-border bg-card p-4 space-y-3 cursor-pointer hover:border-[#C8102E] transition-colors" onClick={() => onSelect?.(svc.serviceId)}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{lang === "ta" ? svc.serviceName_ta : svc.serviceName}</h3>
                  <span className="text-xs text-muted-foreground">{svc.department}</span>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold" style={{ color: "#C8102E" }}>{svc.avgRating.toFixed(1)}</div>
                  <StarDisplay rating={svc.avgRating} size={12} />
                  <div className="text-xs text-muted-foreground mt-0.5">{svc.totalRatings.toLocaleString()} {lang === "ta" ? "மதிப்பீடுகள்" : "ratings"}</div>
                </div>
              </div>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map(s => {
                  const row = svc.breakdown.find(b => b.stars === s)!;
                  const pct = forPct(row.count);
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <span className="text-xs w-4 text-right text-muted-foreground">{s}</span>
                      <Star size={10} fill="#F4C430" stroke="#C8102E" />
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s >= 4 ? "#16a34a" : s === 3 ? "#F4C430" : "#dc2626" }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-6">{pct}%</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border pt-3" onClick={e => e.stopPropagation()}>
                {done ? (
                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                    <CheckCircle2 size={13} />
                    {lang === "ta" ? `நீங்கள் ${userRatings[svc.serviceId]} நட்சத்திரம் வழங்கினீர்கள்` : `You rated ${userRatings[svc.serviceId]} star${userRatings[svc.serviceId] > 1 ? "s" : ""}`}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">{lang === "ta" ? "உங்கள் மதிப்பீடு:" : "Your rating:"}</p>
                    <StarPicker
                      value={userRatings[svc.serviceId] || 0}
                      onChange={v => setUserRatings(prev => ({ ...prev, [svc.serviceId]: v }))}
                    />
                    <textarea
                      rows={2}
                      className="w-full border border-border rounded-lg px-3 py-1.5 text-xs bg-background text-foreground focus:outline-none focus:border-[#C8102E] resize-none"
                      placeholder={lang === "ta" ? "கருத்து (விரும்பினால்)..." : "Feedback (optional)..."}
                      value={feedback[svc.serviceId] || ""}
                      onChange={e => setFeedback(prev => ({ ...prev, [svc.serviceId]: e.target.value }))}
                    />
                    <button
                      onClick={() => submit(svc.serviceId)}
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: "#F4C430", color: "#1A1A1A" }}
                    >
                      {lang === "ta" ? "சமர்ப்பி" : "Submit Rating"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-foreground">{lang === "ta" ? "நிதி பரிவர்த்தனை கண்காணிப்பு" : "Financial Transaction Monitor"}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{lang === "ta" ? "அரசு திட்டங்களில் நிதி வெளிப்படைத்தன்மை" : "Transparency in government project funding"}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: lang === "ta" ? "மொத்த நிதி" : "Total Allocated", value: `₹${(totalAllocated / 100).toFixed(0)}K Cr`, color: "#C8102E" },
          { label: lang === "ta" ? "வெளியிடப்பட்டது" : "Released", value: `₹${(totalReleased / 100).toFixed(0)}K Cr`, color: "#16a34a" },
          { label: lang === "ta" ? "செலவிடப்பட்டது" : "Expended", value: `₹${(totalSpent / 100).toFixed(0)}K Cr`, color: "#F4C430" },
        ].map(c => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <div className="text-sm font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full border border-border rounded-lg pl-8 pr-3 py-1.5 text-sm bg-background text-foreground focus:outline-none focus:border-[#C8102E]"
            placeholder={lang === "ta" ? "திட்டம் அல்லது துறையை தேடுங்கள்..." : "Search project or department..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="border border-border rounded-lg px-2 py-1.5 text-xs bg-background text-foreground" value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)}>
          <option value="all">{lang === "ta" ? "அனைத்து வகைகளும்" : "All Types"}</option>
          <option value="release">{lang === "ta" ? "நிதி வெளியீடு" : "Fund Release"}</option>
          <option value="expenditure">{lang === "ta" ? "செலவு" : "Expenditure"}</option>
          <option value="tender">{lang === "ta" ? "ஒப்பந்தம்" : "Tender"}</option>
        </select>
        <select className="border border-border rounded-lg px-2 py-1.5 text-xs bg-background text-foreground" value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}>
          <option value="all">{lang === "ta" ? "அனைத்து நிலைகளும்" : "All Status"}</option>
          <option value="completed">{lang === "ta" ? "நிறைவடைந்தது" : "Completed"}</option>
          <option value="in_progress">{lang === "ta" ? "நடந்துகொண்டிருக்கிறது" : "In Progress"}</option>
          <option value="approved">{lang === "ta" ? "அங்கீகரிக்கப்பட்டது" : "Approved"}</option>
        </select>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">{lang === "ta" ? "திட்டம்" : "Project"}</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden md:table-cell">{lang === "ta" ? "துறை" : "Department"}</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-muted-foreground">{lang === "ta" ? "தொகை" : "Amount"}</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden sm:table-cell">{lang === "ta" ? "வகை" : "Type"}</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">{lang === "ta" ? "நிலை" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn, i) => (
                <tr key={txn.id} className={`border-b border-border last:border-b-0 cursor-pointer hover:bg-[rgba(200,16,46,0.04)] transition-colors ${i % 2 === 0 ? "" : "bg-muted/20"}`} onClick={() => onSelect?.(txn.id)}>
                  <td className="px-3 py-2.5">
                    <div className="font-medium text-xs text-foreground">{lang === "ta" ? txn.project_ta : txn.project}</div>
                    <div className="text-xs text-muted-foreground">{txn.district} · {txn.date}</div>
                    {txn.beneficiaries && <div className="text-xs text-muted-foreground mt-0.5"><Users size={10} className="inline mr-0.5" />{txn.beneficiaries}</div>}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground hidden md:table-cell">{lang === "ta" ? txn.department_ta : txn.department}</td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="text-sm font-bold" style={{ color: "#C8102E" }}>₹{txn.amountCrore.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground"> Cr</span>
                  </td>
                  <td className="px-3 py-2.5 text-center hidden sm:table-cell"><StatusBadge status={txn.type} /></td>
                  <td className="px-3 py-2.5 text-center"><StatusBadge status={txn.status} /></td>
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
  const [signed, setSigned] = useState<string[]>([]);
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(mockCampaigns.map(c => [c.id, c.currentSignatures]))
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ph_signed");
      if (saved) setSigned(JSON.parse(saved));
    } catch (e) { }
  }, []);

  const sign = (id: string) => {
    if (signed.includes(id)) return;
    const next = [...signed, id];
    setSigned(next);
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
      <div className="flex flex-wrap gap-3 p-3 rounded-xl" style={{ background: "rgba(200,16,46,0.06)", border: "1px solid rgba(200,16,46,0.18)" }}>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full" style={{ background: "#F4C430" }} />
          <span className="text-foreground font-medium">{lang === "ta" ? "10,000 — அரசு பதில் கட்டாயம்" : "10,000 — Govt must respond"}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full" style={{ background: "#C8102E" }} />
          <span className="text-foreground font-medium">{lang === "ta" ? "5,00,000 — சட்டமன்றத்தில் விவாதம்" : "5,00,000 — Assembly debate"}</span>
        </div>
      </div>
      <div className="space-y-4">
        {mockCampaigns.map(camp => {
          const current = counts[camp.id];
          const target = camp.target;
          const pct = Math.min(100, Math.round((current / target) * 100));
          const isSigned = signed.includes(camp.id);
          const achieved = current >= target;
          return (
            <div key={camp.id} className="rounded-xl border border-border bg-card p-4 space-y-3 cursor-pointer hover:border-[#C8102E] transition-colors" onClick={() => onSelect?.(camp.id)}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(200,16,46,0.1)", color: "#C8102E" }}>
                      {camp.category}
                    </span>
                    <StatusBadge status={camp.status} />
                    <span className="text-xs text-muted-foreground">{lang === "ta" ? `கடைசி நாள்: ${camp.deadline}` : `Deadline: ${camp.deadline}`}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{lang === "ta" ? camp.title_ta : camp.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{lang === "ta" ? camp.description_ta : camp.description}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold" style={{ color: "#C8102E" }}>{current.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">{lang === "ta" ? "இலக்கு" : "Goal"}: {target.toLocaleString()} · <strong>{pct}%</strong></span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden relative">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: achieved ? "linear-gradient(to right, #C8102E, #F4C430)" : "#C8102E" }} />
                </div>
              </div>
              {camp.status === "active" && (
                isSigned ? (
                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle2 size={14} /> {lang === "ta" ? "நீங்கள் கையொப்பமிட்டீர்கள்" : "You have signed this petition"}
                  </div>
                ) : (
                  <button
                    onClick={e => { e.stopPropagation(); sign(camp.id); }}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
                    style={{ background: "#C8102E", color: "#fff" }}
                  >
                    <FileSignature size={15} />
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

export default function PeoplesHallPage() {
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
    <div className="space-y-4">
      <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: "linear-gradient(135deg, #C8102E 0%, #9c0d23 100%)" }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(244,196,48,0.25)" }}>
          <Landmark size={24} style={{ color: "#F4C430" }} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">{lang === "ta" ? "மக்கள் மன்றம்" : "People's Hall"}</h1>
          <p className="text-sm text-white/75">{lang === "ta" ? "யோசனை சமர்ப்பி · வாக்களி · மதிப்பிடு · நிதி கண்காணி · கையொப்பமிடு" : "Submit Ideas · Vote on Policies · Rate Services · Monitor Finance · Sign Petitions"}</p>
        </div>
      </div>

      <div className="flex gap-1 bg-muted p-1 rounded-xl overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-1 justify-center min-w-fit"
            style={activeTab === tab.id ? { background: "#C8102E", color: "#fff" } : { color: "hsl(var(--muted-foreground))" }}
          >
            {tab.icon}
            <span className="hidden sm:inline">{lang === "ta" ? tab.label_ta : tab.label}</span>
          </button>
        ))}
      </div>

      <div>{tabContent[activeTab]}</div>

      {selectedItem && (
        <DetailPanel
          type={selectedItem.type}
          id={selectedItem.id}
          lang={lang}
          onClose={() => setSelectedItem(null)}
        />
      )}
      <ChatBot lang={lang} />
    </div>
  );
}