import { useState } from "react"

export default function Home({setSelectedPanel}) {
    const [panel, setPanels] = useState([])

    function addAgentPanel() {
        setPanels(prev => [
            ...prev,
            {
                id: crypto.randomUUID()
            }
        ])
    }
    return (
        <div id="home">
            <div id='Title'>
                Dashboard
            </div>
            <div id='home-content'>
                <div className="content-title">
                    <h2>
                        What would you like to do today?
                    </h2>
                    <h3 className="smol">
                        Select one of the cards below to continue.
                    </h3>
                </div>
                <div id='content-cards'>
                    <button className='card' onClick={() => {
                        setSelectedPanel("multiagent")
                        addAgentPanel()
                        }}>
                        Start a new multi-agent chat
                    </button>
                    <button className='card'>
                        Continue Working
                    </button>
                    <button className='card'>
                        Usage Statistics
                    </button>
                </div>
            </div>
        </div>
    )
}