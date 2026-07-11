import { useEffect, useState } from "react"
import HistoryCards from "../components/HistoryCards"
import { ListChats, LoadOneChat } from "../../wailsjs/go/main/App"

export default function History() {

    const [chatID, setChatID] = useState("");
    const [chats, setChats] = useState([])
    const [conversation, setConversation] = useState([])
    
    useEffect(() => {
        ListChats().then(data => {
            console.log(data);
            setChats(data);
        });
    }, []);

    async function switchChat(chatID) {
        const history = await LoadOneChat(chatID)
        setChatID(chatID)
        setConversation(history)
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
                <div id='content-cards'>
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