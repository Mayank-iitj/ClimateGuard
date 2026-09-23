"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, Check, Star, Users, Database, 
  BarChart3, Activity, Zap, Droplets, MapPin, ChevronDown, 
  Smartphone, Laptop, Settings, Play, CheckCircle2, 
  TrendingUp, CreditCard, PieChart, ShieldCheck, Server, Globe, Cloud
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import TextLoop from "@/components/ui/text-loop";
import StrokeText from "@/components/ui/stroke-text";
import PixelSwap from "@/components/ui/pixel-swap";
import LogoLoopBase from "@/components/ui/logo-loop";
const LogoLoop = LogoLoopBase as any;
import ChromaGrid from "@/components/ui/chroma-grid";
import PillNav from "@/components/ui/pill-nav";
import BorderGlow from "@/components/ui/border-glow";
import StarBorder from "@/components/ui/star-border";
import Waves from "@/components/ui/Waves";
import Grainient from "@/components/ui/Grainient";

const merchantLogos = [
  { node: <span className="font-bold text-2xl tracking-wider uppercase opacity-50">TIC</span>, title: "TIC" },
  { node: <span className="font-bold text-2xl tracking-wider uppercase opacity-50">BOOKSCORE</span>, title: "BOOKSCORE" },
  { node: <span className="font-bold text-2xl tracking-wider uppercase opacity-50">WOGER</span>, title: "WOGER" },
  { node: <span className="font-bold text-2xl tracking-wider uppercase opacity-50">UNICOIN</span>, title: "UNICOIN" },
  { node: <span className="font-bold text-2xl tracking-wider uppercase opacity-50">GRENA</span>, title: "GRENA" },
  { node: <span className="font-bold text-2xl tracking-wider uppercase opacity-50">NUTRICAN</span>, title: "NUTRICAN" },
  { node: <span className="font-bold text-2xl tracking-wider uppercase opacity-50">MERCURY</span>, title: "MERCURY" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white selection:bg-fuchsia-500/30 font-sans overflow-x-hidden">
      {/* Global Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-pink-500/5 blur-[120px]" />
      </div>

      {/* 2. Header & Navigation */}
      <div className="fixed top-4 left-0 right-0 flex justify-center z-50">
        <PillNav
          logo={<Globe className="w-5 h-5 text-white" />}
          logoAlt="ClimateGuard Logo"
          items={[
            { label: 'Home', href: '#' },
            { label: 'Features', href: '#features' },
            { label: 'Integration', href: '#integration' },
            { label: 'Works', href: '#works' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Login', href: '/login' },
          ]}
          activeHref="#"
          baseColor="#ec4899"
          pillColor="transparent"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#a1a1aa"
          onMobileMenuClick={() => {}}
        />
      </div>

      <main className="flex-1 relative z-10 pt-32">
        {/* 3. Hero Section */}
        <section className="relative pt-12 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <Waves
              lineColor="rgba(255, 255, 255, 0.05)"
              backgroundColor="transparent"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={40}
              waveAmpY={20}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
              xGap={12}
              yGap={36}
            />
          </div>
          <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">

            
            <div className="mb-6 flex justify-center w-full max-w-4xl mx-auto">
              <StrokeText
                text="Manage Climate Risk."
                strokeColor="#ec4899"
                fillColor="#ffffff"
                strokeWidth={1.5}
                drawDuration={1.5}
                fillDelay={0.2}
                stagger={0.05}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={96}
                fontWeight={800}
                letterSpacing={-2}
              />
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-normal"
            >
              Perfect for operators, supply chain managers, and executives who need a high-converting resilience dashboard.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              {/* @ts-expect-error - React Bits components lack full TS definitions */}
              <StarBorder as={Link} href="/login" color="#f472b6" speed="4s" backgroundColor="#ffffff" textColor="#000000" borderColor="#ffffff" className="w-full sm:w-auto hover:scale-105 transition-transform">
                <span className="font-bold text-base px-2">Get Started</span>
              </StarBorder>
              {/* @ts-expect-error - React Bits components lack full TS definitions */}
              <StarBorder as={Link} href="#platform" color="#38bdf8" speed="4s" backgroundColor="#111116" textColor="#ffffff" borderColor="#333333" className="w-full sm:w-auto hover:scale-105 transition-transform">
                <span className="font-medium text-base px-2">Start for Free</span>
              </StarBorder>
            </motion.div>

            {/* Feature Badges Ribbon */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-zinc-400 font-medium"
            >
              {['Easy-Crafting', 'Exceptional 24/7 Support', 'Set Up in 5 Minutes', 'No Coding Required', 'Aesthetic Visualizer'].map((tag) => (
                <div key={tag} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-fuchsia-500" />
                  {tag}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual / Showcase Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 40 }}
            className="mt-20 max-w-6xl mx-auto px-4 relative"
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#0c0c10]/90 backdrop-blur-xl shadow-[0_20px_70px_-15px_rgba(236,72,153,0.3)] overflow-hidden aspect-video flex flex-col">
              {/* Top Bar */}
              <div className="h-12 w-full border-b border-white/5 flex items-center px-4 justify-between bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                </div>
                <div className="px-4 py-1 rounded-full bg-white/5 text-xs text-zinc-400 font-mono">climateguard.app/dashboard</div>
                <div></div>
              </div>
              {/* Dashboard Content */}
              <div className="flex-1 flex">
                {/* Sidebar */}
                <div className="w-64 border-r border-white/5 p-6 hidden md:block">
                  <div className="space-y-6">
                    <div className="h-4 w-24 bg-white/10 rounded-full mb-8"></div>
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-white/5"></div>
                        <div className="h-3 w-32 bg-white/5 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Main Content */}
                <div className="flex-1 p-8 grid grid-cols-3 gap-8">
                  <div className="col-span-3 md:col-span-2 space-y-8">
                    {/* Top Stats */}
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-zinc-400 mb-1 text-sm">Resilience Score</div>
                        <div className="text-4xl font-bold text-white">92.4%</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-fuchsia-500/20 flex items-center justify-center"><ArrowRight className="w-4 h-4 text-fuchsia-400 -rotate-45" /></div>
                      </div>
                    </div>
                    {/* Bar Chart */}
                    <div className="h-48 rounded-xl bg-white/5 border border-white/5 p-4 flex items-end gap-3">
                      {[40, 70, 45, 90, 65, 85, 120].map((h, i) => (
                        <div key={i} className="w-full flex flex-col justify-end h-full">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${(h/120)*100}%` }}
                            transition={{ delay: 1 + (i * 0.1), duration: 0.8 }}
                            className="w-full bg-gradient-to-t from-fuchsia-600/40 to-pink-400 rounded-t-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right Panel */}
                  <div className="col-span-3 md:col-span-1 space-y-4">
                    <div className="text-sm font-medium text-white mb-4">Recent Alerts</div>
                    {[1,2,3].map(i => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Activity className="w-4 h-4 text-zinc-300" />
                        </div>
                        <div>
                          <div className="h-3 w-20 bg-white/20 rounded-full mb-2"></div>
                          <div className="h-2 w-12 bg-white/10 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Proof / Logo Cloud */}
          <div className="mt-24 border-y border-white/5 bg-[#0c0c10]/50 py-10">
            <div className="container mx-auto">
              <div className="flex flex-col items-center mb-8">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-fuchsia-500 text-fuchsia-500" />)}
                </div>
                <div className="text-zinc-400 font-medium">Trusted by 4,320 satisfied merchants</div>
              </div>
              <LogoLoop
                logos={merchantLogos}
                speed={80}
                direction="left"
                logoHeight={32}
                gap={80}
                hoverSpeed={0}
                scaleOnHover={false}
                fadeOut={true}
                fadeOutColor="#0c0c10"
                ariaLabel="Trusted Merchants"
                className="text-zinc-500"
              />
            </div>
          </div>
        </section>

        {/* 4. Core Feature Section */}
        <section id="features" className="py-24 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-6">
                Key Feature
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Built to Automate What Matters Most</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="rounded-2xl p-8 bg-[#111116]/80 backdrop-blur-md border border-white/10 flex flex-col group overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-3">Smart Stress Testing</h3>
                <p className="text-zinc-400 mb-8 max-w-sm">Track physical and transition risks automatically, and get AI-powered forecasts that keep you ahead.</p>
                <div className="flex-1 min-h-[200px] bg-black/50 rounded-xl border border-white/5 relative overflow-hidden flex items-end p-4">
                   <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <path d="M0 100 C 20 80, 40 90, 60 50 S 80 20, 100 10" fill="none" stroke="rgba(236,72,153,0.5)" strokeWidth="2" />
                   </svg>
                   <div className="w-full flex justify-between px-2">
                     <div className="w-1 h-20 bg-white/10"></div>
                     <div className="w-1 h-32 bg-white/10"></div>
                     <div className="w-1 h-16 bg-white/10"></div>
                     <div className="w-1 h-40 bg-fuchsia-500 relative">
                       <div className="absolute -top-10 -left-6 bg-white text-black text-xs font-bold py-1 px-2 rounded">$4.2k</div>
                     </div>
                     <div className="w-1 h-24 bg-white/10"></div>
                   </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl p-8 bg-[#111116]/80 backdrop-blur-md border border-white/10 flex flex-col group">
                <h3 className="text-2xl font-bold text-white mb-3">Real-time Risk Insights</h3>
                <p className="text-zinc-400 mb-8 max-w-sm">Get alerts, categorize exposures instantly, and monitor operational health with ease.</p>
                {/* @ts-expect-error - React Bits components lack full TS definitions */}
                <PixelSwap
                  firstContent={
                    <div className="w-full h-full min-h-[200px] bg-black/50 rounded-xl border border-white/5 p-6 flex flex-col justify-center gap-4 relative">
                      <div className="w-full">
                        <div className="flex justify-between text-xs mb-2"><span className="text-white">Flood Risk</span><span className="text-fuchsia-400">85%</span></div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-fuchsia-500 w-[85%] shadow-[0_0_10px_#ec4899]"></div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between text-xs mb-2"><span className="text-white">Heat Stress</span><span className="text-pink-400">42%</span></div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-500 w-[42%]"></div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between text-xs mb-2"><span className="text-white">Grid Instability</span><span className="text-purple-400">60%</span></div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 w-[60%]"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] cursor-pointer rounded-xl">
                         <span className="text-white font-bold bg-[#111116] px-4 py-2 rounded-full border border-white/10 text-sm">Click to Optimize</span>
                      </div>
                    </div>
                  }
                  secondContent={
                    <div className="w-full h-full min-h-[200px] bg-black/50 rounded-xl border border-green-500/20 p-6 flex flex-col justify-center gap-4 cursor-pointer relative">
                      <div className="w-full">
                        <div className="flex justify-between text-xs mb-2"><span className="text-white">Flood Risk</span><span className="text-green-400">12%</span></div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-[12%] shadow-[0_0_10px_#22c55e]"></div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between text-xs mb-2"><span className="text-white">Heat Stress</span><span className="text-green-400">18%</span></div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-[18%]"></div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between text-xs mb-2"><span className="text-white">Grid Instability</span><span className="text-green-400">5%</span></div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-[5%]"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] rounded-xl">
                         <span className="text-white font-bold bg-[#111116] px-4 py-2 rounded-full border border-white/10 text-sm">Reset</span>
                      </div>
                    </div>
                  }
                  pixelSize={32}
                  gap={2}
                  pixelRadius={4}
                  pixelSpin={90}
                  pixelScale={0.1}
                  duration={1400}
                  pixelDuration={400}
                  pattern="spiral"
                  randomness={0.2}
                  fade={true}
                  trigger="click"
                  className="flex-1"
                />
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl p-8 bg-[#111116]/80 backdrop-blur-md border border-white/10 flex flex-col group">
                <h3 className="text-2xl font-bold text-white mb-3">Multi-Asset Syncing</h3>
                <p className="text-zinc-400 mb-8 max-w-sm">Connect all your facilities and get a unified view in seconds, all in one place.</p>
                <div className="flex-1 min-h-[200px] relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(236,72,153,0.4)]">
                    <Database className="w-8 h-8 text-fuchsia-400" />
                  </div>
                  <div className="absolute top-1/2 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-1/4 left-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-1/4 left-1/4 w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center animate-float shadow-[0_0_15px_rgba(217,72,239,0.3)]"><Server className="w-4 h-4 text-zinc-400" /></div>
                  <div className="absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center animate-float [animation-delay:1s] shadow-[0_0_15px_rgba(59,130,246,0.3)]"><MapPin className="w-4 h-4 text-zinc-400" /></div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="rounded-2xl p-8 bg-[#111116]/80 backdrop-blur-md border border-white/10 flex flex-col group">
                <h3 className="text-2xl font-bold text-white mb-3">AI-Powered Resilience Goals</h3>
                <p className="text-zinc-400 mb-8 max-w-sm">Let AI analyze your exposure and set achievable mitigation plans that adapt in real-time.</p>
                <div className="flex-1 min-h-[200px] bg-black/50 rounded-xl border border-white/5 relative p-6">
                   <div className="absolute bottom-6 left-6 right-6 h-[1px] bg-white/10"></div>
                   <div className="absolute bottom-6 left-1/4 w-3 h-3 rounded-full bg-white border-2 border-black z-10"></div>
                   <div className="absolute bottom-1/2 left-1/2 w-3 h-3 rounded-full bg-pink-400 border-2 border-black z-10 shadow-[0_0_10px_#f472b6]"></div>
                   <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-fuchsia-500 border-2 border-black z-10 shadow-[0_0_15px_#ec4899]"></div>
                   <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <path d="M25 80 Q 50 80, 50 50 T 90 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                   </svg>
                </div>
              </div>

              {/* Card 5 - ChromaGrid Features */}
              <div className="md:col-span-2 rounded-2xl p-8 bg-[#111116]/80 backdrop-blur-md border border-white/10 flex flex-col group overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-6 text-center tracking-tight">Comprehensive Risk Coverage</h3>
                <div style={{ height: '450px', position: 'relative' }} className="-mx-4 md:mx-0">
                  <ChromaGrid 
                    items={[
                      {
                        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
                        title: "Predictive Analytics",
                        subtitle: "Forecast risks 50 years ahead",
                        borderColor: "#ec4899",
                        gradient: "linear-gradient(145deg, #111116, #070709)",
                        url: "#"
                      },
                      {
                        image: "/asset-scanning.jpg",
                        title: "Asset Scanning",
                        subtitle: "Evaluate thousands of locations",
                        borderColor: "#a855f7",
                        gradient: "linear-gradient(210deg, #111116, #070709)",
                        url: "#"
                      },
                      {
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
                        title: "Compliance Ready",
                        subtitle: "Automated regulatory reports",
                        borderColor: "#06b6d4",
                        gradient: "linear-gradient(165deg, #111116, #070709)",
                        url: "#"
                      }
                    ]}
                    radius={250}
                    damping={0.45}
                    fadeOut={0.6}
                    ease="power3.out"
                    columns={3}
                    rows={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Seamless Integrations Section */}
        <section className="py-24 relative border-y border-white/5 bg-[#0c0c10]/30 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6">
              Integration
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight max-w-2xl mx-auto">Seamless Integration With Your Tools Syncing.</h2>
            
            <div className="relative max-w-3xl mx-auto h-[400px] flex items-center justify-center">
              {/* Circular Orbits with Attached Satellites */}
              <div className="absolute inset-0 flex items-center justify-center">
                
                {/* Inner Orbit (Spins clockwise, icons spin counter-clockwise to stay upright) */}
                <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10 animate-[spin_15s_linear_infinite]">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.2)] animate-[spin_15s_linear_infinite_reverse]">
                    <Database className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-[spin_15s_linear_infinite_reverse]">
                    <Server className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>

                {/* Outer Orbit (Spins counter-clockwise, icons spin clockwise to stay upright) */}
                <div className="absolute w-[500px] h-[500px] rounded-full border border-white/10 border-dashed animate-[spin_25s_linear_infinite_reverse]">
                  <div className="absolute top-1/2 -left-7 -translate-y-1/2 w-14 h-14 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.2)] animate-[spin_25s_linear_infinite]">
                    <PieChart className="w-6 h-6 text-pink-300" />
                  </div>
                  <div className="absolute top-1/2 -right-7 -translate-y-1/2 w-14 h-14 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)] animate-[spin_25s_linear_infinite]">
                    <Globe className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-[spin_25s_linear_infinite]">
                    <Cloud className="w-6 h-6 text-purple-300" />
                  </div>
                </div>
              </div>
              
              {/* Center */}
              <div className="relative z-20 w-24 h-24 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-pink-600 flex items-center justify-center shadow-[0_0_60px_rgba(236,72,153,0.6)] animate-pulse">
                <Globe className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* 6. "How It Works" Tabbed Walkthrough */}
        <section id="works" className="py-24 relative">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-6">
                How It Works
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Your Workflow, Streamlined by Design</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-12 min-h-[500px]">
              <div className="md:w-1/2 flex flex-col justify-center">
                <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                  {[
                    { id: 0, title: '1. Asset Linking' },
                    { id: 1, title: '2. AI Analysis' },
                    { id: 2, title: '3. Smart Guidance' }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-sm font-bold pb-4 -mb-4 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold text-white mb-6">
                      {activeTab === 0 ? "Securely link your assets, facilities, and supply chains." :
                       activeTab === 1 ? "Continuous monitoring powered by advanced climate models." :
                       "Actionable insights to mitigate exposure instantly."}
                    </h3>
                    <ul className="space-y-4 text-zinc-400">
                      {[
                        activeTab === 0 ? [
                          "Enterprise-grade encryption to protect your operational data.",
                          "No credit card required to get started.",
                          "No manual inputs — sync once, track forever.",
                          "End-to-end encrypted to keep your data private and safe."
                        ] : activeTab === 1 ? [
                          "Real-time processing of satellite and sensor data.",
                          "Predictive modeling for extreme weather events.",
                          "Automated risk scoring for every linked asset.",
                          "Historical data matching for trend analysis."
                        ] : [
                          "Automated alerts triggered by risk thresholds.",
                          "Step-by-step mitigation plans generated by AI.",
                          "Exportable compliance reports for stakeholders.",
                          "Direct integration with your existing workflow tools."
                        ]
                      ][0].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-fuchsia-500 shrink-0" /> 
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="md:w-1/2 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                    transition={{ duration: 0.4 }}
                    className="w-full rounded-2xl p-2 bg-gradient-to-br from-white/10 to-transparent border border-white/10"
                    style={{ perspective: "1000px" }}
                  >
                    <div className="rounded-xl bg-[#0c0c10] border border-white/5 p-8 aspect-square flex flex-col items-center justify-center relative overflow-hidden group hover:border-white/20 transition-colors">
                      {/* Background Accents */}
                      <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${
                        activeTab === 0 ? "from-green-500/40" :
                        activeTab === 1 ? "from-amber-500/40" :
                        "from-fuchsia-500/40"
                      } via-transparent to-transparent pointer-events-none transition-colors duration-500`} />
                      
                      <div className={`w-24 h-24 rounded-full border flex items-center justify-center mb-8 relative z-10 transition-all duration-500 group-hover:scale-110 ${
                        activeTab === 0 ? "bg-green-500/20 border-green-500/50 shadow-[0_0_30px_rgba(74,222,128,0.3)]" :
                        activeTab === 1 ? "bg-amber-500/20 border-amber-500/50 shadow-[0_0_30px_rgba(251,191,36,0.3)]" :
                        "bg-fuchsia-500/20 border-fuchsia-500/50 shadow-[0_0_30px_rgba(232,121,249,0.3)]"
                      }`}>
                        {activeTab === 0 ? <ShieldCheck className="w-12 h-12 text-green-400" /> :
                         activeTab === 1 ? <Activity className="w-12 h-12 text-amber-400" /> :
                         <Zap className="w-12 h-12 text-fuchsia-400" />}
                      </div>
                      
                      <div className="text-2xl font-bold text-white mb-3 relative z-10 text-center">
                        {activeTab === 0 ? "Connection Secured" :
                         activeTab === 1 ? "AI Analyzing Risk" :
                         "Action Plan Ready"}
                      </div>
                      <div className="text-sm text-zinc-400 text-center max-w-xs relative z-10">
                        {activeTab === 0 ? "Your facility data is securely synced and encrypted." :
                         activeTab === 1 ? "Running thousands of climate simulations on your assets." :
                         "Mitigation strategies deployed to your dashboard."}
                      </div>
                      
                      <div className="absolute top-6 right-6 w-14 h-7 bg-white/5 border border-white/10 rounded-full flex items-center p-1 relative z-10">
                        <div className={`w-5 h-5 rounded-full transition-all duration-500 ${
                          activeTab === 0 ? "bg-green-400 ml-auto shadow-[0_0_15px_#4ade80]" :
                          activeTab === 1 ? "bg-amber-400 mx-auto shadow-[0_0_15px_#fbbf24] animate-pulse" :
                          "bg-fuchsia-400 shadow-[0_0_15px_#e879f9]"
                        }`}></div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Key Metrics / Stats Section */}
        <section className="py-20 relative bg-fuchsia-900/10 border-y border-fuchsia-500/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6">
                Our Impact
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Key Metrics That Drive Resilience</h2>
              <p className="text-zinc-400">Empowering smart operational decisions with scale and security.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Customer Retention', value: '92%' },
                { label: 'Active Users/Month', value: '57,204' },
                { label: 'Scenarios Tracked', value: '312,488' },
                { label: 'API Integrations', value: '3,412' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-fuchsia-500 mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Benefits Grid */}
        <section id="benefits" className="py-24 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold text-white mb-12 tracking-tight text-center">Ours Template Will Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 rounded-2xl bg-[#111116] border border-white/10 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Connect with my team</h3>
                  <p className="text-sm text-zinc-400">Collaborate securely across departments.</p>
                </div>
                <div className="mt-8 flex -space-x-4">
                  {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-[#111116] bg-zinc-700"></div>)}
                </div>
              </div>
              <div className="md:col-span-2 rounded-2xl bg-[#111116] border border-white/10 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Daily Risk History</h3>
                  <p className="text-sm text-zinc-400">Track exposure fluctuations day by day.</p>
                </div>
                <div className="mt-8 h-20 flex items-end gap-2">
                  {[10,20,15,30,25,40,35,50,45,60].map((h,i) => <div key={i} style={{height: `${h}%`}} className="w-full bg-fuchsia-500/20 rounded-t-sm border-t border-fuchsia-500"></div>)}
                </div>
              </div>
              <div className="md:col-span-1 rounded-2xl bg-[#111116] border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-2">Automated Tracking</h3>
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-fuchsia-500/20 flex items-center justify-center"><Activity className="w-4 h-4 text-fuchsia-400"/></div>
                  <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="md:col-span-1 rounded-2xl bg-[#111116] border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-2">24/7 Mobile Access</h3>
                <div className="mt-6 flex justify-center">
                  <Smartphone className="w-16 h-16 text-zinc-600" />
                </div>
              </div>
              <div className="md:col-span-1 rounded-2xl bg-[#111116] border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-2">Smarter Decisions, Every Day</h3>
                <p className="text-sm text-zinc-400 mt-4">AI-driven insights delivered to your inbox.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Testimonials */}
        <section className="py-24 relative bg-black">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6">
                Testimonials
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tight">What Our Users Are Saying?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { name: "Darlene Robertson", role: "Supply Chain Director", quote: "Since switching to this platform, we've gained full visibility into our exposures. The insights helped us mitigate costs by 18% in just three months!" },
                { name: "Alex Nguyen", role: "Operations Manager", quote: "The AI stress testing is a game changer. We can simulate flood scenarios across our entire portfolio in seconds instead of weeks." },
                { name: "Maria Lopez", role: "Risk Lead", quote: "Aesthetically pleasing and incredibly powerful. Communicating climate risk to the board has never been easier or more compelling." }
              ].map((t, i) => (
                <div key={i} className="p-8 rounded-2xl bg-[#111116] border border-white/10 flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-fuchsia-500 text-fuchsia-500" />)}
                  </div>
                  <p className="text-zinc-300 flex-1 mb-8">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-zinc-700"></div>
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-xs text-zinc-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10">
              <div className="flex -space-x-3 mb-4">
                {[1,2,3,4,5].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-700"></div>)}
              </div>
              <div className="text-sm font-medium text-zinc-400">Join 14,321+ other loving customers</div>
            </div>
          </div>
        </section>

        {/* 10. Pricing Plans */}
        <section id="pricing" className="py-24 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Simple, transparent pricing</h2>
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm font-bold ${!isYearly ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
                <button 
                  onClick={() => setIsYearly(!isYearly)}
                  className="w-12 h-6 rounded-full bg-white/10 relative p-1 transition-colors"
                >
                  <div className={`w-4 h-4 rounded-full bg-fuchsia-500 transition-transform ${isYearly ? 'translate-x-6' : ''}`}></div>
                </button>
                <span className={`text-sm font-bold ${isYearly ? 'text-white' : 'text-zinc-500'}`}>Yearly</span>
                <span className="px-2 py-1 rounded bg-fuchsia-500/20 text-fuchsia-400 text-xs font-bold">15% OFF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Standard */}
              <div className="rounded-2xl p-8 bg-[#111116] border border-white/10 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">Standard Plan</h3>
                <div className="text-zinc-400 text-sm mb-6">Core features, basic scans.</div>
                <div className="text-4xl font-black text-white mb-8">${isYearly ? '1,700' : '2,000'}<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white mb-8">Get Started</Button>
                <div className="space-y-4 flex-1">
                  {['Up to 5 facilities', 'Basic climate models', 'Community support'].map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-fuchsia-500" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional */}
              <div className="rounded-2xl p-8 bg-[#1a1a24] border-2 border-fuchsia-500 relative flex flex-col transform md:-translate-y-4 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-fuchsia-500 text-white text-xs font-bold uppercase tracking-wider">Most popular</div>
                <h3 className="text-xl font-bold text-white mb-2">Professional Plan</h3>
                <div className="text-zinc-400 text-sm mb-6">Full performance suite.</div>
                <div className="text-4xl font-black text-white mb-8">${isYearly ? '3,400' : '4,000'}<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                <Button className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white mb-8">Get Started</Button>
                <div className="space-y-4 flex-1">
                  {['Unlimited facilities', 'Advanced stress testing', 'Priority 24/7 support', 'Custom reporting'].map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-fuchsia-500" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise */}
              <div className="rounded-2xl p-8 bg-[#111116] border border-white/10 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">Enterprise Plan</h3>
                <div className="text-zinc-400 text-sm mb-6">Custom solutions, dedicated.</div>
                <div className="text-4xl font-black text-white mb-8">${isYearly ? '8,500' : '10,000'}<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white mb-8">Contact Sales</Button>
                <div className="space-y-4 flex-1">
                  {['Custom integrations', 'Dedicated account manager', 'White-labeling', 'On-premise deployment'].map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-fuchsia-500" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-zinc-500 mt-12">Are you a new user? You'll get a free trial for 1 month until 30 August, 2026.</p>
          </div>
        </section>

        {/* 11. Interactive Accordion FAQ */}
        <section id="faq" className="py-24 relative max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight">Got Questions? We've Got Answers.</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is ClimateGuard secure for storing operational data?", a: "Yes, we use bank-level AES-256 encryption to ensure all your operational and facility data is kept strictly confidential and secure." },
              { q: "Which ERPs or apps can I connect with?", a: "We integrate seamlessly with SAP, Oracle, NetSuite, and hundreds of other enterprise tools via our robust API." },
              { q: "Can I track single facility risks?", a: "Absolutely. You can track individual assets or aggregate risk across your entire global portfolio." },
              { q: "Is there a free trial available?", a: "Yes! All new users get a 30-day full-featured free trial to test out the resilience dashboard." },
              { q: "Does ClimateGuard have a mobile app?", a: "Yes, our mobile app is available for iOS and Android, giving you real-time alerts wherever you are." }
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#111116] overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-white">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-zinc-400 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* TextLoop Decorator */}
        <section className="py-20 overflow-hidden border-y border-white/5 bg-[#0c0c10]/50">
          {/* @ts-expect-error - React Bits components lack full TS definitions */}
          <TextLoop
            text="CLIMATEGUARD ✦ AI RESILIENCE ✦ RISK ANALYTICS ✦ FUTURE-PROOF"
            shape="wave"
            speed={90}
            direction="forward"
            separator="✦"
            curviness={100}
            fontSize={42}
            fontWeight={800}
            letterSpacing={4}
            uppercase
            color="#ffffff"
            ribbon={true}
            ribbonColor="#ec4899"
            ribbonWidth={60}
            pauseOnHover={false}
          />
        </section>



        {/* 12. Pre-Footer Call to Action */}
        <section className="py-24 px-4 flex justify-center">
          <BorderGlow
            className="w-full max-w-5xl"
            glowColor="320 80 50"
            backgroundColor="#0c0c10"
            colors={['#ec4899', '#8b5cf6', '#0ea5e9']}
            animated={true}
          >
            <div className="relative p-16 text-center text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/40 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to Take Control of Your Risk?</h2>
                <p className="text-lg text-zinc-300 mb-10 max-w-2xl mx-auto">Join thousands who've transformed their resilience management with our AI-powered platform.</p>
                {/* @ts-expect-error - React Bits components lack full TS definitions */}
                <StarBorder as={Link} href="/login" color="#f472b6" speed="4s" backgroundColor="#ffffff" textColor="#000000" borderColor="#ffffff" className="hover:scale-105 transition-transform">
                  <span className="font-bold text-lg px-4">Get Started</span>
                </StarBorder>
              </div>
            </div>
          </BorderGlow>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Grainient
            color1="#ec4899"
            color2="#8b5cf6"
            color3="#0f172a"
            timeSpeed={0.1}
            warpStrength={2.0}
            warpSpeed={1.0}
            grainAmount={0.05}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">ClimateGuard</span>
              </div>
              <p className="text-zinc-400 mb-6 max-w-xs">Subscribe to our newsletter for the latest insights on climate resilience.</p>
              <div className="flex gap-2 max-w-sm" suppressHydrationWarning>
                <input suppressHydrationWarning type="email" placeholder="Enter your email" className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 h-12 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-colors" />
                <StarBorder as="button" suppressHydrationWarning color="#f472b6" speed="4s" backgroundColor="#ec4899" textColor="#ffffff" borderColor="#db2777" className="hover:opacity-90 transition-opacity">
                  <span className="font-bold px-2">Submit</span>
                </StarBorder>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="/" className="hover:text-fuchsia-400">Home</Link></li>
                <li><Link href="/#features" className="hover:text-fuchsia-400">Feature</Link></li>
                <li><Link href="/#integration" className="hover:text-fuchsia-400">Integration</Link></li>
                <li><Link href="/contact" className="hover:text-fuchsia-400">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Other Pages</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="/404" className="hover:text-fuchsia-400">404 Error</Link></li>
                <li><Link href="/privacy" className="hover:text-fuchsia-400">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-fuchsia-400">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-zinc-500">
            <div>© 2026 ClimateGuard. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white">LinkedIn</Link>
              <Link href="#" className="hover:text-white">Instagram</Link>
              <Link href="#" className="hover:text-white">Twitter</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
