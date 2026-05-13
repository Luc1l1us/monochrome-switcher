export default function Home() {
    return (
        <div id="home-content">
            <div className="content-title">
                <h2>
                    What would you like to do today?
                </h2>
                <h3>
                    Select one of the cards below to continue.
                </h3>
            </div>
            <div id='content-cards'>
                <div className='card'>
                    Start a new multi-agent chat
                </div>
                <div className='card'>
                    Use a template
                </div>
                <div className='card'>
                    Continue where I left off
                </div>
            </div>
        </div>
    )
}