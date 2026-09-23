"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Activity, Flame, Droplets, Wind } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import dynamic from "next/dynamic";

const ClimateMap = dynamic(() => import("@/components/ui/climate-map"), { ssr: false });

const HOTSPOTS = [
  { id: "spot_0", lat: 16.0853, lng: 71.1411, name: "Pune Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_1", lat: 10.0647, lng: 78.5869, name: "Bangalore Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_2", lat: 11.9579, lng: 81.4197, name: "Hyderabad Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_3", lat: 8.9738, lng: 81.8604, name: "Kolkata Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_4", lat: 16.9972, lng: 83.4892, name: "Ahmedabad Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_5", lat: 14.3090, lng: 73.9039, name: "Surat Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_6", lat: 15.1577, lng: 79.0257, name: "Jaipur Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_7", lat: 19.6686, lng: 79.4000, name: "Lucknow Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_8", lat: 17.7569, lng: 88.2830, name: "Kanpur Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_9", lat: 24.8618, lng: 79.7021, name: "Nagpur Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_10", lat: 15.8836, lng: 86.5675, name: "Indore Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_11", lat: 12.8600, lng: 78.6780, name: "Thane Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_12", lat: 11.6533, lng: 76.5292, name: "Bhopal Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_13", lat: 20.1062, lng: 80.8226, name: "Visakhapatnam Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_14", lat: 16.7759, lng: 87.8744, name: "Pimpri-Chinchwad Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_15", lat: 22.0749, lng: 87.7350, name: "Patna Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_16", lat: 13.2972, lng: 73.0763, name: "Vadodara Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_17", lat: 16.4727, lng: 75.2981, name: "Ghaziabad Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_18", lat: 25.8585, lng: 78.9233, name: "Ludhiana Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_19", lat: 13.1587, lng: 71.6901, name: "Agra Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_20", lat: 22.4571, lng: 74.4275, name: "Nashik Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_21", lat: 15.2083, lng: 83.0832, name: "Faridabad Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_22", lat: 14.9137, lng: 85.9309, name: "Meerut Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_23", lat: 9.6946, lng: 73.8008, name: "Rajkot Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_24", lat: 23.4559, lng: 74.5616, name: "Kalyan-Dombivli Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_25", lat: 26.2050, lng: 73.9044, name: "Vasai-Virar Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_26", lat: 8.6744, lng: 85.0140, name: "Varanasi Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_27", lat: 15.3370, lng: 79.8392, name: "Srinagar Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_28", lat: 15.3049, lng: 77.7412, name: "Aurangabad Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_29", lat: 12.4238, lng: 72.1626, name: "Dhanbad Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_30", lat: 26.7537, lng: 72.5445, name: "Amritsar Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_31", lat: 23.5542, lng: 82.5526, name: "Navi Mumbai Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_32", lat: 11.7795, lng: 85.9497, name: "Allahabad Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_33", lat: 16.4094, lng: 88.1837, name: "Ranchi Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_34", lat: 25.2805, lng: 78.2522, name: "Howrah Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_35", lat: 15.5909, lng: 74.6303, name: "Coimbatore Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_36", lat: 19.2318, lng: 74.3700, name: "Jabalpur Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_37", lat: 14.9513, lng: 87.0137, name: "Gwalior Facility", risk: "Water Stress", temp: "Severe Drought", icon: Droplets, color: "text-orange-500", glow: "bg-orange-500" },
  { id: "spot_38", lat: 25.7325, lng: 75.8381, name: "Vijayawada Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_39", lat: 19.5991, lng: 78.6551, name: "Jodhpur Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_40", lat: 11.4997, lng: 83.8369, name: "Madurai Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_41", lat: 21.8373, lng: 75.5642, name: "Raipur Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_42", lat: 9.6716, lng: 80.1417, name: "Kota Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_43", lat: 19.1089, lng: 89.9796, name: "Guwahati Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_44", lat: 17.6605, lng: 85.8428, name: "Chandigarh Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_45", lat: 8.5018, lng: 84.4164, name: "Solapur Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" },
  { id: "spot_46", lat: 23.4757, lng: 88.4084, name: "Hubli-Dharwad Facility", risk: "Extreme Heat", temp: "45°C Peak", icon: Flame, color: "text-red-500", glow: "bg-red-500" },
  { id: "spot_47", lat: 12.8046, lng: 84.3784, name: "Bareilly Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_48", lat: 25.2968, lng: 79.3524, name: "Moradabad Facility", risk: "Flood Risk", temp: "+1.2m Sea Level", icon: Droplets, color: "text-blue-500", glow: "bg-blue-500" },
  { id: "spot_49", lat: 15.7535, lng: 86.4523, name: "Mysore Facility", risk: "Air Quality / Heat", temp: "Hazardous", icon: Wind, color: "text-purple-500", glow: "bg-purple-500" }
];

export default function ClimateRiskPage() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Interactive Climate Exposure</h1>
        <p className="text-zinc-400 max-w-2xl">Geospatial risk mapping for your portfolio. Hover over hotspots to reveal AI-projected climate vulnerabilities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
        
        {/* Map Container */}
        <div className="lg:col-span-2 relative bg-[#0c0c10]/80 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden flex items-center justify-center p-8">
          
          {/* Actual Interactive Map of India */}
          <div className="absolute inset-0 w-full h-full z-0 p-2">
            <ClimateMap 
              hotspots={HOTSPOTS} 
              activeHotspot={activeHotspot} 
              setActiveHotspot={setActiveHotspot} 
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-[#0c0c10]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 z-20 shadow-xl">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Activity className="w-4 h-4 text-fuchsia-400 animate-pulse" /> Live AI Telemetry
            </div>
            <div className="text-xs text-zinc-500">Global Climate Models 2026-2030</div>
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
                  {HOTSPOTS.filter(s => s.id === activeHotspot).map(spot => (
                    <Card key={spot.id} className="bg-white/5 border-white/10 backdrop-blur-md h-full overflow-hidden flex flex-col">
                      <div className={`h-2 w-full ${spot.glow}`} />
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-zinc-400" /> {spot.name}
                            </h2>
                            <p className="text-zinc-400 mt-1">Primary Operational Hub</p>
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
                  <p className="text-zinc-500 text-center px-8">Hover over a glowing hotspot on the map to view detailed AI climate projections.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  )
}
