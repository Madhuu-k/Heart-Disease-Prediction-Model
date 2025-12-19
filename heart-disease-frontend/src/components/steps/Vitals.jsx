export default function Vitals({ data, onChange, onSubmit, onBack, loading }) {
  return (
    <div className="card">
      <h2>Vitals & Lab Results</h2>

      <div className="form-group">
        <label>Total Cholesterol</label>
        <input
          type="number"
          name="totChol"
          value={data.totChol}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Systolic BP</label>
        <input
          type="number"
          name="sysBP"
          value={data.sysBP}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Diastolic BP</label>
        <input
          type="number"
          name="diaBP"
          value={data.diaBP}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Body Mass Index (BMI)</label>
        <input
          type="number"
          name="BMI"
          value={data.BMI}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Heart Rate</label>
        <input
          type="number"
          name="heartRate"
          value={data.heartRate}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Glucose</label>
        <input
          type="number"
          name="glucose"
          value={data.glucose}
          onChange={onChange}
        />
      </div>

      <div className="nav-buttons">
        <button onClick={onBack}>← Back</button>
        <button onClick={onSubmit} disabled={loading}>
          {loading ? "Predicting..." : "Predict →"}
        </button>
      </div>
    </div>
  );
}
