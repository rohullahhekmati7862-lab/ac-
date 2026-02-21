import React, { useState } from 'react';
import { ViewState } from './types';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuList } from './components/MenuList';
import { LocationSection } from './components/LocationSection';
import { Reservation } from './components/Reservation';
import { Footer } from './components/Footer';

function App() {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.MENU:
        return (
          <>
            <MenuList />
            <Reservation />
          </>
        );
      case ViewState.RESERVATION:
        return (
           <>
            <Reservation />
            <LocationSection />
           </>
        );
      case ViewState.HOME:
      default:
        return (
          <>
            <Hero setView={setView} />
            <About />
            <MenuList />
            <LocationSection />
            <Reservation />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-white font-sans selection:bg-gold-500 selection:text-charcoal">
      <Navigation currentView={currentView} setView={setView} />
      
      <main>
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;