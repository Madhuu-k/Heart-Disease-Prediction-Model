from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from model_loader import load_model

app = Flask(__name__)
CORS(app)

model = load_model()
    
@app.route("/", methods=["GET"])
def home() :
    return jsonify({"Flask Server is running successfuly"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        FEATURE_ORDER = [ "male", "age", "education", "currentSmoker", "cigsPerDay", 
                         "BPMeds", "prevalentStroke", "prevalentHyp", "diabetes",
                         "totChol", "sysBP", "diaBP", "BMI", "heartRate", "glucose"
                        ]
        
        features = []
        for fieled in FEATURE_ORDER:
            value = data.get(fieled, 0)
            
            if value in ("", None):
                value = 0
                
            features.append(float(value))


        x = np.array(features).reshape(1, -1)
        
        probability = model.predict_proba(x)[0][1]
        
        risk = ("low" if probability < 0.3
                else "Medium" if probability < 0.6
                else "High"
            )
            
        return jsonify({
            "risk" : risk,
            "probability": round(float(probability), 3)
        })
        
    except Exception as e:
        return jsonify({"erro" : str(e)}), 400
    
    
if __name__ == "__main__":
    app.run(debug=True)