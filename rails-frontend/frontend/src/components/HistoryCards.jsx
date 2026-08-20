export default function HistoryCards({ chat, onClick }) {
    return (
        <div className="card" onClick={() => {
            console.log("Clicked chat:", chat.id, "Chat Title:",chat.title, chat.provider)
            onClick(chat.id)
            }}>
            <h3 className="history-smol">{chat.title}</h3>
            <p className="history-smol">{chat.provider}</p>
            <small className="history-smol">{chat.created_at}</small>
            <small>{chat.id}</small>
        </div>
    )
}