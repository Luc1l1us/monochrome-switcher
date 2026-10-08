import { useEffect, useState } from "react"
import HistoryCards from "../components/HistoryCards"
import { DeleteOneChat, ListChats } from "../../wailsjs/go/main/App"
import Toast from "../components/Toast";
import { useToast } from "../components/useToast";

export default function History({handleChatSelected}) {
    const [chats, setChats] = useState([]);
    const [multiChats, setMultiChats] = useState([]);
    const { toast, toastVisible, showToast } = useToast();
    
    const historyItems = [
    ...chats,
    ...multiChats,
    ];

    useEffect(() => {
        ListChats()
            .then(data => {
                console.log("ListChats returned:", data);
                console.log("Is array?", Array.isArray(data));
                console.log("ListChats", data);
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

    function deleteChat(chatID) {
        if (!chatID) {
            console.error("No chatID supplied!")
            showToast(`No chatID supplied!`)
            return;
        }
        console.log("Selected ChatID:", chatID)
        try {
            DeleteOneChat(chatID)
            showToast(`Deleted ${chatID}!`)
        } catch (error) {
            console.error("Failed to delete chat!", error)
            showToast(`Failed to delete chat! Error: ${error}`)
        }
    }
    return (
        <div id="home">
            <div id='Title'>
                History
            </div>
            <div id='home-content'>
                <div className="content-title">
                    <h2>
                        History
                    </h2>
                    <h3 className="smol">
                        Select one of the chats below to view and continue.
                    </h3>
                </div>
                    {chats.length === 0 ? (
                        <div className="empty-history">
                            <h3>No conversations yet</h3>
                            <p>
                                Start a conversation with an AI Agent
                                and it will appear here
                            </p>
                        </div>
                    ) : (
                        <div className="History-container">
                        {historyItems.map(chat => (
                            <HistoryCards
                                key={
                                    chat.agent_state?.mode === "multi"
                                        ? chat.session_id
                                        : chat.id
                                }
                                chat={chat}
                                onClick={handleChatSelected}
                                DeleteChat={deleteChat}
                            />
                        ))}
                        <Toast 
                            message={toast}
                            visible={toastVisible}
                        />
                        </div>
                        
                    )}
            </div>
        </div>
    )
}