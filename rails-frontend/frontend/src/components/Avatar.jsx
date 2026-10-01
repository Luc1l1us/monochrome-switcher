export default function Avatar({provider, icons, isUser}) {
    const icon = isUser ? icons.userdefaultIcon : icons[provider]
    return (
        <div className={`avatar ${isUser ? "user" : "assistant"}`}>
            <img src={icon}/>
            {isUser ? (
                <p>User</p>
            ) : (
                <p>{provider}</p>
            )}
        </div>
    )
}