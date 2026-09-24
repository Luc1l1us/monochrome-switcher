import {useState} from 'react';
import SelectDemo from '../components/aiselection';
import {EnterIcon} from "@radix-ui/react-icons";
import {LoadOneChat, SendPrompt} from "../../wailsjs/go/main/App";
import ChatPanel from '../components/ChatPanel';
import Toast from '../components/Toast';
import { useToast } from '../components/useToast';

export default function MultiAgent({chat, onChatUpdated}) {
    //Toast function here
    const { toast, toastVisible, showToast } = useToast();

    const [panels, setPanels] = useState([
        {
            id: crypto.randomUUID(),
            chat: null,
        }
    ])

    const [sharedInputMode, setSharedInputMode] = useState(false);
    const [sharedPrompt, setSharedPrompt] = useState("")

    function update() {
        setSharedInputMode(prev => !prev);
    }

    function addPanel() {
        setPanels(prev => [
            ...prev, 
            {
                id: crypto.randomUUID()
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

    async function sendSharedPrompt() {
        if (!sharedPrompt.trim()) {
            return;
        }

        const prompt = sharedPrompt;
        setSharedPrompt("")

        await Promise.all(
            panels.map(async (panel) => {
                if (!panel.chat) {
                    showToast("Panel has no chat!")
                    console.log("Panel has no chat!", panel.id);
                    return;
                }

                //logging purposes
                console.log(
                    "Sending to:",
                    panel.id,
                    panel.chat.provider,
                    panel.chat.id,
                )

                try {
                    const response = await SendPrompt(
                        panel.chat.id,
                        panel.chat.provider,
                        sharedPrompt,
                    );
                    const updatedChat = await LoadOneChat(panel.chat.id)

                    //logging again
                    console.log(
                        "Updated chat:",
                        panel.id,
                        updatedChat
                    )

                    console.log("SUCCESS", response)

                    updatePanel(panel.id, updatedChat)

                } catch (error) {
                    console.error(
                        `Failed to send to ${panel.chat.provider}:`, error
                    )
                    showToast(`Failed to send to ${panel.chat.provider}: ${error}`)
                }
            })
        )
    }

    return (
        <div id="aiselection">
            <div className='singleagent-title-container'>
                <div id='Title' className='singleagent-title'>
                    Multi-Agent Selection
                </div>
                <button id='multi-agent-button' onClick={update}>
                        -
                </button>
                <button id='multi-agent-button' onClick={addPanel}>
                        +
                </button>
            </div>
            <div id='multi-agent-container'>
                {panels.map(panel => (
                    <ChatPanel
                        key={panel.id}
                        chat={panel.chat}
                        showInput={!sharedInputMode}
                        onChatUpdated={
                            (updatedChat) => updatePanel(panel.id, updatedChat)
                        }
                    />
                ))}
            </div>
                {sharedInputMode && (
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        sendSharedPrompt();
                    }}>
                        <div id="user-input" className="input-box">
                                <input 
                                    id="name" 
                                    className="input" 
                                    value={sharedPrompt} 
                                    autoComplete="off" 
                                    placeholder={`Message all agents...`} 
                                    name="prompt" 
                                    type="text" 
                                    onChange={
                                        e => setSharedPrompt(e.target.value)
                                    }
                                />
                            <button className="btn" type='submit'><EnterIcon /></button>
                            <Toast 
                                message={toast}
                                visible={toastVisible}
                            />
                        </div>
                    </form>
                )}
        </div>
    )
}