import React from 'react';
import { Printer, FileText, CheckCircle, AlertTriangle, ShieldCheck, BookOpen, Users, Lock, Target, FileDown } from 'lucide-react';

export default function Bloc1Document() {
    const exportToWord = () => {
        const contentBlock = document.getElementById('document-content');
        if (!contentBlock) return;
        
        const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Data Governance Plan</title></head><body>`;
        const postHtml = "</body></html>";
        const html = preHtml + contentBlock.innerHTML + postHtml;

        const blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Data_Governance_Plan.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white text-slate-800 p-8 md:p-12 max-w-5xl mx-auto shadow-2xl print:shadow-none print:p-0 my-8 rounded-xl print:m-0 print:border-none">
            <div className="print:hidden mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-1 flex items-center gap-3">
                        <FileText className="text-indigo-600" />
                        Comprehensive Data Governance Plan
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base max-w-2xl">
                        Official written deliverable (8-10 pages equivalent). Formatted for A4 export. Contains the fictional organization context, policy, stakeholders matrix, GDPR compliance, data quality controls, security protocols, and risk assessments.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={exportToWord}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-all active:scale-95 shrink-0"
                    >
                        <FileDown size={18} />
                        Export to Word
                    </button>
                    <button 
                        onClick={() => window.print()}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-all active:scale-95 shrink-0"
                    >
                        <Printer size={18} />
                        Export to PDF
                    </button>
                </div>
            </div>
            
            <div id="document-content" className="print:text-black space-y-16 leading-relaxed font-serif text-lg">
                
                {/* --- COVER PAGE --- */}
                <div className="print:h-[297mm] flex flex-col justify-center items-center text-center border-b border-slate-300 pb-16 print:border-none print:pb-0">
                    <div className="w-32 h-32 bg-indigo-900 rounded-2xl mb-8 flex items-center justify-center text-white shadow-xl rotate-3">
                        <ShieldCheck size={64} className="-rotate-3" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-tight">Master Data<br/>Governance Policy</h1>
                    <h2 className="text-2xl md:text-3xl text-slate-600 mb-16 font-medium">Aurora Tech Computing Group</h2>
                    
                    <div className="text-left bg-slate-50 print:bg-transparent p-8 rounded-xl w-full max-w-xl border border-slate-200 print:border-black font-sans shadow-sm">
                        <h3 className="uppercase tracking-widest text-slate-400 font-bold text-xs mb-4">Document Meta Information</h3>
                        <p className="flex justify-between border-b border-slate-200 print:border-slate-400 pb-3 mb-3"><span className="font-semibold text-slate-500 print:text-black">Project Code:</span> <strong className="text-slate-900">Atomic-Link</strong></p>
                        <p className="flex justify-between border-b border-slate-200 print:border-slate-400 pb-3 mb-3"><span className="font-semibold text-slate-500 print:text-black">Prepared By:</span> <strong className="text-slate-900">Lead AI & Data Architect</strong></p>
                        <p className="flex justify-between border-b border-slate-200 print:border-slate-400 pb-3 mb-3"><span className="font-semibold text-slate-500 print:text-black">Date of Issue:</span> <strong className="text-slate-900">June 2026</strong></p>
                        <p className="flex justify-between border-b border-slate-200 print:border-slate-400 pb-3 mb-3"><span className="font-semibold text-slate-500 print:text-black">Target Audience:</span> <strong className="text-slate-900">Executive Jury & Governance Council</strong></p>
                        <p className="flex justify-between"><span className="font-semibold text-slate-500 print:text-black">Classification:</span> <strong className="text-rose-600 print:text-black uppercase tracking-wider">Strictly Confidential</strong></p>
                    </div>
                </div>

                {/* --- CHAPTER 1 --- */}
                <div className="print:break-before-page">
                    <h2 className="text-3xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-3 border-b-2 border-indigo-100 pb-2">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-xl">1.0</span> Fictional Organization & Context
                    </h2>
                    
                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">1.1 Company Profile: Aurora Tech Computing Group</h3>
                    <p className="mb-4">
                        Aurora Tech Computing Group is a fictitious, Paris-based multinational technology manufacturer specializing in the assembly and global distribution of high-performance Google Chromebooks. The company operates in a highly volatile maritime supply chain environment, sourcing premium semiconductor components (e.g., TSMC processors, NVIDIA GPUs, and AUO display panels) primarily from the Asia-Pacific region (Taiwan, South Korea, Japan).
                    </p>
                    <p className="mb-4">
                        Aurora Tech's flagship product, the "Chromebook Pro-X," retails at <strong>€699</strong> with a baseline Bill of Materials (BOM) cost of <strong>€450</strong>, generating an ideal profit margin of ~8% (€55.90 per unit).
                    </p>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">1.2 The Business Challenge: Dual Vulnerability</h3>
                    <p className="mb-4">
                        The core profitability of Aurora Tech is under constant threat from two colliding external factors:
                    </p>
                    <ul className="list-disc pl-8 mb-6 space-y-2">
                        <li><strong>Foreign Exchange (FX) Volatility:</strong> Aurora Tech purchases components using US Dollars (USD) and New Taiwan Dollars (TWD), but generates revenue in Euros (EUR). A mere 5% depreciation of the Euro drastically inflates the relative cost of component procurement.</li>
                        <li><strong>Maritime Logistics Delays:</strong> Disruptions in global shipping lanes (e.g., Suez Canal blockages, port congestions) force vessels to reroute. A 12-day shipping delay disrupts the 'Just-In-Time' manufacturing schedule.</li>
                    </ul>
                    <p className="mb-6 p-6 bg-slate-50 border-l-4 border-rose-500 text-slate-700 italic">
                        Compound Risk Impact: When a 5% EUR depreciation overlaps with a 12-day shipping delay, the cumulative financial impact reduces Aurora Tech's profit margin from a healthy 8% down to a critical 1.9%, posing a severe viability threat.
                    </p>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">1.3 Data Sources & Strategic Goal</h3>
                    <p className="mb-4">
                        <strong>Project Atomic-Link</strong> is initiated as an AI-driven predictive supply chain solution. Its primary goal is to merge financial API feeds with maritime logistics data, calculating real-time margin vulnerability.
                    </p>
                    <ul className="list-disc pl-8 mb-6 space-y-2">
                        <li><strong>Financial Data:</strong> Sourced in real-time via the <em>Frankfurter API</em> (ECB reference rates).</li>
                        <li><strong>Logistics Data:</strong> Simulated port schedules, vessel tracking codes, and alternative air-freight costs (Air France Cargo simulator).</li>
                    </ul>
                </div>

                {/* --- CHAPTER 2 --- */}
                <div className="print:break-before-page">
                    <h2 className="text-3xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-3 border-b-2 border-indigo-100 pb-2">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-xl">2.0</span> Governance Policy & Architecture
                    </h2>
                    
                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">2.1 The Data Governance Council (DGC)</h3>
                    <p className="mb-4">
                        To break down data silos between the Finance Division and the Global Supply Chain Division, Aurora Tech has established a central <strong>Data Governance Council (DGC)</strong>. The DGC serves as the supreme decision-making body for data architecture, privacy standards, and AI alignment.
                    </p>
                    <p className="mb-6 font-semibold">The defining mandate of the DGC is maintaining a "Single Source of Truth" (SSOT) across the enterprise.</p>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">2.2 Stakeholder RACI Matrix</h3>
                    <p className="mb-6">Accountability is formalized using a strict RACI (Responsible, Accountable, Consulted, Informed) matrix.</p>
                    
                    <div className="overflow-x-auto mb-8 font-sans">
                        <table className="w-full text-left border-collapse border border-slate-300">
                            <thead>
                                <tr className="bg-slate-100 uppercase text-xs tracking-wider text-slate-600">
                                    <th className="p-3 border border-slate-300">Data Domain</th>
                                    <th className="p-3 border border-slate-300 text-center font-bold text-slate-900">Accountable (A)</th>
                                    <th className="p-3 border border-slate-300 text-center text-slate-800">Responsible (R)</th>
                                    <th className="p-3 border border-slate-300 text-center text-slate-600">Consulted (C)</th>
                                    <th className="p-3 border border-slate-300 text-center text-slate-500">Informed (I)</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr>
                                    <td className="p-3 border border-slate-300 font-semibold bg-slate-50">FX Rates (API)</td>
                                    <td className="p-3 border border-slate-300 text-center">Chief Financial Officer (CFO)</td>
                                    <td className="p-3 border border-slate-300 text-center">Financial Controller</td>
                                    <td className="p-3 border border-slate-300 text-center">AI Data Engineers</td>
                                    <td className="p-3 border border-slate-300 text-center">Procurement Team</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-300 font-semibold bg-slate-50">Maritime Logistics</td>
                                    <td className="p-3 border border-slate-300 text-center">VP Supply Chain</td>
                                    <td className="p-3 border border-slate-300 text-center">Logistics Planner</td>
                                    <td className="p-3 border border-slate-300 text-center">MLOps Admins</td>
                                    <td className="p-3 border border-slate-300 text-center">Warehouse Managers</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-300 font-semibold bg-slate-50">AI Pipelines & Security</td>
                                    <td className="p-3 border border-slate-300 text-center">Chief Data Officer (CDO)</td>
                                    <td className="p-3 border border-slate-300 text-center">Lead Cloud Architect</td>
                                    <td className="p-3 border border-slate-300 text-center">Legal / DPO</td>
                                    <td className="p-3 border border-slate-300 text-center">Executive Board</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">2.3 Collaborative Policy Implementation</h3>
                    <p className="mb-4">
                        Policy implementation requires cross-functional collaboration. The CDO regularly hosts alignment workshops where Finance analysts and Supply Chain planners collaboratively map data ontologies. For example, agreeing that a "delay" is universally calculated from the "Estimated Time of Arrival (ETA)" field provided by the carrier, preventing conflicting definitions between departments.
                    </p>
                </div>

                {/* --- CHAPTER 3 --- */}
                <div className="print:break-before-page">
                    <h2 className="text-3xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-3 border-b-2 border-indigo-100 pb-2">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-xl">3.0</span> Data Quality & Service Level Agreements
                    </h2>
                    
                    <p className="mb-6">
                        An AI model running on flawed data creates amplified business damage. The DGC enforces strict Data Quality SLAs across four pillars:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 font-sans">
                        <div className="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><CheckCircle size={20} className="text-indigo-600"/> 1. Accuracy</h4>
                            <p className="text-sm text-slate-600">Financial data must be exact. Exchange rate imports must match the official European Central Bank (ECB) fixings to exactly four decimal places. Data failing variance tests is quarantined.</p>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><CheckCircle size={20} className="text-indigo-600"/> 2. Completeness</h4>
                            <p className="text-sm text-slate-600">No null values are permitted in critical path fields. Every logistics record must have a valid string for `vessel_id` and an integer for `freight_cost_eur`. Incomplete rows trigger Airflow alerts.</p>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><CheckCircle size={20} className="text-indigo-600"/> 3. Timeliness</h4>
                            <p className="text-sm text-slate-600">Daily ETL ingestion must complete by 00:30 UTC. If the Frankfurter API feed or simulator push is delayed beyond 02:00 UTC, a P1 incident is automatically created in Jira.</p>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><CheckCircle size={20} className="text-indigo-600"/> 4. Traceability</h4>
                            <p className="text-sm text-slate-600">Full lineage is enforced. Every record stored in the Star Schema has an appended metadata column containing the `Airflow_Run_ID` and the ingestion `Timestamp`.</p>
                        </div>
                    </div>
                </div>

                {/* --- CHAPTER 4 --- */}
                <div className="print:break-before-page">
                    <h2 className="text-3xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-3 border-b-2 border-indigo-100 pb-2">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-xl">4.0</span> Security & Risk Assessment
                    </h2>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">4.1 Structural Risk Assessment</h3>
                    
                    <div className="space-y-6 mb-8 font-sans">
                        <div className="flex gap-4 p-5 bg-orange-50 border border-orange-200 rounded-lg">
                            <AlertTriangle className="text-orange-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-orange-900">Risk 1: Financial API Unavailability (Systemic)</h4>
                                <p className="text-sm text-orange-800 mt-1"><strong>Threat:</strong> The external Frankfurter API goes offline, starving the AI model of real-time currency rates.</p>
                                <p className="text-sm text-orange-900 mt-2"><strong>Mitigation:</strong> Automated Failover Protocol. If request timeouts exceed 3 attempts, the system automatically defaults back to the 7-day historical moving average of the EUR/USD pair, keeping business operations alive while alerting the engineering team.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-5 bg-rose-50 border border-rose-200 rounded-lg">
                            <AlertTriangle className="text-rose-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-rose-900">Risk 2: Unauthorized Logistics Modification (Security)</h4>
                                <p className="text-sm text-rose-800 mt-1"><strong>Threat:</strong> Financial analysts accidentally rewrite shipping schedules, or external bad actors overwrite logistics ETAs to manipulate AI cargo routing.</p>
                                <p className="text-sm text-rose-900 mt-2"><strong>Mitigation:</strong> Implementation of mathematical Role-Based Access Control (RBAC) at the database level. Finance roles only possess `SELECT` rights, Logistics possesses `UPDATE` on specific domains, and Admin requires 2FA.</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">4.2 Access Control Matrix (RBAC)</h3>
                    <p className="mb-6">Aurora Tech enforces a Zero-Trust internal network policy.</p>
                    <ul className="list-disc pl-8 mb-8 space-y-2 font-sans bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <li><strong className="text-slate-800">Role_Aurora Tech_Finance:</strong> Read-only access to margin dashboards and FX dimensions.</li>
                        <li><strong className="text-slate-800">Role_Aurora Tech_Logistics:</strong> Read-write to carrier modes and port schedules; blind to FX rates.</li>
                        <li><strong className="text-slate-800">Role_AI_Architect_Admin:</strong> Full CRUD rights, strictly managed behind VPN and hardware token authorization.</li>
                    </ul>

                </div>

                {/* --- CHAPTER 5 --- */}
                <div className="print:break-before-page">
                    <h2 className="text-3xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-3 border-b-2 border-indigo-100 pb-2">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-xl">5.0</span> GDPR Compliance & Auditing
                    </h2>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">5.1 GDPR & Data Privacy</h3>
                    <p className="mb-4">
                        While the project primarily handles B2B financial metrics, logistics manifests often contain the names, phone numbers, and passport IDs of vessel captains and truck drivers. Under the European General Data Protection Regulation (GDPR), this constitutes Personal Identifiable Information (PII).
                    </p>
                    <ul className="list-disc pl-8 mb-6 space-y-2">
                        <li><strong>Data Minimization:</strong> The pipeline strips excessive behavioral data before it enters the principal data warehouse.</li>
                        <li><strong>Encryption:</strong> All PII within PostgreSQL or cloud buckets is encrypted at rest using industry-standard AES-256 protocols.</li>
                        <li><strong>Right to be Forgotten:</strong> An automated routine sweeps and anonymizes external driver data upon verified legal requests.</li>
                    </ul>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">5.2 Data Lifecycle & Retention Strategy</h3>
                    <div className="pl-6 border-l-4 border-indigo-300 font-sans mt-6 space-y-6">
                        <div>
                            <strong className="text-lg text-slate-800 block">1. Hot Storage (0-12 Months)</strong>
                            <p className="text-slate-600">Actively queried in PostgreSQL/BigQuery by dashboards and AI predictive models.</p>
                        </div>
                        <div>
                            <strong className="text-lg text-slate-800 block">2. Cold Archiving (1-5 Years)</strong>
                            <p className="text-slate-600">Moved to AWS Glacier or Google Cloud Storage Coldline to fulfill legal financial audit requirements.</p>
                        </div>
                        <div>
                            <strong className="text-lg text-slate-800 block">3. Secure Purging (Year 6)</strong>
                            <p className="text-slate-600">Permanent destruction of keys, rendering data mathematically unrecoverable.</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-10 mb-4">5.3 Regulatory Compliance Audits</h3>
                    <p className="mb-6">
                        To guarantee sustained adherence, the Chief Data Officer oversees two distinct audit vectors:
                    </p>
                    <ul className="list-disc pl-8 mb-6 space-y-2">
                        <li><strong>Internal Bi-Annual Audits:</strong> Data Engineers run automated scripts to test if PII remains visible in cleartext in the logs, and verify that the Airflow tracking lineage is unbroken.</li>
                        <li><strong>External Third-Party Audits:</strong> Annually, an external certified firm (e.g., Big 4 consulting) tests the Role-Based Access controls to ensure Finance cannot accidentally breach Logistics silos, providing a certificate of compliance for EU regulators.</li>
                    </ul>
                </div>

                {/* --- CHAPTER 6 --- */}
                <div className="print:break-before-page">
                    <h2 className="text-3xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-3 border-b-2 border-indigo-100 pb-2">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-xl">6.0</span> Training & Stakeholder Awareness
                    </h2>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">6.1 Change Management Principles</h3>
                    <p className="mb-4">
                        A policy is only robust if the workforce adopts it. Aurora Tech mandates a widespread Continuous Data Culture program to raise awareness among all stakeholders. The goal is to move the company from "Data as a strictly IT problem" to "Data as shared corporate capital."
                    </p>

                    <h3 className="text-xl font-bold font-sans text-slate-800 mt-8 mb-4">6.2 Execution of the Training Plan</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
                            <div className="flex items-center gap-3 text-indigo-700 mb-3 font-bold">
                                <Users /> Target: Executive Leadership
                            </div>
                            <p className="text-sm text-slate-700"><strong>Format:</strong> Quarterly Strategic Briefings</p>
                            <p className="text-sm text-slate-700 mt-2"><strong>Curriculum:</strong> Focus on AI predictive impact, ROI of clean data pipelines, and high-level regulatory exposure (GDPR fines, systemic risks).</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
                            <div className="flex items-center gap-3 text-emerald-700 mb-3 font-bold">
                                <Target /> Target: Supply/Finance Analysts
                            </div>
                            <p className="text-sm text-slate-700"><strong>Format:</strong> Monthly Workshops & "Data Dojos"</p>
                            <p className="text-sm text-slate-700 mt-2"><strong>Curriculum:</strong> Hands-on training with the Atomic-Link dashboard, understanding the limitations of the "Garbage In, Garbage Out" (GIGO) AI trap, and proper data input formatting.</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg md:col-span-2">
                            <div className="flex items-center gap-3 text-purple-700 mb-3 font-bold">
                                <BookOpen /> Organization-Wide Initiatives
                            </div>
                            <p className="text-sm text-slate-700"><strong>E-Learning & Onboarding:</strong> Every new corporate hire must complete a mandatory 2-hour "Data Security & Ethics" e-learning module. Failing the final assessment revokes VPN and database access privileges.</p>
                            <p className="text-sm text-slate-700 mt-2"><strong>Phishing & Simulation Drills:</strong> Randomly dispatched simulated social-engineering attacks to ensure employees do not compromise backend pipeline credentials.</p>
                        </div>
                    </div>
                </div>

                <div className="text-center italic text-slate-500 font-sans pt-12 border-t mt-12 print:mt-16 text-sm">
                    -- End of Official Written Deliverable - Aurora Tech Board Council --
                </div>
            </div>
        </div>
    );
}
