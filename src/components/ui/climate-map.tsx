"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// This component handles passing the active hotspot state back up
function MapEvents({ setActiveHotspot }: { setActiveHotspot: (id: string | null) => void }) {
  const map = useMap();
  useEffect(() => {
    map.on("click", () => setActiveHotspot(null));
    return () => {
      map.off("click");
    };
  }, [map, setActiveHotspot]);
  return null;
}

export default function ClimateMap({ 
  hotspots, 
  activeHotspot, 
  setActiveHotspot 
}: { 
  hotspots: any[]; 
  activeHotspot: string | null;
  setActiveHotspot: (id: string | null) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-[#050507] animate-pulse" />;
  }

  // Create custom glowing DivIcons dynamically
  const getCustomIcon = (glowClass: string, isActive: boolean) => {
    return L.divIcon({
      className: "custom-leaflet-icon",
      html: `
        <div class="relative w-6 h-6 -ml-3 -mt-3">
          <div class="absolute inset-0 rounded-full blur-md ${glowClass} opacity-60 ${isActive ? 'animate-ping' : 'animate-pulse'}" style="transform: scale(${isActive ? '4' : '2.5'})"></div>
          <div class="relative w-4 h-4 m-1 rounded-full border-[3px] border-white ${glowClass} shadow-[0_0_15px_rgba(255,255,255,0.9)]"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative z-0 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      <MapContainer 
        center={[22.5937, 78.9629]} // Center of India
        zoom={4.5} 
        style={{ width: "100%", height: "100%", background: "#0c0c10" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        />
        <MapEvents setActiveHotspot={setActiveHotspot} />
        
        {hotspots.map((spot) => (
          <Marker 
            key={spot.id} 
            position={[spot.lat, spot.lng]}
            icon={getCustomIcon(spot.glow, spot.id === activeHotspot)}
            eventHandlers={{
              mouseover: () => setActiveHotspot(spot.id),
              mouseout: () => setActiveHotspot(null),
              click: () => setActiveHotspot(spot.id)
            }}
          >
            {/* Adding interactive Tooltips for Hackathon wow-factor */}
            {spot.id === activeHotspot && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#0c0c10]/95 backdrop-blur-xl border border-white/20 p-3 rounded-lg shadow-2xl whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="text-xs text-zinc-400 mb-1">Estimated Exposure</div>
                <div className="text-lg font-bold text-white">${Math.floor(Math.random() * 50 + 10)}M - ${Math.floor(Math.random() * 100 + 60)}M</div>
                <div className={`text-xs mt-1 ${spot.color}`}>{spot.risk}</div>
              </div>
            )}
          </Marker>
        ))}
      </MapContainer>

      {/* Global override for Leaflet z-index issues with Next.js headers */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container {
          z-index: 10 !important;
          background: #0c0c10 !important;
        }
        .leaflet-pane {
          z-index: 10 !important;
        }
        .leaflet-top, .leaflet-bottom {
          z-index: 10 !important;
        }
      `}} />
    </div>
  );
}
