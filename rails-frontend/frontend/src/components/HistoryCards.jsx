import * as icons from "../../../../icons"
import ColoredBadge from "./badge/ColoredBadge"

export default function HistoryCards({ chat, onClick, DeleteChat }) {
    return (
        <div className="card" id="historycard-id" onClick={() => {
            console.log("Clicked chat:", chat.id, "Chat Title:",chat.title, chat.provider)
            onClick(chat.id, chat.modelID)
            }}>
            <div className="state-badge">
                <ColoredBadge 
                    children={chat.agent_state.mode}
                    state={chat.agent_state.mode}/>
            </div>
            <h3 className="history-smol">{chat.title}</h3>
            <p className="history-smol">{chat.provider}</p>
            <p className="history-smol">{chat.modelID}</p>
            <small className="history-smol">{chat.created_at}</small>
            <small className="history-smol">{chat.id}</small>
            <small className="history-smol">{chat.session_id || "Empty"}</small>
            <div className="delete-button">
                <button className="delete-button" onClick={() => {DeleteChat(chat.id)}}>
                    <img id="nav-settings" src={icons.trashicon}></img>
                </button>
            </div>
        </div>
    )
}