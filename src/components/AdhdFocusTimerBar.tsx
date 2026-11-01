import React, { useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, X, Volume2, Sparkles } from 'lucide-react';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface AdhdFocusTimerBarProps {
  exerciseTitle: string;
  timeLeft: number;
  isRunning: boolean;
  onTogglePlayPause: () => void;
  onReset: () => void;
  onClose: () => void;
}

export const AdhdFocusTimerBar: React.FC<AdhdFocusTimerBarProps> = ({
  exerciseTitle,
  timeLeft,
  isRunning,
  onTogglePlayPause,
  onReset,
  onClose
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto z-40 bg-[#121217]/95 backdrop-blur-md border-2 border-[#d4af37] rounded-2xl p-3.5 shadow-[0_10px_35px_rgba(212,175,55,0.3)] animate-in slide-in-from-bottom-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div className="truncate">
            <span className="text-[10px] text-amber-300 font-bold block">
              تایمر تمرکز ADHD و استراحت بین ست‌ها
            </span>
            <span className="text-xs text-white font-semibold truncate block">
              {exerciseTitle}
            </span>
          </div>
        </div>

        {/* Time display & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xl font-black text-[#d4af37] tracking-wider tabular-nums">
            {formatTime(timeLeft)}
          </span>

          <button
            onClick={onTogglePlayPause}
            className="w-8 h-8 rounded-lg bg-[#d4af37] text-black flex items-center justify-center font-bold hover:bg-[#e5c158] transition-colors"
            title={isRunning ? 'توقف' : 'شروع'}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={onReset}
            className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            title="شروع مجدد"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-rose-400 flex items-center justify-center transition-colors"
            title="بستن تایمر"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
