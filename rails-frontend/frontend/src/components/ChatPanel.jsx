import {useEffect, useState, useRef} from 'react';
import SelectDemo from '../components/aiselection';
import MessengerContainer from '../components/MSC';
import {ArrowUpIcon, PauseIcon} from "@radix-ui/react-icons";
import {CreateChat, LoadAPIKeys, LoadOneChat, SendPrompt} from "../../wailsjs/go/main/App";
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
    const [openrouterAPIkey, setopenrouterAPIkey] = useState({
        openrouter_key: '',
    })

    //Toast function here
    const { toast, toastVisible, showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false)

    const textareaRef = useRef(null);

    function updatePrompt(e) {
        const textarea = e.target
        setPrompt(textarea.value);
        textarea.style.height = "auto"
        textarea.style.height = `${Math.min(textarea.scrollHeight,200)}px`
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendPromptnAgent();
        }  
    }

    function resizeTexture() {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    useEffect(() => {
        resizeTexture();
    }, [prompt])

    async function handleOpenRouter() {
        const apikeys = await LoadAPIKeys();
        setopenrouterAPIkey(apikeys)
        //console.log("openrouterkey is:", apikeys.openrouter_key)
        if (apikeys.openrouter_key === "") {
            showToast(`No OpenRouter key present!`)
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
            showToast(`Please select an AI Agent first!`)
            console.error("Please select an AI Agent first")
            return
        } 

        if (!prompt.trim() || isLoading) return;
        setIsLoading(true)

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

            if (textareaRef.current) {
                textareaRef.current.style.height = "30px";
            }
        } catch (error) {
            showToast(`Failed to send prompt: error: ${error}`)
            console.error(
                "Failed to send prompt:", error
            )
        } finally {
            setIsLoading(false)
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
            showToast(`Failed to create chat: error: ${error}`)
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
                {/* Commented this out due to OpenRouter model change 
                    function is still in progress
                    {routerOpen && (
                        <OpenRouter
                            selected={selected}
                            onProviderChange={handleProviderChange}/>
                    )}
                */}
                    </div>
                </div>
                <Toast 
                    message={toast}
                    visible={toastVisible}
                />
                <MessengerContainer 
                    conversation={conversation}
                    provider={selected}
                    isLoading={isLoading}/>
                {showInput && (
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        sendPromptnAgent()
                    }}>
                        <div id="user-input" className="input-box">
                            <div className='inputcombo'>
                                <textarea
                                    ref={textareaRef}
                                    value={prompt} 
                                    placeholder={`Message ${selected}`} 
                                    onChange={updatePrompt}
                                    onKeyDown={handleKeyDown}
                                />
                                <button className={`btn ${isLoading ? "loading" : ""}`} type="submit">
                                    {isLoading ? (
                                        <PauseIcon className='icon' />
                                    ) : (
                                        <ArrowUpIcon className='icon'/>
                                    )}
                                </button>
                            </div>
                        </div>
                        <Toast 
                            message={toast}
                            visible={toastVisible}
                        />
                    </form>   
                )}
            </div>
    );
}
