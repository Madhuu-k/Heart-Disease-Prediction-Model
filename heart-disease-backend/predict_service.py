import numpy as np

THRESHOLD = 0.3

REQUIRED_FIELDS = [
    "age",
    "totChol",
    "sysBP",
    "diaBP",
    "BMI",
    "heartRate",
    "glucose"
]

def predict_risk(model, data):
    features = [data[field] for field in REQUIRED_FIELDS]
    x = np.array(features).reshape(1, -1)
    
    proba = model.predict_proba(x)[0][1]
    prediction = int(proba >= THRESHOLD)
    
    return{
        "Risk" : "High" if prediction else "Low",
        "Probability" : round(float(proba), 3)
    }