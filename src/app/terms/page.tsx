import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";

export default function TermsOfService() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Terms of Service</h1>
        <div className="text-sm text-zinc-500 mb-12">Last Updated: October 15, 2025</div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the ClimateGuard platform, you agree to be bound by these Terms of Service and all 
              applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from 
              using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on 
              ClimateGuard's website for personal, non-commercial transitory viewing only. This is the grant of a 
              license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on ClimateGuard's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
            <p>
              The materials on ClimateGuard's website and platform are provided on an 'as is' basis. ClimateGuard makes 
              no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
              without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
              or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mt-4">
              Furthermore, ClimateGuard does not warrant or make any representations concerning the accuracy, likely results, 
              or reliability of the use of the materials on its website or otherwise relating to such materials or on any 
              sites linked to this site. Climate predictions are estimations based on data and algorithms, not absolute guarantees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Limitations</h2>
            <p>
              In no event shall ClimateGuard or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
              use the materials on ClimateGuard's website, even if ClimateGuard or a ClimateGuard authorized representative 
              has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Revisions and Errata</h2>
            <p>
              The materials appearing on ClimateGuard's website could include technical, typographical, or photographic errors. 
              ClimateGuard does not warrant that any of the materials on its website are accurate, complete, or current. 
              ClimateGuard may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
