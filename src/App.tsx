import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import Bloc1Governance from './components/Bloc1Governance';
import Bloc2Architecture from './components/Bloc2Architecture';
import Bloc3Pipelines from './components/Bloc3Pipelines';
import Bloc4AISolutions from './components/Bloc4AISolutions';
import InteractiveArchitectureDiagram from './components/InteractiveArchitectureDiagram';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
    const [activeBloc, setActiveBloc] = useState(0);

    const renderContent = () => {
        switch (activeBloc) {
            case 0: return <DashboardOverview setActiveBloc={setActiveBloc} />;
            case 1: return <Bloc1Governance />;
            case 2: return <Bloc2Architecture />;
            case 3: return <Bloc3Pipelines />;
            case 4: return <Bloc4AISolutions />;
            case 5: return <InteractiveArchitectureDiagram />;
            default: return <DashboardOverview setActiveBloc={setActiveBloc} />;
        }
    };

    return (
        <div className="flex bg-[#f8fafc] font-sans text-gray-900 min-h-screen">
            <div className="sticky top-0 h-screen shrink-0 z-20">
                <Sidebar activeBloc={activeBloc} setActiveBloc={setActiveBloc} />
            </div>
            <main className="flex-1 w-full flex flex-col relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeBloc}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 w-full"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default App;
