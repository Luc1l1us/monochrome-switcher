import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import NavBar from './components/NavBar';
import { About, SingleAgent, MultiAgent, FAQ, History, Home, Settings } from './views';

function App() {
    //switching views
    const [selectedPanel, setSelectedPanel] = useState("home")
    const [chatID, setChatID] = useState("");
    const [conversation, setConversation] = useState([]);
    const [selected, setSelected] = useState("");
    const [activeChat, setActiveChat] = useState(null);

    return (
        <div id="App">
            <div className='container'>
                <NavBar setSelectedPanel={setSelectedPanel} />
                <div id="secondcolumn">
                    <div id='content'>
                        {selectedPanel === "home" && <Home setSelectedPanel={setSelectedPanel}/>}
                        {selectedPanel === "settings" &&  <Settings />}
                        {selectedPanel === "singleagent" &&  <SingleAgent 
                            chat={activeChat}
                            onChatUpdated={setActiveChat}/>}
                        {selectedPanel === "multiagent" &&  <MultiAgent />}
                        {selectedPanel === "history" &&  <History 
                            onChatSelected={(chat) => {
                                setActiveChat(chat)
                                setSelectedPanel("singleagent")
                            }}
                        />}
                        {selectedPanel === "about" &&  <About />}
                        {selectedPanel === "faq" &&  <FAQ />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
