import * as React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import "../style.css";
import * as icons from "../../../../icons"

const SelectDemo = ({selected, onProviderChange}) => (
	<Select.Root
		value={selected}
		onValueChange={onProviderChange}>
		<Select.Trigger className="SelectTrigger" aria-label="Food">
			<Select.Value placeholder="Select an AI/Agent" />
			<Select.Icon className="SelectIcon">
				<ChevronDownIcon />
			</Select.Icon>
		</Select.Trigger>
		<Select.Portal>
			<Select.Content className="SelectContent">
				<Select.ScrollUpButton className="SelectScrollButton">
					<ChevronUpIcon />
				</Select.ScrollUpButton>
				<Select.Viewport className="SelectViewport">
					<Select.Group>
						<Select.Label className="SelectLabel">Cloud AI</Select.Label>
						<SelectItem value="claude" disabled> <img id="claude-icon" src={icons.claude}/> !Claude</SelectItem>
						<SelectItem value="chatgpt" disabled> <img id="chatgpt-icon" src={icons.chatgpt}/> !ChatGPT</SelectItem>
						<SelectItem value="gemini"> <img id="gemini-icon" src={icons.gemini}/>  Gemini</SelectItem>
						<SelectItem value="perplexity" disabled> <img id="gemini-icon" src={icons.perplexity}/> !Perplexity</SelectItem>
						<SelectItem value="grok" disabled> <img id="gemini-icon" src={icons.grok}/> !Grok</SelectItem>
						<SelectItem value="deepseek" disabled> <img id="gemini-icon" src={icons.deepseek}/> !Deepseek</SelectItem>
					</Select.Group>

					<Select.Separator className="SelectSeparator" />

					<Select.Group>
						<Select.Label className="SelectLabel">Local AI</Select.Label>
						<SelectItem value="ollama">Ollama</SelectItem>
						<SelectItem value="carrot" disabled>
							disabled placeholder
						</SelectItem>
					</Select.Group>

					<Select.Separator className="SelectSeparator" />

					<Select.Group>
						<Select.Label className="SelectLabel">Misc</Select.Label>
						<SelectItem value="placeholder">placeholder</SelectItem>
					</Select.Group>
				</Select.Viewport>
				<Select.ScrollDownButton className="SelectScrollButton">
					<ChevronDownIcon />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
);

const SelectItem = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<Select.Item
				className={classnames("SelectItem", className)}
				{...props}
				ref={forwardedRef}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className="SelectItemIndicator">
					<CheckIcon />
				</Select.ItemIndicator>
			</Select.Item>
		);
	},
);

export default SelectDemo;
