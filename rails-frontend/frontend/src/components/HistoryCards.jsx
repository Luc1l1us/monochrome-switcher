export default function HistoryCards({ chat, onClick }) {
    return (
        <div className="card" onClick={() => onClick(chat.id)}>
            <h3>{chat.title}</h3>
            <p>{chat.provider}</p>
            <small>{chat.id}</small>
        </div>
    )
}