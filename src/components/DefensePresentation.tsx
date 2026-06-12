import React, { useState } from 'react';
import { Presentation, Video, MonitorPlay, MessageCircle, FileText, ChevronRight, Globe, TrendingDown, Layers, ShieldCheck, Database, GitMerge, BrainCircuit, Rocket, Coins, CheckSquare } from 'lucide-react';
import PresentationViewer from './PresentationViewer';

export default function DefensePresentation() {
    const [activeTab, setActiveTab] = useState<'slides' | 'loom'>('slides');

    const renderVis = (Icon: any, label: string) => (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <Icon size={72} strokeWidth={1.5} className="mb-4 text-indigo-400" />
            <span className="font-bold tracking-widest uppercase text-sm text-indigo-300">{label}</span>
        </div>
    );

    const slides = [
        {
            num: 1,
            title: "Title & Introduction (The Background)",
            content: "Clean, executive tech design with Aurora Tech corporate branding. Title: Project: Atomic-Link — Protecting Global Hardware Margins with AI. Presenter: Shuhan CHANG (Group Controller - Apprentice / AI Architect Candidate).",
            script: "Good morning, members of the Jury. My name is Shuhan CHANG. Today, I am proud to present Project: Atomic-Link. This enterprise AI system was built to solve a major problem at Aurora Tech Computing Group: the separation between our Financial Control and our global shipping operations. Over the next fifteen minutes, I will show you how we built a complete AI platform. By combining financial data with shipping tracking, this system predicts profit drops before they hurt our company.",
            visualComponent: renderVis(Globe, "Global Network"),
            tip: "State your dual-profile (Finance & AI) immediately to establish authority. This shows why you are qualified to build a system connecting both sides."
        },
        {
            num: 2,
            title: "The Business Problem (Exchange Rates & Shipping Delays)",
            content: "Visual flowchart showing the financial impact: 1) FX Changes (EUR/USD, EUR/TWD); 2) Shipping delays from Asia. Callout: Core chips & GPUs make up over 68% of the €450 total cost for our €699 Chromebook.",
            script: "Let's look at the business facts on Slide 2. Aurora Tech makes Chromebooks that sell for 699 Euros. Our total cost to build one is 450 Euros. We buy expensive parts from around the world: GPUs from NVIDIA in the US for 115 Dollars, chips from TSMC in Taiwan for 75 Dollars, and screens from AUO for 58 Dollars.\nBecause we buy in USD and TWD but sell in EUR, we face big risks. If the Euro drops by 5% and ships are delayed by 12 days to avoid the Cape of Good Hope, our cost goes up by 42.5 Euros per unit. This event instantly drops our profit from 8% to just 1.9%. Project: Atomic-Link helps our buying team plan ahead instead of just reacting to problems.",
            visualComponent: renderVis(TrendingDown, "Margin Collapse Risk"),
            tip: "Use real hardware names (NVIDIA, TSMC, AUO). Juries like real business examples because it proves the project solves actual problems."
        },
        {
            num: 3,
            title: "Project Atomic-Link: The System Design",
            content: "High-level plan of the 4 steps: 1) Data Rules; 2) Docker Database; 3) Airflow Data Pipelines; 4) AI & API, connected to the Dashboard.",
            script: "To connect our teams, we created 'Project: Atomic-Link.' Instead of buying expensive and complex ship tracking data, we used a smart backup plan.\nWe automatically download real exchange rates using the free Frankfurter API, and combine it with a shipping simulator that recreates delays based on past port data. This data goes into our main database, feeding an AI engine that helps us make real-time decisions on shipping and currency.",
            visualComponent: renderVis(Layers, "System Architecture")
        },
        {
            num: 4,
            title: "Step 1 - Data Rules (Who Does What & Security)",
            content: "Data Governance structure. Chart showing the CFO controls financial data, and the VP of Supply Chain controls shipping data. Access control list.",
            script: "Good AI needs strong data rules. In Step 1, we created a Data Governance Council. We made clear rules so everyone knows their job: the CFO is in charge of financial data quality, and the VP of Global Supply Chain is in charge of shipping data.\nWe use security rules inside our database so people only see what they need to. Logistics workers cannot change exchange rates, and financial workers cannot change shipping times. All sensitive supplier data is encrypted (using AES-256) to make sure it follows GDPR privacy laws.",
            visualComponent: renderVis(ShieldCheck, "Data Security")
        },
        {
            num: 5,
            title: "Step 1 - Data Quality & System Backup",
            content: "The 4 Rules of Data Quality: Accuracy, Completeness, Timeliness, and Traceability. Diagram showing how the system catches errors if the API fails.",
            script: "To make sure our AI works well—avoiding 'garbage in, garbage out'—we created strict data rules. Our exchange rates must be exact to 4 decimal places, and we require complete shipping data.\nImportantly, we built a backup plan. If the outside exchange rate API stops working, our system does not crash. It catches the error, sends a warning to the dashboard, and uses the average rates from the last 7 days to keep the business running smoothly.",
            visualComponent: renderVis(Database, "Data Resiliency")
        },
        {
            num: 6,
            title: "Step 2 - Database Design (With Docker)",
            content: "Database diagram showing dates, vendors, and our main margin table. Small block of docker-compose code.",
            script: "Moving to Step 2: Data Architecture. To store and process our data quickly, we designed an organized database (Star Schema). Our main Fact Table links our shipping data to our dates and suppliers.\nWe made this system easy to set up. We put our PostgreSQL database inside a lightweight Docker container. With just one short command (docker-compose up), we can start, move, or stop our database anywhere on the cloud.",
            visualComponent: renderVis(Layers, "Docker Infrastructure")
        },
        {
            num: 7,
            title: "Step 3 - Automatic Data Pipeline",
            content: "Apache Airflow Workflow showing the steps. Diagram showing data coming from the exchange rate API and our shipping simulator.",
            script: "Step 3 is the engine of Project: Atomic-Link. We built an automatic data pipeline using Apache Airflow. Every midnight, it downloads real EUR/USD and EUR/TWD exchange rates and runs our shipping simulator to get delay times.\nIn the next step, our pipeline cleans and organizes the data. If a delay is longer than ten days, or if the Euro drops a lot, the pipeline automatically suggests switching from ocean to air. For example, our expensive GPUs are rerouted via Air France Cargo, cutting the travel time from 12 days down to 2 days, changing the shipping cost from €5 to €45.",
            visualComponent: renderVis(GitMerge, "Airflow Logistics")
        },
        {
            num: 8,
            title: "Step 4 - AI & Machine Learning",
            content: "Training steps: Raw Data -> Data Prep -> Random Forest Model -> Saved Model File. Metrics showing Accuracy, Precision, and Recall.",
            script: "In Step 4, we use our database to build our AI prediction engine. We trained a Random Forest model to guess the risk of losing money on our products. Our data points are simple: real-time exchange rates and shipping delays.\nThe model learns the exact points where shipping delays, higher air cargo costs, and bad exchange rates combine to hurt our profits. The trained model is then saved as a small file, ready to be used quickly by our main application.",
            visualComponent: renderVis(BrainCircuit, "Machine Learning")
        },
        {
            num: 9,
            title: "Step 4 - AI API & Automated Testing",
            content: "FastAPI endpoint diagram showing /predict-margin-risk. GitHub Actions workflow diagram showing automatic tests when updating code.",
            script: "To make our AI useful for managers, we put our trained model inside a fast web service (FastAPI). The URL endpoint receives live data from our buying team. It replies with a risk percentage and an action plan.\nTo make sure our code stays reliable, we set up an automatic testing pipeline using GitHub Actions. Every time we update our code, the system runs a series of tests to catch any mistakes before the new code goes live.",
            visualComponent: renderVis(Rocket, "API Deployment")
        },
        {
            num: 10,
            title: "Manager Dashboard (Streamlit)",
            content: "Visual walkthrough of the Streamlit interface showing live FX rates, average delays, shipping lists, and an AI Risk Predictor form.",
            script: "Instead of hiding our AI in the background, we built an easy-to-use manager dashboard using Streamlit. This dashboard acts as the main control center for Aurora Tech's supply chain.\nIt shows live exchange rates and shipping delays, and has a tool where managers can type in custom numbers to immediately see how profits might change. It also shows if our data quality is healthy, keeping track of accuracy, completeness, and AI performance.",
            visualComponent: renderVis(MonitorPlay, "Interactive Dashboard")
        },
        {
            num: 11,
            title: "Future Idea - Fast Automated Payments",
            content: "ERP system diagram. Flow: AI Risk > 80% -> Trigger Automated Hedging -> Fast-track PO Authorization -> Instant Payment to Supplier.",
            script: "Now, let's look at the future of Project: Atomic-Link. Today, even if AI predicts a risk, manual PO approvals and normal bank transfers take 3 to 5 days to finish. During this wait, bad exchange rates can still hurt our profits.\nTo fix this delay, our future plan uses an automated ERP payment gateway. When our AI sees a profit risk over 80%, the system automatically executes a currency hedge. It links directly with our banking API to lock in the exchange rate with our Asian suppliers in seconds. This skips slow manual authorizations and stops us from losing money to currency changes.",
            visualComponent: renderVis(Coins, "Automated Contracts"),
            tip: "This is a great talking point. It upgrades your presentation from a standard coding project to a smart business solution connecting ERP, AI, and finance."
        },
        {
            num: 12,
            title: "Business Value & ROI Conclusion",
            content: "ROI impact graph. Simple highlights: Modern Code, Automation, Data Rules, Automated Hedging future. Open for Q&A.",
            script: "To conclude, Project: Atomic-Link meets all the strict requirements of the RNCP 38777 AI Architect certification. It is a clean mix of modern software setup, automation, machine learning, and strict company data rules.\nMost importantly, by using AI to predict exchange rates and air cargo needs, it protects the company's profits—expecting to cut currency-related losses by 22%. Thank you very much for your time. I am happy to answer your questions now.",
            visualComponent: renderVis(CheckSquare, "Project Conclusion")
        }
    ];

    const looms = [
        {
            id: 1,
            title: "Step 2 - Database Architecture & Docker Setup",
            target: "3 - 5 Minutes",
            objective: "Show your database is running, properly set up, and using Docker.",
            steps: [
                {
                    action: "Show VS Code with docker-compose.yml and init.sql open side-by-side.",
                    script: "Hello! In this first video, I will show you Step 2: Data Architecture for Aurora Tech’s Chromebook and GPU supply chain platform. As you can see, we are looking at our Docker compose file and SQL setup files."
                },
                {
                    action: "Open your terminal and run: docker-compose up -d. Show the container starting.",
                    script: "We use code to set up our database, which makes it easy to reproduce. I will now start our PostgreSQL database. By running `docker-compose up -d`, Docker downloads our database image, sets passwords, and starts it instantly."
                },
                {
                    action: "Switch your terminal view or database client to show the database connection. Show the tables.",
                    script: "Our database is now running on port 5432. Let's connect to it. I am running our setup script to build our data tables. As you can see, we have successfully created three main tables: dates, suppliers, and our main data table for tracking margin risks."
                },
                {
                    action: "Run a SELECT * query showing the TSMC, AUO, and NVIDIA records already saved.",
                    script: "Our supplier table already contains our key hardware partners: NVIDIA for GPUs, TSMC for chips, and AUO for screens. Our warehouse is now fully running, secure, and ready to receive live data."
                }
            ]
        },
        {
            id: 2,
            title: "Step 3 - Apache Airflow Data Pipeline",
            target: "3 - 5 Minutes",
            objective: "Show the Airflow web dashboard, the python code, and prove that data is actively saving to Postgres.",
            steps: [
                {
                    action: "Show VS Code with auroratech_pipeline.py open. Show the request to Frankfurter API and the Air France Cargo rule.",
                    script: "Welcome back! In this second video, we are looking at Step 3: Data Pipelines. Here is our Apache Airflow Python code, auroratech_pipeline.py. It downloads live EUR/USD exchange rates and runs our shipping simulator. If delays hit 12 days, it automatically switches to Air France Cargo, which reduces the delay to 2 days but increases shipping costs to 45 Euros."
                },
                {
                    action: "Switch to your browser showing the Apache Airflow Web UI. Show the DAG named auroratech_chromebook_supply_chain_pipeline.",
                    script: "Now, let’s switch over to our Airflow dashboard. You can see our task is scheduled to run every day. I will trigger it manually now to show you how it works."
                },
                {
                    action: "Click 'Trigger DAG'. Show the task turning green, indicating success.",
                    script: "As I trigger the task, Airflow runs our Python code. In the background, it downloads exchange rates and simulates shipping delays. Fantastic! The task is green, meaning it ran without any errors."
                },
                {
                    action: "Switch back to your database and run a SELECT query to show the new rows.",
                    script: "Let’s check our database to make sure the data was saved. Running a quick query, we can see the new rows. We have real-time rates for EUR/USD and simulated shipping delays, including our Air France Cargo backup rule. Our automatic pipeline is working perfectly."
                }
            ]
        },
        {
            id: 3,
            title: "Step 4 & Dashboard - AI API & Streamlit",
            target: "5 Minutes",
            objective: "Show the machine learning model training, FastAPI documentation, and how the Streamlit dashboard works.",
            steps: [
                {
                    action: "Show VS Code with train_model.py and app.py open. Show the terminal running python train_model.py.",
                    script: "In this final video, we will look at Step 4: AI & our dashboard. First, on my screen, you see our Random Forest AI training script. By running train_model.py, we read our data, train our AI model, and save it to a file."
                },
                {
                    action: "Switch to the browser at http://127.0.0.1:8000/docs showing the FastAPI Swagger UI.",
                    script: "To make this model easy to use, we put it into a fast web service. Here is our documentation interface. Let’s type in some test numbers: a weak Euro at 1.04 USD, a 2-day delay, and expensive 45 Euro shipping."
                },
                {
                    action: "Click 'Execute' in Swagger UI. Show the JSON response returning margin_impact_risk_detected: true.",
                    script: "As I click 'Execute', our API replies instantly. Our AI model sees an 87.5% risk to our profits, and suggests preparing an automated hedging payment to avoid losing more money to bad exchange rates."
                },
                {
                    action: "Switch to the browser tab showing your Streamlit dashboard running.",
                    script: "Now, let's view this in our main manager dashboard, which is built in Streamlit. At the top, managers can see live exchange rates, active flights, and risk levels. Below, they can trace past trends and view shipping lists."
                },
                {
                    action: "Interact with the radio button (select Air France Cargo) and the slider. Click 'Execute Margin Inference'.",
                    script: "The best part of this dashboard is that managers can test their own scenarios. Let's select Air France Cargo. The system immediately alerts us to money-losing risks and suggests activating our automated vendor payment plan, giving our team the tools they need to protect our Chromebook profits."
                },
                {
                    action: "Scroll down to show the data quality metrics.",
                    script: "At the bottom, we display real-time data health checks, proving that our data is 100% accurate and tracked properly. Project: Atomic-Link is secure, reliable, and ready to use. Thank you so much for watching!"
                }
            ]
        }
    ];

    return (
        <div className="flex-1 bg-slate-50 p-8 pb-32">
            <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
                <header className="mb-10 text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Defense Mastery Suite</h1>
                    <p className="text-lg text-slate-600 max-w-3xl">
                        Aurora Tech Computing Group — Project: Atomic-Link<br/>
                        Prepared by Shuhan CHANG | Objective: RNCP 38777 AI Architect
                    </p>
                </header>

                <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit mb-8 shadow-sm">
                    <button 
                        onClick={() => setActiveTab('slides')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'slides' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                        <Presentation size={18} /> Presentation & Oral Script
                    </button>
                    <button 
                        onClick={() => setActiveTab('loom')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'loom' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                        <Video size={18} /> Loom Demo Scripts
                    </button>
                </div>

                {activeTab === 'slides' && (
                    <div className="space-y-12">
                        <div className="mb-8">
                            <PresentationViewer title="The Final Defense Slide Deck (Global)" slides={slides} accentColor="indigo" />
                        </div>
                        {slides.map(slide => (
                            <div key={slide.num} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                                <div className="bg-slate-900 text-slate-300 md:w-1/3 p-6 flex flex-col justify-between border-r border-slate-800">
                                    <div>
                                        <div className="text-emerald-400 font-bold tracking-widest text-xs uppercase mb-2">Slide {slide.num} / 12</div>
                                        <h3 className="text-xl font-bold text-white leading-tight mb-4">{slide.title}</h3>
                                        <div className="mt-4">
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-2"><MonitorPlay size={14}/> Layout & Visuals</div>
                                            <p className="text-sm whitespace-pre-wrap leading-relaxed opacity-90">{slide.content}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-2/3 flex flex-col">
                                    <div className="p-6 md:p-8 flex-1">
                                        <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold uppercase mb-3"><MessageCircle size={16}/> Oral Script (What to say)</div>
                                        <p className="text-slate-700 leading-relaxed text-lg italic whitespace-pre-wrap">"{slide.script}"</p>
                                    </div>
                                    {slide.tip && (
                                        <div className="bg-amber-50 px-6 py-4 md:px-8 border-t border-amber-100 flex items-start gap-3">
                                            <div className="bg-amber-500 text-white rounded-full p-1 mt-0.5"><ChevronRight size={14}/></div>
                                            <div>
                                                <div className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">Jury Defense Edge (Pro-Tip)</div>
                                                <p className="text-amber-900 text-sm font-medium">{slide.tip}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'loom' && (
                    <div className="space-y-12">
                        {looms.map(loom => (
                            <div key={loom.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="bg-indigo-900 text-indigo-100 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between border-b border-indigo-950">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-indigo-800 p-2 rounded-lg text-white"><Video size={24}/></div>
                                        <div>
                                            <div className="text-indigo-300 font-bold tracking-widest text-xs uppercase">Loom Demo {loom.id}</div>
                                            <h3 className="text-xl font-bold text-white">{loom.title}</h3>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                                        <div className="bg-indigo-950 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full">{loom.target}</div>
                                    </div>
                                </div>
                                
                                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Objective</div>
                                    <p className="text-slate-800 font-medium">{loom.objective}</p>
                                </div>

                                <div className="p-0">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50 border-b border-slate-200 hidden md:table-header-group">
                                            <tr>
                                                <th className="py-3 px-6 text-xs font-bold text-slate-500 w-16">Step</th>
                                                <th className="py-3 px-6 text-xs font-bold text-slate-500 w-2/5">🖥️ Screen Action</th>
                                                <th className="py-3 px-6 text-xs font-bold text-slate-500 w-3/5">🗣️ Spoken Script</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loom.steps.map((step, idx) => (
                                                <tr key={idx} className="block md:table-row border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                                    <td className="block md:table-cell py-4 px-6 text-sm text-slate-400 font-bold md:align-top">
                                                        <span className="md:hidden">Step </span>{idx + 1}
                                                    </td>
                                                    <td className="block md:table-cell py-4 px-6 text-sm md:align-top">
                                                        <div className="md:hidden text-xs font-bold text-slate-500 uppercase mb-1">Screen Action</div>
                                                        <p className="text-slate-700 bg-slate-100/50 p-3 rounded-lg border border-slate-200 leading-relaxed font-medium">{step.action}</p>
                                                    </td>
                                                    <td className="block md:table-cell py-4 px-6 text-sm md:align-top">
                                                        <div className="md:hidden text-xs font-bold text-slate-500 uppercase mb-1">Spoken Script</div>
                                                        <p className="text-indigo-900 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 leading-relaxed italic pr-4">"{step.script}"</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
