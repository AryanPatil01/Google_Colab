from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler
with open('../model/heart_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('../model/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

# Define the expected feature order based on our training dataset
EXPECTED_FEATURES = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
    'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Extract features in the correct order
        features = []
        for feature_name in EXPECTED_FEATURES:
            if feature_name not in data:
                return jsonify({'error': f'Missing feature: {feature_name}'}), 400
            
            # Convert to float
            try:
                features.append(float(data[feature_name]))
            except ValueError:
                return jsonify({'error': f'Invalid value for {feature_name}'}), 400
        
        # Convert to numpy array and shape for single prediction
        features_array = np.array(features).reshape(1, -1)
        
        # Scale the features
        features_scaled = scaler.transform(features_array)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0][1] # Probability of heart disease (class 1)
        
        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
