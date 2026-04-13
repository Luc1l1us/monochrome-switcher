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


    const [resultText2, setResultText2] = useState("Please enter your prompt"); 
    const [prompt, setPrompt] = useState('');
    const updatePrompt = (e) => setPrompt(e.target.value);
    const updateResultText2 = (prompt) => setResultText2(prompt);

    function greet() {
        Greet(name).then(updateResultText);
    }

    // This function would send the prompt to either Cloud or Local LLMs
    // This function should send a string to the backen
    function sendPromptnAgent() {
        SendPrompt(prompt).then(updateResultText2);
    }

    return (
        <div id="App">
            <div id='fborder'>
                <img src={logo} id="logo" alt="logo"/>
                <div id="result" className="result">{resultText}</div>
                <div id="input" className="input-box">
                    <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
                    <button className="btn" onClick={greet}>Greet</button>
                </div>
                <div>
                    <SelectDemo/>
                </div>
                <div id="prompt" className="prompt">{resultText2}</div>
                <div id="input" className="input-box">
                    <input id="name" className="input" autoComplete="off" name="prompt" type="text" onChange={updatePrompt}/>
                    <button className="btn" onClick={sendPromptnAgent}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default App
