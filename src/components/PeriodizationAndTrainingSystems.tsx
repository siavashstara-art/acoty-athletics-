import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  Zap,
  RotateCw,
  Target,
  Sliders,
  Sparkles,
  CheckCircle,
  Volume2,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Flame,
  Award
} from 'lucide-react';
import { AdhdSettings, PeriodizationCycleItem, TrainingSystemMethodItem, UserProfile } from '../types/index.ts';
import { PERIODIZATION_CYCLES_DATA, TRAINING_SYSTEMS_DATA } from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface PeriodizationAndTrainingSystemsProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onProceedNext?: () => void;
}

export const PeriodizationAndTrainingSystems: React.FC<PeriodizationAndTrainingSystemsProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile,
  onProceedNext
}) => {
  const [activeTab, setActiveTab] = useState<'cycles' | 'methods' | 'tapering'>('cycles');
  const [selectedCycleId, setSelectedCycleId] = useState<string>(PERIODIZATION_CYCLES_DATA[0].id);
  const [selectedMethodId, setSelectedMethodId] = useState<string>(TRAINING_SYSTEMS_DATA[0].id);
  const [notification, setNotification] = useState('');

  // Interactive Tapering Simulator
  const [daysToEvent, setDaysToEvent] = useState<number>(14);
  const [currentWeeklySets, setCurrentWeeklySets] = useState<number>(20);
  const [currentIntensityPercent, setCurrentIntensityPercent] = useState<number>(85);

  // Tapering calculations
  const taperVolumeReduction = daysToEvent <= 7 ? 0.5 : 0.7; // 50% or 30% reduction
  const targetWeeklySets = Math.round(currentWeeklySets * taperVolumeReduction);
  const supercompensationIndex = Math.min(100, Math.round(92 + (14 - daysToEvent) * 0.5));

  const selectedCycle = PERIODIZATION_CYCLES_DATA.find(c => c.id === selectedCycleId) || PERIODIZATION_CYCLES_DATA[0];
  const selectedMethod = TRAINING_SYSTEMS_DATA.find(m => m.id === selectedMethodId) || TRAINING_SYSTEMS_DATA[0];

  const handleSpeak = (text: string) => {
    soundAndSpeech.speakText(text);
  };

  const handleSaveModule5 = () => {
    soundAndSpeech.playSuccessChime();
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 150
    }));
    setNotification('✅ اسکریپت پنجم (سیستم‌های تمرینی و پیریودیزاسیون) با موفقیت در ایسیتی اتلتیکس ثبت شد! (+۱۵۰ امتیاز وفاداری)');
    setTimeout(() => setNotification(''), 4500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Visualizer Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
        <img
          src="/src/assets/images/periodization_training_systems_1793538523392.jpg"
          alt="مهندسی چرخه‌های تمرینی و پیریودیزاسیون ورزشی"
          className="w-full h-48 sm:h-64 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent flex flex-col justify-end p-5 sm:p-7">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/40 w-fit mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span>اسکریپت ۵: سیستم‌های تمرینی، پیریودیزاسیون و اوج‌گیری تپرینگ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>ایسیتی اتلتیکس | مهندسی چرخه‌ها و اوج‌گیری روز مسابقه</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            برنامه‌ریزی بلندمدت (ماکرو)، میان‌مدت (مزو) و کوتاه‌مدت (میکرو سیکل)، موازنه دقیق حجم و شدت برای پیشگیری از اورترینینگ و پروتکل تپرینگ برای اوج عملکرد روز مسابقه با متدولوژی خدمات‌جو.
          </p>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex rounded-2xl bg-[#121217] p-1.5 border border-zinc-800 shadow-lg">
        <button
          onClick={() => {
            setActiveTab('cycles');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'cycles'
              ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <RotateCw className="w-4 h-4" />
          <span>۱. مهندسی چرخه‌ها (ماکرو، مزو، میکرو)</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('methods');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'methods'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>۲. متدهای قدرت و استقامت</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('tapering');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'tapering'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>۳. تکنیک تپرینگ و اوج مسابقه</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-semibold shadow-lg animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-emerald-400 hover:text-white">بستن</button>
        </div>
      )}

      {/* PILLAR 1: PERIODIZATION CYCLES */}
      {activeTab === 'cycles' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-[#121217] border border-[#d4af37]/40 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-[#d4af37] flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>مهندسی علمی چرخه‌های تمرینی: موازنه حجم و شدت</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              تمرین مداوم با ۱۰۰٪ توان بدون پیریودیزاسیون منجر به مصدومیت تاندونی و افت ترشح تستوسترون می‌شود. تقسیم فصول به ماکروسیکل سالانه، مزوسیکل‌های چند‌هفته‌ای و میکروسیکل‌های هفتگی، تضمین‌کننده سازگاری خطی و ایمن بافت‌هاست.
            </p>
          </div>

          {/* Cycles Cards Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PERIODIZATION_CYCLES_DATA.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCycleId(c.id);
                  soundAndSpeech.playTick();
                }}
                className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  selectedCycleId === c.id
                    ? 'bg-[#181610] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]'
                    : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div>
                  <span className="text-[10px] text-amber-400 font-semibold block mb-1">{c.timeFrameFa}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{c.nameFa}</h4>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5" dir="ltr">{c.nameEn}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-zinc-800 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">حجم تمرین:</span>
                    <span className="font-bold text-cyan-400 tabular-nums">{c.volumePercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">شدت وزنه:</span>
                    <span className="font-bold text-amber-400 tabular-nums">{c.intensityPercent}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Cycle Detailed View */}
          <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-xs text-amber-400 font-semibold block">{selectedCycle.cycleType}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedCycle.nameFa}</h3>
              </div>
              <button
                onClick={() => handleSpeak(`${selectedCycle.nameFa}. هدف: ${selectedCycle.objectiveFa}. نکته: ${selectedCycle.proTipFa}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-[#d4af37] text-xs font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>شنیدن صوتی</span>
              </button>
            </div>

            {/* Volume vs Intensity Gauge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#181820] p-4 rounded-xl border border-zinc-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-cyan-400">حجم کاری (تعداد ست‌ها و تکرارها):</span>
                  <span className="text-white font-mono">{selectedCycle.volumePercent}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${selectedCycle.volumePercent}%` }}></div>
                </div>
              </div>

              <div className="bg-[#181820] p-4 rounded-xl border border-zinc-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-amber-400">شدت وزنه (درصد یک تکرار بیشینه 1RM):</span>
                  <span className="text-white font-mono">{selectedCycle.intensityPercent}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${selectedCycle.intensityPercent}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-[#181820] p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
              <span className="font-bold text-[#d4af37] block">هدف فیزیولوژیک این چرخه:</span>
              <p className="text-zinc-200 leading-relaxed">{selectedCycle.objectiveFa}</p>
              <div className="pt-2 border-t border-zinc-800/80">
                <span className="font-bold text-zinc-200 block mb-1">تمرکز کلیدی در اجرا:</span>
                <p className="text-zinc-300 leading-relaxed">{selectedCycle.keyFocusFa}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border-r-4 border-[#d4af37] p-3.5 rounded-xl text-xs text-amber-200">
              <strong>نکته متدولوژی خدمات‌جو (اس‌ئی امیری):</strong> {selectedCycle.proTipFa}
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: TRAINING METHODS & SYSTEMS */}
      {activeTab === 'methods' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-[#121217] border border-cyan-500/40 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4" />
              <span>متدهای تخصصی توسعه قدرت، توان انفجاری و شبیه‌سازی مسابقه:</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              تلفیق تمرینات مقاومتی با بارگذاری پلکانی، ست‌های خوشه‌ای و پیریودیزاسیون موجی DUP جهت بالا بردن آستانه تحمل سیستم عصبی و عضلانی.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRAINING_SYSTEMS_DATA.map(m => (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMethodId(m.id);
                  soundAndSpeech.playTick();
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  selectedMethodId === m.id
                    ? 'bg-[#181610] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]'
                    : 'bg-[#121217] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                      {m.category}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono" dir="ltr">{m.nameEn.split(' ')[0]}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{m.nameFa}</h4>
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{m.physiologicalAdaptationFa}</p>
                </div>

                <div className="pt-3 border-t border-zinc-800 text-xs space-y-1 text-zinc-400">
                  <div><strong className="text-zinc-200">الگوی ست و تکرار:</strong> {m.setsRepsScheme}</div>
                  <div><strong className="text-zinc-200">زمان استراحت:</strong> {m.restIntervalFa}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Execution steps of selected method */}
          <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-[#d4af37] flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>مراحل اجرای عملی سیستم {selectedMethod.nameFa}:</span>
            </h4>
            <ol className="space-y-1.5 pr-4 border-r-2 border-[#d4af37]/40 text-xs text-zinc-200 leading-relaxed">
              {selectedMethod.howToExecuteFa.map((step, idx) => (
                <li key={idx}><span className="text-amber-400 font-bold ml-1.5">{idx + 1}.</span> {step}</li>
              ))}
            </ol>
            <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800 text-xs text-zinc-300 mt-2">
              <strong>بهترین جامعه هدف:</strong> {selectedMethod.bestSuitedForFa}
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 3: TAPERING & PEAK PERFORMANCE SIMULATOR */}
      {activeTab === 'tapering' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-[#121217] border border-amber-500/40 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-1">
              <Target className="w-4 h-4" />
              <span>تکنیک تپرینگ (Tapering) و فعال‌سازی سوپرکامپنسیشن در روز مسابقه:</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              تپرینگ کاهش هوشمندانه حجم تمرین (۴۰ الی ۶۰ درصد) با حفظ شدت بالاست تا سیستم عصبی و عضلانی بدون از دست دادن آمادگی، به حداکثر شادابی و انبار انرژی در روز مسابقه برسد.
            </p>
          </div>

          {/* Interactive Tapering Simulator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Sliders Box */}
            <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-bold text-white block border-b border-zinc-800 pb-2">
                تنظیم روزشمار تا مسابقه طلایی:
              </span>

              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
                  <span>تعداد روزهای باقی‌مانده تا مسابقه:</span>
                  <span className="font-bold text-[#d4af37] font-mono tabular-nums">{daysToEvent} روز</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={21}
                  value={daysToEvent}
                  onChange={e => setDaysToEvent(Number(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>۱ روز (اوج مسابقه)</span>
                  <span>۷ روز (فاز تپرینگ عمیق)</span>
                  <span>۲۱ روز (فاز بارگذاری)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
                  <span>تعداد ست‌های هفتگی معمول شما:</span>
                  <span className="font-bold text-cyan-400 font-mono tabular-nums">{currentWeeklySets} ست</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={35}
                  value={currentWeeklySets}
                  onChange={e => setCurrentWeeklySets(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
                  <span>شدت وزنه نگه‌داشته شده:</span>
                  <span className="font-bold text-amber-400 font-mono tabular-nums">{currentIntensityPercent}% 1RM</span>
                </div>
                <input
                  type="range"
                  min={75}
                  max={95}
                  value={currentIntensityPercent}
                  onChange={e => setCurrentIntensityPercent(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <span className="text-[10px] text-zinc-400 block mt-1">
                  ⚠️ قانون تپرینگ: شدت را بالا نگه دارید، فقط تعداد ست‌ها را کم کنید!
                </span>
              </div>
            </div>

            {/* Target Output Box */}
            <div className="bg-[#121217] border-2 border-[#d4af37] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="border-b border-zinc-800 pb-3">
                  <span className="text-[10px] text-zinc-400 block">شاخص پیش‌بینی شادابی و اوج عملکرد (Supercompensation):</span>
                  <span className="text-3xl font-black text-[#d4af37] font-mono tabular-nums">
                    {supercompensationIndex}% <span className="text-xs font-normal text-emerald-400">آمادگی طلایی</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800 text-center">
                    <span className="text-zinc-400 block text-[10px] mb-1">حجم هفتگی جدید تجویز شده</span>
                    <span className="text-xl font-bold text-white font-mono tabular-nums">{targetWeeklySets} ست</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">
                      ({Math.round((1 - taperVolumeReduction) * 100)}% کاهش حجم)
                    </span>
                  </div>

                  <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800 text-center">
                    <span className="text-zinc-400 block text-[10px] mb-1">شدت وزنه پیشنهادی</span>
                    <span className="text-xl font-bold text-[#d4af37] font-mono tabular-nums">{currentIntensityPercent}%</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">حفظ بارگیری عصبی</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-200 leading-relaxed">
                🎯 <strong>دستورالعمل ۴۸ ساعت مانده به استیج/مسابقه:</strong> هیچ تمرین سنگینی انجام ندهید. روی کشش‌های پویا، خواب عمیق ۹ ساعته، بارگیری مایعات و کربوهیدرات‌های تمیز تمرکز کنید تا حداکثر گلیکوژن در سلول‌های عضلانی تثبیت شود.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Submit Button for Script 5 */}
      <div className="pt-2">
        <button
          onClick={handleSaveModule5}
          className="w-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#b8860b] text-black font-bold py-4 px-6 rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>ثبت بخش سیستمهای تمرینی در ایسیتی اتلتیکس</span>
        </button>
      </div>
    </div>
  );
};
