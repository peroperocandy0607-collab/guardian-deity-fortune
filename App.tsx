import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultView from './components/ResultView';
import { generateFortune } from './services/geminiService';
import { UserInput, FortuneResult, LoadingState } from './types';

// Component for the "God Ensemble" visualization (Image Header)
const GodEnsemble: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-10 fade-in px-4 md:px-0 perspective-1000">
      {/* 
        NOTE: The user should place the attached image as 'header_visual.png' in the public directory.
        The design applies a soft frame, shadow, and hover effect to blend with the site's atmosphere.
      */}
      <div className="relative w-full rounded-[2rem] shadow-2xl overflow-hidden border-[6px] border-white ring-1 ring-beige-200 group transform transition-all hover:scale-[1.01] duration-700 bg-white">
        
        {/* Image Display */}
        <img 
          src="/header_visual.png" 
          alt="神々の集合" 
          className="relative w-full h-auto object-cover z-10"
          onError={(e) => {
            // Fallback display if image is missing
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.classList.add('bg-beige-100', 'flex', 'items-center', 'justify-center', 'h-64');
                e.currentTarget.parentElement.innerHTML = '<div class="text-center p-4"><p class="text-stone-500 font-serif mb-2">画像を読み込めませんでした</p><p class="text-xs text-stone-400">publicフォルダに header_visual.png を配置してください</p></div>';
            }
          }}
        />
        
        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"></div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false, message: '' });

  const handleFortuneTell = async (input: UserInput) => {
    setLoading({ isLoading: true, message: '星の配置と魂の記録を読み解いています...' });
    
    // Artificial delay steps for atmosphere
    setTimeout(() => setLoading({ isLoading: true, message: '全156柱の神々から守護神を探しています...' }), 2500);
    setTimeout(() => setLoading({ isLoading: true, message: '統計学と易学に基づき、80種の運命パターンを照合中...' }), 5000);
    setTimeout(() => setLoading({ isLoading: true, message: '守護神の御姿を念写しています...（少々お待ちください）' }), 7500);

    try {
      const fortune = await generateFortune(input);
      setResult(fortune);
    } catch (error) {
      alert("申し訳ありません。神々との通信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading({ isLoading: false, message: '' });
    }
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-serif relative overflow-hidden bg-stone-50">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 15px rgba(184, 152, 104, 0.2); }
          50% { box-shadow: 0 0 30px rgba(184, 152, 104, 0.6), 0 0 10px rgba(255, 255, 255, 0.8); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        /* CSS for balanced text wrapping to avoid single orphans */
        .text-balance {
          text-wrap: balance;
        }
      `}</style>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-beige-200 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-beige-300 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-stone-200 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      <header className="pt-8 pb-4 z-10 text-center relative">
        <h1 className="text-3xl md:text-5xl font-bold text-stone-700 tracking-[0.2em] mb-2 drop-shadow-sm font-serif">
          守護神占い
        </h1>
        <p className="text-sm md:text-base text-stone-500 font-sans tracking-widest uppercase mb-8">
          Guardian Deity Fortune
        </p>
        
        {/* Deity Ensemble Section (Image Visual) */}
        {!result && !loading.isLoading && <GodEnsemble />}
      </header>

      <main className="flex-grow container mx-auto px-4 z-10 py-2">
        {!result && !loading.isLoading && (
          <div className="flex flex-col items-center">
            
            {/* Introduction Text - Optimized for Mobile Readability */}
            <div className="max-w-xl mx-auto text-center mb-10 text-stone-600 font-sans bg-white/60 p-6 md:p-8 rounded-2xl border border-beige-100 shadow-sm backdrop-blur-md">
              <div className="space-y-6">
                <p className="text-balance leading-loose text-sm md:text-base">
                  空海、仏様、八百万の神、妖精、龍神、宇宙の神々...
                  <br className="hidden md:block"/>
                  <strong className="text-stone-800 text-lg mx-1">全156柱</strong>
                  の愛らしくも偉大な存在たち。
                </p>
                <p className="text-balance leading-loose text-sm md:text-base">
                  あなたの生年月日から、魂を守護する一柱を導き出し
                  <br className="hidden md:block"/>
                  本質・恋愛・仕事・命運を
                  <span className="border-b border-beige-400 pb-1 font-bold text-stone-700 mx-1">プロ級の精度</span>
                  で鑑定します。
                </p>
              </div>
            </div>

            <InputForm onSubmit={handleFortuneTell} isLoading={loading.isLoading} />
          </div>
        )}

        {loading.isLoading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50/90 backdrop-blur-sm transition-all duration-700">
             {/* Rich Divine Loading Animation */}
             <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                 
                 {/* Radial Glow Background */}
                 <div className="absolute w-full h-full bg-gradient-to-r from-beige-200/0 via-beige-400/20 to-beige-200/0 rounded-full blur-2xl animate-pulse"></div>

                 {/* Outer Gold Ring (Slow Rotate) */}
                 <div className="absolute inset-0 border-[2px] border-beige-200 rounded-full animate-[spin_12s_linear_infinite]"></div>
                 
                 {/* Middle Decorative Ring (Counter Rotate) */}
                 <div className="absolute inset-4 border-[1px] border-dashed border-beige-400 rounded-full animate-[spin_20s_linear_infinite_reverse] opacity-70"></div>
                 
                 {/* Inner Glowing Ring */}
                 <div className="absolute inset-10 border-[3px] border-double border-beige-300 rounded-full animate-glow"></div>

                 {/* Magic Particles */}
                 <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-beige-500 rounded-full shadow-[0_0_10px_rgba(184,152,104,0.8)]"></div>
                 </div>
                 
                 {/* Pentagram SVG (Divine Style) */}
                 <svg 
                   viewBox="0 0 100 100" 
                   className="w-32 h-32 text-stone-700 drop-shadow-[0_0_15px_rgba(184,152,104,0.6)] animate-pulse relative z-10"
                 >
                   <path 
                     d="M50 5 L63 40 L98 40 L70 60 L80 95 L50 75 L20 95 L30 60 L2 40 L37 40 Z" 
                     fill="none" 
                     stroke="currentColor" 
                     strokeWidth="1"
                     className="text-stone-600"
                   />
                   <path 
                     d="M50 5 L80 95 L5 35 L95 35 L20 95 Z" 
                     fill="none" 
                     stroke="#b89868" 
                     strokeWidth="1.5"
                     className="drop-shadow-sm opacity-90"
                   />
                 </svg>
                 
                 {/* Center Core Light */}
                 <div className="absolute w-2 h-2 bg-white rounded-full blur-[2px] animate-ping z-20"></div>
             </div>
             
             <div className="text-center space-y-3 relative z-10">
                <h3 className="text-2xl md:text-3xl text-stone-700 font-serif font-bold tracking-widest drop-shadow-sm">
                    交信中...
                </h3>
                <p className="text-stone-500 font-serif tracking-wider animate-pulse text-base md:text-lg">
                    {loading.message}
                </p>
                <div className="w-16 h-1 bg-beige-300 mx-auto rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-beige-500 animate-[translateX_1.5s_ease-in-out_infinite] w-1/2 rounded-full"></div>
                </div>
             </div>
          </div>
        )}

        {result && (
          <ResultView result={result} onReset={handleReset} />
        )}
      </main>

      <footer className="py-8 text-center text-stone-400 text-xs z-10 font-sans border-t border-beige-200 mt-auto bg-white/30 backdrop-blur-sm">
        <p>© 2024 Guardian Deity Fortune. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;