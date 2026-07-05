import {useState} from 'react';
import SelectDemo from '../components/aiselection';
import {EnterIcon} from "@radix-ui/react-icons";
import {Greet, SendPrompt} from "../../wailsjs/go/main/App";
import * as icons from "../../../../icons"
import {MultiAgent} from '../views';

export default function AISelectionScreen({setSelectedPanel}) {

    const [resultText2, setResultText2] = useState(''); 
    const [prompt, setPrompt] = useState('');
    const [submittedPrompt, setsubmittedPrompt] = useState('');
    const [selected, setSelected] = useState('');
    
    const updatePrompt = (e) => setPrompt(e.target.value);
    const updateResultText2 = (prompt) => setResultText2(prompt);

    // this convo should be a .json file
    const [convo, setConvo] = useState("");

    function sendPromptnAgent() {
        setsubmittedPrompt(prompt);

        SendPrompt("default", selected, prompt)
            .then(updateResultText2)
            .then(() => {
                setConvo("1");
            })

            setPrompt("");
    }

    return (
        <div id="aiselection">
            <div id='Title'>
                AI Selection
            </div>
            <div id='aiselection-content'>
                <div id='selection-row'>
                    <div id='Selector-container'>
                        <SelectDemo onValueChange={setSelected}/>
                    </div>
                    <button id='multi-agent-button' onClick={() => setSelectedPanel("multiagent")}>
                        +
                    </button>
                </div>
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
                <div id="user-input" className="input-box">
                    <input id="name" className="input" value={prompt} autoComplete="off" placeholder={`Message ${selected}`} name="prompt" type="text" onChange={updatePrompt}/>
                    <button className="btn" onClick={sendPromptnAgent}><EnterIcon /></button>
                </div>
            </div>
        </div>
    )
}