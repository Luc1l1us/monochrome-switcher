import * as React from "react"
import {Tabs} from "radix-ui"
import PromptInput from "./PromptInput";
import MarkdownDisplay from "./MarkdownDisplay";
import "./Markdown.css"

export default function PromptComposer({prompt, selected, updatePrompt, handleKeyDown, isLoading}) {
    return (
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
                <Tabs.Trigger className="TabsTrigger" value="tab1">
                    Write
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab2">
                    Preview
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
                <PromptInput
                    prompt={prompt}
                    selected={selected}
                    updatePrompt={updatePrompt}
                    handleKeyDown={handleKeyDown}
                    isLoading={isLoading}
                />
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
                <MarkdownDisplay 
                    prompt={prompt}
                />
            </Tabs.Content>
	    </Tabs.Root>
    );
}
