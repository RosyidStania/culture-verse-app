import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import InteractiveMap from './components/InteractiveMap';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-retro-dark text-retro-cream overflow-hidden flex flex-col relative bg-grain">
      <Navbar />

      <main className="relative z-10 flex-1 flex items-center justify-center w-full h-screen">
        <InteractiveMap />
      </main>

      <Footer />
    </div>
  );
}

export default App;