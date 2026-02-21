import React from 'react';
import { MenuItem } from '../types';

const MENU_ITEMS: MenuItem[] = [
  { 
    id: '1', 
    category: 'vorspeise', 
    name: 'Soljanka "Aktivist"', 
    description: 'Klassische würzige Suppe mit Zitrone, saurer Sahne und frischem Brot', 
    price: '€6,50', 
    image: 'https://images.unsplash.com/photo-1547592166-23acbe3b624b?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '2', 
    category: 'vorspeise', 
    name: 'Rinder-Carpaccio', 
    description: 'Hauchdünnes Rinderfilet mit Rucola, Parmesan und Trüffelöl', 
    price: '€14,90', 
    highlight: true,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '3', 
    category: 'vorspeise', 
    name: 'Würzfleisch', 
    description: 'Überbacken mit Käse, serviert mit Worcestersauce und Toast', 
    price: '€7,90',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '4', 
    category: 'hauptgericht', 
    name: 'Wiener Schnitzel', 
    description: 'Original vom Kalb, mit lauwarmem Kartoffel-Gurkensalat und Preiselbeeren', 
    price: '€24,50',
    image: 'https://images.unsplash.com/photo-1599921841143-819065f56331?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '5', 
    category: 'hauptgericht', 
    name: 'Argentinisches Rumpsteak (250g)', 
    description: 'Mit Kräuterbutter, Grillgemüse und Steakhouse Pommes', 
    price: '€29,90', 
    highlight: true,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '6', 
    category: 'hauptgericht', 
    name: 'Grillteller "Eisenhütte"', 
    description: 'Steaks von Schwein, Rind und Pute mit Speckbohnen und Bratkartoffeln', 
    price: '€26,90',
    image: 'https://images.unsplash.com/photo-1544025162-d76690b68f11?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '7', 
    category: 'hauptgericht', 
    name: 'Aktivist Burger', 
    description: '200g Rindfleisch, Cheddar, Bacon, Röstzwiebeln und Haus-Sauce', 
    price: '€18,50',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '8', 
    category: 'dessert', 
    name: 'Warmer Apfelstrudel', 
    description: 'Mit Vanillesauce und einer Kugel Walnusseis', 
    price: '€8,50',
    image: 'https://images.unsplash.com/photo-1568469288849-06a96c342799?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '9', 
    category: 'dessert', 
    name: 'Schokoladen-Lavakuchen', 
    description: 'Flüssiger Kern, serviert mit frischen Beeren', 
    price: '€9,50',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&q=80&w=800' 
  },
];

export const MenuList: React.FC = () => {
  const categories: {key: string; label: string}[] = [
    {key: 'vorspeise', label: 'Vorspeisen & Suppen'},
    {key: 'hauptgericht', label: 'Hauptgerichte & Steaks'},
    {key: 'dessert', label: 'Desserts'}
  ];

  return (
    <div className="py-24 px-4 bg-stone min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-gold-400 font-bold uppercase tracking-widest mb-2">Kulinarischer Genuss</p>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">Unsere Speisekarte</h2>
          <div className="w-24 h-1 bg-gold-400 mx-auto rounded"></div>
        </div>

        {categories.map((cat) => (
          <div key={cat.key} className="mb-20">
            <h3 className="text-3xl font-serif text-white mb-10 pl-4 border-l-4 border-gold-400">
              {cat.label}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MENU_ITEMS.filter(item => item.category === cat.key).map((item) => (
                <div key={item.id} className="group bg-charcoal rounded-xl overflow-hidden shadow-lg hover:shadow-gold-500/10 transition-all duration-300 border border-white/5 hover:-translate-y-2">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-charcoal/90 px-3 py-1 rounded text-gold-400 font-serif font-bold border border-gold-500/30">
                      {item.price}
                    </div>
                    {item.highlight && (
                      <div className="absolute top-4 left-4 bg-gold-500 text-charcoal text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                        Empfehlung
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-serif text-white mb-2 group-hover:text-gold-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};