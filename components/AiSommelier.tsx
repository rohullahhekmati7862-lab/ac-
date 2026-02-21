import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Wine, Loader2 } from 'lucide-react';
import { getSommelierRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AiSommelier: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Restaurant Aktivist. I am your AI Sommelier. Ask me about wine pairings or dish ingredients.' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await getSommelierRecommendation(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, I'm having trouble connecting to the cellar.", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-gold-500 hover:bg-gold-400 text-charcoal p-4 rounded-full shadow-lg shadow-gold-500/20 transition-all duration-300 ${isOpen ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}
      >
        <Wine size={28} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-8 right-4 md:right-8 z-50 w-[90vw] md:w-96 bg-charcoal border border-gold-500/30 rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-right flex flex-col ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}
           style={{ height: '500px', maxHeight: '80vh' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-stone to-charcoal rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-400 border border-gold-500/20">
              <Wine size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white">AI Sommelier</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gold-500 text-charcoal rounded-br-none font-medium' 
                  : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl p-3 rounded-bl-none flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-gold-400" />
                <span className="text-xs text-gray-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-charcoal rounded-b-2xl border-t border-white/10">
          <div className="flex items-center gap-2 bg-stone p-1 rounded-full border border-white/10 focus-within:border-gold-500/50 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for a wine pairing..."
              className="flex-1 bg-transparent border-none text-white px-4 py-2 focus:ring-0 text-sm placeholder-gray-500 outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 bg-gold-500 text-charcoal rounded-full hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};