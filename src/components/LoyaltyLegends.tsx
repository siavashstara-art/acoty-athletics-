import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Award,
  Crown,
  Calendar,
  CheckCircle,
  Quote,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { LoyaltyLegend, UserProfile } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface LoyaltyLegendsProps {
  legends: LoyaltyLegend[];
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const LoyaltyLegends: React.FC<LoyaltyLegendsProps> = ({
  legends,
  userProfile,
  setUserProfile
}) => {
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDailyCheckIn = () => {
    if (hasCheckedInToday) {
      setToastMessage('شما امروز حضور خود را ثبت کرده‌اید! فردا منتظر شما هستیم.');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }

    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 100,
      streakDays: prev.streakDays + 1
    }));

    setHasCheckedInToday(true);
    soundAndSpeech.playSuccessChime();
    setToastMessage('🔥 آفرین قهرمان! ۱۰۰ امتیاز وفاداری و ۱ روز به زنجیره استمرار شما اضافه شد.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Trophy Hero Card */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#1c160a] to-[#09090b] items-center">
          <div className="p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] bg-black/60 px-3 py-1 rounded-full border border-[#d4af37]/30 w-fit">
              <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>تالار مشاهیر رسمی وفاداران (الزامی بند ۳)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              لیگ مشاهیر وفاداران و اسطوره‌های ماندگار
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              اینجا جایگاه کسانی است که به تمرین، اخلاق ورزشی و انضباط فردی وفادار ماندند. هر روز استمرار شما در باشگاه و سامانه، نام شما را در تالار جاودانگان ثبت می‌کند.
            </p>

            {/* Daily Check-In Action */}
            <div className="pt-2">
              <button
                onClick={handleDailyCheckIn}
                disabled={hasCheckedInToday}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                  hasCheckedInToday
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 cursor-default'
                    : 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black hover:opacity-95'
                }`}
              >
                {hasCheckedInToday ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>حضور امروز شما با موفقیت ثبت شده است</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 text-amber-900 fill-amber-900" />
                    <span>ثبت استمرار تمرینی امروز (+۱۰۰ امتیاز وفاداری)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative h-64 md:h-full flex items-center justify-center p-4">
            <img
              src="/src/assets/images/loyalty_legends_trophy_1793532688489.jpg"
              alt="جام طلایی تالار مشاهیر وفاداران"
              className="max-h-56 md:max-h-64 object-contain drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="bg-amber-950/90 border border-amber-500/60 text-amber-200 px-4 py-3 rounded-xl text-xs font-semibold shadow-lg text-center animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* User's Loyalty Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#121217] border border-zinc-800 rounded-xl p-3.5 text-center">
          <span className="text-[10px] text-zinc-400 block mb-1">زنجیره استمرار شما</span>
          <div className="text-xl font-bold text-amber-400 flex items-center justify-center gap-1 tabular-nums">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{userProfile.streakDays.toLocaleString('fa-IR')} روز</span>
          </div>
        </div>

        <div className="bg-[#121217] border border-zinc-800 rounded-xl p-3.5 text-center">
          <span className="text-[10px] text-zinc-400 block mb-1">مجموع امتیاز وفاداری</span>
          <div className="text-xl font-bold text-[#d4af37] tabular-nums">
            {userProfile.myLoyaltyPoints.toLocaleString('fa-IR')}
          </div>
        </div>

        <div className="bg-[#121217] border border-zinc-800 rounded-xl p-3.5 text-center">
          <span className="text-[10px] text-zinc-400 block mb-1">سطح عضویت کلوپ</span>
          <div className="text-base font-bold text-emerald-400">
            {userProfile.vipTier}
          </div>
        </div>

        <div className="bg-[#121217] border border-zinc-800 rounded-xl p-3.5 text-center">
          <span className="text-[10px] text-zinc-400 block mb-1">تعداد مدال‌ها</span>
          <div className="text-xl font-bold text-cyan-400 tabular-nums">
            ۴ نشان افتخار
          </div>
        </div>
      </div>

      {/* Hall of Fame Legends List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[#d4af37] flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>اسطوره‌های صدرنشین تالار مشاهیر و تندیس‌های زرین:</span>
          </h3>
          <span className="text-xs text-zinc-400">به‌روزرسانی هفتگی هیئت داوران</span>
        </div>

        {legends.map(legend => (
          <div
            key={legend.id}
            className="bg-[#121217] border border-zinc-800/90 hover:border-[#d4af37]/60 rounded-2xl p-5 transition-all shadow-xl group relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Crown / Rank Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#aa820a]/30 to-black border-2 border-[#d4af37] flex items-center justify-center font-bold text-[#d4af37] text-lg shrink-0 shadow-md">
                  #{legend.rank}
                </div>

                <img
                  src={legend.avatar}
                  alt={legend.name}
                  className="w-14 h-14 rounded-full border-2 border-[#d4af37] object-cover shrink-0 shadow-lg"
                />

                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{legend.name}</span>
                    <span className="text-[11px] text-[#d4af37] bg-[#d4af37]/15 px-2.5 py-0.5 rounded-full border border-[#d4af37]/30">
                      {legend.badge}
                    </span>
                  </h4>
                  <p className="text-xs text-zinc-300 mt-0.5 font-medium">
                    {legend.gymRole} · {legend.city}
                  </p>
                </div>
              </div>

              {/* Points & Days */}
              <div className="text-left bg-[#181820] px-4 py-2.5 rounded-xl border border-zinc-700/80 shrink-0 w-full sm:w-auto">
                <div className="text-xs font-bold text-[#d4af37] tabular-nums">
                  {legend.loyaltyPoints.toLocaleString('fa-IR')} امتیاز وفاداری
                </div>
                <div className="text-[11px] text-amber-300 flex items-center gap-1 mt-0.5 tabular-nums">
                  <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{legend.consecutiveDays.toLocaleString('fa-IR')} روز استمرار متوالی</span>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-300 italic flex items-start gap-2 bg-[#0d0d12]/60 p-3 rounded-xl border border-zinc-800/60">
              <Quote className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{legend.quote}</span>
            </div>

            {/* Achievements List */}
            <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
              {legend.achievements.map((ach, aIdx) => (
                <span
                  key={aIdx}
                  className="bg-zinc-800/80 border border-zinc-700 text-zinc-300 px-2.5 py-1 rounded-md"
                >
                  ✓ {ach}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
