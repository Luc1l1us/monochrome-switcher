import {useState} from 'react';
import * as icons from "../../../../icons"

function MessengerContainer({submittedPrompt, resultText2, convo, selected}) {
    const [conversation, setConversation] = useState([]);    
    return (
    <div id='Messenger-container'>
        { !convo && (
            <div id="prompt" className="prompt">Please enter your prompt: </div>
        )}
        <div id="OutputBox">
            { convo && (
                <div id="user-prompt-container">
                    <div className='text'>
                        {submittedPrompt}
                    </div>
                    <div className='avatar'>
                        <img src={icons.userdefaultIcon}></img>
                    </div>
                </div>
                )
            }
            { convo && (
                <div id="ai-response">
                    <div className='avatar'>
                        <img src={icons[selected]}></img>
                    </div>
                    <div className='text'>
                        {resultText2}
                    </div>
                </div>
            )}
        </div>
    </div>
)
} 

export default MessengerContainer