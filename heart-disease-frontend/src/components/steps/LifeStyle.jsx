export default function LifeStyle({data, onChange, onNext, onBack}) {
    return(
        <div className="card">
            <h2>LifeStyle Factors</h2>
            
            {/* Cuurent Smoker */}
            <div className="form-group">
                <label>Current Smoker</label>
                <select
                name="currentSmoker"
                value={data.currentSmoker}
                onChange={onChange}
                >
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>
            </div>

            {/* Cigarettes per day (conditional) */}
            {data.currentSmoker === 1 && (
                <div className="form-group">
                    <label>Cigarettes Per Day</label>
                    <input
                    type="number"
                    name="cigsPerDay"
                    value={data.cigsPerDay}
                    onChange={onChange}
                    placeholder="e.g. 5"
                    />
                </div>
            )}
            
            <button onClick={onBack}>← Back</button>
            <button onClick={onNext}>Next →</button>
        </div>
    );
}