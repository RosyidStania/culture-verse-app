import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed bottom-8 left-0 w-full text-center z-50 pointer-events-none"
    >
      <p className="font-heading text-xs md:text-sm text-retro-gold/60 tracking-[0.4em] animate-pulse uppercase">
        Pilih Pulau Untuk Memulai Eksplorasi Budaya
      </p>
    </motion.footer>
  );
}