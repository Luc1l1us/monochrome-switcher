import {useEffect, useState} from 'react';
import SelectDemo from '../components/aiselection';
import MessengerContainer from '../components/MSC';
import {EnterIcon} from "@radix-ui/react-icons";
import {CreateChat, Greet, SendPrompt} from "../../wailsjs/go/main/App";
import * as icons from "../../../../icons"
import {MultiAgent} from '../views';

export default function AISelectionScreen({setSelectedPanel}) {

    //creating chatID when AI Selection is pressed
    const [chatID, setChatID] = useState("");

    useEffect(() => {
        CreateChat(selected)
            .then(setChatID);
    }, []);

    const [resultText2, setResultText2] = useState(''); 
    const [prompt, setPrompt] = useState('');
    const [submittedPrompt, setsubmittedPrompt] = useState('');
    const [selected, setSelected] = useState('');
    const [convo, setConvo] = useState("");

    const updatePrompt = (e) => setPrompt(e.target.value);
    const updateResultText2 = (prompt) => setResultText2(prompt);

    function sendPromptnAgent() {
        setsubmittedPrompt(prompt);

        SendPrompt(chatID, selected, prompt)
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
                <MessengerContainer submittedPrompt={submittedPrompt} resultText2={resultText2} convo={convo} selected={selected}/>
                <div id="user-input" className="input-box">
                    <input id="name" className="input" value={prompt} autoComplete="off" placeholder={`Message ${selected}`} name="prompt" type="text" onChange={updatePrompt}/>
                    <button className="btn" onClick={sendPromptnAgent}><EnterIcon /></button>
                </div>
            </div>
        </div>
    )
}