"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StrokeText from "@/components/ui/stroke-text";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white selection:bg-fuchsia-500/30 font-sans items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/10 blur-[150px]" />
      </div>

      <div className="z-10 text-center flex flex-col items-center">
        <div className="w-full max-w-sm mx-auto mb-4">
          <StrokeText
            text="404"
            strokeColor="#ec4899"
            fillColor="#ffffff"
            strokeWidth={1.5}
            drawDuration={2}
            fillDelay={0.5}
            stagger={0.1}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={180}
            fontWeight={900}
            letterSpacing={0}
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Lost in the Data</h1>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">
          The page you are looking for has been moved, deleted, or possibly never existed in our resilient infrastructure.
        </p>

        <Link href="/" className="inline-flex items-center justify-center bg-white text-black hover:bg-zinc-200 text-base font-bold h-12 px-8 rounded-full transition-all">
          <ArrowLeft className="w-4 h-4 mr-2" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
