import {useState} from 'react';
import SelectDemo from '../components/aiselection';
//import sendPromptnAgent from './SingleAgent';
import {EnterIcon} from "@radix-ui/react-icons";
import {Greet, SendPrompt} from "../../wailsjs/go/main/App";
import * as icons from "../../../../icons"

export default function MultiAgent() {

    const [resultText2, setResultText2] = useState(''); 
    const [prompt, setPrompt] = useState('');
    const [submittedPrompt, setsubmittedPrompt] = useState('');
    const [selected, setSelected] = useState('');
    
    const updatePrompt = (e) => setPrompt(e.target.value);
    const updateResultText2 = (prompt) => setResultText2(prompt);

    const [convo, setConvo] = useState("");

    function sendPromptnAgent(e) {
        e.preventDefault();
        setsubmittedPrompt(prompt);

        SendPrompt(prompt, selected)
            .then(updateResultText2)
            .then(() => {
                setConvo("1");
            })

            setPrompt("");
    }

    return (
        <div id="aiselection">
            <div id='Title'>
                Multi-Agent Selection
            </div>
            <div id='aiselection-content'>
                <div id='Multi-Selector-container'>
                    <div id='select-container'>
                        <SelectDemo onValueChange={setSelected}/>
                    </div>
                    <div id='select-container'>
                        <SelectDemo onValueChange={setSelected}/>
                    </div>
                </div>
                <div id='Multi-mcontainer'>
                    <div id='Multi-Messenger-Container'>
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
                    <div id='Multi-Messenger-Container'>
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
                </div>
                <form onSubmit={sendPromptnAgent}>
                    <div id="user-input" className="input-box">
                        <input 
                            id="name" 
                            className="input" 
                            value={prompt} 
                            autoComplete="off" 
                            placeholder={`Message ${selected}`} 
                            name="prompt" 
                            type="text" 
                            onChange={updatePrompt}
                        />
                        <button className="btn" type='submit'/*</div>onClick={sendPromptnAgent}*/><EnterIcon /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}