import React from 'react';
import { Presentation, CheckCircle2, ChevronRight, Share2, ShieldCheck, Database, Zap, BrainCircuit, Sparkles, Globe } from 'lucide-react';
import { motion } from 'motion/react';

const DashboardOverview = ({ setActiveBloc }: { setActiveBloc: (id: number) => void }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="max-w-6xl mx-auto w-full p-10 md:p-16 flex flex-col items-center justify-start min-h-full">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-4xl bg-slate-900 rounded-2xl p-6 shadow-2xl mb-12 relative overflow-hidden flex flex-col md:flex-row items-center border border-slate-800"
            >
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #3b82f6 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                <div className="md:w-1/3 flex flex-col gap-3 relative z-10">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-2 shadow-lg shadow-blue-500/30">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white font-display leading-tight">Global Notebook<br/>Distribution</h2>
                    <p className="text-slate-400 text-sm">Real-time supply chain sync across 4 continents. 24/7 component tracking.</p>
                </div>
                <div className="md:w-2/3 mt-6 md:mt-0 relative z-10 flex flex-col gap-4">
                    <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-slate-300 text-sm font-mono flex-1">NVIDIA GPUs (Taiwan → Paris CDG)</span>
                        <span className="text-emerald-400 text-xs font-bold border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/10">ON-TIME</span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                        <span className="text-slate-300 text-sm font-mono flex-1">AUO Displays (Busan → Munich)</span>
                        <span className="text-rose-400 text-xs font-bold border border-rose-500/30 px-2 py-0.5 rounded bg-rose-500/10">DELAYED</span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-slate-300 text-sm font-mono flex-1">Final Assembly (Munich → NYC)</span>
                        <span className="text-blue-400 text-xs font-bold border border-blue-500/30 px-2 py-0.5 rounded bg-blue-500/10">IN TRANSIT</span>
                    </div>
                </div>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center tracking-tight font-display"
            >
                AuroraTech Global ERP
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 mb-12 text-center max-w-3xl leading-relaxed font-sans"
            >
                Unified enterprise supply chain portal managing global manufacturing, procurement, and hardware component logistics.
            </motion.p>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {/* Hero / System Architecture Card */}
                <motion.button 
                    variants={itemVariants}
                    onClick={() => setActiveBloc(5)} 
                    className="col-span-1 md:col-span-2 lg:col-span-4 group p-8 bg-[#0f172a] border border-slate-800 rounded-2xl shadow-xl hover:shadow-blue-900/20 transition-all text-left flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-3">
                             <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                                 <Share2 className="w-8 h-8" />
                             </div>
                             <h3 className="text-2xl font-bold text-white tracking-wide font-display">Global Architecture Topology</h3>
                        </div>
                        <p className="text-slate-400 mt-2 max-w-2xl text-lg">Explore the interactive end-to-end data flow spanning Data Governance, Infrastructure, Real-Time Pipelines, and ML platforms.</p>
                    </div>
                    <div className="mt-6 md:mt-0 relative z-10 flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-colors font-medium">
                        <span>Initialize View</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.button>

                {/* Modules */}
                <ModuleCard 
                    title="Global Data Compliance"
                    blocNum={1}
                    icon={<ShieldCheck />}
                    color="blue"
                    desc="GDPR, Audits & Security"
                    badge="Active"
                    onClick={() => setActiveBloc(1)}
                    variants={itemVariants}
                />
                <ModuleCard 
                    title="IT Infrastructure"
                    blocNum={2}
                    icon={<Database />}
                    color="emerald"
                    desc="Terraform IaC & Docker"
                    badge="Live"
                    onClick={() => setActiveBloc(2)}
                    variants={itemVariants}
                />
                <ModuleCard 
                    title="Global Procurement"
                    blocNum={3}
                    icon={<Zap />}
                    color="amber"
                    desc="Supplier FX Pipelines"
                    badge="Processing"
                    onClick={() => setActiveBloc(3)}
                    variants={itemVariants}
                />
                <ModuleCard 
                    title="AI Risk Engine"
                    blocNum={4}
                    icon={<BrainCircuit />}
                    color="purple"
                    desc="Margin Compression ML"
                    badge="Deployed"
                    onClick={() => setActiveBloc(4)}
                    variants={itemVariants}
                />
            </motion.div>
        </div>
    );
};

const ModuleCard = ({ title, blocNum, icon, color, desc, badge, onClick, variants }: any) => {
    const colorMap: Record<string, string> = {
        blue: 'text-blue-600 bg-blue-50 border-blue-100 group-hover:border-blue-300',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100 group-hover:border-emerald-300',
        amber: 'text-amber-600 bg-amber-50 border-amber-100 group-hover:border-amber-300',
        purple: 'text-purple-600 bg-purple-50 border-purple-100 group-hover:border-purple-300',
    };

    const gradientMap: Record<string, string> = {
        blue: 'from-blue-500/5',
        emerald: 'from-emerald-500/5',
        amber: 'from-amber-500/5',
        purple: 'from-purple-500/5',
    };

    return (
        <motion.button 
            variants={variants}
            onClick={onClick} 
            className={`group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col relative overflow-hidden bg-gradient-to-br ${gradientMap[color]} to-transparent`}
        >
            <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-xl ${colorMap[color].split(' ').slice(0,2).join(' ')}`}>
                    {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono bg-slate-100 px-2 py-1 rounded">Module {blocNum}</span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-display group-hover:text-slate-700 transition-colors">{title}</h3>
            <p className="text-slate-500 mb-6 text-sm flex-1">{desc}</p>
            
            <div className="flex items-center justify-between w-full border-t border-slate-100 pt-4 mt-auto">
                <div className="flex items-center space-x-2">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-${color}-400`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 bg-${color}-500`}></span>
                    </span>
                    <span className="text-xs font-semibold text-slate-600">{badge}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-800 transition-colors" />
            </div>
        </motion.button>
    );
}

export default DashboardOverview;
