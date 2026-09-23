import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans selection:bg-fuchsia-500/30">
      <header className="sticky top-0 z-50 px-6 py-4 border-b border-white/5 bg-[#0c0c10]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link href="/" className="flex items-center gap-2 group mr-auto">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ClimateGuard</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Privacy Policy</h1>
        <div className="text-sm text-zinc-500 mb-12">Last Updated: October 15, 2025</div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to ClimateGuard. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              (regardless of where you visit it from) or use our platform, and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. The Data We Collect About You</h2>
            <p>
              Personal data, or personal information, means any information about an individual from which that person can be identified.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              <li><strong>Facility Data:</strong> coordinates, sensor readouts, and operational parameters explicitly provided to the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
              used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal 
              data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br />
              <strong>Email:</strong> privacy@climateguard.ai
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
