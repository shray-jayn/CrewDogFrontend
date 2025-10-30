// src/services/run.ts
import { API_BASE } from "@/lib/config";

/** Payload we send to n8n */
export type RunPayload = {
  JD?: string; // full job description text (optional)
  JD_link?: string; // job URL (optional)
  includeLeads?: boolean; // extra contacts toggle
};

/** n8n (and other) shapes we can receive back */
export type RunResponse = {
  // common fields
  company?: string;
  website?: string;
  careerPage?: string;
  contacts?: Array<{ name: string; role?: string; linkedIn?: string }>;

  // n8n-specific fields you showed
  company_website?: string;
  sniff_out_clues?: string;
  hr?: Array<{ title: string; link: string }>;

  // allow unknown keys so we don't break on additions
  [k: string]: any;
};

/** Call your backend → n8n webhook (no backend changes needed) */
export async function runSearch(payload: RunPayload): Promise<RunResponse> {
  const res = await fetch(
    `${(API_BASE || "").replace(/\/$/, "")}/n8n/gatecrasher`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        JD: payload.JD || "",
        JD_link: payload.JD_link || "",
        JH_tickbox: payload.includeLeads ? "yes" : "no",
        // mirror old form’s saver flag (kept as "No")
        "Save to the doc file and the spreadsheet? (+10 sec)": "No",
      }),
    }
  );

  // Try to parse JSON; if text, attempt JSON; else return as-is
  const ct = (res.headers.get("content-type") || "").toLowerCase();
  if (ct.includes("application/json")) {
    const data = (await res.json()) as any;
    return Array.isArray(data) ? data[0] || {} : data;
  }

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text } as any;
  }
}

/** Infer a friendly company name if only a website is available */
export function inferCompanyName(opts: { website?: string }) {
  try {
    const u = new URL(String(opts.website || ""));
    const host = u.hostname.replace(/^www\./i, "");
    const base = host.split(".")[0];
    if (!base) return undefined;
    return base.charAt(0).toUpperCase() + base.slice(1);
  } catch {
    return undefined;
  }
}

/** Split "Name - Title | Other" into clean name + role */
export function nameAndRoleFromTitle(title: string) {
  const [namePart, ...rest] = (title || "").split(" - ");
  const name = (namePart || "").trim();
  const role =
    rest
      .join(" - ")
      .replace(/\s*\|\s*/g, " · ")
      .trim() || undefined;
  return { name: name || "Unknown", role };
}

/** Map n8n’s payload into a UI-friendly shape */
export function mapN8nToResults(data: any) {
  const website = data.website || data.company_website || "";
  const contactsFromHr = Array.isArray(data.hr)
    ? data.hr.map((h: any) => {
        const { name, role } = nameAndRoleFromTitle(h.title || "");
        return { name, role, linkedIn: h.link || "" };
      })
    : null;

  const contactsFromContacts = Array.isArray(data.contacts)
    ? data.contacts.map((c: any) => ({
        name: c.name || c.fullName || "Unknown",
        role: c.role || c.title || "",
        linkedIn: c.linkedIn || c.linkedin || c.profileUrl || "",
      }))
    : null;

  return {
    company: data.company || inferCompanyName({ website }) || "Company",
    website,
    careerPage: data.careerPage || "",
    contacts: contactsFromHr || contactsFromContacts || [],
    sniff_out_clues: data.sniff_out_clues || undefined,
  };
}

export type NormalizedResults = ReturnType<typeof mapN8nToResults>;
