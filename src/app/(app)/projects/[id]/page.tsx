"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert, Activity, Cpu, ShieldCheck, MapPin, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectCommandCenter() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<any>(null);
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchDetails() {
      const { data, error } = await supabase
        .from('projects')
        .select('*, businesses(name, city)')
        .eq('id', projectId)
        .single();
      
      if (data) setProject(data);
      setLoading(false);
    }
    
    fetchDetails();

    // Subscribe to real-time IoT events
    const channel = supabase
      .channel(`iot-${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'iot_sensor_data',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          setSensorData((prev) => {
            const newData = [...prev, payload.new].slice(-20); // Keep last 20 readings
            return newData;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!project) return <div>Project not found.</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <Link href="/projects" className="text-zinc-500 hover:text-white flex items-center gap-2 mb-4 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">{project.title}</h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                LIVE
              </span>
            </div>
            <p className="text-zinc-400 max-w-2xl">{project.description || "Active monitoring and resilience tracking for this asset."}</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Run AI Assessment
            </button>
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <ShieldAlert className="w-4 h-4" /> Trigger Intervention
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Realtime IoT Feed */}
        <Card className="lg:col-span-2 bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5 text-cyan-400" /> Live Sensor Telemetry
                </CardTitle>
                <CardDescription className="text-zinc-400">Real-time data streaming from field IoT devices</CardDescription>
              </div>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mt-1" />
                <span className="text-xs text-cyan-400 font-mono">STREAMING</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {sensorData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="recorded_at" tickFormatter={(t) => new Date(t).toLocaleTimeString()} stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                      labelFormatter={(label: any) => new Date(label).toLocaleTimeString()}
                    />
                    <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4, fill: '#06b6d4' }} activeDot={{ r: 8, fill: '#fff' }} animationDuration={300} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 border border-dashed border-white/10 rounded-xl">
                  <Activity className="w-8 h-8 mb-2 opacity-50" />
                  <p>Waiting for sensor payload...</p>
                  <p className="text-xs mt-1 opacity-50">Run the simulation script to see data.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI & Blockchain Column */}
        <div className="space-y-6">
          {/* AI Assessment */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Cpu className="w-32 h-32" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Cpu className="w-5 h-5 text-fuchsia-400" /> AI Risk Assessor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-lg">
                  <h4 className="text-sm font-bold text-fuchsia-300 mb-1">Exposure Dropped</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Based on recent climate modeling and IoT readouts, this project's flood risk exposure has decreased by {project.exposure_reduction_pct || 12}%. 
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-white/5 border-white/10">Stable</Badge>
                  <Badge variant="outline" className="bg-white/5 border-white/10">Verified</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Audit Log */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Immutable Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-emerald-500 bg-black text-emerald-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-white text-xs">Carbon Offset Proof</div>
                      <time className="font-mono text-[10px] text-zinc-500">10 mins ago</time>
                    </div>
                    <div className="text-zinc-400 text-xs break-all font-mono opacity-60">0x8f...3a9b</div>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-zinc-700 bg-black text-zinc-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-white/5 bg-transparent">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-zinc-300 text-xs">Site Inspection</div>
                      <time className="font-mono text-[10px] text-zinc-500">2 days ago</time>
                    </div>
                    <div className="text-zinc-500 text-xs break-all font-mono opacity-50">0x2c...7f1e</div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
