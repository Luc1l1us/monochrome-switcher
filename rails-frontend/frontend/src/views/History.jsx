import { useEffect, useState } from "react"
import HistoryCards from "../components/HistoryCards"
import { ListChats, LoadOneChat } from "../../wailsjs/go/main/App"

export default function History({onChatSelected}) {

    const [chatID, setChatID] = useState("");
    const [chats, setChats] = useState([])
    const [conversation, setConversation] = useState([])
    const [selected, setSelected] = useState('');
    
    useEffect(() => {
        ListChats().then(data => {
            console.log(data);
            setChats(data);
        });
    }, []);

    async function switchChat(chatID) {
        console.log("switchChat received:", chatID);
        try {
            const chat = await LoadOneChat(chatID)

            console.log("Loaded Chat:", chat);

            onChatSelected(chat)
/*             setChatID(chat.id)
            setConversation(chat.messages)
            setSelected(chat.provider) */
        } catch(error) {
            console.error("Failed to load chat:", error)
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
                <div className="History-container">
                    {chats.map(chat => (
                        <HistoryCards
                            key={chat.id}
                            chat={chat}
                            onClick={switchChat}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}