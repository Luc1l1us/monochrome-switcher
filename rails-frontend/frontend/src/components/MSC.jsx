import {useState} from 'react';
import MessageBubble from './MessageBubble';
import * as icons from "../../../../icons"

function MessengerContainer({submittedPrompt, resultText2, convo, selected}) {
    const [conversation, setConversation] = useState([]);    
    return (
    <div id='Messenger-container'>
        { !convo && (
            <div id="prompt" className="prompt">Please enter your prompt: </div>
        )}
        <div id="OutputBox">
            {conversation.map((message, index) => (
                <MessageBubble
                    key={index}
                    message={message}
                />
            ))}
        </div>
    </div>
)
} 

export default MessengerContainer