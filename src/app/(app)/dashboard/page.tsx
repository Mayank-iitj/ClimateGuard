"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Globe, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StarBorder from "@/components/ui/star-border";
import { createClient } from "@/utils/supabase/client";

export default function OverviewPage() {
  const router = useRouter();
  const [data, setData] = useState({
    profile: { company_name: "Shakti Foods Pvt. Ltd.", industry: "Food Processing", location: "Indore" },
    assessment: { climate_exposure: 71, operational_resilience: 54, recovery_readiness: 42 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const supabase = createClient();
        const { data: businesses, error: bizError } = await supabase.from('businesses').select('*');
        
        if (businesses && businesses.length > 0) {
          const firstBiz = businesses[0];
          // Get assessments for all businesses
          const bizIds = businesses.map(b => b.id);
          const { data: assessments } = await supabase.from('assessments').select('*').in('business_id', bizIds);
          
          let avgClimate = 0;
          let avgResilience = 0;
          
          if (assessments && assessments.length > 0) {
             avgClimate = Math.round(assessments.reduce((acc, curr) => acc + curr.climate_exposure_score, 0) / assessments.length);
             avgResilience = Math.round(assessments.reduce((acc, curr) => acc + curr.operational_resilience_score, 0) / assessments.length);
          }
          
          setData({ 
            profile: { 
              company_name: "My Portfolio", 
              industry: "Multiple Facilities", 
              location: `${businesses.length} Locations` 
            }, 
            assessment: { 
              climate_exposure: avgClimate || 71, 
              operational_resilience: avgResilience || 54, 
              recovery_readiness: Math.round((avgClimate + avgResilience) / 2) || 42 
            } 
          });
        } else {
          router.push('/onboarding');
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      {/* Header section matching Page 5 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#7c1027]/20 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#7c1027] mb-1">{data.profile.company_name}</h1>
          <p className="text-[#7c1027]/70">{data.profile.industry} | {data.profile.location}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
          Assessment complete <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Content Area (Scores & Risks) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 3 Scorecards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScoreCard title="Climate Exposure" score={data.assessment.climate_exposure} colorClass="bg-red-500" />
            <ScoreCard title="Operational Resilience" score={data.assessment.operational_resilience} colorClass="bg-amber-500" />
            <ScoreCard title="Recovery Readiness" score={data.assessment.recovery_readiness} colorClass="bg-orange-500" />
          </div>

          {/* Risks Identified Section */}
          <div>
            <h3 className="text-lg font-bold text-[#7c1027] mb-4">Risks identified</h3>
            <Card className="bg-[#efe5d1]/80 border-[#7c1027]/20 backdrop-blur-md overflow-hidden">
              <div className="divide-y divide-white/5">
                <RiskRow name="Extreme Heat" level="HIGH" colorClass="text-red-400" />
                <RiskRow name="Power Dependence" level="HIGH" colorClass="text-red-400" />
                <RiskRow name="Water Stress" level="MEDIUM-HIGH" colorClass="text-orange-400" />
                <RiskRow name="Supply Disruption" level="MEDIUM" colorClass="text-amber-400" />
              </div>
              <div className="p-4 bg-[#7c1027]/5 text-xs text-[#7c1027]/50 font-medium tracking-wide">
                Illustrative model output
              </div>
            </Card>
          </div>
          
        </div>

        {/* Right CTA Area */}
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-[#7c1027]/20 bg-gradient-to-br from-white/5 to-transparent">
          <div className="w-16 h-16 rounded-full bg-rose-600/20 flex items-center justify-center mb-6 border border-rose-600/30">
            <Globe className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-xl font-bold text-[#7c1027] text-center mb-2">Ready to act?</h3>
          <p className="text-[#7c1027]/70 text-center text-sm mb-8">Translate this exposure into an actionable business resilience plan.</p>
          
          <StarBorder as={Link as any} href="/resilience-plan" color="#f472b6" speed="4s" backgroundColor="#111116" textColor="#ffffff" borderColor="#333333" className="w-full hover:scale-105 transition-transform">
            <span className="font-bold text-sm px-4">GENERATE RESILIENCE PLAN</span>
          </StarBorder>
        </div>

      </div>
    </div>
  )
}

function ScoreCard({ title, score, colorClass }: { title: string, score: number, colorClass: string }) {
  return (
    <Card className="bg-[#7c1027]/5 border-[#7c1027]/20 backdrop-blur-md">
      <CardContent className="p-6">
        <h4 className="text-sm font-medium text-[#7c1027]/70 mb-4">{title}</h4>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-5xl font-black text-[#7c1027]">{score}</span>
          <span className="text-lg text-[#7c1027]/50 font-medium">/ 100</span>
        </div>
        {/* Simple progress bar representation */}
        <div className="h-2 w-full bg-[#7c1027]/10 rounded-full overflow-hidden">
          <div className={`h-full ${colorClass}`} style={{ width: `${score}%` }}></div>
        </div>
      </CardContent>
    </Card>
  )
}

function RiskRow({ name, level, colorClass }: { name: string, level: string, colorClass: string }) {
  return (
    <div className="flex items-center justify-between p-5 hover:bg-[#7c1027]/5 transition-colors">
      <span className="text-[#7c1027]/80 font-medium">{name}</span>
      <span className={`font-bold text-sm tracking-wide ${colorClass}`}>{level}</span>
    </div>
  )
}
