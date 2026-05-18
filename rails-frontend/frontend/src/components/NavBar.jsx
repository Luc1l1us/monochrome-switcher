
export default function NavBar({setSelectedPanel}) {
    return (
        <div id="firstcolumn-container">
            <div id='navi'>
                MonoSwitch
                <div className='top-nav'>
                    <button className="nav-button" onClick={() => setSelectedPanel("home")}>
                        Home
                    </button>
                    <button className="nav-button" onClick={() => setSelectedPanel("singleagent")}>
                        AI Selection
                    </button>
                    <button className="nav-button" onClick={() => setSelectedPanel("history")}>
                        History
                    </button>
                </div>
                <div className='bottom-nav'>
                    <button className="nav-button" onClick={() => setSelectedPanel("settings")}>
                        Settings
                    </button>
                    <button className="nav-button" onClick={() => setSelectedPanel("about")}>
                        About
                    </button>
                    <button className="nav-button" onClick={() => setSelectedPanel("faq")}>
                        FAQ
                    </button>
                </div>
            </div>
            <div id='avatar'>
                TEST
            </div>
        </div>
    );
}
