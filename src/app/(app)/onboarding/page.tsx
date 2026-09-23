"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Database, Globe, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  {
    id: 1,
    title: "Connecting to MSME ERP Systems...",
    subtitle: "Establishing secure data bridge",
    icon: Database,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Cross-referencing global climate models...",
    subtitle: "Analyzing 10 years of regional weather data",
    icon: Globe,
    color: "text-amber-500",
  },
  {
    id: 3,
    title: "Generating financial resilience baseline...",
    subtitle: "Mapping vulnerabilities to operational impact",
    icon: Zap,
    color: "text-fuchsia-500",
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 1 (0 to 1)
    const t1 = setTimeout(() => setPhase(1), 500);
    // Phase 2
    const t2 = setTimeout(() => setPhase(2), 2500);
    // Phase 3
    const t3 = setTimeout(() => setPhase(3), 4500);
    // Redirect
    const t4 = setTimeout(() => router.push("/dashboard"), 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [router]);

  const activePhase = PHASES.find(p => p.id === phase);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050507] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-50">
        <div className="w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-md w-full px-6 text-center space-y-8">
        
        <div className="flex justify-center mb-12">
          <Loader2 className="w-16 h-16 text-fuchsia-500 animate-spin" />
        </div>

        <div className="h-32 relative">
          <AnimatePresence mode="wait">
            {activePhase ? (
              <motion.div
                key={activePhase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center"
              >
                <activePhase.icon className={`w-8 h-8 mb-4 ${activePhase.color}`} />
                <h2 className="text-xl font-bold text-white mb-2">{activePhase.title}</h2>
                <p className="text-zinc-400">{activePhase.subtitle}</p>
              </motion.div>
            ) : (
              <motion.div
                key="init"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <h2 className="text-xl font-bold text-white">Initializing AI Engine...</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-12">
          <motion.div 
            className="h-full bg-gradient-to-r from-fuchsia-600 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: phase >= 3 ? "100%" : `${(phase / 3) * 100}%` }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </div>

      </div>
    </div>
  );
}
