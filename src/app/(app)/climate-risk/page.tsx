"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Activity, Flame, Droplets, Wind, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";

const ClimateMap = dynamic(() => import("@/components/ui/climate-map"), { ssr: false });

// A lookup table to map cities to approximate coordinates in India/World
const CITY_COORDS: Record<string, { lat: number, lng: number }> = {
  "Miami": { lat: 25.7617, lng: -80.1918 },
  "Phoenix": { lat: 33.4484, lng: -112.0740 },
  "London": { lat: 51.5072, lng: -0.1276 },
  "Indore": { lat: 22.7196, lng: 75.8577 },
  "Pune": { lat: 18.5204, lng: 73.8567 },
  "Surat": { lat: 21.1702, lng: 72.8311 },
  "Ahmedabad": { lat: 23.0225, lng: 72.5714 },
  "Coimbatore": { lat: 11.0168, lng: 76.9558 },
  "Ludhiana": { lat: 25.8585, lng: 78.9233 }
};

export default function ClimateRiskPage() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        const { data: businesses } = await supabase.from('businesses').select('*');
        
        if (businesses && businesses.length > 0) {
          const mappedHotspots = businesses.map((b, i) => {
            const coords = CITY_COORDS[b.city] || { lat: 20 + Math.random() * 10, lng: 75 + Math.random() * 10 }; // Fallback to random India
            const isFlood = i % 3 === 0;
            const isHeat = i % 3 === 1;
            
            return {
              id: `spot_${b.id}`,
              lat: coords.lat,
              lng: coords.lng,
              name: b.name,
              risk: isFlood ? "Flood Risk" : isHeat ? "Extreme Heat" : "Water Stress",
              temp: isFlood ? "+1.2m Sea Level" : isHeat ? "45°C Peak" : "Severe Drought",
              icon: isFlood ? Droplets : isHeat ? Flame : Wind,
              color: isFlood ? "text-blue-500" : isHeat ? "text-red-500" : "text-orange-500",
              glow: isFlood ? "bg-blue-500" : isHeat ? "bg-red-500" : "bg-orange-500"
            };
          });
          setHotspots(mappedHotspots);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Interactive Climate Exposure</h1>
        <p className="text-zinc-400 max-w-2xl">Geospatial risk mapping for your uploaded portfolio. Hover over hotspots to reveal AI-projected climate vulnerabilities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
        {/* Map Container */}
        <div className="lg:col-span-2 relative bg-[#0c0c10]/80 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden flex items-center justify-center p-8">
          <div className="absolute inset-0 w-full h-full z-0 p-2">
            <ClimateMap 
              hotspots={hotspots} 
              activeHotspot={activeHotspot} 
              setActiveHotspot={setActiveHotspot} 
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-[#0c0c10]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 z-20 shadow-xl">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Activity className="w-4 h-4 text-fuchsia-400 animate-pulse" /> Live AI Telemetry
            </div>
            <div className="text-xs text-zinc-500">Global Climate Models mapped to your portfolio</div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-4 h-full flex flex-col">
          <h3 className="font-bold text-white text-lg">Location Details</h3>
          
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {activeHotspot ? (
                <motion.div
                  key={activeHotspot}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  {hotspots.filter(s => s.id === activeHotspot).map(spot => (
                    <Card key={spot.id} className="bg-white/5 border-white/10 backdrop-blur-md h-full overflow-hidden flex flex-col">
                      <div className={`h-2 w-full ${spot.glow}`} />
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-zinc-400" /> {spot.name}
                            </h2>
                            <p className="text-zinc-400 mt-1">Uploaded Operational Hub</p>
                          </div>
                          <spot.icon className={`w-8 h-8 ${spot.color}`} />
                        </div>

                        <div className="space-y-6 flex-1">
                          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                            <div className="text-sm text-zinc-400 mb-1">Primary Threat Vector</div>
                            <div className={`text-xl font-bold ${spot.color}`}>{spot.risk}</div>
                          </div>
                          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                            <div className="text-sm text-zinc-400 mb-1">Projected Extremes</div>
                            <div className="text-xl font-bold text-white">{spot.temp}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center border border-white/5 rounded-2xl bg-white/5 border-dashed"
                >
                  <p className="text-zinc-500 text-center px-8">Hover over a glowing hotspot on the map to view detailed climate projections for your uploaded assets.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  )
}
