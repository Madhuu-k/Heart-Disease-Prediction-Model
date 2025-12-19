export default function Landing({ onStart }) {
  return (
    <div className="card landing">
      <h1>Heart Disease Risk Prediction</h1>

      <p>
        This project uses Machine Learning to estimate the risk of heart disease
        based on personal, lifestyle, medical, and clinical factors.
      </p>

      <p>
        The assessment consists of 4 short steps and takes less than 2 minutes.
      </p>

      <button onClick={onStart}>
        Start Assessment →
      </button>
    </div>
  );
}
