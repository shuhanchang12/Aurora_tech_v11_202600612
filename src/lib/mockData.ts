// Mock data for the diverse file repositories and documents requested

export const BLOC1_DOCUMENT = `AURORATECH - DATA GOVERNANCE POLICY
Author: Master Student (JHEDA)
Date: June 2026

1. EXECUTIVE SUMMARY
This data governance plan outlines the strategic framework for AuroraTech, ensuring data quality, privacy compliance (GDPR), and robust security across the enterprise data ecosystem.

2. STAKEHOLDERS & ROLES
- Data Sponsor: Chief Data Officer (CDO)
- Data Stewards: Department leads (Marketing, Finance, HR)
- Data Custodians: IT and Data Engineering teams
- Data Users: Data Scientists, Analysts, Business Users

3. GDPR COMPLIANCE STRATEGY
AuroraTech processes PII (Personally Identifiable Information). To maintain compliance:
- Data Mapping: Complete registry of all PII processing activities.
- Consent Management: Granular opt-in tracking for marketing analytics.
- Right to Erasure: Automated workflows to anonymize user data within 30 days of request.

4. DATA QUALITY METRICS
- Accuracy: 99.5% threshold for critical financial records.
- Completeness: Null-value tracking on primary key constraints.
- Timeliness: Real-time pipelines MUST sync within 5 minutes.

5. SECURITY MEASURES
- Role-Based Access Control (RBAC) enforced at the database level.
- At-rest encryption using AES-256 for data lakes.
- Monthly regulatory compliance audits.

...(Document spans 8-10 pages containing precise audit logs, matrices and risk assessments)...`;

export const BLOC2_REPO = [
  {
    name: 'README.md',
    language: 'markdown',
    content: `# AuroraTech Infrastructure
Full IaC documentation for Bloc 2 Data Architecture.

## Architecture Decisions
- Provider: AWS / GCP
- Orchestration: Kubernetes
- Containers: Docker
- Provisioning: Terraform

## Deployment
\`\`\`bash
cd terraform
terraform init
terraform apply -auto-approve
\`\`\`
`
  },
  {
    name: 'docker/docker-compose.yml',
    language: 'yaml',
    content: `version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: auroratech
      POSTGRES_PASSWORD: \${DB_PASS}
      POSTGRES_DB: analytics
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"

volumes:
  pgdata:
`
  },
  {
    name: 'terraform/main.tf',
    language: 'hcl',
    content: `provider "aws" {
  region = var.region
}

resource "aws_db_instance" "aurora" {
  identifier        = "auroratech-db"
  instance_class    = "db.r5.large"
  engine            = "postgres"
  engine_version    = "14.1"
  allocated_storage = 100
  
  username = var.db_user
  password = var.db_pass

  vpc_security_group_ids = [aws_security_group.db_sg.id]
}
`
  }
];

export const BLOC3_REPO = [
  {
    name: 'README.md',
    language: 'markdown',
    content: `# Real-Time Data Pipelines
ELT/ETL flows for real-time ingest using Airflow and dbt.

## Data Flow
Raw Data (Kafka) -> Snowflake (Staging) -> dbt (Transformation) -> Analytics Dashboards.

## Features
- Real-time stream monitoring.
- Quality control via Great Expectations.
- Error handling with dead-letter queues.
`
  },
  {
    name: 'dags/auroratech_pipeline.py',
    language: 'python',
    content: `from airflow import DAG
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
from airflow.utils.dates import days_ago
from datetime import timedelta

default_args = {
    'owner': 'data_engineering',
    'depends_on_past': False,
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'auroratech_realtime_elt',
    default_args=default_args,
    description='Main ELT pipeline for real-time analytics',
    schedule_interval='@hourly',
    start_date=days_ago(1),
    catchup=False,
) as dag:

    transform_data = SnowflakeOperator(
        task_id='run_dbt_models',
        sql='CALL dbt_cloud_run(job_id=12345);',
        snowflake_conn_id='snowflake_default',
    )
    
    # DAG execution path
    transform_data
`
  }
];

export const BLOC4_REPO = [
  {
    name: 'README.md',
    language: 'markdown',
    content: `# AI Solutions MLOps implementation
End-to-end industrialization of AuroraTech AI prediction model.

## Features
- CI/CD with GitHub Actions
- FastAPI serving API
- Automated retraining triggers
- Drift monitoring with Evidently.ai
`
  },
  {
    name: 'src/app.py',
    language: 'python',
    content: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="AuroraTech ML Serving API")

# Load model
model = joblib.load("models/xgboost_v1.pkl")

class PredictionRequest(BaseModel):
    feature_1: float
    feature_2: float
    feature_3: str

@app.post("/predict")
def predict(req: PredictionRequest):
    try:
        data = pd.DataFrame([req.dict()])
        prediction = model.predict(data)
        return {"prediction": float(prediction[0]), "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
`
  },
  {
    name: '.github/workflows/mlops-ci.yml',
    language: 'yaml',
    content: `name: MLOps CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  train-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
        
    - name: Install dependencies
      run: pip install -r requirements.txt
      
    - name: Run Tests & Quality Checks
      run: pytest tests/
      
    - name: Retrain Model
      run: python src/train_model.py
      
    - name: Build Docker Image
      run: docker build -t auroratech_api:latest .
`
  }
];
