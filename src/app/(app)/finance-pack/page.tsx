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

          let requiredCapital = 0;
          let totalSavings = 0;
          if (projects && projects.length > 0) {
            requiredCapital = projects.reduce((acc, p) => acc + (Number(p.capex_estimate) || 0), 0);
            totalSavings = projects.reduce((acc, p) => acc + (Number(p.annual_savings_estimate) || 0), 0);
          }

          const baseline = totalRevenue * 0.15 * (avgExposure / 100);
          const mitigated = Math.max(0, baseline - totalSavings);

          setData({
            profile: { company_name: "My Portfolio" },
            assessment: {
              baseline_exposure_inr: baseline,
              mitigated_exposure_inr: mitigated,
              required_capital_inr: requiredCapital
            },
            projects: projects ? projects.slice(0, 3) : [] // Take top 3 projects
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

  if (loading) return <div className="flex-1 flex items-center justify-center h-[60vh]"><Loader2 className="w-8 h-8 text-rose-600 animate-spin" /></div>;

  const reqCapitalMillions = (data.assessment.required_capital_inr / 1000000).toFixed(2);
  const avoidedLossesMillions = ((data.assessment.baseline_exposure_inr - data.assessment.mitigated_exposure_inr) / 1000000).toFixed(2);
  const projects = (data as any).projects || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#7c1027]/20 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#7c1027] mb-2">Finance Readiness Pack</h1>
          <p className="text-[#7c1027]/70">Structured project information for Satin Finserv integration.</p>
        </div>
        <Button 
          onClick={handleDownload} 
          disabled={isGenerating}
          className="bg-rose-800 hover:bg-fuchsia-700 text-[#7c1027] flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> 
          {isGenerating ? "Generating..." : "Download PDF Pack"}
        </Button>
      </div>

      <div ref={pdfRef} className="rounded-xl overflow-hidden bg-[#fdfbf7] p-2">

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
              <div className="p-3 bg-rose-600/20 rounded-xl">
                <Factory className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#7c1027]">{data.profile.company_name}</h2>
                <div className="text-[#7c1027]/70 text-sm font-medium">MSME Loan ID: SF-2026-IND</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> Finance Ready
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#7c1027]/5 border-[#7c1027]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#7c1027]/70 uppercase tracking-widest">Resilience Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-[#7c1027]">${reqCapitalMillions}M</div>
                <p className="text-xs text-[#7c1027]/50 mt-1">Capital required for mitigation</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#7c1027]/5 border-[#7c1027]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#7c1027]/70 uppercase tracking-widest">Potential Losses Reduced</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-green-400">${avoidedLossesMillions}M <span className="text-lg font-medium text-[#7c1027]/50">/ event</span></div>
                <p className="text-xs text-[#7c1027]/50 mt-1">Measurable business continuity</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#7c1027] border-b border-[#7c1027]/20 pb-2">Proposed Interventions</h3>
            
            {projects.map((proj: any, idx: number) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#7c1027]/5 border border-[#7c1027]/20">
                <FileText className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#7c1027] text-sm">{proj.title}</h4>
                  <p className="text-[#7c1027]/70 text-sm mt-1">
                    Status: {proj.status}. Expected to reduce exposure by {proj.exposure_reduction_pct}% and save ${(proj.annual_savings_estimate / 1000).toFixed(0)}k annually.
                  </p>
                </div>
              </div>
            ))}
            
            {projects.length === 0 && (
               <div className="text-[#7c1027]/50 text-sm italic py-4 text-center">No interventions found for this portfolio.</div>
            )}
          </div>
          
          <div className="pt-4 border-t border-[#7c1027]/20 text-center">
            <p className="text-xs text-[#7c1027]/50">
              Report generated dynamically via ClimateGuard AI Engine. Deterministic models drive the financial numbers.
            </p>
          </div>

        </div>
      </BorderGlow>
      </div>
      
    </div>
  )
}
