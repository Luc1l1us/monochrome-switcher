import "./APIFields.css";
import RecordKeystroke from "./RecordKeystroke";

export default function PreferencesField({className, name, checked, onChange}) {
    return (
        <div className={className} id="pref">
            <div className="pref-text">
                {name}
            </div>
            {className === "recordkeystroke" ? (
                <RecordKeystroke
                    name={"recordkeystroke"}
                    placeholder={"Please enter a key"}
                    value={checked}
                    onChange={onChange}
                />
            ) : (
            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    >
                </input>
                <span className="slider round"></span>
            </label>
        )}
        </div>
    )
}