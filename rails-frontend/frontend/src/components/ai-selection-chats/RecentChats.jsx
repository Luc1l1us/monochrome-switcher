import * as icons from "../../../../../icons"
import { ListChats } from "../../../wailsjs/go/main/App"
import Toast from "../Toast";
import { useToast } from "../useToast";
import "./aiselectionchats.css"
import ColoredBadge from "../badge/ColoredBadge";
import { useState, useEffect } from "react";


export default function RecentChats() {
    const [chats, setChats] = useState([]);
    const [multiChats, setMultiChats] = useState([]);
    const { toast, toastVisible, showToast } = useToast();
    
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
    console.log("Data is here: ", data)
    return (
        <div className="ai-selection-chats">
            <ColoredBadge
                children={chats.agent_state?.mode}
                state={chats.agent_state?.mode}
                />
            <Toast 
                message={toast}
                visible={toastVisible}
            />
        </div>
    )
}