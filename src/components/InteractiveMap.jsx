import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = "/indonesia.json";

// Data Gabungan: Meja Arsip + Cerita Layar Penuh
const defaultPhotos = [
  { 
    id: 1, top: "15%", left: "10%", rotate: -12, 
    title: "Tari Tradisional", 
    desc: "Gerak gemulai penuh makna magis peninggalan leluhur.",
    bgImage: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?q=80&w=2000&auto=format&fit=crop",
    story: [
      "Setiap gerak adalah doa, dan setiap nada adalah puji-pujian bagi semesta.",
      "Tarian ini bukan sekadar pertunjukan, melainkan jembatan spiritual antara manusia dan Sang Pencipta.",
      "Menjaga irama ini berarti kita merawat napas peradaban yang tak lekang oleh waktu."
    ]
  },
  { 
    id: 2, top: "55%", left: "15%", rotate: 8, 
    title: "Senjata Khas", 
    desc: "Ditempa dengan mantra, baja, dan keberanian.",
    bgImage: "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?q=80&w=2000&auto=format&fit=crop",
    story: [
      "Bukan sekadar alat perang, bilah ini adalah simbol harga diri dan kehormatan keluarga.",
      "Pola pamor yang tergambar di atas baja adalah rahasia semesta yang dititipkan melalui tangan sang empu.",
      "Disimpan dengan pusaka, dirawat dengan rasa hormat yang mendalam."
    ]
  },
  { 
    id: 3, top: "10%", left: "65%", rotate: 15, 
    title: "Rumah Adat", 
    desc: "Pilar kayu kokoh yang menyangga filosofi kehidupan.",
    bgImage: "https://images.unsplash.com/photo-1604005955512-4028091176b6?q=80&w=2000&auto=format&fit=crop",
    story: [
      "Dibangun tanpa sebatang paku besi, mengandalkan harmoni dan presisi hitungan alam.",
      "Setiap ukiran di tiang utama menceritakan silsilah dan harapan bagi penghuninya.",
      "Menjadi tempat pulang, tempat tetua bercerita, dan tempat tradisi diwariskan."
    ]
  },
];

const jawaTengahPhotos = [
  { 
    id: 1, top: "10%", left: "15%", rotate: -8, 
    title: "Candi Borobudur", 
    bgImage: "/images/jawa-tengah/borobudur.jpg",
    story: [
      {
        text: "Borobudur dibangun pada masa Dinasti Syailendra (sekitar abad ke-8 dan ke-9 masehi). Struktur candi ini menggunakan sistem interlocking (saling mengunci) dari balok batu andesit tanpa menggunakan semen sama sekali. Arsitekturnya membagi perjalanan spiritual manusia menjadi tiga tingkatan:",
        images: ["/images/jawa-tengah/raja-syailendra.jpg", "/images/jawa-tengah/borobudur-diagram.jpg"]
      },
      {
        text: "Kamadhatu (Bagian Kaki): Mewakili alam dunia bawah, tempat manusia masih terikat oleh hawa nafsu dan keserakahan. Terdapat 160 relief Karmawibhangga yang menggambarkan hukum sebab-akibat (karma).",
        images: ["/images/jawa-tengah/borobudur-stupa.jpg"]
      },
      {
        text: "Rupadhatu (Bagian Tengah): Mewakili alam peralihan. Manusia sudah mulai meninggalkan nafsu duniawi tetapi masih terikat oleh rupa dan wujud. Bagian ini terdiri dari lima teras persegi dengan ribuan panel relief yang menceritakan kehidupan Buddha Gautama (Lalitavistara) dan cerita-cerita fabel kebijaksanaan (Jataka).",
        images: ["/images/jawa-tengah/borobudur-buddha.jpg"]
      },
      {
        text: "Arupadhatu (Bagian Atas): Mewakili alam tertinggi yang tidak berwujud, di mana manusia sudah terbebas dari segala ikatan duniawi. Ditandai dengan tiga teras melingkar yang berisi 72 stupa berlubang, mengelilingi satu stupa induk raksasa di puncaknya.",
        images: ["/images/jawa-tengah/borobudur-sunset.jpg"]
      }
    ]
  },
  { 
    id: 2, top: "15%", left: "60%", rotate: 12, 
    title: "Batik Jawa Tengah", 
    bgImage: "/images/jawa-tengah/batik.jpg",
    story: [
      "Batik diakui oleh UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi pada 2 Oktober 2009. Di Jawa Tengah, karakteristiknya sangat dipengaruhi oleh lokasi geografis:",
      "Batik Pedalaman (Keraton Solo): Sangat terikat pada pakem dan aturan keraton. Didominasi warna sogan (cokelat kemerahan), hitam, dan putih kekuningan. Motifnya sarat filosofi, seperti motif Parang yang bergaris miring (melambangkan kekuasaan, dulunya hanya boleh dipakai raja) dan Kawung yang berbentuk seperti buah aren (melambangkan kesucian dan umur panjang).",
      "Batik Pesisir (Pekalongan): Lebih dinamis, bebas, dan sangat dipengaruhi oleh akulturasi budaya asing (Tiongkok, Arab, Belanda). Warnanya sangat cerah (merah, biru, hijau, kuning). Motif yang terkenal adalah Buketan (rangkaian bunga gaya Eropa) dan Jlamprang (berbentuk geometris yang terinspirasi dari kain Patola India)."
    ]
  },
  { 
    id: 3, top: "55%", left: "10%", rotate: -15, 
    title: "Wayang Kulit", 
    bgImage: "/images/jawa-tengah/wayang.jpg",
    story: [
      "Pertunjukan wayang kulit adalah sebuah orkestrasi yang kompleks. Tokoh wayang dipahat dari kulit kerbau yang dikeringkan, kemudian diberi warna dan tangkai penyangga dari tanduk kerbau. Dalam pementasannya, terdapat elemen-elemen penting:",
      "Dalang: Sang sutradara tunggal yang memainkan wayang, menyuarakan semua karakter, memimpin iringan musik, dan mengatur ritme cerita semalaman suntuk.",
      "Punakawan: Karakter khas Jawa yang tidak ada dalam epik asli Mahabharata dari India. Terdiri dari Semar, Gareng, Petruk, dan Bagong. Mereka adalah dewa yang mewujud sebagai rakyat jelata (abdi), berfungsi untuk memberikan jeda komedi sekaligus melontarkan kritik sosial dan nasihat bijak.",
      "Kelir & Blencong: Kelir adalah layar kain putih, sedangkan Blencong adalah lampu minyak kelapa yang digantung di atas Dalang. Cahaya blencong yang bergoyang-goyang menciptakan efek bayangan yang dramatis pada kelir, menghidupkan karakter wayang."
    ]
  },
  { 
    id: 4, top: "50%", left: "65%", rotate: 8, 
    title: "Rumah Joglo", 
    bgImage: "/images/jawa-tengah/joglo.jpg",
    story: [
      "Nama Joglo berasal dari kata \"Tajug Loro\" (dua tajug/gunung), merujuk pada bentuk atapnya. Struktur rumah ini sangat tahan terhadap gempa karena sistem sambungan kayunya yang fleksibel. Hierarki ruangannya mencerminkan privasi dan etika masyarakat Jawa:",
      "Soko Guru & Tumpang Sari: Di bagian tengah rumah terdapat empat tiang penyangga utama (Soko Guru) yang melambangkan empat penjuru mata angin. Di atas Soko Guru terdapat susunan balok kayu bertumpuk yang melebar ke atas, disebut Tumpang Sari.",
      "Pendopo: Area paling depan, tanpa dinding, digunakan untuk menerima tamu, rapat desa, atau pementasan seni. Menyimbolkan keterbukaan.",
      "Pringgitan: Ruang transisi antara Pendopo dan area dalam. Biasanya digunakan untuk menggelar pertunjukan wayang (ringgit) bagi tamu.",
      "Dalem Ageng: Area privat tempat keluarga beraktivitas. Di dalamnya terdapat Sentong Tengah, sebuah kamar sakral yang sering dikaitkan dengan penghormatan kepada Dewi Sri (Dewi Padi/Kesuburan)."
    ]
  }
];

const provinceData = {
  "Jawa Tengah": jawaTengahPhotos
};

export default function InteractiveMap() {
  const [hoveredProvince, setHoveredProvince] = useState(null);
  
  // State 1: Provinsi yang dipilih dari Peta (Memicu Meja Arsip)
  const [selectedProvince, setSelectedProvince] = useState(null);
  
  // State 2: Foto yang diklik dari Meja Arsip (Memicu Layar Penuh/Immersive)
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // State & Ref untuk Auto-Scroll
  const scrollContainerRef = useRef(null);
  const storyRefs = useRef([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(-1);

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
      
      {/* =========================================
          LAYER 0: PETA INTERAKTIF
          ========================================= */}
      <motion.div
        animate={{
          scale: selectedProvince ? 0.8 : 1,
          opacity: selectedProvince ? 0.15 : 1,
          filter: selectedProvince ? "grayscale(100%)" : "grayscale(0%)"
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
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
            className="absolute inset-0 z-10 pointer-events-auto"
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
            >
              <h2 className="font-heading text-6xl text-retro-cream/80 opacity-40 uppercase tracking-[0.2em] mix-blend-overlay">
                {selectedProvince}
              </h2>
            </motion.div>

            {/* Hamburan Foto Polaroid */}
            {(provinceData[selectedProvince] || defaultPhotos).map((photo, index) => (
              <motion.div
                key={`photo-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
                className="absolute w-52 md:w-64 p-4 pb-12 cursor-pointer group paper-texture"
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-retro-cream/40 backdrop-blur-sm rotate-2 shadow-sm" />

                {/* Area Klise Foto */}
                <div className="w-full aspect-square bg-retro-dark flex items-center justify-center overflow-hidden border border-retro-brown/20 relative shadow-inner">
                  {/* Preview Gambar */}
                  <img src={photo.bgImage} className="w-full h-full object-cover opacity-70 filter sepia-[0.3] grayscale-[0.8] contrast-125 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700" alt="Preview" />
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-retro-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </div>
                
                {/* Teks Tulisan Tangan */}
                <div className="absolute bottom-3 left-0 w-full text-center px-4">
                  <p className="font-handwriting text-retro-dark text-2xl md:text-3xl leading-tight font-bold drop-shadow-sm">
                    {photo.title}
                  </p>
                </div>
              </motion.div>
            ))}
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
                className="px-6 py-3 text-retro-gold font-heading text-sm tracking-[0.2em] uppercase hover:text-retro-cream transition-colors bg-retro-dark/50 backdrop-blur-md rounded-full border border-retro-gold/30 flex items-center justify-center gap-3"
              >
                Auto-Scroll <span className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-[#50C878] animate-pulse shadow-[0_0_8px_#50C878]' : 'bg-red-900'}`} />
              </button>
              <button 
                onClick={handleCloseImmersive}
                className="px-6 py-3 text-retro-gold font-heading text-sm tracking-[0.2em] uppercase hover:text-retro-cream transition-colors group bg-retro-dark/50 backdrop-blur-md rounded-full border border-retro-gold/30 flex items-center justify-center gap-2"
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
                className="font-heading text-5xl md:text-8xl text-retro-gold text-center uppercase tracking-[0.15em] mb-4 drop-shadow-2xl"
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
                      className={`relative flex flex-col items-center w-full max-w-7xl px-8 gap-12 lg:gap-20 ${images && images.length > 0 ? (index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse') : 'justify-center'}`}
                    >
                      {/* Teks Cerita */}
                      <div className={`flex flex-col relative z-10 ${images && images.length > 0 ? 'lg:w-1/2' : 'w-full items-center text-center'}`}>
                        <span className={`text-retro-gold text-4xl opacity-30 font-heading mb-2 ${images && images.length > 0 ? 'text-left' : 'text-center'}`}>"</span>
                        <p className={`font-heading text-xl md:text-2xl lg:text-3xl text-retro-cream leading-[1.6] tracking-wide drop-shadow-2xl ${images && images.length > 0 ? 'text-left' : 'text-center max-w-4xl'}`}>
                          {text}
                        </p>
                        <span className={`text-retro-gold text-4xl opacity-30 font-heading mt-2 rotate-180 ${images && images.length > 0 ? 'text-right' : 'text-center'}`}>"</span>
                      </div>

                      {/* Tampilan Gambar jika ada */}
                      {images && images.length > 0 && (
                        <div className={`flex flex-wrap gap-6 lg:w-1/2 w-full items-center ${index % 2 === 0 ? 'lg:justify-end justify-center' : 'lg:justify-start justify-center'}`}>
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
                                className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[300px] max-h-[35vh] object-cover filter sepia-[0.3] contrast-125 border border-retro-brown/20"
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