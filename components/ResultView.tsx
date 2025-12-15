import React from 'react';
import { FortuneResult, TimelineEvent } from '../types';

interface ResultViewProps {
  result: FortuneResult;
  onReset: () => void;
}

const SectionCard: React.FC<{ title: string; content: string; icon: string }> = ({ title, content, icon }) => (
  <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-beige-200 mb-8 fade-in">
    <div className="flex items-center justify-center mb-6">
      <span className="text-3xl mr-3">{icon}</span>
      <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-700 border-b-2 pb-2 border-beige-300">
        {title}
      </h3>
    </div>
    <div className="prose prose-stone max-w-none">
      <p className="text-stone-600 leading-8 whitespace-pre-wrap font-sans text-base md:text-lg text-justify tracking-wide">
        {content}
      </p>
    </div>
  </div>
);

const TimelineSection: React.FC<{ timeline: TimelineEvent[] }> = ({ timeline }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-beige-200 mb-8 fade-in">
      <div className="flex items-center justify-center mb-6">
        <span className="text-3xl mr-3">⚡</span>
        <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-700 border-b-2 pb-2 border-beige-300">
          運命の転機
        </h3>
      </div>
      <div className="relative border-l-2 border-beige-300 ml-4 md:ml-6 space-y-10 py-4">
        {timeline.map((event, index) => (
            <div key={index} className="relative pl-6 md:pl-8">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-beige-500 border-4 border-white shadow-sm ring-1 ring-beige-200"></div>
                <h4 className="font-serif font-bold text-xl text-stone-800 mb-2">{event.period}</h4>
                <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed bg-stone-50 p-4 rounded-lg border border-stone-100 shadow-inner">
                    {event.description}
                </p>
            </div>
        ))}
      </div>
    </div>
  );

const InfoBadge: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col items-center p-4 bg-white/60 rounded-lg border border-beige-100 shadow-sm flex-1 min-w-[140px]">
        <span className="text-xs text-stone-500 font-sans mb-1">{label}</span>
        <span className="font-serif font-bold text-stone-700 text-center">{value}</span>
    </div>
);

const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      
      {/* Deity Profile Header */}
      <div className="bg-beige-50 border border-beige-200 p-8 rounded-2xl shadow-lg mb-12 text-center relative overflow-hidden fade-in">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-beige-300 via-beige-500 to-beige-300"></div>
        
        <p className="text-stone-500 font-serif mb-3 text-sm tracking-[0.2em] mt-2">あなたの魂を守護する存在</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-3 drop-shadow-sm">
          {result.deityName}
        </h2>
        <p className="text-beige-600 font-serif text-lg md:text-xl mb-8 italic">
          — {result.deityTitle} —
        </p>

        <div className="flex flex-col items-center justify-center mb-8">
           {/* Generated Image or Placeholder */}
           <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-full flex items-center justify-center shadow-inner border-[6px] border-beige-100 mb-6 relative overflow-hidden group">
             {result.deityImage ? (
                 <img src={result.deityImage} alt={result.deityName} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
             ) : (
                 <span className="text-6xl animate-pulse">✨</span>
             )}
           </div>
           <p className="text-stone-600 font-sans max-w-lg mx-auto leading-relaxed bg-white/50 p-4 rounded-xl text-sm md:text-base">
             {result.deityDescription}
           </p>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm font-sans text-stone-500 mt-6">
            <InfoBadge label="ラッキーカラー" value={result.luckyColor} />
            <InfoBadge label="守護アイテム" value={result.guardianItem} />
            <InfoBadge label="魂の縁が深い人" value={result.soulConnection} />
        </div>
      </div>

      {/* Main Fortune Sections (4 Pillars) */}
      <div className="space-y-6">
        <SectionCard 
            title="あなたの本質・深層心理" 
            icon="🔮" 
            content={result.essence} 
        />
        <SectionCard 
            title="愛の運命・結末" 
            icon="❤️" 
            content={result.love} 
        />
        <SectionCard 
            title="仕事・天職・成功" 
            icon="🕊️" 
            content={result.work} 
        />
        <SectionCard 
            title="命運・人生の試練と救済" 
            icon="🌠" 
            content={result.destiny} 
        />
        
        {/* Timeline (Turning Points) */}
        <TimelineSection timeline={result.timeline} />
      </div>

      <div className="mt-16 text-center">
        <p className="text-stone-500 mb-4 font-sans text-sm">鑑定結果は、あなたの心の奥底に届きましたか？</p>
        <button
          onClick={onReset}
          className="bg-stone-700 hover:bg-stone-800 text-white px-10 py-4 rounded-full font-serif text-lg transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1"
        >
          もう一度占う
        </button>
      </div>
    </div>
  );
};

export default ResultView;