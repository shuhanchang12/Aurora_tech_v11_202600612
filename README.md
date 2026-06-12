# 🌐 Aurora Tech Chromebook & GPU AI Supply Chain Platform (Project: Atomic-Link)

> **🎓 RNCP 38777 AI Architect Master Defense Portfolio & Code Repository**
>
> This portfolio represents the complete, production-grade technical implementation and defense materials for Project: Atomic-Link, deployed at the fictional multinational hardware OEM, Aurora Tech Computing Group.

---

## 🛠️ Enterprise Tech Stack
- **Data Governance (Bloc 1):** SSOT, RBAC, GDPR Compliance Auditing.
- **Infrastructure (Bloc 2):** Docker, Terraform, PostgreSQL (Star Schema).
- **Data Pipelines (Bloc 3):** Apache Airflow, dbt, Python, Frankfurter API.
- **AI & MLOps (Bloc 4):** Scikit-Learn (Random Forest), FastAPI, GitHub Actions (CI/CD).
- **Frontend & ERP Integration:** Streamlit, Simulated Banking Gateway Hooks.

---

## 🎯 Executive Summary & Business Context

In the high-stakes hardware manufacturing sector, **Aurora Tech** faces critical profit margin compression on its flagship Chromebooks and AI Workstation (NVIDIA GPU) product lines. This volatility is driven by two intersecting forces:
1. **Macroeconomic Currency Exposure:** Extreme fluctuations between EUR, USD, and TWD.
2. **Supply Chain Disruptions:** Global shipping delays bottlenecking critical silicon and components.

**Project: Atomic-Link** is an end-to-end AI platform designed to unify real-time FX tracking with physical logistics data. The system predicts gross margin degradation before it happens and prescribes automated, actionable mitigation strategies.

---

## 🚀 Core Business Use Cases & Strategies

### 1. Ocean-to-Air Logistics Conversion
When critical components (e.g., NVIDIA H100 GPUs) are delayed at sea beyond a 10-day threshold, the AI engine simulates and recommends expediting cargo via Air France Cargo to Paris CDG. 
* **Impact:** Cuts transit delay from 12 days to 2 days.
* **Trade-off:** Increases freight costs from a standard €5 to €45 per unit. The system dynamically calculates if preventing the delay outweighs the sudden spike in logistics OPEX.

### 2. Automated ERP Hedging & Vendor Settlement
As a highly forward-looking strategic scaling path, the platform introduces an automated ERP settlement framework.
* **Trigger:** When the ML model predicts an imminent margin degradation of over 80%.
* **Action:** Programmatically triggers an ERP purchase order.
* **Mechanism:** Converts Euro treasury assets to USD and locks the settlement rate with Asian suppliers instantly via automated bank APIs.
* **Value:** Bypasses traditional manual payment latencies (3-5 business days) and mitigates severe intra-week foreign exchange fluctuations.

---

## 🏗️ System Architecture & Repository Structure (The 4 Blocs)

The project is structured around the 4 core competencies of the French AI Architect certification (RNCP 38777):

### 📂 `/bloc1_governance` (Data Governance)
Ensures data integrity, regulatory compliance (GDPR), and security across the supply chain data lifecycle.
* **Artifacts:** Data Governance Policy, Data Dictionary (RACI), Quality SLA definitions.
* **Focus:** PII obfuscation, access controls, and validation rules for inbound FX/Logistics data.

### 📂 `/bloc2_architecture` (IT Architecture & Infrastructure)
The foundational IT infrastructure designed for scalability and global resilience.
* **Artifacts:** PostgreSQL Star Schema (Fact/Dim tables), Docker definitions (`docker-compose`), Terraform IaC.
* **Focus:** Building a robust Data Warehouse to centralize isolated logistics and finance data silos.

### 📂 `/bloc3_pipelines` (Data Engineering & ETL)
Automated data ingestion from disparate architectural endpoints.
* **Artifacts:** Apache Airflow DAGs (`auroratech_pipeline.py`).
* **Focus:** Extracting live FX via REST APIs, pulling freight forwarder data via SFTP, and transforming it for the ML models.

### 📂 `/bloc4_ai_solutions` (Machine Learning & MLOps)
The predictive engine and operationalized AI services.
* **Artifacts:** `RandomForestClassifier` training scripts, FastAPI real-time inference server (`/predict`), Streamlit Executive Dashboard.
* **Focus:** Serving real-time margin risk predictions via API and monitoring deployed model metrics (MLOps).

---

## ⚙️ Quick Start & Installation

To boot up the core pipeline and interface locally:

```bash
# 1. Clone the repository
git clone https://github.com/shuhanchang12/Aurora_tech_v4.git
cd Aurora_tech_v4

# 2. Boot up the infrastructure (PostgreSQL, FastAPI, Dashboard)
cd bloc2_architecture
docker-compose up -d --build

# 3. Access the interfaces
# • FastAPI Swagger UI: http://localhost:8000/docs
# • Executive Dashboard: http://localhost:8501
```
