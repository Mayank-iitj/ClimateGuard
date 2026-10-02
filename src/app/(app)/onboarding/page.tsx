"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UploadCloud, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import BorderGlow from "@/components/ui/border-glow";
import { Card, CardContent } from "@/components/ui/card";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [parsedData, setParsedData] = useState<any[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError("Error parsing CSV. Please check the format.");
          return;
        }
        setParsedData(results.data);
      },
      error: (error: any) => {
        setError(error.message);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (parsedData.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedData }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to upload data");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading || success) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#fdfbf7] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-50">
          <div className="w-96 h-96 bg-rose-800/20 rounded-full blur-[100px] animate-pulse" />
        </div>
        <div className="relative z-10 max-w-md w-full px-6 text-center space-y-8">
          <div className="flex justify-center mb-12">
            {success ? (
               <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-in zoom-in duration-300" />
            ) : (
               <Loader2 className="w-16 h-16 text-rose-600 animate-spin" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-[#7c1027]">
            {success ? "Data Ingested Successfully!" : "Processing your portfolio..."}
          </h2>
          <p className="text-[#7c1027]/70">
             {success ? "Redirecting to your tailored dashboard." : "Mapping assets and cross-referencing climate models."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#7c1027]">Onboard Your Portfolio</h1>
        <p className="text-[#7c1027]/70 text-lg">Upload your MSME asset data to generate a dynamic, tailored climate resilience plan.</p>
      </div>

      <BorderGlow glowColor="236 72 153" backgroundColor="#0c0c10" colors={['#ec4899', '#38bdf8']} animated>
        <div className="p-8 bg-[#efe5d1]/95 backdrop-blur-xl rounded-2xl border border-[#7c1027]/10">
          
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors duration-200 ${
              isDragActive ? "border-rose-600 bg-rose-600/5" : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${isDragActive ? "text-rose-500" : "text-[#7c1027]/50"}`} />
            <h3 className="text-xl font-bold text-[#7c1027] mb-2">
              {isDragActive ? "Drop CSV here" : "Drag & Drop your assets.csv"}
            </h3>
            <p className="text-[#7c1027]/70 text-sm">or click to browse files</p>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {parsedData.length > 0 && !error && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2 text-emerald-400">
                   <CheckCircle2 className="w-5 h-5" />
                   <span className="font-semibold">{parsedData.length} facilities detected</span>
                 </div>
                 <button 
                   onClick={handleUpload}
                   className="bg-rose-800 hover:bg-rose-600 text-[#7c1027] px-6 py-2 rounded-full font-bold transition-colors"
                 >
                   Process Data
                 </button>
              </div>
              
              <div className="overflow-hidden rounded-xl border border-[#7c1027]/20">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-[#7c1027]/70 bg-[#7c1027]/5 uppercase">
                    <tr>
                      <th className="px-4 py-3">Facility Name</th>
                      <th className="px-4 py-3">Industry</th>
                      <th className="px-4 py-3">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedData.slice(0, 3).map((row, i) => (
                      <tr key={i} className="border-b border-[#7c1027]/10 bg-[#111116]">
                        <td className="px-4 py-3 text-[#7c1027] font-medium">{row.Facility_Name || 'Unknown'}</td>
                        <td className="px-4 py-3 text-[#7c1027]/80">{row.Industry_Type || '-'}</td>
                        <td className="px-4 py-3 text-[#7c1027]/80">{row.City || '-'}, {row.State || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {parsedData.length > 3 && (
                   <div className="px-4 py-3 bg-[#111116] text-[#7c1027]/50 text-xs text-center border-t border-[#7c1027]/10">
                     + {parsedData.length - 3} more records
                   </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[#7c1027]/20">
            <h4 className="text-sm font-bold text-[#7c1027] mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7c1027]/70" /> Expected CSV Format
            </h4>
            <div className="bg-black/50 p-4 rounded-lg overflow-x-auto text-xs font-mono text-[#7c1027]/70 border border-[#7c1027]/10">
              Facility_Name,Industry_Type,City,State,Annual_Revenue,Monthly_Electricity_Cost,Backup_Power_Type<br/>
              "Miami Port",Infrastructure,"Miami","FL",1200000,4500,"Diesel Genset"<br/>
              "Phoenix HQ",Commercial,"Phoenix","AZ",850000,3200,"Solar + Battery"
            </div>
          </div>
          
        </div>
      </BorderGlow>
    </div>
  );
}
