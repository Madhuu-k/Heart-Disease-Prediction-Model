export default function MedicalHistory({ data, onChange, onNext, onBack }){
    return(
        <div className="card">
            <h2>Medical History</h2>

            <label>BP Medications (ongoing)</label>
            <select
            name="BPMeds"
            value={data.BPMeds}
            onChange={onChange}
            >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
            </select>

            <label>Hypertension</label>
            <select
            name="prevalentHyp"
            value={data.prevalentHyp}
            onChange={onChange}
            >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
            </select>

            <label>Diabeties</label>
            <select
            name="diabetes"
            value={data.diabetes}
            onChange={onChange}
            >
                <option value={1}>Yes</option>
                <option value={0}>No</option> 
            </select>

            <div className="nav-buttons">
                <button onClick={onBack}>← Back</button>
                <button onClick={onNext}>Next →</button>
            </div>
        </div>
    );
}