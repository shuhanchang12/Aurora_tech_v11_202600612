import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, f1_score
from sklearn.preprocessing import LabelEncoder

def fetch_and_adapt_dataco():
    """
    Simulates fetching the Kaggle DataCo Smart Supply Chain dataset and 
    performing Domain Adaptation / Data Masking to bootstrap the Chromebook pipeline.
    """
    print("Fetching historical DataCo global supply chain dataset...")
    np.random.seed(42)
    n_samples = 3000
    
    # 1. Simulate raw DataCo fields (the "cold-start" raw data)
    df = pd.DataFrame({
        'Date': pd.date_range(start='2025-01-01', periods=n_samples, freq='D'),
        'Days for shipping (real)': np.random.randint(1, 15, n_samples),
        'Days for shipment (scheduled)': np.random.randint(2, 10, n_samples),
        'Shipping Mode': np.random.choice(['Standard Class', 'First Class', 'Second Class'], n_samples),
        'Product Name': np.random.choice(['Smart watch', 'Nike shoes', 'Sports gear'], n_samples),
        'Customer Name': ['Customer_' + str(i) for i in range(n_samples)],
        'Order Item Total': np.random.uniform(100, 2000, n_samples),
        'Benefit per order': np.random.uniform(-50, 400, n_samples)
    })
    
    print("Applying Data Masking & Feature Engineering for Chromebook Context...")
    
    # 2. Drop irrelevant fields from original Kaggle dataset
    df = df.drop(columns=['Product Name', 'Customer Name'])
    
    # 3. Inject Virtual Settings for Chromebook Pipeline
    df['Product_Category'] = 'Chromebook' # Domain Masking
    
    # Simulate joining with external Forex table
    df['EUR_USD_Rate'] = np.random.uniform(1.05, 1.15, n_samples)
    
    # Calculate Delay based on DataCo logic
    df['Delay_Days'] = df['Days for shipping (real)'] - df['Days for shipment (scheduled)']
    df['Delay_Days'] = df['Delay_Days'].apply(lambda x: x if x > 0 else 0)
    
    # Define Target: Margin Risk (1 if Benefit is negative or delay exceeds threshold causing penalties)
    df['Margin_Risk'] = ((df['Benefit per order'] < 0) | (df['Delay_Days'] > 3)).astype(int)
    
    return df

def train_and_save_model():
    df = fetch_and_adapt_dataco()
    
    # Encode categorical features
    le = LabelEncoder()
    df['Shipping_Mode_Encoded'] = le.fit_transform(df['Shipping Mode'])
    
    # Save label encoder for inference
    os.makedirs(os.path.dirname("models/") or '.', exist_ok=True)
    joblib.dump(le, "models/label_encoder.pkl")
    print("Label encoder saved as 'models/label_encoder.pkl'")
    
    features = [
        'Days for shipping (real)', 
        'Days for shipment (scheduled)', 
        'Shipping_Mode_Encoded', 
        'Order Item Total', 
        'EUR_USD_Rate'
    ]
    target = 'Margin_Risk'
    
    X = df[features]
    y = df[target]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print("Training Initial Random Forest Model (Cold Start Mode)...")
    clf = RandomForestClassifier(n_estimators=100, max_depth=6, class_weight='balanced', random_state=42)
    clf.fit(X_train, y_train)
    
    y_pred = clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    print(f"Validation Accuracy: {acc:.4f}")
    print(f"Validation F1-Score: {f1:.4f}")
    print("\nClassification Report:\n", classification_report(y_test, y_pred))
    
    joblib.dump(clf, "models/auroratech_chromebook_model.pkl")
    print("Model serialized and saved as 'models/auroratech_chromebook_model.pkl'")

if __name__ == "__main__":
    train_and_save_model()

