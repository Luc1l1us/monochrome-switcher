import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import NavBar from './components/NavBar';
import { About, AISelectionScreen, FAQ, History, Home, Settings } from './views';

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
                        {selectedPanel === "history" &&  <History />}
                        {selectedPanel === "about" &&  <About />}
                        {selectedPanel === "faq" &&  <FAQ />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
