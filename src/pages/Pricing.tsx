import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    description: "Perfect for trying out CrewDog",
    features: [
      "3 searches per month",
      "Basic company information",
      "Email support",
      "Search history (30 days)"
    ],
    cta: "Current Plan",
    disabled: true
  },
  {
    name: "Pro",
    price: "£9",
    period: "per month",
    description: "For active job seekers",
    features: [
      "25 searches per month",
      "Full company intelligence",
      "Priority email support",
      "Contact recommendations",
      "Search history (1 year)",
      "Export results"
    ],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Business",
    price: "£29",
    period: "per month",
    description: "For recruiters and agencies",
    features: [
      "Unlimited searches",
      "Advanced analytics",
      "API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
      "Dedicated account manager"
    ],
    cta: "Contact Sales"
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect plan for your job search needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-8 h-full flex flex-col relative ${
                  plan.popular 
                    ? 'glass-card border-2 border-primary glow-effect' 
                    : 'glass-card'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    size="lg" 
                    className="w-full magnetic-button"
                    variant={plan.popular ? "default" : "outline"}
                    disabled={plan.disabled}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <Card className="p-8 glass-card max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="font-medium cursor-pointer list-none flex items-center justify-between p-4 rounded-lg hover:bg-muted/50">
                    Can I change plans later?
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="px-4 pb-4 text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time from your account settings.
                  </p>
                </details>

                <details className="group">
                  <summary className="font-medium cursor-pointer list-none flex items-center justify-between p-4 rounded-lg hover:bg-muted/50">
                    What payment methods do you accept?
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="px-4 pb-4 text-muted-foreground">
                    We accept all major credit cards and debit cards through our secure payment processor.
                  </p>
                </details>

                <details className="group">
                  <summary className="font-medium cursor-pointer list-none flex items-center justify-between p-4 rounded-lg hover:bg-muted/50">
                    Is there a refund policy?
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="px-4 pb-4 text-muted-foreground">
                    We offer a 7-day money-back guarantee on all paid plans. Contact support for assistance.
                  </p>
                </details>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}