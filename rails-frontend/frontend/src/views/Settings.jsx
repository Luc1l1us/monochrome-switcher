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
                        <div className="agents">
                            <div className="agent-image">
                                {/* Agent Image here */}
                            </div>
                            <div className="agent-text">
                                <div className="agent-title">
                                {/* Agent Title/Name here */}
                                </div>
                                <div className="agent-key">
                                {/* Agent API Key here */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="second-column">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}