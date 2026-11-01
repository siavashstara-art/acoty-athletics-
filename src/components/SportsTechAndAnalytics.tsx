import React, { useState } from 'react';
import {
  BarChart3,
  Cpu,
  Activity,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Volume2,
  FileCheck,
  TrendingUp,
  Compass,
  Gauge,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AdhdSettings, SportsTechAssessmentModule, UserProfile } from '../types/index.ts';
import { PACKAGE3_TECH_DATA } from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface SportsTechAndAnalyticsProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onProceedNext?: () => void;
}

export const SportsTechAndAnalytics: React.FC<SportsTechAndAnalyticsProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile,
  onProceedNext
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(PACKAGE3_TECH_DATA[0].id);
  const [checkedAdhdSteps, setCheckedAdhdSteps] = useState<Record<string, boolean>>({});

  // Interactive ACWR (Acute:Chronic Workload Ratio) Calculator state
  const [acuteLoad, setAcuteLoad] = useState<number>(2200); // 7-day load in AU
  const [chronicLoad, setChronicLoad] = useState<number>(2000); // 28-day average load in AU

  // Interactive Auto-Regulation Assessment
  const [perceivedFatigue, setPerceivedFatigue] = useState<number>(4); // 1 to 10
  const [sleepScore, setSleepScore] = useState<number>(85); // 0 to 100%

  // Local state for Package 3 submission confirmation
  const [isPackageSaved, setIsPackageSaved] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tavana_package3_registered') === 'true';
    } catch {
      return false;
    }
  });

  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Compute ACWR
  const acwrRatio = chronicLoad > 0 ? Number((acuteLoad / chronicLoad).toFixed(2)) : 1.0;

  let acwrStatus: { label: string; color: string; advice: string } = {
    label: 'ناحیه طلایی بهینه (Sweet Spot)',
    color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40',
    advice: 'سازگاری بدنی عالی؛ حداقل ریسک آسیب و بیشترین آمادگی برای رقابت.'
  };

  if (acwrRatio < 0.8) {
    acwrStatus = {
      label: 'بار ناکافی (Under-training)',
      color: 'text-amber-400 bg-amber-950/40 border-amber-500/40',
      advice: 'بار تمرینی برای پیشرفت فیزیولوژیک کم است؛ ریسک افت آمادگی.'
    };
  } else if (acwrRatio > 1.5) {
    acwrStatus = {
      label: 'منطقه خطر بحرانی (Danger Zone)',
      color: 'text-rose-400 bg-rose-950/40 border-rose-500/40',
      advice: 'هشدار جدی: افزایش ناگهانی بار تمرینی! ریسک آسیب تاندون و همسترینگ تا ۴ برابر افزایش می‌یابد.'
    };
  } else if (acwrRatio > 1.3) {
    acwrStatus = {
      label: 'منطقه هشدار و مراقبت (Warning Zone)',
      color: 'text-yellow-400 bg-yellow-950/40 border-yellow-500/40',
      advice: 'بار تمرین بالا رفته است؛ استراحت و خواب ورزشکار را افزایش دهید.'
    };
  }

  // Auto-regulation recommendation
  const recommendedVolumeChange =
    perceivedFatigue >= 8 || sleepScore < 60
      ? '-۱۵٪ کاهش حجم و شدت (ست‌های سنگین حذف شود)'
      : perceivedFatigue <= 3 && sleepScore >= 80
      ? '+۵ الی +۱۰٪ افزایش بار یا ثبت رکورد بیشینه'
      : 'حفظ برنامه استاندارد طبق پیش‌بینی هفتگی';

  const handleSavePackage3 = () => {
    setIsPackageSaved(true);
    try {
      localStorage.setItem('tavana_package3_registered', 'true');
    } catch {
      // ignore
    }
    soundAndSpeech.playSuccessChime();
    setSaveToast('پکیج سوم (تکنولوژی، تست‌های ارزیابی و داده‌محوری) با موفقیت در ایسیتی اتلتیکس ثبت و تایید گردید!');
    setTimeout(() => {
      setSaveToast(null);
    }, 4500);

    // Give bonus loyalty points
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 500
    }));

    if (adhdSettings.voiceNarration) {
      soundAndSpeech.speakText('پکیج سوم تکنولوژی و ارزیابی عملکرد با موفقیت ثبت شد.');
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
      {/* Official Package 3 Header Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#121217]">
        <div className="p-5 sm:p-7 relative z-10 bg-gradient-to-r from-[#181822] via-[#121217] to-[#1a1710]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold bg-black/60 px-3 py-1 rounded-full border border-[#d4af37]/30">
              <BarChart3 className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span>پکیج ۳: تکنولوژی، تست‌های ارزیابی و داده‌محوری (ماژول‌های ۱۵ تا ۱۹)</span>
            </div>
            {isPackageSaved && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ثبت‌شده در ایسیتی اتلتیکس</span>
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
            ارزیابی استاندارد عملکرد، تلمتری GPS و پایش هوشمند بار تمرینی
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-3xl leading-relaxed">
            استفاده از الگوریتم‌های پیشرفته بار کاری حاد به مزمن (ACWR)، سنجش خروجی توان بی‌هوازی با فورس پلیت و خودتنظیمی هوشمند بر پایه RPE با متدولوژی اختصاصی خدمات‌جو (اس‌ئی امیری / سیاوش علی‌میری).
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

      {/* Interactive ACWR Simulator & Workload Dashboard */}
      <div className="bg-[#121217] border border-[#d4af37]/30 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                محاسبه‌گر زنده نسبت بار حاد به مزمن (ACWR Training Load Matrix)
              </h3>
              <p className="text-[11px] text-zinc-400">
                پیشرفته‌ترین شاخص بین‌المللی جلوگیری از آسیب ناشی از افزایش ناگهانی فشار
              </p>
            </div>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full border font-bold ${acwrStatus.color}`}>
            {acwrStatus.label}
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#181822] p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex justify-between items-center text-zinc-300">
              <span>بار حاد خستگی ۷ روز گذشته (Acute Load):</span>
              <strong className="text-[#d4af37] font-mono text-sm">{acuteLoad} AU</strong>
            </div>
            <input
              type="range"
              min={800}
              max={3500}
              step={50}
              value={acuteLoad}
              onChange={e => setAcuteLoad(Number(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
            <span className="text-[10px] text-zinc-500 block">
              نشان‌دهنده خستگی انباشته شده اخیر (تمرینات، مسابقات و اسپرینت‌ها)
            </span>
          </div>

          <div className="bg-[#181822] p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex justify-between items-center text-zinc-300">
              <span>میانگین بار مزمن ۲۸ روز گذشته (Chronic Load):</span>
              <strong className="text-[#00f2fe] font-mono text-sm">{chronicLoad} AU</strong>
            </div>
            <input
              type="range"
              min={800}
              max={3000}
              step={50}
              value={chronicLoad}
              onChange={e => setChronicLoad(Number(e.target.value))}
              className="w-full accent-[#00f2fe] cursor-pointer"
            />
            <span className="text-[10px] text-zinc-500 block">
              نشان‌دهنده ظرفیت تطابق و آمادگی هوازی پایه‌ای ورزشکار
            </span>
          </div>
        </div>

        {/* Live Calculated Ratio Display */}
        <div className="bg-[#181820] p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-black border border-[#d4af37]/40 flex items-center justify-center font-mono font-black text-xl text-[#d4af37]">
              {acwrRatio}
            </div>
            <div>
              <span className="text-xs text-zinc-400 block">شاخص محاسبه‌شده ACWR:</span>
              <strong className="text-sm text-white">{acwrStatus.advice}</strong>
            </div>
          </div>
          <button
            onClick={() => {
              soundAndSpeech.speakText(
                `شاخص بار حاد به مزمن شما ${acwrRatio} است. وضعیت: ${acwrStatus.label}. ${acwrStatus.advice}`
              );
            }}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-[#d4af37] shrink-0"
            title="قرائت صوتی گزارش ACWR"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Auto-regulation recommendation */}
        <div className="bg-gradient-to-r from-[#d4af37]/10 via-zinc-900 to-transparent p-3.5 rounded-xl border-r-4 border-[#d4af37] text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="font-bold text-[#d4af37] block">
              توصیه هوشمند الگوریتم خودتنظیمی (Auto-Regulation Cues):
            </span>
            <span className="text-zinc-200">{recommendedVolumeChange}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-zinc-400">
            <span>خستگی ادراکی: {perceivedFatigue}/۱۰</span>
            <span>کیفیت ریکاوری خواب: {sleepScore}٪</span>
          </div>
        </div>
      </div>

      {/* 3 Photo-Centric Technology & Assessment Modules (ماژول‌های ۱۵ تا ۱۹) */}
      <div className="space-y-5">
        {PACKAGE3_TECH_DATA.map(mod => {
          const isExpanded = expandedId === mod.id;

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
                  setExpandedId(isExpanded ? null : mod.id);
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
                  {mod.moduleNumbers}
                </span>
              </div>

              {/* Card Content Header */}
              <div
                onClick={() => {
                  setExpandedId(isExpanded ? null : mod.id);
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
                        `${mod.titleFa}. خلاصه: ${mod.summaryFa.join(' ')}. متد خدمات‌جو: ${mod.proTipFa}`
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
                  {/* Summary Box */}
                  <div
                    className={
                      mod.id === 'tech-gps-tracking-17-18'
                        ? 'bg-[#00f2fe]/5 border-r-4 border-[#00f2fe] p-3.5 rounded-lg text-xs leading-relaxed text-zinc-200 space-y-1'
                        : 'bg-[#d4af37]/5 border-r-4 border-[#d4af37] p-3.5 rounded-lg text-xs leading-relaxed text-zinc-200 space-y-1'
                    }
                  >
                    {mod.summaryFa.map((point, idx) => (
                      <p key={idx}>• {point}</p>
                    ))}
                  </div>

                  {/* Standard Protocols Table / Cards */}
                  <div className="bg-[#181822] border border-zinc-800 rounded-xl p-4 space-y-3 text-xs">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Cpu className="w-4 h-4 text-[#d4af37]" />
                      <span>{mod.keyProtocolTitle}:</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {mod.protocolDetails.map((proto, pIdx) => (
                        <div
                          key={pIdx}
                          className="bg-[#13131a] p-3 rounded-lg border border-zinc-800/80 space-y-1"
                        >
                          <span className="font-bold text-[#d4af37] block">
                            {proto.name}
                          </span>
                          <span className="text-zinc-300 text-[11px] block">
                            استاندارد: {proto.standard}
                          </span>
                          <span className="text-emerald-400 text-[10px] block">
                            شاخص: {proto.metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coach Pro-Tip (Metodologi Khadamat-Joo by Siavash Ali-Miri) */}
                  <div className="bg-gradient-to-r from-[#d4af37]/15 via-[#d4af37]/5 to-transparent border-r-4 border-[#d4af37] p-4 rounded-xl text-xs leading-relaxed">
                    <div className="font-bold text-[#d4af37] flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>متدولوژی اختصاصی خدمات‌جو (اس‌ئی امیری / سیاوش علی‌میری):</span>
                    </div>
                    <p className="text-zinc-200">{mod.proTipFa}</p>
                  </div>

                  {/* ADHD Micro-Steps Checklist */}
                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>ریزگام‌های اجرایی ADHD برای تست و ثبت داده:</span>
                      </div>
                      <span className="text-[10px] text-amber-300/80">برای تایید کلیک کنید</span>
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

      {/* Formal Submission Button for Package 3 */}
      <div className="pt-2">
        <button
          onClick={handleSavePackage3}
          className="w-full bg-gradient-to-r from-[#d4af37] via-[#f1d06b] to-[#b8860b] hover:from-[#e5c158] hover:to-[#a77a0a] text-black border-none rounded-2xl py-4 px-6 text-sm sm:text-base font-black cursor-pointer shadow-[0_4px_25px_rgba(212,175,55,0.4)] transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <FileCheck className="w-5 h-5 text-black" />
          <span>ثبت پکیج سوم در ایسیتی اتلتیکس (تکنولوژی و ارزیابی عملکرد)</span>
        </button>

        {isPackageSaved && (
          <div className="text-center mt-3 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>پکیج سوم (تکنولوژی و ارزیابی عملکرد) با موفقیت در سیستم تایید شد و ۵۰۰ امتیاز وفاداری افزوده گردید!</span>
          </div>
        )}
      </div>
    </div>
  );
};
