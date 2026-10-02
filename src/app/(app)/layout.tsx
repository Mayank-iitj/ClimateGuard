import { Globe, LayoutDashboard, Activity, Zap, Folder, Settings, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import ChatCopilot from '@/components/ui/chat-copilot';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#fdfbf7] text-[#7c1027] selection:bg-rose-600/30 overflow-hidden font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 border-r border-[#7c1027]/20 bg-[#efe5d1] hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#7c1027]/20">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-800 to-rose-400 flex items-center justify-center shadow-[0_0_15px_rgba(124,16,39,0.3)]">
              <Globe className="w-4 h-4 text-[#7c1027]" />
            </div>
            <span className="font-bold text-lg tracking-tight">ClimateGuard</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" />
          <NavItem href="/climate-risk" icon={<Globe size={20} />} label="Climate Risk" />
          <NavItem href="/impact" icon={<Activity size={20} />} label="Operational Impact" />
          <NavItem href="/resilience-plan" icon={<Zap size={20} />} label="Resilience Plan" />
          <NavItem href="/finance-pack" icon={<Folder size={20} />} label="Reports" />
        </nav>

        <div className="p-4 border-t border-[#7c1027]/20">
          <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" />
          <form action={logout}>
            <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#7c1027]/70 hover:text-[#7c1027] hover:bg-[#7c1027]/5 transition-colors mt-2 text-left">
              <LogOut size={20} />
              <span className="font-medium text-sm">Log Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header (Mobile) */}
        <header className="h-16 border-b border-[#7c1027]/20 bg-[#efe5d1] flex items-center justify-between px-4 md:hidden">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-800 to-rose-400 flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#7c1027]" />
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="text-[#7c1027]/70 hover:text-[#7c1027]">
            <Menu size={24} />
          </Button>
        </header>

        {/* Top Header removed per request */}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {/* Global Background Glows */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-800/5 blur-[150px]" />
            <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-rose-400/5 blur-[120px]" />
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto h-full">
            {children}
          </div>
        </div>
        
        {/* Global Chat Copilot */}
        <ChatCopilot />
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  // In a real app, use usePathname to set active state. 
  // For simplicity, we'll use a clean hover effect.
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#7c1027]/70 hover:text-[#7c1027] hover:bg-[#7c1027]/5 hover:shadow-[inset_2px_0_0_#ec4899] transition-all">
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}
