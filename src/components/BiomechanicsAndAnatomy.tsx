import React, { useState, useEffect } from 'react';
import {
  Activity,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle,
  Volume2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Timer,
  Award,
  Compass,
  Flame,
  Check
} from 'lucide-react';
import { AdhdSettings, BiomechanicsLeverItem, SportDisciplineAnatomy, UserProfile } from '../types/index.ts';
import { BIOMECHANICS_LEVERS, SPORTS_DISCIPLINES } from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface BiomechanicsAndAnatomyProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onProceedNext?: () => void;
}

export const BiomechanicsAndAnatomy: React.FC<BiomechanicsAndAnatomyProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile,
  onProceedNext
}) => {
  const [activeTab, setActiveTab] = useState<'anatomy' | 'levers' | 'neuromuscular'>('anatomy');
  const [selectedSportId, setSelectedSportId] = useState<string>(SPORTS_DISCIPLINES[0].id);
  const [selectedLeverId, setSelectedLeverId] = useState<string>(BIOMECHANICS_LEVERS[0].id);
  const [notification, setNotification] = useState('');

  // Interactive Neuromuscular Reflex Tester state
  const [testState, setTestState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTimeMs, setReactionTimeMs] = useState<number | null>(null);
  const [bestReactionTimeMs, setBestReactionTimeMs] = useState<number | null>(null);
  const [earlyClick, setEarlyClick] = useState(false);

  const selectedSport = SPORTS_DISCIPLINES.find(s => s.id === selectedSportId) || SPORTS_DISCIPLINES[0];
  const selectedLever = BIOMECHANICS_LEVERS.find(l => l.id === selectedLeverId) || BIOMECHANICS_LEVERS[0];

  const handleSpeak = (text: string) => {
    soundAndSpeech.speakText(text);
  };

  const handleSaveModule3 = () => {
    soundAndSpeech.playSuccessChime();
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 150
    }));
    setNotification('✅ اسکریپت سوم (آناتومی کاربردی و بیومکانیک) با موفقیت در ایسیتی اتلتیکس ثبت شد! (+۱۵۰ امتیاز وفاداری)');
    setTimeout(() => setNotification(''), 4500);
  };

  // Reflex Reaction Speed Logic
  const startReflexTest = () => {
    setEarlyClick(false);
    setTestState('waiting');
    soundAndSpeech.playTick();

    const randomDelay = Math.floor(Math.random() * 2500) + 1500; // 1.5 - 4.0s
    setTimeout(() => {
      setTestState(current => {
        if (current === 'waiting') {
          setStartTime(Date.now());
          soundAndSpeech.playSuccessChime();
          return 'ready';
        }
        return current;
      });
    }, randomDelay);
  };

  const handleReflexClick = () => {
    if (testState === 'waiting') {
      setEarlyClick(true);
      setTestState('idle');
      soundAndSpeech.playTick();
    } else if (testState === 'ready') {
      const elapsed = Date.now() - startTime;
      setReactionTimeMs(elapsed);
      setTestState('result');
      soundAndSpeech.playSuccessChime();

      if (!bestReactionTimeMs || elapsed < bestReactionTimeMs) {
        setBestReactionTimeMs(elapsed);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Visualizer Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
        <img
          src="/src/assets/images/biomechanics_athletic_banner_1793536194017.jpg"
          alt="آناتومی کاربردی و تحلیل بیومکانیک حرکتی"
          className="w-full h-48 sm:h-64 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent flex flex-col justify-end p-5 sm:p-7">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#00f2fe] font-semibold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#00f2fe]/40 w-fit mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>اسکریپت ۳: آناتومی کاربردی، هندسه مفاصل و سیستم عصب-عضله</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>ایسیتی اتلتیکس | بازدهی حداکثری و آسیب حداقل</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            بررسی مهندسی اهرم‌های بدنی، مرکز ثقل، زنجیره حرکتی در تمام رشته‌های ورزشی و تسریع فراخوانی واحدهای حرکتی مغز در صدم ثانیه‌ها با متدولوژی خدمات‌جو.
          </p>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex rounded-2xl bg-[#121217] p-1.5 border border-zinc-800 shadow-lg">
        <button
          onClick={() => {
            setActiveTab('anatomy');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'anatomy'
              ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>۱. آناتومی کاربردی رشته‌ها</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('levers');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'levers'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>۲. بیومکانیک و اهرم‌های حرکتی</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('neuromuscular');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'neuromuscular'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>۳. سیستم عصب-عضله و تست واکنش</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-semibold shadow-lg animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-emerald-400 hover:text-white">بستن</button>
        </div>
      )}

      {/* PILLAR 1: MULTI-SPORT APPLIED ANATOMY */}
      {activeTab === 'anatomy' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Intro callout */}
          <div className="bg-[#121217] border border-[#d4af37]/40 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-[#d4af37] flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>آناتومی عملکردی فراتر از زیبایی بصری:</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              عضله تنها برای فیگور گرفتن نیست؛ بلکه موتوری برای پرتاب، شوت، شیرجه و غلبه بر اینرسی حریف است. هر رشته ورزشی زنجیره حرکتی (Kinetic Chain) منحصر‌به‌فردی دارد که بدون هماهنگی مفصلی، منجر به پارگی رباط یا اتلاف انرژی می‌شود.
            </p>
          </div>

          {/* Sports Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {SPORTS_DISCIPLINES.map(sport => (
              <button
                key={sport.id}
                onClick={() => {
                  setSelectedSportId(sport.id);
                  soundAndSpeech.playTick();
                }}
                className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  selectedSportId === sport.id
                    ? 'bg-[#1a1710] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]'
                    : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="text-xl mb-1">{sport.icon}</span>
                <span className="text-xs font-bold text-white truncate">{sport.sportFa}</span>
                <span className="text-[10px] text-zinc-400 font-mono mt-0.5" dir="ltr">{sport.sportEn}</span>
              </button>
            ))}
          </div>

          {/* Selected Sport Deep-Dive Card */}
          <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-zinc-800/80 border border-zinc-700">{selectedSport.icon}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{selectedSport.sportFa}</span>
                    <span className="text-xs text-zinc-400 font-mono" dir="ltr">({selectedSport.sportEn})</span>
                  </h3>
                  <p className="text-xs text-[#d4af37] font-semibold mt-0.5">
                    تحلیل آناتومیک و پیشگیری از آسیب‌های تخصصی
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSpeak(`${selectedSport.sportFa}. زنجیره حرکتی: ${selectedSport.kineticChainFa}. قانون بیومکانیک: ${selectedSport.biomechanicsLawFa}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-[#d4af37] hover:bg-zinc-700 text-xs font-semibold transition-colors"
                title="شنیدن صوتی"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>قرائت صوتی</span>
              </button>
            </div>

            {/* Key Muscles */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-zinc-300 block">عضلات کلیدی درگیر در این رشته:</span>
              <div className="flex flex-wrap gap-2">
                {selectedSport.keyMusclesFa.map((m, idx) => (
                  <span key={idx} className="bg-zinc-800 border border-zinc-700 text-amber-300 text-xs px-3 py-1 rounded-lg">
                    • {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Kinetic Chain & Biomechanics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#181820] p-4 rounded-xl border border-zinc-800 space-y-1">
                <strong className="text-[#00f2fe] flex items-center gap-1.5 mb-1">
                  <Activity className="w-4 h-4" />
                  <span>زنجیره حرکتی و انتقال توان (Kinetic Chain):</span>
                </strong>
                <p className="text-zinc-200 leading-relaxed">{selectedSport.kineticChainFa}</p>
              </div>

              <div className="bg-[#181820] p-4 rounded-xl border border-zinc-800 space-y-1">
                <strong className="text-[#d4af37] flex items-center gap-1.5 mb-1">
                  <Compass className="w-4 h-4" />
                  <span>قانون حاکم بیومکانیکی و فیزیک حرکت:</span>
                </strong>
                <p className="text-zinc-200 leading-relaxed">{selectedSport.biomechanicsLawFa}</p>
              </div>
            </div>

            {/* Injury & Prevention */}
            <div className="bg-rose-950/20 border border-rose-500/40 p-4 rounded-xl space-y-1 text-xs">
              <strong className="text-rose-400 block mb-1">⚠️ شایع‌ترین آسیب‌های مفصلی و نقاط بحرانی:</strong>
              <p className="text-rose-200 leading-relaxed">{selectedSport.commonInjuriesFa}</p>
            </div>

            {/* Neuromuscular Drill */}
            <div className="bg-emerald-950/20 border border-emerald-500/40 p-4 rounded-xl space-y-1 text-xs">
              <strong className="text-emerald-400 flex items-center gap-1.5 mb-1">
                <Zap className="w-4 h-4" />
                <span>تمرین عصبی-عضلانی پیشنهادی متد خدمات‌جو:</span>
              </strong>
              <p className="text-emerald-100 leading-relaxed">{selectedSport.neuromuscularDrillFa}</p>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: BIOMECHANICAL LEVERS */}
      {activeTab === 'levers' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-[#121217] border border-cyan-500/40 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-1.5">
              <Compass className="w-4 h-4" />
              <span>هندسه اهرم‌های اسکلتی انسان (Fulcrum, Effort & Load):</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              استخوان‌ها بازوهای اهرم، مفاصل تکیه‌گاه و انقباض عضلات نیروی محرک را تشکیل می‌دهند. شناخت مزیت مکانیکی (Mechanical Advantage) تفاوت بین رکورد زدن ایمن و پارگی تاندون است.
            </p>
          </div>

          {/* 3 Levers Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BIOMECHANICS_LEVERS.map(lever => (
              <button
                key={lever.id}
                onClick={() => {
                  setSelectedLeverId(lever.id);
                  soundAndSpeech.playTick();
                }}
                className={`p-4 rounded-xl border text-right transition-all space-y-1.5 ${
                  selectedLeverId === lever.id
                    ? 'bg-[#0f1820] border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.25)] ring-1 ring-cyan-400'
                    : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span className="text-[10px] text-cyan-400 font-semibold">{lever.classType.split('(')[0]}</span>
                <h4 className="text-xs font-bold text-white">{lever.titleFa}</h4>
                <p className="text-[10px] text-zinc-400 font-mono" dir="ltr">{lever.titleEn.split('(')[0]}</p>
              </button>
            ))}
          </div>

          {/* Lever Details Profile */}
          <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="border-b border-zinc-800 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-cyan-400 font-bold">{selectedLever.classType}</span>
                <span className="text-[11px] text-amber-300 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">
                  {selectedLever.mechanicalAdvantage.split('؛')[0]}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">{selectedLever.titleFa}</h3>
            </div>

            {/* Lever Triangle Anatomy Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#181820] p-3.5 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-cyan-400 font-bold block mb-1">📍 تکیه‌گاه (Fulcrum):</span>
                <span className="text-zinc-200">{selectedLever.fulcrumFa}</span>
              </div>

              <div className="bg-[#181820] p-3.5 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-emerald-400 font-bold block mb-1">⚡ نیروی محرک (Effort):</span>
                <span className="text-zinc-200">{selectedLever.effortForceFa}</span>
              </div>

              <div className="bg-[#181820] p-3.5 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-rose-400 font-bold block mb-1">📦 بار و مقاومت (Load):</span>
                <span className="text-zinc-200">{selectedLever.loadResistanceFa}</span>
              </div>
            </div>

            {/* Examples & Exercise Tips */}
            <div className="bg-[#181820] p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
              <span className="font-bold text-[#d4af37] block">نمونه مفاصل در بدن:</span>
              <p className="text-zinc-300 leading-relaxed">{selectedLever.bodyExampleFa}</p>
              <div className="pt-2 border-t border-zinc-800/80">
                <span className="font-bold text-zinc-200 block mb-1">کاربرد مستقیم در حرکات بدنسازی:</span>
                <p className="text-zinc-300 leading-relaxed">{selectedLever.exerciseApplicationFa}</p>
              </div>
            </div>

            {/* Coach Pro-Tip */}
            <div className="bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border-r-4 border-[#d4af37] p-3.5 rounded-xl text-xs leading-relaxed">
              <span className="font-bold text-[#d4af37] block mb-1">💡 نکته طلایی متدولوژی خدمات‌جو (اس‌ئی امیری):</span>
              <p className="text-zinc-200">{selectedLever.proTipFa}</p>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 3: NEUROMUSCULAR SYSTEM & REFLEX SPEED TESTER */}
      {activeTab === 'neuromuscular' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Scientific Callout */}
          <div className="bg-[#121217] border border-amber-500/40 rounded-2xl p-5 shadow-lg space-y-2">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>هماهنگی سیستم عصب-عضله و قانون اندازه هینمن (Henneman):</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              تعداد تار عضلانی که در یک حرکت منقبض می‌شوند مستقیماً به قدرت سیناپس‌های عصبی مغز وابسته است. ورزشکاران نخبه با تمرینات پلایومتریک و پرتابی، تأخیر زمانی اتصال عصب به صفحه محرکه عضله را از ۲۵۰ میلی‌ثانیه به کمتر از ۱۲۰ میلی‌ثانیه کاهش می‌دهند.
            </p>
          </div>

          {/* Interactive Neuromuscular Reaction Speed Tester */}
          <div className="bg-[#121217] border-2 border-[#d4af37] rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37]">
                <Timer className="w-4 h-4" />
                <span>ابزار آزمایشگاهی سنجش سرعت واکنش عصب-عضله (میلی‌ثانیه)</span>
              </div>

              {bestReactionTimeMs && (
                <span className="text-xs text-emerald-400 font-mono tabular-nums">
                  بهترین رکورد شما: {bestReactionTimeMs} میلی‌ثانیه
                </span>
              )}
            </div>

            {/* Interactive Click Pad */}
            <div
              onClick={handleReflexClick}
              className={`w-full h-48 sm:h-56 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all select-none p-4 ${
                testState === 'idle'
                  ? 'bg-zinc-900 border-2 border-zinc-700 hover:border-[#d4af37]'
                  : testState === 'waiting'
                  ? 'bg-amber-950/60 border-2 border-amber-500 animate-pulse'
                  : testState === 'ready'
                  ? 'bg-emerald-600 border-4 border-white shadow-[0_0_40px_rgba(16,185,129,0.8)] scale-[1.02]'
                  : 'bg-zinc-900 border-2 border-[#d4af37]'
              }`}
            >
              {testState === 'idle' && (
                <div className="space-y-2">
                  <Zap className="w-8 h-8 text-[#d4af37] mx-auto" />
                  <div className="text-sm font-bold text-white">برای شروع تست واکنش کلیک کنید</div>
                  <div className="text-[11px] text-zinc-400">
                    با تغییر رنگ صفحه به <strong className="text-emerald-400">سبز</strong> در سریع‌ترین زمان کلیک کنید!
                  </div>
                </div>
              )}

              {testState === 'waiting' && (
                <div className="space-y-2">
                  <div className="text-lg font-bold text-amber-300">منتظر رنگ سبز باشید...</div>
                  <div className="text-xs text-amber-200">اگر زودتر کلیک کنید خطا ثبت می‌شود!</div>
                </div>
              )}

              {testState === 'ready' && (
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white">همین الان کلیک کنید! ⚡</div>
                  <div className="text-xs text-emerald-100">سریع‌ترین زمان ممکن!</div>
                </div>
              )}

              {testState === 'result' && (
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-[#d4af37] font-mono tabular-nums">
                    {reactionTimeMs} ms
                  </div>
                  <div className="text-xs text-zinc-200 font-semibold">
                    {reactionTimeMs! < 180
                      ? '🔥 فوق‌العاده! سرعت واکنش در سطح ورزشکاران المپیکی و فرمول یک'
                      : reactionTimeMs! < 240
                      ? '⚡ بسیار عالی! هماهنگی عصب و عضله در شرایط مطلوب'
                      : '👍 نرمال و خوب؛ با تمرینات پلایومتریک قابل ارتقاست'}
                  </div>
                </div>
              )}
            </div>

            {earlyClick && (
              <p className="text-xs text-rose-400 font-semibold">
                ⚠️ خیلی زود کلیک کردید! لطفاً تا دیدن رنگ سبز صبور باشید.
              </p>
            )}

            {/* Test Action Controls */}
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={startReflexTest}
                className="bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold px-6 py-2.5 rounded-xl text-xs hover:opacity-95 shadow-md flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{testState === 'idle' ? 'شروع آزمایش عصب-عضله' : 'تکرار مجدد تست'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Submit Button for Script 3 */}
      <div className="pt-2">
        <button
          onClick={handleSaveModule3}
          className="w-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#b8860b] text-black font-bold py-4 px-6 rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>ثبت بخش آناتومی و بیومکانیک در ایسیتی اتلتیکس</span>
        </button>
      </div>
    </div>
  );
};
