import React, { useState } from 'react';
import { GitBranch as Github, Folder, FileCode2, BookOpen, ChevronRight, FileText, Download } from 'lucide-react';

export default function Bloc3GithubRepo() {
    const [selectedFile, setSelectedFile] = useState<string | null>('README.md');

    const files = [
        { name: 'dags', type: 'folder', children: ['auroratech_pipeline.py'] },
        { name: 'sql', type: 'folder', children: ['create_tables.sql'] },
        { name: 'python', type: 'folder', children: ['api_client.py'] },
        { name: 'tests', type: 'folder', children: ['test_pipeline.py'] },
        { name: 'Demo_Video.txt', type: 'file' },
        { name: 'Pipeline_Plan.html', type: 'file' },
        { name: 'Pipeline_Plan.pptx', type: 'file' },
        { name: 'README.md', type: 'file' },
    ];

    const fileContent: Record<string, {lang: string, code: string}> = {
        'Demo_Video.txt': {
            lang: 'plaintext',
            code: 'https://loom.com/share/...'
        },
        'Pipeline_Plan.html': {
            lang: 'html',
            code: '<!-- HTML Presentation View -->'
        },
        'Pipeline_Plan.pptx': {
            lang: 'plaintext',
            code: '[Binary Data - PowerPoint Presentation]'
        },
        'auroratech_pipeline.py': {
            lang: 'python',
            code: `from datetime import datetime, timedelta
import random
import requests
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.postgres.hooks.postgres import PostgresHook

default_args = {
    'owner': 'Data_Engineering_Team',
    'depends_on_past': False,
    'start_date': datetime(2026, 6, 1),
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}

def extract_transform_load_chromebook():
    """
    Main Data Task:
    1. Download: Get live exchange rates from Frankfurter API + Simulate shipping delays.
    2. Process: Switch from Ocean to Air Cargo if Sea Delay is 12 days or more.
    3. Save: Save the final data into the PostgreSQL database.
    """
    # ---- 1. DOWNLOAD: Live Exchange Rates (EUR/USD, EUR/TWD) ----
    fx_url = "https://api.frankfurter.dev/v1/latest?base=EUR"
    try:
        response = requests.get(fx_url, timeout=10)
        response.raise_for_status()
        fx_data = response.json()
        eur_to_usd = fx_data['rates']['USD']
        eur_to_twd = fx_data['rates']['TWD']
    except Exception as e:
        print(f"[WARNING] Download failed. Using backup average rates: {e}")
        eur_to_usd, eur_to_twd = 1.0820, 35.150

    # ---- 2. PROCESS: Simulate Delays & Test Ocean-to-Air Switch ----
    vendors = ['VND-NV-01', 'VND-TSMC-02', 'VND-AUO-03']
    target_date = datetime.now().date()
    records = []

    for v_id in vendors:
        # Simulate normal sea shipping delay
        delay = random.choices([0, 1, 3, 12], weights=[0.5, 0.3, 0.1, 0.1])[0]
        transport_mode = 'Sea Freight'
        freight_cost_eur = 5.00 # Base sea shipping cost

        # Backup Plan: Fly high-value NVIDIA GPUs if sea delay is very bad (>= 12 days)
        if v_id == 'VND-NV-01' and delay >= 12:
            transport_mode = 'Air France Cargo'
            delay = 2 # Flying reduces delay to 2 days
            freight_cost_eur = 45.00 # Higher air shipping cost

        # Profit Risk Rules: We lose money if shipping cost jumps to €45 OR if Euro drops (< 1.05)
        margin_drop_label = 1 if (freight_cost_eur >= 45.00 or eur_to_usd < 1.05) else 0
        
        records.append((target_date, v_id, eur_to_usd, eur_to_twd, delay, transport_mode, freight_cost_eur, margin_drop_label))

    # ---- 3. SAVE: Save into PostgreSQL Database ----
    pg_hook = PostgresHook(postgres_conn_id='auroratech_postgres_conn')
    
    # Save Dates
    pg_hook.run("""
        INSERT INTO dim_date (date_key, year, month, day, quarter)
        VALUES (%s, %s, %s, %s, %s) ON CONFLICT (date_key) DO NOTHING;
    """, parameters=(target_date, target_date.year, target_date.month, target_date.day, (target_date.month-1)//3+1))

    # Save Main Records
    for r in records:
        pg_hook.run("""
            INSERT INTO fact_chromebook_margin_risk 
            (date_key, vendor_id, eur_to_usd, eur_to_twd, component_delay_days, transport_mode, freight_cost_eur, margin_drop_label)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
        """, parameters=r)
        print(f"[SUCCESS] Vendor={r[1]} | Mode={r[5]} | Cost={r[6]} EUR | Delay={r[4]} Days")

with DAG(
    'auroratech_chromebook_supply_chain_pipeline',
    default_args=default_args,
    description='Aurora Tech Chromebook Supply Chain Data Pipeline',
    schedule_interval='@daily',
    catchup=False,
) as dag:

    run_pipeline = PythonOperator(
        task_id='execute_chromebook_etl_task',
        python_callable=extract_transform_load_chromebook,
    )
`
        },
        'create_tables.sql': {
            lang: 'sql',
            code: `-- Dimension Table: Date
CREATE TABLE IF NOT EXISTS dim_date (
    date_key DATE PRIMARY KEY,
    year INT NOT NULL,
    month INT NOT NULL,
    day INT NOT NULL,
    quarter INT NOT NULL
);

-- Fact Table: Margin Risk
CREATE TABLE IF NOT EXISTS fact_chromebook_margin_risk (
    fact_id SERIAL PRIMARY KEY,
    date_key DATE REFERENCES dim_date(date_key),
    vendor_id VARCHAR(50) NOT NULL,
    eur_to_usd NUMERIC(10, 4) NOT NULL,
    eur_to_twd NUMERIC(10, 4) NOT NULL,
    component_delay_days INT NOT NULL,
    transport_mode VARCHAR(50) NOT NULL,
    freight_cost_eur NUMERIC(10, 2) NOT NULL,
    margin_drop_label INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
        },
        'api_client.py': {
            lang: 'python',
            code: `import requests
import logging

class FrankfurterAPIClient:
    def __init__(self, base_currency="EUR"):
        self.base = base_currency
        self.url = f"https://api.frankfurter.dev/v1/latest?base={self.base}"

    def fetch_rates(self):
        try:
            response = requests.get(self.url, timeout=10)
            response.raise_for_status()
            data = response.json()
            return data.get('rates', {})
        except requests.exceptions.RequestException as e:
            logging.error(f"API fetch failed: {e}")
            # Fallback values
            return {"USD": 1.0820, "TWD": 35.150}
`
        },
        'test_pipeline.py': {
            lang: 'python',
            code: `import unittest
from python.api_client import FrankfurterAPIClient

class TestPipelineExtraction(unittest.TestCase):
    def test_api_client_returns_valid_rates(self):
        client = FrankfurterAPIClient()
        rates = client.fetch_rates()
        self.assertIn("USD", rates)
        self.assertIn("TWD", rates)
        self.assertGreater(rates["USD"], 0)

if __name__ == '__main__':
    unittest.main()
`
        },
        'README.md': {
            lang: 'markdown',
            code: `# Aurora Tech - Real-Time Data Pipeline (Bloc 3)

This repository contains the Airflow pipelines and associated scripts to extract, transform, and load supply chain and financial data.

## Directory Structure
- \`/dags\`: Contains the main Airflow DAG definitions (\`auroratech_pipeline.py\`).
- \`/sql\`: DDL statements for the destination PostgreSQL tables.
- \`/python\`: Modularized Python code (e.g., API clients) for clean Airflow tasks.
- \`/tests\`: Unit tests for data quality and functional components.

## Pipeline Architecture
1. **Extraction**: Pulls real-time FX data (Frankfurter API) and generates simulated maritime telemetry.
2. **Transformation**: Evaluates routing rules. If a Sea Delay > 12 days is detected for critical vendors, it converts transport logic to 'Air France Cargo' and adjusts the \`freight_cost_eur\`.
3. **Loading**: Safely merges dimensions and fact records into the PostgreSQL Data Warehouse.
`
        }
    };

    const renderTree = (item: any, prefix = '') => {
        if (item.type === 'file') {
            return (
                <div 
                    key={item.name} 
                    className={`flex items-center gap-2 py-1.5 px-2 hover:bg-slate-100 cursor-pointer text-sm ${selectedFile === item.name ? 'bg-rose-50 text-rose-700 font-semibold' : 'text-slate-600'}`}
                    onClick={() => setSelectedFile(item.name)}
                >
                    <FileCode2 size={16} className={selectedFile === item.name ? 'text-rose-600' : 'text-slate-400'} />
                    <span>{item.name}</span>
                </div>
            )
        }
        return (
            <div key={item.name} className="py-1">
                <div className="flex items-center gap-2 py-1.5 px-2 text-sm text-slate-700 font-medium">
                    <ChevronRight size={16} className="text-slate-400" />
                    <Folder size={16} className="text-rose-500 fill-rose-500/20" />
                    <span>{item.name}</span>
                </div>
                <div className="pl-6 border-l border-slate-200 ml-3">
                    {item.children.map((child: string) => renderTree({name: child, type: 'file'}))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden shadow-sm font-sans flex flex-col h-[700px]">
            <div className="bg-[#f6f8fa] border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <Github size={24} className="text-gray-800" />
                    <span className="font-semibold text-gray-800 text-lg">auroratech / bloc3_pipelines</span>
                    <span className="bg-gray-100 text-gray-600 border border-gray-200 text-xs px-2 py-0.5 rounded-full ml-2 font-medium">Public</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-md flex items-center gap-2 text-gray-700 shadow-sm transition-colors cursor-default">
                        <Download size={14} /> Code
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden bg-white">
                <div className="w-64 border-r border-gray-200 bg-[#fbfbfb] overflow-y-auto px-2 py-3 flex-shrink-0">
                    <div className="text-xs font-bold text-gray-500 mb-3 px-2 uppercase tracking-widest">Repository Map</div>
                    {files.map(f => renderTree(f))}
                </div>

                <div className="flex-1 bg-white overflow-y-auto p-6 relative">
                    {selectedFile && fileContent[selectedFile] && (
                        <div className="border border-gray-200 rounded-lg overflow-hidden pb-4 bg-white shadow-sm">
                            <div className="bg-[#f6f8fa] border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                                {selectedFile === 'README.md' ? <BookOpen size={16} className="text-rose-500" /> : <FileText size={16} className="text-slate-500" />}
                                <span className="text-sm font-semibold text-gray-700">{selectedFile}</span>
                            </div>
                            <div className="px-5 pt-4 text-sm font-mono text-gray-800 overflow-x-auto">
                                <pre className="whitespace-pre-wrap leading-relaxed pb-4">
                                    {fileContent[selectedFile].code}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
