
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  BookOpen, 
  PenTool, 
  Volume2, 
  HelpCircle, 
  FileText, 
  ExternalLink,
  Search,
  CheckCircle2,
  Info,
  Globe,
  Play,
  Pause,
  Square,
  Eye
} from 'lucide-react';
import { FORMULA_DATA, FOOTNOTE_DB, VOCAB_DB, ESSAY_DATA, GA_MEASUREMENT_ID } from './constants';
import { FormulaPart, Vocab } from './types';

// --- PRO AUDIO PLAYER HOOK ---
const useProAudio = (text: string) => {
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused' | 'error'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isWebSpeech = useRef(false);

  const stop = useCallback(() => {
    if (isWebSpeech.current) {
      window.speechSynthesis.cancel();
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStatus('idle');
  }, []);

  const pause = useCallback(() => {
    if (isWebSpeech.current) {
      window.speechSynthesis.pause();
      setStatus('paused');
    } else if (audioRef.current) {
      audioRef.current.pause();
      setStatus('paused');
    }
  }, []);

  const play = useCallback(() => {
    if (status === 'paused') {
      if (isWebSpeech.current) {
        window.speechSynthesis.resume();
        setStatus('playing');
      } else if (audioRef.current) {
        audioRef.current.play();
        setStatus('playing');
      }
      return;
    }

    setStatus('playing');
    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(text)}`;
    const audio = new Audio(googleUrl);
    audioRef.current = audio;
    isWebSpeech.current = false;

    audio.play().catch(() => {
      console.warn('Google TTS failed, using Web Speech fallback');
      isWebSpeech.current = true;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.onend = () => setStatus('idle');
      utterance.onerror = () => setStatus('error');
      window.speechSynthesis.speak(utterance);
    });

    audio.onended = () => setStatus('idle');
    audio.onerror = () => setStatus('error');
  }, [text, status]);

  useEffect(() => {
    return () => stop();
  }, [text, stop]);

  return { status, play, pause, stop };
};

const useGoogleAnalytics = (id: string) => {
  useEffect(() => {
    if (!id || id === 'G-XXXXXXXXXX') return;
    const s1 = document.createElement('script');
    s1.async = true; s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s1);
    const s2 = document.createElement('script');
    s2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}');`;
    document.head.appendChild(s2);
  }, [id]);
};

// --- COMPONENTS ---

const Popover: React.FC<{ 
  title: string; 
  content: React.ReactNode; 
  onClose: () => void;
  position: { x: number; y: number };
}> = ({ title, content, onClose, position }) => {
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const left = Math.min(position.x - 20, window.innerWidth - 300);
  const top = position.y + 20;

  return (
    <div 
      ref={popRef}
      className="fixed z-[100] bg-white border border-gray-200 rounded-lg shadow-2xl p-5 w-[280px] md:w-[320px] animate-in fade-in zoom-in duration-150"
      style={{ left: left > 0 ? left : 10, top }}
    >
      <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-2">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{title}</h4>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-600">×</button>
      </div>
      <div className="text-[#37352F]">{content}</div>
    </div>
  );
};

const VocabSpan: React.FC<{ word: string; isQuizMode: boolean }> = ({ word, isQuizMode }) => {
  const [active, setActive] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dbKey = word.toLowerCase().trim();
  const info = VOCAB_DB[dbKey];
  
  const audioText = `${word}. ${info?.ex || ''}`;
  const { status, play, pause, stop } = useProAudio(audioText);

  if (!info) return <span>{word}</span>;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPos({ x: e.clientX, y: e.clientY });
    setActive(!active);
    if (!isQuizMode) setIsRevealed(true);
  };

  const close = () => {
    setActive(false);
    setIsRevealed(false);
    stop();
  };

  return (
    <span 
      onClick={toggle}
      className={`transition-all cursor-pointer px-1 rounded-sm mx-0.5 font-medium whitespace-nowrap ${
        isQuizMode 
          ? 'bg-gray-100 border-b-2 border-dashed border-gray-300 text-transparent select-none' 
          : 'bg-[#E3E2E0] hover:bg-[#D3E5EF]'
      }`}
    >
      {word}
      {active && (
        <Popover title={isRevealed ? "Vocabulary" : "Flashcard Quiz"} onClose={close} position={pos} content={
          <div className="space-y-4">
            {!isRevealed ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{info.pos}</span>
                </div>
                <p className="text-lg font-bold leading-tight">{info.def}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsRevealed(true); }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Eye className="w-4 h-4" /> Reveal Answer
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in zoom-in-95 duration-200">
                <div>
                  <p className="font-bold text-2xl">{word}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-blue-500 font-mono text-xs">{info.kk}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{info.pos}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-lg border border-gray-100">
                  <button onClick={play} className={`p-2 rounded transition-colors ${status === 'playing' ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50 text-blue-600'}`} disabled={status === 'playing'}><Play className="w-4 h-4" /></button>
                  <button onClick={pause} className="p-2 hover:bg-yellow-50 text-yellow-600 rounded transition-colors"><Pause className="w-4 h-4" /></button>
                  <button onClick={stop} className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors"><Square className="w-4 h-4" /></button>
                  <div className="flex-1 ml-2">
                    <div className={`h-1 bg-blue-100 rounded-full overflow-hidden ${status === 'playing' ? 'opacity-100' : 'opacity-30'}`}>
                      <div className={`h-full bg-blue-500 ${status === 'playing' ? 'w-full animate-[progress_3s_linear_infinite]' : 'w-0'}`}></div>
                    </div>
                  </div>
                </div>

                <p className="text-base font-medium leading-relaxed text-[#37352F]">{info.def}</p>
                <div className="text-xs text-gray-500 border-l-2 border-gray-200 pl-3 py-1 italic">
                  "{info.ex}"
                </div>
              </div>
            )}
          </div>
        } />
      )}
    </span>
  );
};

const FootnoteBadge: React.FC<{ id: number }> = ({ id }) => {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPos({ x: e.clientX, y: e.clientY });
    setActive(!active);
  };

  return (
    <span 
      onClick={toggle}
      className="text-[#EB5757] bg-[#EB5757]/10 hover:bg-[#EB5757]/20 cursor-pointer rounded px-1 text-[10px] font-bold align-super ml-0.5"
    >
      [{id}]
      {active && (
        <Popover title={`Examples [${id}]`} onClose={() => setActive(false)} position={pos} content={
          <ul className="space-y-2 text-xs">
            {FOOTNOTE_DB[id]?.map((ex, i) => (
              <li key={i} className="flex gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                <span className="text-red-400 font-bold">•</span>
                <span className="leading-normal">{ex}</span>
              </li>
            ))}
          </ul>
        } />
      )}
    </span>
  );
};

const SmartReader: React.FC<{ text: string; isQuizMode: boolean }> = ({ text, isQuizMode }) => {
  const keys = Object.keys(VOCAB_DB).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `(${keys.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})|(\\[\\d+\\])`,
    'gi'
  );

  const tokens = text.split(pattern);

  return (
    <>
      {tokens.map((token, i) => {
        if (!token) return null;
        if (token.startsWith('[') && token.endsWith(']') && !isNaN(parseInt(token.slice(1, -1)))) {
          return <FootnoteBadge key={i} id={parseInt(token.slice(1, -1))} />;
        }
        const low = token.toLowerCase();
        if (VOCAB_DB[low]) {
          return <VocabSpan key={i} word={token} isQuizMode={isQuizMode} />;
        }
        return <span key={i}>{token}</span>;
      })}
    </>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [tab, setTab] = useState<'formula' | 'essays' | 'vocab'>('formula');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [essayIdx, setEssayIdx] = useState(0);
  const [search, setSearch] = useState("");

  useGoogleAnalytics(GA_MEASUREMENT_ID);

  const filteredVocab = Object.entries(VOCAB_DB).filter(([k, v]) => 
    k.includes(search.toLowerCase()) || v.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen selection:bg-blue-100 pb-10">
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 notion-shadow">
        <div className="flex items-center gap-4">
          <div className="bg-[#37352F] p-2 rounded-lg text-white">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Essay Formula Coach</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center gap-1">
              <Globe className="w-3 h-3" /> Advanced Training System
            </p>
          </div>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 shadow-inner">
          <button 
            onClick={() => setIsQuizMode(false)} 
            className={`px-5 py-2 text-[10px] font-black rounded-md transition-all ${!isQuizMode ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
          >
            READ
          </button>
          <button 
            onClick={() => setIsQuizMode(true)} 
            className={`px-5 py-2 text-[10px] font-black rounded-md transition-all ${isQuizMode ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
          >
            QUIZ
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6">
        <nav className="flex gap-8 border-b border-gray-100 mb-10 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'formula', icon: HelpCircle, label: 'Template Formula' },
            { id: 'essays', icon: FileText, label: 'Model Essays' },
            { id: 'vocab', icon: BookOpen, label: 'Linguistic Inventory' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`pb-4 flex items-center gap-2 text-sm font-semibold border-b-2 transition-all ${tab === t.id ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </nav>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-10 notion-shadow min-h-[600px]">
          {tab === 'formula' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* ONBOARDING CALLOUT */}
              <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                  <Info className="w-32 h-32 text-blue-900" />
                </div>
                <h2 className="text-sm font-black text-blue-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                  <Info className="w-4 h-4" /> 使用說明 (How to use)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-800">
                  <div className="space-y-2">
                    <span className="inline-block px-2 py-0.5 bg-blue-100 rounded text-[10px] font-black">STEP 1</span>
                    <p className="text-sm font-bold">閱讀樣板一遍即可</p>
                    <p className="text-[11px] opacity-70">Read the template once.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block px-2 py-0.5 bg-blue-100 rounded text-[10px] font-black">STEP 2</span>
                    <p className="text-sm font-bold">閱讀範文</p>
                    <p className="text-[11px] opacity-70">Analyze the model essays.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block px-2 py-0.5 bg-blue-100 rounded text-[10px] font-black">STEP 3</span>
                    <p className="text-sm font-bold">任選一篇背誦</p>
                    <p className="text-[11px] opacity-70">Memorize one complete essay.</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-blue-100/50 text-xs leading-relaxed text-blue-700/80 italic font-medium">
                  "樣板就像數學公式一樣難背，範文雖然字數較多，但因為有上下文，反而容易記憶。只要範文背熟，實際應用時一定可以自然地替換掉不合的部分。"
                </div>
              </div>

              <section>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-8 bg-gray-50 flex items-center justify-center rounded-lg border border-gray-100 text-[10px] font-black text-gray-400">P1</span>
                  <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] pt-0.5">Intro & Structure</h3>
                </div>
                <div className="text-xl md:text-2xl leading-[2.4] text-[#37352F] font-serif">
                  {FORMULA_DATA.p1.map((p, i) => (
                    p.type === 'placeholder' ? (
                      <span key={i} className="mx-1 px-3 py-1 bg-yellow-50 text-yellow-800 italic border-b-2 border-yellow-200 rounded font-serif shadow-sm">
                        {p.text}
                      </span>
                    ) : p.type === 'footnote' ? (
                      <FootnoteBadge key={i} id={p.id!} />
                    ) : (
                      <SmartReader key={i} text={p.text!} isQuizMode={isQuizMode} />
                    )
                  ))}
                </div>
              </section>

              <section className="pt-12 border-t border-gray-50">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-8 bg-gray-50 flex items-center justify-center rounded-lg border border-gray-100 text-[10px] font-black text-gray-400">P2</span>
                  <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] pt-0.5">Reflection & Conclusion</h3>
                </div>
                <div className="text-xl md:text-2xl leading-[2.4] text-[#37352F] font-serif">
                  {FORMULA_DATA.p2.map((p, i) => (
                    p.type === 'placeholder' ? (
                      <span key={i} className="mx-1 px-3 py-1 bg-yellow-50 text-yellow-800 italic border-b-2 border-yellow-200 rounded font-serif shadow-sm">
                        {p.text}
                      </span>
                    ) : p.type === 'footnote' ? (
                      <FootnoteBadge key={i} id={p.id!} />
                    ) : (
                      <SmartReader key={i} text={p.text!} isQuizMode={isQuizMode} />
                    )
                  ))}
                </div>
              </section>
            </div>
          )}

          {tab === 'essays' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                {ESSAY_DATA.map((e, i) => (
                  <button
                    key={i}
                    onClick={() => setEssayIdx(i)}
                    className={`px-6 py-3 rounded-full text-xs font-black whitespace-nowrap transition-all border ${essayIdx === i ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'}`}
                  >
                    {e.title}
                  </button>
                ))}
              </div>

              <div className="bg-[#FBFBFA] p-8 md:p-14 rounded-[2rem] border border-gray-100 shadow-sm">
                <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-14 text-[#37352F]">
                  {ESSAY_DATA[essayIdx].title}
                </h2>
                <div className="text-xl md:text-2xl leading-[2.2] text-[#37352F] font-serif">
                  <SmartReader text={ESSAY_DATA[essayIdx].content} isQuizMode={isQuizMode} />
                </div>
              </div>
            </div>
          )}

          {tab === 'vocab' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter dictionary by term or definition..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-14 pr-6 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none text-base font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVocab.map(([word, info]) => (
                  <div key={word} className="p-8 border border-gray-100 rounded-3xl hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all bg-white group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.04] pointer-events-none group-hover:scale-110 transition-transform">
                      <BookOpen className="w-16 h-16" />
                    </div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-2xl font-black group-hover:text-blue-600 transition-colors tracking-tight">{word}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-blue-500 font-black font-mono tracking-tight bg-blue-50 px-2 py-0.5 rounded">{info.kk}</span>
                          <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{info.pos}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-base text-gray-700 mb-6 font-medium leading-relaxed">{info.def}</p>
                    <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-400 border-l-4 border-gray-200 italic leading-relaxed">
                      "{info.ex}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#37352F]/95 backdrop-blur-xl px-10 py-4 rounded-full text-white/40 text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-12 border border-white/10 shadow-2xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div> 
          <span>System Active</span>
        </div>
        <div className="hidden md:block">Grade: CEFR C1 Academic</div>
        <div className="flex items-center gap-5 border-l border-white/10 pl-12">
          <ExternalLink className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
        </div>
      </footer>

      <style>{`
        @keyframes progress {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
