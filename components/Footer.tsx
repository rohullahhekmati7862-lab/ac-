import React from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <h3 className="font-serif text-3xl text-white">
            <span className="text-gold-400">A Cu</span>
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Ihr Restaurant für hochwertige Fleischgerichte und deutsche Küche in Eisenhüttenstadt.
          </p>
          <div className="flex justify-center md:justify-start gap-4 pt-2">
            <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors"><Facebook size={20} /></a>
          </div>
        </div>

        {/* Contact Column */}
        <div className="space-y-4">
          <h4 className="text-gold-400 uppercase tracking-widest text-xs font-bold">Kontakt</h4>
          <div className="flex flex-col gap-3 items-center md:items-start text-gray-400 text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-gold-500 shrink-0 mt-0.5" />
              <div>
                <p>Karl-Marx-Straße 45</p>
                <p>15890 Eisenhüttenstadt</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gold-500 shrink-0" />
              <p className="font-bold text-gray-300">+49 163 8866863</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gold-500 shrink-0" />
              <p className="text-gray-300">rhekmati38@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Hours Column */}
        <div className="space-y-4">
          <h4 className="text-gold-400 uppercase tracking-widest text-xs font-bold">Öffnungszeiten</h4>
          <p className="text-gray-400 text-sm">Di - So: Ab 11:30 Uhr</p>
          <p className="text-gray-400 text-sm">Montag: Geschlossen</p>
        </div>

        {/* Map Column */}
        <div className="space-y-4 h-48 w-full md:col-span-2 lg:col-span-1">
          <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-lg relative group">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2447.8!2d14.643666!3d52.143717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4707bd11760c6d69%3A0x42120465b5e3b70!2sRestaurant%20Aktivist!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
               width="100%" 
               height="100%" 
               style={{border:0, filter: 'grayscale(1) contrast(1.2) brightness(0.8)'}} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Google Map Location"
               className="grayscale hover:grayscale-0 transition-all duration-500"
             ></iframe>
             <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl"></div>
          </div>
        </div>

      </div>
      
      <div className="border-t border-white/5 mt-12 pt-8 text-center text-gray-600 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <span>&copy; {new Date().getFullYear()} A Cu. Alle Rechte vorbehalten.</span>
        <div className="flex gap-4">
            <a href="#" className="hover:text-gold-400 transition-colors">Impressum</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
};