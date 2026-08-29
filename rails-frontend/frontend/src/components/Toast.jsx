export default function Toast({message, visible}) {
    if (!message) {
        return null;
    }

    return (
        <div className={`toast-notif ${visible ? "show" : "hide"}`}>
            {message}
        </div>
    )
}