-- This is an idempotent script executed within the ETL flow to ensure presence of destination tables
CREATE SCHEMA IF NOT EXISTS staging;

CREATE TABLE IF NOT EXISTS staging.fx_rates_raw (
    id SERIAL PRIMARY KEY,
    base_currency VARCHAR(3),
    target_currency VARCHAR(3),
    exchange_rate DECIMAL(10,4),
    retrieved_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staging.shipping_logs_raw (
    id SERIAL PRIMARY KEY,
    vendor_id INT,
    container_id VARCHAR(50),
    delay_days INT,
    ocean_freight_cost DECIMAL(10,2),
    timestamp TIMESTAMP
);
