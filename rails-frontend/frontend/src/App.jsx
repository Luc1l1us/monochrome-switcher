import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet, SendPrompt} from "../wailsjs/go/main/App";
import SelectDemo from './aiselection';

async function submitPrompt() {
    const prompt = document.getElementId("input").value;
    const response = await SendPrompt(prompt);
    console.log(response);
}

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e) => setName(e.target.value);
    const updateResultText = (result) => setResultText(result);

    //trying out sending text
    const [resultText2, setResultText2] = useState(""); 
    const [prompt, setPrompt] = useState('');
    const updatePrompt = (e) => setPrompt(e.target.value);
    const updateResultText2 = (prompt) => setResultText2(prompt);

    //get value from selectdemo
    const [selected, setSelected] = useState("");

    function greet() {
        Greet(name).then(updateResultText);
    }

    // This function would send the prompt to either Cloud or Local LLMs
    // This function should send a string to the backen
    function sendPromptnAgent() {
        SendPrompt(prompt, selected).then(updateResultText2);
    }

    function printingfuncs(text, ai) {
        console.log("input:", text);
        console.log("AI:", ai);
    }

    function testingfuncs() {
        printingfuncs(prompt, selected);
    }

    return (
        <div id="App">
            <div className='container'>
                <div id="firstcolumn">
                    MonoSwitch
                    <div className='Nav-buttons'>
                        <div className='Home'>
                            Home
                        </div>
                        <div className='AiSelection'>
                            AI Selection
                        </div>
                        <div className='History'>
                            History
                        </div>
                    </div>
                    <div className='bottom-nav'>
                        <div className='Settings'>
                            Settings
                        </div>
                        <div className='About'>
                            About
                        </div>
                        <div className='FAQ'>
                            FAQ
                        </div>

                    </div>
                </div>
                <div id="secondcolumn">
                    <div id='Title'>
                        Dashboard
                    </div>
                    <div id='content'>
                        <div id="Select">
                            <SelectDemo onValueChange={setSelected}/> 
                        </div>
                        <div id="prompt" className="prompt">Please enter your prompt: </div>
                        <div id="input" className="input-box">
                            <input id="name" className="input" autoComplete="off" name="prompt" type="text" onChange={updatePrompt}/>
                            <button className="btn" onClick={sendPromptnAgent}>Send</button>
                        </div>
                        <div id="OutputBox">
                            {resultText2}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
