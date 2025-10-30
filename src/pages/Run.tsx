// src/pages/Run.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Sparkles,
  Crown,
  ArrowLeft,
  Send,
  Building2,
  Globe,
  Briefcase,
  Users2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/AuthProvider";
import { API_BASE } from "@/lib/config";

// ---- Types for the response you showed ----
type N8nGatecrasherResponse = {
  company?: string;
  company_website?: string;
  sniff_out_clues?: string;
  hr?: Array<{ title?: string; link?: string }>;
};

// Mapped UI shape (same UI you already had, just adapted)
interface SearchResult {
  company: string;
  website: string;
  careerPage?: string | null;
  clues?: string | null;
  contacts: Array<{
    title: string;
    link: string;
  }>;
}

function isAdminUser(user: unknown) {
  const app = (user as any)?.app_metadata ?? {};
  const u = (user as any)?.user_metadata ?? {};
  const role = app.role ?? u.role ?? (user as any)?.role; // last-resort fallback if you had it somewhere custom

  // consider either a role string or a boolean flag in metadata
  return (
    role === "ADMIN" ||
    role === "admin" ||
    app.isAdmin === true ||
    u.isAdmin === true
  );
}

export default function Run() {
  const { user } = useAuth(); // ✅ use real auth; no isAuthenticated flag in ctx
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [includeLeads, setIncludeLeads] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);

  // Simple plan pill: Admin = ∞, otherwise we won’t gate here (server will)
const plan = isAdminUser(user) ? "Admin" : "Member";
const hasUnlimitedSearches = plan === "Admin";

  const getPlanIcon = () => {
    switch (plan) {
      case "Admin":
        return <Crown className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getPlanColor = () => {
    switch (plan) {
      case "Admin":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  async function runSearch() {
    // Build payload compatible with your legacy n8n webhook expectations
    const payload = {
      JD: jobDescription || "",
      JD_link: jobUrl || "",
      JH_tickbox: includeLeads ? "yes" : "no",
      "Save to the doc file and the spreadsheet? (+10 sec)": "No",
    };

    const res = await fetch(`${API_BASE.replace(/\/$/, "")}/n8n/gatecrasher`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || "Failed to run search");
    }

    // The endpoint can return JSON or text; handle both
    let data: any = null;
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct.includes("application/json")) {
      data = await res.json();
    } else {
      const t = await res.text();
      try {
        data = JSON.parse(t);
      } catch {
        // if it isn't JSON, make a minimal object
        data = { raw: t };
      }
    }

    // if array shape, unwrap first (legacy n8n habit)
    const payloadOut: N8nGatecrasherResponse = Array.isArray(data)
      ? data[0]
      : data;

    // Map to UI shape
    const mapped: SearchResult = {
      company: payloadOut.company || "Unknown",
      website: payloadOut.company_website || "",
      careerPage: null, // not returned by the n8n response; leave null or sniff later
      clues: payloadOut.sniff_out_clues || null,
      contacts: (payloadOut.hr || []).map((h) => ({
        title: h.title || "Contact",
        link: h.link || "#",
      })),
    };

    return mapped;
  }

  // Optional helpers to mirror your legacy behavior
  async function consumeOneCredit() {
    try {
      if (!user?.id) return;
      await fetch(`${API_BASE.replace(/\/$/, "")}/account/consume`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
    } catch {
      /* ignore */
    }
  }

  async function logHistory(summary: SearchResult) {
    try {
      if (!user?.id) return;
      await fetch(`${API_BASE.replace(/\/$/, "")}/searches/log`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          sourceType: jobDescription ? "paste" : "url",
          sourceUrl: jobUrl || null,
          includeLeads,
          jdRaw: jobDescription || "",
          jobTitle: null,
          companyName: summary.company || null,
          companyUrl: summary.website || null,
          location: null,
          whyCompany: summary.clues || null,
          hrContacts: summary.contacts.map((c) => ({
            name: c.title,
            profileUrl: c.link,
          })),
        }),
      });
    } catch {
      /* ignore */
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Real auth check (fixes your TS error too)
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to run a search.",
        variant: "destructive",
      });
      return;
    }

    if (!jobUrl && !jobDescription) {
      toast({
        title: "Input Required",
        description: "Please provide either a job URL or description.",
        variant: "destructive",
      });
      return;
    }

    if (jobDescription && jobDescription.length < 300) {
      toast({
        title: "Description Too Short",
        description: "Job description must be at least 300 characters.",
        variant: "destructive",
      });
      return;
    }

    if (jobDescription && !jobDescription.toLowerCase().includes("location")) {
      toast({
        title: "Location Required",
        description: "Please include location information in the description.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Search Started",
      description: "Analyzing job posting with AI...",
    });

    setIsLoading(true);
    try {
      const mapped = await runSearch();
      setResults(mapped);

      // Optional: consume one credit and log history, like the old app
      await Promise.all([consumeOneCredit(), logHistory(mapped)]);

      toast({
        title: "Search Complete! ✨",
        description: "Found company details and key contacts.",
      });
    } catch (err: any) {
      toast({
        title: "Search failed",
        description: err?.message || "Unexpected error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasSearched = results !== null || isLoading;

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <Topbar />

      {/* Floating Plan Badge (now not tied to mock quota) */}
      <div className="fixed top-20 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`glass-card px-3 py-2 rounded-full shadow-lg ${getPlanColor()}`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold">
            {getPlanIcon()}
            <span>{plan}</span>
            {hasUnlimitedSearches && (
              <>
                <span className="opacity-50">•</span>
                <span>∞</span>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <main className="flex-1 flex flex-col relative">
        <div className="container mx-auto px-4 flex-1 flex flex-col py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <AnimatePresence mode="wait">
            {!hasSearched ? (
              // Centered initial view
              <motion.div
                key="centered"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex items-center justify-center"
              >
                <div className="w-full max-w-2xl">
                  {/* Centered Search Form */}
                  <Card className="glass-card p-12 border-primary/10 shadow-2xl backdrop-blur-xl">
                    <div className="mb-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        AI Search Assistant
                      </h1>
                      <p className="text-muted-foreground">
                        Discover companies and key contacts from any job posting
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-5">
                        {/* URL Input */}
                        <div className="group">
                          <label className="block text-sm font-medium mb-2 text-foreground/80">
                            LinkedIn Job URL
                          </label>
                          <div className="relative">
                            <Input
                              type="url"
                              placeholder="https://linkedin.com/jobs/..."
                              value={jobUrl}
                              onChange={(e) => {
                                setJobUrl(e.target.value);
                                if (e.target.value) setJobDescription("");
                              }}
                              className="h-14 text-base pl-4 pr-4 bg-background/60 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/20 focus:border-primary/40 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg"
                              disabled={isLoading}
                            />
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="relative py-4">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gradient-to-r from-transparent via-border to-transparent" />
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-card px-6 py-1.5 text-xs font-semibold text-muted-foreground/60 tracking-wider uppercase rounded-full border border-border/50">
                              Or provide details
                            </span>
                          </div>
                        </div>

                        {/* JD Textarea */}
                        <div className="group">
                          <label className="block text-sm font-medium mb-2 text-foreground/80">
                            Job Description
                          </label>
                          <Textarea
                            placeholder="Paste the complete job description here. Include details like role, requirements, location, and company info for best results..."
                            value={jobDescription}
                            onChange={(e) => {
                              setJobDescription(e.target.value);
                              if (e.target.value) setJobUrl("");
                            }}
                            className="min-h-[160px] resize-none text-base p-4 bg-background/60 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/20 focus:border-primary/40 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg"
                            disabled={isLoading}
                          />
                          {jobDescription && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
                                  <div
                                    className="h-full bg-gradient-to-r from-primary via-primary to-accent transition-all duration-500 rounded-full"
                                    style={{
                                      width: `${Math.min(
                                        (jobDescription.length / 300) * 100,
                                        100
                                      )}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-xs font-semibold text-muted-foreground min-w-[90px] text-right tabular-nums">
                                  {jobDescription.length} / 300
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <div
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    jobDescription.length >= 300
                                      ? "bg-green-500"
                                      : "bg-amber-500"
                                  }`}
                                />
                                <span className="text-muted-foreground">
                                  {jobDescription.length >= 300
                                    ? "Minimum requirement met"
                                    : `${
                                        300 - jobDescription.length
                                      } more characters needed`}
                                </span>
                              </div>
                            </div>
                          )}
                          <p className="mt-2 text-xs text-muted-foreground/70">
                            💡 Tip: Include location information for accurate
                            results
                          </p>
                        </div>
                      </div>

                      {/* Leads toggle */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-primary/[0.07] via-background/50 to-accent/[0.07] border-2 border-primary/10 backdrop-blur-sm hover:border-primary/20 transition-all duration-300">
                          <label className="flex items-center gap-4 cursor-pointer">
                            <div className="relative flex-shrink-0">
                              <input
                                type="checkbox"
                                checked={includeLeads}
                                onChange={(e) =>
                                  setIncludeLeads(e.target.checked)
                                }
                                className="sr-only peer"
                                disabled={isLoading}
                              />
                              <div className="w-14 h-7 bg-muted/80 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-accent transition-all duration-300 shadow-inner" />
                              <div className="absolute left-1 top-1 w-5 h-5 bg-background rounded-full transition-all duration-300 peer-checked:translate-x-7 shadow-lg" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-base mb-0.5 flex items-center gap-2">
                                Include Potential Leads Search
                                <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full">
                                  Pro
                                </span>
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Discover additional decision-makers and
                                influencers beyond the hiring manager
                              </p>
                            </div>
                            <Sparkles className="h-6 w-6 text-primary/70 flex-shrink-0 group-hover:text-primary transition-colors" />
                          </label>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button
                        type="submit"
                        className="w-full h-16 text-lg gap-3 font-bold relative overflow-hidden group bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 rounded-xl"
                        disabled={isLoading || (!jobUrl && !jobDescription)}
                        size="lg"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat group-hover:bg-[position:200%_0,0_0] transition-[background-position] duration-1000" />
                        {isLoading ? (
                          <>
                            <Loader2 className="h-6 w-6 animate-spin relative z-10" />
                            <span className="relative z-10">
                              Analyzing with AI
                            </span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-6 w-6 relative z-10" />
                            <span className="relative z-10">Run AI Search</span>
                            <Send className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Card>
                </div>
              </motion.div>
            ) : (
              // Split view after search
              <motion.div
                key="split"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full"
              >
                {/* Left Column - Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-1"
                >
                  <Card className="glass-card p-6 h-full">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Search Query
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-3">
                        <Input
                          type="url"
                          placeholder="🔗 Job URL"
                          value={jobUrl}
                          onChange={(e) => {
                            setJobUrl(e.target.value);
                            if (e.target.value) setJobDescription("");
                          }}
                          className="h-11 text-sm border-primary/20 bg-background/50"
                          disabled={isLoading}
                        />

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                          </div>
                          <div className="relative flex justify-center text-xs">
                            <span className="bg-card px-2 text-muted-foreground">
                              or
                            </span>
                          </div>
                        </div>

                        <Textarea
                          placeholder="📝 Job description..."
                          value={jobDescription}
                          onChange={(e) => {
                            setJobDescription(e.target.value);
                            if (e.target.value) setJobUrl("");
                          }}
                          className="min-h-[100px] resize-none text-sm border-primary/20 bg-background/50"
                          disabled={isLoading}
                        />
                        {jobDescription && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                                style={{
                                  width: `${Math.min(
                                    (jobDescription.length / 300) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground min-w-[60px] text-right">
                              {jobDescription.length}/300
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Include Leads */}
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={includeLeads}
                              onChange={(e) =>
                                setIncludeLeads(e.target.checked)
                              }
                              className="sr-only peer"
                              disabled={isLoading}
                            />
                            <div className="w-9 h-5 bg-muted rounded-full peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-accent transition-all" />
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-background rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-xs">Include Leads</p>
                            <p className="text-xs text-muted-foreground">
                              Extra contacts
                            </p>
                          </div>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-11 text-sm gap-2 magnetic-button glow-effect"
                        disabled={isLoading || (!jobUrl && !jobDescription)}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            New Search
                          </>
                        )}
                      </Button>
                    </form>
                  </Card>
                </motion.div>

                {/* Right Column - Results */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-2"
                >
                  <AnimatePresence mode="wait">
                    {isLoading && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <Card className="glass-card p-12 h-full flex items-center justify-center">
                          <div className="text-center space-y-6">
                            <div className="relative">
                              <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent animate-glow-pulse flex items-center justify-center">
                                <Loader2 className="h-10 w-10 animate-spin text-primary-foreground" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xl font-semibold">
                                Analyzing with AI
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Extracting company details and key contacts...
                              </p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )}

                    {results && !isLoading && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <Card className="glass-card p-8 h-full">
                          <div className="space-y-8">
                            {/* Company Header */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                  <Building2 className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Company Found
                                  </p>
                                  <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    {results.company}
                                  </h3>
                                </div>
                              </div>
                            </div>

                            {/* Resources */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-primary" />
                                <h4 className="font-semibold text-sm">
                                  Resources
                                </h4>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {results.website && (
                                  <a
                                    href={results.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-primary/20"
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <Globe className="h-4 w-4 text-primary" />
                                      <span className="text-sm font-medium">
                                        Website
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                      Visit company site
                                    </p>
                                  </a>
                                )}
                                {results.careerPage && (
                                  <a
                                    href={results.careerPage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-primary/20"
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <Briefcase className="h-4 w-4 text-primary" />
                                      <span className="text-sm font-medium">
                                        Careers
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                      View open positions
                                    </p>
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Key Contacts */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Users2 className="h-4 w-4 text-primary" />
                                <h4 className="font-semibold text-sm">
                                  Key Contacts
                                </h4>
                              </div>
                              <div className="space-y-3">
                                {results.contacts.map((contact, index) => (
                                  <div
                                    key={index}
                                    className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 hover:border-primary/20 transition-colors"
                                  >
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        <p className="font-semibold mb-1">
                                          {contact.title}
                                        </p>
                                        {contact.link && (
                                          <a
                                            href={contact.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                                          >
                                            View LinkedIn Profile →
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Why/Clues */}
                            {results.clues && (
                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm">
                                  Why this company
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {results.clues}
                                </p>
                              </div>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
