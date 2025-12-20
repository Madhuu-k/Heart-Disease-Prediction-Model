export default function Navbar({ onStartPrediction, showBackToHome, onBackToHome }) {
  return (
    <div className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">❤️</span>
          <span className="logo-text">
            CardioPredict<span className="logo-ai">.AI</span>
          </span>
        </div>
        
        <nav className="nav-links">
          <a href="#overview">Overview</a>
          <a href="#features">Features</a>
          <a href="#methodology">Methodology</a>
          
          {showBackToHome ? (
            <a href="#" onClick={onBackToHome} className="back-link">
              Back to Home
            </a>
          ) : (
            <button className="start-button" onClick={onStartPrediction}>
              Start Prediction ⚡
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}