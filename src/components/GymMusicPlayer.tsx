import React, { useState, useEffect, useRef } from 'react';
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Zap,
  Flame,
  Activity,
  Heart,
  ShieldCheck,
  Disc
} from 'lucide-react';
import { UserProfile, AdhdSettings } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface GymMusicPlayerProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  adhdSettings: AdhdSettings;
}

interface GymTrack {
  id: string;
  titleFa: string;
  genreFa: string;
  bpm: number;
  duration: string;
  synthMelody: 'energetic' | 'powerlifting' | 'cardio' | 'zen' | 'tabata';
  descriptionFa: string;
}

const GYM_TRACKS: GymTrack[] = [
  {
    id: 'track-1',
    titleFa: 'انرژی مطلق پاورلیفتینگ (140 BPM)',
    genreFa: 'الکترونیک سنگین & بیس دار',
    bpm: 140,
    duration: '۳:۴۵',
    synthMelody: 'powerlifting',
    descriptionFa: 'مناسب برای ست‌های سنگین اسکوات و ددلیفت با ضرب‌آهنگ کوبنده برای پمپاژ آدرنالین.'
  },
  {
    id: 'track-2',
    titleFa: 'رعد و برق کاردیو و چربی‌سوزی (155 BPM)',
    genreFa: 'پاور بیت تند & هاوس',
    bpm: 155,
    duration: '۴:۲۰',
    synthMelody: 'cardio',
    descriptionFa: 'ایده‌آل برای تردمیل، دوچرخه ثابت، ایروبیک و بدنسازی بانوان جهت بالا بردن ضربان قلب.'
  },
  {
    id: 'track-3',
    titleFa: 'تمرکز تونلی و انگیزه قهرمانان (128 BPM)',
    genreFa: 'ترنس انگیزشی مربی‌محور',
    bpm: 128,
    duration: '۴:۱۰',
    synthMelody: 'energetic',
    descriptionFa: 'موسیقی زمینه استاندارد برای پرزنت حضوری باشگاه‌ها و تمرینات تمرکزی با وزنه.'
  },
  {
    id: 'track-4',
    titleFa: 'ریکاوری و سرد کردن عضلات (95 BPM)',
    genreFa: 'امبینت آرامش‌بخش & لایت',
    bpm: 95,
    duration: '۵:۰۰',
    synthMelody: 'zen',
    descriptionFa: 'مناسب برای انتهای تمرین، حرکات کششی، ریکاوری مفاصل و آرام‌سازی سیستم عصبی.'
  },
  {
    id: 'track-5',
    titleFa: 'تواتا تاباتا اینتروال (160 BPM)',
    genreFa: 'بیت فوق‌العاده تند سرعتی',
    bpm: 160,
    duration: '۳:۳۰',
    synthMelody: 'tabata',
    descriptionFa: 'مخصوص تمرینات اینتروال پرشدت (HIIT) و بانوان در کلاس‌های تناسب اندام.'
  }
];

export const GymMusicPlayer: React.FC<GymMusicPlayerProps> = ({
  userProfile,
  setUserProfile,
  adhdSettings
}) => {
  const [currentTrack, setCurrentTrack] = useState<GymTrack>(GYM_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Web Audio API Synthesizer loop for Gym Beats (100% copyright free, synthesized live!)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  const startSynthBeat = (track: GymTrack) => {
    stopSynthBeat();
    setIsPlaying(true);
    setCurrentTrack(track);

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      let step = 0;
      const intervalMs = Math.floor(60000 / track.bpm / 2); // 8th notes

      timerRef.current = setInterval(() => {
        if (!audioCtxRef.current) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Synth frequencies based on track style
        let freq = 150;
        if (track.synthMelody === 'powerlifting') {
          freq = step % 4 === 0 ? 80 : step % 2 === 0 ? 120 : 200;
          osc.type = 'sawtooth';
        } else if (track.synthMelody === 'cardio') {
          freq = 220 + (step % 8) * 45;
          osc.type = 'square';
        } else if (track.synthMelody === 'zen') {
          freq = 174 + (step % 4) * 30; // Solfeggio frequency style
          osc.type = 'sine';
        } else if (track.synthMelody === 'tabata') {
          freq = step % 2 === 0 ? 300 : 450;
          osc.type = 'triangle';
        } else {
          freq = 196 + (step % 6) * 50;
          osc.type = 'triangle';
        }

        osc.frequency.setValueAtTime(freq, now);

        const targetVol = isMuted ? 0 : volume * 0.15;
        gain.gain.setValueAtTime(targetVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);

        step++;
      }, intervalMs);

      soundAndSpeech.playSuccessChime();
    } catch {
      // Audio context error fallback
    }
  };

  const stopSynthBeat = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = (track: GymTrack) => {
    if (isPlaying && currentTrack.id === track.id) {
      stopSynthBeat();
    } else {
      startSynthBeat(track);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthBeat();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#121216] to-[#0d1b2a] border-2 border-rose-500/40 rounded-3xl p-5 md:p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shrink-0">
            <div className="w-full h-full bg-[#121217] rounded-[14px] flex items-center justify-center">
              <Radio className={`w-6 h-6 text-rose-400 ${isPlaying ? 'animate-spin' : ''}`} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold gold-gradient-text">
                🎧 رادیو DJ اختصاصی باشگاه (آهنگ‌های ورزشی بدون کپی‌رایت)
              </h3>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2.5 py-0.5 rounded-full font-bold">
                بدون مشکل کپی‌رایت
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5">
              مجموعه آهنگ‌های هیجانی، ریتمیک و محرک ضربان قلب مخصوص باشگاه‌های بدنسازی آقایان و بانوان (بدون نیاز به جستجو برای پخش در سالن).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#181820] border border-zinc-800 px-3 py-1.5 rounded-xl text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-zinc-300 font-bold">۱۰۰٪ آزاد و قانونی</span>
        </div>
      </div>

      {/* Currently Playing Active Banner */}
      <div className="bg-[#181822] border border-rose-500/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isPlaying ? 'bg-rose-500/20 border border-rose-500 text-rose-300 animate-pulse' : 'bg-zinc-800 text-zinc-400'}`}>
            <Disc className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block">در حال پخش در سالن باشگاه:</span>
            <h4 className="text-sm font-extrabold text-white">{currentTrack.titleFa}</h4>
            <span className="text-[11px] text-rose-400 font-semibold">{currentTrack.genreFa} • {currentTrack.bpm} BPM</span>
          </div>
        </div>

        {/* Master Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => togglePlay(currentTrack)}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'توقف پخش' : 'پخش زنده بیت'}</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl bg-[#121217] border border-zinc-700 text-zinc-300 hover:text-white transition-all"
            title="قطع/وصل صدا"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 accent-rose-500 cursor-pointer hidden sm:block"
          />
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-zinc-300">لیست پخش پیش‌فرض باشگاه (انتخاب آهنگ):</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {GYM_TRACKS.map(track => {
            const isSelected = currentTrack.id === track.id && isPlaying;

            return (
              <div
                key={track.id}
                onClick={() => togglePlay(track)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-rose-950/30 border-rose-500 text-white shadow-lg'
                    : 'bg-[#181822] border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-[#20202a]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-rose-500 text-black font-bold' : 'bg-[#121217] text-zinc-400 border border-zinc-700'}`}>
                    {isSelected ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{track.titleFa}</h5>
                    <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{track.descriptionFa}</p>
                    <span className="text-[10px] text-rose-400 font-mono mt-1 inline-block">
                      {track.genreFa} | {track.bpm} BPM | {track.duration}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${isSelected ? 'bg-rose-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                    {isSelected ? 'در حال پخش' : 'پخش'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-[#121217] border border-zinc-800 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-zinc-300">
        <Sparkles className="w-5 h-5 text-rose-400 shrink-0" />
        <div>
          <strong className="text-white block mb-0.5">مزیت رادیو DJ برای مدیران باشگاه:</strong>
          <span>دیگر نیازی به سرچ و دانلود فایل‌های حجیم یا نگرانی درباره حق نشر (Copyright) نیست. با یک کلیک آهنگ مناسب ریتم تمرین را پخش کنید و انرژی سالن را به اوج برسانید.</span>
        </div>
      </div>
    </div>
  );
};
