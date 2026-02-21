import React from 'react';

export const Reservation: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone flex items-center justify-center p-6 py-24 relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=2000" 
          alt="Dining Atmosphere" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal"></div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold-500 blur-[100px]"></div>
      </div>

      <div className="w-full max-w-lg bg-charcoal/90 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-white mb-2">Tisch Reservieren</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Sichern Sie sich Ihren Platz im A Cu.</p>

        <form 
          action="https://formsubmit.co/rhekmati38@gmail.com"
          method="POST"
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-400 font-bold">Datum</label>
              <input type="date" name="date" required className="w-full bg-stone/50 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-400 font-bold">Zeit</label>
              <select name="time" className="w-full bg-stone/50 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors">
                <option>11:30</option>
                <option>12:00</option>
                <option>13:00</option>
                <option>17:00</option>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gold-400 font-bold">Personen</label>
            <select name="guests" className="w-full bg-stone/50 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors">
              <option>2 Personen</option>
              <option>3 Personen</option>
              <option>4 Personen</option>
              <option>5 Personen</option>
              <option>6+ Personen</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gold-400 font-bold">Name</label>
            <input type="text" name="name" required placeholder="Ihr Name" className="w-full bg-stone/50 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors" />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gold-400 font-bold">Email</label>
            <input type="email" name="email" required placeholder="ihre.email@beispiel.de" className="w-full bg-stone/50 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors" />
          </div>
          
          <div className="space-y-2">
             <label className="text-xs uppercase tracking-widest text-gold-400 font-bold">Telefon</label>
            <input type="tel" name="phone" placeholder="0123 456789" className="w-full bg-stone/50 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors" />
          </div>

          {/* FormSubmit Configuration */}
          <input type="hidden" name="_subject" value="Neue Tischreservierung - A Cu" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          {/* Redirect users back to your site or stay on the success page */}
          <input type="hidden" name="_next" value="https://formsubmit.co/thanks" />

          <button type="submit" className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-charcoal font-bold uppercase tracking-widest transition-colors mt-4 rounded-lg shadow-lg shadow-gold-500/20 transform hover:-translate-y-1">
            Reservierung Bestätigen
          </button>
        </form>
      </div>
    </div>
  );
};