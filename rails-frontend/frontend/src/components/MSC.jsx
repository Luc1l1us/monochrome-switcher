import MessageBubble from './MessageBubble';
import * as icons from "../../../../icons"

function MessengerContainer({conversation, provider, isLoading}) {
    return (
    <div id='Messenger-container'>
        {conversation.length === 0 ? (
            <div id="prompt" className="prompt">
                Please enter your prompt.
            </div>
        ) : (
            <div id="OutputBox">
                {conversation.map((message, index) => (
                    <MessageBubble
                        key={index}
                        message={message}
                        provider={provider}
                    />
                ))}

                {isLoading && (
                    <div className='ai-response loading'>
                        <div className='avatar'>
                            <img src={icons[provider]} />
                        </div>

                        <div className='skeleton'>
                            <div className='skeleton-line short'></div>
                            <div className='skeleton-line'></div>
                            <div className='skeleton-line medium'></div>
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
)} 

export default MessengerContainer