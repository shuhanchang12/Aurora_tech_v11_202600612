import React, { useState, useEffect } from 'react';
import { Database, Server, Cloud, Cpu, LineChart, Shield, GitBranch, Terminal, Globe, ArrowRight, CheckCircle2, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './demos/Bloc1GovernanceDemo';

export default function InteractiveArchitectureDiagram() {
    const [activeLayer, setActiveLayer] = useState<'all' | 'govern' | 'infra' | 'pipeline' | 'ai'>('all');
    const [dataFlow, setDataFlow] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setDataFlow(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const opacity = (layer: string) => {
        if (activeLayer === 'all') return 'opacity-100';
        return activeLayer === layer ? 'opacity-100 ring-2 ring-blue-500 shadow-xl scale-[1.02]' : 'opacity-40 grayscale-[50%] blur-[1px]';
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto w-full p-8 lg:p-12 shadow-sm h-full flex flex-col"
        >
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0 text-slate-800">
                <div>
                   <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-display mb-2">System Architecture Map</h1>
                   <p className="text-slate-500 text-sm font-medium">Interactive operational topology and core dependency graph.</p>
                </div>
                <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm shadow-slate-200/50">
                    <button onClick={() => setActiveLayer('all')} className={cn("px-4 py-2 text-xs font-semibold rounded-lg transition-all", activeLayer==='all' ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100")}>Full Stack</button>
                    <button onClick={() => setActiveLayer('govern')} className={cn("px-4 py-2 text-xs font-semibold rounded-lg transition-all", activeLayer==='govern' ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-100")}>Security & BI</button>
                    <button onClick={() => setActiveLayer('infra')} className={cn("px-4 py-2 text-xs font-semibold rounded-lg transition-all", activeLayer==='infra' ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "text-slate-600 hover:bg-slate-100")}>Infrastructure</button>
                    <button onClick={() => setActiveLayer('pipeline')} className={cn("px-4 py-2 text-xs font-semibold rounded-lg transition-all", activeLayer==='pipeline' ? "bg-amber-600 text-white shadow-md shadow-amber-500/20" : "text-slate-600 hover:bg-slate-100")}>Data Ops</button>
                    <button onClick={() => setActiveLayer('ai')} className={cn("px-4 py-2 text-xs font-semibold rounded-lg transition-all", activeLayer==='ai' ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" : "text-slate-600 hover:bg-slate-100")}>MLOps Engine</button>
                </div>
             </div>

             <div className="flex-1 bg-slate-900 rounded-2xl relative overflow-hidden p-12 border border-slate-800 shadow-2xl flex flex-col">
                
                {dataFlow && activeLayer === 'all' && (
                    <div className="absolute top-[40%] left-[25%] right-[25%] border-t-2 border-dashed border-emerald-500/50 animate-[pulse_1s_infinite]"></div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-full">
                    
                    {/* Data Sources / API */}
                    <div className={cn("flex flex-col space-y-5 transition-all duration-700", opacity('pipeline'))}>
                        <h3 className="text-amber-400 font-mono text-[10px] tracking-[0.2em] text-center mb-6 flex items-center justify-center gap-2 uppercase">
                            <Navigation size={12} className="rotate-90" /> Ingestion Layer
                        </h3>
                        
                        <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-lg relative flex flex-col items-center group hover:border-amber-500/30 transition-colors">
                            <Globe className="text-amber-400 mb-4 group-hover:scale-110 transition-transform" size={28} />
                            <span className="text-slate-200 font-display text-sm">Frankfurter API</span>
                            <span className="text-slate-500 text-[10px] uppercase tracking-wider mt-1 font-mono">Live Streams</span>
                        </div>

                        <div className="flex justify-center py-1">
                             <ArrowRight className={cn("text-slate-700 transition-colors duration-300 transform rotate-90 md:rotate-0", dataFlow ? "text-amber-500/50" : "")} />
                        </div>

                        <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-amber-700/30 shadow-[0_0_30px_rgba(251,191,36,0.05)] relative flex flex-col items-center group hover:border-amber-500/50 transition-colors">
                            <GitBranch className="text-amber-400 mb-4 group-hover:scale-110 transition-transform" size={28} />
                            <span className="text-slate-200 font-display text-sm">Apache Airflow</span>
                            <span className="text-slate-500 text-[10px] uppercase tracking-wider mt-1 font-mono">Python ETL DAGs</span>
                        </div>
                    </div>

                    {/* Infrastructure & DW */}
                    <div className={cn("flex flex-col space-y-5 transition-all duration-700", opacity('infra'))}>
                         <h3 className="text-emerald-400 font-mono text-[10px] tracking-[0.2em] text-center mb-6 flex items-center justify-center gap-2 uppercase">
                            <Database size={12} /> Storage & IaC
                        </h3>
                        
                        <div className="bg-slate-900/80 backdrop-blur-sm p-1 rounded-2xl border border-emerald-900 shadow-lg relative flex flex-col items-center mt-auto mb-auto h-[70%] justify-center group hover:border-emerald-700 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-blue-500/5 rounded-2xl pointer-events-none"></div>
                            <div className="relative w-full h-full rounded-xl flex flex-col items-center justify-center p-8">
                                <Database className="text-emerald-400 mb-6 group-hover:-translate-y-1 transition-transform" size={40} />
                                <span className="text-white font-display text-lg tracking-wide">PostgreSQL</span>
                                <span className="text-emerald-500 text-xs mt-3 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Data Warehouse</span>
                                
                                <div className="mt-8 flex items-center gap-3 px-4 py-2 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
                                    <Cloud size={16} className="text-blue-400" />
                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Docker + Terraform</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI / MLOps */}
                    <div className={cn("flex flex-col space-y-5 transition-all duration-700", opacity('ai'))}>
                         <h3 className="text-purple-400 font-mono text-[10px] tracking-[0.2em] text-center mb-6 flex items-center justify-center gap-2 uppercase">
                            <Cpu size={12} /> MLOps Engine
                        </h3>
                        
                        <div className="bg-slate-900/80 backdrop-blur-sm p-5 rounded-2xl border border-purple-800/30 shadow-[0_0_30px_rgba(168,85,247,0.05)] relative flex flex-col items-center group hover:border-purple-500/50 transition-colors">
                            <Cpu className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                            <span className="text-slate-200 font-display text-sm">Target Classifier</span>
                            <span className="text-slate-500 text-[10px] mt-1 font-mono">RandomForest.pkl</span>
                        </div>

                        <div className="flex justify-center py-1">
                             <ArrowRight className={cn("text-slate-700 transition-colors duration-300 transform rotate-90 md:rotate-0", dataFlow ? "text-purple-500/50" : "")} />
                        </div>

                        <div className="bg-slate-900/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-800 shadow-lg relative flex flex-col items-center group hover:border-purple-500/30 transition-colors">
                            <Server className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                            <span className="text-slate-200 font-display text-sm">FastAPI Endpoint</span>
                            <span className="text-slate-500 text-[10px] mt-1 font-mono">Live Model Serving</span>
                        </div>

                         <div className="flex justify-center py-1">
                             <Terminal className={cn("text-slate-700")} size={16} />
                        </div>

                        <div className="bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-dashed relative flex flex-col items-center group hover:border-slate-600 transition-colors">
                            <span className="text-slate-300 text-xs font-display">Evidently AI</span>
                            <span className="text-slate-600 text-[10px] mt-1 font-mono uppercase tracking-widest">Model Drift Alerts</span>
                        </div>
                    </div>

                    {/* Governance & BI */}
                    <div className={cn("flex flex-col space-y-5 transition-all duration-700 h-full", opacity('govern'))}>
                        <h3 className="text-blue-400 font-mono text-[10px] tracking-[0.2em] text-center mb-6 flex items-center justify-center gap-2 uppercase">
                            <Shield size={12} /> BI & Access
                        </h3>
                        
                        <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-900/50 shadow-[0_0_30px_rgba(59,130,246,0.05)] relative flex flex-col items-center mt-auto group hover:border-blue-500/50 transition-colors">
                            <div className="absolute top-3 right-3"><CheckCircle2 className="text-emerald-500/70" size={14} /></div>
                            <Shield className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" size={28} />
                            <span className="text-slate-200 font-display text-sm">RBAC Gateway</span>
                            <span className="text-slate-500 text-[10px] mt-2 text-center uppercase tracking-widest font-mono">Zero-Trust Access<br/>GDPR Ruleset</span>
                        </div>

                        <div className="bg-blue-600 p-1 rounded-2xl shadow-xl shadow-blue-600/10 flex-1 flex flex-col relative group overflow-hidden mt-4">
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/50 flex flex-col items-center justify-center p-6 border border-slate-800 rounded-2xl group-hover:from-slate-900 group-hover:to-slate-800 transition-colors">
                                <LineChart className="text-blue-400 mb-5 group-hover:-translate-y-1 transition-transform" size={36} />
                                <span className="text-white font-display font-medium text-lg text-center leading-tight">Executive<br/>React Portal</span>
                            </div>
                        </div>
                    </div>

                </div>

             </div>
        </motion.div>
    )
}
