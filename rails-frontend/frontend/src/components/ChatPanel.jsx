import {useEffect, useState} from 'react';
import SelectDemo from '../components/aiselection';
import MessengerContainer from '../components/MSC';
import {EnterIcon} from "@radix-ui/react-icons";
import {CreateChat, Greet, LoadOneChat, SendPrompt} from "../../wailsjs/go/main/App";
import * as icons from "../../../../icons"
import {MultiAgent} from '../views';

export default function AgentPanel({chat, onChatUpdated, showInput}) {

    const [chatID, setChatID] = useState("");
    const [prompt, setPrompt] = useState('');
    const [selected, setSelected] = useState(
        chat?.provider || ""
    )
    const conversation = chat?.messages || []

    const updatePrompt = (e) => setPrompt(e.target.value);

    async function sendPromptnAgent() {
        if (!chat) {
            console.error("Please select an AI Agent first")
            return
        } 

        if (!prompt.trim()) {
            return;
        }
        if (!chatID) {
            console.error("No chat exists!")
        }

        const response = await SendPrompt(
            chat.id, 
            selected, 
            prompt
        )

        const updatedChat = await LoadOneChat(chatID)
        onChatUpdated(updatedChat)
            setPrompt("");
    }

    async function newChat(provider) {
        try {
            console.log("Creating chat for:", provider)
            const id = await CreateChat(provider);
            const newChat = await LoadOneChat(id)

            setSelected(provider)
            setChatID(id)
            onChatUpdated(newChat)
            console.log("Created chat:", id)
        } catch(error) {
            console.error("Failed to create chat:", error)
        }
    }

    return (
            <div id='aiselection-content'>
                <div id='selection-row'>
                    <div id='Selector-container'>
                        <SelectDemo 
                            selected={selected}
                            onProviderChange={newChat}/>
                    </div>
                </div>
                <MessengerContainer 
                    conversation={conversation}
                    provider={selected}/>
                {showInput && (
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
                        <button className="btn" onClick={sendPromptnAgent}><EnterIcon /></button>
                    </div>
                )}   
            </div>
    );
}
