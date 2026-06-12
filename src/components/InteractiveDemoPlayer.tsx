import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Terminal, Monitor, Video } from 'lucide-react';

export interface DemoStep {
    type: 'terminal' | 'browser';
    action: string;
    output: React.ReactNode;
    subtitle: string;
}

interface InteractiveDemoPlayerProps {
    title: string;
    steps: DemoStep[];
    accentColor?: 'indigo' | 'blue' | 'rose' | 'emerald';
}

export default function InteractiveDemoPlayer({ 
    title, 
    steps, 
    accentColor = 'blue' 
}: InteractiveDemoPlayerProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying) {
            timer = setTimeout(() => {
                if (currentStep < steps.length - 1) {
                    setCurrentStep(c => c + 1);
                } else {
                    setIsPlaying(false);
                    setCurrentStep(0); // loop back or just stop
                }
            }, 6000); // 6 seconds per step to allow reading
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps.length]);

    const activeColor = {
        indigo: 'bg-indigo-600',
        blue: 'bg-blue-600',
        rose: 'bg-rose-600',
        emerald: 'bg-emerald-600',
    }[accentColor];

    const textColor = {
        indigo: 'text-indigo-400',
        blue: 'text-blue-400',
        rose: 'text-rose-400',
        emerald: 'text-emerald-400',
    }[accentColor];

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col h-[550px] w-full mt-6 mb-8 group">
            {/* Header */}
            <div className={`p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-3 shrink-0`}>
                <Video className={textColor} size={20} />
                <h4 className="text-white font-semibold flex items-center gap-2">
                    Interactive Demo Viewer: <span className="text-slate-300 font-normal">{title}</span>
                </h4>
                <div className="ml-auto flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? activeColor : 'bg-slate-600'}`}></span>
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? activeColor : 'bg-slate-600'}`}></span>
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                        {isPlaying ? 'Live Sim' : 'Paused'}
                    </span>
                </div>
            </div>

            {/* Video Canvas / Player Area */}
            <div className="flex-1 bg-black p-6 md:p-10 flex flex-col relative overflow-hidden">
                <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col justify-center">
                    {/* Screen Simulation */}
                    <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-2xl flex flex-col transition-all duration-300">
                        <div className="bg-slate-800 px-4 py-2 flex items-center gap-3 border-b border-slate-700">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                            </div>
                            <div className="flex items-center gap-2 mx-auto bg-slate-900 px-4 py-1 rounded text-xs text-slate-400 font-mono w-1/2 justify-center drop-shadow-inner border border-slate-950">
                                {steps[currentStep].type === 'terminal' ? <Terminal size={12} className={textColor} /> : <Monitor size={12} className={textColor} />}
                                <span>{steps[currentStep].type === 'terminal' ? 'bash - root@auroratech-node' : 'https://dashboard.auroratech.internal'}</span>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-950 min-h-[260px] font-mono text-sm break-all overflow-y-auto relative">
                            <div className={`mb-6 flex items-start gap-3`}>
                                <span className={`${textColor} mt-0.5`}>➜</span> 
                                <span className="text-emerald-300 font-bold tracking-wide">{steps[currentStep].action}</span>
                            </div>
                            <div className="text-slate-300 whitespace-pre-wrap leading-relaxed opacity-90 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
                                {steps[currentStep].output}
                            </div>
                            <div className="absolute bottom-4 right-4 text-xs text-slate-600 hidden md:block">
                                AURA_VM_ENV_{currentStep + 1}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtitles Overlay */}
                <div className="absolute bottom-6 left-0 right-0 px-4 md:px-8 text-center pointer-events-none z-10 transition-all duration-300 transform">
                    <div className="inline-block bg-black/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-slate-700 max-w-3xl shadow-2xl">
                        <p className="text-white md:text-lg font-medium leading-relaxed drop-shadow-md text-shadow-sm font-sans">
                            <span className={textColor}>"</span>
                            {steps[currentStep].subtitle}
                            <span className={textColor}>"</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Video Controls */}
            <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 md:gap-4 w-1/4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className={`w-10 h-10 flex items-center justify-center rounded-full ${activeColor} text-white hover:brightness-110 transition-all shadow-lg active:scale-95`}>
                        {isPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current ml-1" />}
                    </button>
                    <button onClick={() => { setCurrentStep(Math.max(0, currentStep - 1)); setIsPlaying(false); }} className="text-slate-500 hover:text-slate-200 transition-colors p-2"><SkipBack size={20} /></button>
                    <button onClick={() => { setCurrentStep(Math.min(steps.length - 1, currentStep + 1)); setIsPlaying(false); }} className="text-slate-500 hover:text-slate-200 transition-colors p-2"><SkipForward size={20} /></button>
                </div>
                
                {/* Timeline */}
                <div className="flex-1 mx-4 md:mx-8 flex items-center gap-2 h-8">
                    {steps.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`flex-1 h-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-y-150 ${idx < currentStep ? activeColor : (idx === currentStep ? activeColor : 'bg-slate-800')}`} 
                            style={{ opacity: idx === currentStep && isPlaying ? 0.8 : 1 }} 
                            onClick={() => { setCurrentStep(idx); setIsPlaying(false); }}
                            title={`Jump to step ${idx + 1}`}
                        ></div>
                    ))}
                </div>

                <div className="w-1/4 flex justify-end text-slate-500 text-xs md:text-sm font-mono tracking-wider font-semibold">
                    SEQ {String(currentStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}
