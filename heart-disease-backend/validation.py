REQUIRED_FIELDS = [
    "age",
    "totChol",
    "sysBP",
    "diaBP",
    "BMI",
    "heartRate",
    "glucose"
]

def validate_input(data):
    if not data:
        return "NO JSON Provided"
    
    for field in REQUIRED_FIELDS:
        if field not in data or data[field] in ("", None):
            return f"Missing or Invalid Field: {field}"
        
    return None