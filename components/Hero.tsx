import React from 'react';
import { ViewState } from '../types';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with overlay - Updated to a dark food/meat image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Steak Dining" 
          className="w-full h-full object-cover animate-fade-in scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-up">
           <span className="h-[1px] w-12 bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
           <p className="text-gold-400 tracking-[0.3em] uppercase text-sm font-bold drop-shadow-lg">
             Exzellenz & Tradition
           </p>
           <span className="h-[1px] w-12 bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
        </div>
        
        <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-white mb-6 leading-tight animate-fade-in-up delay-100 drop-shadow-2xl">
          <span className="text-gold-400 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            A Cu
          </span>
        </h1>
        
        <p className="text-gray-100 text-lg md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 drop-shadow-md text-shadow-sm">
          Genießen Sie exzellente Fleischgerichte und deutsche Küche in Eisenhüttenstadt. 
          Tradition, Qualität und Gastfreundschaft vereint.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <button 
            onClick={() => setView(ViewState.MENU)}
            className="px-10 py-4 bg-gold-500 text-charcoal font-bold tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-gold-500/20"
          >
            Zur Speisekarte
          </button>
          <button 
            onClick={() => setView(ViewState.RESERVATION)}
            className="px-10 py-4 border-2 border-white text-white font-bold tracking-widest uppercase hover:bg-white hover:text-charcoal hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            Tisch Buchen
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce cursor-pointer drop-shadow-lg" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
        <ArrowDown size={32} />
      </div>
    </section>
  );
};