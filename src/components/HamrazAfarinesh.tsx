import React from 'react';
import { Sparkles, Brain, Feather, Flame, Volume2, Smartphone } from 'lucide-react';
import { HAMRAZ_AFARINESH_CONTENT } from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

export const HamrazAfarinesh: React.FC = () => {
  const handleReadQuote = (quote: string) => {
    soundAndSpeech.speakText(quote);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#1a1205] via-[#121217] to-[#09090b] border-2 border-[#d4af37] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] mb-2">
          <Sparkles className="w-4 h-4" />
          <span>بستر مستقل آموزش، تفکر و اراده (الزامی بند ۱۱)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          بخش همراز و آفرینش | متدولوژی اختصاصی خدمات‌جو
        </h2>
        <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
          خلق شده بر پایه آموزه‌ها و متد استاد سیاوش علی‌میری (اس‌ئی امیری)؛ همگام‌سازی فیزیولوژی ورزش، انضباط ذهنی و فلسفه پیروزی بر محدودیت‌ها در عصر نیو متاورس.
        </p>

        {/* Redmi Note 8 Testament Badge */}
        <div className="mt-4 inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/40 px-3.5 py-1.5 rounded-xl text-xs text-amber-200">
          <Smartphone className="w-4 h-4 text-[#d4af37]" />
          <span>یادمان توسعه موبایلی: نماد غلبه اراده انسان بر کمبود ابزار و دسکتاپ</span>
        </div>
      </div>

      {/* 3 Core Principles */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#d4af37] flex items-center gap-2">
          <Brain className="w-4 h-4" />
          <span>اصول سه‌گانه متدولوژی خدمات‌جو:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HAMRAZ_AFARINESH_CONTENT.principles.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#121217] border border-zinc-800 hover:border-[#d4af37]/60 rounded-2xl p-4 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold text-sm mb-3">
                  ۰{idx + 1}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-2">
                  {p.title}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quotes from Siavash Ali-Miri */}
      <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3">
        <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <Feather className="w-4 h-4 text-amber-400" />
          <span>سخنان زرین و الهام‌بخش تالار آفرینش (با قرائت صوتی):</span>
        </h3>

        <div className="space-y-2.5">
          {HAMRAZ_AFARINESH_CONTENT.quotes.map((q, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 bg-[#181820] border border-zinc-800 p-3.5 rounded-xl hover:border-zinc-700 transition-colors"
            >
              <p className="text-xs text-zinc-200 font-medium italic">
                {q}
              </p>
              <button
                onClick={() => handleReadQuote(q)}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[#d4af37] shrink-0"
                title="شنیدن صوت"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
