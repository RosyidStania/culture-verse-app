import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { defaultPhotos, provinceData } from '../data/culturalData';

const geoUrl = "/indonesia.json";

export default function InteractiveMap({ onProvinceChange }) {
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // State 1: Provinsi yang dipilih dari Peta (Memicu Meja Arsip)
  const [selectedProvince, setSelectedProvince] = useState(null);

  // Notify parent when province changes
  useEffect(() => {
    if (onProvinceChange) {
      onProvinceChange(selectedProvince);
    }
  }, [selectedProvince, onProvinceChange]);
  
  // State 2: Foto yang diklik dari Meja Arsip (Memicu Layar Penuh/Immersive)
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // State & Ref untuk Auto-Scroll
  const scrollContainerRef = useRef(null);
  const storyRefs = useRef([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(-1);

  // Track mouse for tooltip
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fungsi menutup Meja Arsip (kembali ke Peta)
  const handleCloseDesk = () => {
    setSelectedProvince(null);
    setSelectedPhoto(null);
  };

  // Fungsi menutup Layar Penuh (kembali ke Meja Arsip)
  const handleCloseImmersive = () => {
    setSelectedPhoto(null);
    setIsAutoScrolling(true); // reset auto-scroll
    setCurrentStoryIndex(-1);
  };

  useEffect(() => {
    let intervalId;
    if (selectedPhoto && isAutoScrolling) {
      intervalId = setInterval(() => {
        setCurrentStoryIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // Pastikan index tidak melebihi panjang cerita
          if (nextIndex < selectedPhoto.story.length) {
            const el = storyRefs.current[nextIndex];
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return nextIndex;
          } else {
            // Jika sudah di akhir, matikan auto-scroll
            setIsAutoScrolling(false);
            return prevIndex;
          }
        });
      }, 5000); // Ganti layar setiap 5 detik
    }

    return () => clearInterval(intervalId);
  }, [selectedPhoto, isAutoScrolling]);

  return (
    <div className="relative w-full max-w-6xl aspect-[16/9] flex items-center justify-center perspective-1000">
      
      {/* Tooltip for Map */}
      <AnimatePresence>
        {hoveredProvince && !selectedProvince && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 pointer-events-none bg-retro-dark/80 backdrop-blur-md px-4 py-2 border border-retro-gold/50 text-retro-gold font-heading tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            style={{ 
              left: mousePos.x + 20, 
              top: mousePos.y + 20,
              transform: "translate(0, 0)" 
            }}
          >
            {hoveredProvince}
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          LAYER 0: PETA INTERAKTIF
          ========================================= */}
      <motion.div
        initial={{ scale: 1.1, y: 30, opacity: 0, filter: "blur(10px)" }}
        animate={{
          scale: selectedProvince ? 0.8 : 1,
          y: 0,
          opacity: selectedProvince ? 0.15 : 1,
          filter: selectedProvince ? "grayscale(100%) blur(4px)" : "grayscale(0%) blur(0px)"
        }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-0 w-full h-full flex items-center justify-center z-0"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 1200, center: [118, -2] }}
          className="w-full h-full outline-none"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const provinceName = geo.properties.name || "Provinsi";
                const isHovered = hoveredProvince === provinceName;
                const isSelected = selectedProvince === provinceName;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (!selectedProvince) setSelectedProvince(provinceName);
                    }}
                    onMouseEnter={() => setHoveredProvince(provinceName)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    style={{
                      default: {
                        fill: isSelected ? 'var(--color-retro-gold)' : 'var(--color-retro-brown)',
                        stroke: 'var(--color-retro-gold)',
                        strokeWidth: 0.5,
                        outline: 'none',
                        transition: 'all 0.4s ease',
                        filter: isSelected ? 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))' : 'none'
                      },
                      hover: {
                        fill: 'var(--color-retro-gold)',
                        stroke: 'var(--color-retro-cream)',
                        strokeWidth: 1,
                        outline: 'none',
                        cursor: selectedProvince ? 'default' : 'pointer',
                        filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.8))'
                      },
                      pressed: { outline: 'none' }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </motion.div>

      {/* =========================================
          LAYER 1: MEJA ARSIP (Muncul saat peta diklik)
          ========================================= */}
      <AnimatePresence>
        {selectedProvince && !selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10 pointer-events-auto flex items-center justify-center"
          >
            {/* Tombol Kembali ke Peta */}
            <button 
              onClick={handleCloseDesk}
              className="absolute top-4 right-4 z-50 px-4 py-2 border border-retro-gold/50 text-retro-gold font-heading text-sm tracking-widest uppercase hover:bg-retro-gold hover:text-retro-dark transition-colors"
            >
              Tutup Arsip
            </button>

            {/* Label Folder Air / Judul Provinsi */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full"
            >
              <h2 className="font-heading text-5xl md:text-8xl text-retro-cream/80 opacity-40 uppercase tracking-[0.2em] mix-blend-overlay">
                {selectedProvince}
              </h2>
            </motion.div>

            {/* Hamburan Foto Polaroid */}
            <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center">
              {(provinceData[selectedProvince] || defaultPhotos).map((photo, index) => (
                <motion.div
                  key={`photo-${photo.id}`}
                  onClick={() => setSelectedPhoto(photo)}
                  className="absolute w-44 md:w-56 lg:w-64 p-3 md:p-4 pb-10 md:pb-12 cursor-pointer group paper-texture"
                  style={{ left: photo.left, top: photo.top }}
                  initial={{ y: "-100vh", opacity: 0, rotate: 0 }}
                  animate={{ y: 0, opacity: 1, rotate: photo.rotate }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 14, stiffness: 80, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 0, 
                    zIndex: 50,
                    boxShadow: "0px 25px 50px rgba(0,0,0,0.8)"
                  }}
                >
                  {/* Efek Solasi Kertas */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 md:w-16 h-4 md:h-6 bg-retro-cream/40 backdrop-blur-sm rotate-2 shadow-sm" />

                  {/* Area Klise Foto */}
                  <div className="w-full aspect-square bg-retro-dark flex items-center justify-center overflow-hidden border border-retro-brown/20 relative shadow-inner">
                    {/* Preview Gambar */}
                    <img src={photo.bgImage} className="w-full h-full object-cover opacity-70 filter sepia-[0.3] grayscale-[0.8] contrast-125 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700" alt="Preview" />
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-retro-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  </div>
                  
                  {/* Teks Tulisan Tangan */}
                  <div className="absolute bottom-2 md:bottom-3 left-0 w-full text-center px-2 md:px-4">
                    <p className="font-handwriting text-retro-dark text-xl md:text-2xl lg:text-3xl leading-tight font-bold drop-shadow-sm">
                      {photo.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          LAYER 2: LAYAR PENUH IMMERSIVE (Muncul saat foto diklik)
          ========================================= */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Custom cubic-bezier untuk transisi super mulus ala Apple
            className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden bg-retro-dark pointer-events-auto scroll-smooth"
            ref={scrollContainerRef}
            onWheel={() => setIsAutoScrolling(false)}
            onTouchMove={() => setIsAutoScrolling(false)}
          >
            {/* Latar Belakang Paralaks */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <motion.img 
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 5, ease: "easeOut" }}
                src={selectedPhoto.bgImage} 
                alt={selectedPhoto.title} 
                className="w-full h-full object-cover opacity-20 mix-blend-luminosity filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-retro-dark via-retro-brown/40 to-retro-dark" />
            </div>

            {/* Tombol Kontrol Kanan Atas */}
            <div className="fixed top-8 right-8 z-50 flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className="px-6 py-3 text-retro-gold font-heading text-xs md:text-sm tracking-[0.2em] uppercase hover:text-retro-cream transition-colors bg-retro-dark/50 backdrop-blur-md rounded-full border border-retro-gold/30 flex items-center justify-center gap-3"
              >
                Auto-Scroll <span className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-[#50C878] animate-pulse shadow-[0_0_8px_#50C878]' : 'bg-red-900'}`} />
              </button>
              <button 
                onClick={handleCloseImmersive}
                className="px-6 py-3 text-retro-gold font-heading text-xs md:text-sm tracking-[0.2em] uppercase hover:text-retro-cream transition-colors group bg-retro-dark/50 backdrop-blur-md rounded-full border border-retro-gold/30 flex items-center justify-center gap-2"
              >
                <span className="inline-block transition-transform group-hover:-translate-x-2">←</span> Tutup Kisah
              </button>
            </div>

            {/* Kontainer Cerita (Bisa di-scroll) */}
            <div className="relative z-10 min-h-[250vh] flex flex-col items-center pt-[35vh] px-4 sm:px-12">
              
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="font-heading text-4xl md:text-6xl lg:text-8xl text-retro-gold text-center uppercase tracking-[0.15em] mb-4 drop-shadow-2xl"
              >
                {selectedPhoto.title}
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="font-heading text-retro-cream/50 text-xs tracking-[0.3em] uppercase mt-16 animate-pulse flex flex-col items-center gap-4"
              >
                <span>Gulir ke bawah</span>
                <div className="w-[1px] h-16 bg-retro-cream/30" />
              </motion.div>

              {/* Teks Paralaks */}
              <div className="mt-[40vh] flex flex-col items-center gap-[50vh] pb-[30vh]">
                {selectedPhoto.story.map((item, index) => {
                  const text = typeof item === 'string' ? item : item.text;
                  const images = typeof item === 'string' ? null : item.images;

                  return (
                    <motion.div
                      key={index}
                      ref={(el) => (storyRefs.current[index] = el)}
                      initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`relative flex flex-col items-center w-full max-w-7xl px-4 md:px-8 gap-12 lg:gap-20 ${images && images.length > 0 ? (index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse') : 'justify-center'}`}
                    >
                      {/* Teks Cerita */}
                      <div className={`flex flex-col relative z-10 ${images && images.length > 0 ? 'lg:w-1/2' : 'w-full items-center text-center'}`}>
                        <span className={`text-retro-gold text-4xl opacity-30 font-heading mb-2 ${images && images.length > 0 ? 'text-left' : 'text-center'}`}>"</span>
                        <p className={`font-heading text-lg md:text-2xl lg:text-3xl text-retro-cream leading-[1.6] tracking-wide drop-shadow-2xl ${images && images.length > 0 ? 'text-left' : 'text-center max-w-4xl'}`}>
                          {text}
                        </p>
                        <span className={`text-retro-gold text-4xl opacity-30 font-heading mt-2 rotate-180 ${images && images.length > 0 ? 'text-right' : 'text-center'}`}>"</span>
                      </div>

                      {/* Tampilan Gambar jika ada */}
                      {images && images.length > 0 && (
                        <div className={`flex flex-wrap gap-4 md:gap-6 lg:w-1/2 w-full items-center ${index % 2 === 0 ? 'lg:justify-end justify-center' : 'lg:justify-start justify-center'}`}>
                          {images.map((imgSrc, imgIdx) => (
                            <div 
                              key={imgIdx} 
                              className={`relative p-2 md:p-3 bg-[#e8dfc8] shadow-[0_15px_30px_rgba(0,0,0,0.6)] border border-[#d3c5a3] transition-transform duration-700 hover:z-20 hover:scale-[1.05] ${imgIdx % 2 === 0 ? 'rotate-2 hover:rotate-0' : '-rotate-3 hover:rotate-0'}`}
                            >
                              {/* Isolasi Kertas Vintage */}
                              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#e8dfc8]/60 backdrop-blur-sm shadow-sm mix-blend-overlay ${imgIdx % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[4deg]'}`} />
                              <img 
                                src={imgSrc} 
                                alt={`Ilustrasi ${imgIdx + 1}`} 
                                className="w-full max-w-[150px] md:max-w-[200px] lg:max-w-[300px] max-h-[35vh] object-cover filter sepia-[0.3] contrast-125 border border-retro-brown/20"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}