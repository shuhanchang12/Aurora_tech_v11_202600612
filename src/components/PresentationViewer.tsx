import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, MessageSquare, Download } from 'lucide-react';

interface Slide {
    num: number;
    title: string;
    content: string;
    script: string;
    visualComponent?: React.ReactNode;
}

interface PresentationViewerProps {
    title: string;
    slides: Slide[];
    accentColor?: 'indigo' | 'blue' | 'rose' | 'emerald' | 'amber';
}

export default function PresentationViewer({ 
    title, 
    slides, 
    accentColor = 'blue' 
}: PresentationViewerProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showScript, setShowScript] = useState(true);

    const next = () => setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev));
    const prev = () => setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));

    const handleDownload = () => {
        let exportText = `# ${title}\n\n`;
        slides.forEach(s => {
            exportText += `## Slide ${s.num}: ${s.title}\n\n`;
            exportText += `**Visuals/Content:** ${s.content}\n\n`;
            exportText += `**Spoken Script:**\n${s.script}\n\n`;
            exportText += `---\n\n`;
        });
        const blob = new Blob([exportText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_')}_Defense_Script.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const colorConfig: Record<string, {bg: string, border: string, text: string, active: string, gradient: string, visualBg: string}> = {
        indigo: { bg: 'bg-indigo-900', border: 'border-indigo-500', text: 'text-indigo-400', active: 'bg-indigo-600', gradient: 'to-indigo-900/20', visualBg: 'text-indigo-400' },
        blue: { bg: 'bg-slate-900', border: 'border-blue-500', text: 'text-blue-400', active: 'bg-blue-600', gradient: 'to-blue-900/20', visualBg: 'text-blue-400' },
        rose: { bg: 'bg-slate-900', border: 'border-rose-500', text: 'text-rose-400', active: 'bg-rose-600', gradient: 'to-rose-900/20', visualBg: 'text-rose-400' },
        emerald: { bg: 'bg-slate-900', border: 'border-emerald-500', text: 'text-emerald-400', active: 'bg-emerald-600', gradient: 'to-emerald-900/20', visualBg: 'text-emerald-400' },
        amber: { bg: 'bg-amber-900', border: 'border-amber-500', text: 'text-amber-400', active: 'bg-amber-600', gradient: 'to-amber-900/20', visualBg: 'text-amber-400' },
    };

    const c = colorConfig[accentColor] || colorConfig['blue'];

    return (
        <div className={`flex flex-col relative w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 px-8 py-8' : 'h-[650px] border border-slate-700 rounded-xl overflow-hidden shadow-2xl'}`}>
            {/* Header / Controls */}
            <div className="flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800 text-slate-300 shrink-0">
                <div className="font-bold tracking-wide text-white flex items-center gap-2">
                    {title}
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Slide {currentSlide + 1} of {slides.length}</span>
                    <button onClick={handleDownload} className="p-2 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-emerald-400 hidden md:flex items-center gap-1" title="Download Presenter Script (Markdown)">
                        <Download size={18} /> <span className="text-xs font-bold uppercase ml-1">Export Script</span>
                    </button>
                    <button onClick={() => setShowScript(!showScript)} className={`p-2 hover:bg-slate-800 rounded transition-colors ${showScript ? c.text : 'text-slate-500'}`} title="Toggle Speaker Notes">
                        <MessageSquare size={18} />
                    </button>
                    <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white">
                        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </button>
                </div>
            </div>

            {/* Main Stage */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-200">
                {/* Slide View */}
                <div className="flex-1 flex justify-center items-center p-8 relative transition-all overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at center, #cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                   <div className={`w-full aspect-[16/9] max-w-4xl max-h-full flex flex-col border border-slate-300 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-slate-900 text-white overflow-hidden relative transition-transform duration-300`}>
                        {/* Slide Content Layout */}
                        <div className="p-8 md:p-12 flex flex-col h-full z-10 w-full relative">
                            <div className={`border-b-2 ${c.border} pb-4 mb-6 flex justify-between items-end`}>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight">{slides[currentSlide].title}</h2>
                                <div className="text-5xl font-black text-slate-800 opacity-50">{slides[currentSlide].num}</div>
                            </div>
                            
                            {slides[currentSlide].visualComponent ? (
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className={`${c.visualBg} mb-6 bg-slate-800/80 p-8 rounded-2xl border border-slate-700 shadow-lg w-full max-w-lg flex flex-col items-center justify-center`}>
                                        {slides[currentSlide].visualComponent}
                                    </div>
                                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light text-center">
                                        {slides[currentSlide].content}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-center">
                                     <p className="text-2xl md:text-3xl text-slate-200 leading-relaxed font-light">
                                        {slides[currentSlide].content}
                                     </p>
                                </div>
                            )}

                            <div className="mt-auto pt-6 flex justify-between items-center text-slate-500 text-sm border-t border-slate-800 font-medium shrink-0">
                                <div className="uppercase tracking-wider">Aurora Tech Computing</div>
                                <div className="uppercase tracking-wider">Project: Atomic-Link</div>
                            </div>
                        </div>
                        {/* Decorative Background Elements */}
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-transparent ${c.gradient} rounded-bl-full pointer-events-none`}></div>
                   </div>
                </div>

                {/* Speaker Notes */}
                {showScript && (
                    <div className="w-full md:w-96 bg-white border-l border-slate-300 p-8 flex flex-col shrink-0 shadow-[-10px_0_20px_rgba(0,0,0,0.05)] z-20">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 pb-4 border-b border-slate-100 shrink-0">
                             <MessageSquare size={16} className={c.text} /> Speaker Notes (Pitch)
                        </h3>
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                            <p className="text-slate-800 leading-loose text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                                {slides[currentSlide].script}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="bg-slate-900 p-4 border-t border-slate-800 flex justify-between items-center shrink-0">
                <button 
                    onClick={prev} 
                    disabled={currentSlide === 0}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-lg transition-colors font-medium"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                    {slides.map((_, i) => (
                        <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? `w-8 ${c.active}` : 'w-2 bg-slate-700'}`} />
                    ))}
                </div>
                <button 
                    onClick={next}
                    disabled={currentSlide === slides.length - 1}
                    className={`flex items-center gap-2 px-5 py-2.5 ${c.active} hover:brightness-110 disabled:opacity-30 text-white rounded-lg transition-all font-medium`}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
