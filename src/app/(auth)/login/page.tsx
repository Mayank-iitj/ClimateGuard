import { Button } from "@/components/ui/button"
import { loginWithDemo } from "@/app/actions/auth"
import { Shield } from "lucide-react"
import Link from "next/link"
import Waves from "@/components/ui/Waves"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-[#070709] flex items-center justify-center relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Waves
          lineColor="rgba(236, 72, 153, 0.2)"
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

      <Card className="w-full max-w-md bg-[#111116]/80 backdrop-blur-xl border-white/10 text-white relative z-10 shadow-[0_20px_70px_-15px_rgba(236,72,153,0.3)] border">
        <CardHeader className="space-y-4 text-center">

          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-zinc-400 mt-2">
              Sign in to manage your climate risk and resilience dashboard.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <form action={loginWithDemo}>
            <Button 
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white h-12 text-base font-bold"
            >
              Demo Login (One-Click)
            </Button>
          </form>


        </CardContent>
      </Card>
    </div>
  )
}
