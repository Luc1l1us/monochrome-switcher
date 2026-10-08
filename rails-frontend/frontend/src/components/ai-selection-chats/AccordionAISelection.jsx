import { Accordion } from "radix-ui";
import Recentchats from "./Recentchats";
import { CaretDownIcon } from "@radix-ui/react-icons";

export default function Accordionaiselection({recentChats, onClick}) {
    return (
        <Accordion.Root
            type="single"
            collapsible
            className="accordion-aiselection"
        >
            <Accordion.Item value="ai-selection">
                <Accordion.Header>
                    <Accordion.Trigger className="nav-ai-selection">
                        <span className="nav-button">
                            AI Selection
                            <CaretDownIcon/>
                        </span>
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="recent-chats-container">
                    {recentChats.map(chat => (
                        <Recentchats
                            key={chat.id || chat.session_id}
                            chat={chat}
                            onClick={onClick}
                        />
                        ))
                    }
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )
}
