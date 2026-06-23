import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl rounded-full glass-retro"
    >
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-3">
          {/* Ornamen simpel pengganti logo */}
          <div className="w-8 h-8 rounded-full border border-retro-gold/50 flex items-center justify-center">
            <div className="w-3 h-3 bg-retro-gold rounded-full" />
          </div>
          <h1 className="font-heading text-xl md:text-2xl font-bold text-retro-gold tracking-[0.15em] uppercase">
            CultureVerse
          </h1>
        </div>
        
        <nav className="flex gap-8 text-xs md:text-sm font-body font-medium tracking-[0.2em] text-retro-cream/70 uppercase">
          <a href="#" className="hover:text-retro-gold hover:tracking-[0.25em] transition-all duration-300">Home</a>
          <a href="#" className="hover:text-retro-gold hover:tracking-[0.25em] transition-all duration-300">About</a>
        </nav>
      </div>
    </motion.header>
  );
}