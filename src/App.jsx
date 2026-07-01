import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="w-full min-h-screen bg-retro-dark">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <LandingPage key="landing" onEnter={() => setCurrentPage('map')} />
        ) : (
          <MapPage key="map" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;