"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Building2, Server, Factory, Anchor, Loader2 } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('projects').select('*, businesses(name, city)');
        
        if (data && data.length > 0 && !error) {
          // Map DB records to the UI format
          const mapped = data.map(p => ({
            realId: p.id,
            id: p.id.split('-')[0].toUpperCase(),
            name: p.businesses?.name || p.title,
            type: p.title,
            status: p.status,
            risk: p.exposure_reduction_pct > 25 ? 'Low' : p.exposure_reduction_pct > 15 ? 'Medium' : 'High',
            value: `$${((p.capex_estimate || 0) / 1000000).toFixed(1)}M`,
            icon: p.title.includes('Data') ? <Server className="w-5 h-5 text-cyan-400" /> :
                  p.title.includes('Sensor') ? <Server className="w-5 h-5 text-amber-400" /> :
                  p.title.includes('Efficiency') ? <Factory className="w-5 h-5 text-emerald-400" /> :
                  <Anchor className="w-5 h-5 text-fuchsia-400" />
          }));
          setProjects(mapped);
        } else {
          setProjects([]);
        }
      } catch (e) {
        console.error(e);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Projects Portfolio</h1>
          <p className="text-zinc-400">Manage and monitor climate risk across all your physical assets.</p>
        </div>
        <button className="bg-white text-black hover:bg-zinc-200 font-bold px-6 py-2.5 rounded-full transition-colors text-sm">
          Add New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link href={`/projects/${project.realId}`} key={project.realId} className="block group">
            <BorderGlow
              glowColor={
                project.risk === 'Critical' ? '340 80 50' : 
                project.risk === 'High' ? '30 90 50' : 
                project.risk === 'Medium' ? '45 90 50' : 
                '140 70 50'
              }
              backgroundColor="#0c0c10"
              colors={
                project.risk === 'Critical' ? ['#f43f5e', '#be123c', '#881337'] : 
                project.risk === 'High' ? ['#f97316', '#c2410c', '#7c2d12'] : 
                project.risk === 'Medium' ? ['#eab308', '#a16207', '#713f12'] : 
                ['#10b981', '#047857', '#064e3b']
              }
              animated={false}
              edgeSensitivity={40}
              className="w-full h-full transition-transform group-hover:scale-[1.02]"
            >
              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    {project.icon}
                  </div>
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-6 flex-1">
                  <h3 className="text-lg font-bold text-white leading-tight">{project.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{project.id} • {project.type}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">Asset Value</span>
                    <span className="font-bold text-white">{project.value}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">Risk Level</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                      project.risk === 'Critical' ? 'bg-rose-500/20 text-rose-400' :
                      project.risk === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      project.risk === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {project.risk}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">Status</span>
                    <span className="text-zinc-300">{project.status}</span>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </Link>
        ))}
      </div>
    </div>
  )
}
