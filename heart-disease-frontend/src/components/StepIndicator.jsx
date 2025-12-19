export default function StepIndicator({ step }) {
  const steps = [
    "Personal Info",
    "Lifestyle",
    "Medical History",
    "Vitals"
  ];

  // Hide indicator on Landing (0) and Result (5)
  if (step === 0 || step === 5) return null;

  return (
    <div className="step-indicator">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = step === stepNumber;
        const isCompleted = step > stepNumber;

        return (
          <div
            key={label}
            className={`step 
              ${isActive ? "active" : ""} 
              ${isCompleted ? "completed" : ""}
            `}
          >
            <div className="step-circle">
              {isCompleted ? "✓" : stepNumber}
            </div>
            <span className="step-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
