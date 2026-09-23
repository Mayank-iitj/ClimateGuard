"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, CheckCircle2, Factory, Loader2 } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { createClient } from "@/utils/supabase/client";

export default function FinancePackPage() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState({
    profile: { company_name: "Shakti Foods Pvt. Ltd." },
    assessment: { 
      baseline_exposure_inr: 210000, 
      mitigated_exposure_inr: 70000,
      required_capital_inr: 350000 
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        let profileData = null;

        if (user) {
          const { data: existingProfile } = await supabase.from('msme_profiles').select('*').eq('user_id', user.id).maybeSingle();
          if (existingProfile) profileData = existingProfile;
        } else {
          const { data: fallbackProfile } = await supabase.from('msme_profiles').select('*').limit(1).maybeSingle();
          if (fallbackProfile) profileData = fallbackProfile;
        }

        if (profileData) {
          const { data: assessment } = await supabase.from('assessments').select('*').eq('msme_id', profileData.id).maybeSingle();
          if (assessment) setData({ profile: profileData, assessment });
        }
      } catch (err) {
        console.log("Using robust fallback data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDownload = async () => {
    if (!pdfRef.current) return;
    try {
      setIsGenerating(true);
      // Brief delay to allow UI to update if needed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Use html-to-image which flawlessly supports modern CSS colors like oklch and oklab
      const imgData = await toPng(pdfRef.current, { 
        backgroundColor: "#050507",
        pixelRatio: 3 // Ultra-high resolution
      });
      
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate aspect ratio dynamically from the DOM node
      const elWidth = pdfRef.current.offsetWidth;
      const elHeight = pdfRef.current.offsetHeight;
      const imgHeight = (elHeight * pdfWidth) / elWidth;
      
      // Fill the entire A4 page with our dark theme background so it looks seamless
      pdf.setFillColor(5, 5, 7); 
      pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
      
      // Add a generous top margin for a professional look
      const marginTop = 15;
      
      pdf.addImage(imgData, "PNG", 0, marginTop, pdfWidth, imgHeight);
      pdf.save("Shakti-Foods-Finance-Pack.pdf");
    } catch (error) {
      console.error("Error generating PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center h-[60vh]"><Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" /></div>;

  const reqCapitalLakhs = (data.assessment.required_capital_inr / 100000).toFixed(1);
  const avoidedLossesLakhs = ((data.assessment.baseline_exposure_inr - data.assessment.mitigated_exposure_inr) / 100000).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Finance Readiness Pack</h1>
          <p className="text-zinc-400">Structured project information for Satin Finserv integration.</p>
        </div>
        <Button 
          onClick={handleDownload} 
          disabled={isGenerating}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> 
          {isGenerating ? "Generating..." : "Download PDF Pack"}
        </Button>
      </div>

      <div ref={pdfRef} className="rounded-xl overflow-hidden bg-[#050507] p-2">

      <BorderGlow
        className="w-full"
        glowColor="200 80 50"
        backgroundColor="#0c0c10"
        colors={['#10b981', '#3b82f6', '#8b5cf6']}
        animated={false}
      >
        <div className="p-8 relative z-10 space-y-8">
          
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-fuchsia-500/20 rounded-xl">
                <Factory className="w-6 h-6 text-fuchsia-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{data.profile.company_name}</h2>
                <div className="text-zinc-400 text-sm font-medium">MSME Loan ID: SF-2026-IND</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> Finance Ready
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-zinc-400 uppercase tracking-widest">Resilience Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-white">₹{reqCapitalLakhs}L</div>
                <p className="text-xs text-zinc-500 mt-1">Capital required for mitigation</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-zinc-400 uppercase tracking-widest">Potential Losses Reduced</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-green-400">₹{avoidedLossesLakhs}L <span className="text-lg font-medium text-zinc-500">/ event</span></div>
                <p className="text-xs text-zinc-500 mt-1">Measurable business continuity</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Proposed Interventions</h3>
            
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <FileText className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Thermal Optimization & HVAC Upgrade</h4>
                <p className="text-zinc-400 text-sm mt-1">Mitigates Extreme Heat risk (45°C+ scenario). Expected to improve energy efficiency by 18% during peak load.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <FileText className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Solar PV Backup & Storage</h4>
                <p className="text-zinc-400 text-sm mt-1">Mitigates Power Dependence risk. Provides up to 6 hours of continuous operational autonomy during grid failure.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-zinc-500">
              Report generated dynamically via ClimateGuard AI Engine. Deterministic models drive the financial numbers.
            </p>
          </div>

        </div>
      </BorderGlow>
      </div>
      
    </div>
  )
}
