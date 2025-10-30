import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Calendar,
  Download,
  History as HistoryIcon,
  Target,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { fetchSearchHistory, type HistoryItem } from "@/services/history";

export default function SearchHistory() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [cursorStack, setCursorStack] = useState<(string | null)[]>([null]); // cursor used to fetch page index
  const [nextCursors, setNextCursors] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(false);

  const toggle = (id: string) =>
    setExpanded((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );

  const loadPage = async (target: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const cursor = cursorStack[target - 1] ?? null;
      const data = await fetchSearchHistory({ limit: 5, cursor });
      setItems(data.items || []);
      const nc = [...nextCursors];
      nc[target - 1] = data.nextCursor ?? null;
      setNextCursors(nc);
      setPage(target);
      if (data.nextCursor && !cursorStack[target]) {
        const ns = [...cursorStack];
        ns[target] = data.nextCursor;
        setCursorStack(ns);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(1);
    // refresh when tab becomes visible
    const vis = () => {
      if (document.visibilityState === "visible") loadPage(1);
    };
    document.addEventListener("visibilitychange", vis);
    // listen for quota/search usage broadcast
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("gc-activity");
      bc.addEventListener("message", (e) => {
        if (e?.data?.type === "search_used") loadPage(1);
      });
    } catch {}
    return () => {
      document.removeEventListener("visibilitychange", vis);
      bc?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canPrev = page > 1;
  const canNext = Boolean(nextCursors[page - 1] || cursorStack[page]);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <HistoryIcon className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Search History</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => canPrev && loadPage(page - 1)}
            disabled={!canPrev || loading}
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => canNext && loadPage(page + 1)}
            disabled={!canNext || loading}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 glass-card text-center">
          <HistoryIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No searches yet</h3>
          <p className="text-muted-foreground mb-6">
            Start your first job search to see it here
          </p>
          <Link to="/run">
            <Button size="lg">
              <Briefcase className="mr-2 h-4 w-4" />
              Run Your First Search
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((it, idx) => {
            const created = it.createdAt
              ? new Date(it.createdAt).toLocaleString()
              : "";
            const status = "Completed";
            return (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="glass-card overflow-hidden">
                  <button
                    onClick={() => toggle(it.id)}
                    className="w-full p-6 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-lg mb-1">
                          {it.jobTitle || "Untitled role"}
                          {it.companyName ? ` — ${it.companyName}` : ""}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {created}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500 border-green-500/20"
                      >
                        {status}
                      </Badge>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded.includes(it.id) ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <svg
                        className="h-5 w-5 text-muted-foreground"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expanded.includes(it.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6"
                      >
                        <Separator className="mb-4" />
                        <div className="p-4 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground mb-1">
                            Job description (excerpt)
                          </p>
                          <p className="text-sm whitespace-pre-wrap">
                            {it.jdExcerpt || "—"}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            View Full Report
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
