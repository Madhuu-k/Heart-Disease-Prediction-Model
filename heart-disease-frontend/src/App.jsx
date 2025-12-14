import { useState } from "react";

export default function Model() {
  const LABELS = {
  male: "Male",
  age: "Age (years)",
  education: "Education Level (1–4)",
  currentSmoker: "Current Smoker",
  cigsPerDay: "Cigarettes per Day",
  BPMeds: "BP Medications",
  prevalentStroke: "History of Stroke",
  prevalentHyp: "Hypertension",
  diabetes: "Diabetes",
  totChol: "Total Cholesterol (mg/dL)",
  sysBP: "Systolic BP",
  diaBP: "Diastolic BP",
  BMI: "Body Mass Index",
  heartRate: "Heart Rate",
  glucose: "Glucose Level"
};

const BINARY_FIELDS = [
  "male",
  "currentSmoker",
  "BPMeds",
  "prevalentStroke",
  "prevalentHyp",
  "diabetes"
];

const FIELD_GROUPS = {
  "Personal Information": ["male", "age", "education"],
  "Lifestyle": ["currentSmoker", "cigsPerDay"],
  "Medical History": ["BPMeds", "prevalentStroke", "prevalentHyp", "diabetes"],
  "Vitals & Lab Results": [
    "totChol",
    "sysBP",
    "diaBP",
    "BMI",
    "heartRate",
    "glucose"
  ]
};


  const [formData, setFormData] = useState({
    male: 1,
    age: "",
    education: "",
    currentSmoker: 0,
    cigsPerDay: "",
    BPMeds: 0,
    prevalentStroke: 0,
    prevalentHyp: 0,
    diabetes: 0,
    totChol: "",
    sysBP: "",
    diaBP: "",
    BMI: "",
    heartRate: "",
    glucose: ""
  });

  const[result, setResult] = useState(null);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name] : value === "" ? "" : Number(value)
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData)
      });

      if(!res.ok){
        throw new Error("Server error");
      }

      const data = await res.json();
      setResult(data);
    } catch(err) {
      setError("Prediction Failed. Recheck Flask Servers", err)
    } finally{
      setLoading(false);
    }
  };

  return(
     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <h2>Heart Disease Predictor</h2>

        {Object.entries(FIELD_GROUPS).map(([groupName, fields]) => (
  <div key={groupName} style={{ marginBottom: "25px" }}>
    <h3>{groupName}</h3>

    {fields.map((key) => (
      <div key={key} style={{ marginBottom: "10px" }}>
        <label style={{ fontWeight: "bold" }}>
          {LABELS[key]}
        </label>

        {BINARY_FIELDS.includes(key) ? (
          <select
            name={key}
            value={formData[key]}
            onChange={handleChange}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        ) : (
          <input
            type="number"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          />
        )}
      </div>
    ))}
  </div>
))}


        <button onClick={handlePredict} disabled={loading}>
          { loading ? "Predicting..." : "Predict"}
        </button>

        { error && <p style={{ color: "red" }}>{error}</p>}

        { result && (
          <div style={{ marginTop: "20px"}}> 
              <h3>Prediction Results </h3>
              <p><b>Risk: </b>{result.risk}</p>
              <p><b>Probability: </b>{result.probability}</p>
              <p><b>Threshold: </b>{result.threshold} </p>
          </div>
        )}
     </div>
  );
}