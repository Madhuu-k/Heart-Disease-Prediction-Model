import { useState } from "react";
import './App.css';
import Landing from "./components/Landing";
import PersonalInfo from "./components/steps/PersonalInfo";
import Lifestyle from "./components/steps/LifeStyle";
import MedicalHistory from "./components/steps/MedicalHistory";
import Vitals from "./components/steps/Vitals";
import Result from "./components/Result";
import StepIndicator from "./components/StepIndicator";
import Navbar from "./components/Navbar";

export default function Model() {
  const [step, setStep] = useState(0);
  
  // Labels Configuration
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

  // Validation Rules
  const REQUIRED_FIELDS = [
    "age", "totChol", "sysBP", "diaBP", "BMI", "heartRate", "glucose"
  ];

  const BINARY_FIELDS = [
    "male", "currentSmoker", "BPMeds", "prevalentStroke", "prevalentHyp", "diabetes"
  ];

  const FIELD_GROUPS = {
    "Personal Information": ["male", "age", "education"],
    "Lifestyle": ["currentSmoker", "cigsPerDay"],
    "Medical History": ["BPMeds", "prevalentStroke", "prevalentHyp", "diabetes"],
    "Vitals & Lab Results": ["totChol", "sysBP", "diaBP", "BMI", "heartRate", "glucose"]
  };

  // Form State
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

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === "currentSmoker" && Number(value) === 0) {
        return { ...prev, currentSmoker: 0, cigsPerDay: 0 };
      }
      return { ...prev, [name]: value === "" ? "" : Number(value) };
    });
  };

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      setResult(data);
      setStep(5);
    } catch (err) {
      setError("Prediction Failed. Recheck Flask Server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = REQUIRED_FIELDS.every(
    key => formData[key] !== "" && formData[key] >= 0
  );

  // Render
  return (
    <div className="app-container">
      <main className="main-content">
        <title>Heart Disease Prediction</title>
        {step === 0 && (
          <Landing onStart={() => setStep(1)} />
        )}

        {step >= 1 && step <= 4 && (
          <div className="form-container">
            <StepIndicator currentStep={step} />
            
            {step === 1 && (
              <PersonalInfo
                data={formData}
                onChange={handleChange}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <Lifestyle
                data={formData}
                onChange={handleChange}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <MedicalHistory
                data={formData}
                onChange={handleChange}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}

            {step === 4 && (
              <Vitals
                data={formData}
                onChange={handleChange}
                onSubmit={handlePredict}
                onBack={() => setStep(3)}
                loading={loading}
              />
            )}
          </div>
        )}

        {step === 5 && result && (
          <Result
            result={result}
            onRestart={() => {
              setStep(0);
              setResult(null);
              setFormData({
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
            }}
          />
        )}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
