import joblib

MODEL_PATH = "heart_model.pkl"

def load_model():
    return joblib.load(MODEL_PATH)
