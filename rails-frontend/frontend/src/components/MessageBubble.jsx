export default function MessageBubble({ message }) {

    const isUser = message.role === "user";

    return (
        <div className={isUser ? "user-prompt-container" : "ai-response"}>

            {!isUser && (
                <div className="avatar">
                    <img src={message.avatar} />
                </div>
            )}

            <div className="text">
                {message.content}
            </div>

            {isUser && (
                <div className="avatar">
                    <img src={message.avatar} />
                </div>
            )}

        </div>
    );
}