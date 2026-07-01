import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/InteractiveMap';

export default function MapPage() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Auto-play audio when entering the map page
  useEffect(() => {
    // Create audio instance if it doesn't exist
    if (!audioRef.current) {
      // Menggunakan musik epik cinematic dari Kevin MacLeod
      audioRef.current = new Audio('https://incompetech.com/music/royalty-free/mp3-royaltyfree/Epic%20Unease.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsAudioPlaying(true);
      } catch (err) {
        console.log("Audio autoplay prevented by browser. User needs to interact first.", err);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative w-full h-screen bg-retro-dark text-retro-cream overflow-hidden flex flex-col bg-grain"
    >
      {/* Header Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full p-6 z-40 flex justify-between items-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <h2 className="font-heading text-xl md:text-2xl text-retro-gold uppercase tracking-[0.2em] opacity-80">
            Jejak Nusantara
          </h2>
          <p className="font-body text-xs text-retro-cream/50 tracking-widest mt-1 uppercase">
            Pilih provinsi untuk membuka arsip
          </p>
        </div>

        {/* Audio Toggle */}
        <button 
          onClick={toggleAudio}
          className="pointer-events-auto w-10 h-10 rounded-full border border-retro-gold/30 flex items-center justify-center bg-retro-dark/50 backdrop-blur-sm transition-all hover:border-retro-gold hover:bg-retro-gold/10"
          title={isAudioPlaying ? "Matikan Suara" : "Nyalakan Suara"}
        >
          {isAudioPlaying ? (
            <svg className="w-4 h-4 text-retro-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-retro-gold/50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </button>
      </motion.div>

      {/* Main Map Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full h-full pt-16">
        <InteractiveMap />
      </main>
      
      {/* Subtle bottom vignette */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-retro-dark to-transparent pointer-events-none z-20" />
    </motion.div>
  );
}
