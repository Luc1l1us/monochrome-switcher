import * as icons from "../../../../icons"
import ColoredBadge from "./badge/ColoredBadge"

export default function HistoryCards({ chat, onClick, DeleteChat }) {
    const isMulti = chat.agent_state?.mode != "single";
    const multiproviders = isMulti
        ? [...new Set(chat.chats.map(c => c.provider))]
        : [chat.provider]
        console.log("chatlength",chat.length)
    const agentCount = isMulti
        ? chat.chats.length
        : 1;
    return (
        <div className="card" id="historycard-id" onClick={() => {
            onClick(chat)
            console.log("Clicked chat:", chat.id, "Chat Title:",chat.title, chat.provider)
            }}>
            <div className="state-badge">
                <ColoredBadge 
                    children={chat.agent_state?.mode}
                    state={chat.agent_state?.mode}
                    numofagents={agentCount}
                />
            </div>
            <h3 className="history-smol">{chat.title}</h3>
            <h3 className="history-smol">{chat.length}</h3>
            {isMulti ? (
                <div className="history-providers">
                    {multiproviders.map(provider => (
                        <div className="text">
                            <img
                                key={provider}
                                src={icons[provider]}
                                alt={provider}
                                className="history-provider-icon"
                            />
                            <span>{provider}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <p className="history-smol">{chat.provider}</p>
                    <p className="history-smol">{chat.modelID}</p>
                </>
            )}
            <small className="history-smol">{chat.created_at}</small>
            {isMulti ? (
                <div className="history-smol">
                    <p> {chat.session_id} </p>
                    <p> {chat.chats[0].id} </p>
                </div>
            ) : (
                <small className="history-smol">{chat.id}</small>
            )}

            <div className="delete-button">
                <button className="delete-button" onClick={() => {DeleteChat(chat)}}>
                    <img id="nav-settings" src={icons.trashicon}></img>
                </button>
            </div>
        </div>
    )
}