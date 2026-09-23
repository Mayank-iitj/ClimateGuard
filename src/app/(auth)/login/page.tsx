import { Button } from "@/components/ui/button"
import { loginWithGoogle } from "@/app/actions/auth"
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
          <form action={loginWithGoogle}>
            <Button 
              type="submit"
              className="w-full bg-white text-black hover:bg-zinc-200 h-12 text-base font-bold"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
          </form>


        </CardContent>
      </Card>
    </div>
  )
}
