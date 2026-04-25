"use client";
import { useState, useEffect } from "react";
import { X, ThumbsUp, Send, MessageCircle, User, Calendar, MapPin, Building2, Star, ArrowUp, BadgeCheck, Landmark } from "lucide-react";
import { mockIdeas, mockPolicies, mockServiceRatings, mockTransactions, mockCampaigns } from "@/data/peoplesHall";
import { mockComments, type Comment } from "@/data/mockComments";
import { useToast } from "@/hooks/use-toast";

type ItemType = "ideas" | "policies" | "ratings" | "finance" | "campaigns";

interface DetailPanelProps {
  type: ItemType;
  id: string;
  lang: string;
  onClose: () => void;
}

function StarRow({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={size} fill={s <= Math.round(rating) ? "#F4C430" : "none"} stroke={s <= Math.round(rating) ? "#C8102E" : "#aaa"} />
      ))}
    </div>
  );
}

function CommentSection({ itemKey, lang }: { itemKey: string; lang: string }) {
  const { toast } = useToast();
  const seed = mockComments[itemKey] || [];
  const [extra, setExtra] = useState<Comment[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const savedExtra = localStorage.getItem(`ph_comments_${itemKey}`);
      if (savedExtra) setExtra(JSON.parse(savedExtra));
      
      const savedLiked = localStorage.getItem("ph_comment_likes");
      if (savedLiked) setLiked(JSON.parse(savedLiked));
      
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        if (u?.name) setName(u.name);
      }
    } catch (e) {}
  }, [itemKey]);

  const all: Comment[] = [...seed, ...extra];

  const toggleLike = (id: string) => {
    const next = liked.includes(id) ? liked.filter(x => x !== id) : [...liked, id];
    setLiked(next);
    localStorage.setItem("ph_comment_likes", JSON.stringify(next));
  };

  const submit = () => {
    if (!text.trim()) return;
    const c: Comment = {
      id: `uc-${Date.now()}`,
      author: name.trim() || (lang === "ta" ? "குடிமகன்" : "Citizen"),
      district: lang === "ta" ? "உங்கள் மாவட்டம்" : "Your District",
      text: text.trim(),
      text_ta: text.trim(),
      date: new Date().toISOString().split("T")[0],
      likes: 0
    };
    const next = [...extra, c];
    setExtra(next);
    localStorage.setItem(`ph_comments_${itemKey}`, JSON.stringify(next));
    setText("");
    toast({ title: lang === "ta" ? "கருத்து சேர்க்கப்பட்டது!" : "Comment added!" });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MessageCircle size={15} style={{ color: "#C8102E" }} />
        <h3 className="font-semibold text-sm text-foreground">
          {lang === "ta" ? `மக்கள் கருத்துகள் (${all.length})` : `People's Comments (${all.length})`}
        </h3>
      </div>

      {all.length === 0 && (
        <p className="text-xs text-muted-foreground py-4 text-center">
          {lang === "ta" ? "இன்னும் கருத்துகள் இல்லை. முதலில் கருத்து இடுங்கள்!" : "No comments yet. Be the first to comment!"}
        </p>
      )}

      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
        {all.map(c => (
          <div key={c.id} className="rounded-xl p-3 space-y-1.5" style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border))" }}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#C8102E", color: "#fff" }}>
                  {c.author[0]}
                </div>
                <span className="text-xs font-semibold text-foreground">{c.author}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-0.5"><MapPin size={9} />{c.district}</span>
              </div>
              <span className="text-xs text-muted-foreground">{c.date}</span>
            </div>
            <p className="text-xs text-foreground leading-relaxed">{lang === "ta" ? c.text_ta : c.text}</p>
            <button
              onClick={() => toggleLike(c.id)}
              className="flex items-center gap-1 text-xs transition-colors"
              style={{ color: liked.includes(c.id) ? "#C8102E" : "hsl(var(--muted-foreground))" }}
            >
              <ThumbsUp size={11} fill={liked.includes(c.id) ? "#C8102E" : "none"} />
              <span>{c.likes + (liked.includes(c.id) ? 1 : 0)}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-3 space-y-2" style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}>
        <p className="text-xs font-semibold text-foreground">{lang === "ta" ? "உங்கள் கருத்தை இடுங்கள்" : "Add your comment"}</p>
        <input
          className="w-full border border-border rounded-lg px-3 py-1.5 text-xs bg-background text-foreground focus:outline-none focus:border-[#C8102E]"
          placeholder={lang === "ta" ? "உங்கள் பெயர் (விரும்பினால்)" : "Your name (optional)"}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="flex gap-2">
          <textarea
            rows={2}
            className="flex-1 border border-border rounded-lg px-3 py-1.5 text-xs bg-background text-foreground focus:outline-none focus:border-[#C8102E] resize-none"
            placeholder={lang === "ta" ? "உங்கள் கருத்தை எழுதுங்கள்..." : "Write your comment..."}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button
            onClick={submit}
            className="px-3 py-1 rounded-lg text-xs font-semibold self-end flex items-center gap-1"
            style={{ background: "#C8102E", color: "#fff" }}
          >
            <Send size={11} /> {lang === "ta" ? "இடு" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

function IdeaDetail({ id, lang }: { id: string; lang: string }) {
  const idea = mockIdeas.find(i => i.id === id);
  if (!idea) return null;
  const statusMap: Record<string, { label: string; label_ta: string; color: string }> = {
    new: { label: "New", label_ta: "புதியது", color: "#3b82f6" },
    under_review: { label: "Under Review", label_ta: "மதிப்பாய்வில்", color: "#eab308" },
    approved: { label: "Approved", label_ta: "அங்கீகரிக்கப்பட்டது", color: "#16a34a" },
    implemented: { label: "Implemented", label_ta: "செயல்படுத்தப்பட்டது", color: "#9333ea" },
  };
  const s = statusMap[idea.status];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(200,16,46,0.1)", color: "#C8102E" }}>{idea.category}</span>
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${s.color}20`, color: s.color }}>
          {lang === "ta" ? s.label_ta : s.label}
        </span>
      </div>
      <h2 className="text-base font-bold text-foreground">{lang === "ta" ? idea.title_ta : idea.title}</h2>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><User size={11} />{idea.author}</span>
        <span className="flex items-center gap-1"><MapPin size={11} />{idea.district}</span>
        <span className="flex items-center gap-1"><Calendar size={11} />{idea.date}</span>
        <span className="flex items-center gap-1" style={{ color: "#C8102E" }}><ArrowUp size={11} />{idea.upvotes.toLocaleString()} {lang === "ta" ? "ஆதரவுகள்" : "upvotes"}</span>
      </div>
      <div className="rounded-xl p-4 text-sm leading-relaxed text-foreground" style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border))" }}>
        {lang === "ta" ? idea.description_ta : idea.description}
      </div>
      {idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {idea.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">#{t}</span>)}
        </div>
      )}
    </div>
  );
}

function PolicyDetail({ id, lang }: { id: string; lang: string }) {
  const policy = mockPolicies.find(p => p.id === id);
  if (!policy) return null;
  const total = policy.votesFor + policy.votesAgainst;
  const forPct = total ? Math.round((policy.votesFor / total) * 100) : 50;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(200,16,46,0.1)", color: "#C8102E" }}>{policy.tag}</span>
        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-muted text-muted-foreground">{lang === "ta" ? policy.department_ta : policy.department}</span>
      </div>
      <h2 className="text-base font-bold text-foreground">{lang === "ta" ? policy.title_ta : policy.title}</h2>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Calendar size={11} />{lang === "ta" ? "தொடக்கம்:" : "From:"} {policy.date}</span>
        <span className="flex items-center gap-1"><Calendar size={11} />{lang === "ta" ? "கடைசி நாள்:" : "Deadline:"} {policy.deadline}</span>
      </div>
      <div className="rounded-xl p-4 text-sm leading-relaxed text-foreground" style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border))" }}>
        {lang === "ta" ? policy.description_ta : policy.description}
      </div>
      <div className="rounded-xl p-4 space-y-2" style={{ border: "1px solid hsl(var(--border))" }}>
        <h3 className="text-sm font-semibold text-foreground">{lang === "ta" ? "வாக்கெடுப்பு முடிவு" : "Vote Results"}</h3>
        <div className="flex justify-between text-xs font-medium">
          <span style={{ color: "#16a34a" }}>{lang === "ta" ? "ஆதரவு" : "For"} — {policy.votesFor.toLocaleString()} ({forPct}%)</span>
          <span style={{ color: "#dc2626" }}>{lang === "ta" ? "எதிர்ப்பு" : "Against"} — {policy.votesAgainst.toLocaleString()} ({100 - forPct}%)</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${forPct}%`, background: "#16a34a" }} />
        </div>
        <div className="text-xs text-muted-foreground text-center">{total.toLocaleString()} {lang === "ta" ? "மொத்த வாக்குகள்" : "total votes"}</div>
      </div>
    </div>
  );
}

function RatingDetail({ id, lang }: { id: string; lang: string }) {
  const svc = mockServiceRatings.find(s => s.serviceId === id);
  if (!svc) return null;
  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-foreground">{lang === "ta" ? svc.serviceName_ta : svc.serviceName}</h2>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <Building2 size={11} />{svc.department}
      </div>
      <div className="rounded-xl p-4 flex items-center gap-4" style={{ border: "1px solid hsl(var(--border))" }}>
        <div className="text-center">
          <div className="text-4xl font-bold" style={{ color: "#C8102E" }}>{svc.avgRating.toFixed(1)}</div>
          <StarRow rating={svc.avgRating} size={16} />
          <div className="text-xs text-muted-foreground mt-1">{svc.totalRatings.toLocaleString()} {lang === "ta" ? "மதிப்பீடுகள்" : "ratings"}</div>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map(s => {
            const row = svc.breakdown.find(b => b.stars === s)!;
            const pct = Math.round((row.count / svc.totalRatings) * 100);
            return (
              <div key={s} className="flex items-center gap-2">
                <span className="text-xs w-4 text-right text-muted-foreground">{s}</span>
                <Star size={10} fill="#F4C430" stroke="#C8102E" />
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s >= 4 ? "#16a34a" : s === 3 ? "#F4C430" : "#dc2626" }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">{pct}% ({row.count.toLocaleString()})</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FinanceDetail({ id, lang }: { id: string; lang: string }) {
  const txn = mockTransactions.find(t => t.id === id);
  if (!txn) return null;
  const typeColors: Record<string, string> = { release: "#3b82f6", expenditure: "#f97316", tender: "#9333ea" };
  const statusColors: Record<string, string> = { completed: "#16a34a", in_progress: "#eab308", approved: "#3b82f6" };
  const typeLabel: Record<string, { en: string; ta: string }> = {
    release: { en: "Fund Release", ta: "நிதி வெளியீடு" },
    expenditure: { en: "Expenditure", ta: "செலவு" },
    tender: { en: "Tender Award", ta: "ஒப்பந்த வழங்கல்" }
  };
  const statusLabel: Record<string, { en: string; ta: string }> = {
    completed: { en: "Completed", ta: "நிறைவடைந்தது" },
    in_progress: { en: "In Progress", ta: "நடந்துகொண்டிருக்கிறது" },
    approved: { en: "Approved", ta: "அங்கீகரிக்கப்பட்டது" }
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${typeColors[txn.type]}20`, color: typeColors[txn.type] }}>
          {lang === "ta" ? typeLabel[txn.type].ta : typeLabel[txn.type].en}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${statusColors[txn.status]}20`, color: statusColors[txn.status] }}>
          {lang === "ta" ? statusLabel[txn.status].ta : statusLabel[txn.status].en}
        </span>
      </div>
      <h2 className="text-base font-bold text-foreground">{lang === "ta" ? txn.project_ta : txn.project}</h2>
      <div className="rounded-xl p-4 space-y-3" style={{ border: "1px solid hsl(var(--border))" }}>
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: "#C8102E" }}>₹{txn.amountCrore.toLocaleString()} <span className="text-lg">Cr</span></div>
          <div className="text-xs text-muted-foreground">{lang === "ta" ? "ஒதுக்கப்பட்ட தொகை" : "Amount Allocated"}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: lang === "ta" ? "துறை" : "Department", value: lang === "ta" ? txn.department_ta : txn.department, icon: <Building2 size={13} /> },
          { label: lang === "ta" ? "மாவட்டம்" : "District", value: txn.district, icon: <MapPin size={13} /> },
          { label: lang === "ta" ? "தேதி" : "Date", value: txn.date, icon: <Calendar size={13} /> },
          { label: lang === "ta" ? "பயனாளிகள்" : "Beneficiaries", value: txn.beneficiaries || "—", icon: <User size={13} /> },
        ].map(row => (
          <div key={row.label} className="rounded-xl p-3 space-y-0.5" style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border))" }}>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">{row.icon}{row.label}</div>
            <div className="text-xs font-semibold text-foreground">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignDetail({ id, lang }: { id: string; lang: string }) {
  const camp = mockCampaigns.find(c => c.id === id);
  if (!camp) return null;
  const pct = Math.min(100, Math.round((camp.currentSignatures / camp.target) * 100));
  const statusLabels: Record<string, { en: string; ta: string; color: string }> = {
    active: { en: "Active", ta: "செயலில்", color: "#16a34a" },
    govt_responded: { en: "Govt Responded", ta: "அரசு பதில் அளித்தது", color: "#16a34a" },
    debate_scheduled: { en: "Assembly Debate Scheduled", ta: "சட்டமன்ற விவாதம் திட்டமிடப்பட்டுள்ளது", color: "#C8102E" },
    closed: { en: "Closed", ta: "மூடப்பட்டது", color: "#6b7280" }
  };
  const sl = statusLabels[camp.status];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(200,16,46,0.1)", color: "#C8102E" }}>{camp.category}</span>
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${sl.color}20`, color: sl.color }}>
          {lang === "ta" ? sl.ta : sl.en}
        </span>
      </div>
      <h2 className="text-base font-bold text-foreground">{lang === "ta" ? camp.title_ta : camp.title}</h2>
      <div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={11} />{lang === "ta" ? "கடைசி நாள்:" : "Deadline:"} {camp.deadline}</div>

      <div className="rounded-xl p-4 text-sm leading-relaxed text-foreground" style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border))" }}>
        {lang === "ta" ? camp.description_ta : camp.description}
      </div>

      <div className="rounded-xl p-4 space-y-2" style={{ border: "1px solid hsl(var(--border))" }}>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold" style={{ color: "#C8102E" }}>{camp.currentSignatures.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">{lang === "ta" ? "இலக்கு" : "Target"}: {camp.target.toLocaleString()} · <strong>{pct}%</strong></span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden relative">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct >= 100 ? "linear-gradient(to right, #C8102E, #F4C430)" : "#C8102E" }} />
        </div>
        <div className="text-xs text-muted-foreground">
          {camp.target === 10000
            ? (lang === "ta" ? "10,000 கையொப்பம் → அரசு பதில் கட்டாயம்" : "10,000 signatures → Government must formally respond")
            : (lang === "ta" ? "5,00,000 கையொப்பம் → சட்டமன்றத்தில் விவாதம்" : "5,00,000 signatures → Debate in Tamil Nadu Assembly")
          }
        </div>
      </div>

      {camp.govtResponse && (
        <div className="rounded-xl p-3 space-y-1" style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)" }}>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700 dark:text-green-400">
            <BadgeCheck size={13} /> {lang === "ta" ? "அரசு பதில்" : "Government Response"}
          </div>
          <p className="text-xs text-muted-foreground">{lang === "ta" ? camp.govtResponse_ta : camp.govtResponse}</p>
        </div>
      )}
      {camp.outcome && !camp.govtResponse && (
        <div className="rounded-xl p-3 text-xs" style={{ background: "rgba(200,16,46,0.06)", border: "1px solid rgba(200,16,46,0.18)" }}>
          <div className="flex items-center gap-1.5 font-semibold" style={{ color: "#C8102E" }}>
            <Landmark size={13} /> {lang === "ta" ? "முடிவு" : "Outcome"}: {lang === "ta" ? camp.outcome_ta : camp.outcome}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DetailPanel({ type, id, lang, onClose }: DetailPanelProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const typeTitle: Record<ItemType, { en: string; ta: string }> = {
    ideas: { en: "Idea Details", ta: "யோசனை விவரங்கள்" },
    policies: { en: "Policy Details", ta: "கொள்கை விவரங்கள்" },
    ratings: { en: "Service Details", ta: "சேவை விவரங்கள்" },
    finance: { en: "Transaction Details", ta: "பரிவர்த்தனை விவரங்கள்" },
    campaigns: { en: "Campaign Details", ta: "பிரச்சாரம் விவரங்கள்" },
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col bg-card overflow-hidden shadow-2xl"
        style={{ width: "min(480px, 100vw)", borderLeft: "2px solid #C8102E" }}
      >
        <div className="flex items-center gap-3 px-4 py-4 shrink-0" style={{ background: "#C8102E" }}>
          <span className="flex-1 text-sm font-bold text-white">{lang === "ta" ? typeTitle[type].ta : typeTitle[type].en}</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors">
            <X size={16} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {type === "ideas"    && <IdeaDetail id={id} lang={lang} />}
          {type === "policies" && <PolicyDetail id={id} lang={lang} />}
          {type === "ratings"  && <RatingDetail id={id} lang={lang} />}
          {type === "finance"  && <FinanceDetail id={id} lang={lang} />}
          {type === "campaigns" && <CampaignDetail id={id} lang={lang} />}

          <div className="border-t border-border" />

          <CommentSection itemKey={id} lang={lang} />
        </div>
      </div>
    </>
  );
}
