import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet, SendPrompt} from "../wailsjs/go/main/App";
import NavBar from './components/NavBar';
import SelectDemo from './aiselection';
import Settings from './Settings';
import Home from './Home';
import {EnterIcon} from "@radix-ui/react-icons";

async function submitPrompt() {
    const prompt = document.getElementId("input").value;
    const response = await SendPrompt(prompt);
    console.log(response);
}

function App() {
    // delete this as this is unused
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e) => setName(e.target.value);
    const updateResultText = (result) => setResultText(result);

    //trying out sending text
    const [resultText2, setResultText2] = useState(""); 
    const [prompt, setPrompt] = useState('');
    const updatePrompt = (e) => setPrompt(e.target.value);
    const updateResultText2 = (prompt) => setResultText2(prompt);

    //switching views
    const [selectedPanel, setSelectedPanel] = useState("home")

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

    return (
        <div id="App">
            <div className='container'>
                <NavBar setSelectedPanel={setSelectedPanel} />
                {/* NavBar views here 
                        {selectedPanel = "settings" &&  }
                        */}
                <div id="secondcolumn">
                    <div id='Title'>
                        Dashboard
                    </div>
                    <div id='Selector-container'>
                        <SelectDemo onValueChange={setSelected}/>
                    </div>
                    <div id='content'>
                        {selectedPanel === "home" && <Home />}
                        {selectedPanel === "settings" &&  <Settings />}
                        {/* AI Agent stuff starts here / it should not be here */}
                        {/*
                        <div id="OutputBox">
                            {resultText2}
                        </div>
                        <div id="prompt" className="prompt">Please enter your prompt: </div>
                        */}
                    </div>
                        {/*
                    <div id="user-input" className="input-box">
                        <input id="name" className="input" autoComplete="off" placeholder={`Message ${selected}`} name="prompt" type="text" onChange={updatePrompt}/>
                        <button className="btn" onClick={sendPromptnAgent}><EnterIcon /></button>
                    </div>
                        */}
                </div>
            </div>
        </div>
    )
}

export default App
