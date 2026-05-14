import {useState} from 'react';
import SelectDemo from '../aiselection';
import {EnterIcon} from "@radix-ui/react-icons";
import {Greet, SendPrompt} from "../../wailsjs/go/main/App";

export default function AISelectionScreen() {

    const [resultText2, setResultText2] = useState(''); 
    const [prompt, setPrompt] = useState('');
    const updatePrompt = (e) => setPrompt(e.target.value);
    const updateResultText2 = (prompt) => setResultText2(prompt);
    const [selected, setSelected] = useState('');

    async function submitPrompt() {
        const prompt = document.getElementId("input").value;
        const response = await SendPrompt(prompt);
        console.log(response);
    }

    function sendPromptnAgent() {
        SendPrompt(prompt, selected).then(updateResultText2);
    }
    

    return (
        <div id="aiselection">
            <div id='Title'>
                AI Selection
            </div>
            <div id='aiselection-content'>
                <div id='Selector-container'>
                    <SelectDemo onValueChange={setSelected}/>
                </div>
                <div id='Messenger-container'>
                    <div id="prompt" className="prompt">Please enter your prompt: </div>
                    <div id="OutputBox">
                        {resultText2}
                    </div>
                </div>
                <div id="user-input" className="input-box">
                    <input id="name" className="input" autoComplete="off" placeholder={`Message ${selected}`} name="prompt" type="text" onChange={updatePrompt}/>
                    <button className="btn" onClick={sendPromptnAgent}><EnterIcon /></button>
                </div>
            </div>
        </div>
    )
}