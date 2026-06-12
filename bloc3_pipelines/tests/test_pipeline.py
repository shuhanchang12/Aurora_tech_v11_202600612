import unittest
from unittest.mock import patch
from python.api_client import FXApiClient

class TestFXApiClient(unittest.TestCase):
    @patch('python.api_client.requests.get')
    def test_get_latest_rates_success(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            "rates": {"USD": 1.12, "TWD": 35.1}
        }
        
        client = FXApiClient()
        rates = client.get_latest_rates()
        
        self.assertEqual(rates["USD"], 1.12)
        self.assertEqual(rates["TWD"], 35.1)

    @patch('python.api_client.requests.get')
    def test_get_latest_rates_fallback(self, mock_get):
        mock_get.side_effect = Exception("Connection Timeout")
        
        client = FXApiClient()
        rates = client.get_latest_rates()
        
        # Ensures fallback values are returned
        self.assertEqual(rates["USD"], 1.1000)
        self.assertEqual(rates["TWD"], 34.5000)

if __name__ == '__main__':
    unittest.main()
