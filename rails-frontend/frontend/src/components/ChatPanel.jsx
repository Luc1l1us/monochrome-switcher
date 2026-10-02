import {useEffect, useState, useRef} from 'react';
import SelectDemo from '../components/aiselection';
import MessengerContainer from '../components/MSC';
import PromptInput from './markdown-preview/PromptInput';
import PromptComposer from './markdown-preview/PromptComposer';
import {CreateChat, LoadAPIKeys, LoadOneChat, SendPrompt, GetOpenRouterModels} from "../../wailsjs/go/main/App";
import OpenrouterModelPicker from './OR-model-picker/ORModelPicker';
import Toast from './Toast';
import { useToast } from './useToast';

export default function ChatPanel({chat, onChatUpdated, showInput, state}) {

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

    // OpenRouter models here
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);

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

    //load models
    useEffect(() => {
        async function loadModels() {
            try {
                const result = await GetOpenRouterModels();
                setModels(result ?? []);
            } catch (error) {
                console.error("Failed to load OpenRouter models:", error)
                showToast("Failed to load OpenRouter models!")
            }
        }
        loadModels();
    },[]);
    //restore openrouter models
    useEffect(() => {
        if (!chat) return;

        setrouterOpen(chat.provider === "openrouter");

        if (chat.provider === "openrouter" && chat.modelID) {
            const selected = models.find(
                model => model.id === chat.modelID
            );

            setSelectedModel(selected ?? null);
        } else {
            setSelectedModel(null);
        }
    }, [chat, models]);

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
        let modelID = "";
        if (selected === "openrouter") {
            modelID = selectedModel?.id ?? "";
            if (!modelID) {
                showToast("Please select an OpenRouter model first!")
                return;
            }
        }
        
        if (!prompt.trim() || isLoading) return;
        setIsLoading(true)


        try {
            let activeChat = chat;
            if (!activeChat) {
                const id = await CreateChat(selected, modelID, state);
                activeChat = await LoadOneChat(id)
                console.log("Created chat:", activeChat)
            }

            const response = await SendPrompt(
                activeChat.id, 
                selected, 
                prompt,
                modelID,
            )
            const updatedChat = await LoadOneChat(activeChat.id)
            onChatUpdated(updatedChat)
                setPrompt("");
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
                    {routerOpen && (
                        <OpenrouterModelPicker
                            models={models}
                            selectedModel={selectedModel}
                            onSelectModel={setSelectedModel}
                            />
                    )}
                    </div>
                </div>
                <MessengerContainer 
                    conversation={conversation}
                    provider={selected}
                    isLoading={isLoading}/>
                {showInput && (
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        sendPromptnAgent()
                    }}>
                        <PromptComposer
                            prompt={prompt}
                            selected={selected}
                            updatePrompt={updatePrompt}
                            handleKeyDown={handleKeyDown}
                            isLoading={isLoading}
                        />
                        <Toast 
                            message={toast}
                            visible={toastVisible}
                        />
                    </form>   
                )}
            </div>
    );
}
