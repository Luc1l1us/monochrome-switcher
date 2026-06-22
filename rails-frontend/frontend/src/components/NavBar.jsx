import * as icons from "../../../../icons"

export default function NavBar({setSelectedPanel}) {
    return (
        <div id="firstcolumn-container">
            <div id='navi'>
                MonoSwitch
                <div className='top-nav'>
                    <button className="nav-button" onClick={() => setSelectedPanel("home")}>
                        Home
                    </button>
                    {/* AI Selection should be renamed with the previous AI Agent convo */}
                    <button className="nav-button" onClick={() => setSelectedPanel("singleagent")}>
                        AI Selection
                    </button>
                    <button className="nav-button" onClick={() => setSelectedPanel("history")}>
                        History
                    </button>
                </div>
                <div className='bottom-nav'>
                    <button className="nav-button" onClick={() => setSelectedPanel("settings")}>
                        {/* Settings */}
                        <img id="nav-settings" src={icons.settingsicon}></img>
                    </button>
                </div>
            </div>
            <div id='avatar'>
                TEST
            </div>
        </div>
    );
}
