export default function Result({ result, onRestart }){
    return(
        <div className="card">
            <h2>Prediction Result</h2>

            <p> 
                <strong>Heart Disease Risk:</strong> {result.risk}
            </p>

            <p>
                <strong>Probability: </strong> {" "}
                {(result.probability * 100).toFixed(1)}%
            </p>

            {/* Progress bar */}
            <div className="progress-container">
                <div
                className="progress-bar"
                style={{ width: `${result.probability * 100}%` }}
                >
                    {(result.probability * 100).toFixed(1)}%
                </div>
            </div>

            <button onClick={onRestart}>Start New Assessment</button>
        </div>
    );
}