import {useEffect, useState} from 'react';
import SelectDemo from '../components/aiselection';
import MessengerContainer from '../components/MSC';
import ChatPanel from '../components/ChatPanel';
import {EnterIcon} from "@radix-ui/react-icons";
import {CreateChat, Greet, LoadOneChat, SendPrompt} from "../../wailsjs/go/main/App";
import * as icons from "../../../../icons"
import {MultiAgent} from '../views';

export default function SingleAgent({setSelectedPanel, chat, onChatUpdated}) {    
    return (
        <div id="aiselection">
            <div className='singleagent-title-container'>
                <div id='Title' className='singleagent-title'>
                    AI Selection
                </div>
                <button id='multi-agent-button' onClick={() => setSelectedPanel("multiagent")}>
                    +
                </button>
            </div>
            <ChatPanel
                chat={chat}
                onChatUpdated={onChatUpdated}
                showInput={true}
            />
        </div>
    )
}