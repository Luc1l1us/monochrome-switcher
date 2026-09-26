import MessageBubble from './MessageBubble';
import * as icons from "../../../../icons"

function MessengerContainer({conversation, provider, isLoading}) {
    console.log("isLoading state is:", isLoading)
    return (
    <div id='Messenger-container'>
        <div id="OutputBox">
            {conversation.length === 0 && !isLoading && (
                <div id="prompt" className="prompt">
                    Please enter your prompt.
                </div>
            )}

            {conversation.map((message, index) => (
                <MessageBubble
                    key={index}
                    message={message}
                    provider={provider}
                />
            ))}

            {isLoading && (
                <div id="ai-response" className="loading">
                    <div className="avatar">
                        <img src={icons[provider]} />
                    </div>

                    <div className="skeleton">
                        <div className="skeleton-line short"></div>
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line medium"></div>
                    </div>
                </div>
            )}
        </div>
    </div>
)} 

export default MessengerContainer