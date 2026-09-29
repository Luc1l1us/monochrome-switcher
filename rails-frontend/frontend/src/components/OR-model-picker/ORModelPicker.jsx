import { useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import "./ModelPicker.css";
export default function ORModelPicker({
    models, selectedModel, onSelectModel, onOpenChange,
}) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")

    const filteredModels = useMemo(() => {
        const search = query.trim().toLowerCase();

        if (!search) return [];
        return models
            .filter((model) => {
                const name = model.name?.toLowerCase() ?? "";
                const id = model.id?.toLowerCase() ?? "";

                return name.includes(search) || id.includes(search)
            })
            .slice(0,15)
    }, [models, query])

    return (
        <Popover.Root open={open} onOpenChange={onOpenChange}>
            <Popover.Trigger asChild>
                <button type="button" className="model-picker-trigger">
                    {selectedModel?.name ?? "Choose a model"}
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    className="model-picker"
                    sideOffset={6}
                    align="start"
                >
                    <div className="model-picker-searchwrapper">
                        <input
                            className="model-picker-search"
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search models..."
                            autoComplete="off"
                            autoFocus
                        />
                        {query && (
                            <button 
                                type="button"
                                className="model-picker-clear"
                                onClick={() => setQuery("")}
                                aria-label="Clear search">
                            x
                            </button>
                        )}
                    </div>
                    <div className="model-results">
                        {!query.trim() ? (
                            <p>Start typing to search models.</p>
                        ) : filteredModels.length === 0 ? (
                            <p>No models found.</p>
                        ) : (
                            filteredModels.map((model) => (
                                <button
                                    type="button"
                                    key={model.id}
                                    className="model-result"
                                    onClick={() => {
                                        onSelectModel(model);
                                        setQuery("")
                                        setOpen(false)
                                    }}
                                >       
                                    <span>{model.name || model.id}</span>
                                    {model.name && (
                                        <small>{model.id}</small>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
