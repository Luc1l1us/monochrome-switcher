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
                    <h2>
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
                                <div className="agent-title">
                                    Claude
                                </div>
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
                                <div className="agent-title">
                                    ChatGPT
                                </div>
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
                                <div className="agent-title">
                                    Gemini
                                </div>
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
                                <div className="agent-title">
                                    Perplexity
                                </div>
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
                                <div className="agent-title">
                                    DeepSeek
                                </div>
                                <div className="agent-key">
                                    <input type="password" className="api-key" autoComplete="off" placeholder="Enter your API Key here"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
