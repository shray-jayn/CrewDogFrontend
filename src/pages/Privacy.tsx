import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
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
              <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-muted-foreground mb-8">Effective date: January 1, 2025</p>

              <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide directly to us, including when you create an account, 
                    run job searches, or contact us for support. This may include your name, email address, 
                    and the job descriptions you submit for analysis.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process your job search requests</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not share your personal information with third parties except as described in this policy. 
                    We may share information with service providers who perform services on our behalf, such as 
                    hosting and data analysis.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We take reasonable measures to help protect your personal information from loss, theft, 
                    misuse, unauthorized access, disclosure, alteration, and destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your account information for as long as your account is active or as needed to 
                    provide you services. Search history may be deleted automatically after a specified period.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You have the right to access, update, or delete your personal information at any time 
                    through your account settings. You may also contact us to request deletion of your account.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any changes 
                    by posting the new policy on this page and updating the effective date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this privacy policy, please contact us through our{" "}
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