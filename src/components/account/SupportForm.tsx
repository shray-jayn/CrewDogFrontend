import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_BASE } from "@/lib/config";

export default function SupportForm({ userEmail }: { userEmail: string }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Contact Support</h2>
      </div>

      <Card className="p-8 glass-card">
        <form
          className="space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = (
              e.currentTarget.querySelector("#supportEmail") as HTMLInputElement
            )?.value?.trim();
            const message = (
              e.currentTarget.querySelector(
                "#supportMessage"
              ) as HTMLTextAreaElement
            )?.value?.trim();
            const topic = (
              e.currentTarget.querySelector(
                "[data-topic]"
              ) as HTMLInputElement | null
            )?.value;

            if (!email || !message) {
              toast.error("Email and message are required.");
              return;
            }

            const fd = new FormData();
            fd.set("email", email);
            fd.set("message", message);
            if (topic) fd.set("topic", topic);

            try {
              const resp = await fetch(
                `${API_BASE.replace(/\/$/, "")}/support`,
                { method: "POST", body: fd }
              );
              if (!resp.ok) throw new Error("Request failed");
              (e.currentTarget as HTMLFormElement).reset();
              toast.success("Message sent! We'll get back to you soon.");
            } catch (err: any) {
              toast.error(err?.message || "Failed to send. Please try again.");
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="supportEmail" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="supportEmail"
              type="email"
              defaultValue={userEmail}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Subject
            </Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {/* data-topic reads the chosen value for the FormData (not shadcn native) */}
                <SelectItem value="technical">
                  <input hidden readOnly value="technical" data-topic />
                  Technical Issue
                </SelectItem>
                <SelectItem value="billing">
                  <input hidden readOnly value="billing" data-topic />
                  Billing Question
                </SelectItem>
                <SelectItem value="feature">
                  <input hidden readOnly value="feature" data-topic />
                  Feature Request
                </SelectItem>
                <SelectItem value="other">
                  <input hidden readOnly value="other" data-topic />
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportMessage">Message</Label>
            <Textarea
              id="supportMessage"
              placeholder="Describe your issue or question..."
              className="min-h-[200px] resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>

        <div className="mt-8 text-center">
          <h3 className="font-semibold mb-2">Need immediate help?</h3>
          <p className="text-sm text-muted-foreground">
            Check our FAQs or visit the support center.
          </p>
        </div>
      </Card>
    </section>
  );
}
