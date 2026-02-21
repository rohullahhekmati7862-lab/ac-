import React from 'react';
import { MapPin, Phone, Clock, Star } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section className="bg-charcoal py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Side */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-gold-400">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} className="opacity-50" />
                </div>
                <span className="text-white font-bold">4.3</span>
                <span className="text-gray-500">(664 Google Rezensionen)</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Besuchen Sie uns <br />
                <span className="text-gold-400">in Eisenhüttenstadt</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Im Herzen von Eisenhüttenstadt gelegen, bietet das Restaurant Aktivist authentische Fleischgerichte in einer Atmosphäre, die Geschichte und Moderne verbindet.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg text-gold-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Adresse</h4>
                  <p className="text-gray-300">Karl-Marx-Straße 45</p>
                  <p className="text-gray-300">15890 Eisenhüttenstadt</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg text-gold-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Telefon</h4>
                  <p className="text-gray-300">03364 2800788</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg text-gold-400">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Öffnungszeiten</h4>
                  <p className="text-gray-300">Mo: Geschlossen</p>
                  <p className="text-gray-300">Di - So: Ab 11:30 Uhr</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="h-[500px] w-full bg-stone rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
             {/* Using an iframe for the map location */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2447.8!2d14.643666!3d52.143717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4707bd11760c6d69%3A0x42120465b5e3b70!2sRestaurant%20Aktivist!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
               width="100%" 
               height="100%" 
               style={{border:0, filter: 'grayscale(0.3) contrast(1.1)'}} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Google Map Restaurant Aktivist"
               className="grayscale group-hover:grayscale-0 transition-all duration-500"
             ></iframe>
             <div className="absolute bottom-4 right-4 bg-white text-charcoal px-4 py-2 rounded-lg font-bold shadow-lg pointer-events-none">
                Restaurant Aktivist
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};