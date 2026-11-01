import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Wind,
  Smile,
  Dumbbell,
  Lock,
  Unlock,
  Volume2,
  CheckCircle2,
  Play,
  RotateCcw,
  Sliders,
  Award,
  Zap,
  Target,
  FileCheck,
  Building2,
  UserCheck
} from 'lucide-react';
import {
  AdhdSettings,
  DeepHiddenMusclesModule,
  InPersonPresentationConfig,
  TehranGymPitchPreset,
  UserProfile
} from '../types/index.ts';
import {
  DEFAULT_PRESENTATION_CONFIG,
  DEEP_HIDDEN_MUSCLES_DATA,
  TEHRAN_GYMS_PRESETS
} from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface DeepMusclesAndPitchPresenterProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onProceedNext?: () => void;
}

export const DeepMusclesAndPitchPresenter: React.FC<DeepMusclesAndPitchPresenterProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile,
  onProceedNext
}) => {
  // In-person presentation config
  const [pitchConfig, setPitchConfig] = useState<InPersonPresentationConfig>(() => {
    try {
      const saved = localStorage.getItem('tavana_pitch_presentation_config');
      return saved ? JSON.parse(saved) : DEFAULT_PRESENTATION_CONFIG;
    } catch {
      return DEFAULT_PRESENTATION_CONFIG;
    }
  });

  const [inputGym, setInputGym] = useState(pitchConfig.gymName);
  const [inputManager, setInputManager] = useState(pitchConfig.managerName);
  const [inputCoach, setInputCoach] = useState(pitchConfig.coachName);

  // VIP / Lock state
  const [isVipUnlocked, setIsVipUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tavana_vip_hidden_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [checkedAdhdSteps, setCheckedAdhdSteps] = useState<Record<string, boolean>>({});

  // Interactive Paper Blowing Test Timer
  const [isPaperTestRunning, setIsPaperTestRunning] = useState<boolean>(false);
  const [paperTestSeconds, setPaperTestSeconds] = useState<number>(0);

  // Student Posture Health Clinic state
  const [postureInputValue, setPostureInputValue] = useState<string>('');
  const [postureResultText, setPostureResultText] = useState<string>('');

  // Global Children's Eye Muscle / Amblyopia Test State
  const [currentEyeDirection, setCurrentEyeDirection] = useState<string>('بالا');
  const [currentEyeSymbol, setCurrentEyeSymbol] = useState<string>('⬆️');
  const [eyeResultText, setEyeResultText] = useState<string>('');
  const [eyeResultColor, setEyeResultColor] = useState<string>('text-[#00f2fe]');

  const directionsMap: Record<string, string> = {
    'بالا': '⬆️',
    'پایین': '⬇️',
    'چپ': '⬅️',
    'راست': '➡️'
  };

  // Success Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tavana_pitch_presentation_config', JSON.stringify(pitchConfig));
  }, [pitchConfig]);

  // Paper test timer effect
  useEffect(() => {
    let interval: any = null;
    if (isPaperTestRunning) {
      interval = setInterval(() => {
        setPaperTestSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaperTestRunning]);

  const checkPosture = () => {
    const inputEl = document.getElementById('postureInput') as HTMLInputElement | null;
    const val = inputEl ? inputEl.value : postureInputValue;
    const resultEl = document.getElementById('postureResult');

    let resultMsg = '';
    if (!val || val.trim() === '') {
      resultMsg = 'لطفاً مقدار فاصله را وارد کنید.';
    } else {
      const numVal = parseFloat(val);
      if (isNaN(numVal)) {
        resultMsg = 'لطفاً یک عدد معتبر وارد کنید.';
      } else if (numVal <= 2) {
        resultMsg = 'وضعیت طبیعی: تراز سر و گردن در وضعیت استاندارد قرار دارد.';
      } else if (numVal <= 5) {
        resultMsg = 'هشدار اولیه (سر به جلو): نیازمند تمرینات اصلاحی عضلات عمقی گردن و کشش سینه.';
      } else {
        resultMsg = 'خطر ناهنجاری بارز: توصیه می‌شود به متخصص ارتوپدی یا مربی اصلاحی ارجاع داده شود.';
      }
    }

    setPostureResultText(resultMsg);
    if (resultEl) {
      resultEl.innerText = resultMsg;
    }

    soundAndSpeech.playSuccessChime();
    if (adhdSettings.voiceNarration && resultMsg) {
      soundAndSpeech.speakText(resultMsg);
    }
  };

  const checkEyeAnswer = (ans: string) => {
    const resultEl = document.getElementById('eyeResult');
    const symbolEl = document.getElementById('eyeSymbol');

    const isCorrect = ans === currentEyeDirection;
    let resultMsg = '';
    let colorClass = '';

    if (isCorrect) {
      resultMsg = '✅ پاسخ صحیح: پاسخ بینایی در این زاویه پایدار و طبیعی است.';
      colorClass = 'text-[#00f2fe]';
      soundAndSpeech.playSuccessChime();
    } else {
      resultMsg = '⚠️ هشدار پروژه جهانی: خطا در جهتیابی! در صورت تکرار، حتماً به چشم‌پزشک یا بینایی‌سنج مراجعه کنید.';
      colorClass = 'text-[#ff2a6d]';
      soundAndSpeech.playTick();
    }

    setEyeResultText(resultMsg);
    setEyeResultColor(colorClass);

    if (resultEl) {
      resultEl.innerText = resultMsg;
      resultEl.style.color = isCorrect ? 'var(--accent, #00f2fe)' : 'var(--primary, #ff2a6d)';
    }

    if (adhdSettings.voiceNarration) {
      soundAndSpeech.speakText(isCorrect ? 'پاسخ صحیح است' : 'هشدار خطا در جهت یابی بینایی');
    }

    // Pick random next direction after answer
    const keys = Object.keys(directionsMap);
    const nextDir = keys[Math.floor(Math.random() * keys.length)];
    setCurrentEyeDirection(nextDir);
    const nextSymbol = directionsMap[nextDir];
    setCurrentEyeSymbol(nextSymbol);

    if (symbolEl) {
      symbolEl.innerText = nextSymbol;
    }
  };

  const selectGym = (gymName: string, managerName: string, coachName: string, gymType?: string) => {
    // تغییر آنی هدر اپلیکیشن و وضعیت داخلی
    const updated: InPersonPresentationConfig = {
      gymName,
      managerName,
      coachName,
      gymType: gymType || 'تخصصی بدنسازی',
      isActive: true
    };
    setPitchConfig(updated);
    setInputGym(gymName);
    setInputManager(managerName);
    setInputCoach(coachName);

    // تغییر مستقیم المان‌های DOM بر اساس شناسه اختصاصی برای تطابق ۱۰۰٪ با اسکریپت
    const gymEl = document.getElementById('displayGymName');
    if (gymEl) gymEl.innerText = gymName;
    const managerEl = document.getElementById('displayManager');
    if (managerEl) managerEl.innerText = managerName;
    const coachEl = document.getElementById('displayCoach');
    if (coachEl) coachEl.innerText = coachName;

    soundAndSpeech.playSuccessChime();
    setToastMessage(`✨ اپلیکیشن با موفقیت برای "${gymName}" شخصی‌سازی شد!\nآماده‌ی تقدیم به مدیر مجموعه هستید.`);
    setTimeout(() => setToastMessage(null), 5000);

    if (adhdSettings.voiceNarration) {
      soundAndSpeech.speakText(`هدر اپلیکیشن برای ${gymName} با موفقیت شخصی‌سازی شد.`);
    }
  };

  const updateHeader = () => {
    const updated: InPersonPresentationConfig = {
      gymName: inputGym.trim() || 'باشگاه بدنسازی شهر توانا',
      managerName: inputManager.trim() || 'استاد گرامی',
      coachName: inputCoach.trim() || 'تیم تخصصی',
      gymType: pitchConfig.gymType || 'تخصصی بدنسازی',
      isActive: true
    };
    setPitchConfig(updated);

    const gymEl = document.getElementById('displayGymName');
    if (gymEl) gymEl.innerText = updated.gymName;
    const managerEl = document.getElementById('displayManager');
    if (managerEl) managerEl.innerText = updated.managerName;
    const coachEl = document.getElementById('displayCoach');
    if (coachEl) coachEl.innerText = updated.coachName;

    soundAndSpeech.playSuccessChime();
    setToastMessage('اطلاعات هدر پرزنت حضوری با موفقیت به‌روزرسانی شد!');
    setTimeout(() => setToastMessage(null), 3500);

    if (adhdSettings.voiceNarration) {
      soundAndSpeech.speakText(`هدر پرزنت حضوری برای ${updated.gymName} اعمال گردید.`);
    }
  };

  const handleUnlockVip = () => {
    setIsVipUnlocked(true);
    try {
      localStorage.setItem('tavana_vip_hidden_unlocked', 'true');
    } catch {
      // ignore
    }
    soundAndSpeech.playSuccessChime();
    setToastMessage('دسترسی VIP پروتکل محرمانه ارتقای بیوریتم با موفقیت بازگشایی شد!');
    setTimeout(() => setToastMessage(null), 4000);

    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 1000
    }));
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
      {/* Dynamic In-Person Presentation Header (هدر پرزنت حضوری باشگاه) */}
      <div className="bg-gradient-to-br from-[#1f1f26] via-[#15151c] to-[#121217] border-2 border-[#d4af37] rounded-2xl p-5 sm:p-6 text-center shadow-[0_0_30px_rgba(212,175,55,0.25)] relative overflow-hidden transition-all">
        <span className="bg-[#d4af37] text-black text-[11px] font-extrabold px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>✨ نسخه اختصاصی پرزنت حضوری</span>
        </span>
        <h2 id="displayGymName" className="text-base sm:text-xl md:text-2xl font-black text-[#d4af37] my-1">
          {pitchConfig.gymName}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          مدیریت: <span id="displayManager" className="text-amber-300 font-semibold">{pitchConfig.managerName}</span> | مربی ارشد: <span id="displayCoach" className="text-cyan-300 font-semibold">{pitchConfig.coachName}</span>
          {pitchConfig.gymType && (
            <span className="mr-2 px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-bold">
              {pitchConfig.gymType}
            </span>
          )}
        </p>

        {toastMessage && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in whitespace-pre-line shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* بخش موتور پرزنت حضوری و فهرست هوشمند باشگاههای تهران (پنجمین الماس) */}
      <div className="card bg-[#121217] border-2 border-[#d4af37] rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all">
        <div className="card-content space-y-3">
          <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4af37] animate-pulse" />
              <h3 className="text-sm sm:text-base font-extrabold text-[#d4af37]">
                🎯 پنجمین الماس: فهرست هوشمند پرزنت باشگاههای تهران
              </h3>
            </div>
            <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2.5 py-0.5 rounded-full border border-[#d4af37]/40 font-bold">
              شخصی‌سازی آنی با ۱ کلیک
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-zinc-400">
            روی نام هر باشگاه در زیر کلیک کنید تا هدر اپلیکیشن در لحظه برای همان مجموعه شخصی‌سازی شود:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
            {TEHRAN_GYMS_PRESETS.map((gym, idx) => {
              const isSelected = pitchConfig.gymName === gym.name;
              return (
                <button
                  key={gym.id}
                  onClick={() => selectGym(gym.name, gym.manager, gym.coach, gym.gymType)}
                  className={`btn-magic p-3 rounded-xl border text-right transition-all flex items-center justify-between group relative overflow-hidden active:scale-[0.98] ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-extrabold border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] ring-1 ring-[#d4af37]'
                      : 'bg-[#181820] hover:bg-zinc-800/90 border-zinc-700/80 hover:border-[#d4af37] text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-black shrink-0 ${
                        isSelected ? 'bg-black text-[#d4af37]' : 'bg-zinc-800 text-[#d4af37]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                        <span>{gym.name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                      </div>
                      <div className={`text-[10px] ${isSelected ? 'text-zinc-900 font-medium' : 'text-zinc-400'}`}>
                        مدیریت: {gym.manager} | {gym.gymType}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-[9px] px-2 py-0.5 rounded shrink-0 ${
                      isSelected ? 'bg-black/20 text-black font-bold' : 'bg-zinc-800/80 text-zinc-400'
                    }`}
                  >
                    {gym.zoneFa}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* بخش جدید: کلینیک سلامت قامت، ستون فقرات و استعدادیابی دانش‌آموزان */}
      <div className="card bg-[#121217] border-2 border-[#00f2fe] rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(0,242,254,0.15)] transition-all">
        <div className="card-content space-y-3">
          <div className="flex items-center justify-between border-b border-[#00f2fe]/30 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧒</span>
              <h3 className="text-sm sm:text-base font-extrabold text-[#00f2fe]">
                کلینیک ملی سلامت قامت و اصلاح ناهنجاری‌های دانش‌آموزان
              </h3>
            </div>
            <span className="text-[10px] bg-[#00f2fe]/20 text-[#00f2fe] px-2.5 py-0.5 rounded-full border border-[#00f2fe]/40 font-bold">
              ویژه والدین و معلمان ورزش
            </span>
          </div>

          <div className="box-sub bg-[#00f2fe]/5 border border-[#00f2fe]/20 p-3.5 rounded-xl text-xs text-zinc-200 leading-relaxed space-y-1.5">
            <div>• <strong>غربالگری خانگی و مدرسه‌ای:</strong> تشخیص سریع عوارض رایج سن رشد (سر به جلو، افتادگی شانه، گودی کمر/لوردوز، کیفوز و صافی کف پا).</div>
            <div>• <strong>پروفایل ویژه معلمان ورزش:</strong> پایش ساختار قامتی دانش‌آموزان و ارائه پروتکل‌های اصلاحی ایمن بدون نیاز به ابزار سنگین.</div>
            <div>• <strong>پیشگیری از آسیب‌های آینده:</strong> تمرینات کششی و تقویتی مخصوص سنین ۸ تا ۱۸ سال برای بازگرداندن تراز طبیعی ستون فقرات.</div>
          </div>

          {/* ابزار تست سریع قامت (تعاملی برای پرزنت یا استفاده والدین) */}
          <div className="bg-[#00f2fe]/5 border border-dashed border-[#00f2fe] p-3.5 rounded-xl text-xs space-y-2.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>🔍 ارزیابی سریع وضعیت قامت (تست دیوار):</span>
            </div>
            <p className="text-[11px] text-zinc-300">
              پشتی سر، شانه‌ها و باسن کودک را به دیوار بچسبانید. فاصله پشت گردن تا دیوار را اندازه بگیرید.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
              <div className="w-full sm:w-auto flex items-center gap-2">
                <label className="text-zinc-300 text-[11px] whitespace-nowrap">فاصله تا دیوار (سانتی‌متر):</label>
                <input
                  type="number"
                  id="postureInput"
                  value={postureInputValue}
                  onChange={e => setPostureInputValue(e.target.value)}
                  placeholder="مثلاً 4 سانتی‌متر"
                  className="config-input bg-black border border-zinc-700 focus:border-[#00f2fe] text-white px-3 py-2 rounded-xl text-xs outline-none w-full sm:w-36 font-mono"
                />
              </div>

              <button
                onClick={checkPosture}
                className="btn-magic w-full sm:w-auto bg-gradient-to-r from-[#00f2fe] to-[#0077b6] hover:from-[#38f6ff] hover:to-[#0088cc] text-black font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition-all active:scale-[0.98] shrink-0"
              >
                تحلیل هوشمند وضعیت سر و گردن
              </button>
            </div>

            <p id="postureResult" className="text-xs font-bold text-[#00f2fe] pt-1 min-h-[20px] transition-all">
              {postureResultText}
            </p>
          </div>
        </div>
      </div>

      {/* بخش رسمی: پروژه جهانی کشف تنبلی عضله چشم در کودکان (هشدار و آگاهیبخشی به خانواده‌ها) */}
      <div className="card bg-gradient-to-b from-[#121216] to-[#1a0915] border-2 border-[#ff2a6d] rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(255,42,109,0.2)] transition-all">
        <div className="card-content space-y-3">
          <div className="flex items-center justify-between border-b border-[#ff2a6d]/30 pb-2">
            <h3 className="text-sm sm:text-base font-extrabold text-[#ff4d6d] flex items-center gap-2">
              <span>👁️</span>
              <span>پروژه جهانی کشف تنبلی عضله چشم در کودکان (با موبایل/کامپیوتر)</span>
            </h3>
            <span className="text-[10px] bg-[#ff2a6d]/20 text-[#ff4d6d] px-2.5 py-0.5 rounded-full border border-[#ff2a6d]/40 font-bold">
              پایش عضلات خارج چشمی
            </span>
          </div>

          {/* متن توجیهی، فلسفه علمی، نیت استاد و هشدار حیاتی به خانواده‌ها */}
          <div className="bg-[#ff2a6d]/10 border-r-4 border-[#ff2a6d] p-3.5 rounded-xl text-xs text-slate-100 leading-relaxed space-y-2">
            <div className="font-extrabold text-[#d4af37] text-xs flex items-center gap-1.5">
              <span>💡 فلسفه علمی و رسالت جهانی استاد سیاوش: چرا ورزش و چرا تنبلی چشم؟</span>
            </div>
            <div>
              • <strong>چشم هم یک عضله است:</strong> برخلاف تصور عموم که ورزش را فقط در بازو و سرشانه می‌بینند، کره چشم توسط ظریف‌ترین و دقیق‌ترین عضلات بدن (عضلات خارج چشمی) کنترل می‌شود و نیازمند هماهنگی عصب و عضله است.
            </div>
            <div>
              • <strong>رسالت جهانی پیشگیری در سنین طلایی رشد:</strong> تنبلی چشم (Amblyopia) یک خطر خاموش است؛ این ابزار سیار دیجیتال برای معلمان مهدکودک، دبستان‌ها و والدین طراحی شده تا پیش از تثبیت خطاهای دید در سیستم عصبی مرکزی، عوارض را شناسایی کنند.
            </div>
            <div>
              • <strong>خطر خاموش برای همه کودکان:</strong> هر کودکی در هر خانواده‌ای (فرزند، نوه، برادرزاده یا خواهرزاده) می‌تواند مستعد ضعف این عضلات باشد بدون آنکه خودش یا دیگران متوجه شوند.
            </div>
            <div>
              • <strong>پیشگیری از کم‌بینایی دائم و انحراف:</strong> عدم تعادل در عضلات چشمی اگر در دوران رشد تشخیص داده نشود، به انحراف چشم (لوچی/چپی) و کم‌بینایی دائمی می‌انجامد؛ اما با غربالگری زودهنگام و ورزش‌های چشمی، توازن عضلانی کاملاً بازمی‌گردد.
            </div>
            <div>
              • <strong>کلینیک سیار در مشت والدین و معلمان:</strong> تبدیل هر گوشی موبایل یا مانیتور به یک پایگاه غربالگری بینایی سریع جهت حفاظت از آینده بینایی کودکان سراسر جهان.
            </div>
          </div>

          {/* ابزار شبیه‌ساز تست جهتیابی بینایی */}
          <div className="bg-black/50 border border-dashed border-[#ff2a6d] p-4 rounded-xl text-xs text-center space-y-3">
            <strong className="text-[#00f2fe] text-xs block">
              📱 آزمون دیجیتال و سریع جهتیابی (مخصوص موبایل و دسکتاپ):
            </strong>
            <p className="text-zinc-400 text-[11px]">
              کودک را در فاصله ۳ متری موبایل قرار دهید، یک چشم را بپوشانید و جهت علامت را بپرسید:
            </p>

            <div
              id="eyeSymbol"
              className="text-5xl my-3 text-[#d4af37] font-bold select-none drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] transition-all"
            >
              {currentEyeSymbol}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => checkEyeAnswer('بالا')}
                className="btn-magic bg-zinc-800 hover:bg-[#ff2a6d] text-white hover:text-black font-extrabold px-4 py-2 rounded-xl text-xs border border-zinc-700 transition-all active:scale-[0.96]"
              >
                بالا ⬆️
              </button>
              <button
                onClick={() => checkEyeAnswer('پایین')}
                className="btn-magic bg-zinc-800 hover:bg-[#ff2a6d] text-white hover:text-black font-extrabold px-4 py-2 rounded-xl text-xs border border-zinc-700 transition-all active:scale-[0.96]"
              >
                پایین ⬇️
              </button>
              <button
                onClick={() => checkEyeAnswer('چپ')}
                className="btn-magic bg-zinc-800 hover:bg-[#ff2a6d] text-white hover:text-black font-extrabold px-4 py-2 rounded-xl text-xs border border-zinc-700 transition-all active:scale-[0.96]"
              >
                چپ ⬅️
              </button>
              <button
                onClick={() => checkEyeAnswer('راست')}
                className="btn-magic bg-zinc-800 hover:bg-[#ff2a6d] text-white hover:text-black font-extrabold px-4 py-2 rounded-xl text-xs border border-zinc-700 transition-all active:scale-[0.96]"
              >
                راست ➡️
              </button>
            </div>

            <p
              id="eyeResult"
              className={`text-xs font-bold pt-1 min-h-[22px] transition-all ${eyeResultColor}`}
            >
              {eyeResultText}
            </p>
          </div>
        </div>
      </div>

      {/* Section: Instant Header Pitch Customizer (تنظیمات دستی پرزنت برای هر باشگاه دیگر) */}
      <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2.5">
          <Sliders className="w-4 h-4 text-[#d4af37]" />
          <h3 className="text-xs sm:text-sm font-bold text-[#d4af37]">
            ⚙️ تنظیمات دستی پرزنت حضوری (شخصی‌سازی آزاد برای هر باشگاه متفرقه)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-zinc-400 block mb-1">نام باشگاه ورزشی:</label>
            <input
              type="text"
              value={inputGym}
              onChange={e => setInputGym(e.target.value)}
              placeholder="مثال: باشگاه اکسیژن / پارت / رویال"
              className="w-full bg-black border border-zinc-700 focus:border-[#d4af37] text-white p-2.5 rounded-xl text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">نام مدیریت محترم:</label>
            <input
              type="text"
              value={inputManager}
              onChange={e => setInputManager(e.target.value)}
              placeholder="مثال: جناب آقای مهندس رحیمی"
              className="w-full bg-black border border-zinc-700 focus:border-[#d4af37] text-white p-2.5 rounded-xl text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">مربی ارشد / تیم تخصصی:</label>
            <input
              type="text"
              value={inputCoach}
              onChange={e => setInputCoach(e.target.value)}
              placeholder="مثال: استاد سیاوش علی‌میری"
              className="w-full bg-black border border-zinc-700 focus:border-[#d4af37] text-white p-2.5 rounded-xl text-xs outline-none transition-colors"
            />
          </div>
        </div>

        <button
          onClick={updateHeader}
          className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5c158] hover:to-[#a77a0a] text-black font-extrabold py-3 px-4 rounded-xl text-xs shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>اعمال دستی روی هدر پرزنت</span>
        </button>
      </div>

      {/* Interactive Paper Blowing Test Widget (تست فوت به کاغذ) */}
      <div className="bg-[#181822] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-[#00f2fe]" />
            <h4 className="text-xs sm:text-sm font-bold text-white">
              تست فوت کردن به کاغذ (ارزیابی حجم حیاتی ریه و قدرت بازدم دیافراگمی)
            </h4>
          </div>
          <span className="text-[10px] text-zinc-400">فاصله استاندارد: ۵ تا ۱۰ سانتی‌متر</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
          <div className="text-xs text-zinc-300 max-w-xl leading-relaxed">
            یک تکه کاغذ را در فاصله ۵ الی ۱۰ سانتی‌متری دهان بگیرید. با زدن دکمه شروع، یک فوت پیوسته و یکنواخت انجام دهید و سعی کنید کاغذ را کاملاً افقی در هوا معلق نگه دارید.
            <div className="mt-1 text-[11px] text-amber-300">
              استاندارد فیزیولوژیک: زیر ۱۰ ثانیه (ضعیف) | ۱۰ تا ۱۵ ثانیه (متوسط) | بالای ۲۰ ثانیه (سطح عالی قهرمانی).
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-black border border-[#d4af37]/40 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-[#d4af37] font-mono">
                {paperTestSeconds}
              </span>
              <span className="text-[9px] text-zinc-400">ثانیه</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  setIsPaperTestRunning(!isPaperTestRunning);
                  soundAndSpeech.playTick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isPaperTestRunning
                    ? 'bg-rose-500 text-white'
                    : 'bg-[#d4af37] text-black shadow'
                }`}
              >
                {isPaperTestRunning ? 'توقف تست' : 'شروع تست فوت'}
              </button>
              <button
                onClick={() => {
                  setIsPaperTestRunning(false);
                  setPaperTestSeconds(0);
                  soundAndSpeech.playTick();
                }}
                className="px-3 py-1 rounded-lg text-[10px] bg-zinc-800 text-zinc-400 hover:text-white"
              >
                صفر کردن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Deep Muscles & Face Control Cards (فصل ۴: بخش‌های ۱ تا ۴) */}
      <div className="space-y-4">
        {DEEP_HIDDEN_MUSCLES_DATA.map(mod => {
          const isLocked = mod.isLocked && !isVipUnlocked;

          return (
            <div
              key={mod.id}
              className="bg-[#121216] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl transition-all"
            >
              <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">{mod.icon}</span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#d4af37]">
                      {mod.titleFa}
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-mono" dir="ltr">
                      {mod.titleEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundAndSpeech.speakText(
                        `${mod.titleFa}. خلاصه: ${mod.summaryPointsFa.join(' ')}. نکته مربی: ${mod.proTipFa}`
                      );
                    }}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-[#d4af37]"
                    title="قرائت صوتی"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-4 text-xs">
                {/* Target muscles badge */}
                <div className="bg-[#181822] p-2.5 rounded-xl border border-zinc-800/80 text-[11px] flex items-center gap-2">
                  <span className="text-zinc-400">عضلات و ارگان‌های هدف:</span>
                  <span className="text-[#00f2fe] font-semibold">{mod.targetMusclesFa}</span>
                </div>

                {/* Summary points box */}
                <div
                  className={
                    mod.sectionNumber === 1
                      ? 'bg-[#d4af37]/5 border-r-4 border-[#d4af37] p-3.5 rounded-lg leading-relaxed text-zinc-200 space-y-1'
                      : mod.sectionNumber === 2
                      ? 'bg-[#00f2fe]/5 border-r-4 border-[#00f2fe] p-3.5 rounded-lg leading-relaxed text-zinc-200 space-y-1'
                      : mod.sectionNumber === 3
                      ? 'bg-[#d4af37]/5 border-r-4 border-[#d4af37] p-3.5 rounded-lg leading-relaxed text-zinc-200 space-y-1'
                      : 'bg-[#ff2a6d]/5 border-r-4 border-[#ff2a6d] p-3.5 rounded-lg leading-relaxed text-zinc-200 space-y-1'
                  }
                >
                  {isLocked ? (
                    <div className="relative py-2">
                      <div className="filter blur-[4px] select-none opacity-60 space-y-1">
                        <p>• دستورالعمل محرمانه ریکاوری فوق‌سریع در کمتر از ۶ ساعت میان دو مسابقه سنگین.</p>
                        <p>• پروتکل اختصاصی شارژ گلیکوژن فوق‌متراکم و دستکاری حساسیت به انسولین با رژیم‌های سیکلیک.</p>
                        <p>• بیومارکرهای ترشح هورمون رشد در خواب فاز ۳ و مهار کامل تخریب پروتئینی عضله.</p>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-lg p-3 text-center">
                        <Lock className="w-6 h-6 text-rose-500 mb-1" />
                        <span className="font-bold text-rose-300 text-xs">محتوای پریمیوم و محرمانه VIP</span>
                        <span className="text-[10px] text-zinc-300 mt-0.5">برای مشاهده روی دکمه بازگشایی کلیک فرمایید</span>
                      </div>
                    </div>
                  ) : (
                    mod.summaryPointsFa.map((pt, pIdx) => (
                      <p key={pIdx}>• {pt}</p>
                    ))
                  )}
                </div>

                {/* Execution Steps */}
                {!isLocked && (
                  <div className="space-y-2">
                    <span className="font-bold text-zinc-200 block">
                      پروتکل اجرایی و استانداردهای تمرین:
                    </span>
                    <ol className="pr-4 list-decimal space-y-1.5 text-zinc-300 leading-relaxed">
                      {mod.executionStepsFa.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Coach Pro-Tip */}
                {!isLocked && (
                  <div className="bg-gradient-to-r from-[#d4af37]/15 via-[#d4af37]/5 to-transparent border-r-4 border-[#d4af37] p-3.5 rounded-xl text-xs leading-relaxed">
                    <div className="font-bold text-[#d4af37] flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>متدولوژی اختصاصی خدمات‌جو (اس‌ئی امیری / سیاوش علی‌میری):</span>
                    </div>
                    <p className="text-zinc-200">{mod.proTipFa}</p>
                  </div>
                )}

                {/* ADHD Checklist */}
                {!isLocked && (
                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>ریزگام‌های تمرکز ADHD:</span>
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
                            className={`text-right p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2 ${
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
                )}

                {/* Lock Action Button */}
                {isLocked && (
                  <button
                    onClick={handleUnlockVip}
                    className="w-full bg-gradient-to-r from-[#ff2a6d] to-[#c9184a] hover:from-[#ff4d84] hover:to-[#db1d54] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>بازگشایی و دریافت دسترسی VIP با امتیاز وفاداری</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
