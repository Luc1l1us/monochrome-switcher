import { ArrowUpIcon, PauseIcon, CircleBackslashIcon } from "@radix-ui/react-icons";
import {useEffect, useRef} from 'react';
import Tip from "../tooltip/Tooltip";
import "./Markdown.css"

export default function PromptInput({prompt, selected, updatePrompt, handleKeyDown, isLoading, disabled}) {
    const textareaRef = useRef(null);
    function resizeTexture() {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
    }
    useEffect(() => {
        if (!isLoading && textareaRef.current) {
            textareaRef.current.style.height = "30px";
        }
    }, [isLoading])
    useEffect(() => {
        resizeTexture();
    }, [prompt])
    return (
        <div id="user-input" className="input-box">
                <div className="inputcombo">
                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        placeholder={disabled ? `Select an available model to continue...` : `Message ${selected}`}
                        onChange={updatePrompt}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                    />
                    <button
                        className={`btn ${isLoading ? "loading" : disabled ? "loading" : ""}`}
                        type="submit"
                    >
                    {isLoading ? (
                        <Tip 
                            text={`Pause AI`}
                        >
                            <PauseIcon className="icon"/>
                        </Tip>
                    ) : disabled ? (
                        <Tip 
                            text={`Unavailable Model`}
                            disabled={disabled}
                        >
                            <CircleBackslashIcon className="icon"/>
                        </Tip>
                    ) : (
                        <Tip 
                            text={`Send Prompt`}
                        >
                            <ArrowUpIcon className="icon"/>
                        </Tip>
                    )}
                    </button>
                </div>
        </div>
    )
}