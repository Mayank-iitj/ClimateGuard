"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Building2, MapPin, Factory, DollarSign, ArrowRight, Loader2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    company_name: "",
    industry: "Manufacturing",
    location: "",
    revenue_bracket: "1M-5M",
  });

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      
      // Auto fill name if possible
      if (user.user_metadata?.full_name) {
        setFormData(prev => ({ ...prev, company_name: `${user.user_metadata.full_name}'s Enterprise` }));
      }
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);

    try {
      const supabase = createClient();
      
      // 1. Create Profile
      const { data: newProfile, error: profileError } = await supabase
        .from('msme_profiles')
        .insert([{
          user_id: user.id,
          company_name: formData.company_name,
          industry: formData.industry,
          location: formData.location || 'Global',
          revenue_bracket: formData.revenue_bracket,
        }])
        .select()
        .single();

      if (profileError || !newProfile) throw new Error("Could not create profile");

      // 2. Create Assessment Baseline
      const defaultAssessment = {
        msme_id: newProfile.id,
        climate_exposure: Math.floor(Math.random() * 30) + 50,
        operational_resilience: Math.floor(Math.random() * 30) + 40,
        recovery_readiness: Math.floor(Math.random() * 30) + 40,
        baseline_exposure_inr: 2500000,
        mitigated_exposure_inr: 900000,
        required_capital_inr: 5000000,
      };

      const { error: assessmentError } = await supabase
        .from('assessments')
        .insert([defaultAssessment]);

      if (assessmentError) throw new Error("Could not create assessment");

      // 3. Go to the processing animation
      router.push('/onboarding');
      
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      alert("Something went wrong during setup. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <div className="absolute w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-xl w-full relative z-10">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-fuchsia-600 to-pink-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Welcome to ClimateGuard</h1>
          <p className="text-zinc-400">Let's set up your personalized resilience platform.</p>
        </div>

        <div className="bg-[#0c0c10]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Company Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="text" 
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors placeholder:text-zinc-600"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            {/* Industry & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Industry</label>
                <div className="relative">
                  <Factory className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <select 
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors appearance-none"
                  >
                    <option className="bg-[#0c0c10]" value="Manufacturing">Manufacturing</option>
                    <option className="bg-[#0c0c10]" value="Food Processing">Food Processing</option>
                    <option className="bg-[#0c0c10]" value="Agriculture">Agriculture</option>
                    <option className="bg-[#0c0c10]" value="Logistics">Logistics</option>
                    <option className="bg-[#0c0c10]" value="Technology">Technology</option>
                    <option className="bg-[#0c0c10]" value="Retail">Retail</option>
                    <option className="bg-[#0c0c10]" value="Healthcare">Healthcare</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input 
                    type="text" 
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors placeholder:text-zinc-600"
                    placeholder="City, Region"
                  />
                </div>
              </div>
            </div>

            {/* Revenue */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Annual Revenue Bracket</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <select 
                  value={formData.revenue_bracket}
                  onChange={(e) => setFormData({...formData, revenue_bracket: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors appearance-none"
                >
                  <option className="bg-[#0c0c10]" value="< 1M">Under $1M</option>
                  <option className="bg-[#0c0c10]" value="1M-5M">$1M - $5M</option>
                  <option className="bg-[#0c0c10]" value="5M-20M">$5M - $20M</option>
                  <option className="bg-[#0c0c10]" value="20M-100M">$20M - $100M</option>
                  <option className="bg-[#0c0c10]" value="> 100M">Over $100M</option>
                </select>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={submitting || !formData.company_name || !formData.location}
              className="w-full h-12 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-xl font-bold mt-4"
            >
              {submitting ? (
                <>Building Platform <Loader2 className="w-5 h-5 ml-2 animate-spin" /></>
              ) : (
                <>Generate Baseline <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
