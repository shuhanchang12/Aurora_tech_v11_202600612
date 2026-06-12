import PptxGenJS from "pptxgenjs";

async function generateAll() {
    console.log("Generating PPTX presentations...");

    // --- Bloc 1 ---
    const p1 = new PptxGenJS();
    p1.layout = 'LAYOUT_16x9';
    let s1_1 = p1.addSlide();
    s1_1.addText("Aurora Tech: Data Governance Policy", { x: 0, y: 2, w: "100%", h: 1, fontSize: 36, bold: true, color: "0f172a", align: "center" });
    s1_1.addText(" Executive Presentation\n Bloc 1 - Data Governance", { x: 0, y: 3, w: "100%", h: 1, fontSize: 24, color: "4f46e5", align: "center" });
    
    let s1_2 = p1.addSlide();
    s1_2.addText("1. Context & Objectives", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s1_2.addText([
        { text: "Financial margin predictions require absolute data accuracy.", options: { bullet: true } },
        { text: "Regulatory Compliance (GDPR/CCPA) for vendor contracts.", options: { bullet: true } },
        { text: "Internal security: Mitigate risks of unauthorized access.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s1_3 = p1.addSlide();
    s1_3.addText("2. Security & RBAC", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s1_3.addText([
        { text: "Admin Role: Full pipeline access, configuration.", options: { bullet: true } },
        { text: "Data Science Role: Read-only access to anonymized Data Warehouse facts.", options: { bullet: true } },
        { text: "Executive Role: Access restricted to aggregated Dashboard Metrics.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });
    await p1.writeFile({ fileName: "./bloc1_governance/Executive_Presentation.pptx" });

    // --- Bloc 2 ---
    const p2 = new PptxGenJS();
    p2.layout = 'LAYOUT_16x9';
    let s2_1 = p2.addSlide();
    s2_1.addText("Aurora Tech: Data Architecture", { x: 0, y: 2, w: "100%", h: 1, fontSize: 36, bold: true, color: "0f172a", align: "center" });
    s2_1.addText(" Infrastructure Plan\n Bloc 2 - Architecture", { x: 0, y: 3, w: "100%", h: 1, fontSize: 24, color: "eab308", align: "center" });
    
    let s2_2 = p2.addSlide();
    s2_2.addText("1. Needs & Constraints", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s2_2.addText([
        { text: "Reproducibility via IaC: Docker & Docker Compose.", options: { bullet: true } },
        { text: "Relational Needs: SQL required for the Star Schema.", options: { bullet: true } },
        { text: "Cost-efficiency: PostgreSQL 15 and Grafana tools.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s2_3 = p2.addSlide();
    s2_3.addText("2. Star Schema Model", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s2_3.addText([
        { text: "Center: fact_chromebook_margin_risk.", options: { bullet: true } },
        { text: "Dimensions: dim_date, dim_chromebook_vendor.", options: { bullet: true } },
        { text: "Optimized for fast aggregation queries required by the AI solution.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });
    await p2.writeFile({ fileName: "./bloc2_architecture/Infrastructure_Plan.pptx" });

    // --- Bloc 3 ---
    const p3 = new PptxGenJS();
    p3.layout = 'LAYOUT_16x9';
    let s3_1 = p3.addSlide();
    s3_1.addText("Aurora Tech: Real-time Pipelines", { x: 0, y: 2, w: "100%", h: 1, fontSize: 36, bold: true, color: "0f172a", align: "center" });
    s3_1.addText(" ETL Pipeline Architecture\n Bloc 3 - Real-time Pipelines", { x: 0, y: 3, w: "100%", h: 1, fontSize: 24, color: "e11d48", align: "center" });
    
    let s3_2 = p3.addSlide();
    s3_2.addText("1. Airflow Orchestration", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s3_2.addText([
        { text: "Directed Acyclic Graph executes nightly at UTC midnight.", options: { bullet: true } },
        { text: "Task dependencies ensure Extraction concludes before Transformation.", options: { bullet: true } },
        { text: "PythonOperator handles APIs and business logic natively.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s3_3 = p3.addSlide();
    s3_3.addText("2. Transformation Logic", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s3_3.addText([
        { text: "Ocean-to-Air Logic: Re-route to Air Freight if sea delay >= 12.", options: { bullet: true } },
        { text: "Error Handling: 7-day moving average fallback on API failure.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });
    await p3.writeFile({ fileName: "./bloc3_pipelines/Pipeline_Plan.pptx" });

    // --- Bloc 4 ---
    const p4 = new PptxGenJS();
    p4.layout = 'LAYOUT_16x9';
    let s4_1 = p4.addSlide();
    s4_1.addText("Aurora Tech: AI Solutions", { x: 0, y: 2, w: "100%", h: 1, fontSize: 36, bold: true, color: "0f172a", align: "center" });
    s4_1.addText(" End-to-End MLOps Defense Presentation\n Bloc 4 - AI Solutions", { x: 0, y: 3, w: "100%", h: 1, fontSize: 24, color: "10b981", align: "center" });
    
    let s4_2 = p4.addSlide();
    s4_2.addText("1. Problem Statement", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_2.addText([
        { text: "Supply chain disruptions threaten operating margins.", options: { bullet: true } },
        { text: "Business Goal: Predict freight cost escalations and margin impacts dynamically.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_3 = p4.addSlide();
    s4_3.addText("2. Business Specifications", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_3.addText([
        { text: "Requirement 1: Real-time API serving inferences.", options: { bullet: true } },
        { text: "Requirement 2: Data Drift monitoring.", options: { bullet: true } },
        { text: "Requirement 3: Continuous Integration (CI).", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_4 = p4.addSlide();
    s4_4.addText("3. Feature Engineering", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_4.addText([
        { text: "Financial Data: EUR/USD, EUR/TWD exchange pairs.", options: { bullet: true } },
        { text: "Logistics Data: Component delay days.", options: { bullet: true } },
        { text: "Cost Data: Estimated ocean freight cost base.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_5 = p4.addSlide();
    s4_5.addText("4. Algorithm Selection", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_5.addText([
        { text: "Model: Random Forest Classifier.", options: { bullet: true } },
        { text: "Why? Robust to non-linear dependencies (FX vs Timelines).", options: { bullet: true } },
        { text: "Why? Provides feature importance for interpretability.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_6 = p4.addSlide();
    s4_6.addText("5. Exploratory Data Analysis (EDA)", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_6.addText([
        { text: "Jupyter Notebooks used for class balance checks.", options: { bullet: true } },
        { text: "Target distribution shows 30% risk label instances.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_7 = p4.addSlide();
    s4_7.addText("6. Model Evaluation Strategy", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_7.addText([
        { text: "Metric: F1 Score prioritized over Accuracy.", options: { bullet: true } },
        { text: "Reason: False Negatives (missing a margin hit) are highly expensive.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_8 = p4.addSlide();
    s4_8.addText("7. Model Serialization", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_8.addText([
        { text: "Library: joblib to pickle the Scikit-Learn artifact.", options: { bullet: true } },
        { text: "Artifact Name: auroratech_chromebook_model.pkl", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_9 = p4.addSlide();
    s4_9.addText("8. Architecture: API Development", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_9.addText([
        { text: "Framework: FastAPI (for async robustness and validation).", options: { bullet: true } },
        { text: "Endpoint: /predict-margin-risk.", options: { bullet: true } },
        { text: "Validation via Pydantic payload models.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_10 = p4.addSlide();
    s4_10.addText("9. Containerization", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_10.addText([
        { text: "Dockerization using python:3.10-slim.", options: { bullet: true } },
        { text: "Encapsulates execution environment entirely to prevent dev-prod skew.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_11 = p4.addSlide();
    s4_11.addText("10. CI / CD Pipeline", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_11.addText([
        { text: "GitHub Actions (.github/workflows/mlops-ci.yml).", options: { bullet: true } },
        { text: "Fires on branch push.", options: { bullet: true } },
        { text: "Runs PyTest to ensure Inference API compatibility.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_12 = p4.addSlide();
    s4_12.addText("11. Kubernetes Orchestration", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_12.addText([
        { text: "Deployment YAML specifies 2 Replicas for failover.", options: { bullet: true } },
        { text: "Integrated Liveness Probe over /health.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_13 = p4.addSlide();
    s4_13.addText("12. Production Monitoring & Drift", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_13.addText([
        { text: "Script: monitoring/monitor.py.", options: { bullet: true } },
        { text: "Measures Euclidean distance / KS test vs baseline distributions.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_14 = p4.addSlide();
    s4_14.addText("13. Automated Retraining", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_14.addText([
        { text: "When P-value falls below 0.05, monitor script fires run_retrain.py.", options: { bullet: true } },
        { text: "Model automatically fits on updated PostgreSQL tuples.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_15 = p4.addSlide();
    s4_15.addText("14. Production Cutover Workflow", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_15.addText([
        { text: "After retrain success, QA (PyTest) must pass before swapping endpoints.", options: { bullet: true } },
        { text: "Maintains stability under automatic retraining environments.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    let s4_16 = p4.addSlide();
    s4_16.addText("Conclusion", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "0f172a" });
    s4_16.addText([
        { text: "The solution bridges physical data warehousing with living AI inferences.", options: { bullet: true } },
        { text: "Fully automated, robust CI/CD, and concept-drift resistant.", options: { bullet: true } }
    ], { x: 0.5, y: 2, w: 9, h: 3, fontSize: 20, color: "334155" });

    await p4.writeFile({ fileName: "./bloc4_ai_solutions/AI_Solution_Presentation.pptx" });
    
    console.log("All presentations generated successfully.");
}

generateAll().catch(err => console.error(err));
