import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, Mic, MicOff, Phone, PhoneOff, Activity } from 'lucide-react';
import { getChatResponse, transcribeAudio, ai } from '../services/geminiService';
import { ChatMessage } from '../types';
import { LiveServerMessage, Modality } from '@google/genai';

// --- Audio Utils for Live API ---
function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  const uint8 = new Uint8Array(int16.buffer);
  let binary = '';
  const len = uint8.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const b64 = btoa(binary);
  return {
    data: b64,
    mimeType: 'audio/pcm;rate=16000',
  };
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'live'>('chat');
  
  // Chat State
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Willkommen bei A Cu! Ich bin Ihr virtueller Assistent. Wie kann ich Ihnen behilflich sein?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Transcription State
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Live API State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveStatus, setLiveStatus] = useState<string>('Bereit');
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') scrollToBottom();
  }, [messages, isOpen, activeTab]);

  // --- Chat Logic ---
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await getChatResponse(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Verbindungsproblem.", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  // --- Transcription Logic ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setLoading(true);
          // Use the mimeType from the recorder, e.g., 'audio/webm' or 'audio/mp4'
          const transcription = await transcribeAudio(base64Audio, mediaRecorder.mimeType);
          setInput(prev => prev + (prev ? ' ' : '') + transcription);
          setLoading(false);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // --- Live API Logic ---
  const startLiveSession = async () => {
    try {
      setLiveStatus('Verbinde...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputContextRef.current = inputContext;
      outputContextRef.current = outputContext;
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'You are the helpful voice assistant for A Cu restaurant. Speak German. Be polite and concise.',
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
        callbacks: {
          onopen: () => {
            setLiveStatus('Verbunden');
            setIsLiveActive(true);
            
            const source = inputContext.createMediaStreamSource(stream);
            sourceRef.current = source;
            
            const processor = inputContext.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(processor);
            processor.connect(inputContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
               if (outputContextRef.current) {
                 nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputContextRef.current.currentTime);
                 const audioBuffer = await decodeAudioData(
                   decode(base64Audio),
                   outputContextRef.current,
                   24000, 
                   1
                 );
                 const source = outputContextRef.current.createBufferSource();
                 source.buffer = audioBuffer;
                 source.connect(outputContextRef.current.destination);
                 source.addEventListener('ended', () => {
                    audioSourcesRef.current.delete(source);
                 });
                 source.start(nextStartTimeRef.current);
                 nextStartTimeRef.current += audioBuffer.duration;
                 audioSourcesRef.current.add(source);
               }
            }
            
            if (message.serverContent?.interrupted) {
                audioSourcesRef.current.forEach(src => src.stop());
                audioSourcesRef.current.clear();
                nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            setLiveStatus('Getrennt');
            setIsLiveActive(false);
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setLiveStatus('Fehler');
            setIsLiveActive(false);
          }
        }
      });
      sessionPromiseRef.current = sessionPromise;

    } catch (error) {
      console.error("Failed to start live session:", error);
      setLiveStatus('Fehler beim Start');
    }
  };

  const stopLiveSession = async () => {
    if (sessionPromiseRef.current) {
        const session = await sessionPromiseRef.current;
        session.close();
    }
    
    // Clean up audio
    streamRef.current?.getTracks().forEach(t => t.stop());
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    inputContextRef.current?.close();
    outputContextRef.current?.close();
    audioSourcesRef.current.forEach(src => src.stop());
    audioSourcesRef.current.clear();
    
    setIsLiveActive(false);
    setLiveStatus('Bereit');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-gold-500 hover:bg-gold-400 text-charcoal p-4 rounded-full shadow-lg shadow-gold-500/20 transition-all duration-300 transform hover:scale-110 ${isOpen ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}
      >
        <Sparkles size={28} />
      </button>

      {/* Assistant Window */}
      <div className={`fixed bottom-8 right-4 md:right-8 z-50 w-[90vw] md:w-[400px] bg-charcoal border border-gold-500/30 rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}
           style={{ height: '600px', maxHeight: '80vh' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-stone to-charcoal">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-gold-500/20 transition-colors ${isLiveActive ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-gold-500/10 text-gold-400'}`}>
              {isLiveActive ? <Activity size={20} /> : <Sparkles size={20} />}
            </div>
            <div>
              <h3 className="font-serif font-bold text-white">A Cu Assistent</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                {activeTab === 'live' ? liveStatus : 'Online'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
                if (isLiveActive) stopLiveSession();
                setIsOpen(false);
            }}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
            <button 
                onClick={() => { setActiveTab('chat'); if(isLiveActive) stopLiveSession(); }}
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'chat' ? 'text-gold-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
            >
                Chat
            </button>
            <button 
                onClick={() => setActiveTab('live')}
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'live' ? 'text-gold-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
            >
                Live Anruf
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-stone/50 relative overflow-hidden flex flex-col">
            
            {/* --- Chat View --- */}
            {activeTab === 'chat' && (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold-500/20">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
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
                                <span className="text-xs text-gray-400">Denkt nach...</span>
                            </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="p-4 bg-charcoal border-t border-white/10">
                        <div className="flex items-center gap-2 bg-stone p-1 rounded-full border border-white/10 focus-within:border-gold-500/50 transition-colors">
                            <button
                                onMouseDown={startRecording}
                                onMouseUp={stopRecording}
                                onMouseLeave={stopRecording}
                                onTouchStart={startRecording}
                                onTouchEnd={stopRecording}
                                className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-white'}`}
                                title="Hold to speak"
                            >
                                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                            </button>
                            <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Fragen Sie uns etwas..."
                            className="flex-1 bg-transparent border-none text-white px-2 py-2 focus:ring-0 text-sm placeholder-gray-500 outline-none"
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
                </>
            )}

            {/* --- Live View --- */}
            {activeTab === 'live' && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
                    <div className={`relative w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isLiveActive ? 'border-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-white/10 bg-white/5'}`}>
                        {isLiveActive ? (
                            <div className="space-y-1 flex gap-1 items-center h-12">
                                <div className="w-1 bg-green-500 h-4 animate-[bounce_1s_infinite]"></div>
                                <div className="w-1 bg-green-500 h-8 animate-[bounce_1.2s_infinite]"></div>
                                <div className="w-1 bg-green-500 h-6 animate-[bounce_0.8s_infinite]"></div>
                                <div className="w-1 bg-green-500 h-10 animate-[bounce_1.1s_infinite]"></div>
                                <div className="w-1 bg-green-500 h-5 animate-[bounce_0.9s_infinite]"></div>
                            </div>
                        ) : (
                            <Phone size={48} className="text-gray-500" />
                        )}
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-serif text-white">
                            {isLiveActive ? 'Live Verbindung' : 'Sprach-Assistent'}
                        </h3>
                        <p className="text-gray-400 text-sm max-w-[200px] mx-auto">
                            {isLiveActive 
                                ? 'Sprechen Sie jetzt mit unserem AI Concierge.' 
                                : 'Tippen Sie auf den Hörer, um einen Anruf zu starten.'}
                        </p>
                    </div>

                    <button
                        onClick={isLiveActive ? stopLiveSession : startLiveSession}
                        className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest shadow-lg transition-all duration-300 transform hover:scale-105 ${
                            isLiveActive 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-gold-500 hover:bg-gold-400 text-charcoal'
                        }`}
                    >
                        {isLiveActive ? (
                            <span className="flex items-center gap-2">
                                <PhoneOff size={20} />
                                Auflegen
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Phone size={20} />
                                Anrufen
                            </span>
                        )}
                    </button>
                </div>
            )}

        </div>
      </div>
    </>
  );
};