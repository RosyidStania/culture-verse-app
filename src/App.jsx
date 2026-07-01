import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  
  // GLOBAL AUDIO STATE
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const audioRef = useRef(null);

  const getMusicForProvince = (province) => {
    if (!province) return '/music/main-theme.mp3';
    
    const sumatera = ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi', 'Sumatera Selatan', 'Kepulauan Bangka Belitung', 'Bengkulu', 'Lampung'];
    const jawa = ['DKI Jakarta', 'Jawa Barat', 'Banten', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur'];
    const kalimantan = ['Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara'];
    const sulawesi = ['Sulawesi Utara', 'Gorontalo', 'Sulawesi Tengah', 'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tenggara'];
    const baliNusra = ['Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur'];
    
    if (sumatera.includes(province)) return '/music/sumatera.mp3';
    if (jawa.includes(province)) return '/music/jawa.mp3';
    if (kalimantan.includes(province)) return '/music/kalimantan.mp3';
    if (sulawesi.includes(province)) return '/music/sulawesi.mp3';
    if (baliNusra.includes(province)) return '/music/bali-nusra.mp3';
    
    return '/music/papua-maluku.mp3';
  };

  // Initialize and attempt autoplay
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(getMusicForProvince(null));
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
      
      const playAudio = async () => {
        try {
          await audioRef.current.play();
          setIsAudioPlaying(true);
        } catch (err) {
          console.log("Autoplay prevented by browser, waiting for user interaction.", err);
        }
      };
      
      playAudio();
    }
    
    // Fallback: start playing on first interaction if autoplay failed
    const handleFirstInteraction = () => {
      // Periksa apakah audio belum dimainkan (baik state maupun elemen aslinya)
      if (audioRef.current && audioRef.current.paused && !isAudioPlaying) {
        audioRef.current.play().then(() => {
          setIsAudioPlaying(true);
        }).catch(console.error);
      }
      // Hapus listener setelah interaksi pertama
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  // Handle province change
  useEffect(() => {
    if (audioRef.current) {
      const newSrc = getMusicForProvince(selectedProvince);
      if (!audioRef.current.src.endsWith(newSrc)) {
        audioRef.current.src = newSrc;
        if (isAudioPlaying) {
          audioRef.current.play().catch(console.error);
        }
      }
    }
  }, [selectedProvince, isAudioPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="w-full min-h-screen bg-retro-dark">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <LandingPage key="landing" onEnter={() => setCurrentPage('map')} />
        ) : (
          <MapPage 
            key="map" 
            isAudioPlaying={isAudioPlaying}
            toggleAudio={toggleAudio}
            setSelectedProvince={setSelectedProvince}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;