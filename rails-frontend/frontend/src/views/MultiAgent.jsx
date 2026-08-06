import {useState} from 'react';
import SelectDemo from '../components/aiselection';
//import sendPromptnAgent from './SingleAgent';
import {EnterIcon} from "@radix-ui/react-icons";
import {Greet, SendPrompt} from "../../wailsjs/go/main/App";
import * as icons from "../../../../icons"
import ChatPanel from '../components/ChatPanel';

export default function MultiAgent({chat, onChatUpdated}) {

    const [panels, setPanels] = useState([
        {
            id: crypto.randomUUID(),
            chat: null,
        }
    ])

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

    return (
        <div id="aiselection">
            <div className='singleagent-title-container'>
                <div id='Title' className='singleagent-title'>
                    Multi-Agent Selection
                </div>
                <button id='multi-agent-button' onClick={addPanel}>
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
                        onChatUpdated={
                            (updatedChat) => updatePanel(panel.id, updatedChat)
                        }
                    />
                ))}
            </div>
        </div>
    )
}