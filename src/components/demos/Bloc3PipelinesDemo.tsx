import React from 'react';
import InteractiveDemoPlayer from '../InteractiveDemoPlayer';
import { Workflow, Globe, Truck, CheckCircle2, Zap } from 'lucide-react';

export default function Bloc3PipelinesDemo() {
    const steps: any[] = [
        {
            type: 'browser',
            action: "Data Orchestration View",
            subtitle: "Global pipeline execution interface using Apache Airflow.",
            output: (
                <div className="bg-slate-900 border text-left border-slate-700 rounded-lg p-4 font-sans text-slate-200 flex flex-col gap-3 h-full animate-in fade-in zoom-in duration-500 shadow-sm w-full">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                        <span className="font-bold text-slate-100 flex items-center gap-2"><Workflow size={16} className="text-amber-400" /> Airflow DAGs / auroratech_pipeline</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">RUNNING</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-4 py-2">
                        <div className="flex items-center gap-3 bg-slate-800 p-2 rounded border border-emerald-500/50">
                            <CheckCircle2 size={16} className="text-emerald-400" />
                            <span className="text-sm">extract_frankfurter_fx</span>
                            <span className="text-xs text-slate-500 ml-auto">0.8s</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800 p-2 rounded border border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
                            <Zap size={16} className="text-amber-400 animate-pulse" />
                            <span className="text-sm">simulate_logistics_delay</span>
                            <span className="text-xs text-amber-400 font-mono ml-auto">processing...</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded border border-slate-700">
                            <div className="w-4 h-4 rounded-full border-2 border-slate-600"></div>
                            <span className="text-sm text-slate-500">transform_ocean_to_air</span>
                            <span className="text-xs text-slate-600 ml-auto">queued</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            type: 'browser',
            action: "Global Procurement API",
            subtitle: "Connecting to internal logistics signals and external banking APIs.",
            output: (
                <div className="bg-white border text-left border-gray-200 rounded-lg p-4 font-sans text-slate-800 flex flex-col gap-3 h-full animate-in fade-in slide-in-from-right-8 duration-500 w-full">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-bold text-slate-700 flex items-center gap-2"><Globe size={16} className="text-indigo-600"/> API Telemetry</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="bg-indigo-50 border border-indigo-200 rounded p-3">
                            <div className="text-xs text-indigo-500 font-bold uppercase mb-1">Frankfurter Banking API</div>
                            <div className="text-sm font-mono">EUR/USD = <span className="font-bold text-indigo-700">1.0852</span></div>
                        </div>
                        <div className="bg-rose-50 border border-rose-200 rounded p-3">
                            <div className="text-xs text-rose-500 font-bold uppercase mb-1">Supply Chain Pulse</div>
                            <div className="flex items-center gap-2 text-sm">
                                <Truck size={14} className="text-rose-600" />
                                <span className="font-mono text-rose-700">VND-NV-01 (Taiwan) delayed by 12d</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            type: 'browser',
            action: "Business Logic Transformation",
            subtitle: "Applying data rules based on external constraints.",
            output: (
                <div className="bg-slate-900 border text-left border-slate-700 rounded-lg p-4 font-sans text-white flex flex-col gap-3 h-full animate-in fade-in duration-500 w-full shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-2 z-10">
                        <span className="font-bold flex items-center gap-2"><Workflow size={14} className="text-amber-400" /> transform_ocean_to_air rule</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center py-2 z-10">
                        <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-4 rounded-lg border border-slate-800 leading-relaxed">
                            <p className="text-slate-500 mb-2"># Auto-routing based on delay threshold</p>
                            <p>if (vendor.delay_days {'>'} 10) {'{'}</p>
                            <p className="pl-4">route = 'Air France Cargo';</p>
                            <p className="pl-4">freight_cost_eur = 45.00; <span className="text-amber-500">// Up from 5.00</span></p>
                            <p className="pl-4 text-blue-400">log('Reroute executed due to risk.');</p>
                            <p>{'}'}</p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <InteractiveDemoPlayer 
            title="Loom Simulation: Real-Time Pipelines" 
            steps={steps} 
            accentColor="amber" 
        />
    );
}

