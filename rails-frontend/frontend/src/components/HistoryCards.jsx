import * as icons from "../../../../icons"

export default function HistoryCards({ chat, onClick }) {
    return (
        <div className="card" id="historycard-id" onClick={() => {
            console.log("Clicked chat:", chat.id, "Chat Title:",chat.title, chat.provider)
            onClick(chat.id)
            }}>
            <h3 className="history-smol">{chat.title}</h3>
            <p className="history-smol">{chat.provider}</p>
            <small className="history-smol">{chat.created_at}</small>
            <small className="history-smol">{chat.id}</small>
            <small className="delete-button">
                <button className="delete-button">
                    <img id="nav-settings" src={icons.trashicon}></img>
                </button>
            </small>
        </div>
    )
}