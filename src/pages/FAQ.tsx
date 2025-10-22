import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does CrewDog work?",
    answer: "CrewDog uses advanced AI to analyze job descriptions from LinkedIn and other platforms to identify the actual hiring company behind recruiter posts. Our system cross-references multiple data sources to trace company information, find direct application routes, and provide contact details for hiring managers and HR personnel."
  },
  {
    question: "What information do I need to provide?",
    answer: "You can provide either a LinkedIn job URL or paste the complete job description. For best results, ensure the description is at least 300 characters and includes location information (city, state, or country). The more detailed the job posting, the more accurate our results will be."
  },
  {
    question: "How accurate are the results?",
    answer: "Our AI achieves over 90% accuracy by cross-referencing multiple data sources including company databases, LinkedIn profiles, and public records. However, results depend on the quality and completeness of the job description provided. We continuously improve our algorithms based on user feedback."
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes 3 job searches per month. Each search provides company identification, official website links, career page URLs, and basic contact information. You also get access to search history for 30 days and email support."
  },
  {
    question: "Can I search for jobs outside my country?",
    answer: "Yes! CrewDog works with job postings from any location worldwide. Our system is designed to handle international job markets and can identify companies across different regions, as long as location information is included in the job description."
  },
  {
    question: "How is this different from LinkedIn Premium?",
    answer: "While LinkedIn Premium helps you see who viewed your profile and provides InMail credits, CrewDog specifically helps you bypass third-party recruiters to find and contact the actual hiring company directly. We focus on revealing the real employer and providing direct application routes."
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We take data security seriously and are fully GDPR compliant. We don't share your searches with third parties, don't sell your data, and only store job descriptions temporarily to process your request. Your search history is private and can be deleted at any time from your account."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and debit cards through our secure payment processor Stripe. All transactions are encrypted and we never store your payment information on our servers."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have access to paid features until the end of your current billing period."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied with CrewDog within the first week, contact our support team and we'll process a full refund, no questions asked."
  },
  {
    question: "How do I upgrade or downgrade my plan?",
    answer: "You can change your plan at any time from your account settings. When upgrading, you'll have immediate access to additional features. When downgrading, changes take effect at the start of your next billing cycle."
  },
  {
    question: "What if I get incorrect results?",
    answer: "If you believe a search returned inaccurate information, please contact our support team with the search details. We'll review the case and may offer a search credit. We're constantly improving our algorithms and greatly appreciate feedback to enhance accuracy."
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background border-b border-border/40">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LDEzMCwyNDYsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium mb-4">
              <HelpCircle className="h-4 w-4 text-primary" />
              <span>Help Center</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              How can we help you?
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome to our Help Center! Here, you'll find answers to frequently asked questions, 
              helpful guides, and useful tips to assist you in getting the most out of CrewDog.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-base glass-card border-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4"
            >
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="text-sm font-medium text-primary uppercase tracking-wider">
                  Support
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">FAQs</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Have questions? We've got answers! Check out our Frequently Asked Questions (FAQs) 
                  to find quick solutions to common queries. Save time and get the information you need 
                  right here.
                </p>
                <Link 
                  to="/support" 
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-6"
                >
                  Contact Support
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* FAQ List */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {filteredFaqs.length > 0 ? (
                  <motion.div
                    key="faq-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <button
                          onClick={() => setExpandedId(expandedId === index ? null : index)}
                          className="w-full text-left p-6 rounded-xl glass-card border border-border hover:border-primary/50 transition-all group"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-medium text-lg pr-4">{faq.question}</span>
                            <ChevronRight 
                              className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                                expandedId === index ? 'rotate-90 text-primary' : ''
                              }`}
                            />
                          </div>
                          
                          <AnimatePresence>
                            {expandedId === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-4 text-muted-foreground leading-relaxed border-t border-border pt-4">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 glass-card rounded-xl p-8"
                  >
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      Try different keywords or{" "}
                      <Link to="/support" className="text-primary hover:underline">
                        contact support
                      </Link>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}