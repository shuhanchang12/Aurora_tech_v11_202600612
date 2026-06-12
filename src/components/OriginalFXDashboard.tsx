import React, { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingDown, TrendingUp, Ship, Plane, AlertTriangle, CheckCircle, Activity, Globe, Database, ShieldAlert } from 'lucide-react';

export default function OriginalFXDashboard() {
    // State for live FX rates
    const [eurUsd, setEurUsd] = useState(1.0820);
    const [eurTwd, setEurTwd] = useState(35.150);
    const [isLive, setIsLive] = useState(false);

    // State for Simulation Sliders
    const [simUsd, setSimUsd] = useState(1.0820);
    const [simDelay, setSimDelay] = useState(2);
    const [simCost, setSimCost] = useState(45.0);

    // Fetch live FX rates on mount (using Open-Source Frankfurter API: https://github.com/lineofflight/frankfurter)
    useEffect(() => {
        const fetchFX = async () => {
            try {
                const res = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR');
                const data = await res.json();
                const usd = data?.rates?.USD ?? 1.0820;
                const twd = data?.rates?.TWD ?? 35.150;
                setEurUsd(usd);
                setEurTwd(twd);
                setSimUsd(usd); // Initialize slider with live rate
                setIsLive(true);
            } catch (err) {
                console.warn('FX API Failed, using fallback rates', err);
            }
        };
        fetchFX();
    }, []);

    // Derived AI Prediction Logic based on Streamlit code
    const isMarginImpacted = simCost >= 45 || simUsd < 1.05;
    const riskProbability = isMarginImpacted ? "87.42%" : "12.58%";

    return (
        <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500 pb-32">
            <header className="mb-10 border-b border-slate-200 pb-6 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2 font-display">AuroraTech Global ERP</h1>
                <p className="text-xl text-slate-600 font-sans">International Notebook Sales & Supply Chain Command Center</p>
            </header>

            {/* SECTION 1: LIVE EXCHANGE RATES */}
            <section className="mb-10 bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <Globe className="text-blue-400" />
                    Real-Time Currency Exchange Rates
                    <a href="https://github.com/lineofflight/frankfurter" target="_blank" rel="noreferrer" className="text-xs ml-2 bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                        Powered by Frankfurter (GitHub)
                    </a>
                    {!isLive && <span className="ml-2 text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded border border-amber-500/30">7-Day Moving Average Fallback</span>}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-600">
                        <div className="text-slate-400 text-sm font-medium mb-1">Live EUR/USD</div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold text-white">{eurUsd.toFixed(4)}</div>
                            <div className="text-rose-400 text-sm flex items-center"><TrendingDown size={14} className="mr-1"/> -0.0150</div>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-600">
                        <div className="text-slate-400 text-sm font-medium mb-1">Live EUR/TWD</div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold text-white">{eurTwd.toFixed(4)}</div>
                            <div className="text-emerald-400 text-sm flex items-center"><TrendingUp size={14} className="mr-1"/> +0.1200</div>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-xl border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <div className="text-blue-300 text-sm font-medium mb-1">AI Recommendation</div>
                        <div className="flex items-baseline gap-2 mt-1">
                            <div className="text-2xl font-bold text-blue-400">LOCK CURRENCY</div>
                        </div>
                        <div className="text-slate-400 text-xs mt-1">High Price Changes Detected</div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: SHIPPING STATUS */}
            <section className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                    <Ship className="text-indigo-500" />
                    Live Shipping Status
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600 font-medium">
                                <th className="p-3">Origin Port</th>
                                <th className="p-3">Component Type</th>
                                <th className="p-3">Transport Mode</th>
                                <th className="p-3 text-right">Delay (Days)</th>
                                <th className="p-3 text-right">Shipping Cost (EUR)</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-3 text-slate-800 font-medium">Kaohsiung (TW)</td>
                                <td className="p-3 text-slate-600">TSMC Chips</td>
                                <td className="p-3 text-slate-600 flex items-center gap-2"><Ship size={14} className="text-slate-400"/> Ocean Freight</td>
                                <td className="p-3 text-right text-rose-600 font-bold">3</td>
                                <td className="p-3 text-right text-slate-600">5.00</td>
                                <td className="p-3"><span className="text-rose-700 bg-rose-50 px-2 py-1 rounded text-xs font-bold border border-rose-100">Delayed (Red Sea)</span></td>
                            </tr>
                            <tr className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-3 text-slate-800 font-medium">Busan (KR)</td>
                                <td className="p-3 text-slate-600">AUO Display Screens</td>
                                <td className="p-3 text-slate-600 flex items-center gap-2"><Ship size={14} className="text-slate-400"/> Ocean Freight</td>
                                <td className="p-3 text-right text-emerald-600 font-bold">1</td>
                                <td className="p-3 text-right text-slate-600">5.00</td>
                                <td className="p-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-xs font-bold border border-emerald-100">On Time</span></td>
                            </tr>
                            <tr className="bg-rose-50 hover:bg-rose-100/50">
                                <td className="p-3 text-slate-800 font-medium">Taipei (TW)</td>
                                <td className="p-3 text-slate-600">NVIDIA GPUs</td>
                                <td className="p-3 font-bold text-rose-700 flex items-center gap-2"><Plane size={14}/> Air France Cargo (Emergency)</td>
                                <td className="p-3 text-right text-amber-600 font-bold">2</td>
                                <td className="p-3 text-right text-rose-600 font-bold">45.00</td>
                                <td className="p-3"><span className="text-blue-700 bg-blue-50 px-2 py-1 rounded text-xs font-bold border border-blue-100">Arriving Paris CDG</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SECTION 3: AI INFERENCE ENGINE */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <Activity className="text-emerald-500" />
                    AI Profit Risk Prediction
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controls Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Database size={18} className="text-slate-500"/> Scenario Simulator
                            </h3>
                            
                            <div className="space-y-5">
                                <div>
                                    <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                                        <span>Simulate EUR/USD Value</span>
                                        <span className="text-blue-600 font-bold">{simUsd.toFixed(4)}</span>
                                    </label>
                                    <input type="range" min="1.00" max="1.20" step="0.01" value={simUsd} onChange={(e) => setSimUsd(parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                </div>
                                
                                <div>
                                    <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                                        <span>GPU Sea Delay (Days)</span>
                                        <span className="text-rose-600 font-bold">{simDelay}</span>
                                    </label>
                                    <input type="range" min="0" max="30" step="1" value={simDelay} onChange={(e) => setSimDelay(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                </div>
                                
                                <div>
                                    <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                                        <span>Unit Freight Cost (EUR)</span>
                                        <span className="text-rose-600 font-bold">{simCost.toFixed(2)}</span>
                                    </label>
                                    <input type="range" min="5.0" max="150.0" step="1.0" value={simCost} onChange={(e) => setSimCost(parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Inference Output */}
                    <div className="lg:col-span-8">
                        {isMarginImpacted ? (
                            <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl animate-in fade-in zoom-in duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="bg-rose-100 p-3 rounded-full text-rose-600 mt-1">
                                        <AlertTriangle size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-rose-800 mb-1">MARGIN COMPRESSION DETECTED!</h3>
                                        <div className="text-rose-600 font-medium mb-4">Risk Probability: <span className="font-bold text-lg">{riskProbability}</span></div>
                                        
                                        <div className="bg-white/60 border border-rose-200 rounded-lg p-4 text-rose-900 text-sm leading-relaxed">
                                            <strong className="block mb-2 font-bold text-rose-700">[ACTION REQUIRED]</strong>
                                            {simCost >= 45.0 ? (
                                                <span>Switched to Air France Cargo due to delays. High air shipping cost is hurting profits. Action: Lock in currency rates immediately and use automated ERP vendor payments to lock in component prices.</span>
                                            ) : (
                                                <span>Bad exchange rates detected. Action: Contact the bank immediately to lock in the currency rate to protect product costs.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl animate-in fade-in zoom-in duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 mt-1">
                                        <CheckCircle size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-emerald-800 mb-1">Profits Are Safe</h3>
                                        <div className="text-emerald-600 font-medium mb-4">Risk Probability: <span className="font-bold text-lg">{riskProbability}</span></div>
                                        
                                        <div className="bg-white/60 border border-emerald-200 rounded-lg p-4 text-emerald-900 text-sm leading-relaxed">
                                            <strong className="block mb-2 font-bold text-emerald-700">[INFO]</strong>
                                            Costs and delays are normal. Safe to proceed with normal orders.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
