import {useState, useEffect} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { About, SingleAgent, MultiAgent, FAQ, History, Home, Settings } from './views';
import { LoadOneChat, LoadChatsBySession, ListChats } from '../wailsjs/go/main/App';

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
    
    async function switchChat(chat) {
        try {
            const isMulti = chat.agent_state?.mode != "single";
            if (isMulti) {
                console.log("Multi-chat selected", chat);
                const chats = await LoadChatsBySession(chat.session_id)
                if (!chats || chats.length === 0) {
                    console.error("No chats found for this session!", chat.session_id);
                    return;
                }
                handleChatSelected(chats)
                return;
            }
            const fullChat = await LoadOneChat(chat.id)
            if (!fullChat) {
                console.error("No chat returned!");
                return;
            }
            handleChatSelected(fullChat)
        } catch (error) {
            console.error("Failed to load chat: ", error)
        }
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
                <NavBar 
                    setSelectedPanel={setSelectedPanel}
                    onClick={switchChat}
                />
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
                            handleChatSelected={switchChat}
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
