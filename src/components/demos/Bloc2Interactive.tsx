import React, { useState } from 'react';
import { Database, Play, Table, Globe, Server, Activity, DatabaseZap, LayoutDashboard } from 'lucide-react';

export default function Bloc2Interactive() {
    const [view, setView] = useState<'topology' | 'dw'>('topology');
    const [activeSchema, setActiveSchema] = useState('dim_vendor');
    const [queryResult, setQueryResult] = useState<any[] | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const runQuery = () => {
        setIsRunning(true);
        setQueryResult(null);
        setTimeout(() => {
            if (activeSchema === 'dim_vendor') {
                setQueryResult([
                    { id: 'VND-NV-01', vendor: 'NVIDIA Corporation', region: 'Taiwan', type: 'GPU' },
                    { id: 'VND-TSMC-02', vendor: 'TSMC Foundry', region: 'Taiwan', type: 'Semiconductor' },
                    { id: 'VND-AUO-03', vendor: 'AU Optronics', region: 'Taiwan', type: 'Display' },
                    { id: 'VND-INT-04', vendor: 'Intel', region: 'USA', type: 'CPU' },
                ]);
            } else if (activeSchema === 'fact_margin_risk') {
                setQueryResult([
                    { risk_id: 'FMR-892', vendor_id: 'VND-NV-01', date_id: '20250612', route: 'Ocean', projected_margin: '14.2%', risk_status: 'HIGH' },
                    { risk_id: 'FMR-893', vendor_id: 'VND-AUO-03', date_id: '20250612', route: 'Air', projected_margin: '18.1%', risk_status: 'LOW' },
                    { risk_id: 'FMR-894', vendor_id: 'VND-TSMC-02', date_id: '20250612', route: 'Ocean', projected_margin: '17.5%', risk_status: 'MEDIUM' },
                ]);
            } else if (activeSchema === 'dim_date') {
                setQueryResult([
                    { date_id: '20250612', full_date: '2025-06-12', year: 2025, quarter: 'Q2', month: 6, is_holiday: false },
                    { date_id: '20250613', full_date: '2025-06-13', year: 2025, quarter: 'Q2', month: 6, is_holiday: false },
                    { date_id: '20250614', full_date: '2025-06-14', year: 2025, quarter: 'Q2', month: 6, is_holiday: true },
                ]);
            }
            setIsRunning(false);
        }, 1200);
    };

    const schemas = [
        { id: 'dim_vendor', label: 'dim_vendor' },
        { id: 'fact_margin_risk', label: 'fact_margin_risk' },
        { id: 'dim_date', label: 'dim_date' }
    ];

    return (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col h-full font-sans max-h-[600px]">
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="text-blue-600" size={20} />
                    <h3 className="font-bold text-slate-800">Cloud Infrastructure Interactive</h3>
                </div>
                <div className="flex bg-slate-200 p-1 rounded-lg">
                    <button onClick={() => setView('topology')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'topology' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Deployment Map</button>
                    <button onClick={() => setView('dw')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'dw' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>DW Explorer</button>
                </div>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
                {view === 'topology' && (
                    <div className="flex-1 p-6 overflow-y-auto bg-slate-50 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-xl border shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                     <h4 className="font-bold text-slate-800 flex items-center gap-2"><Globe className="text-blue-500" size={18}/> Global Load Balancer</h4>
                                     <span className="bg-emerald-100 text-emerald-700 font-mono text-xs px-2 py-1 rounded">HEALTHY / 4 REGIONS</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                                <div className="text-xs text-slate-500 mt-2 text-right">45% Traffic Load Capacity</div>
                            </div>

                            <div className="bg-white p-5 rounded-xl border shadow-sm border-t-4 border-t-indigo-500 hover:shadow-md transition">
                                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><Server size={16}/> Application Tier (EKS)</h4>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">Core API CPU Load</span><span className="font-mono text-indigo-600">65%</span></div>
                                        <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '65%' }}></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">Worker Nodes Memory</span><span className="font-mono text-indigo-600">32%</span></div>
                                        <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '32%' }}></div></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl border shadow-sm border-t-4 border-t-amber-500 hover:shadow-md transition">
                                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><Activity size={16}/> Transit Pipeline Layer</h4>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">Kafka Topics Throughput</span><span className="font-mono text-amber-600">8.2k msg/s</span></div>
                                        <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '80%' }}></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">Redis Cache Hit Rate</span><span className="font-mono text-emerald-600">94%</span></div>
                                        <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94%' }}></div></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl border shadow-sm border-t-4 border-t-blue-500 hover:shadow-md transition relative flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><DatabaseZap size={16}/> Data Warehouse (PostgreSQL)</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">Storage Provision</span><span className="font-mono text-blue-600">1.2 TB / 5 TB</span></div>
                                            <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '24%' }}></div></div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">Live Query Load</span><span className="font-mono text-blue-600">18%</span></div>
                                            <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '18%' }}></div></div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setView('dw')} className="mt-6 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 border border-blue-200">
                                     Enter DW Explorer &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'dw' && (
                    <>
                        {/* Sidebar Schemas */}
                        <div className="w-1/3 bg-slate-50 border-r p-4 overflow-y-auto">
                            <h4 className="text-sm font-bold text-slate-500 mb-4 uppercase flex items-center justify-between">
                                Schemas
                                <div className="text-[10px] font-mono bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded normal-case tracking-tight">PostgreSQL</div>
                            </h4>
                            <div className="space-y-2">
                                {schemas.map(schema => (
                                    <button 
                                        key={schema.id}
                                        onClick={() => { setActiveSchema(schema.id); setQueryResult(null); }}
                                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${activeSchema === schema.id ? 'bg-white border-blue-200 shadow-sm text-slate-800' : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
                                    >
                                        <span className={`font-semibold text-sm flex items-center gap-2`}><Table size={14}/> {schema.label}</span>
                                        {activeSchema === schema.id && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Query Area */}
                        <div className="flex-1 flex flex-col bg-white overflow-hidden">
                            <div className="p-4 border-b">
                                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-blue-300 relative group">
                                    <span className="text-pink-400">SELECT</span> * <span className="text-pink-400">FROM</span> {activeSchema}<br/>
                                    {activeSchema === 'dim_vendor' && <><span className="text-pink-400">WHERE</span> region = <span className="text-green-400">'Taiwan'</span>;</>}
                                    {activeSchema === 'fact_margin_risk' && <><span className="text-pink-400">WHERE</span> risk_status = <span className="text-green-400">'HIGH'</span>;</>}
                                    {activeSchema === 'dim_date' && <><span className="text-pink-400">ORDER BY</span> date_id <span className="text-pink-400">DESC</span> <span className="text-pink-400">LIMIT</span> 10;</>}
                                    <button 
                                        onClick={runQuery}
                                        disabled={isRunning}
                                        className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-1 text-sm flex items-center gap-2 transition disabled:opacity-50 shadow-md group-hover:scale-105"
                                    >
                                        {isRunning ? "Running..." : <><Play size={14} /> Execute</>}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-1 p-4 bg-slate-50 overflow-y-auto relative">
                                {isRunning && (
                                    <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center p-4 z-10 backdrop-blur-sm">
                                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="mt-4 text-slate-600 font-medium font-mono text-sm">Executing query...</p>
                                    </div>
                                )}

                                {!queryResult && !isRunning && (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm gap-3">
                                        <Database className="text-slate-300" size={32} />
                                        Click "Execute" to run the query.
                                    </div>
                                )}

                                {queryResult && (
                                    <div className="bg-white border rounded-lg shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-slate-100 text-slate-600 border-b">
                                                    <tr>
                                                        {Object.keys(queryResult[0]).map(key => (
                                                            <th key={key} className="px-4 py-3 font-semibold uppercase text-xs tracking-wider">{key.replace(/_/g, ' ')}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y">
                                                    {queryResult.map((row, index) => (
                                                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                                                            {Object.values(row).map((val: any, i) => (
                                                                <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-mono text-xs' : 'text-slate-600'} whitespace-nowrap`}>{String(val)}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="px-4 py-2 bg-slate-50 border-t text-xs text-slate-500 flex justify-between">
                                            <span>{queryResult.length} rows retrieved</span>
                                            <span className="font-mono">Execution time: 1.2s</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
