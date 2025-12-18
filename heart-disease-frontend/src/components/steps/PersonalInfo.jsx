export default function PersonalInfo({data, onChange, onNext}) {
    return(
        <div className="card">
            <h2>Personal Information</h2>
            <p>Please provide basic demographic details.</p>

            {/* Gender */}
            <div className="form-group">
                <label>Gender</label>
                <select
                name="male"
                value={data.male}
                onChange={onChange}
                >
                    <option value={1}>Male</option>
                    <option value={0}>Female</option>
                </select>
            </div>

            {/* Age */}
            <div className="form-group">
                <label>Age</label>
                <input 
                type="number"
                name="age"
                value={data.age}
                onChange={onChange}
                placeholder="e.g. 45"
                />
            </div>

            {/* Education */}
            <div className="form-group">
                <label>Education Level</label>
                <select 
                name="education"
                value={data.education}
                onChange={onChange}
                > 
                <option value="">Select</option>
                <option value={1}>Primary</option>
                <option value={2}>Secondary</option>
                <option value={3}>Graduate</option>
                <option value={4}>Post Graduate</option>
                </select>
            </div>

            <button onClick={onNext} disabled={!data.age}>
                Next →
            </button>
        </div>
    );
}