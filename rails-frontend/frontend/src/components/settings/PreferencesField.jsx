import "./APIFields.css";

export default function PreferencesField({className, name, checked, onChange}) {
    return (
        <div className={className} id="pref">
            <div className="pref-text">
                {name}
            </div>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    >
                </input>
                <span className="slider round"></span>
            </label>
        </div>
    )
}