import { motion } from 'framer-motion';
import InteractiveMap from './components/InteractiveMap';

function App() {
  return (
    <div className="min-h-screen bg-retro-dark text-retro-cream overflow-hidden flex flex-col relative bg-grain">
      <main className="relative z-10 flex-1 flex items-center justify-center w-full h-screen">
        <InteractiveMap />
      </main>
    </div>
  );
}

export default App;