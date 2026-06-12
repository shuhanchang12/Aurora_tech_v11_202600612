import os
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

# Load the trained ML model & Label Encoder
MODEL_DIR = "models"
MODEL_PATH = os.path.join(MODEL_DIR, "auroratech_chromebook_model.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.pkl")

try:
    model = joblib.load(MODEL_PATH)
    label_encoder = joblib.load(ENCODER_PATH)
except FileNotFoundError:
    model = None
    label_encoder = None

app = FastAPI(
    title="AuroraTech Margin Prediction API (DataCo Adapted)",
    description="Endpoint for inferring financial risk of production delays based on bootstrapped DataCo supply chain dataset.",
    version="1.1.0"
)

# Input data schema structure
class PredictionRequest(BaseModel):
    days_for_shipping_real: int = Field(..., description="Days for shipping (real)")
    days_for_shipment_scheduled: int = Field(..., description="Days for shipment (scheduled)")
    shipping_mode: str = Field(..., description="Standard Class, First Class, Second Class")
    order_item_total: float = Field(..., description="Total price of the order items")
    eur_usd_rate: float = Field(..., description="The EUR/USD exchange rate via Forex API")

class PredictionResponse(BaseModel):
    risk_prediction: int
    risk_probability: float
    status: str

@app.get("/health")
def health_check():
    return {
        "status": "ok", 
        "model_loaded": model is not None,
        "encoder_loaded": label_encoder is not None
    }

@app.post("/predict-margin-risk", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    if model is None or label_encoder is None:
        raise HTTPException(status_code=503, detail="Model artifact or Label Encoder is not loaded. Train the model first.")
    
    try:
        shipping_mode_encoded = label_encoder.transform([request.shipping_mode])[0]
    except ValueError:
        raise HTTPException(status_code=400, detail=f"Unrecognized shipping mode: {request.shipping_mode}")
        
    # Format for Scikit-learn
    input_df = pd.DataFrame([{
        "Days for shipping (real)": request.days_for_shipping_real,
        "Days for shipment (scheduled)": request.days_for_shipment_scheduled,
        "Shipping_Mode_Encoded": shipping_mode_encoded,
        "Order Item Total": request.order_item_total,
        "EUR_USD_Rate": request.eur_usd_rate
    }])

    prediction = model.predict(input_df)[0]
    probabilities = model.predict_proba(input_df)[0]
    risk_prob = float(probabilities[1])
    
    return PredictionResponse(
        risk_prediction=int(prediction),
        risk_probability=risk_prob,
        status="Success"
    )
