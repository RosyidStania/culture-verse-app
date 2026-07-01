import { motion } from 'framer-motion';

export default function LandingPage({ onEnter }) {
  return (
    <div className="relative w-full h-screen bg-retro-dark flex flex-col items-center justify-center overflow-hidden z-50 bg-grain">
      {/* Background Ambient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-retro-dark via-retro-brown/20 to-retro-dark z-0" />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="mb-6 flex flex-col items-center"
        >
          <span className="font-heading text-retro-gold text-sm md:text-base tracking-[0.4em] uppercase mb-4 opacity-70">
            Arsip Budaya Nusantara
          </span>
          <div className="w-12 h-[1px] bg-retro-gold/50 mb-6" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeOut", delay: 1 }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl text-retro-cream uppercase tracking-[0.1em] drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-8"
        >
          Jejak<br/>Nusantara
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="font-body text-retro-cream/60 max-w-xl text-sm md:text-base tracking-wide leading-relaxed mb-12"
        >
          Menjelajahi kepingan sejarah, tradisi, dan keindahan budaya dari ujung barat hingga timur Indonesia dalam satu ruang arsip interaktif.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
          onClick={onEnter}
          className="group relative px-8 py-4 border border-retro-gold/30 bg-retro-dark/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-retro-gold/80 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
        >
          {/* Button Hover Effect */}
          <div className="absolute inset-0 bg-retro-gold/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          
          <span className="relative z-10 font-heading text-retro-gold text-sm tracking-[0.3em] uppercase group-hover:text-retro-cream transition-colors duration-500 flex items-center gap-3">
            Mulai Eksplorasi
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
          </span>
        </motion.button>
      </div>
      
      {/* Decorative compass or map lines in background could be added here */}
    </div>
  );
}
