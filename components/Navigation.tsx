import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-charcoal/95 backdrop-blur-md py-4 shadow-lg border-b border-white/10' : 'bg-transparent py-6'
  }`;

  const linkClass = (view: ViewState) => 
    `cursor-pointer text-sm tracking-widest uppercase hover:text-gold-400 transition-colors ${
      currentView === view ? 'text-gold-400 font-bold' : 'text-gray-200'
    }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView(ViewState.HOME)}
        >
          <UtensilsCrossed className="w-6 h-6 text-gold-400 group-hover:rotate-12 transition-transform" />
          <span className="font-serif text-2xl font-bold tracking-tighter text-white">
            <span className="text-gold-400">A Cu</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setView(ViewState.HOME)} className={linkClass(ViewState.HOME)}>Startseite</button>
          <button onClick={() => setView(ViewState.MENU)} className={linkClass(ViewState.MENU)}>Speisekarte</button>
          <button onClick={() => setView(ViewState.RESERVATION)} className={linkClass(ViewState.RESERVATION)}>Reservierung</button>
          <button 
            onClick={() => setView(ViewState.RESERVATION)}
            className="px-6 py-2 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal transition-all text-xs tracking-widest uppercase font-bold"
          >
            Tisch Buchen
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-charcoal border-b border-white/10 shadow-xl py-6 flex flex-col items-center gap-6 animate-fadeIn">
          <button onClick={() => { setView(ViewState.HOME); setIsMobileMenuOpen(false); }} className={linkClass(ViewState.HOME)}>Startseite</button>
          <button onClick={() => { setView(ViewState.MENU); setIsMobileMenuOpen(false); }} className={linkClass(ViewState.MENU)}>Speisekarte</button>
          <button onClick={() => { setView(ViewState.RESERVATION); setIsMobileMenuOpen(false); }} className={linkClass(ViewState.RESERVATION)}>Reservierung</button>
        </div>
      )}
    </nav>
  );
};