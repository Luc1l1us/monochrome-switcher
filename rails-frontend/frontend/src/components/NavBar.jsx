import * as icons from "../../../../icons"
import { useState, useEffect } from "react";
import { ListChats } from "../../wailsjs/go/main/App";
import Accordionaiselection from "./ai-selection-chats/AccordionAISelection";
import { HomeIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
export default function NavBar({setSelectedPanel, onClick}) {
    const [chats, setChats] = useState([]);
    const [multiChats, setMultiChats] = useState([]);
    
    const chatItems = [
        ...chats,
        ...multiChats,
    ]

    //listchats here
    useEffect(() => {
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
    }, []);
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
                    />
                    <button className="nav-button" onClick={() => setSelectedPanel("history")}>
                        <CountdownTimerIcon/> History
                    </button>
                </div>
                <div className='bottom-nav'>
                    <button className="nav-button" onClick={() => setSelectedPanel("settings")}>
                        {/* Settings */}
                        <img id="nav-settings" src={icons.settingsicon}></img>
                    </button>
                </div>
            </div>
        </div>
    );
}
