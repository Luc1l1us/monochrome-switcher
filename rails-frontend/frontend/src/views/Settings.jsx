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
                                <img id="gemini-api-image" src={claudeIcon}></img>
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
                                <img id="gemini-api-image" src={chatgptIcon}></img>
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
                                <img id="gemini-api-image" src={geminiIcon}></img>
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
                                <img id="gemini-api-image" src={claudeIcon}></img>
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
                                <img id="gemini-api-image" src={claudeIcon}></img>
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

                        <div className="agent">
                            <div className="agent-image">
                                <img id="gemini-api-image" src={claudeIcon}></img>
                            </div>
                            <div className="agent-text">
                                <a href="https://platform.deepseek.com/api_keys">
                                    <div className="agent-title">
                                        Placeholder
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
            </div>
        </div>
    )
}
