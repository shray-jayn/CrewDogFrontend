// src/components/run/QuotaBadge.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles, Zap } from "lucide-react";
import { fetchAccountSummary } from "@/services/account";

export default function QuotaBadge() {
  const [plan, setPlan] = useState<"Admin" | "Pro" | "Free">("Free");
  const [cap, setCap] = useState<number>(3);
  const [used, setUsed] = useState<number>(0);
  const [unlimited, setUnlimited] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const s = await fetchAccountSummary();
      const _plan: "Admin" | "Pro" | "Free" = s.unlimited
        ? "Admin"
        : s.pro
        ? "Pro"
        : "Free";
      setPlan(_plan);
      setCap(s.cap);
      setUsed(s.used);
      setUnlimited(!!s.unlimited);
    })();
  }, []);

  const icon =
    plan === "Admin" ? (
      <Crown className="h-4 w-4" />
    ) : plan === "Pro" ? (
      <Zap className="h-4 w-4" />
    ) : (
      <Sparkles className="h-4 w-4" />
    );

  const color =
    plan === "Admin"
      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
      : plan === "Pro"
      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
      : "bg-muted text-muted-foreground";

  return (
    <div className="fixed top-20 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`glass-card px-3 py-2 rounded-full shadow-lg ${color}`}
      >
        <div className="flex items-center gap-2 text-xs font-semibold">
          {icon}
          <span>{plan}</span>
          <span className="opacity-50">•</span>
          <span>{unlimited ? "∞" : `${used}/${cap}`}</span>
        </div>
      </motion.div>
    </div>
  );
}
