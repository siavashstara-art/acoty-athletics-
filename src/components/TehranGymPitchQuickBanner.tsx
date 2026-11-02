import React, { useState } from 'react';
import { Sparkles, Building2, CheckCircle2, MapPin, User, ChevronDown, ChevronUp } from 'lucide-react';
import { TEHRAN_GYMS_PRESETS } from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface TehranGymPitchQuickBannerProps {
  onSelectGym: (gymName: string, manager: string, coach: string, gymType: string) => void;
}

export const TehranGymPitchQuickBanner: React.FC<TehranGymPitchQuickBannerProps> = ({ onSelectGym }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGym, setActiveGym] = useState(TEHRAN_GYMS_PRESETS[0]);

  const handlePick = (gym: typeof TEHRAN_GYMS_PRESETS[0]) => {
    setActiveGym(gym);
    setIsOpen(false);
    onSelectGym(gym.name, gym.manager, gym.coach, gym.gymType);
    soundAndSpeech.playSuccessChime();
    if (window.speechSynthesis) {
      soundAndSpeech.speakText(`خوش آمدید به پرزنت اختصاصی ${gym.name}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#1a1408] via-[#121217] to-[#1a1408] border-b-2 border-[#d4af37] px-4 py-3 shadow-[0_4px_30px_rgba(212,175,55,0.3)] relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left / Main Glorious Title Banner */}
        <div className="flex items-center gap-3 text-right">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#aa820a] flex items-center justify-center text-black shadow-lg shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-full border border-[#d4af37]/40 font-bold">
                🎯 پنل پرزنت حضوری در بالاترین نقطه برنامه
              </span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> فعال برای شمال، شرق، غرب تهران و بانوان/آقایان
              </span>
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-black gold-gradient-text mt-0.5 truncate max-w-2xl">
              {activeGym.name}
            </h2>
            <div className="text-[11px] text-zinc-300 flex flex-wrap items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1 text-amber-300">
                <User className="w-3.5 h-3.5" /> مدیریت: {activeGym.manager} | مربی: {activeGym.coach}
              </span>
              <span className="flex items-center gap-1 text-cyan-300">
                <MapPin className="w-3.5 h-3.5" /> {activeGym.zoneFa} ({activeGym.gymType})
              </span>
            </div>
          </div>
        </div>

        {/* Right Action: Selector Dropdown Trigger */}
        <div className="relative shrink-0 w-full md:w-auto">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              soundAndSpeech.playTick();
            }}
            className="w-full md:w-auto bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa820a] hover:opacity-95 text-black font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>انتخاب باشگاه (شمال، شرق، غرب، آقایان/بانوان)</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Dropdown Menu of Tehran Gyms */}
          {isOpen && (
            <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-full md:w-96 bg-[#121217] border-2 border-[#d4af37] rounded-2xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto no-scrollbar">
              <div className="px-4 py-2 text-xs font-extrabold text-[#d4af37] border-b border-zinc-800 flex items-center justify-between">
                <span>لیست باشگاه‌های تهران (آقایان و بانوان):</span>
                <span className="text-[10px] text-zinc-400">۱ کلیک تا پرزنت باشکوه</span>
              </div>
              <div className="p-1 space-y-1">
                {TEHRAN_GYMS_PRESETS.map((gym) => {
                  const isSelected = activeGym.id === gym.id;
                  return (
                    <button
                      key={gym.id}
                      onClick={() => handlePick(gym)}
                      className={`w-full text-right p-2.5 rounded-xl text-xs transition-all flex flex-col gap-1 ${
                        isSelected
                          ? 'bg-[#d4af37] text-black font-black shadow'
                          : 'bg-[#181820] text-zinc-200 hover:bg-zinc-800 hover:text-[#d4af37]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>{gym.name}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded ${isSelected ? 'bg-black text-[#d4af37]' : 'bg-zinc-800 text-amber-300'}`}>
                          {gym.zoneFa.split(' - ')[0]}
                        </span>
                      </div>
                      <div className={`text-[10px] ${isSelected ? 'text-zinc-900' : 'text-zinc-400'}`}>
                        {gym.gymType} | مدیر: {gym.manager} | مربی: {gym.coach}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
