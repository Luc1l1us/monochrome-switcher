import * as icons from "../../../../icons"
import ReactMarkdown from "react-markdown"

export default function MessageBubble({ message, provider }) {
    
    //testing out role
    console.log("Message received: ", message)
    console.log("Provider: ", provider)
    console.log("Role: ", message.role)
    

    const isUser = message.role === "user";

    return (
        <div id={isUser ? "user-prompt-container" : "ai-response"}>

            {!isUser && (
                <div className="avatar">
                    <img src={icons[provider]} />
                </div>
            )}

            <div className="text">
                {isUser ? (
                    message.content
                ) : (
                    <ReactMarkdown>
                        {message.content}
                    </ReactMarkdown>
                )}
            </div>

            {isUser && (
                <div className="avatar">
                    <img src={icons.userdefaultIcon} />
                </div>
            )}

        </div>
    );
}