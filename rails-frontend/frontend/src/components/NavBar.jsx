import * as icons from "../../../../icons"
import { useState, useEffect, useCallback } from "react";
import { ListChats } from "../../wailsjs/go/main/App";
import Accordionaiselection from "./ai-selection-chats/AccordionAISelection";
import { HomeIcon, CountdownTimerIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { EventsOn } from "../../wailsjs/runtime/runtime";
export default function NavBar({setSelectedPanel, onClick}) {
    const [chats, setChats] = useState([]);
    const [multiChats, setMultiChats] = useState([]);
    
    const chatItems = [
        ...chats,
        ...multiChats,
    ]

    //listchats here
    const refreshChats = useCallback(() => {
        ListChats()
            .then(data => {
            console.log("ListChats returned:", data);
            setChats(data?.chats ?? []);
            setMultiChats(data?.multiChats ?? []);
        })
            .catch(error => {
            console.error("Failed to list chats: ", error)
            showToast(`Failed to list chats, error: ${error}`)
            setChats([])
            setMultiChats([])
        })
    }, [])
    useEffect(() => {
        refreshChats();
        const cancel = EventsOn("chat:title-updated", (data) => {
            console.log("Refreshing chats after title update:", data);
            refreshChats();
        })
        return () => cancel();
    }, [refreshChats]);

    return (
        <div id="firstcolumn-container">
            <div id='navi'>
                MonoSwitch
                <div className='top-nav'>
                    <button className="nav-button" onClick={() => setSelectedPanel("home")}>
                        <HomeIcon/> Home
                    </button>
                    {/* AI Selection should be renamed with the previous AI Agent convo */}
                    <Accordionaiselection 
                        recentChats={chatItems}
                        onClick={onClick}
                        setSelectedPanel={setSelectedPanel}
                    />
                    <button className="nav-button" onClick={() => setSelectedPanel("history")}>
                        <CountdownTimerIcon/> History
                    </button>
                </div>
                <div className='bottom-nav'>
                    <button className="nav-button" onClick={() => setSelectedPanel("settings")}>
                        <MixerHorizontalIcon/> Settings
                        {/* <img id="nav-settings" src={icons.settingsicon}></img> */}
                    </button>
                </div>
            </div>
        </div>
    );
}
