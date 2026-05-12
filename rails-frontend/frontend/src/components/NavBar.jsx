
export default function NavBar({setSelectedPanel}) {
    return (
        <div id="firstcolumn-container">
            <div id='navi'>
                MonoSwitch
                <div className='top-nav'>
                    <button className="nav-button" onClick={() => setSelectedPanel("home")}>
                        Home
                    </button>
                    <button className="nav-button" onClick={() => setSelectedPanel("aiselection")}>
                        AI Selection
                    </button>
                    <button className="nav-button" onClick={() => setSelectedPanel("history")}>
                        History
                    </button>
                </div>
                <div className='bottom-nav'>
                    <div className="nav-button">
                        Settings
                    </div>
                    <div className="nav-button">
                        About
                    </div>
                    <div className="nav-button">
                        FAQ
                    </div>
                </div>
            </div>
            <div id='avatar'>
                TEST
            </div>
        </div>
    );
}
