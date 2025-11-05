// src/services/support.ts
import { N8N_SUPPORT_WEBHOOK } from "@/lib/config";

export type SupportTopic = "technical" | "billing" | "feature" | "other";

export type SendSupportArgs = {
  email: string;
  message: string;
  topic?: SupportTopic;
};

export type SupportPayload = {
  email: string;
  message: string;
  topic: SupportTopic;
  source: string;
  userAgent: string;
  pagePath: string;
  createdAt: string;
};

function buildPayload({
  email,
  message,
  topic,
}: SendSupportArgs): SupportPayload {
  return {
    email,
    message,
    topic: (topic as SupportTopic) || "other",
    source: "crewdog-landing",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    pagePath: typeof window !== "undefined" ? window.location.pathname : "",
    createdAt: new Date().toISOString(),
  };
}

/**
 * Posts a support message to the configured N8N webhook as JSON.
 * Throws on non-2xx responses.
 */
export async function sendSupportMessage(args: SendSupportArgs): Promise<void> {
  if (!N8N_SUPPORT_WEBHOOK) {
    throw new Error("Missing N8N_SUPPORT_WEBHOOK config.");
  }

  const payload = buildPayload(args);

  const resp = await fetch(N8N_SUPPORT_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    throw new Error(txt || `Support webhook error (${resp.status})`);
  }
}
