import geminiIcon from "../../../../icons/gemini_icon.png";
import chatgptIcon from "../../../../icons/chatgpt_icon.png"
import claudeIcon from "../../../../icons/claude_icon.png"

export default function Settings() {
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
                                    <input type="password" className="api-key" autoComplete="off" placeholder="Enter your API Key here"/>
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
                                    <input type="password" className="api-key" autoComplete="off" placeholder="Enter your API Key here"/>
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
                                    <input type="password" className="api-key" autoComplete="off" placeholder="Enter your API Key here"/>
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
                                <input type="checkbox"></input>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="minimizetray" id="pref">
                            <div className="pref-text">
                                Minimize to Tray?
                            </div>
                            <label className="switch">
                                <input type="checkbox"></input>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* SAVE BUTTON TO SAVE CHANGES */}
                <div id="save-button">
                    <button>
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}
