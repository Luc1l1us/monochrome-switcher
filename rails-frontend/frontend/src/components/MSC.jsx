import {useState} from 'react';
import * as icons from "../../../../icons"

function MessengerContainer({submittedPrompt, resultText2, convo, selected}) {
    
    return (
    <div id='Messenger-container'>
        {/* Show this when the convo variable is empty */}
        { !convo && (
            <div id="prompt" className="prompt">Please enter your prompt: </div>
        )}
        {/* we might need to make this a separate component */}
        <div id="OutputBox">
            {/* HIDE THE USER PROMPT WHEN THERE IS NO CONVO */}
            { convo && (
                <div id="user-prompt-container">
                    <div className='text'>
                        {submittedPrompt}
                    </div>
                    <div className='avatar'>
                        {/* THIS IS PLACEHOLDER FOR NOW */}
                        <img src={icons.userdefaultIcon}></img>
                    </div>
                </div>
                )
            }
            {/* HIDE THE AI PROMPT WHEN THERE IS NO CONVO */}
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