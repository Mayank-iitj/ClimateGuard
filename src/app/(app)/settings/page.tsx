"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, Bell, CreditCard, Key, Smartphone, Mail, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile State
  const [profileId, setProfileId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({ company_name: "", industry: "", location: "" });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [userData, setUserData] = useState({ firstName: 'Demo', lastName: 'User', email: 'demo@climateguard.app' });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const names = user.user_metadata?.full_name?.split(' ') || ['Demo', 'User'];
          setUserData({
            firstName: names[0] || 'Demo',
            lastName: names.slice(1).join(' ') || 'User',
            email: user.email || 'demo@climateguard.app'
          });

          const { data, error } = await supabase.from('msme_profiles').select('*').eq('user_id', user.id).maybeSingle();
          if (data && !error) {
            setProfileId(data.id);
            setProfileData({
              company_name: data.company_name,
              industry: data.industry,
              location: data.location
            });
          }
        } else {
          const { data, error } = await supabase.from('msme_profiles').select('*').limit(1).maybeSingle();
          if (data && !error) {
            setProfileId(data.id);
            setProfileData({
              company_name: data.company_name,
              industry: data.industry,
              location: data.location
            });
          }
        }
      } catch (err) {
        console.error("Could not fetch profile", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSaveCompany = async () => {
    if (!profileId) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('msme_profiles')
        .update({
          company_name: profileData.company_name,
          industry: profileData.industry,
          location: profileData.location
        })
        .eq('id', profileId);
        
      if (!error) {
        setSaveStatus("Saved successfully!");
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-zinc-400">Manage your account preferences, security, and billing.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <TabButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={<User size={18} />} label="Profile & Account" />
          <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} icon={<Shield size={18} />} label="Security" />
          <TabButton active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} icon={<Bell size={18} />} label="Notifications" />
          <TabButton active={activeTab === "billing"} onClick={() => setActiveTab("billing")} icon={<CreditCard size={18} />} label="Billing & Plans" />
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card className="bg-[#0c0c10]/80 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                  <CardDescription>Update your MSME profile information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" /></div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Organization Name</label>
                        <input 
                          type="text" 
                          value={profileData.company_name}
                          onChange={(e) => setProfileData({...profileData, company_name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-300">Industry</label>
                          <input 
                            type="text" 
                            value={profileData.industry}
                            onChange={(e) => setProfileData({...profileData, industry: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-300">Location</label>
                          <input 
                            type="text" 
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors" 
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="border-t border-white/5 pt-6 justify-end flex items-center gap-4">
                  {saveStatus && <span className="text-sm text-green-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> {saveStatus}</span>}
                  <Button 
                    onClick={handleSaveCompany} 
                    disabled={isSaving || loading}
                    className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-[#0c0c10]/80 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and public profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                      {userData.firstName.charAt(0)}
                    </div>
                    <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white">Change Avatar</Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">First Name</label>
                      <input type="text" value={userData.firstName} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors opacity-70" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Last Name</label>
                      <input type="text" value={userData.lastName} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors opacity-70" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Email Address</label>
                    <input type="email" value={userData.email} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors opacity-70" />
                  </div>
                </CardContent>
                <CardFooter className="border-t border-white/5 pt-6 justify-end">
                  <Button variant="outline" className="border-white/10 text-white">Update Personal Info</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <Card className="bg-[#0c0c10]/80 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white focus:outline-none focus:border-fuchsia-500 transition-colors" />
                  </div>
                </CardContent>
                <CardFooter className="border-t border-white/5 pt-6 justify-end">
                  <Button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white">Update Password</Button>
                </CardFooter>
              </Card>

              <Card className="bg-[#0c0c10]/80 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/5">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-fuchsia-500/20 rounded-lg text-fuchsia-400">
                        <Smartphone size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white">Authenticator App</div>
                        <div className="text-sm text-zinc-400">Not configured</div>
                      </div>
                    </div>
                    <Button variant="outline" className="border-white/10 bg-white/5 text-white">Enable</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <Card className="bg-[#0c0c10]/80 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Alert Preferences</CardTitle>
                  <CardDescription>Choose what we notify you about.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <AlertTriangle className="text-amber-500 mt-1" />
                      <div>
                        <div className="font-bold text-white">Critical Risk Alerts</div>
                        <div className="text-sm text-zinc-400">Immediate notifications for severe climate threats.</div>
                      </div>
                    </div>
                    <Toggle active={true} />
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Mail className="text-zinc-400 mt-1" />
                      <div>
                        <div className="font-bold text-white">Weekly Reports</div>
                        <div className="text-sm text-zinc-400">A weekly digest of your portfolio's risk exposure.</div>
                      </div>
                    </div>
                    <Toggle active={true} />
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Key className="text-zinc-400 mt-1" />
                      <div>
                        <div className="font-bold text-white">Security Alerts</div>
                        <div className="text-sm text-zinc-400">Get notified when someone logs into your account.</div>
                      </div>
                    </div>
                    <Toggle active={true} />
                  </div>

                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <BorderGlow
                className="w-full"
                glowColor="320 80 50"
                backgroundColor="#0c0c10"
                colors={['#ec4899', '#8b5cf6', '#0ea5e9']}
                animated={false}
              >
                <div className="p-8 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Enterprise Plan</h3>
                      <p className="text-fuchsia-400 font-medium">Active Subscription</p>
                    </div>
                    <div className="text-3xl font-black text-white">$499<span className="text-sm text-zinc-500 font-normal">/mo</span></div>
                  </div>
                  
                  <ul className="space-y-3 text-zinc-300 text-sm mb-8">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-fuchsia-500 w-4 h-4" /> Unlimited asset tracking</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-fuchsia-500 w-4 h-4" /> Custom AI stress-testing scenarios</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-fuchsia-500 w-4 h-4" /> Dedicated account manager</li>
                  </ul>

                  <div className="flex gap-4">
                    <Button className="bg-white text-black hover:bg-zinc-200">Manage Subscription</Button>
                    <Button variant="outline" className="border-white/10 bg-transparent text-white hover:bg-white/5">View Invoices</Button>
                  </div>
                </div>
              </BorderGlow>

              <Card className="bg-[#0c0c10]/80 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-zinc-800 rounded flex items-center justify-center border border-zinc-700">
                        <span className="font-bold italic text-white text-xs">VISA</span>
                      </div>
                      <div>
                        <div className="font-bold text-white">Visa ending in 4242</div>
                        <div className="text-sm text-zinc-400">Expires 12/28</div>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-zinc-400 hover:text-white">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
        active 
          ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-[inset_2px_0_0_#ec4899]' 
          : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

function Toggle({ active }: { active: boolean }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isOn ? 'bg-fuchsia-500' : 'bg-zinc-700'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}
