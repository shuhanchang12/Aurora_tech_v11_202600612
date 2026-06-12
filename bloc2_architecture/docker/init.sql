-- init.sql
CREATE SCHEMA IF NOT EXISTS dwh;

CREATE TABLE IF NOT EXISTS dwh.dim_date (
    date_id INT PRIMARY KEY,
    full_date DATE NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    day INT NOT NULL,
    is_weekend BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS dwh.dim_chromebook_vendor (
    vendor_id INT PRIMARY KEY,
    vendor_name VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL,
    contract_type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS dwh.fact_chromebook_margin_risk (
    fact_id SERIAL PRIMARY KEY,
    date_id INT REFERENCES dwh.dim_date(date_id),
    vendor_id INT REFERENCES dwh.dim_chromebook_vendor(vendor_id),
    eur_to_usd DECIMAL(10,4) NOT NULL,
    eur_to_twd DECIMAL(10,4) NOT NULL,
    component_delay_days INT NOT NULL,
    freight_cost_eur DECIMAL(10,2) NOT NULL,
    margin_impact_risk INT NOT NULL CHECK (margin_impact_risk IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some dummy dimensions for initial pipeline testing
INSERT INTO dwh.dim_date (date_id, full_date, year, month, day, is_weekend) 
VALUES (20260601, '2026-06-01', 2026, 6, 1, false) ON CONFLICT DO NOTHING;

INSERT INTO dwh.dim_chromebook_vendor (vendor_id, vendor_name, region, contract_type)
VALUES (1, 'TechCorp Taiwan', 'Asia', 'Standard') ON CONFLICT DO NOTHING;
