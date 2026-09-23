"use client";

import { Card, CardContent } from "@/components/ui/card";
import BorderGlow from "@/components/ui/border-glow";
import { ArrowRight, TrendingDown, TrendingUp, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import StarBorder from "@/components/ui/star-border";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ResiliencePlanPage() {
  const [data, setData] = useState({
    baseline_exposure_inr: 210000,
    mitigated_exposure_inr: 70000
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        let profileData = null;

        if (user) {
          const { data: existingProfile } = await supabase.from('msme_profiles').select('id').eq('user_id', user.id).maybeSingle();
          if (existingProfile) profileData = existingProfile;
        } else {
          const { data: fallbackProfile } = await supabase.from('msme_profiles').select('id').limit(1).maybeSingle();
          if (fallbackProfile) profileData = fallbackProfile;
        }

        if (profileData) {
          const { data: assessment } = await supabase.from('assessments').select('*').eq('msme_id', profileData.id).maybeSingle();
          if (assessment) setData(assessment);
        }
      } catch (err) {
        console.log("Using robust fallback data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="flex-1 flex items-center justify-center h-[60vh]"><Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" /></div>;

  // Format to Lakhs for display (e.g., 210000 -> 2.1)
  const baselineLakhs = (data.baseline_exposure_inr / 100000).toFixed(1);
  const mitigatedLakhs = (data.mitigated_exposure_inr / 100000).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">What happens if the climate shock actually occurs?</h1>
        <p className="text-zinc-400 max-w-3xl">Illustrative scenario simulation based on assumed business conditions. See how taking action changes your financial outcome.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-8 relative">
        {/* Connection Arrow (Desktop) */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
          <ArrowRight className="w-16 h-16 text-zinc-500" />
        </div>

        {/* BASELINE CARD */}
        <div className="space-y-4">
          <div className="bg-red-500 text-white font-bold text-center py-2 px-4 rounded-t-xl text-sm tracking-widest">
            BASELINE
          </div>
          <Card className="bg-[#0c0c10]/80 border-white/10 rounded-b-xl rounded-t-none border-t-0 shadow-lg h-full backdrop-blur-md">
            <CardContent className="p-8 space-y-8">
              
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-white">45°C Heatwave Scenario</h3>
              </div>
              
              <ul className="space-y-4 text-zinc-300 font-medium">
                <li className="flex justify-between items-center pb-2 border-b border-white/5">
                  Production disruption <TrendingDown className="text-red-500 w-5 h-5" />
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-white/5">
                  Energy demand <TrendingUp className="text-red-500 w-5 h-5" />
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-white/5">
                  Equipment efficiency <TrendingDown className="text-red-500 w-5 h-5" />
                </li>
              </ul>

              <div className="pt-6 mt-6 border-t border-red-500/30">
                <p className="text-sm text-zinc-400 mb-2 font-medium">Estimated financial exposure:</p>
                <div className="text-6xl font-black text-red-500">₹{baselineLakhs}L<span className="text-lg text-red-500/50 align-top">*</span></div>
              </div>
              
            </CardContent>
          </Card>
        </div>

        {/* AFTER RESILIENCE ACTIONS CARD */}
        <div className="space-y-4">
          <div className="bg-green-600 text-white font-bold text-center py-2 px-4 rounded-t-xl text-sm tracking-widest">
            AFTER RESILIENCE ACTIONS
          </div>
          
          <BorderGlow
            className="w-full h-full"
            glowColor="140 80 50"
            backgroundColor="#0c0c10"
            colors={['#22c55e', '#10b981', '#3b82f6']}
            animated={false}
          >
            <div className="p-8 space-y-8 relative z-10 h-full">
              
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-white">Mitigations Applied</h3>
              </div>
              
              <ul className="space-y-4 text-zinc-300 font-medium">
                <li className="flex justify-between items-center pb-2 border-b border-white/5">
                  Thermal optimization
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-white/5">
                  Power resilience (Backup systems)
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-white/5">
                  Operational scheduling adjustments
                </li>
              </ul>

              <div className="pt-6 mt-6 border-t border-green-500/30">
                <p className="text-sm text-zinc-400 mb-2 font-medium">Estimated exposure:</p>
                <div className="text-6xl font-black text-green-500">₹{mitigatedLakhs}L<span className="text-lg text-green-500/50 align-top">*</span></div>
              </div>
              
            </div>
          </BorderGlow>
        </div>

      </div>

      <div className="flex flex-col items-center pt-16 pb-8 border-t border-white/5">
        <h2 className="text-2xl font-bold text-white mb-6">Resilience changes the financial outcome.</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <StarBorder as={Link as any} href="/finance-pack" color="#f472b6" speed="4s" backgroundColor="#ec4899" textColor="#ffffff" borderColor="#db2777" className="hover:scale-105 transition-transform">
            <span className="font-bold px-4 text-sm tracking-wide">GENERATE FINANCE PACK</span>
          </StarBorder>
        </div>
      </div>
      
    </div>
  )
}
