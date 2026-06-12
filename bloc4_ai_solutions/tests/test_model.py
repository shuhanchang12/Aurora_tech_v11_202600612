import unittest
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from src.train_model import fetch_data

class TestModelTraining(unittest.TestCase):
    
    def setUp(self):
        self.df = fetch_data()
        
    def test_data_shape(self):
        """Test if the fetched data has the required columns and non-zero rows."""
        self.assertGreater(len(self.df), 0)
        expected_columns = ['eur_to_usd', 'eur_to_twd', 'component_delay_days', 'freight_cost_eur', 'margin_impact_risk']
        for col in expected_columns:
            self.assertIn(col, self.df.columns)
            
    def test_model_inference_format(self):
        """Test model output dimension and binary format."""
        features = ['eur_to_usd', 'eur_to_twd', 'component_delay_days', 'freight_cost_eur']
        X = self.df[features].head(10)
        y = self.df['margin_impact_risk'].head(10)
        
        clf = RandomForestClassifier(n_estimators=10, random_state=42)
        clf.fit(X, y)
        
        # Test inference
        dummy_input = pd.DataFrame([{
            'eur_to_usd': 1.10,
            'eur_to_twd': 34.0,
            'component_delay_days': 5,
            'freight_cost_eur': 5000.0
        }])
        
        prediction = clf.predict(dummy_input)
        self.assertEqual(len(prediction), 1)
        self.assertIn(prediction[0], [0, 1])

if __name__ == "__main__":
    unittest.main()
