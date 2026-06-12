from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
import random

default_args = {
    'owner': 'data_engineering',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

def extract_currency_rates(**kwargs):
    # Mocking extraction from Frankfurter API for EUR/USD and EUR/TWD
    print("Extracting current FX rates...")
    rates = {
        'eur_to_usd': round(random.uniform(1.05, 1.15), 4),
        'eur_to_twd': round(random.uniform(33.0, 36.0), 4)
    }
    kwargs['ti'].xcom_push(key='fx_rates', value=rates)
    print(f"Extracted rates: {rates}")

def extract_shipping_logistics(**kwargs):
    print("Simulating extraction of component delay days and baseline ocean freight...")
    logistics = {
        'component_delay_days': random.randint(0, 20),
        'base_freight_cost_eur': round(random.uniform(5000, 8000), 2)
    }
    kwargs['ti'].xcom_push(key='logistics', value=logistics)
    print(f"Extracted logistics: {logistics}")

def transform_and_load(**kwargs):
    ti = kwargs['ti']
    rates = ti.xcom_pull(key='fx_rates', task_ids='extract_currency_rates')
    logistics = ti.xcom_pull(key='logistics', task_ids='extract_shipping_logistics')
    
    eur_usd = rates['eur_to_usd']
    eur_twd = rates['eur_to_twd']
    delay = logistics['component_delay_days']
    cost = logistics['base_freight_cost_eur']
    
    # Air freight rerouting logic
    if delay >= 12:
        print("Delay >= 12 days. Rerouting via Air Freight.")
        cost = cost * 3.5  # Air freight is significantly more expensive
        
    print("Connecting to PostgreSQL DWH...")
    # Normally we would use psycopg2 and airflow hooks here to connect to postgres.
    # We will log the sql query to be executed.
    
    # Simple logic for Margin Impact Risk (1 = Risk, 0 = No risk)
    # High cost and low EUR value against TWD increases risk.
    risk = 1 if (cost > 15000 or (eur_twd < 34.0 and delay > 5)) else 0
    
    insert_sql = f"""
    INSERT INTO dwh.fact_chromebook_margin_risk 
    (date_id, vendor_id, eur_to_usd, eur_to_twd, component_delay_days, freight_cost_eur, margin_impact_risk)
    VALUES 
    (20260601, 1, {eur_usd}, {eur_twd}, {delay}, {cost}, {risk});
    """
    
    print("Executing Load:")
    print(insert_sql)
    print("Load Successful!")

with DAG(
    'auroratech_realtime_pipeline',
    default_args=default_args,
    description='ETL pipeline for FX Rates and Freight Logs',
    schedule_interval=timedelta(days=1),
    start_date=datetime(2026, 1, 1),
    catchup=False,
    tags=['auroratech'],
) as dag:

    t1 = PythonOperator(
        task_id='extract_currency_rates',
        python_callable=extract_currency_rates,
    )

    t2 = PythonOperator(
        task_id='extract_shipping_logistics',
        python_callable=extract_shipping_logistics,
    )

    t3 = PythonOperator(
        task_id='transform_and_load',
        python_callable=transform_and_load,
    )

    [t1, t2] >> t3
