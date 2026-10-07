import * as icons from "../../../../icons"
import { CaretDownIcon } from "@radix-ui/react-icons";
import Recentchats from "./ai-selection-chats/Recentchats";
import { useState, useEffect } from "react";
import { ListChats } from "../../wailsjs/go/main/App";


export default function NavBar({setSelectedPanel}) {
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
                        Home
                    </button>
                    {/* AI Selection should be renamed with the previous AI Agent convo */}
                    <button className="nav-button" onClick={
                            () => setSelectedPanel("singleagent")
                        }>
                        AI Selection <CaretDownIcon/>
                        {chatItems.map(chat => (
                            <Recentchats
                                key={
                                    chat.agent_state?.mode === "multi"
                                        ? chat.session_id
                                        : chat.id
                                }
                                chat={chat}/>
                            ))
                        }
                    </button>
                    <button className="nav-button" onClick={() => setSelectedPanel("history")}>
                        History
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
