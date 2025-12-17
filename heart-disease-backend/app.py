from flask import Flask, request, jsonify
from flask_cors import CORS

from model_loader import load_model
from validation import validate_input
from predict_service import predict_risk

app = Flask(__name__)
CORS(app)

model = load_model()

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # 1️⃣ Validation
    error = validate_input(data)
    if error:
        return jsonify({"error": error}), 400

    # 2️⃣ Prediction
    try:
        result = predict_risk(model, data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500

app.run(debug=True)
