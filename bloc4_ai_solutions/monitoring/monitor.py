import numpy as np
import subprocess
from scipy.stats import ks_2samp
import yaml

def load_config():
    with open("monitoring/drift_config.yaml", "r") as f:
        return yaml.safe_load(f)

def get_baseline_data():
    """Mock loading baseline feature distribution from training phase"""
    np.random.seed(42)
    return np.random.uniform(1.00, 1.20, 1000)

def get_production_data():
    """Mock loading latest production requests from API logs"""
    np.random.seed(99)
    # Introducing a drift in the distribution
    return np.random.uniform(1.15, 1.35, 200)

def calculate_drift():
    print("Initiating Drift Detection monitoring...")
    baseline = get_baseline_data()
    prod = get_production_data()
    
    # Kolmogorov-Smirnov test for goodness of fit
    stat, p_value = ks_2samp(baseline, prod)
    
    config = load_config()
    threshold = config['drift_detection']['threshold']
    
    print(f"KS Statistic: {stat:.4f}, P-Value: {p_value:.4f}")
    
    if stat > threshold:
        print(f"Warning: Drift threshold exceeded ({stat:.4f} > {threshold}). Concept/Data Drift detected!")
        return True
    
    print("No significant drift detected. Model is healthy.")
    return False

if __name__ == "__main__":
    is_drifted = calculate_drift()
    if is_drifted:
        print("Triggering automated retraining pipeline...")
        # Automatically call the retraining script
        subprocess.run(["python", "retrain/run_retrain.py"])
