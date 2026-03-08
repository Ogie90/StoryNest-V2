import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-2xl mx-auto px-5 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ChevronLeft size={16} /> Back
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

      <div className="prose prose-sm text-muted-foreground space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p>We collect information you provide directly: child's name, age, interests, and optional photos. We also collect account information (email, password) and basic usage analytics.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>Your information is used solely to generate personalised stories, improve our service, and communicate with you about your account. We never sell your data to third parties.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Children's Privacy</h2>
          <p>StoryNest is designed for parents and guardians to use on behalf of their children. We do not knowingly collect information directly from children under 13. All child data is managed through parent accounts.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Data Storage & Security</h2>
          <p>Your data is stored securely using industry-standard encryption. Photos and personal information are accessible only to your account.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Data Retention</h2>
          <p>We retain your data as long as your account is active. You can delete your profiles and stories at any time. Account deletion removes all associated data permanently.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Cookies</h2>
          <p>We use essential cookies for authentication and session management. No third-party tracking cookies are used.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data at any time. Contact us to exercise these rights.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
          <p>For privacy-related questions, contact us at <span className="text-foreground font-medium">privacy@storynest.app</span>.</p>
        </section>
      </div>
    </div>
  </div>
);

export default Privacy;
