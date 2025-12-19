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
        
        features = [
            data["male"],
            data["age"],
            data["education"],
            data["currentSmoker"],
            data["cigsPerDay"],
            data["BPMeds"],
            data["prevalentStroke"],
            data["prevalentHyp"],
            data["diabetes"],
            data["totChol"],
            data["sysBP"],
            data["diaBP"],
            data["BMI"],
            data["heartRate"],
            data["glucose"]
        ]

        x = np.array(features).reshape(1, -1)
        
        probability = model.predict_proba(x)[0][1]
        
        if probability < 0.3:
            risk = "Low"
        elif probability < 0.6:
            risk = "Medium"
        else:
            risk = "High"
            
        return jsonify({
            "Risk" : risk,
            "Probability": round(float(probability), 3)
        })
        
    except Exception as e:
        return jsonify({"erro" : str(e)}), 400
    
    
if __name__ == "__main__":
    app.run(debug=True)