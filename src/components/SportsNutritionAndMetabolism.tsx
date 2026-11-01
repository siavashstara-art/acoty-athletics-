import React, { useState } from 'react';
import {
  Salad,
  Flame,
  Zap,
  Droplets,
  Clock,
  Sparkles,
  Calculator,
  CheckCircle,
  Volume2,
  Award,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Apple,
  RotateCcw
} from 'lucide-react';
import { AdhdSettings, EnergySystemItem, SupplementGradeItem, UserProfile } from '../types/index.ts';
import { ENERGY_SYSTEMS_DATA, SAFE_SUPPLEMENTS_DATA } from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface SportsNutritionAndMetabolismProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onProceedNext?: () => void;
}

export const SportsNutritionAndMetabolism: React.FC<SportsNutritionAndMetabolismProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile,
  onProceedNext
}) => {
  const [activeTab, setActiveTab] = useState<'macros' | 'systems' | 'timing' | 'supplements'>('macros');
  const [selectedSystemId, setSelectedSystemId] = useState<string>(ENERGY_SYSTEMS_DATA[0].id);
  const [selectedSuppId, setSelectedSuppId] = useState<string>(SAFE_SUPPLEMENTS_DATA[0].id);
  const [notification, setNotification] = useState('');

  // Interactive Macro & TDEE Calculator State
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [age, setAge] = useState<number>(26);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityFactor, setActivityFactor] = useState<number>(1.55); // 1.2, 1.375, 1.55, 1.725
  const [goal, setGoal] = useState<'hypertrophy' | 'fat-loss' | 'maintenance'>('hypertrophy');

  // BMR calculation using Mifflin-St Jeor formula
  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = Math.round(bmr * activityFactor);

  // Goal adjustment
  const targetCalories = goal === 'hypertrophy'
    ? tdee + 350
    : goal === 'fat-loss'
    ? tdee - 450
    : tdee;

  // Macros: Protein 2.0g/kg, Fat 25% of cals, Carbs remainder
  const proteinGrams = Math.round(weightKg * 2.1);
  const fatGrams = Math.round((targetCalories * 0.25) / 9);
  const carbCalories = targetCalories - (proteinGrams * 4 + fatGrams * 9);
  const carbGrams = Math.max(100, Math.round(carbCalories / 4));
  const waterLiters = (weightKg * 0.045).toFixed(1);

  const selectedSystem = ENERGY_SYSTEMS_DATA.find(s => s.id === selectedSystemId) || ENERGY_SYSTEMS_DATA[0];
  const selectedSupp = SAFE_SUPPLEMENTS_DATA.find(s => s.id === selectedSuppId) || SAFE_SUPPLEMENTS_DATA[0];

  const handleSpeak = (text: string) => {
    soundAndSpeech.speakText(text);
  };

  const handleSaveModule4 = () => {
    soundAndSpeech.playSuccessChime();
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 150
    }));
    setNotification('✅ اسکریپت چهارم (تغذیه تخصصی و متابولیسم) با موفقیت در ایسیتی اتلتیکس ثبت شد! (+۱۵۰ امتیاز وفاداری)');
    setTimeout(() => setNotification(''), 4500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Visualizer Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
        <img
          src="/src/assets/images/sports_nutrition_metabolism_1793538321515.jpg"
          alt="تغذیه تخصصی و متابولیسم سلولی ورزشکاران"
          className="w-full h-48 sm:h-64 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent flex flex-col justify-end p-5 sm:p-7">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/40 w-fit mb-2">
            <Salad className="w-3.5 h-3.5 text-emerald-400" />
            <span>اسکریپت ۴: تغذیه تخصصی، متابولیسم سلولی و بیوانرژتیک ورزشی</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>ایسیتی اتلتیکس | سوخت‌رسانی سلولی و درشت‌مغذی‌ها</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            بدن شما دقیقاً بازتاب آن چیزی است که به میتوکندری‌های سلول می‌رسانید. تنظیم بیوانرژتیک سیستم‌های فسفاژن، گلیکولیز و اکسیداتیو، زمان‌بندی آنابولیک و مکمل‌های تاییدشده WADA در متدولوژی خدمات‌جو.
          </p>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex rounded-2xl bg-[#121217] p-1.5 border border-zinc-800 shadow-lg overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('macros');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 min-w-[130px] py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'macros'
              ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>۱. محاسبه‌گر ماکروها و کالری</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('systems');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 min-w-[130px] py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'systems'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>۲. سیستم‌های انرژی (ATP-CP)</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('timing');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 min-w-[130px] py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'timing'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>۳. زمان‌بندی و هیدراتاسیون</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('supplements');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 min-w-[130px] py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'supplements'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>۴. مکمل‌های گرید A علمی</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-semibold shadow-lg animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-emerald-400 hover:text-white">بستن</button>
        </div>
      )}

      {/* PILLAR 1: INTERACTIVE MACRO & CALORIE CALCULATOR */}
      {activeTab === 'macros' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-[#121217] border border-[#d4af37]/40 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-[#d4af37] flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>محاسبه‌گر تخصصی متابولیسم پایه (BMR) و درشت‌مغذی‌ها:</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              تغذیه تصادفی منجر به نتایج تصادفی می‌شود. با وارد کردن وزن و سطح فعالیت، میزان دقیق کالری مورد نیاز و گرم‌های پروتئین، کربوهیدرات و چربی‌های مفید بر مبنای فیزیولوژی سلولی محاسبه می‌شود.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Input Parameters Box */}
            <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-bold text-white block border-b border-zinc-800 pb-2">
                مشخصات آنتروپومتریک و هدف تمرینی:
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">وزن بدن (کیلوگرم):</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={e => setWeightKg(Math.max(40, Number(e.target.value)))}
                    className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">قد (سانتی‌متر):</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={e => setHeightCm(Math.max(120, Number(e.target.value)))}
                    className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">سن:</label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(Math.max(14, Number(e.target.value)))}
                    className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">جنسیت:</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as any)}
                    className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100"
                  >
                    <option value="male">آقا (مرد)</option>
                    <option value="female">خانم (زن)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">شدت فعالیت روزانه و تمرینی:</label>
                <select
                  value={activityFactor}
                  onChange={e => setActivityFactor(Number(e.target.value))}
                  className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100"
                >
                  <option value={1.2}>کم‌تحرک (تمرین کم یا پشت‌میزی)</option>
                  <option value={1.375}>فعالیت ملایم (۱ تا ۳ جلسه تمرین در هفته)</option>
                  <option value={1.55}>فعالیت متوسط و مطلوب (۳ تا ۵ جلسه تمرین قدرتی)</option>
                  <option value={1.725}>ورزشکار حرفه‌ای پرفشار (۶ الی ۷ جلسه پرفشار)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">هدف بیولوژیک ورزشی:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setGoal('hypertrophy');
                      soundAndSpeech.playTick();
                    }}
                    className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition-all ${
                      goal === 'hypertrophy'
                        ? 'bg-[#d4af37] text-black border-[#d4af37]'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    افزایش حجم عضلانی
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGoal('fat-loss');
                      soundAndSpeech.playTick();
                    }}
                    className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition-all ${
                      goal === 'fat-loss'
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    چربی‌سوزی کات
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGoal('maintenance');
                      soundAndSpeech.playTick();
                    }}
                    className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition-all ${
                      goal === 'maintenance'
                        ? 'bg-cyan-500 text-black border-cyan-500'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    تثبیت و استقامت
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Plan Output */}
            <div className="bg-[#121217] border-2 border-[#d4af37] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">انرژی متابولیک هدف روزانه:</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#d4af37] font-mono tabular-nums">
                      {targetCalories.toLocaleString('fa-IR')} <span className="text-xs font-normal text-zinc-300">کیلوکالری</span>
                    </span>
                  </div>
                  <div className="text-left text-[11px] text-zinc-400">
                    <div>BMR پایه: {Math.round(bmr).toLocaleString('fa-IR')}</div>
                    <div>TDEE کل: {tdee.toLocaleString('fa-IR')}</div>
                  </div>
                </div>

                {/* Macro Target Strips */}
                <div className="grid grid-cols-3 gap-2.5 mt-4">
                  <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800 text-center">
                    <span className="text-[10px] text-amber-400 block font-bold mb-1">پروتئین خالص</span>
                    <span className="text-lg font-bold text-white font-mono tabular-nums">{proteinGrams}g</span>
                    <span className="text-[9px] text-zinc-400 block mt-0.5">۲.۱g به ازای وزن</span>
                  </div>

                  <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800 text-center">
                    <span className="text-[10px] text-cyan-400 block font-bold mb-1">کربوهیدرات پیچیده</span>
                    <span className="text-lg font-bold text-white font-mono tabular-nums">{carbGrams}g</span>
                    <span className="text-[9px] text-zinc-400 block mt-0.5">سوخت گلیکوژنی</span>
                  </div>

                  <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800 text-center">
                    <span className="text-[10px] text-emerald-400 block font-bold mb-1">چربی‌های ضروری</span>
                    <span className="text-lg font-bold text-white font-mono tabular-nums">{fatGrams}g</span>
                    <span className="text-[9px] text-zinc-400 block mt-0.5">سنتز هورمونی</span>
                  </div>
                </div>

                <div className="mt-4 bg-[#0d1612] border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <span>حداقل آب مصرفی روزانه:</span>
                  </span>
                  <span className="font-bold text-white font-mono tabular-nums">{waterLiters} لیتر</span>
                </div>
              </div>

              <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed">
                💡 <strong>فرمول طلایی خدمات‌جو:</strong> پروتئین را در ۴ الی ۵ وعده (هر وعده ۳۰ الی ۴۰ گرم) پخش کنید تا ترشح سنسور mTORC1 در تمام ۲۴ ساعت فعال بماند.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: ENERGY SYSTEMS (ATP-CP, GLYCOLYSIS, OXIDATIVE) */}
      {activeTab === 'systems' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-[#121217] border border-cyan-500/40 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4" />
              <span>سیستم‌های سه‌گانه انرژی سلولی در فعالیت‌های ورزشی:</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              بدن انسان با توجه به شدت و مدت زمان تمرین، سوخت متفاوتی برای تولید ATP انتخاب می‌کند. تسلط بر فیزیولوژی این سه سیستم، کلید اصلی طراحی هوشمندانه برنامه‌های تمرینی و استراحت بین ست‌هاست.
            </p>
          </div>

          {/* System Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ENERGY_SYSTEMS_DATA.map(sys => (
              <button
                key={sys.id}
                onClick={() => {
                  setSelectedSystemId(sys.id);
                  soundAndSpeech.playTick();
                }}
                className={`p-4 rounded-xl border text-right transition-all space-y-1.5 ${
                  selectedSystemId === sys.id
                    ? 'bg-[#0e1820] border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.25)] ring-1 ring-cyan-400'
                    : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span className="text-[10px] text-cyan-400 font-semibold">{sys.dominantDuration}</span>
                <h4 className="text-xs font-bold text-white">{sys.nameFa}</h4>
                <p className="text-[10px] text-zinc-400 font-mono" dir="ltr">{sys.nameEn}</p>
              </button>
            ))}
          </div>

          {/* Selected System Deep Details */}
          <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedSystem.nameFa}</h3>
                <span className="text-xs text-[#d4af37] font-semibold">{selectedSystem.intensityLevel}</span>
              </div>
              <button
                onClick={() => handleSpeak(`${selectedSystem.nameFa}. منبع سوخت: ${selectedSystem.fuelSourceFa}. مکانیزم: ${selectedSystem.biochemicalMechanismFa}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-[#d4af37] text-xs font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>شنیدن صوتی</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#181820] p-3.5 rounded-xl border border-zinc-800">
                <span className="text-cyan-400 font-bold block mb-1">🔥 منبع سوخت اولیه سلولی:</span>
                <span className="text-zinc-200">{selectedSystem.fuelSourceFa}</span>
              </div>

              <div className="bg-[#181820] p-3.5 rounded-xl border border-zinc-800">
                <span className="text-emerald-400 font-bold block mb-1">⏱️ زمان ریکاوری فیزیولوژیک:</span>
                <span className="text-zinc-200">{selectedSystem.recoveryGuidelineFa}</span>
              </div>
            </div>

            <div className="bg-[#181820] p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
              <span className="font-bold text-[#d4af37] block">مکانیزم بیوشیمیایی درون سلول:</span>
              <p className="text-zinc-300 leading-relaxed">{selectedSystem.biochemicalMechanismFa}</p>
              <div className="pt-2 border-t border-zinc-800/80">
                <span className="font-bold text-zinc-200 block mb-1">رشته‌ها و فعالیت‌های ورزشی همسو:</span>
                <p className="text-zinc-300 leading-relaxed">{selectedSystem.sportExamplesFa}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 3: NUTRIENT TIMING & HYDRATION */}
      {activeTab === 'timing' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-[#121217] border border-emerald-500/40 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4" />
              <span>پروتکل زمان‌بندی هوشمند تغذیه (Nutrient Timing Protocols):</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              چه زمانی چه چیزی بخوریم؟ زمان‌بندی صحیح مواد مغذی تفاوت بین احساس خستگی و سوزش عضلانی یا ثبت رکوردهای جدید است.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Pre Workout */}
            <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-zinc-800 pb-2">
                <Clock className="w-4 h-4" />
                <span>۱. وعده قبل از تمرین (Pre-Workout - ۲ ساعت قبل)</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                کربوهیدرات‌های پیچیده دیر‌هضم (جو دوسر، برنج کته یا نان جو) به همراه ۳۰ گرم پروتئین بدون چربی (سینه مرغ یا سفیده تخم‌مرغ).
              </p>
              <div className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/30 text-amber-200">
                هدف: پر کردن ذخایر گلیکوژن کبد و عضلات بدون افت قند خون ناگهانی.
              </div>
            </div>

            {/* Intra Workout */}
            <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm border-b border-zinc-800 pb-2">
                <Droplets className="w-4 h-4" />
                <span>۲. هیدراتاسیون حین تمرین (Intra-Workout)</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                محلول هیدراتاسیون حاوی ۵۰۰ میلی‌لیتر آب، نصف قاشق چای‌خوری نمک هیمالیا (سدیم)، لیمو ترش تازه و در تمرینات سنگین بالای ۶۰ دقیقه، ۵ تا ۱۰ گرم آمینواسید EAA.
              </p>
              <div className="bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/30 text-cyan-200">
                هدف: جلوگیری از افت حجم پلاسما و جلوگیری از ترشح پیش‌رس کورتیزول.
              </div>
            </div>

            {/* Post Workout */}
            <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-zinc-800 pb-2">
                <Zap className="w-4 h-4" />
                <span>۳. پنجره آنابولیک بازسازی (Post-Workout - تا ۴۵ دقیقه بعد)</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                ۳۰ گرم پروتئین زود‌جذب (شیک وی ایزوله یا سفیده تخم‌مرغ) به همراه ۴۰ الی ۵۰ گرم کربوهیدرات ساده تا متوسط (موز، خرما یا برنج سفید).
              </p>
              <div className="bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/30 text-emerald-200">
                هدف: ترشح انسولین کنترل‌شده، توقف کاتابولیسم و انتقال اسیدهای آمینه به عضلات.
              </div>
            </div>

            {/* Pre Bed */}
            <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm border-b border-zinc-800 pb-2">
                <Sparkles className="w-4 h-4" />
                <span>۴. تغذیه شبانه قبل از خواب (Pre-Bed Rest)</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                پروتئین دیرهضم کازئین (پنیر کوتاژ کم‌چرب) + منیزیم گلیسینات ۳۰۰ میلی‌گرم بدون هیچ‌گونه قند ساده یا شیرینی.
              </p>
              <div className="bg-purple-950/20 p-2.5 rounded-lg border border-purple-500/30 text-purple-200">
                هدف: تغذیه آهسته عضلات در طول ۷ ساعت خواب شبانه و ترشح حداکثری هورمون رشد GH.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 4: SAFE SUPPLEMENTS (GRADE A EVIDENCE) */}
      {activeTab === 'supplements' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-[#121217] border border-amber-500/40 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>مکمل‌های ورزشی دارای بالاترین شواهد علمی (گرید A از ISSN و WADA):</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              تنها مکمل‌هایی که از آزمایش‌های تصادفی دوسوکور عبور کرده‌اند و عوارض جانبی مخرب ندارند. هیچ نیازی به پکیج‌های گران‌قیمت تجاری نیست؛ علم، خلوص و اثربخشی را اثبات کرده است.
            </p>
          </div>

          {/* Supplement Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SAFE_SUPPLEMENTS_DATA.map(supp => (
              <div
                key={supp.id}
                onClick={() => {
                  setSelectedSuppId(supp.id);
                  soundAndSpeech.playTick();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedSuppId === supp.id
                    ? 'bg-[#181610] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]'
                    : 'bg-[#121217] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <span className="text-[10px] text-emerald-400 font-semibold block mb-1">
                    {supp.evidenceGrade}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{supp.nameFa}</h4>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5" dir="ltr">{supp.nameEn}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-300 space-y-1">
                  <div><strong>دوز موثر:</strong> {supp.dosageFa}</div>
                  <div><strong>زمان مصرف:</strong> {supp.optimalTimingFa}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Supplement Deep Details */}
          <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3 text-xs leading-relaxed">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="text-sm font-bold text-[#d4af37]">
                تحلیل فارماکوکینتیک: {selectedSupp.nameFa}
              </h4>
              <button
                onClick={() => handleSpeak(`${selectedSupp.nameFa}. مکانیزم: ${selectedSupp.mechanismFa}. نکته: ${selectedSupp.proTipFa}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-[#d4af37] font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>قرائت صوتی</span>
              </button>
            </div>

            <div className="bg-[#181820] p-3.5 rounded-xl border border-zinc-800">
              <strong className="text-zinc-200 block mb-1">مکانیزم سلولی:</strong>
              <p className="text-zinc-300">{selectedSupp.mechanismFa}</p>
            </div>

            <div className="bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border-r-4 border-[#d4af37] p-3 rounded-xl text-amber-200">
              <strong>نکته متدولوژی خدمات‌جو (اس‌ئی امیری):</strong> {selectedSupp.proTipFa}
            </div>
          </div>
        </div>
      )}

      {/* Main Submit Button for Script 4 */}
      <div className="pt-2">
        <button
          onClick={handleSaveModule4}
          className="w-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#b8860b] text-black font-bold py-4 px-6 rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>ثبت بخش تغذیه تخصصی و متابولیسم در ایسیتی اتلتیکس</span>
        </button>
      </div>
    </div>
  );
};
