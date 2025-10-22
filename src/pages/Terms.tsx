import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
              <h1 className="text-4xl font-bold mb-2">Terms of Use</h1>
              <p className="text-muted-foreground mb-8">Effective date: January 1, 2025</p>

              <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using CrewDog, you accept and agree to be bound by the terms and 
                    provisions of this agreement. If you do not agree to these terms, please do not use our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    CrewDog provides job search analysis services that help identify hiring companies behind 
                    job postings. Results are provided on a best-effort basis and accuracy may vary based on 
                    available information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    When you create an account with us, you must provide accurate and complete information. 
                    You are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Maintaining the security of your account and password</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Use the service for any illegal purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt the service</li>
                    <li>Use automated systems to access the service excessively</li>
                    <li>Share your account credentials with others</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Subscription and Payment</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Paid subscriptions are billed in advance on a monthly or annual basis. You may cancel 
                    your subscription at any time, but refunds are not provided for partial periods.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The service and its original content, features, and functionality are owned by CrewDog 
                    and are protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The service is provided "as is" without warranties of any kind. We do not guarantee that 
                    the service will be uninterrupted, secure, or error-free. Results are provided for 
                    informational purposes and accuracy is not guaranteed.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In no event shall CrewDog be liable for any indirect, incidental, special, consequential, 
                    or punitive damages resulting from your use of the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account immediately, without prior notice, for any breach 
                    of these terms. Upon termination, your right to use the service will cease immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. We will provide notice of significant 
                    changes by posting the new terms on this page.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Questions about these terms should be sent to us through our{" "}
                    <Link to="/support" className="text-primary hover:underline">
                      support page
                    </Link>.
                  </p>
                </section>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}