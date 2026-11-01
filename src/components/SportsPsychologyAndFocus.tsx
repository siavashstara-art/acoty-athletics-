import React, { useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  Target,
  Users,
  Wind,
  CheckCircle2,
  Sparkles,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Award,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { AdhdSettings, SportsPsychologyModule, UserProfile } from '../types/index.ts';
import { PACKAGE2_PSYCHOLOGY_DATA } from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface SportsPsychologyAndFocusProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onProceedNext?: () => void;
}

export const SportsPsychologyAndFocus: React.FC<SportsPsychologyAndFocusProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile,
  onProceedNext
}) => {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(
    PACKAGE2_PSYCHOLOGY_DATA[0].id
  );
  const [checkedAdhdSteps, setCheckedAdhdSteps] = useState<Record<string, boolean>>({});

  // Box Breathing Interactive Tool
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<'دم (Inhale)' | 'حبس (Hold)' | 'بازدم (Exhale)' | 'حبس (Empty)'>('دم (Inhale)');
  const [breathingCount, setBreathingCount] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  // Local state for Package 2 submission confirmation
  const [isPackageSaved, setIsPackageSaved] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tavana_package2_registered') === 'true';
    } catch {
      return false;
    }
  });

  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Box Breathing cycle effect
  useEffect(() => {
    let timer: any = null;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathingCount(prev => {
          if (prev <= 1) {
            // Transition phase
            setBreathingPhase(current => {
              if (current === 'دم (Inhale)') {
                soundAndSpeech.playTick();
                return 'حبس (Hold)';
              } else if (current === 'حبس (Hold)') {
                soundAndSpeech.playTick();
                return 'بازدم (Exhale)';
              } else if (current === 'بازدم (Exhale)') {
                soundAndSpeech.playTick();
                return 'حبس (Empty)';
              } else {
                soundAndSpeech.playSuccessChime();
                setCompletedCycles(c => c + 1);
                return 'دم (Inhale)';
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive]);

  const handleSavePackage2 = () => {
    setIsPackageSaved(true);
    try {
      localStorage.setItem('tavana_package2_registered', 'true');
    } catch {
      // ignore
    }
    soundAndSpeech.playSuccessChime();
    setSaveToast('پکیج دوم (روانشناسی ورزشی، تمرکز و استرس مسابقه) با موفقیت در ایسیتی اتلتیکس ثبت و تایید گردید!');
    setTimeout(() => {
      setSaveToast(null);
    }, 4500);

    // Give bonus loyalty points
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 500
    }));

    if (adhdSettings.voiceNarration) {
      soundAndSpeech.speakText('پکیج دوم روانشناسی ورزشی و تمرکز با موفقیت ثبت شد.');
    }
  };

  const toggleAdhdStep = (stepKey: string) => {
    const next = !checkedAdhdSteps[stepKey];
    setCheckedAdhdSteps(prev => ({ ...prev, [stepKey]: next }));
    if (next) {
      soundAndSpeech.playSuccessChime();
    } else {
      soundAndSpeech.playTick();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Official Package 2 Header Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#121217]">
        <div className="p-5 sm:p-7 relative z-10 bg-gradient-to-r from-[#181822] via-[#121217] to-[#1a1710]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold bg-black/60 px-3 py-1 rounded-full border border-[#d4af37]/30">
              <Brain className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span>پکیج ۲: روانشناسی، تمرکز و استرس مسابقه (ماژول‌های ۱۱ تا ۱۴)</span>
            </div>
            {isPackageSaved && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ثبت‌شده در ایسیتی اتلتیکس</span>
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
            برنامه‌نویسی ذهن قهرمانان، تنفس جعبه‌ای و هم‌افزایی تیمی
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-3xl leading-relaxed">
            کدهای روان‌تنی برای مهار استرس، رهایی از اضطراب عملکرد، حفظ تمرکز در شرایط خستگی مفرط مسابقه و ایجاد هارمونی روانی در تیم با متدولوژی اختصاصی خدمات‌جو (اس‌ئی امیری / سیاوش علی‌میری).
          </p>

          {/* Toast Notification */}
          {saveToast && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{saveToast}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Box Breathing Trainer (تمرین تعاملی تنفس جعبه‌ای ۴-۴-۴-۴) */}
      <div className="bg-[#121217] border border-[#00f2fe]/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-[#00f2fe]" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                شبیه‌ساز زنده تنفس جعبه‌ای (Box Breathing ۴-۴-۴-۴)
              </h3>
              <p className="text-[11px] text-zinc-400">
                ابزار ویژه مهار فوری استرس و کاهش ضربان قلب در لحظات حساس پیش از مسابقه
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsBreathingActive(!isBreathingActive);
                soundAndSpeech.playTick();
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isBreathingActive
                  ? 'bg-rose-500 text-white'
                  : 'bg-gradient-to-r from-[#00f2fe] to-cyan-500 text-black shadow-md'
              }`}
            >
              {isBreathingActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isBreathingActive ? 'توقف تمرین' : 'شروع تنفس جعبه‌ای'}</span>
            </button>
            <button
              onClick={() => {
                setIsBreathingActive(false);
                setBreathingCount(4);
                setBreathingPhase('دم (Inhale)');
                setCompletedCycles(0);
                soundAndSpeech.playTick();
              }}
              className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
              title="ریست"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Breathing Visualizer Stage */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Pulsating Ring */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                breathingPhase === 'دم (Inhale)'
                  ? 'scale-110 bg-[#00f2fe]/20 border-2 border-[#00f2fe]'
                  : breathingPhase === 'حبس (Hold)'
                  ? 'scale-110 bg-[#d4af37]/20 border-2 border-[#d4af37]'
                  : breathingPhase === 'بازدم (Exhale)'
                  ? 'scale-90 bg-cyan-600/20 border-2 border-cyan-400'
                  : 'scale-90 bg-zinc-700/20 border-2 border-zinc-600'
              }`}
            />
            {/* Center Counter */}
            <div className="text-center z-10">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                {breathingCount}
              </span>
              <span className="text-xs font-bold block mt-1 text-[#d4af37]">
                {breathingPhase}
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-zinc-400">
              دورهای تکمیل‌شده: <strong className="text-white">{completedCycles}</strong> دور (پیشنهاد: حداقل ۴ دور)
            </span>
          </div>
        </div>
      </div>

      {/* 4 Image-Centered Psychology Modules (ماژول‌های ۱۱ تا ۱۴) */}
      <div className="space-y-5">
        {PACKAGE2_PSYCHOLOGY_DATA.map(mod => {
          const isExpanded = expandedModuleId === mod.id;

          return (
            <div
              key={mod.id}
              className={`bg-[#121216] border rounded-2xl overflow-hidden transition-all duration-300 shadow-xl ${
                isExpanded
                  ? 'border-[#d4af37] ring-1 ring-[#d4af37]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
                  : 'border-zinc-800/90 hover:border-zinc-700'
              }`}
            >
              {/* Card Image Container with Badge */}
              <div
                onClick={() => {
                  setExpandedModuleId(isExpanded ? null : mod.id);
                  soundAndSpeech.playTick();
                }}
                className="w-full h-44 sm:h-52 md:h-60 overflow-hidden relative border-b border-zinc-800 cursor-pointer select-none group"
              >
                <img
                  src={mod.imageUrl}
                  alt={mod.titleFa}
                  className="w-full h-full object-cover filter brightness-[0.85] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/30" />
                <span className="absolute bottom-3 right-3 bg-black/85 text-[#d4af37] px-3 py-1 text-xs font-bold rounded-full border border-[#d4af37] shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  <span>{mod.badgeLabel}</span>
                </span>
                <span className="absolute top-3 left-3 bg-black/70 text-zinc-300 px-2.5 py-1 text-[11px] rounded-lg border border-zinc-700 font-mono">
                  ماژول {mod.moduleNumber}
                </span>
              </div>

              {/* Card Content Header */}
              <div
                onClick={() => {
                  setExpandedModuleId(isExpanded ? null : mod.id);
                  soundAndSpeech.playTick();
                }}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#d4af37]">
                    {mod.titleFa}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono" dir="ltr">
                    {mod.titleEn}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      soundAndSpeech.speakText(
                        `${mod.titleFa}. خلاصه: ${mod.summaryFa.join(' ')}. نکته طلایی خدمات‌جو: ${mod.proTipFa}`
                      );
                    }}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-[#d4af37]"
                    title="قرائت صوتی ماژول"
                    aria-label="قرائت صوتی"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#d4af37]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              </div>

              {/* Detailed Content */}
              {isExpanded && (
                <div className="px-4 pb-6 sm:px-6 sm:pb-6 space-y-5 border-t border-zinc-800/80 pt-4">
                  {/* Summary Box with Yellow or Cyan border as requested */}
                  <div
                    className={
                      mod.moduleNumber % 2 !== 0
                        ? 'bg-[#d4af37]/5 border-r-4 border-[#d4af37] p-3.5 rounded-lg text-xs leading-relaxed text-zinc-200 space-y-1'
                        : 'bg-[#00f2fe]/5 border-r-4 border-[#00f2fe] p-3.5 rounded-lg text-xs leading-relaxed text-zinc-200 space-y-1'
                    }
                  >
                    {mod.summaryFa.map((point, idx) => (
                      <p key={idx}>• {point}</p>
                    ))}
                  </div>

                  {/* Key Technique & Actionable Steps */}
                  <div className="bg-[#181822] border border-zinc-800 rounded-xl p-4 space-y-3 text-xs">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Zap className="w-4 h-4 text-[#d4af37]" />
                      <span>{mod.keyTechniqueTitle}:</span>
                    </div>
                    <ul className="pr-4 list-disc space-y-2 text-zinc-300 leading-relaxed">
                      {mod.keyTechniqueSteps.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Coach Siavash Pro-Tip (Metodologi Khadamat-Joo) */}
                  <div className="bg-gradient-to-r from-[#d4af37]/15 via-[#d4af37]/5 to-transparent border-r-4 border-[#d4af37] p-4 rounded-xl text-xs leading-relaxed">
                    <div className="font-bold text-[#d4af37] flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>متدولوژی اختصاصی خدمات‌جو (اس‌ئی امیری / سیاوش علی‌میری):</span>
                    </div>
                    <p className="text-zinc-200">{mod.proTipFa}</p>
                  </div>

                  {/* ADHD Micro-Steps Interactive Checklist */}
                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>ریزگام‌های تمرکز و کنترل اضطراب ADHD:</span>
                      </div>
                      <span className="text-[10px] text-amber-300/80">تیک بزنید</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.adhdMicroSteps.map((step, idx) => {
                        const key = `${mod.id}-${idx}`;
                        const isDone = checkedAdhdSteps[key];

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => toggleAdhdStep(key)}
                            className={`text-right p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${
                              isDone
                                ? 'bg-amber-500/20 border-amber-500 text-amber-200 line-through opacity-85'
                                : 'bg-[#18181f] border-zinc-700/70 text-zinc-200 hover:border-amber-400'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border text-[10px] ${
                                isDone
                                  ? 'bg-amber-400 border-amber-400 text-black font-bold'
                                  : 'border-zinc-500'
                              }`}
                            >
                              {isDone ? '✓' : ''}
                            </span>
                            <span className="leading-snug">{step}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Formal Submission Button for Package 2 */}
      <div className="pt-2">
        <button
          onClick={handleSavePackage2}
          className="w-full bg-gradient-to-r from-[#d4af37] via-[#f1d06b] to-[#b8860b] hover:from-[#e5c158] hover:to-[#a77a0a] text-black border-none rounded-2xl py-4 px-6 text-sm sm:text-base font-black cursor-pointer shadow-[0_4px_25px_rgba(212,175,55,0.4)] transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <FileCheck className="w-5 h-5 text-black" />
          <span>ثبت پکیج دوم در ایسیتی اتلتیکس (روانشناسی و تمرکز)</span>
        </button>

        {isPackageSaved && (
          <div className="text-center mt-3 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>پکیج دوم (روانشناسی، تمرکز و استرس مسابقه) با موفقیت در سیستم تایید شد و ۵۰۰ امتیاز وفاداری افزوده گردید!</span>
          </div>
        )}
      </div>
    </div>
  );
};
