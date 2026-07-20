import MessageBubble from './MessageBubble';

function MessengerContainer({conversation}) {
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
                    />
                ))}
            </div>
        )}
    </div>
)} 

export default MessengerContainer