import React, { useState } from 'react';
import { Flame, Droplets, ShieldCheck, Zap, Award, CheckCircle, Volume2 } from 'lucide-react';
import { AdhdSettings, UserProfile } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface WeightCuttingProtocolProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const WeightCuttingProtocol: React.FC<WeightCuttingProtocolProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile
}) => {
  const [protocolKey, setProtocolKey] = useState<'water_loading' | 'sodium_drop' | 'glycogen_depletion' | 'rehydration'>('water_loading');
  const [notification, setNotification] = useState('');

  const handleSpeak = (text: string) => {
    soundAndSpeech.speakText(text);
  };

  const handleSaveWeightCut = () => {
    soundAndSpeech.playSuccessChime();
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 120
    }));
    setNotification('✅ پروتکل علمی سر وزن آمدن (کشتی و رزمی) با موفقیت در ایسیتی اتلتیکس ثبت شد! (+۱۲۰ امتیاز وفاداری)');
    setTimeout(() => setNotification(''), 4500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#ff9f43]/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
        <div className="bg-gradient-to-r from-[#1a1009] via-[#121216] to-[#121216] p-6 sm:p-8 flex flex-col justify-between space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#ff9f43] font-semibold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#ff9f43]/40 w-fit">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>اسکریپت تخصصی: سر وزن آمدن قهرمانان کشتی و هنرهای رزمی</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            🤼‍♂️🥊 پروتکل علمی و نوین «سر وزن آمدن» بدون آسیب (Weight Cutting & Rapid Recovery)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            روش‌های علمی کاهش وزن آب و الکترولیت بدون نیاز به سونا، کاور پلاستیکی و نابودی کلیه‌ها در متدولوژی خدمات‌جو (اس‌ئی امیری).
          </p>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-semibold shadow-lg animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-emerald-400 hover:text-white">بستن</button>
        </div>
      )}

      {/* Main Card */}
      <div className="card border-2 border-[#ff9f43] bg-gradient-to-b from-[#121216] to-[#1a1009] rounded-2xl p-5 sm:p-7 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#ff9f43]">راهنمای جامع کاهش وزن رزمی‌کاران و کشتی‌گیران</h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">انتخاب فاز اجرایی وزن‌کشی و ریکاوری سریع پیش از مسابقه:</p>
          </div>
          <button
            onClick={() => handleSpeak('پروتکل علمی سر وزن آمدن در کشتی و هنرهای رزمی. بدون نیاز به سونا و کاور پلاستیکی.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-[#ff9f43] text-xs font-semibold"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>قرائت صوتی</span>
          </button>
        </div>

        {/* Protocol Select Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs text-[#ff9f43] font-semibold block">انتخاب فاز اجرایی وزن‌کشی:</label>
          <select
            value={protocolKey}
            onChange={(e) => {
              setProtocolKey(e.target.value as any);
              soundAndSpeech.playTick();
            }}
            className="w-full bg-[#181820] text-white border border-[#ff9f43]/50 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
          >
            <option value="water_loading">💧 پروتکل بارگیری و تخلیه آب (Water Loading): جایگزین امن سونا</option>
            <option value="sodium_drop">🧂 پروتکل حذف سدیم (Sodium Manipulation): تخلیه آب زیرپوستی</option>
            <option value="glycogen_depletion">⚡ تخلیه گلیکوژن (Glycogen Cut): افت وزن سریع بدون عضله‌سوزی</option>
            <option value="rehydration">🚀 جادوی ریکاوری پس از وزن‌کشی (Post-Weigh-In Recharge)</option>
          </select>
        </div>

        {/* Content Display Card */}
        <div className="bg-black/60 border border-dashed border-[#ff9f43] p-5 rounded-xl space-y-3">
          {protocolKey === 'water_loading' && (
            <div>
              <h4 className="text-sm font-bold text-[#ff9f43] mb-1.5 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>پروتکل بارگیری و تخلیه آب (Water Loading)</span>
              </h4>
              <div className="text-xs text-zinc-100 leading-relaxed space-y-2">
                <p>• <strong>مکانیسم علمی:</strong> به جای عذاب کشیدن در سونا یا پوشیدن لباس پلاستیکی (که کلیه‌ها را نابود می‌کند)، ۵ روز مانده به وزن‌کشی روزانه ۶ الی ۸ لیتر آب بنوشید. کلیه‌ها به دفع بالا عادت می‌کنند.</p>
                <p>• <strong>نتیجه:</strong> ۳۶ ساعت مانده به وزن‌کشی با کاهش ملایم آب، بدن همچنان با همان سرعتِ قبل آب را دفع می‌کند و وزن بدون افت توان و بدون گرمازدگی پایین می‌آید.</p>
                <div className="bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/30 text-cyan-200">
                  <strong>مزیت اصلی:</strong> حفظ سلامت کلیه و جلوگیری از افت فشار خون ناگهانی.
                </div>
              </div>
            </div>
          )}

          {protocolKey === 'sodium_drop' && (
            <div>
              <h4 className="text-sm font-bold text-[#ff9f43] mb-1.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>پروتکل حذف سدیم (Sodium Manipulation)</span>
              </h4>
              <div className="text-xs text-zinc-100 leading-relaxed space-y-2">
                <p>• <strong>روش:</strong> قطع کامل نمک و غذاهای شور از ۲ روز مانده به وزن‌کشی.</p>
                <p>• <strong>مکانیسم:</strong> سدیم آب را در بدن حبس می‌کند. با حذف آن، احتباس آب و سدیم در بافت‌های زیرپوستی از بین رفته و چند کیلوگرم وزن آب به راحتی تخلیه می‌شود.</p>
                <div className="bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/30 text-emerald-200">
                  <strong>نکته مربیگری:</strong> پس از وزن‌کشی حتماً سدیم را به همراه الکترولیت بازگردانید.
                </div>
              </div>
            </div>
          )}

          {protocolKey === 'glycogen_depletion' && (
            <div>
              <h4 className="text-sm font-bold text-[#ff9f43] mb-1.5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>تخلیه گلیکوژن (Glycogen Cut)</span>
              </h4>
              <div className="text-xs text-zinc-100 leading-relaxed space-y-2">
                <p>• <strong>روش:</strong> حذف کامل کربوهیدرات در ۴۸ ساعت پایانی پیش از وزن‌کشی.</p>
                <p>• <strong>مکانیسم:</strong> هر گرم کربوهیدرات حدود ۳ تا ۴ گرم آب به همراه خود در عضله حبس می‌کند. با حذف آن، آب درون گلیکوژنی آزاد شده و وزن به سرعت افت می‌کند بدون اینکه بافت عضلانی آسیب ببیند.</p>
              </div>
            </div>
          )}

          {protocolKey === 'rehydration' && (
            <div>
              <h4 className="text-sm font-bold text-amber-400 mb-1.5 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>جادوی ریکاوری و بازگشت وزن (Post-Weigh-In Recharge)</span>
              </h4>
              <div className="text-xs text-zinc-100 leading-relaxed space-y-2">
                <p>• <strong>راز قهرمانان:</strong> بلافاصله پس از رفتن روی باسکول و تأیید وزن، در ۱۲ الی ۲۴ ساعت مانده به مسابقه، ورزشکار آب همراه با الکترولیت‌ها (سدیم، منیزیم، پتاسیم) و کربوهیدرات‌های زودجذب مصرف می‌کند.</p>
                <p>• <strong>نتیجه:</strong> آب و مواد مغذی مثل اسفنج به داخل عضلات برمی‌گردند؛ ورزشکار روی باسکول سبک بود، اما روی تشک مسابقه با حداکثر انرژی، پمپاژ عضلانی و قدرت کامل ظاهر می‌شود.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2">
        <button
          onClick={handleSaveWeightCut}
          className="w-full bg-gradient-to-r from-[#ff9f43] via-[#f39c12] to-[#d35400] text-black font-bold py-4 px-6 rounded-xl shadow-[0_4px_25px_rgba(255,159,67,0.4)] hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>ثبت پروتکل سر وزن آمدن در ایسیتی اتلتیکس (+۱۲۰ امتیاز)</span>
        </button>
      </div>
    </div>
  );
};
