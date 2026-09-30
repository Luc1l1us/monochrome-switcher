import { ArrowUpIcon, PauseIcon } from "@radix-ui/react-icons";
import {useEffect, useRef} from 'react';
import "./Markdown.css"

export default function PromptInput({prompt, selected, updatePrompt, handleKeyDown, isLoading}) {
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
                        placeholder={`Message ${selected}`}
                        onChange={updatePrompt}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className={`btn ${isLoading ? "loading" : ""}`}
                        type="submit"
                    >
                        {isLoading ? (
                            <PauseIcon className="icon"/>
                        ) : (
                            <ArrowUpIcon className="icon"/>
                        )}
                    </button>
                </div>
        </div>
    )
}