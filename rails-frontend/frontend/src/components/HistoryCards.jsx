import * as icons from "../../../../icons"
import ColoredBadge from "./badge/ColoredBadge"

export default function HistoryCards({ chat, onClick, DeleteChat }) {
    const isMulti = chat.agent_state?.mode != "single";
    console.log(chat.chats[0].id) 

    return (
        <div className="card" id="historycard-id" onClick={() => {
            if (isMulti) {
                onClick(chat.chats[0].id) 
            } else {
                onClick(chat.id)
            }
            console.log("Clicked chat:", chat.id, "Chat Title:",chat.title, chat.provider)
            }}>
            <div className="state-badge">
                <ColoredBadge 
                    children={chat.agent_state?.mode}
                    state={chat.agent_state?.mode}/>
            </div>
            <h3 className="history-smol">{chat.title}</h3>
            {isMulti ? (
                <p className="history-smol">{chat.chats.length} AI Models</p>
            ) : (
                <>
                    <p className="history-smol">{chat.provider}</p>
                    <p className="history-smol">{chat.modelID}</p>
                </>
            )}
            <small className="history-smol">{chat.created_at}</small>
            {isMulti ? (
                <small className="history-smol">{isMulti ? chat.session_id : chat.id}</small>
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