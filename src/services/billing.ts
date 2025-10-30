import { API_BASE, STRIPE_PUBLISHABLE_KEY } from "@/lib/config";
import { getIdentity } from "@/lib/supabase";

const base = API_BASE.replace(/\/$/, "");

export async function startCheckout() {
  const { userId, email } = await getIdentity();
  if (!userId || !email) throw new Error("Sign in first.");
  const r = await fetch(`${base}/stripe/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId, email }),
  });
  if (!r.ok) throw new Error("Checkout failed");
  const { url } = await r.json();
  if (!url) throw new Error("No checkout URL");
  window.location.href = url;
}

export async function openBillingPortal() {
  const { userId, email } = await getIdentity();
  if (!userId || !email) throw new Error("Sign in first.");
  const r = await fetch(`${base}/stripe/portal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId, email }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data?.url)
    throw new Error(data?.error || "Could not open billing portal");
  window.location.href = data.url;
}

export async function renewNow() {
  const { userId } = await getIdentity();
  if (!userId) throw new Error("Sign in first.");
  const r = await fetch(`${base}/stripe/renew-now`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.error || "Could not renew now");
  return data; // may include client_secret for 3DS
}

export async function cancelSubscription() {
  const { userId } = await getIdentity();
  if (!userId) throw new Error("Sign in first.");
  const r = await fetch(`${base}/stripe/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId }),
  });
  if (r.status === 404) throw new Error("No active subscription to cancel.");
  if (r.status === 409) throw new Error("Cancellation already scheduled.");
  if (!r.ok) {
    const { error } = await r.json().catch(() => ({}));
    throw new Error(error || "Cancel failed");
  }
}

export async function sendCancelFeedback(reason?: string, otherText?: string) {
  const { userId } = await getIdentity();
  if (!userId) throw new Error("Sign in first.");
  await fetch(`${base}/stripe/cancel/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId, reason, otherText }),
  });
}

export async function downgradeToTwoPounds() {
  const { userId } = await getIdentity();
  if (!userId) throw new Error("Sign in first.");
  const r = await fetch(`${base}/stripe/downgrade`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId }),
  });
  if (!r.ok) {
    const { error } = await r.json().catch(() => ({}));
    throw new Error(error || "Could not switch to £2 plan");
  }
}

// Optional helper for 3DS
export async function confirmIfRequired(client_secret?: string) {
  if (!client_secret) return;
  const stripe = (window as any).Stripe?.(STRIPE_PUBLISHABLE_KEY);
  if (!stripe) throw new Error("Stripe.js not loaded");
  const { error, paymentIntent } = await stripe.confirmCardPayment(
    client_secret
  );
  if (error) throw error;
  if (paymentIntent?.status !== "succeeded")
    throw new Error("Payment not completed.");
}
