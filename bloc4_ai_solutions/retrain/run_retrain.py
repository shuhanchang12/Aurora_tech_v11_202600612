import os
import subprocess
from datetime import datetime

def run_retraining():
    print(f"[{datetime.now().isoformat()}] Starting Automated Retraining Pipeline...")
    
    # Step 1: Fetch new data and train the model
    print("--- Step 1: Training Module ---")
    ret_code = subprocess.run(["python", "src/train_model.py"]).returncode
    
    if ret_code != 0:
        print("Retraining failed at the training module.")
        return False
        
    print("--- Step 1 Complete ---")
    
    # Step 2: Validate through PyTest
    print("--- Step 2: Validation via Tests ---")
    test_code = subprocess.run(["pytest", "tests/test_model.py"]).returncode
    
    if test_code != 0:
        print("Validation tests failed. The newly trained model will NOT be deployed.")
        return False
        
    print("--- Step 2 Complete ---")
    print(f"[{datetime.now().isoformat()}] Automated Retraining Pipeline completed successfully.")
    print("New model serialized. Ready for CD deployment/restart.")
    return True

if __name__ == "__main__":
    run_retraining()
