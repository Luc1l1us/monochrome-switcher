import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import NavBar from './components/NavBar';
import Settings from './Settings';
import Home from './Home';
import AISelectionScreen from './AISelectionScreen';

function App() {
    //switching views
    const [selectedPanel, setSelectedPanel] = useState("home")

    return (
        <div id="App">
            <div className='container'>
                <NavBar setSelectedPanel={setSelectedPanel} />
                <div id="secondcolumn">
                    <div id='content'>
                        {selectedPanel === "home" && <Home />}
                        {selectedPanel === "settings" &&  <Settings />}
                        {selectedPanel === "aiselection" &&  <AISelectionScreen />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
