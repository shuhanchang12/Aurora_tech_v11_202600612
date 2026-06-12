import React from 'react';
import InteractiveDemoPlayer from '../InteractiveDemoPlayer';
import { Database, Server, Activity, ShieldCheck, Cpu } from 'lucide-react';

export default function Bloc2ArchitectureDemo() {
    const steps: any[] = [
        {
            type: 'browser',
            action: "Global Infrastructure Deployment",
            subtitle: "Provisioning Docker containers and server environments via Terraform.",
            output: (
                <div className="bg-slate-900 border text-left border-slate-700 rounded-lg p-4 font-sans text-slate-200 flex flex-col gap-3 h-full animate-in fade-in zoom-in duration-500 shadow-sm w-full">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                        <span className="font-bold text-slate-100 flex items-center gap-2"><Server size={16} className="text-emerald-400" /> Server Fleet Control</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">ONLINE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800 p-3 rounded border border-slate-700 flex flex-col items-center">
                            <span className="text-[10px] text-slate-400 font-bold uppercase mb-2">Production DB (PostgreSQL)</span>
                            <Cpu size={24} className="text-blue-400 mb-2" />
                            <span className="text-sm font-bold text-slate-100">us-east-1</span>
                            <span className="text-xs text-blue-400">Memory: 48%</span>
                        </div>
                        <div className="bg-slate-800 p-3 rounded border border-slate-700 flex flex-col items-center">
                            <span className="text-[10px] text-slate-400 font-bold uppercase mb-2">Orchestration (Airflow)</span>
                            <Activity size={24} className="text-purple-400 mb-2" />
                            <span className="text-sm font-bold text-slate-100">eu-west-2</span>
                            <span className="text-xs text-purple-400">Load: Low</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            type: 'browser',
            action: "Database Schema Initialization",
            subtitle: "Setting up Star Schema with Dimension and Fact tables.",
            output: (
                <div className="bg-white border text-left border-gray-200 rounded-lg p-4 font-sans text-slate-800 flex flex-col gap-3 h-full animate-in fade-in slide-in-from-right-8 duration-500 w-full">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-bold text-slate-700 flex items-center gap-2"><Database size={16} className="text-blue-600"/> Data Warehouse Admin</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">CONNECTED</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded p-2 text-sm font-mono text-slate-700">
                        <div className="text-blue-600 font-bold mb-1">Schemas provisioned:</div>
                        <div className="pl-2">├─ dim_chromebook_vendor <span className="text-emerald-500">✓</span></div>
                        <div className="pl-2">├─ dim_date <span className="text-emerald-500">✓</span></div>
                        <div className="pl-2">├─ fact_chromebook_margin_risk <span className="text-emerald-500">✓</span></div>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded p-3 flex gap-3 items-center">
                        <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
                        <span className="text-sm text-emerald-800 font-medium">Sensitive procurement tables secured with strict RBAC rules.</span>
                    </div>
                </div>
            )
        },
        {
            type: 'browser',
            action: "System Observability Watch",
            subtitle: "Monitoring database performance and connections.",
            output: (
                <div className="bg-slate-900 border text-left border-slate-700 rounded-lg p-4 font-sans text-white flex flex-col gap-3 h-full animate-in fade-in duration-500 w-full shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                    <div className="flex justify-between items-center border-b border-slate-700 pb-2 z-10">
                        <span className="font-bold flex items-center gap-2"><Activity size={14} className="text-amber-400" /> Live Telemetry</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2 z-10">
                        <div className="bg-slate-800 p-2 rounded border border-slate-700 flex justify-between items-center">
                            <span className="text-xs text-slate-400">Queries / Sec</span>
                            <span className="text-sm font-mono text-amber-400">842 qps</span>
                        </div>
                        <div className="bg-slate-800 p-2 rounded border border-slate-700 flex justify-between items-center">
                            <span className="text-xs text-slate-400">Active Connections</span>
                            <span className="text-sm font-mono text-amber-400">12 / 100</span>
                        </div>
                        <div className="bg-slate-800 p-2 rounded border border-slate-700 flex justify-between items-center">
                            <span className="text-xs text-slate-400">Storage Capacity</span>
                            <span className="text-sm font-mono text-emerald-400">22% Used</span>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <InteractiveDemoPlayer 
            title="Loom Simulation: IT Infrastructure Deployment" 
            steps={steps} 
            accentColor="blue" 
        />
    );
}

