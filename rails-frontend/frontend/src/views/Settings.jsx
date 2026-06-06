import geminiIcon from "../../../../icons/gemini_icon.png";
import chatgptIcon from "../../../../icons/chatgpt_icon.png"
import claudeIcon from "../../../../icons/claude_icon.png"
import { SaveSettings, LoadSettings, SaveAPIKeys, LoadAPIKeys } from "../../wailsjs/go/main/App"
import { useEffect, useState } from "react";
import { claude } from "../../../../icons";

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
    })

    //function to show toast notifcation for user
    const [toast, setToast] = useState('');
    function showToast(text) {
        setToast(text)

        setTimeout(() => {
            setToast("");
        }, 5000);
    }

    useEffect(() => {
        const init = async () => {
            if (!window.go?.main) {
                console.warn("Wails not ready yet");
                return;
            }

            const settings = await LoadSettings();
            setSettings(settings);

            const apikeys = await LoadAPIKeys();
            setapikeys(apikeys);
        };

        init();
    }, []);

    // one is const, whilst the other is function | Make this consistent
    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target

        setSettings(prev => ({
            ...prev,
            [name]: checked
        }))
    }

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
                        <div className="agent">
                            <div className="agent-image">
                                <img id="claude-image" src={claudeIcon}></img>
                            </div>
                            <div className="agent-text">
                                <a href="https://platform.claude.com/settings/keys">
                                    <div className="agent-title">
                                        Claude
                                    </div>
                                </a>
                                <div className="agent-key">
                                    <input type="password" value={apikeys.claude} onChange={handleAPIChange} name="claude_key" className="api-key" autoComplete="off" placeholder={apikeys.claude_key}/>
                                </div>
                            </div>
                        </div>
                        <div className="agent">
                            <div className="agent-image">
                                <img id="chatgpt-image" src={chatgptIcon}></img>
                            </div>
                            <div className="agent-text">
                                <a href="https://openai.com/api/">
                                    <div className="agent-title">
                                        ChatGPT
                                    </div>
                                </a>
                                <div className="agent-key">
                                    <input type="password" value={apikeys.chatgpt} onChange={handleAPIChange} name="chatgpt_key" className="api-key" autoComplete="off" placeholder={apikeys.chatgpt_key}/>
                                </div>
                            </div>
                        </div>
                        <div className="agent">
                            <div className="agent-image">
                                <img id="gemini-image" src={geminiIcon}></img>
                            </div>
                            <div className="agent-text">
                                <a href="https://ai.google.dev/gemini-api/docs">
                                    <div className="agent-title">
                                        Gemini
                                    </div>
                                </a>
                                <div className="agent-key">
                                    <input type="password" value={apikeys.gemini} onChange={handleAPIChange} name="gemini_key" className="api-key" autoComplete="off" placeholder={apikeys.gemini_key}/>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* SECOND COLUMN */}
                    <div id="second-column">
                        <div className="agent">
                            <div className="agent-image">
                                <img id="perplex-image" src={claudeIcon}></img>
                            </div>
                            <div className="agent-text">
                                <a href="https://console.perplexity.ai/">
                                    <div className="agent-title">
                                        Perplexity
                                    </div>
                                </a>
                                <div className="agent-key">
                                    <input type="password" className="api-key" autoComplete="off" placeholder="Enter your API Key here"/>
                                </div>
                            </div>
                        </div>

                        <div className="agent">
                            <div className="agent-image">
                                <img id="deepseek-image" src={claudeIcon}></img>
                            </div>
                            <div className="agent-text">
                                <a href="https://platform.deepseek.com/api_keys">
                                    <div className="agent-title">
                                        DeepSeek
                                    </div>
                                </a>
                                <div className="agent-key">
                                    <input type="password" className="api-key" autoComplete="off" placeholder="Enter your API Key here"/>
                                </div>
                            </div>
                        </div>
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
                    {toast && (
                        <div className="toast-notif">
                            {toast}
                        </div>
                    )}
            </div>
        </div>
    )
}
