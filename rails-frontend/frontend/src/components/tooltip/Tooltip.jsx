import { Tooltip } from "radix-ui";
import "./tooltip.css"

export default function Tip({text, side = "top", children, disabled}) {
    return (
        <Tooltip.Provider delayDuration={300} skipDelayDuration={100}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <span>
                        <button aria-label={text} className="TooltipButton" disabled={disabled}>
                            {children}
                        </button>
                    </span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" side={side} sideOffset={6}>
                            {text}
                        <Tooltip.Arrow className="TooltipArrow"/>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}