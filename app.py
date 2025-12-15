from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

REQUIRED_FIELDS = [
    "age",
    "totChol",
    "sysBP",
    "diaBP",
    "BMI",
    "heartRate",
    "glucose"
]


model = joblib.load("heart_model.pkl")

THRESHOLD = 0.3

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    
    if not data:
        return jsonify({"error" : "No JSON Data Provided"}), 400
    
    for field in REQUIRED_FIELDS:
        if field not in data or data[field] in ("", None):
            return jsonify({
                "error" : f"Missing or Invalid Fields: {field}"
            })
    
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
    proba = model.predict_proba(x)[0][1]
    prediction = int(proba >= THRESHOLD)
    
    return jsonify({
        "risk" : "High" if prediction == 1 else "Low",
        "probability" : round(float(proba), 3),
        "threshold" : THRESHOLD
    })
    
app.run(debug=True)