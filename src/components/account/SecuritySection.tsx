import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Eye, EyeOff, Lock, Shield } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function SecuritySection() {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (busy) return;

    const form = e.currentTarget;
    const cur = (
      form.querySelector("#currentPassword") as HTMLInputElement
    )?.value?.trim();
    const next = (
      form.querySelector("#newPassword") as HTMLInputElement
    )?.value?.trim();
    const confirm = (
      form.querySelector("#confirmPassword") as HTMLInputElement
    )?.value?.trim();

    if (!cur || !next) return toast.error("Both fields are required.");
    if (next !== confirm) return toast.error("Passwords do not match.");
    if (next.length < 6)
      return toast.error("New password must be at least 6 characters.");

    setBusy(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const email = user?.email;
      if (!email) throw new Error("Unable to get user email.");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: cur,
      });
      if (signInError) throw new Error("Incorrect current password.");

      const { error: updateError } = await supabase.auth.updateUser({
        password: next,
      });
      if (updateError) throw updateError;

      (form.querySelector("#currentPassword") as HTMLInputElement).value = "";
      (form.querySelector("#newPassword") as HTMLInputElement).value = "";
      (form.querySelector("#confirmPassword") as HTMLInputElement).value = "";
      toast.success("Password updated successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Security</h2>
      </div>

      <Card className="p-6 glass-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={show ? "text" : "password"}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {busy ? "Updating…" : "Update Password"}
          </Button>
        </form>
      </Card>
    </section>
  );
}
