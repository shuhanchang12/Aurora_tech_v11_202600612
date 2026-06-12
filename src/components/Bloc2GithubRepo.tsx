import React, { useState } from 'react';
import { GitBranch as Github, Folder, FileCode2, BookOpen, ChevronRight, FileText, Download } from 'lucide-react';

export default function Bloc2GithubRepo() {
    const [selectedFile, setSelectedFile] = useState<string | null>('README.md');

    const files = [
        { name: 'terraform', type: 'folder', children: ['main.tf', 'variables.tf'] },
        { name: 'docker', type: 'folder', children: ['docker-compose.yml', 'init.sql'] },
        { name: 'scripts', type: 'folder', children: ['deploy.sh'] },
        { name: 'Demo_Video.txt', type: 'file' },
        { name: 'Infrastructure_Plan.html', type: 'file' },
        { name: 'Infrastructure_Plan.pptx', type: 'file' },
        { name: 'README.md', type: 'file' },
    ];

    const fileContent: Record<string, {lang: string, code: string}> = {
        'Demo_Video.txt': {
            lang: 'plaintext',
            code: 'https://loom.com/share/...'
        },
        'Infrastructure_Plan.html': {
            lang: 'html',
            code: '<!-- HTML Presentation View -->'
        },
        'Infrastructure_Plan.pptx': {
            lang: 'plaintext',
            code: '[Binary Data - PowerPoint Presentation]'
        },
        'docker-compose.yml': {
            lang: 'yaml',
            code: `version: '3.8'

services:
  postgres_db:
    image: postgres:15-alpine
    container_name: auroratech_postgres_dw
    environment:
      POSTGRES_USER: auroratech_admin
      POSTGRES_PASSWORD: TechMargin2026!
      POSTGRES_DB: auroratech_chromebook_dw
    ports:
      - "5432:5432"
    volumes:
      - postgres_tech_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_tech_data:`
        },
        'init.sql': {
            lang: 'sql',
            code: `-- Dimension Table: Date
CREATE TABLE IF NOT EXISTS dim_date (
    date_key DATE PRIMARY KEY,
    year INT NOT NULL,
    month INT NOT NULL,
    day INT NOT NULL,
    quarter INT NOT NULL
);

-- Dimension Table: Vendor
CREATE TABLE IF NOT EXISTS dim_chromebook_vendor (
    vendor_id VARCHAR(50) PRIMARY KEY,
    vendor_name VARCHAR(100) NOT NULL,
    component_type VARCHAR(50) NOT NULL,
    origin_country VARCHAR(50) NOT NULL
);

-- Fact Table: Margin Risk
CREATE TABLE IF NOT EXISTS fact_chromebook_margin_risk (
    fact_id SERIAL PRIMARY KEY,
    date_key DATE REFERENCES dim_date(date_key),
    vendor_id VARCHAR(50) REFERENCES dim_chromebook_vendor(vendor_id),
    eur_to_usd NUMERIC(10, 4) NOT NULL,
    eur_to_twd NUMERIC(10, 4) NOT NULL,
    component_delay_days INT NOT NULL,
    transport_mode VARCHAR(50) NOT NULL,
    freight_cost_eur NUMERIC(10, 2) NOT NULL,
    margin_drop_label INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
        },
        'main.tf': {
            lang: 'hcl',
            code: `provider "aws" {
  region = var.aws_region
}

resource "aws_db_instance" "auroratech_dw" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  db_name              = "auroratech_chromebook_dw"
  username             = var.db_user
  password             = var.db_password
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true
  publicly_accessible  = true
}`
        },
        'variables.tf': {
            lang: 'hcl',
            code: `variable "aws_region" {
  description = "The AWS region to deploy in"
  type        = string
  default     = "eu-west-3"
}

variable "db_user" {
  description = "Database admin username"
  type        = string
}

variable "db_password" {
  description = "Database admin password"
  type        = string
  sensitive   = true
}`
        },
        'deploy.sh': {
            lang: 'bash',
            code: `#!/bin/bash
echo "Starting deployment of Aurora Tech Data Warehouse..."
docker-compose up -d
echo "Waiting for PostgreSQL to be ready..."
sleep 5
echo "Deployment complete."`
        },
        'README.md': {
            lang: 'markdown',
            code: `# Aurora Tech - Data Architecture (Bloc 2)

This repository contains the Infrastructure as Code (IaC) required to deploy the Aurora Tech Data Warehouse.

## Architecture Highlights
- **Storage:** PostgreSQL 15 (Alpine) containerized for lightweight, reproducible deployment.
- **Model:** Star Schema strictly enforcing isolated dimensions (Vendors, Dates) against a central Margin Risk Fact Table.
- **Deploy:** Managed via Docker Compose and Terraform.

## Directory Structure
- \`/docker\`: Contains compose configurations and DDL initialization scripts.
- \`/terraform\`: AWS RDS infrastructure provisioning templates.
- \`/scripts\`: Utility scripts for CI/CD automation.

## Quick Start
Run the following script to deploy locally:
\`bash ./scripts/deploy.sh\`
`
        }
    };

    const renderTree = (item: any, prefix = '') => {
        if (item.type === 'file') {
            return (
                <div 
                    key={item.name} 
                    className={`flex items-center gap-2 py-1.5 px-2 hover:bg-slate-100 cursor-pointer text-sm ${selectedFile === item.name ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600'}`}
                    onClick={() => setSelectedFile(item.name)}
                >
                    <FileCode2 size={16} className={selectedFile === item.name ? 'text-indigo-600' : 'text-slate-400'} />
                    <span>{item.name}</span>
                </div>
            )
        }
        return (
            <div key={item.name} className="py-1">
                <div className="flex items-center gap-2 py-1.5 px-2 text-sm text-slate-700 font-medium">
                    <ChevronRight size={16} className="text-slate-400" />
                    <Folder size={16} className="text-blue-500 fill-blue-500/20" />
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
                    <span className="font-semibold text-gray-800 text-lg">auroratech / bloc2_architecture</span>
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
                                {selectedFile === 'README.md' ? <BookOpen size={16} className="text-blue-500" /> : <FileText size={16} className="text-slate-500" />}
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
