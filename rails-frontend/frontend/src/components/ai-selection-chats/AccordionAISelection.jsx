import { Accordion } from "radix-ui";
import AccordionTrigger from "./AccordionTrigger";
import Recentchats from "./Recentchats";

export default function Accordionaiselection({recentChats, onClick}) {
    return (
        <Accordion.Root
            type="single"
            collapsible
            className="accordion-aiselection"
        >
            <Accordion.Item value="ai-selection">
                <Accordion.Header>
                    <AccordionTrigger>
                        AI Selection
                    </AccordionTrigger>
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
