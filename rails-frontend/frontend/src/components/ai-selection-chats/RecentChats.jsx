import "./aiselectionchats.css"
import ColoredBadge from "../badge/ColoredBadge";

export default function Recentchats({chat, onClick}) {
    const isMulti = chat.agent_state?.mode === "multi";
    const multiproviders = isMulti
        ? [...new Set(chat.chats.map(c => c.provider))]
        : [chat.provider]
    const agentCount = isMulti
        ? chat.chats.length
        : 1;
    console.log("chat length:", chat)
    return (
        <div 
            className="ai-selection-chats"
            onClick={() => onClick(chat)}>
            <div className="recent-chats">
                <div className="chat-provider-container">
                    <div className="recent-chats-name">
                        {chat.title}
                    </div>
                    <div className="recent-chats-provider">
                        {isMulti ? (
                            <div>
                                {multiproviders.map(provider => (
                                    <span key={provider}>{provider}</span>
                                ))}
                            </div>
                        ) : (
                            <span>
                                {chat.provider}
                            </span>
                        )}
                    </div>
                </div>
                    <div className="recent-chats-badge">
                        <ColoredBadge
                            children={chat.agent_state?.mode}
                            state={chat.agent_state?.mode}
                            numofagents={agentCount}
                        />
                    </div>
            </div>
        </div>
    )
}
