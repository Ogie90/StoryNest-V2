import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-2xl mx-auto px-5 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ChevronLeft size={16} /> Back
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

      <div className="prose prose-sm text-muted-foreground space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By accessing or using StoryNest, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
          <p>StoryNest creates personalised children's storybooks based on profile information you provide. Stories are generated for personal, non-commercial use.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Content & Intellectual Property</h2>
          <p>Stories generated through StoryNest are licensed to you for personal use. You retain ownership of any personal information or photos you upload.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Payments & Refunds</h2>
          <p>Purchases are processed securely. If you are unsatisfied with your purchase, please contact us within 14 days for a full refund.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Limitation of Liability</h2>
          <p>StoryNest is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Changes to Terms</h2>
          <p>We may update these terms from time to time. Continued use of the service constitutes acceptance of the revised terms.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
          <p>Questions about these terms? Reach us at <span className="text-foreground font-medium">hello@storynest.app</span>.</p>
        </section>
      </div>
    </div>
  </div>
);

export default Terms;
