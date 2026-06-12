import React, { useState } from 'react';
import { Badge, DefenseTimer, DeliverableViewer, SegmentedControl } from './DefenseUI';
import { REPO_DATA } from '../lib/repoData';
import { BrainCircuit, Presentation, FileCode, PlaySquare } from 'lucide-react';
import Bloc4AIDemo from './demos/Bloc4AIDemo';
import Bloc4VisualizationDemo from './demos/Bloc4VisualizationDemo';
import { motion } from 'motion/react';

const Bloc4AISolutions = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'mlops' | 'interactive'>('interactive');
  const files = REPO_DATA.bloc4;
  const videoText = files.find(f => f.name === 'Demo_Video.txt')?.content || '';

  const tabs = [
      { id: 'mlops', label: 'MLOps Repository (GitHub)', icon: <FileCode className="w-4 h-4" /> },
      { id: 'slides', label: 'Executive Deck', icon: <Presentation className="w-4 h-4" /> },
      { id: 'interactive', label: 'Interactive Demo', icon: <BrainCircuit className="w-4 h-4" /> },
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
             <div className="p-3 bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-lg shadow-purple-500/20 text-white rounded-xl">
               <BrainCircuit className="w-7 h-7" />
             </div>
             <h1 className="text-4xl font-bold text-slate-900 tracking-tight font-display">Bloc 4: Enterprise AI Solutions</h1>
           </div>
           <p className="text-slate-600 text-lg max-w-2xl font-sans leading-relaxed">
             Industrialize an end-to-end AI solution: design, deployment, CI/CD, and real-time production monitoring.
           </p>
           <div className="flex space-x-3 mt-5 flex-wrap gap-y-2">
             <Badge color="purple">ML Model Quality (25%)</Badge>
             <Badge color="blue">CI/CD Pipeline (20%)</Badge>
             <Badge color="green">Serving API (15%)</Badge>
             <Badge color="amber">Business Spec (15%)</Badge>
             <Badge color="gray">Auto-Retraining (10%)</Badge>
             <Badge color="gray">Monitoring (10%)</Badge>
           </div>
        </div>
        <DefenseTimer presentationMinutes={5} qaMinutes={10} />
      </div>

      <SegmentedControl tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} color="purple" />

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
             title="AI_Solution_Presentation.html" 
             content={files.find(f => f.name === 'AI_Solution_Presentation.html')?.content || ''}
             files={files}
           />
         )}
         {activeTab === 'mlops' && (
           <DeliverableViewer type="code" title="auroratech-mlops-repo" files={files} />
         )}
         {activeTab === 'interactive' && (
           <Bloc4AIDemo />
         )}
      </motion.div>
    </motion.div>
  );
};

export default Bloc4AISolutions;
