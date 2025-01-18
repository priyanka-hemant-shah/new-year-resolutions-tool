import './App.css';
import Resolutions from './Resolutions';
import bgImageLight from './assests/light.png';
import bgImageDark from './assests/dark.png';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        <h1>My New Year Resolutions</h1>
        <button 
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle dark mode"
        >
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </header>
      <Resolutions />
    </div>
  );
}

export default App;
