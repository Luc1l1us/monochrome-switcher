import { SaveSettings, LoadSettings, SaveAPIKeys, LoadAPIKeys } from "../../wailsjs/go/main/App"
import AgentAPIField from "../components/settings/AgentAPIField";
import { useEffect, useState } from "react";
import * as icons from "../../../../icons"
import Toast from "../components/Toast";
import { useToast } from "../components/useToast";
import { providers } from "../components/config/providers";

export default function Settings() {
    const [settings, setSettings] = useState({
        resizable: false,
        minimizetotray: false,
        launchonstartup: false,
        transparency: false,
    });

    const [apikeys, setapikeys] = useState({
        gemini_key: '',
        claude_key: '',
        chatgpt_key: '',
        perplex_key: '',
        deepseek_key: '',
        grok_key: '',
        openrouter_key: '',
    })

    //API Key fields function here
    const leftColumn = providers.filter(
        (provider) => provider.column === 1
    );

    const rightColumn = providers.filter(
        (provider) => provider.column === 2
    );

    const renderProviders = (items) => 
        items.map((provider) => (
            <AgentAPIField
                key={provider.id}
                provider={provider.id}
                name={provider.name}
                icon={provider.icon}
                apiURL={provider.apiURL}
                apikey={apikeys[provider.apikey]}
                onAPIChange={handleAPIChange}
            />
        ));

    //function to show toast notifcation for user
    const { toast, toastVisible, showToast } = useToast(); 

    useEffect(() => {
        const init = async () => {
            if (!window.go?.main) {
                console.warn("Wails not ready yet");
                showToast("Wails not ready yet!")
                return;
            }

            const settings = await LoadSettings();
            setSettings(settings);

            const apikeys = await LoadAPIKeys();
            setapikeys(apikeys);
        };

        init();
    }, []);

    function handleAPIChange(e) {
        const {name, value} = e.target;

        setapikeys(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return (
        <div id="settings">
            <div id='Title'>
                Settings
            </div>
            <div id='settings-content'>
                <div className="content-title">
                    <h2 className="settings-section-title">
                        API Keys
                    </h2>
                    <h3 className="smol">
                        Manage API keys for your AI Models. Keys are stored locally.
                    </h3>
                </div>
                <div id="ai-models">
                    <div id="first-column">
                        {renderProviders(leftColumn)}
                    </div>


                    {/* SECOND COLUMN */}
                    <div id="second-column">
                        {renderProviders(rightColumn)}
                    </div>
                </div>

                {/* ANOTHER SECTION */}
                <div className="content-title">
                    <h2 className="settings-section-title">
                        Preferences
                    </h2>
                    <h3 className="smol">
                        Configure app behavior, interface, and user experience.
                    </h3>
                </div>
                <div id="preferences">
                    <div className="preferences-container">
                        <div className="resize" id="pref">
                            <div className="pref-text">
                                Resizable?
                            </div>
                            <label className="switch">
                                <input 
                                    type="checkbox"
                                    checked={settings.resizable}
                                    onChange={(e) => {
                                        setSettings(prev => ({
                                            ...prev,
                                            resizable: e.target.checked
                                        }))
                                    }}
                                ></input>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="minimizetray" id="pref">
                            <div className="pref-text">
                                Minimize to Tray?
                            </div>
                            <label className="switch">
                            <input 
                                    type="checkbox"
                                    checked={settings.minimizetotray}
                                    onChange={(e) => {
                                        setSettings(prev => ({
                                            ...prev,
                                            minimizetotray: e.target.checked
                                        }))
                                    }}
                                ></input>
                                <span className="slider round"></span>
                            </label>
                        </div>                        
                        <div className="launchonstartup" id="pref">
                            <div className="pref-text">
                                Launch on Startup?
                            </div>
                            <label className="switch">
                            <input 
                                    type="checkbox"
                                    checked={settings.launchonstartup}
                                    onChange={(e) => {
                                        setSettings(prev => ({
                                            ...prev,
                                            launchonstartup: e.target.checked
                                        }))
                                    }}
                                ></input>
                                <span className="slider round"></span>
                            </label>
                        </div>                        
                        <div className="transparency" id="pref">
                            <div className="pref-text">
                                Enable Transparency?
                            </div>
                            <label className="switch">
                            <input 
                                    type="checkbox"
                                    checked={settings.transparency}
                                    onChange={(e) => {
                                        setSettings(prev => ({
                                            ...prev,
                                            transparency: e.target.checked
                                        }))
                                    }}
                                ></input>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* SAVE BUTTON TO SAVE CHANGES */}
                <div id="save-button">
                    <button
                        onClick={async () => {
                            console.log(settings)
                            SaveSettings(settings);
                            console.log(apikeys);
                            SaveAPIKeys(apikeys);
                            showToast("Restart is required to apply changes")
                            //ReloadApp();
                        }}>
                        SAVE
                    </button>
                </div>
                    <Toast 
                        message={toast}
                        visible={toastVisible}
                    />
            </div>
        </div>
    )
}
