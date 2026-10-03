import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import NavBar from './components/NavBar';
import { About, SingleAgent, MultiAgent, FAQ, History, Home, Settings } from './views';

function App() {
    //switching views
    const [selectedPanel, setSelectedPanel] = useState("home")
    const [activeChat, setActiveChat] = useState(null);
    const [panels, setPanels] = useState([
        {
            id: crypto.randomUUID(),
            chat: null,
        }
    ])
    // multipanels 
    function restoreMultiChatSession(chats) {
        setPanels(
            chats.map(chat => ({
                id: crypto.randomUUID(),
                chat: chat
            }))
        )
    }

    function addPanel() {
        setPanels(prev => [
            ...prev, 
            {
                id: crypto.randomUUID(),
                chat: null,
            }
        ])
    }

    function updatePanel(panelID, updatedChat) {
        setPanels(prev =>
            prev.map(panel =>
                panel.id === panelID
                ? {
                    ...panel, 
                    chat: updatedChat,
                } : panel
            )
        );
    }

    function handleChatSelected(selection) {
        console.log("=== HANDLE CHAT SELECTED ===");
        console.log("selection:", selection);
        console.log("selection.id:", selection?.id);
        console.log("selection.provider:", selection?.provider);
        console.log("selection.title:", selection?.title);
        console.log("selection.messages:", selection?.messages);

        // MultiPanel
        if (Array.isArray(selection)) {
            const mode = selection[0]?.agent_state?.mode;
            console.log("MultiAgent is present and here are the chats", selection);
            if (mode === "multi") {
                restoreMultiChatSession(selection)
                setSelectedPanel("multiagent")
                return;
            }
        }

        // SinglePanel
        setActiveChat(selection);
        setSelectedPanel("singleagent");
    }

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
                            onChatUpdated={setActiveChat}
                            setSelectedPanel={setSelectedPanel}/>}
                        {selectedPanel === "multiagent" &&  <MultiAgent
                            panels={panels}
                            addPanel={addPanel}
                            updatePanel={updatePanel}/>}
                        {selectedPanel === "history" &&  <History 
                            handleChatSelected={handleChatSelected}
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
