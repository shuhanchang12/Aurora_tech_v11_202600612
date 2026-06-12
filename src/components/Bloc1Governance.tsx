import React, { useState } from 'react';
import { Badge, DefenseTimer, DeliverableViewer, SegmentedControl } from './DefenseUI';
import { REPO_DATA } from '../lib/repoData';
import { ShieldCheck, Presentation, FileText, PlaySquare } from 'lucide-react';
import Bloc1GovernanceDemo from './demos/Bloc1GovernanceDemo';
import { motion } from 'motion/react';

const Bloc1Governance = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'document' | 'interactive'>('interactive');
  const files = REPO_DATA.bloc1;

  const tabs = [
      { id: 'document', label: 'Governance Plan (10 Pages)', icon: <FileText className="w-4 h-4" /> },
      { id: 'slides', label: 'Executive Presentation', icon: <Presentation className="w-4 h-4" /> },
      { id: 'interactive', label: 'Interactive Architecture Demo', icon: <PlaySquare className="w-4 h-4" /> },
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
             <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 text-white rounded-xl">
               <ShieldCheck className="w-7 h-7" />
             </div>
             <h1 className="text-4xl font-bold text-slate-900 tracking-tight font-display">Bloc 1: Data Governance</h1>
           </div>
           <p className="text-slate-600 text-lg max-w-2xl font-sans leading-relaxed">
             Design and present a comprehensive data governance policy, establishing core RBAC, auditing, and compliance frameworks.
           </p>
           <div className="flex space-x-3 mt-5 flex-wrap gap-y-2">
             <Badge color="blue">Completeness (25%)</Badge>
             <Badge color="purple">Strategic relevance (20%)</Badge>
             <Badge color="gray">Risk & Compliance (15%)</Badge>
             <Badge color="amber">Presentation Quality (15%)</Badge>
           </div>
        </div>
        <DefenseTimer presentationMinutes={15} qaMinutes={15} />
      </div>

      <SegmentedControl tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} color="blue" />

      <motion.div 
         className="flex-1 min-h-0 overflow-hidden relative rounded-2xl"
         key={activeTab}
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
      >
         {activeTab === 'document' && (
           <DeliverableViewer 
             type="document" 
             title="Data_Governance_Plan.html" 
             content={files.find(f => f.name === 'Data_Governance_Plan.html')?.content || ''} 
             files={files}
           />
         )}
         {activeTab === 'slides' && (
           <DeliverableViewer 
             type="slides" 
             title="Executive_Presentation.html" 
             content={files.find(f => f.name === 'Executive_Presentation.html')?.content || ''}
             files={files}
           />
         )}
         {activeTab === 'interactive' && (
           <Bloc1GovernanceDemo />
         )}
      </motion.div>
    </motion.div>
  );
};

export default Bloc1Governance;

