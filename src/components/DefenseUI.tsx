import { Code, FileText, Layout, Play, Pause, Clock, CheckCircle2, AlertCircle, FileJson, FileCode, Search, Menu, ChevronRight, ChevronLeft, Download, Maximize2, ExternalLink } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import PptxGenJS from 'pptxgenjs';
import { motion, AnimatePresence } from 'motion/react';

export const SegmentedControl = ({ tabs, activeTab, onChange, color }: { tabs: { id: string, label: string, icon: React.ReactNode }[], activeTab: string, onChange: (id: string) => void, color: string }) => {
  const colorMap: Record<string, string> = {
      blue: 'text-blue-700',
      green: 'text-emerald-700',
      amber: 'text-amber-700',
      purple: 'text-purple-700',
  };

  return (
    <div className="flex space-x-1 border border-slate-200 bg-slate-50/50 p-1 rounded-xl w-max mb-8 shadow-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors z-10 ${isActive ? colorMap[color] : 'text-slate-500 hover:text-slate-700'}`}
          >
            {isActive && (
              <motion.div
                layoutId={`active-tab-${color}`}
                className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200/50"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center space-x-2">
                {tab.icon}
                <span className="tracking-wide">{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const Badge = ({ children, color = 'blue' }: { children: React.ReactNode, color?: 'blue'|'green'|'amber'|'purple'|'gray' }) => {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-blue-500/5',
    green: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-emerald-500/5',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-amber-500/5',
    purple: 'bg-purple-500/10 text-purple-600 border-purple-500/20 shadow-purple-500/5',
    gray: 'bg-slate-500/10 text-slate-600 border-slate-500/20 shadow-slate-500/5',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border tracking-wide uppercase font-mono shadow-sm ${colors[color]}`}>
      {children}
    </span>
  );
};

export const DefenseTimer = ({ presentationMinutes, qaMinutes }: { presentationMinutes: number, qaMinutes: number }) => {
  return (
    <div className="flex items-center space-x-6 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm shadow-slate-200/50">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <Play className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Presentation</span>
          <span className="text-sm font-semibold text-slate-900">{presentationMinutes} Min</span>
        </div>
      </div>
      <div className="w-px h-10 bg-slate-100" />
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Clock className="w-4 h-4 text-purple-600" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Q&A Session</span>
          <span className="text-sm font-semibold text-slate-900">{qaMinutes} Min</span>
        </div>
      </div>
    </div>
  );
};

export const DeliverableViewer = ({ 
  type, 
  title, 
  content, 
  files,
  videoLength 
}: { 
  type: 'slides' | 'document' | 'code' | 'video', 
  title: string, 
  content?: string,
  files?: Array<{name: string, content: string, language?: string, isBinary?: boolean}>,
  videoLength?: string
}) => {
  const [activeFile, setActiveFile] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
        interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    setIsPlaying(false);
                    return 100;
                }
                return p + 0.5;
            });
        }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (type === 'slides' || type === 'document') {
    const handleExportPPTX = () => {
        const pres = new PptxGenJS();
        pres.author = "JHEDA Candidate";
        pres.company = "Albert School";
        pres.title = title.replace(/_/g, ' ').replace('.html', '');
        pres.layout = "LAYOUT_16x9";

        let slideTitle = title.replace(/_/g, ' ').replace('.html', '');

        // Title Slide
        const slide = pres.addSlide();
        slide.background = { color: "0B2447" };
        slide.addText(slideTitle, { x: 1, y: 2, w: 8, h: 1.5, fontSize: 40, align: "center", bold: true, color: "FFFFFF" });
        slide.addText("Master Thesis Defense - AuroraTech Project\nCandidate: JHEDA Track", { x: 1, y: 4, w: 8, h: 1.5, fontSize: 20, align: "center", color: "A5D7E8" });

        // Content Slide
        // Parse HTML content
        if (content) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const slideNodes = doc.querySelectorAll('.slide-container');
            
            if (slideNodes.length > 0) {
                slideNodes.forEach((node) => {
                    const headerObj = node.querySelector('.header h1');
                    const titleStr = headerObj ? (headerObj.textContent || '') : 'Overview';
                    
                    const subheaderObj = node.querySelector('h2');
                    const subTitleStr = subheaderObj ? (subheaderObj.textContent || '') : '';

                    const slide = pres.addSlide();
                    
                    // Add header
                    slide.addText(titleStr, { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true, color: "0B2447" });
                    
                    // Add decorative line
                    slide.addShape(pres.ShapeType.line, { x: 0.5, y: 1.3, w: 9, h: 0, line: { color: 'E11D48', width: 2 } });
                    
                    if (subTitleStr) {
                        slide.addText(subTitleStr, { x: 0.5, y: 1.5, w: 9, h: 0.5, fontSize: 24, bold: true, color: "BE123C" });
                    }

                    // Extract content
                    let elements = Array.from(node.children).filter(el => 
                        !el.classList.contains('header') && 
                        el.tagName.toLowerCase() !== 'h2' && 
                        !el.classList.contains('slide-number') &&
                        el.tagName.toLowerCase() !== 'script'
                    );

                    let textObjects = [];
                    elements.forEach(el => {
                        if (el.tagName.toLowerCase() === 'ul' || el.tagName.toLowerCase() === 'ol') {
                            Array.from(el.querySelectorAll('li')).forEach(li => {
                                textObjects.push({ 
                                    text: li.textContent || '', 
                                    options: { bullet: true, breakLine: true } 
                                });
                            });
                        } else {
                            let clone = el.cloneNode(true) as HTMLElement;
                            clone.querySelectorAll('br').forEach(br => br.replaceWith(' '));
                            let t = clone.textContent || '';
                            let lines = t.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(l => l.length > 0);
                            lines.forEach(l => {
                                textObjects.push({ 
                                    text: "» " + l, 
                                    options: { breakLine: true, fontSize: 18, color: '1E293B' } 
                                });
                            });
                        }
                    });

                    if (textObjects.length > 0) {
                        slide.addText(textObjects, { x: 0.5, y: subTitleStr ? 2.2 : 1.5, w: 9, h: 4, valign: "top", fontSize: 20, color: "333333" });
                    }
                });

                pres.writeFile({ fileName: title.replace('.html', '.pptx') });
                return;
            }
        }

        // Fallback Content Slide (if no valid HTML slides found)
        const slide2 = pres.addSlide();
        slide2.addText("Agenda & Overview", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 32, bold: true, color: "0B2447", border: { type: "none", pt: 1 } });
        
        let contentItems = [];
        if (title.includes('Governance')) {
            contentItems = ["• Data Governance Policy Framework", "• GDPR Compliance & Risk Strategy", "• Data Quality Standards", "• Security Metrics & Audit Logs"];
        } else if (title.includes('Infrastructure')) {
            contentItems = ["• Overall Data Architecture Design", "• Data Modeling & Schemas", "• Infrastructure as Code (Docker, Terraform)", "• Monitoring & Scalability (Prometheus)"];
        } else if (title.includes('Pipeline')) {
            contentItems = ["• Real-time Data Pipeline Architecture", "• ELT / ETL Flows (Airflow, dbt)", "• Automation & Orchestration", "• Quality Control (Great Expectations)"];
        } else if (title.includes('Solution') || title.includes('AI')) {
            contentItems = ["• AI Solution Business Specifications", "• Model Development & Serving API (FastAPI)", "• CI/CD Pipeline (GitHub Actions)", "• Drift monitoring & Automated Retraining"];
        } else {
            contentItems = ["• Key strategic metrics and requirements", "• Technical architecture breakdown", "• Implementation phases & status", "• Business value and ROI"];
        }

        slide2.addText(
          contentItems.map(t => ({ text: t })), 
          { x: 0.5, y: 2, w: 9, h: 3, fontSize: 24, color: "333333", bullet: true }
        );

        pres.writeFile({ fileName: title.replace('.html', '.pptx') });
    };

    if (content && content.includes('<html')) {
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col h-[700px]"
          >
            <div className="px-5 py-4 bg-slate-50 flex items-center justify-between border-b border-slate-200 z-10">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${type === 'slides' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'}`}>
                    {type === 'slides' ? <Layout className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 tracking-tight">{title}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{type === 'slides' ? 'Interactive Deck' : 'Document Viewer'}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                 {type === 'slides' && (
                     <button onClick={handleExportPPTX} className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-md transition-colors group">
                        <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        <span>Export .pptx</span>
                     </button>
                 )}
              </div>
            </div>
            <div className="flex-1 w-full bg-slate-100 relative p-4 lg:p-8">
               <div className="w-full h-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden relative">
                   <iframe srcDoc={content} className="w-full h-full border-none absolute inset-0" sandbox="allow-scripts allow-same-origin bg-white" title={title} />
               </div>
            </div>
          </motion.div>
        );
    }

    // fallback for slides without HTML content. (We shouldn't hit this if we pass content properly)
    const totalSlides = title.includes('Executive') || title.includes('Solution') ? 15 : 20;

    const handlePrev = () => setCurrentSlide(s => Math.max(1, s - 1));
    const handleNext = () => setCurrentSlide(s => Math.min(totalSlides, s + 1));

    const getSlideContent = (slide: number) => {
       if (slide === 1) return { heading: title.replace(/_/g, ' ').replace('.pptx', ''), content: "Master Thesis Defense\nAuroraTech Project\nCandidate: JHEDA Track" };
       if (slide === totalSlides) return { heading: "Q&A Session", content: "Thank you for your attention.\nReady for questions." };
       
       let section = "";
       if (title.includes('Governance')) section = "Data Governance Policy";
       else if (title.includes('Infrastructure')) section = "Data Architecture & IaC";
       else if (title.includes('Pipeline')) section = "Real-Time Data Pipelines";
       else if (title.includes('Solution')) section = "AI Solutions & MLOps";
       else section = "Project Overview";

       return { heading: `${section} - Part ${slide - 1}`, content: "• Key strategic metrics and requirements\n• Technical architecture breakdown\n• Implementation phases & status\n• Business value and ROI" };
    }

    const slideData = getSlideContent(currentSlide);

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[700px]"
      >
        <div className="px-5 py-4 bg-[#0a0f18] flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                <Layout className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-200 tracking-tight">{title}</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Presentation Mode</span>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 bg-slate-900 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />
          <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-5xl aspect-[16/9] bg-white rounded-xl flex flex-col p-12 lg:p-16 shadow-2xl items-center justify-center text-center relative z-10"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[80px] -mt-10 -mr-10 pointer-events-none" />
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 font-display tracking-tight">{slideData.heading}</h1>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-10" />
                <div className="text-xl lg:text-2xl text-slate-600 whitespace-pre-wrap leading-relaxed text-left max-w-3xl font-sans">
                   {slideData.content}
                </div>
              </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-8 flex space-x-6 items-center bg-white/10 px-8 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg z-20">
             <button onClick={handlePrev} disabled={currentSlide === 1} className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors group">
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
             </button>
             <span className="text-sm font-mono font-bold text-slate-200 tracking-widest w-20 text-center">
                {currentSlide} / {totalSlides}
             </span>
             <button onClick={handleNext} disabled={currentSlide === totalSlides} className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors group">
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'code' && files && files.length > 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-[#0d1117] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex h-[700px]"
      >
        {/* Repo Sidebar */}
        <div className="w-64 lg:w-72 bg-[#161b22] border-r border-[#30363d] flex flex-col">
          <div className="px-5 py-4 border-b border-[#30363d] flex items-center justify-between text-slate-200">
             <div className="flex items-center space-x-3">
                 <div className="p-1.5 bg-blue-500/10 rounded-md">
                     <Layout className="w-4 h-4 text-blue-400" />
                 </div>
                 <span className="text-sm font-bold truncate font-sans">aurora-tech</span>
             </div>
             <a href="#" className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Open exact target directory for Evaluation">
                 <ExternalLink className="w-4 h-4" />
             </a>
          </div>
          <div className="flex-1 overflow-y-auto py-3 px-2 custom-scrollbar">
            {files.map((file, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveFile(idx)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-3 transition-colors rounded-lg mb-1 font-mono ${activeFile === idx ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm' : 'text-slate-400 hover:bg-[#21262d] hover:text-slate-200 border border-transparent'}`}
              >
                {file.name.includes('.md') ? <FileText className="w-4 h-4 shrink-0" /> : 
                 file.name.includes('.json') ? <FileJson className="w-4 h-4 shrink-0" /> :
                 file.name.includes('.py') || file.name.includes('.tf') || file.name.includes('.yml') ? <FileCode className="w-4 h-4 shrink-0" /> :
                 <Code className="w-4 h-4 shrink-0" />}
                <span className="truncate tracking-wide">{file.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Code Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0d1117]">
          <div className="px-5 py-3 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-300 font-mono tracking-wide">{files[activeFile].name}</span>
            </div>
            <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#30363d]" />
                <div className="w-3 h-3 rounded-full bg-[#30363d]" />
                <div className="w-3 h-3 rounded-full bg-[#30363d]" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
            {files[activeFile].isBinary ? (
                <div className="text-slate-500 italic font-mono flex items-center space-x-2"><AlertCircle size={16} /><span>Binary file content cannot be displayed inline.</span></div>
            ) : (
                <pre className="text-sm font-mono text-slate-300 leading-relaxed bg-[#0d1117] overflow-x-auto">
                  <code>{files[activeFile].content}</code>
                </pre>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'video') {
    const togglePlay = () => {
        if (progress >= 100) setProgress(0);
        setIsPlaying(!isPlaying);
    };

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-[#0a0f18] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[700px] justify-center items-center relative group"
      >
        <div className="absolute inset-x-0 top-0 p-5 flex justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
           <span className="text-xs text-slate-300 font-mono tracking-widest uppercase flex items-center gap-2"><Play size={14} className="text-blue-500" /> {title}</span>
        </div>

        {isPlaying || progress > 0 ? (
           <div className="flex flex-col items-center justify-center w-full h-full relative" onClick={togglePlay}>
              <div className="absolute inset-0 overflow-hidden flex flex-col justify-end opacity-90 transition-all cursor-pointer bg-slate-900/50">
                <div className="w-full h-[1px] bg-blue-500/30 absolute top-1/4 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                <div className="w-full h-[1px] bg-indigo-500/20 absolute top-2/4 animate-pulse delay-75 shadow-[0_0_10px_rgba(99,102,241,0.2)]"></div>
                
                {/* Floating elements to simulate data/movement */}
                <div className="flex justify-around items-end h-full px-12 lg:px-24 pb-20 opacity-40">
                  <div className={`w-8 lg:w-16 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg ${isPlaying ? 'animate-[pulse_1.5s_infinite]' : ''}`} style={{ height: `${20 + (progress % 40)}%` }}></div>
                   <div className={`w-8 lg:w-16 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg ${isPlaying ? 'animate-[pulse_2s_infinite]' : ''}`} style={{ height: `${10 + (progress % 60)}%` }}></div>
                  <div className={`w-8 lg:w-16 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg ${isPlaying ? 'animate-[pulse_1.2s_infinite]' : ''}`} style={{ height: `${30 + (progress % 30)}%` }}></div>
                  <div className={`w-8 lg:w-16 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg ${isPlaying ? 'animate-[pulse_1.8s_infinite]' : ''}`} style={{ height: `${40 + (progress % 40)}%` }}></div>
                  <div className={`w-8 lg:w-16 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg ${isPlaying ? 'animate-[pulse_1.4s_infinite]' : ''}`} style={{ height: `${15 + (progress % 50)}%` }}></div>
                </div>
              </div>
              <div className="z-10 flex flex-col items-center">
                 <div className="mb-6 text-emerald-400 font-mono bg-[#0a0f18]/80 px-6 py-3 rounded-xl border border-emerald-900/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex items-center gap-3 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    System Active: {Math.floor(progress)}%
                 </div>
                 {content && (
                     <a href={content.trim()} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-sm font-mono bg-slate-900/80 p-3 rounded-lg break-all max-w-lg text-center z-30 relative border border-blue-900/50 hover:border-blue-500/50 transition-colors backdrop-blur-md flex items-center gap-2">
                         <Search size={14} /> {content.trim()}
                     </a>
                 )}
              </div>
           </div>
        ) : (
           <div className="flex flex-col items-center cursor-pointer p-8 rounded-full bg-white/5 hover:bg-white/10 transition-all z-20 border border-white/5 backdrop-blur-md group-hover:scale-110 duration-500" onClick={togglePlay}>
             <Play className="w-16 h-16 text-white ml-2 opacity-80 group-hover:opacity-100" />
           </div>
        )}

         <div className="absolute inset-x-0 bottom-0 px-6 py-5 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
            <div className="flex items-center justify-between gap-6">
                <button onClick={togglePlay} className="text-slate-300 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer group/bar relative" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    setProgress((x / rect.width) * 100);
                }}>
                   <div className="h-full bg-blue-500 transition-all duration-100 ease-linear rounded-full relative" style={{ width: `${progress}%` }}>
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                   </div>
                </div>
                <span className="text-slate-400 text-xs font-mono w-16 text-right tabular-nums">{videoLength || '03:45'}</span>
            </div>
         </div>
      </motion.div>
    );
  }

  return null;
}
