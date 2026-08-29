import {useEffect, useState} from 'react';
import SelectDemo from '../components/aiselection';
import MessengerContainer from '../components/MSC';
import {EnterIcon} from "@radix-ui/react-icons";
import {CreateChat, Greet, LoadAPIKeys, LoadOneChat, SendPrompt} from "../../wailsjs/go/main/App";
import * as icons from "../../../../icons"
import {MultiAgent} from '../views';
import OpenRouter from './OpenRouter';
import Toast from './Toast';
import { useToast } from './useToast';

export default function ChatPanel({chat, onChatUpdated, showInput}) {

    const [chatID, setChatID] = useState("");
    const [prompt, setPrompt] = useState('');
    const [selected, setSelected] = useState(
        chat?.provider || ""
    )
    const conversation = chat?.messages || []
    const [routerOpen, setrouterOpen] = useState(false)

    const updatePrompt = (e) => setPrompt(e.target.value);

    const [openrouterAPIkey, setopenrouterAPIkey] = useState({
        openrouter_key: '',
    })

    //Toast function here
    const { toast, toastVisible, showToast } = useToast();

    async function handleOpenRouter() {
        const apikeys = await LoadAPIKeys();
        setopenrouterAPIkey(apikeys)
        console.log("openrouterkey is:", apikeys.openrouter_key)
        if (apikeys.openrouter_key === "") {
            return false
        }
        return true
    }

    async function handleProviderChange(provider) {
        console.log("User chose: ", provider)
        setSelected(provider)

        const checkopenrouterAPI = await handleOpenRouter();
        console.log("verdict is",checkopenrouterAPI)

        if (!checkopenrouterAPI) {
            showToast("OpenRouter API field is empty!")
            return;
        }

        if (provider === "openrouter") {
            setrouterOpen(true);
            console.log(`selected is: ${selected} and setrouterOpen is: ${routerOpen}`)
        }
    }

    async function sendPromptnAgent() {
        if (!selected) {
            console.error("Please select an AI Agent first")
            return
        } 

        if (!prompt.trim()) {
            return;
        }

        {/* Redundant too since we don't use nor set chatID anymore (?) */}
        /* if (!chatID) {
            console.error("No chat exists!")
        } */

        try {
            let activeChat = chat;
            if (!activeChat) {
                const id = await CreateChat(selected);
                activeChat = await LoadOneChat(id)
                console.log("Created chat:", activeChat)
            }

            const response = await SendPrompt(
                activeChat.id, 
                selected, 
                prompt
            )
            const updatedChat = await LoadOneChat(activeChat.id)
            onChatUpdated(updatedChat)
                setPrompt("");
        } catch (error) {
            console.error(
                "Failed to send prompt:", error
            )
        }
    }

    {/* this seems redundant since we moved the newChat to sendPrompt */}
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
                            onProviderChange={handleProviderChange}/>
                    {routerOpen && (
                        <OpenRouter
                            selected={selected}
                            onProviderChange={handleProviderChange}/>
                    )}
                    </div>
                </div>
                <Toast 
                    message={toast}
                    visible={toastVisible}
                />
                <MessengerContainer 
                    conversation={conversation}
                    provider={selected}/>
                {showInput && (
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        sendPromptnAgent()
                    }}>
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
                            <button className="btn" type="submit"><EnterIcon /></button>
                        </div>
                    </form>
                )}
            </div>
    );
}
