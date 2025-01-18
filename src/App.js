import './App.css';
import Resolutions from './Resolutions';
import bgImageLight from './assets/light.png';
import bgImageDark from './assets/dark.png';
import dpImage from './assets/dp.png'; // Add your DP image here
import { useState, useRef } from 'react';
import music from './assets/music1.mp3';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isMusicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicOn(!isMusicOn);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`} style={{ 
      backgroundImage: `url(${isDarkMode ? bgImageDark : bgImageLight })`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
      <div className="glassmorphic-overlay" />
      <header className="app-header">
        <div className="header-left">
          <img src={dpImage} alt="DP" className="dp-image" />
        </div>
        <div className="header-center">
          <h1>My New Year Resolutions</h1>
        </div>
        <div className="header-right">
          <button 
            className="music-toggle"
            onClick={toggleMusic}
            aria-label="Toggle music"
            title={isMusicOn ? "Turn off music" : "Turn on music"}
          >
            <i className={`fas ${isMusicOn ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
          </button>
          <button 
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>
      </header>
      <Resolutions />
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
