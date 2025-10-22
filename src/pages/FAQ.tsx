import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const faqs = [
  {
    question: "How does CrewDog work?",
    answer: "CrewDog analyzes job descriptions from LinkedIn to identify the actual hiring company behind recruiter posts. Our AI traces company information, finds direct application routes, and provides contact details for hiring managers."
  },
  {
    question: "What information do I need to provide?",
    answer: "You can provide either a LinkedIn job URL or paste the full job description (minimum 300 characters). The description must include location information for best results."
  },
  {
    question: "How accurate are the results?",
    answer: "Our AI achieves high accuracy by cross-referencing multiple data sources. However, results depend on the quality and completeness of the job description provided."
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes 3 job searches per month. Each search provides company identification, website links, and key contact information."
  },
  {
    question: "Can I search for jobs outside my country?",
    answer: "Yes! CrewDog works with job postings from any location, as long as location information is included in the job description."
  },
  {
    question: "How is this different from LinkedIn Premium?",
    answer: "While LinkedIn Premium helps you see who viewed your profile, CrewDog specifically helps you bypass third-party recruiters to find and contact the actual hiring company directly."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. We don't share your searches with third parties, and we don't store job descriptions beyond what's necessary to process your request."
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer: "If you believe a search returned inaccurate information, please contact our support team. We're constantly improving our algorithms and appreciate feedback."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 md:p-12 glass-card">
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-foreground mb-12">
                Everything you need to know about CrewDog
              </p>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.details
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      {faq.question}
                      <span className="text-primary ml-4 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.details>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-xl bg-muted/30 text-center">
                <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Our support team is here to help
                </p>
                <Link to="/support" className="text-primary hover:underline font-medium">
                  Contact Support →
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}