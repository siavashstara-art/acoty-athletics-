import React from 'react';
import { SeasonInfo, SeasonId } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';
import { Sparkles, Layers, ChevronLeft } from 'lucide-react';

interface SeasonNavigatorProps {
  seasons: SeasonInfo[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeSeasonId: SeasonId;
  setActiveSeasonId: (season: SeasonId) => void;
}

export const SeasonNavigator: React.FC<SeasonNavigatorProps> = ({
  seasons,
  activeTab,
  setActiveTab,
  activeSeasonId,
  setActiveSeasonId
}) => {
  return (
    <section className="mb-6 space-y-3">
      {/* 4 Seasons Tabs Banner */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#d4af37]">
          <Layers className="w-4 h-4" />
          <span>معماری فصول چهارگانه اکوسیستم ورزش:</span>
        </div>
        <span className="text-[10px] text-zinc-400 hidden sm:inline">
          برای دسترسی به اسکریپت‌های هر فصل کلیک کنید
        </span>
      </div>

      {/* Season Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {seasons.map(season => {
          const isSeasonActive = activeSeasonId === season.id;
          const containsCurrentTab = season.subModules.some(m => m.id === activeTab);

          return (
            <button
              key={season.id}
              onClick={() => {
                setActiveSeasonId(season.id);
                // Switch to first sub-module of this season if activeTab is not in this season
                if (!containsCurrentTab && season.subModules.length > 0) {
                  setActiveTab(season.subModules[0].id);
                }
                soundAndSpeech.playTick();
              }}
              className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between relative overflow-hidden ${
                isSeasonActive
                  ? 'bg-gradient-to-br from-[#1a1810] to-[#121217] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-[#d4af37]/40'
                  : 'bg-[#121217] border-zinc-800 hover:border-zinc-700 text-zinc-300'
              }`}
            >
              {isSeasonActive && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#d4af37]/10 rounded-bl-full pointer-events-none" />
              )}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg">{season.icon}</span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isSeasonActive
                        ? 'bg-[#d4af37] text-black'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {season.numberFa}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-zinc-100 line-clamp-1">
                  {season.titleFa}
                </h3>
                <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {season.descriptionFa}
                </p>
              </div>

              {/* Sub-modules pills */}
              <div className="mt-3 pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1">
                {season.subModules.map(sub => (
                  <span
                    key={sub.id}
                    onClick={e => {
                      e.stopPropagation();
                      setActiveSeasonId(season.id);
                      setActiveTab(sub.id);
                      soundAndSpeech.playTick();
                    }}
                    className={`text-[9px] px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                      activeTab === sub.id
                        ? 'bg-[#d4af37] text-black font-black'
                        : 'bg-zinc-800/80 text-zinc-300 hover:text-[#d4af37]'
                    }`}
                  >
                    {sub.scriptNum}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
