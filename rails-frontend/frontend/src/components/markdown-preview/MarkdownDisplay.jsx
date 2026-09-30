import * as React from "react"
import ReactMarkdown from "react-markdown"
import "./Markdown.css"

export default function MarkdownDisplay({prompt}) {
    return (
        <div id="user-input" className="input-box">
            <div className="inputcombo">
                <div className="markdown-display">
                    <div className="text">
                        <ReactMarkdown>
                            {prompt}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}