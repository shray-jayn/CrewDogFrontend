import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Check,
  Sparkles,
  Zap,
  Star,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import faqHeroBg from "@/assets/faq-hero-bg.jpg";
import { gaEvent } from "@/analytics/gtm";

const plans = [
  {
    name: "Free",
    monthlyPrice: "£0",
    annualPrice: "£0",
    period: "forever",
    description: "Perfect for trying out CrewDog",
    icon: Star,
    color: "from-gray-500 to-slate-500",
    features: [
      "3 searches per month",
      "Basic company information",
      "Email support",
      "Search history (30 days)",
    ],
    cta: "Get Started",
    disabled: false,
  },
  {
    name: "Pro",
    monthlyPrice: "£5",
    annualPrice: "£50",
    period: "per month",
    description: "For active job seekers",
    icon: TrendingUp,
    color: "from-primary to-cyan-500",
    features: [
      "25 searches per month",
      "Full company intelligence",
      "Priority email support",
      "Contact recommendations",
      "Search history (1 year)",
      "Export results",
      "Advanced filters",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "pricing_page_view" });
    try {
      gaEvent("pricing_page_view");
    } catch {}
  }, []);

  function handlePlanClick(planName: string, isPaid: boolean) {
    const billing = isAnnual ? "annual" : "monthly";
    const price = plans.find((p) => p.name === planName);
    const amount = isAnnual ? price?.annualPrice : price?.monthlyPrice;

    const payload = { plan: planName, billing, amount };

    (window as any).dataLayer.push({ event: "select_plan_click", ...payload });
    try {
      gaEvent("select_plan_click", payload);
    } catch {}

    if (isPaid) {
      (window as any).dataLayer.push({ event: "checkout_start", ...payload });
      try {
        gaEvent("checkout_start", payload);
      } catch {}
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${faqHeroBg})`,
              filter: "brightness(0.4)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-500/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * 300,
              }}
              animate={{
                y: [null, Math.random() * 300],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ opacity: heroOpacity }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm font-medium mb-4 border border-primary/20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <DollarSign className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent font-semibold">
                Simple Pricing
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-400 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Find the perfect plan for your job search needs.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-4 glass-card px-6 py-3 rounded-full border border-primary/20">
              <span
                className={
                  !isAnnual ? "text-foreground" : "text-muted-foreground"
                }
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isAnnual ? "bg-primary" : "bg-border"
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: isAnnual ? 28 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span
                className={
                  isAnnual ? "text-foreground" : "text-muted-foreground"
                }
              >
                Annual{" "}
                <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto items-stretch">
            {plans.map((plan, i) => {
              const IconComponent = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const isPaid = plan.name !== "Free";

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: plan.popular ? -12 : -8, scale: 1.02 }}
                  className="relative group h-full"
                >
                  {/* Glow */}
                  <motion.div
                    className={`absolute -inset-4 bg-gradient-to-r ${plan.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity`}
                    animate={plan.popular ? { opacity: [0.1, 0.2, 0.1] } : {}}
                    transition={
                      plan.popular ? { duration: 3, repeat: Infinity } : {}
                    }
                  />

                  {/* Badge */}
                  {plan.popular && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                    >
                      <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white text-sm font-semibold shadow-lg flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Most Popular
                      </div>
                    </motion.div>
                  )}

                  <div
                    className={`relative glass-card p-8 rounded-3xl h-full flex flex-col overflow-hidden ${
                      plan.popular
                        ? "border-2 border-primary"
                        : "border border-border/50"
                    }`}
                  >
                    <motion.div
                      className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${plan.color} opacity-5 rounded-full blur-3xl`}
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Icon */}
                    <motion.div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.color} mb-6 self-start shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </motion.div>

                    <h3
                      className={`text-2xl font-bold mb-2 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6 flex items-baseline gap-1">
                      <span className="text-5xl font-bold">{price}</span>
                      <span className="text-muted-foreground">
                        /{isAnnual && isPaid ? "year" : plan.period}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          viewport={{ once: true }}
                          className="flex gap-3"
                        >
                          <Check
                            className={`h-5 w-5 mt-0.5 ${
                              plan.popular
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      size="lg"
                      className="w-full h-12 text-base font-medium magnetic-button"
                      variant={plan.popular ? "default" : "outline"}
                      disabled={plan.disabled}
                      onClick={() => handlePlanClick(plan.name, isPaid)}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
