import React, { useState } from 'react';
import {
  Globe,
  Sliders,
  CheckCircle2,
  Sparkles,
  Phone,
  Instagram,
  User,
  ShieldAlert,
  ArrowLeft,
  Volume2,
  RefreshCw,
  Compass
} from 'lucide-react';
import { AdhdSettings, GymWhiteLabelConfig, Language } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface ScriptOneWhiteLabelProps {
  whiteLabel: GymWhiteLabelConfig;
  setWhiteLabel: React.Dispatch<React.SetStateAction<GymWhiteLabelConfig>>;
  adhdSettings: AdhdSettings;
  setAdhdSettings: React.Dispatch<React.SetStateAction<AdhdSettings>>;
  onProceedToScriptTwo: () => void;
}

export const ScriptOneWhiteLabel: React.FC<ScriptOneWhiteLabelProps> = ({
  whiteLabel,
  setWhiteLabel,
  adhdSettings,
  setAdhdSettings,
  onProceedToScriptTwo
}) => {
  const [inGym, setInGym] = useState(whiteLabel.name);
  const [inCoach, setInCoach] = useState(whiteLabel.coach);
  const [inPhone, setInPhone] = useState(whiteLabel.phone);
  const [inInsta, setInInsta] = useState(whiteLabel.instagram);
  const [inSlogan, setInSlogan] = useState(whiteLabel.slogan);
  const [inLang, setInLang] = useState<Language>(whiteLabel.lang);
  const [inLogo, setInLogo] = useState(whiteLabel.logoUrl);
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  const presets = [
    {
      name: 'باشگاه جهانی رویال آریا (VIP Gold)',
      coach: 'استاد سیاوش علی‌میری',
      phone: '09121112233',
      instagram: '@Royal_Aria_Gym',
      slogan: 'مرکز فوق‌تخصصی ورزش و تندرستی نخبگان',
      logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'آکادمی قهرمانی پولادین (Iron Elite)',
      coach: 'کاپیتان مهران رادمنش',
      phone: '09129998877',
      instagram: '@Iron_Elite_Academy',
      slogan: 'پرورش قهرمانان ملی و بین‌المللی با متد علوم ورزشی',
      logo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'کلوب تناسب اندام الماس توانا (Tavana Diamond)',
      coach: 'مهشید افشار و تیم مربیان',
      phone: '09125554433',
      instagram: '@Tavana_Diamond_Fit',
      slogan: 'تعادل ذهن، جسم و اراده در جهان نیو متاورس',
      logo: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setInGym(p.name);
    setInCoach(p.coach);
    setInPhone(p.phone);
    setInInsta(p.instagram);
    setInSlogan(p.slogan);
    setInLogo(p.logo);
    soundAndSpeech.playSuccessChime();
  };

  const handleSaveS1 = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setWhiteLabel(prev => ({
      ...prev,
      name: inGym || prev.name,
      coach: inCoach || prev.coach,
      phone: inPhone || prev.phone,
      instagram: inInsta || prev.instagram,
      slogan: inSlogan || prev.slogan,
      logoUrl: inLogo || prev.logoUrl,
      lang: inLang
    }));

    soundAndSpeech.playSuccessChime();
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Luxury Arena Backdrop Hero Card */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        <img
          src="/src/assets/images/gym_luxury_hero_1793532687752.jpg"
          alt="سالن ورزشی مدرن رویال"
          className="w-full h-48 sm:h-64 object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent flex flex-col justify-end p-5 sm:p-7">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/30 w-fit mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>اسکریپت ۱: هسته معماری، وایت‌لیبل و شخصی‌سازی برندینگ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>دائرةالمعارف جهانی ورزش و سیستم هوشمند وایت‌لیبل</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            امکان شخصی‌سازی کامل برند سالن ورزشی شما در کمتر از ۱۰ ثانیه با هویت بصری استودیو آریا گلد (Black & Gold Aesthetix)، بدون نیاز به دانش برنامه‌نویسی.
          </p>
        </div>
      </div>

      {/* Gym Brand Live Preview Header (Directly elevating User's HTML snippet) */}
      <div className="bg-gradient-to-br from-[#18181c] to-[#121217] border-2 border-[#d4af37] rounded-2xl p-5 text-center shadow-[0_0_25px_rgba(212,175,55,0.2)] relative">
        <div className="absolute top-3 left-3 bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
          پیش‌نمایش زنده وایت‌لیبل
        </div>

        <img
          src={inLogo || whiteLabel.logoUrl}
          alt="لوگوی باشگاه"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#d4af37] object-cover mx-auto mb-3 shadow-[0_0_15px_rgba(212,175,55,0.35)]"
        />
        <h3 className="text-lg sm:text-xl text-[#d4af37] font-bold tracking-tight">
          {inGym || whiteLabel.name}
        </h3>
        <p className="text-xs text-amber-200/80 font-medium mt-0.5">
          {inSlogan || whiteLabel.slogan}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-300">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>مدیریت: {inCoach || whiteLabel.coach}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span dir="ltr">{inPhone || whiteLabel.phone}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Instagram className="w-3.5 h-3.5 text-[#d4af37]" />
            <span dir="ltr">{inInsta || whiteLabel.instagram}</span>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {showSavedNotification && (
        <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 px-4 py-3 rounded-xl flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>هسته و مشخصات وایت‌لیبل باشگاه با موفقیت به‌روزرسانی و ذخیره شد!</span>
          </div>
          <button
            onClick={() => setShowSavedNotification(false)}
            className="text-emerald-400 hover:text-white text-xs"
          >
            بستن
          </button>
        </div>
      )}

      {/* Quick Preset Buttons */}
      <div className="bg-[#121217] border border-zinc-800 rounded-xl p-4">
        <label className="block text-xs font-semibold text-zinc-300 mb-2">
          ⚡ بارگذاری سریع الگوهای آماده باشگاهی (با ۱ کلیک):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-right p-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 hover:border-[#d4af37] transition-all text-xs text-zinc-300 hover:text-white group"
            >
              <div className="font-bold text-amber-300 group-hover:text-[#d4af37] truncate">
                {p.name}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5 truncate">
                مربی: {p.coach}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* White-Label Settings Form */}
      <form onSubmit={handleSaveS1} className="space-y-4">
        <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-4">
            <Globe className="w-4 h-4 text-[#d4af37]" />
            <h4 className="text-sm font-bold text-[#d4af37]">
              🌐 تنظیمات وایت‌لیبل و زبان‌های بین‌المللی
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                نام باشگاه / مجموعه ورزشی:
              </label>
              <input
                type="text"
                value={inGym}
                onChange={e => setInGym(e.target.value)}
                placeholder="مثال: باشگاه جهانی رویال"
                className="w-full bg-[#18181c] border border-zinc-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                نام مدیریت / استاد مربی:
              </label>
              <input
                type="text"
                value={inCoach}
                onChange={e => setInCoach(e.target.value)}
                placeholder="مثال: استاد سیاوش علی‌میری"
                className="w-full bg-[#18181c] border border-zinc-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                شماره تماس پذیرش و مربی:
              </label>
              <input
                type="text"
                value={inPhone}
                onChange={e => setInPhone(e.target.value)}
                placeholder="مثال: 09120000000"
                className="w-full bg-[#18181c] border border-zinc-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                شناسه اینستاگرام یا کانال ایتا/روبیکا:
              </label>
              <input
                type="text"
                value={inInsta}
                onChange={e => setInInsta(e.target.value)}
                placeholder="مثال: @Global_Gym"
                className="w-full bg-[#18181c] border border-zinc-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors"
                dir="ltr"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-zinc-400 mb-1">
                شعار انگیزشی و معرف باشگاه:
              </label>
              <input
                type="text"
                value={inSlogan}
                onChange={e => setInSlogan(e.target.value)}
                placeholder="مثال: تندیس اراده و تندرستی در جهان نیو متاورس"
                className="w-full bg-[#18181c] border border-zinc-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-zinc-400 mb-1">
                آدرس لوگوی اختصاصی (URL):
              </label>
              <input
                type="text"
                value={inLogo}
                onChange={e => setInLogo(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#18181c] border border-zinc-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors text-left"
                dir="ltr"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-zinc-400 mb-1">
                انتخاب زبان برنامه (فارسی، انگلیسی، عربی، کردی، آذری):
              </label>
              <select
                value={inLang}
                onChange={e => setInLang(e.target.value as Language)}
                className="w-full bg-[#18181c] border border-zinc-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors"
              >
                <option value="fa">فارسی (Persian) - زبان پیش‌فرض اکوسیستم</option>
                <option value="en">English (جهانی و توریستی)</option>
                <option value="ar">العربية (کشورهای حاشیه خلیج فارس)</option>
                <option value="ku">کوردی (مناطق کردنشین)</option>
                <option value="az">Azərbaycan (آذربایجان و تبریز)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Accessibility & ADHD Configuration Card */}
        <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-4">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-amber-400">
              ♿ دسترس‌پذیری معلولین و حالت تمرکز ADHD
            </h4>
          </div>

          <div className="space-y-3">
            <div className="bg-[#d4af37]/5 border-r-4 border-[#d4af37] p-3 rounded-lg text-xs text-zinc-300 leading-relaxed space-y-1">
              <p>• <strong>رعایت استانداردهای بین‌المللی WCAG:</strong> کنتراست تقویت‌شده، فونت‌های خوانا و ناوبری با صفحه‌خوان.</p>
              <p>• <strong>حالت تمرکز ADHD:</strong> شکستن حرکات پیچیده بدنسازی به گام‌های خرد (Micro-Steps)، بدون حواس‌پرتی بصری و تایمر استراحت صوتی.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#18181c] border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">فعال‌سازی حالت ADHD</span>
                  <span className="text-[10px] text-zinc-400">نمایش حرکات در قالب چک‌لیست میکرو-استپ</span>
                </div>
                <input
                  type="checkbox"
                  checked={adhdSettings.isEnabled}
                  onChange={e => {
                    setAdhdSettings(prev => ({ ...prev, isEnabled: e.target.checked }));
                    soundAndSpeech.playTick();
                  }}
                  className="w-4 h-4 accent-[#d4af37]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#18181c] border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">راهنمای صوتی گویا (TTS)</span>
                  <span className="text-[10px] text-zinc-400">قرائت صوتی گام‌ها برای کم‌بینایان و تمرکز</span>
                </div>
                <input
                  type="checkbox"
                  checked={adhdSettings.voiceNarration}
                  onChange={e => {
                    setAdhdSettings(prev => ({ ...prev, voiceNarration: e.target.checked }));
                    soundAndSpeech.playTick();
                  }}
                  className="w-4 h-4 accent-[#d4af37]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#18181c] border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">کنتراست بالا (High Contrast)</span>
                  <span className="text-[10px] text-zinc-400">تقویت تفکیک رنگ‌ها و مرزها</span>
                </div>
                <input
                  type="checkbox"
                  checked={adhdSettings.highContrast}
                  onChange={e => {
                    setAdhdSettings(prev => ({ ...prev, highContrast: e.target.checked }));
                    soundAndSpeech.playTick();
                  }}
                  className="w-4 h-4 accent-[#d4af37]"
                />
              </label>

              <div className="p-3 rounded-xl bg-[#18181c] border border-zinc-800">
                <span className="text-xs font-semibold text-zinc-200 block mb-1">اندازه متن و المان‌ها</span>
                <select
                  value={adhdSettings.fontSize}
                  onChange={e => setAdhdSettings(prev => ({ ...prev, fontSize: e.target.value as any }))}
                  className="w-full bg-[#121217] border border-zinc-700 rounded-lg p-1.5 text-xs text-zinc-200 outline-none"
                >
                  <option value="normal">استاندارد (Normal)</option>
                  <option value="large">بزرگ (Large - ویژه سالمندان و معلولین)</option>
                  <option value="extra-large">خیلی بزرگ (Extra Large)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa820a] text-black font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ذخیره تغییرات وایت‌لیبل</span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleSaveS1();
              onProceedToScriptTwo();
            }}
            className="bg-zinc-800 hover:bg-zinc-700 text-[#d4af37] border border-[#d4af37]/60 font-bold py-3.5 px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2 group"
          >
            <span>ورود به اسکریپت ۲ (دائرةالمعارف حرکات)</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};
