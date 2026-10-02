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
        const { data: businesses } = await supabase.from('businesses').select('*');

        if (businesses && businesses.length > 0) {
          const bizIds = businesses.map(b => b.id);
          const { data: assessments } = await supabase.from('assessments').select('*').in('business_id', bizIds);
          const { data: projects } = await supabase.from('projects').select('*').in('business_id', bizIds);

          let totalRevenue = 0;
          let avgExposure = 0;
          if (assessments && assessments.length > 0) {
            totalRevenue = assessments.reduce((acc, a) => acc + (Number(a.annual_revenue) || 0), 0);
            avgExposure = assessments.reduce((acc, a) => acc + (a.climate_exposure_score || 0), 0) / assessments.length;
          }

          let totalSavings = 0;
          if (projects && projects.length > 0) {
            totalSavings = projects.reduce((acc, p) => acc + (Number(p.annual_savings_estimate) || 0), 0);
          }

          // Calculate baseline as 15% of revenue scaled by exposure risk
          const baseline = totalRevenue * 0.15 * (avgExposure / 100);
          const mitigated = Math.max(0, baseline - totalSavings);

          // Get unique project titles to list as mitigations
          const uniqueProjects = Array.from(new Set(projects?.map(p => p.title) || []));

          setData({
            baseline_exposure_inr: baseline || 210000,
            mitigated_exposure_inr: mitigated || 70000,
            projects: uniqueProjects
          } as any);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="flex-1 flex items-center justify-center h-[60vh]"><Loader2 className="w-8 h-8 text-rose-600 animate-spin" /></div>;

  const baselineMillions = (data.baseline_exposure_inr / 1000000).toFixed(2);
  const mitigatedMillions = (data.mitigated_exposure_inr / 1000000).toFixed(2);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-[#7c1027]">What happens if the climate shock actually occurs?</h1>
        <p className="text-[#7c1027]/70 max-w-3xl">Illustrative scenario simulation based on your uploaded business conditions. See how taking action changes your financial outcome.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-8 relative">
        {/* Connection Arrow (Desktop) */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
          <ArrowRight className="w-16 h-16 text-[#7c1027]/50" />
        </div>

        {/* BASELINE CARD */}
        <div className="space-y-4">
          <div className="bg-red-500 text-[#7c1027] font-bold text-center py-2 px-4 rounded-t-xl text-sm tracking-widest">
            BASELINE
          </div>
          <Card className="bg-[#efe5d1]/80 border-[#7c1027]/20 rounded-b-xl rounded-t-none border-t-0 shadow-lg h-full backdrop-blur-md">
            <CardContent className="p-8 space-y-8">
              
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-[#7c1027]">Extreme Weather Scenario</h3>
              </div>
              
              <ul className="space-y-4 text-[#7c1027]/80 font-medium">
                <li className="flex justify-between items-center pb-2 border-b border-[#7c1027]/10">
                  Production disruption <TrendingDown className="text-red-500 w-5 h-5" />
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-[#7c1027]/10">
                  Energy demand <TrendingUp className="text-red-500 w-5 h-5" />
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-[#7c1027]/10">
                  Equipment efficiency <TrendingDown className="text-red-500 w-5 h-5" />
                </li>
              </ul>

              <div className="pt-6 mt-6 border-t border-red-500/30">
                <p className="text-sm text-[#7c1027]/70 mb-2 font-medium">Estimated financial exposure:</p>
                <div className="text-6xl font-black text-red-500">${baselineMillions}M<span className="text-lg text-red-500/50 align-top">*</span></div>
              </div>
              
            </CardContent>
          </Card>
        </div>

        {/* AFTER RESILIENCE ACTIONS CARD */}
        <div className="space-y-4">
          <div className="bg-green-600 text-[#7c1027] font-bold text-center py-2 px-4 rounded-t-xl text-sm tracking-widest">
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
                <h3 className="text-xl font-bold text-[#7c1027]">Mitigations Applied</h3>
              </div>
              
              <ul className="space-y-4 text-[#7c1027]/80 font-medium">
                {(data as any).projects && (data as any).projects.length > 0 ? (
                  (data as any).projects.slice(0, 4).map((projTitle: string, i: number) => (
                    <li key={i} className="flex justify-between items-center pb-2 border-b border-[#7c1027]/10">
                      {projTitle}
                    </li>
                  ))
                ) : (
                  <li className="text-[#7c1027]/50 italic">No mitigations applied yet.</li>
                )}
              </ul>

              <div className="pt-6 mt-6 border-t border-green-500/30">
                <p className="text-sm text-[#7c1027]/70 mb-2 font-medium">Estimated exposure:</p>
                <div className="text-6xl font-black text-green-500">${mitigatedMillions}M<span className="text-lg text-green-500/50 align-top">*</span></div>
              </div>
              
            </div>
          </BorderGlow>
        </div>

      </div>

      <div className="flex flex-col items-center pt-16 pb-8 border-t border-[#7c1027]/10">
        <h2 className="text-2xl font-bold text-[#7c1027] mb-6">Resilience changes the financial outcome.</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <StarBorder as={Link as any} href="/finance-pack" color="#f472b6" speed="4s" backgroundColor="#ec4899" textColor="#ffffff" borderColor="#db2777" className="hover:scale-105 transition-transform">
            <span className="font-bold px-4 text-sm tracking-wide">GENERATE FINANCE PACK</span>
          </StarBorder>
        </div>
      </div>
      
    </div>
  )
}
