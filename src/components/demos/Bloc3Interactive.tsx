import React, { useState } from 'react';
import { Workflow, PlayCircle, Loader2, CheckCircle2, Truck, Globe, Map, Settings2, Activity, Server, Clock, DatabaseZap } from 'lucide-react';

export default function Bloc3Interactive() {
    const [running, setRunning] = useState(false);
    const [stage, setStage] = useState(0); 
    const [scenario, setScenario] = useState('red_sea');
    const [logs, setLogs] = useState<string[]>([]);
    const [view, setView] = useState<'dag' | 'metrics'>('dag');
    
    const triggerAirflow = () => {
        if (running) return;
        setRunning(true);
        setStage(1);
        setView('dag');
        setLogs([`[INFO] Starting DAG execution using scenario: ${scenario}`]);
        
        setTimeout(() => {
            setStage(2);
            setLogs(prev => [...prev, "[OK] API: Fetched FX rates (EUR/USD = 1.085)"]);
            
            if (scenario === 'red_sea') {
                setLogs(prev => [...prev, "[WARN] ALERT: Submarine cable/transit disruption at Red Sea."]);
            } else if (scenario === 'typhoon') {
                setLogs(prev => [...prev, "[WARN] ALERT: Category 5 Typhoon approaching Taiwan Strait."]);
            } else {
                setLogs(prev => [...prev, "[INFO] Transit routes clear. No weather disruptions."]);
            }
        }, 1500);
        
        setTimeout(() => {
            setStage(3);
            if (scenario === 'red_sea') {
                setLogs(prev => [...prev, "[ACTION] Vendor VND-NV-01 delayed 14 days.", "[ACTION] Applying Ocean-to-Air emergency rerouting to EMEA."]);
            } else if (scenario === 'typhoon') {
                setLogs(prev => [...prev, "[ACTION] Port of Kaohsiung closed. 7-day delay.", "[ACTION] Re-balancing inventory from US reserves."]);
            } else {
                setLogs(prev => [...prev, "[OK] Standard ocean freight schedule maintained.", "[INFO] Cost optimizations applied."]);
            }
        }, 3500);
        
        setTimeout(() => {
            setStage(4);
            setLogs(prev => [...prev, "[OK] Data Warehouse fact tables updated.", "[SUCCESS] DAG Complete."]);
            setRunning(false);
        }, 5500);
    }
    
    const reset = () => {
        setStage(0);
        setLogs([]);
    }
    
    return (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col h-full font-sans max-h-[600px]">
            <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Workflow className="text-amber-500" size={20} />
                        <h3 className="font-bold text-slate-800 hidden md:block">Airflow Pipeline Orchestrator</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 pl-4 border-l border-slate-300">
                        <Settings2 size={16} className="text-slate-400" />
                        <select 
                            value={scenario}
                            onChange={(e) => { setScenario(e.target.value); reset(); }}
                            disabled={running}
                            className="bg-white border border-slate-300 rounded px-2 py-1 text-sm font-medium outline-none focus:border-amber-500 disabled:opacity-50"
                        >
                            <option value="normal">Normal Operation (Baseline)</option>
                            <option value="red_sea">Simulate: Red Sea Disruption</option>
                            <option value="typhoon">Simulate: TW Typhoon</option>
                        </select>
                    </div>

                    <div className="flex bg-slate-200 p-1 rounded-lg ml-4">
                        <button onClick={() => setView('dag')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'dag' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>DAG Map</button>
                        <button onClick={() => setView('metrics')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'metrics' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Runner Metrics</button>
                    </div>
                </div>

                <div className="flex gap-2">
                    {stage === 4 && (
                        <button onClick={reset} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-lg text-sm font-bold transition-all">
                            Reset
                        </button>
                    )}
                    <button 
                        onClick={triggerAirflow}
                        disabled={running || stage === 4}
                        className="bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                    >
                        <PlayCircle size={16} /> 
                        {running ? "Pipeline Running..." : stage === 4 ? "Completed" : "Trigger Pipeline DAG"}
                    </button>
                </div>
            </div>
            
            <div className="flex flex-1 overflow-hidden p-6 gap-6 bg-slate-50 flex-col lg:flex-row">
                {/* Visual Map/Nodes */}
                {view === 'dag' && (
                    <div className="flex-1 bg-white rounded-xl border shadow-sm p-6 relative flex flex-col justify-between items-center overflow-y-auto">
                         {/* 1 */}
                         <div className={`p-4 rounded-xl border w-64 text-center transition-all duration-500 ${stage >= 1 ? 'bg-indigo-50 border-indigo-200 shadow-md' : 'bg-slate-50 border-slate-200'}`}>
                             <h4 className="font-bold text-slate-800 flex items-center justify-center gap-2"><Globe size={16} className={stage >= 1 ? "text-indigo-600" : ""} /> Extract FX & Transit</h4>
                             {stage === 1 && <span className="text-indigo-600 text-xs mt-2 flex items-center justify-center gap-1"><Loader2 size={12} className="animate-spin" /> Fetching APIs...</span>}
                             {stage > 1 && <span className="text-emerald-600 text-xs mt-2 flex items-center justify-center gap-1"><CheckCircle2 size={12} /> External Signals Ready</span>}
                         </div>
                         <div className={`w-1 h-8 transition-colors duration-500 ${stage >= 2 ? 'bg-indigo-300' : 'bg-slate-200'}`}></div>
                         
                         {/* 2 */}
                         <div className={`p-4 rounded-xl border w-64 text-center transition-all duration-500 ${stage >= 2 ? (scenario !== 'normal' ? 'bg-rose-50 border-rose-200 shadow-md' : 'bg-emerald-50 border-emerald-200 shadow-md') : 'bg-slate-50 border-slate-200'}`}>
                             <h4 className="font-bold text-slate-800 flex items-center justify-center gap-2"><Map size={16} className={stage >= 2 ? (scenario !== 'normal' ? "text-rose-600" : "text-emerald-600") : ""} /> Predict Delays</h4>
                             {stage === 2 && <span className={`text-xs mt-2 flex items-center justify-center gap-1 ${scenario !== 'normal' ? 'text-rose-600' : 'text-emerald-600'}`}><Loader2 size={12} className="animate-spin" /> Simulating Routes...</span>}
                             {stage > 2 && <span className={`text-xs mt-2 flex items-center justify-center gap-1 ${scenario !== 'normal' ? 'text-rose-600' : 'text-emerald-600'}`}>
                                 {scenario !== 'normal' ? '⚠️ Disruption Detected' : <><CheckCircle2 size={12} /> Routes Clear</>}
                             </span>}
                         </div>
                         <div className={`w-1 h-8 transition-colors duration-500 ${stage >= 3 ? (scenario !== 'normal' ? 'bg-rose-300' : 'bg-emerald-300') : 'bg-slate-200'}`}></div>

                         {/* 3 */}
                         <div className={`p-4 rounded-xl border w-64 text-center transition-all duration-500 ${stage >= 3 ? (scenario !== 'normal' ? 'bg-amber-50 border-amber-200 shadow-md' : 'bg-emerald-50 border-emerald-200 shadow-md') : 'bg-slate-50 border-slate-200'}`}>
                             <h4 className="font-bold text-slate-800 flex items-center justify-center gap-2"><Truck size={16} className={stage >= 3 ? (scenario !== 'normal' ? "text-amber-600" : "text-emerald-600") : ""} /> Action Engine</h4>
                             {stage === 3 && <span className={`text-xs mt-2 flex items-center justify-center gap-1 ${scenario !== 'normal' ? 'text-amber-600' : 'text-emerald-600'}`}><Loader2 size={12} className="animate-spin" /> Calculating Impact...</span>}
                             {stage > 3 && <span className={`text-xs mt-2 flex items-center justify-center gap-1 ${scenario !== 'normal' ? 'text-amber-600' : 'text-emerald-600'}`}>
                                <CheckCircle2 size={12} /> {scenario !== 'normal' ? 'Mitigation Strategy Applied' : 'Standard Cost Applied'}
                             </span>}
                         </div>
                    </div>
                )}

                {view === 'metrics' && (
                    <div className="flex-1 bg-white rounded-xl border shadow-sm p-6 overflow-y-auto">
                        <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Activity className="text-blue-500" size={20} /> Celery Worker Cluster Telemetry</h4>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-50 border rounded-lg p-4">
                                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Active Workers</div>
                                <div className="text-2xl font-black text-slate-800 flex items-end gap-2">12 <span className="text-sm font-medium text-emerald-500 mb-1">nodes</span></div>
                            </div>
                            <div className="bg-slate-50 border rounded-lg p-4">
                                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">DAG Success Rate</div>
                                <div className="text-2xl font-black text-slate-800 flex items-end gap-2">99.8 <span className="text-sm font-medium text-emerald-500 mb-1">%</span></div>
                            </div>
                            <div className="bg-slate-50 border rounded-lg p-4">
                                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Average Latency</div>
                                <div className="text-2xl font-black text-slate-800 flex items-end gap-2">1.2 <span className="text-sm font-medium text-blue-500 mb-1">sec</span></div>
                            </div>
                            <div className="bg-slate-50 border rounded-lg p-4">
                                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Task Queue Length</div>
                                <div className="text-2xl font-black text-slate-800 flex items-end gap-2">0 <span className="text-sm font-medium text-emerald-500 mb-1">tasks</span></div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2 text-slate-700"><span className="flex items-center gap-1"><Server size={14}/> Cluster CPU Load</span> <span className={running ? 'text-amber-500' : 'text-emerald-500'}>{running ? '68%' : '12%'}</span></div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className={`h-2 rounded-full transition-all duration-1000 ${running ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: running ? '68%' : '12%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2 text-slate-700"><span className="flex items-center gap-1"><DatabaseZap size={14}/> Metadata DB IOPS</span> <span className={running ? 'text-indigo-500' : 'text-slate-500'}>{running ? '4,520' : '300'}</span></div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className={`h-2 rounded-full transition-all duration-1000 ${running ? 'bg-indigo-500' : 'bg-slate-300'}`} style={{ width: running ? '85%' : '10%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Logs */}
                <div className="w-full lg:w-1/3 bg-slate-900 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-y-auto shadow-inner h-64 lg:h-auto shrink-0 flex flex-col">
                    <h4 className="text-slate-400 mb-4 border-b border-slate-700 pb-2 uppercase font-bold text-[10px] tracking-wider flex justify-between items-center">
                        Live DAG Logs
                        <span className="flex items-center gap-1 normal-case font-normal text-slate-500"><Clock size={12}/> UTC System Time</span>
                    </h4>
                    <div className="space-y-3 flex-1 overflow-y-auto">
                        {logs.length === 0 && <span className="text-slate-600 italic">Configure scenario and trigger...</span>}
                        {logs.map((log, i) => (
                            <div key={i} className={`animate-in fade-in slide-in-from-bottom-2 duration-300 ${log.includes('WARN') ? 'text-amber-400' : log.includes('ACTION') ? 'text-blue-400 font-bold' : log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>{log}</div>
                        ))}
                        {running && <div className="animate-pulse text-slate-500">_</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

