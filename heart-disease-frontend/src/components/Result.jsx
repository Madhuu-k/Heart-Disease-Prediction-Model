export default function Result({ result, onRestart }) {
  const isHighRisk = result.risk === "High";
  const probability = (result.probability * 100).toFixed(0);

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">❤️</span>
            <span className="logo-text">CardioPredict<span className="logo-ai">.AI</span></span>
          </div>
          <nav className="nav-links">
            <a href="#overview">Overview</a>
            <a href="#features">Features</a>
            <a href="#methodology">Methodology</a>
            <a href="#" onClick={onRestart}>Back to Home</a>
          </nav>
        </div>
      </div>

      <div className="result-container">
        {/* Header */}
        <div className="result-header">
          <h2>Heart Disease Risk Assessment</h2>
          <p>Complete the form below with your recent clinical data. All fields are required for an accurate prediction.</p>
        </div>

        {/* Main Content */}
        <div className="result-grid">
          {/* Main Result Card */}
          <div className="result-main">
            <div className={`success-icon ${isHighRisk ? 'warning' : ''}`}>
              {isHighRisk ? '⚠️' : '✅'}
            </div>
            
            <h3>ESTIMATED RISK</h3>
            
            <div className={`risk-percentage ${isHighRisk ? 'high' : ''}`}>
              {probability}%
            </div>
            
            <div className={`risk-badge ${isHighRisk ? 'high' : ''}`}>
              {isHighRisk ? 'High Risk Profile' : 'Low Risk Profile'}
            </div>
            
            <p className="result-description">
              Your results indicate a {isHighRisk ? 'higher' : 'lower'} probability of heart disease
              based on the provided metrics.
            </p>
          </div>

          {/* Recommendations Sidebar */}
          <div className="recommendations">
            <h3>Recommendations</h3>
            <ul>
              <li>Maintain a balanced diet rich in fruits and vegetables</li>
              <li>Continue regular physical activity (150 mins/week)</li>
              <li>Schedule annual check-ups with your physician</li>
            </ul>
            
            <div className="disclaimer-box">
              * This is an AI-generated estimation and does not replace professional medical diagnosis.
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="result-actions">
          <button onClick={onRestart}>Start New Prediction</button>
        </div>

        {/* Footer Disclaimer */}
        <div className="disclaimer">
          Disclaimer: This tool provides an estimation based on statistical models. It is not a substitute for professional
          medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health
          provider with any questions you may have regarding a medical condition.
        </div>
      </div>
    </>
  );
}