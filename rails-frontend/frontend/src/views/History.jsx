import { useEffect, useState } from "react"
import HistoryCards from "../components/HistoryCards"
import { DeleteOneChat, ListChats, LoadOneChat } from "../../wailsjs/go/main/App"
import Toast from "../components/Toast";
import { useToast } from "../components/useToast";

export default function History({onChatSelected}) {
    const [chats, setChats] = useState([])
    const { toast, toastVisible, showToast } = useToast();
    
    useEffect(() => {
        ListChats()
            .then(data => {
                console.log(data);
                setChats(data || []);
        })
            .catch(error => {
                console.error("Failed to list chats: ", error)
                setChats([])
            })
    }, []);

    async function switchChat(chatID) {
        if (!chatID) {
            console.error("No chatID supplied!")
            return;
        }
        console.log("switchChat received:", chatID);
        try {
            const chat = await LoadOneChat(chatID)

            console.log("Loaded Chat:", chat);

            if (!chat) {
                console.error("No chat returned!")
                return;
            }
            console.log("Calling onChatSelected with:", chat)
            onChatSelected(chat)
        } catch(error) {
            console.error("Failed to load chat:", error)
        }
    }

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
                        {chats.map(chat => (
                            <HistoryCards
                                key={chat.id}
                                chat={chat}
                                onClick={switchChat}
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