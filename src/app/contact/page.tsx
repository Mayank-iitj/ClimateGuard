"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle, AlertCircle, Shield, Globe, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit form.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#7c1027] selection:bg-rose-600/30 font-sans">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-rose-800/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-rose-400/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header (Simplified) */}
        <header className="sticky top-0 z-50 px-6 py-4 border-b border-[#7c1027]/10 bg-[#efe5d1]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-800 to-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 text-[#7c1027]" />
              </div>
              <span className="font-bold text-xl tracking-tight">ClimateGuard</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#7c1027]/70">
              <Link href="/#features" className="hover:text-[#7c1027] transition-colors">Features</Link>
              <Link href="/#integration" className="hover:text-[#7c1027] transition-colors">Integration</Link>
              <Link href="/contact" className="text-[#7c1027] transition-colors">Contact</Link>
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-[#7c1027]/80 hover:text-[#7c1027] transition-colors">
                Sign In
              </Link>
              <Link href="/contact" className="bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105">
                Get Started
              </Link>
            </div>
            
            <button className="md:hidden text-[#7c1027]">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Contact Form Section */}
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Let's talk about your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">resilience</span>.
              </h1>
              <p className="text-[#7c1027]/70 text-lg mb-8 max-w-md">
                Whether you need a custom integration, have a question about our enterprise plans, or just want to say hi, our team is ready to help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-[#7c1027]/80">
                  <div className="w-10 h-10 rounded-full bg-[#7c1027]/5 flex items-center justify-center border border-[#7c1027]/20">
                    <Globe className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#7c1027]">Global Headquarters</div>
                    <div className="text-sm text-[#7c1027]/50">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="bg-[#efe5d1]/80 backdrop-blur-md border border-[#7c1027]/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold mb-6 relative z-10">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#7c1027]/70 mb-1.5">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full bg-black/50 border border-[#7c1027]/20 rounded-xl px-4 py-3 text-[#7c1027] placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-600/50 focus:border-rose-600 transition-all disabled:opacity-50"
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#7c1027]/70 mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full bg-black/50 border border-[#7c1027]/20 rounded-xl px-4 py-3 text-[#7c1027] placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-600/50 focus:border-rose-600 transition-all disabled:opacity-50"
                    placeholder="jane@company.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#7c1027]/70 mb-1.5">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full bg-black/50 border border-[#7c1027]/20 rounded-xl px-4 py-3 text-[#7c1027] placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-600/50 focus:border-rose-600 transition-all resize-none disabled:opacity-50"
                    placeholder="How can we help you?"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMessage}
                    </motion.div>
                  )}
                  
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      Message sent successfully!
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-white"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : status === "success" ? (
                    <>Sent <CheckCircle className="w-4 h-4" /></>
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
