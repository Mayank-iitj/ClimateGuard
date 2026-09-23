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
        const { data: { user } } = await supabase.auth.getUser();

        let profileData = null;
        let assessmentData = null;

        if (user) {
          const { data: existingProfile } = await supabase.from('msme_profiles').select('*').eq('user_id', user.id).maybeSingle();

          if (existingProfile) {
            profileData = existingProfile;
            const { data: existingAssessment } = await supabase.from('assessments').select('*').eq('msme_id', profileData.id).maybeSingle();
            if (existingAssessment) {
              assessmentData = existingAssessment;
            } else {
              // If profile exists but no assessment, redirect to onboarding too just in case
              router.push('/onboarding/setup');
              return;
            }
          } else {
            // New user, no profile -> redirect to setup
            router.push('/onboarding/setup');
            return;
          }
        } else {
          const { data: fallbackProfile } = await supabase.from('msme_profiles').select('*').limit(1).maybeSingle();
          if (fallbackProfile) {
            profileData = fallbackProfile;
            const { data: fallbackAssessment } = await supabase.from('assessments').select('*').eq('msme_id', profileData.id).maybeSingle();
            assessmentData = fallbackAssessment;
          }
        }

        if (profileData && assessmentData) {
          setData({ profile: profileData, assessment: assessmentData });
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        console.log("Using local robust fallback data for demo.");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      {/* Header section matching Page 5 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">{data.profile.company_name}</h1>
          <p className="text-zinc-400">{data.profile.industry} | {data.profile.location}</p>
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
            <h3 className="text-lg font-bold text-white mb-4">Risks identified</h3>
            <Card className="bg-[#0c0c10]/80 border-white/10 backdrop-blur-md overflow-hidden">
              <div className="divide-y divide-white/5">
                <RiskRow name="Extreme Heat" level="HIGH" colorClass="text-red-400" />
                <RiskRow name="Power Dependence" level="HIGH" colorClass="text-red-400" />
                <RiskRow name="Water Stress" level="MEDIUM-HIGH" colorClass="text-orange-400" />
                <RiskRow name="Supply Disruption" level="MEDIUM" colorClass="text-amber-400" />
              </div>
              <div className="p-4 bg-white/5 text-xs text-zinc-500 font-medium tracking-wide">
                Illustrative model output
              </div>
            </Card>
          </div>
          
        </div>

        {/* Right CTA Area */}
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
          <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 flex items-center justify-center mb-6 border border-fuchsia-500/30">
            <Globe className="w-8 h-8 text-fuchsia-400" />
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-2">Ready to act?</h3>
          <p className="text-zinc-400 text-center text-sm mb-8">Translate this exposure into an actionable business resilience plan.</p>
          
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
    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
      <CardContent className="p-6">
        <h4 className="text-sm font-medium text-zinc-400 mb-4">{title}</h4>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-5xl font-black text-white">{score}</span>
          <span className="text-lg text-zinc-500 font-medium">/ 100</span>
        </div>
        {/* Simple progress bar representation */}
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full ${colorClass}`} style={{ width: `${score}%` }}></div>
        </div>
      </CardContent>
    </Card>
  )
}

function RiskRow({ name, level, colorClass }: { name: string, level: string, colorClass: string }) {
  return (
    <div className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors">
      <span className="text-zinc-300 font-medium">{name}</span>
      <span className={`font-bold text-sm tracking-wide ${colorClass}`}>{level}</span>
    </div>
  )
}
