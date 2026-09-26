import PasswordField from "./PasswordField";
import "./APIFields.css";

// we can prob cut icon and make it just {icons.[name]}?
export default function AgentAPIField({
    provider, name, icon, apiURL, apikey, onAPIChange
}) {
    return (
        <div className="agent">
            <div className="agent-image">
                <img id="gemini-image" src={icon}></img>
            </div>
            <div className="agent-text">
                <a href={apiURL}>
                    <div className="agent-title">
                        {name}
                    </div>
                </a>
                <div className="agent-key">
                    <PasswordField 
                        name={`${provider}_key`}
                        value={apikey} 
                        onChange={onAPIChange}
                        placeholder="Please enter an API Key"
                    />
                </div>
            </div>
        </div>
    )
}