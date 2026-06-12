import React, { useState } from 'react';
import { BrainCircuit, Cpu, Zap, Activity, AlertTriangle, ShieldCheck, BarChart3, LineChart } from 'lucide-react';
import { cn } from './Bloc1GovernanceDemo';

export default function Bloc4AIDemo() {
    const [view, setView] = useState<'inference' | 'monitoring'>('inference');
    const [eurUsd, setEurUsd] = useState(1.08);
    const [delay, setDelay] = useState(2);
    const [cost, setCost] = useState(5);
    
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ risk: number, isHigh: boolean } | null>(null);

    const predict = () => {
        setLoading(true);
        setTimeout(() => {
            // Mock RF algorithm
            // High risk if eur drops low OR cost jumps to 45 (air freight)
            let baseRisk = 5;
            
            if (eurUsd < 1.05) baseRisk += 40;
            if (eurUsd < 1.03) baseRisk += 20;

            if (cost >= 45) baseRisk += 35;
            if (delay > 5) baseRisk += 15;
            
            if (baseRisk > 95) baseRisk = 97 + Math.random() * 2;
            else if (baseRisk < 5) baseRisk = 2 + Math.random() * 3;

            setResult({ risk: baseRisk, isHigh: baseRisk > 60 });
            setLoading(false);
        }, 800);
    };

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl mb-12 flex flex-col h-[650px] font-sans">
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <BrainCircuit className="text-emerald-400" size={20} />
                        <h3 className="text-lg font-bold text-white">Live Model Interface (DataCo RF-Model v4.2)</h3>
                    </div>
                    
                    <div className="flex bg-slate-950/50 p-1 rounded-lg ml-6">
                        <button onClick={() => setView('inference')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'inference' ? 'bg-slate-700 text-emerald-400 shadow-sm border border-slate-600' : 'text-slate-500 hover:text-slate-300'}`}>Inference Sandbox</button>
                        <button onClick={() => setView('monitoring')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'monitoring' ? 'bg-slate-700 text-emerald-400 shadow-sm border border-slate-600' : 'text-slate-500 hover:text-slate-300'}`}>MLOps Monitoring</button>
                    </div>
                </div>
                <div className="text-[10px] font-mono text-emerald-500 bg-emerald-950 px-2 py-1 rounded flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ENDPOINT: /prod/predict-margin-risk
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                {view === 'inference' && (
                    <>
                        {/* Inputs */}
                        <div className="lg:w-[45%] p-6 border-b lg:border-b-0 lg:border-r border-slate-700 bg-slate-800/50 overflow-y-auto">
                            <h4 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider flex justify-between items-center">
                                Input Feature Vectors
                                <span className="text-[9px] font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-500">json payload</span>
                            </h4>
                            
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-200 block">Currency Pair (EUR/USD)</label>
                                        <span className="text-emerald-400 font-mono text-sm">{eurUsd.toFixed(3)}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0.95" max="1.15" step="0.01" 
                                        value={eurUsd} 
                                        onChange={(e) => setEurUsd(parseFloat(e.target.value))}
                                        className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono uppercase">
                                        <span>Weak Range</span>
                                        <span>Parity</span>
                                        <span>Strong</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-200 block">Transit Delay Expected</label>
                                        <span className="text-emerald-400 font-mono text-sm">+{delay} Days</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" max="21" step="1" 
                                        value={delay} 
                                        onChange={(e) => setDelay(parseInt(e.target.value))}
                                        className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono uppercase">
                                        <span>On Time</span>
                                        <span>Severely Delayed</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-200 block mb-3">Freight Class Override</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setCost(5)}
                                            className={cn("py-2.5 px-3 border rounded-lg text-sm text-center transition-all font-semibold", cost === 5 ? "bg-slate-700/50 border-emerald-500 text-emerald-400" : "border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-300")}
                                        >
                                            Standard Ocean
                                        </button>
                                         <button
                                            onClick={() => setCost(45)}
                                            className={cn("py-2.5 px-3 border rounded-lg text-sm text-center transition-all font-semibold", cost === 45 ? "bg-rose-900/20 border-rose-500 text-rose-400" : "border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-300")}
                                        >
                                            Expedited Air
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    onClick={predict}
                                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all active:scale-[0.98] border border-emerald-500 hover:shadow-emerald-500/20"
                                >
                                    {loading ? <Activity size={20} className="animate-spin" /> : <Zap size={20} />}
                                    RUN PREDICTION
                                </button>
                            </div>
                        </div>

                        {/* Output */}
                        <div className="lg:w-[55%] p-6 bg-slate-900 relative flex flex-col justify-center overflow-y-auto">
                            { !result && !loading ? (
                                <div className="flex flex-col items-center justify-center text-slate-600 space-y-4">
                                    <Cpu size={56} strokeWidth={1} />
                                    <p className="font-mono text-sm tracking-wide">Awaiting model inference (Cold-Started)</p>
                                </div>
                            ) : loading ? (
                                <div className="flex flex-col items-center justify-center text-emerald-500 space-y-4">
                                    <Activity size={56} className="animate-spin" strokeWidth={1} />
                                    <p className="animate-pulse font-mono text-sm tracking-wide">Evaluating Random Forest ensembles...</p>
                                </div>
                            ) : result ? (
                                <div className="animate-in zoom-in-95 duration-300 w-full max-w-lg mx-auto">
                                    <div className="text-center mb-10">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-center gap-2">
                                            <BarChart3 size={16} /> Margin At-Risk Probability
                                        </h4>
                                        <div className={cn(
                                            "text-7xl font-black tabular-nums tracking-tighter",
                                            result.isHigh ? "text-rose-500 shadow-rose-500/20 drop-shadow-2xl" : "text-emerald-500 shadow-emerald-500/20 drop-shadow-2xl"
                                        )}>
                                            {result.risk.toFixed(1)}%
                                        </div>
                                    </div>

                                    <div className={cn(
                                        "rounded-xl border p-6 mt-6 shadow-xl",
                                        result.isHigh ? "bg-rose-950/20 border-rose-900/50" : "bg-emerald-950/20 border-emerald-900/50"
                                    )}>
                                        <div className="flex items-start gap-4">
                                            {result.isHigh ? <AlertTriangle className="text-rose-500 shrink-0 mt-1" size={24} /> : <ShieldCheck className="text-emerald-500 shrink-0 mt-1" size={24} />}
                                            <div className="flex-1">
                                                <h5 className={cn("font-bold text-lg mb-2 flex items-center justify-between", result.isHigh ? "text-rose-400" : "text-emerald-400")}>
                                                    {result.isHigh ? "HIGH RISK DETECTED" : "SYSTEM NOMINAL"}
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-current opacity-70">CONFIDENCE: 94.2%</span>
                                                </h5>
                                                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                                    {result.isHigh 
                                                        ? (cost === 45 
                                                            ? "Expedited freight overriding standard matrix. Costs severely compromise baseline product margin." 
                                                            : "Exchange rate volatility exceeds safe harbor threshold. Prolonged delays compound cost structures.")
                                                        : "Vectors aligned with historical positive-margin executions. No strategic intervention recommended."}
                                                </p>
                                                
                                                {/* SHAP Mock */}
                                                <div className="mt-4 pt-4 border-t border-slate-700/50">
                                                    <h6 className="text-[10px] uppercase font-bold text-slate-500 mb-3 tracking-wider">Top Driving Features (SHAP Values)</h6>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center text-xs">
                                                            <span className="w-24 text-slate-400 truncate">Freight Class</span>
                                                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full mx-3 overflow-hidden flex justify-start">
                                                                <div className={cn("h-full rounded-full", cost === 45 ? "w-[75%] bg-rose-500" : "w-[12%] bg-emerald-500")}></div>
                                                            </div>
                                                            <span className={cost === 45 ? "text-rose-400 flex justify-end w-12" : "text-emerald-400 flex justify-end w-12"}>{cost === 45 ? "+0.45" : "-0.08"}</span>
                                                        </div>
                                                        <div className="flex items-center text-xs">
                                                            <span className="w-24 text-slate-400 truncate">EUR/USD Pair</span>
                                                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full mx-3 overflow-hidden">
                                                                 <div className={cn("h-full rounded-full", eurUsd < 1.05 ? "w-[65%] bg-rose-500" : "w-[24%] bg-slate-400")} style={{ width: eurUsd < 1.05 ? '65%' : Math.max(10, (1.15 - eurUsd)*100) + '%' }}></div>
                                                            </div>
                                                            <span className={eurUsd < 1.05 ? "text-rose-400 flex justify-end w-12" : "text-slate-400 flex justify-end w-12"}>{eurUsd < 1.05 ? "+0.32" : "+0.11"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null }
                        </div>
                    </>
                )}

                {view === 'monitoring' && (
                    <div className="flex-1 p-8 overflow-y-auto text-slate-300">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h4 className="text-xl font-bold text-white flex items-center gap-2"><LineChart className="text-emerald-500"/> MLOps Dashboard</h4>
                                <p className="text-sm text-slate-400 mt-1">DataCo Domain Adaptation Model (v4.2)</p>
                            </div>
                            <div className="px-3 py-1 bg-emerald-950 border border-emerald-900 rounded text-emerald-400 font-mono text-xs shadow-inner">
                                STATUS: RETRAINING IDLE
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 shadow-sm">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Model Drift Target (KL)</div>
                                <div className="text-3xl font-black text-white flex items-center gap-2">0.042 <span className="text-sm text-emerald-500 font-medium">Safe</span></div>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 shadow-sm">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Data Drift Status</div>
                                <div className="text-3xl font-black text-white flex items-center gap-2">0.115 <span className="text-sm text-amber-500 font-medium">Warning</span></div>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 shadow-sm">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Avg API Latency (p99)</div>
                                <div className="text-3xl font-black text-white flex items-center gap-2">42 <span className="text-sm text-emerald-500 font-medium">ms</span></div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                                <h5 className="font-bold text-white mb-6">Prediction Distribution Over Time</h5>
                                <div className="h-32 flex items-end gap-2 px-2 border-b border-l border-slate-700/50 pb-2">
                                    {[15, 23, 18, 30, 45, 60, 42, 35, 20, 18, 25, 40, 55, 65, 80, 50, 30, 20, 15, 10, 8, 12, 16, 22].map((h, i) => (
                                        <div key={i} className="flex-1 bg-emerald-500/50 hover:bg-emerald-400 rounded-t transition-colors cursor-pointer group relative" style={{ height: `${h}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded hidden group-hover:block z-10 whitespace-nowrap shadow-lg border border-slate-600">
                                                Risk {h}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-500 mt-2 uppercase font-mono">
                                    <span>24 Hours Ago</span>
                                    <span>Now</span>
                                </div>
                            </div>

                            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h5 className="font-bold text-white">Feature Drift Warnings</h5>
                                    <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded transition-colors text-white font-medium shadow-sm">View Full Report</button>
                                </div>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                                        <span className="font-mono text-slate-300">EUR_USD_Exchange_Rate</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-amber-400 font-mono text-xs">+15% dev</span>
                                            <span className="text-amber-400 text-xs px-2 py-0.5 bg-amber-950/50 border border-amber-900 rounded font-bold uppercase">elevated</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                                        <span className="font-mono text-slate-300">Ocean_Freight_Delay_Avg</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-slate-500 font-mono text-xs">+2% dev</span>
                                            <span className="text-emerald-500 text-xs px-2 py-0.5 bg-emerald-950/50 border border-emerald-900 rounded font-bold uppercase">nominal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
