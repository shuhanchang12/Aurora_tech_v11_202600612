import React, { useState } from 'react';
import { Badge, DefenseTimer, DeliverableViewer, SegmentedControl } from './DefenseUI';
import { REPO_DATA } from '../lib/repoData';
import { Zap, Presentation, FileCode, PlaySquare, Workflow } from 'lucide-react';
import Bloc3PipelinesDemo from './demos/Bloc3PipelinesDemo';
import Bloc3Interactive from './demos/Bloc3Interactive';
import { motion } from 'motion/react';

const Bloc3Pipelines = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'code' | 'interactive'>('interactive');
  const files = REPO_DATA.bloc3;
  const videoText = files.find(f => f.name === 'Demo_Video.txt')?.content || '';

  const tabs = [
      { id: 'code', label: 'Pipeline Repository (GitHub)', icon: <FileCode className="w-4 h-4" /> },
      { id: 'slides', label: 'Pipeline Plan (Slides)', icon: <Presentation className="w-4 h-4" /> },
      { id: 'interactive', label: 'Interactive Demo', icon: <PlaySquare className="w-4 h-4" /> },
  ];

  return (
    <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto w-full p-8 lg:p-12 h-full flex flex-col"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
           <div className="flex items-center space-x-4 mb-3">
             <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20 text-white rounded-xl">
               <Zap className="w-7 h-7" />
             </div>
             <h1 className="text-4xl font-bold text-slate-900 tracking-tight font-display">Bloc 3: Real-Time Pipelines</h1>
           </div>
           <p className="text-slate-600 text-lg max-w-2xl font-sans leading-relaxed">
             Design, develop, automate, and monitor a robust ETL/ELT data pipeline handling real-time API streams.
           </p>
           <div className="flex space-x-3 mt-5 flex-wrap gap-y-2">
             <Badge color="amber">Code Quality (25%)</Badge>
             <Badge color="blue">Architecture (20%)</Badge>
             <Badge color="green">Data Quality Control (20%)</Badge>
             <Badge color="purple">Automation (15%)</Badge>
             <Badge color="gray">Observability (10%)</Badge>
           </div>
        </div>
        <DefenseTimer presentationMinutes={5} qaMinutes={15} />
      </div>

      <SegmentedControl tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} color="amber" />

      <motion.div 
         className="flex-1 min-h-0 overflow-hidden relative rounded-2xl"
         key={activeTab}
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
      >
         {activeTab === 'slides' && (
           <DeliverableViewer 
             type="slides" 
             title="Pipeline_Plan.html" 
             content={files.find(f => f.name === 'Pipeline_Plan.html')?.content || ''}
             files={files}
           />
         )}
         {activeTab === 'code' && (
           <DeliverableViewer type="code" title="auroratech-pipelines-repo" files={files} />
         )}
         {activeTab === 'interactive' && (
           <Bloc3Interactive />
         )}
      </motion.div>
    </motion.div>
  );
};

export default Bloc3Pipelines;
