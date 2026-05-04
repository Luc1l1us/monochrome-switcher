import * as React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import "./style.css";
import geminiIcon from "./assets/images/gemini_icon.png"
import chatgptIcon from "./assets/images/chatgpt_icon.png"
import claudeIcon from "./assets/images/claude_icon.png"

const SelectDemo = ({onValueChange}) => (
	<Select.Root onValueChange={onValueChange}>
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
						<SelectItem value="claude" disabled> <img id="claude-icon" src={claudeIcon}/> !Claude</SelectItem>
						<SelectItem value="chatgpt" disabled> <img id="chatgpt-icon" src={chatgptIcon}/> !ChatGPT</SelectItem>
						<SelectItem value="gemini"> <img id="gemini-icon" src={geminiIcon}/>  Gemini</SelectItem>
						<SelectItem value="placeholder">placeholder</SelectItem>
						<SelectItem value="placeholder">placeholder</SelectItem>
					</Select.Group>

					<Select.Separator className="SelectSeparator" />

					<Select.Group>
						<Select.Label className="SelectLabel">Local AI</Select.Label>
						<SelectItem value="ollama">Ollama</SelectItem>
						<SelectItem value="placeholder">placeholder</SelectItem>
						<SelectItem value="carrot" disabled>
							disabled placeholder
						</SelectItem>
						<SelectItem value="placeholder">placeholder</SelectItem>
					</Select.Group>

					<Select.Separator className="SelectSeparator" />

					<Select.Group>
						<Select.Label className="SelectLabel">placeholder</Select.Label>
						<SelectItem value="placeholder">placeholder</SelectItem>
						<SelectItem value="placeholder">placeholder</SelectItem>
						<SelectItem value="placeholder">placeholder</SelectItem>
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
