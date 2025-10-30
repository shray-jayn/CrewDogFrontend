import { API_BASE } from "@/lib/config";
import { getIdentity } from "@/lib/supabase";

export type HistoryItem = {
  id: string;
  jobTitle?: string;
  companyName?: string;
  createdAt?: string;
  jdExcerpt?: string;
  hrContacts?: { name?: string; profileUrl?: string }[];
};

export async function fetchSearchHistory({
  limit = 5,
  cursor,
}: {
  limit?: number;
  cursor?: string | null;
}) {
  const { userId } = await getIdentity();
  if (!userId) return { ok: true, items: [], nextCursor: null };

  const base = API_BASE.replace(/\/$/, "");
  const url = new URL(`${base}/searches`, window.location.origin);
  url.searchParams.set("userId", userId);
  url.searchParams.set("limit", String(limit));
  if (cursor) url.searchParams.set("cursor", cursor);

  const res = await fetch(url.toString(), { credentials: "include" });
  if (!res.ok) throw new Error("History fetch failed");
  return res.json() as Promise<{
    ok: boolean;
    items: HistoryItem[];
    nextCursor: string | null;
  }>;
}
