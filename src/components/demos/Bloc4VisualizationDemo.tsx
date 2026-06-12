import React from 'react';
import InteractiveDemoPlayer from '../InteractiveDemoPlayer';
import { Presentation, Maximize, MousePointerClick, Filter } from 'lucide-react';

export default function Bloc4VisualizationDemo() {
    const steps: any[] = [
        {
            type: 'browser',
            action: "Global Operations View",
            subtitle: "Tracking international notebook shipments and regional component delays.",
            output: (
                <div className="bg-white border text-left border-gray-200 rounded-lg p-4 font-sans text-slate-800 flex flex-col gap-3 h-full animate-in fade-in zoom-in duration-500 shadow-sm w-full">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-bold text-slate-700">AuroraTech / Global Shipping</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">LIVE METRICS</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-slate-50 p-2 rounded border border-slate-100 flex flex-col items-center">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">EU Units Transit</span>
                            <span className="text-xl font-bold text-blue-600">12,450</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded border border-slate-100 flex flex-col items-center">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">US Units Transit</span>
                            <span className="text-xl font-bold text-indigo-600">8,920</span>
                        </div>
                        <div className="bg-rose-50 p-2 rounded border border-rose-100 flex flex-col items-center">
                            <span className="text-[10px] text-rose-500 font-bold uppercase">Avg Delay (KR/TW)</span>
                            <span className="text-xl font-bold text-rose-600">4.2 Days</span>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-100 rounded border border-slate-200 relative overflow-hidden flex items-end p-2 gap-1 items-center justify-center">
                         <div className="text-xs text-slate-400 font-medium absolute top-2 left-2">Global Shipping Volume (30D)</div>
                         {/* Mock Bar Chart */}
                         {[30, 40, 25, 50, 45, 60, 40, 70, 55, 80].map((h, i) => (
                             <div key={i} className="w-4 bg-blue-400 rounded-t-sm" style={{ height: `${h}%` }}></div>
                         ))}
                    </div>
                </div>
            )
        },
        {
            type: 'browser',
            action: "Financial Margin Warning",
            subtitle: "AI detects severe margin compression for European markets due to FX rates.",
            output: (
                <div className="bg-white border text-left border-gray-200 rounded-lg p-4 font-sans text-slate-800 flex flex-col gap-3 h-full animate-in fade-in slide-in-from-right-8 duration-500 w-full">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-bold text-slate-700">Financial Insights / Europe</span>
                        <Filter size={14} className="text-slate-400" />
                    </div>
                    <div className="bg-rose-50 border border-rose-200 rounded p-3 flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center shrink-0">
                            <span className="text-rose-700 font-bold">!</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-rose-800">Margin Alert: EUR/USD Parity Weak</div>
                            <div className="text-xs text-rose-600 mt-1">Air freight cost for NVIDIA GPUs from Taiwan to Paris is causing a 12% margin drop.</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-slate-50 p-2 rounded border border-slate-100">
                             <div className="text-[10px] text-slate-500 uppercase">Current Margin</div>
                             <div className="text-lg font-bold text-rose-600">14.2% <span className="text-xs text-rose-400">▼ 4.1%</span></div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded border border-slate-100">
                             <div className="text-[10px] text-slate-500 uppercase">Target Margin</div>
                             <div className="text-lg font-bold text-emerald-600">18.5%</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            type: 'browser',
            action: "System Recommendation",
            subtitle: "AI Engine suggests automated ERP hedging to lock in supplier pricing.",
            output: (
                <div className="bg-slate-900 border text-left border-slate-700 rounded-lg p-4 font-sans text-white flex flex-col gap-3 h-full animate-in fade-in duration-500 w-full shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>
                    <div className="flex justify-between items-center border-b border-slate-700 pb-2 z-10">
                        <span className="font-bold flex items-center gap-2"><Maximize size={14} className="text-emerald-400" /> Automated Mitigation</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-4 z-10">
                        <div className="bg-slate-800 p-3 rounded border border-slate-700 flex justify-between items-center">
                            <span className="text-sm text-slate-300">Action Suggested</span>
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-bold border border-blue-500/50">ERP PO Hedging</span>
                        </div>
                        <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded text-sm transition-colors flex items-center justify-center gap-2">
                            <MousePointerClick size={16} /> Execute Global Purchasing Lock
                        </button>
                    </div>
                </div>
            )
        }
    ];

    return (
        <InteractiveDemoPlayer 
            title="Loom Simulation: Interactive Dashboard Walkthrough" 
            steps={steps} 
            accentColor="emerald" 
        />
    );
}
