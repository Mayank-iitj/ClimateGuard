"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThermometerSun, Waves, Wind } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";

export default function StressTestPage() {
  const [investment, setInvestment] = useState(20); // $M
  const [damages, setDamages] = useState(10); // $M per year
  const [timeline, setTimeline] = useState(5); // years

  const chartData = useMemo(() => {
    const data = [];
    let currentCost = 0;
    let currentSavings = -investment; // Initial cost of resilience investment
    
    for (let year = 1; year <= timeline; year++) {
      currentCost += damages * Math.pow(1.1, year); // Damages compound over time due to worsening climate
      
      // Assume investment mitigates 80% of damages
      const avoidedDamages = (damages * Math.pow(1.1, year)) * 0.8;
      currentSavings += avoidedDamages;
      
      data.push({
        year: `Year ${year}`,
        costOfInaction: Math.round(currentCost),
        netROI: Math.round(currentSavings)
      });
    }
    return data;
  }, [investment, damages, timeline]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Financial ROI & Impact Calculator</h1>
        <p className="text-zinc-400">Calculate the exact financial return of climate resilience investments for MSME portfolios.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Sidebar */}
        <div className="space-y-6">
          <Card className="bg-[#0c0c10]/80 border-fuchsia-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(236,72,153,0.1)]">
            <CardHeader>
              <CardTitle className="text-white">Investment Variables</CardTitle>
              <CardDescription className="text-zinc-400">Adjust sliders to simulate financial ROI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2 text-fuchsia-400">
                    <ThermometerSun className="w-4 h-4" /> Capital Expenditure
                  </label>
                  <span className="text-sm font-bold text-white">${investment}M</span>
                </div>
                <input 
                  type="range" 
                  min="5" max="100" step="5" 
                  value={investment} 
                  onChange={(e) => setInvestment(parseFloat(e.target.value))}
                  className="w-full accent-fuchsia-500" 
                />
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>$5M</span>
                  <span>$100M</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2 text-rose-400">
                    <Waves className="w-4 h-4" /> Expected Annual Damages
                  </label>
                  <span className="text-sm font-bold text-white">${damages}M/yr</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="50" step="1" 
                  value={damages} 
                  onChange={(e) => setDamages(parseFloat(e.target.value))}
                  className="w-full accent-rose-500" 
                />
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>$1M</span>
                  <span>$50M</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2 text-blue-400">
                    <Wind className="w-4 h-4" /> Timeline (Years)
                  </label>
                  <span className="text-sm font-bold text-white">{timeline} Years</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="10" step="1" 
                  value={timeline} 
                  onChange={(e) => setTimeline(parseInt(e.target.value))}
                  className="w-full accent-blue-500" 
                />
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>1 Yr</span>
                  <span>10 Yrs</span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Dynamic Chart Area */}
        <div className="lg:col-span-2">
          <BorderGlow
            className="w-full h-full rounded-2xl"
            glowColor="236 72 153"
            backgroundColor="#0c0c10"
            colors={['#ec4899', '#38bdf8', '#818cf8']}
            animated={true}
          >
            <div className="p-6 h-full flex flex-col bg-[#0c0c10]/95 backdrop-blur-xl rounded-2xl">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">Cost of Inaction vs. Net ROI</h3>
                  <p className="text-sm text-zinc-400">Comparing cumulative damages against resilience investment returns.</p>
                </div>
                <div className="bg-fuchsia-500/10 px-4 py-2 rounded-xl border border-fuchsia-500/30">
                   <div className="text-xs text-fuchsia-400">Projected Savings</div>
                   <div className="text-2xl font-bold text-white">${chartData[chartData.length - 1]?.netROI}M</div>
                </div>
              </div>
              <div className="flex-1 min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111116', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: any) => [`$${value}M`, '']}
                    />
                    <Line type="monotone" name="Cost of Inaction (Damages)" dataKey="costOfInaction" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 8, fill: '#ef4444' }} />
                    <Line type="monotone" name="Net ROI (Savings - Investment)" dataKey="netROI" stroke="#22c55e" strokeWidth={3} activeDot={{ r: 8, fill: '#22c55e', stroke: '#0c0c10', strokeWidth: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </div>
  )
}
