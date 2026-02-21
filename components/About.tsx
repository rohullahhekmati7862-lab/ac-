import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76690b68f11?auto=format&fit=crop&q=80&w=800" 
                alt="Premium Steak" 
                className="rounded-2xl shadow-2xl w-full h-64 object-cover transform translate-y-8 hover:scale-105 transition-transform duration-500"
              />
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" 
                alt="Bar Atmosphere" 
                className="rounded-2xl shadow-2xl w-full h-64 object-cover transform -translate-y-8 hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold-500/5 blur-3xl rounded-full"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <p className="text-gold-400 font-bold uppercase tracking-widest mb-2">Unsere Philosophie</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                Tradition trifft auf <br />
                <span className="text-gold-400">moderne Kulinarik</span>
              </h2>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Im A Cu (ehemals Aktivist) zelebrieren wir die Kunst der Fleischzubereitung. Unsere Leidenschaft gilt erstklassigen Steaks, traditionellen deutschen Gerichten und einer Atmosphäre, die zum Verweilen einlädt.
            </p>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Jedes Gericht wird mit Sorgfalt aus frischen, regionalen Zutaten zubereitet. Unser Küchenchef verbindet handwerkliches Können mit kreativen Akzenten, um Ihnen ein unvergessliches Geschmackserlebnis in Eisenhüttenstadt zu bieten.
            </p>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <span className="block text-3xl font-serif text-gold-400">25+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Jahre Erfahrung</span>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div>
                <span className="block text-3xl font-serif text-gold-400">100%</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Qualität</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};