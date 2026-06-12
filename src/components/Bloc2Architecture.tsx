import React, { useState } from 'react';
import { Badge, DefenseTimer, DeliverableViewer, SegmentedControl } from './DefenseUI';
import { REPO_DATA } from '../lib/repoData';
import { Database, Presentation, FileCode, PlaySquare } from 'lucide-react';
import Bloc2ArchitectureDemo from './demos/Bloc2ArchitectureDemo';
import Bloc2Interactive from './demos/Bloc2Interactive';
import { motion } from 'motion/react';

const Bloc2Architecture = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'iac' | 'interactive'>('interactive');
  const files = REPO_DATA.bloc2;

  const videoText = files.find(f => f.name === 'Demo_Video.txt')?.content || '';

  const tabs = [
      { id: 'iac', label: 'IaC Repository (GitHub)', icon: <FileCode className="w-4 h-4" /> },
      { id: 'slides', label: 'Infrastructure Plan', icon: <Presentation className="w-4 h-4" /> },
      { id: 'interactive', label: 'Interactive Demo', icon: <Database className="w-4 h-4" /> },
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
             <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 text-white rounded-xl">
               <Database className="w-7 h-7" />
             </div>
             <h1 className="text-4xl font-bold text-slate-900 tracking-tight font-display">Bloc 2: Cloud Infrastructure</h1>
           </div>
           <p className="text-slate-600 text-lg max-w-2xl font-sans leading-relaxed">
             Design, deploy, and document a complete, scalable data infrastructure using Terraform and Docker.
           </p>
           <div className="flex space-x-3 mt-5 flex-wrap gap-y-2">
             <Badge color="green">Architecture Relevance (25%)</Badge>
             <Badge color="blue">IaC Quality (20%)</Badge>
             <Badge color="amber">Data Model (15%)</Badge>
             <Badge color="purple">Deployment (15%)</Badge>
             <Badge color="gray">Observability (10%)</Badge>
           </div>
        </div>
        <DefenseTimer presentationMinutes={5} qaMinutes={15} />
      </div>

      <SegmentedControl tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} color="green" />

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
             title="Infrastructure_Plan.html" 
             content={files.find(f => f.name === 'Infrastructure_Plan.html')?.content || ''}
             files={files}
           />
         )}
         {activeTab === 'iac' && (
           <DeliverableViewer type="code" title="auroratech-iac-repo" files={files} />
         )}
         {activeTab === 'interactive' && (
           <Bloc2Interactive />
         )}
      </motion.div>
    </motion.div>
  );
};

export default Bloc2Architecture;
