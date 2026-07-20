import * as icons from "../../../../icons"
export default function MessageBubble({ message }) {

    const isUser = message.role === "user";

    return (
        <div id={isUser ? "user-prompt-container" : "ai-response"}>

            {!isUser && (
                <div className="avatar">
                    <img src={icons[message.provider]} />
                </div>
            )}

            <div className="text">
                {message.content}
            </div>

            {isUser && (
                <div className="avatar">
                    <img src={icons.userdefaultIcon} />
                </div>
            )}

        </div>
    );
}