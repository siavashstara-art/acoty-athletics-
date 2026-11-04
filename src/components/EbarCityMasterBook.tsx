import React, { useState } from 'react';
import { BookOpen, Sparkles, Volume2, ShieldCheck, Key, Trophy, MapPin, CheckCircle2, User, Award, Flame } from 'lucide-react';
import { AdhdSettings, UserProfile } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface EbarCityMasterBookProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const EbarCityMasterBook: React.FC<EbarCityMasterBookProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile
}) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'podcast' | 'author' | 'pricing'>('intro');
  const [licenseInput, setLicenseInput] = useState('');
  const [activationMessage, setActivationMessage] = useState<{ text: string; success: boolean } | null>(null);

  const validLicenses = ['afrins1000', 'citys2000', 'ables500', 'tavana777'];

  const handleActivateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = licenseInput.trim().toLowerCase();
    if (!cleanKey) {
      setActivationMessage({ text: 'لطفاً کد لایسنس معتبر را وارد کنید.', success: false });
      return;
    }

    if (validLicenses.includes(cleanKey)) {
      soundAndSpeech.playSuccessChime();
      setActivationMessage({
        text: `✨ لایسنس "${cleanKey}" با موفقیت تایید شد! دسترسی کامل به کتاب مرجع بیومکانیک و سرفصل‌های پیشرفته برای شما آزاد شد.`,
        success: true
      });
      setUserProfile(prev => ({
        ...prev,
        myLoyaltyPoints: prev.myLoyaltyPoints + 1000
      }));
      if (adhdSettings.voiceNarration) {
        soundAndSpeech.speakText('لایسنس کتاب با موفقیت فعال شد.');
      }
    } else {
      soundAndSpeech.playError();
      setActivationMessage({
        text: '❌ کد لایسنس وارد شده نامعتبر است. لطفاً کدهایی نظیر afrins1000 یا ables500 را امتحان کنید.',
        success: false
      });
    }
  };

  const podcastScriptText = `سلام! به ایبلسیتی خوش آمدید. اگر از تمرینات فرسایشی و بدون نتیجه خسته شده‌ای، اینجا نقطه عطف شماست. در این برنامه با اصول بیومکانیک، آناتومی کاربردی و حرکات اصولی آشنا می‌شوی که به تو یاد می‌دهد چطور با کمترین خطا، بیشترین حجم و فیتنس را بسازی. این اثر عصاره بیش از ۳۰ سال حضور مداوم در دل باشگاه‌های بدنسازی و تلمذ از محضر بزرگترین اساتید و پیشکسوتان اکوسیستم FB NewMeta است.`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Master Book Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#18150d] via-[#121217] to-[#0d0d12] border-2 border-[#d4af37]/70 shadow-[0_10px_40px_rgba(212,175,55,0.2)] p-6 sm:p-8">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] px-3.5 py-1.5 rounded-full text-xs font-bold">
              <BookOpen className="w-4 h-4 text-[#d4af37]" />
              <span>کتاب مرجع رسمی و مکتوب | فناوری FB NewMeta</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white gold-gradient-text">
              بیومکانیک زیستی و بدنسازی پیشرفته ایبلسیتی
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              راهنمای جامع فیزیک بدن، اهرم‌های حرکتی، بازسازی ریشه‌ای فرم بدن و روایت ۳۰ سال حضور در گودهای اصیل بدنسازی ایران.
            </p>
          </div>

          <div className="bg-black/80 border border-[#d4af37]/40 rounded-2xl p-4 text-center shrink-0 shadow-lg">
            <span className="text-[10px] text-zinc-400 block">نسخه انتشار اثر</span>
            <span className="text-lg font-black text-amber-400">۱۴۰۵ / چاپ دیجیتال</span>
            <div className="mt-2 text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-1 rounded font-bold border border-emerald-500/40">
              ویژه قهرمانان و مربیان
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => {
            setActiveTab('intro');
            soundAndSpeech.playTick();
          }}
          className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2.5 ${
            activeTab === 'intro'
              ? 'bg-[#d4af37] text-black font-extrabold shadow-md'
              : 'bg-[#121217] border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span className="text-xs">مقدمه و خلاصه کتاب</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('podcast');
            soundAndSpeech.playTick();
          }}
          className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2.5 ${
            activeTab === 'podcast'
              ? 'bg-purple-500 text-white font-extrabold shadow-md'
              : 'bg-[#121217] border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <Volume2 className="w-4 h-4 shrink-0" />
          <span className="text-xs">پادکست و خلاصه صوتی</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('author');
            soundAndSpeech.playTick();
          }}
          className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2.5 ${
            activeTab === 'author'
              ? 'bg-amber-500 text-black font-extrabold shadow-md'
              : 'bg-[#121217] border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <User className="w-4 h-4 shrink-0" />
          <span className="text-xs">درباره نویسنده و خط زمانی</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('pricing');
            soundAndSpeech.playTick();
          }}
          className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2.5 ${
            activeTab === 'pricing'
              ? 'bg-emerald-500 text-black font-extrabold shadow-md'
              : 'bg-[#121217] border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <Key className="w-4 h-4 shrink-0" />
          <span className="text-xs">قیمت‌گذاری و لایسنس</span>
        </button>
      </div>

      {/* TAB 1: INTRODUCTION & FREE SUMMARY */}
      {activeTab === 'intro' && (
        <div className="bg-[#121217] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-[#d4af37] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span>مقدمه و خلاصه رایگان کتاب مرجع بیومکانیک ایبلسیتی</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              اکوسیستم آفرینش آفریناب - فناوری FB NewMeta
            </p>
          </div>

          <div className="bg-[#181822] border border-[#d4af37]/30 p-5 rounded-2xl text-xs sm:text-sm text-zinc-200 leading-relaxed space-y-4">
            <p>
              به ایبلسیتی خوش آمدید؛ جایی که علم بیومکانیک و تجربه عملی ۱۵ ساله در هم آمیخته‌اند تا فرم بدن شما را از ریشه بازسازی کنند. این اثر به جای تکیه بر روش‌های سنتی، بر پایه قوانین فیزیک بدن، اهرم‌های حرکتی و حداکثر بهره‌وری عضلانی بنا شده است تا هر فردی بتواند بدون نیاز به تجهیزات پیچیده، ساختار بدن خود را به بالاترین سطح توانمندی برساند.
            </p>
            <p>
              در این کتاب یاد می‌گیرید که چطور به جای تقلید کورکورانه از برنامه‌های قهرمانان استروئیدی، بر اساس آناتومی شخصی، زاویه مفاصل و بردارهای نیرو تمرین کنید تا رشد عضلانی پایدار، بدون آسیب و مادام‌العمر را تجربه نمایید.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#181820] border border-zinc-800 p-4 rounded-2xl space-y-2">
              <span className="text-amber-400 font-extrabold block text-xs">⚖️ قوانین فیزیک بدن</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                تنظیم زاویه مفاصل و حذف گشتاورهای برشی مخرب روی تاندون‌ها و ستون فقرات.
              </p>
            </div>
            <div className="bg-[#181820] border border-zinc-800 p-4 rounded-2xl space-y-2">
              <span className="text-[#00f2fe] font-extrabold block text-xs">⚙️ اهرم‌های حرکتی</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                بهینه‌سازی اهرم‌های نوع اول، دوم و سوم برای جابجایی وزنه‌های سنگین با کمترین فشار جانبی.
              </p>
            </div>
            <div className="bg-[#181820] border border-zinc-800 p-4 rounded-2xl space-y-2">
              <span className="text-emerald-400 font-extrabold block text-xs">🛡️ بازسازی ریشه‌ای فرم</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                اصلاح ناهنجاری‌های حرکتی و دستیابی به تفکیک عمیق عضلانی بدون آسیب.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PODCAST SCRIPT & AUDIO SUMMARY */}
      {activeTab === 'podcast' && (
        <div className="bg-[#121217] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-purple-400 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-purple-400" />
                <span>اسکریپت پادکست و خلاصه صوتی کتاب</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                روایت صوتی مقدمه کتاب با قابلیت پخش هوشمند صوتی
              </p>
            </div>
            <button
              onClick={() => soundAndSpeech.speakText(podcastScriptText)}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>پخش صوتی پادکست (Speech API)</span>
            </button>
          </div>

          <div className="bg-[#181822] border border-purple-500/30 p-5 rounded-2xl text-xs sm:text-sm text-zinc-200 leading-relaxed space-y-3">
            <p className="font-semibold text-purple-300">متن اسکریپت صوتی:</p>
            <p className="italic bg-black/40 p-4 rounded-xl border border-zinc-800">
              «سلام! به ایبلسیتی خوش آمدید. اگر از تمرینات فرسایشی و بدون نتیجه خسته شده‌ای، اینجا نقطه عطف شماست. در این برنامه با اصول بیومکانیک، آناتومی کاربردی و حرکات اصولی آشنا می‌شوی که به تو یاد می‌دهد چطور با کمترین خطا، بیشترین حجم و فیتنس را بسازی. این اثر عصاره بیش از ۳۰ سال حضور مداوم در دل باشگاه‌های بدنسازی و تلمذ از محضر بزرگترین اساتید و پیشکسوتان اکوسیستم FB NewMeta است.»
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: AUTHOR TIMELINE & BIO */}
      {activeTab === 'author' && (
        <div className="bg-[#121217] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-amber-400 flex items-center gap-2">
              <User className="w-5 h-5 text-amber-400" />
              <span>درباره نویسنده و خط زمانی (استاد سیاوش علی‌میری)</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              روایتی از جنس آگاهی، رنج و حضور در گود وزنه‌ها و تلمذ از محضر اساتید بزرگ
            </p>
          </div>

          <div className="space-y-4">
            {/* Timeline Item 1 */}
            <div className="bg-[#181822] border border-zinc-800 hover:border-amber-500/50 p-4 rounded-2xl flex items-start gap-4 transition-all">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                ۱
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <span className="text-amber-400 font-bold">سن ۱۱ سالگی</span>
                <p className="text-zinc-200">
                  باشگاه عمار تهران (تجریش) در معیت مرحوم استاد محسن شاکری.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="bg-[#181822] border border-zinc-800 hover:border-amber-500/50 p-4 rounded-2xl flex items-start gap-4 transition-all">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                ۲
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <span className="text-amber-400 font-bold">باشگاه جوان تهران</span>
                <p className="text-zinc-200">
                  شاگردی در محضر استاد سعید مهرپور و استاد حمزه هوشمند.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="bg-[#181822] border border-zinc-800 hover:border-amber-500/50 p-4 rounded-2xl flex items-start gap-4 transition-all">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                ۳
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <span className="text-amber-400 font-bold">بسکتبال حرفه‌ای</span>
                <p className="text-zinc-200">
                  باشگاه استقلال زیر نظر استاد حسن نگهداری.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="bg-[#181822] border border-zinc-800 hover:border-amber-500/50 p-4 rounded-2xl flex items-start gap-4 transition-all">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                ۴
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <span className="text-amber-400 font-bold">سنین ۱۶ و ۱۷ سالگی</span>
                <p className="text-zinc-200">
                  باشگاه جسم و اندیشه در کنار استاد مهدی لطیفی و استاد محسن یزدانی (قهرمان جهان).
                </p>
              </div>
            </div>

            {/* Timeline Item 5 */}
            <div className="bg-[#181822] border border-zinc-800 hover:border-amber-500/50 p-4 rounded-2xl flex items-start gap-4 transition-all">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                ۵
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <span className="text-amber-400 font-bold">محله چیذر</span>
                <p className="text-zinc-200">
                  باشگاه گلستان و زورخانه آیت‌الله طالقانی چیذر در معیت استاد ناصر آردانی.
                </p>
              </div>
            </div>

            {/* Timeline Item 6 */}
            <div className="bg-[#181822] border border-zinc-800 hover:border-amber-500/50 p-4 rounded-2xl flex items-start gap-4 transition-all">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                ۶
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <span className="text-amber-400 font-bold">باشگاه رسالت</span>
                <p className="text-zinc-200">
                  بهره‌مندی از تجربیات ارزشمند استاد احد عبادی.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRICING & LICENSE ACTIVATION */}
      {activeTab === 'pricing' && (
        <div className="bg-[#121217] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-400" />
              <span>اطلاعات فروش، قیمت‌گذاری و فعال‌سازی لایسنس کتاب</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              خرید نسخه کامل کتاب و وارد کردن کدهای لایسنس اختصاصی
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#181820] border border-zinc-800 p-5 rounded-2xl text-center space-y-2">
              <span className="text-xs text-zinc-400 block">قیمت پایه کتاب</span>
              <span className="text-xl font-black text-white line-through opacity-70">۲۹۹,۰۰۰ تومان</span>
              <span className="text-xs text-zinc-500 block">معادل ۵.۹۸ دریک</span>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/60 to-[#181820] border-2 border-emerald-500 p-5 rounded-2xl text-center space-y-2 shadow-lg">
              <span className="text-xs text-emerald-300 font-bold block">🌟 جشنواره ویژه ماه اول (۵۰٪ تخفیف)</span>
              <span className="text-2xl font-black text-emerald-400">۱۵۰,۰۰۰ تومان</span>
              <span className="text-xs text-emerald-200 block">۳ فوتون دریک (PhD)</span>
            </div>

            <div className="bg-[#181820] border border-zinc-800 p-5 rounded-2xl text-center space-y-2">
              <span className="text-xs text-zinc-400 block">قیمت بین‌المللی (USDT)</span>
              <span className="text-xl font-black text-cyan-400">$4.99 USDT</span>
              <span className="text-xs text-zinc-500 block">پرداخت ارزی متاورس</span>
            </div>
          </div>

          {/* License Activation Form */}
          <div className="bg-[#181822] border border-[#d4af37]/40 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>فعال‌سازی با کدهای لایسنس اختصاصی (نمونه کدها: afrins1000 یا citys2000 یا ables500)</span>
            </div>

            <form onSubmit={handleActivateLicense} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={licenseInput}
                onChange={e => setLicenseInput(e.target.value)}
                placeholder="کد لایسنس را وارد کنید (مثلا afrins1000)"
                className="flex-1 bg-black border border-zinc-700 focus:border-[#d4af37] text-white px-4 py-3 rounded-xl text-xs outline-none font-mono"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:opacity-90 text-black font-extrabold px-6 py-3 rounded-xl text-xs transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4 text-black" />
                <span>بررسی و فعال‌سازی لایسنس</span>
              </button>
            </form>

            {activationMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in ${
                  activationMessage.success
                    ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-200'
                    : 'bg-rose-500/20 border border-rose-500 text-rose-200'
                }`}
              >
                {activationMessage.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : null}
                <span>{activationMessage.text}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
