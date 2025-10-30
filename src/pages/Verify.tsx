// src/pages/Verify.tsx
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function parseHashParams() {
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.substring(1)
    : window.location.hash;
  const params = new URLSearchParams(hash);
  return {
    access_token: params.get("access_token"),
    refresh_token: params.get("refresh_token"),
    type: params.get("type"), // 'signup' | 'email_change' | others
  };
}

export default function Verify() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "ok" | "error" | "skipped">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  const { access_token, refresh_token, type } = useMemo(parseHashParams, []);

  useEffect(() => {
    (async () => {
      try {
        // Guard: only handle signup/email_change events that carry tokens
        if (!access_token || !refresh_token) {
          setStatus("skipped");
          setMessage(
            "Missing tokens in URL. If you already verified, you can continue."
          );
          return;
        }
        if (type !== "signup" && type !== "email_change") {
          setStatus("skipped");
          setMessage(
            "This link is not a verification event. You can continue."
          );
          return;
        }

        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error) throw error;

        // Clean the URL (remove hash tokens)
        if (window.history.replaceState) {
          const clean = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, clean);
        }

        setStatus("ok");
        setMessage(
          type === "signup"
            ? "Email verified successfully. Welcome aboard!"
            : "Your email change has been verified."
        );
        toast.success("Email verified", {
          description: "You’re all set. Continue to the app.",
        });
      } catch (e: any) {
        setStatus("error");
        setMessage(
          e?.message ||
            "Verification failed. The link may be invalid or expired."
        );
        toast.error("Verification failed", {
          description: e?.message ?? "Invalid or expired link.",
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const icon =
    status === "ok" ? (
      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
    ) : status === "error" ? (
      <AlertCircle className="w-6 h-6 text-red-500" />
    ) : (
      <Rocket className="w-6 h-6 text-primary" />
    );

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              {icon}
              <CardTitle>Email Verification</CardTitle>
            </div>
            <CardDescription>Securely activating your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {message || "Processing verification..."}
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            {status === "ok" && (
              <>
                <Link to="/run">
                  <Button>Go to Run</Button>
                </Link>
                <Link to="/account">
                  <Button variant="outline">View Account</Button>
                </Link>
              </>
            )}
            {status === "skipped" && (
              <>
                <Link to="/login">
                  <Button variant="outline">Back to Login</Button>
                </Link>
                <Link to="/run">
                  <Button>Continue</Button>
                </Link>
              </>
            )}
            {status === "error" && (
              <>
                <Link to="/login">
                  <Button variant="outline">Back to Login</Button>
                </Link>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
