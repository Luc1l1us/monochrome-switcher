import Avatar from "./Avatar";
import * as icons from "../../../../icons"

import ReactMarkdown from "react-markdown"

export default function MessageBubble({ message, provider }) {
    
    //testing out role
    //console.log("Message received: ", message)
    //console.log("Provider: ", provider)
    //console.log("Role: ", message.role)
    
    const isUser = message.role === "user";
    return (
        <div className={`chat-message ${isUser ? "user" : "assistant"}`}>
            <Avatar provider={provider} icons={icons} isUser={isUser}/>

            <div id={isUser ? "user-prompt-container" : "ai-response"}>
                <div className="text">
                    <ReactMarkdown>
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}