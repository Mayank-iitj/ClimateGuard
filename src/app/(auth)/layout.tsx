import PlasmaWave from '@/components/ui/plasma-wave';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <PlasmaWave
          colors={["#A855F7","#06B6D4"]}
          speed1={0.05}
          speed2={0.05}
          focalLength={0.8}
          bend1={1}
          bend2={0.5}
          dir2={1.0}
          rotationDeg={0}
        />
      </div>

      <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden bg-[#efe5d1]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#7c1027]/20 relative z-10">
        
        {/* Left Side (Branding/Context) */}
        <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-between text-[#7c1027] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 to-transparent z-0"></div>
          <div className="relative z-10">
            <div className="font-heading font-bold text-2xl tracking-tight mb-8">CLIMATEGUARD</div>
            <h1 className="font-heading text-4xl font-bold leading-tight mb-6">
              Turn climate uncertainty into an executable resilience plan.
            </h1>
            <p className="text-[#7c1027]/70 text-lg">
              Stress-test your business against extreme weather, quantify financial exposure, and secure resilience financing.
            </p>
          </div>
          <div className="text-sm text-[#7c1027]/50 relative z-10">
            © {new Date().getFullYear()} ClimateGuard Prototype
          </div>
        </div>
        
        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#fdfbf7]/50">
          {children}
        </div>
        
      </div>
    </div>
  )
}
