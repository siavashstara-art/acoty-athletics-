import React from 'react';
import { Sparkles, Trophy, Shield, Dumbbell, ChevronDown, Compass, Award, ExternalLink } from 'lucide-react';
import heroImage from '../assets/images/tavana_athletics_hero_1793548520395.jpg';
import { GymWhiteLabelConfig, UserProfile } from '../types/index.ts';

interface CentralHeroBannerProps {
  whiteLabel: GymWhiteLabelConfig;
  userProfile: UserProfile;
  onOpenPitchPresenter: () => void;
  onOpenSearch: () => void;
  onOpenVipMenu: () => void;
}

export const CentralHeroBanner: React.FC<CentralHeroBannerProps> = ({
  whiteLabel,
  userProfile,
  onOpenPitchPresenter,
  onOpenSearch,
  onOpenVipMenu
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#121217] via-[#0d0d12] to-[#08080b] border-2 border-[#d4af37]/60 shadow-[0_10px_40px_rgba(212,175,55,0.15)] mb-8">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <img
          src={heroImage}
          alt="EbarCity Tavana Athletics - Muscle Anatomy and Sports Science"
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-[#08080b]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080b]/80 via-transparent to-[#08080b]/80" />

        {/* Top Floating Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/80 backdrop-blur-md border border-[#d4af37] text-[#d4af37] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>اکوسیستم آفرینش آفرینا - توانا سیتی</span>
        </div>

        {/* Coach / White Label Identity Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2">
          <img
            src={whiteLabel.logoUrl}
            alt={whiteLabel.name}
            className="w-5 h-5 rounded-full border border-[#d4af37]"
          />
          <span className="truncate max-w-[140px] font-bold text-[#d4af37]">{whiteLabel.name}</span>
        </div>
      </div>

      {/* Hero Content Area */}
      <div className="p-6 sm:p-8 -mt-20 relative z-10 space-y-6">
        <div className="space-y-3 text-center sm:text-right">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] px-3 py-1 rounded-full text-xs font-bold">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>پلتفرم تخصصی آناتومی، عضلات پنهان و بیومکانیک ورزشی</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight gold-gradient-text">
            ایبل‌سیتی اتلتیکس (EbarCity Tavana Athletics)
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            {whiteLabel.slogan} — بستر انحصاری معرفی حضوری در باشگا‌ه‌های کشور، غربالگری سلامت قامت دانش‌آموزان و سنجش بینایی و عضلات چشم کودکان.
          </p>
        </div>

        {/* Action Buttons for Gym Pitch Presentation vs VIP Menu */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onOpenPitchPresenter}
            className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa820a] hover:opacity-95 text-black font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-black" />
            <span>شروع پرزنت حضوری در باشگاه (نسخه بدون شلوغی)</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="w-full sm:w-auto bg-[#181820] hover:bg-zinc-800 text-[#d4af37] border border-[#d4af37]/50 font-bold px-5 py-3.5 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>سرچ سرتاسری و فیلتر مطالب</span>
          </button>

          <button
            onClick={onOpenVipMenu}
            className="w-full sm:w-auto bg-zinc-900/90 hover:bg-zinc-800 text-amber-300 border border-zinc-700 font-semibold px-4 py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>منوی امکانات پیشرفته و VIP</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-zinc-800/80 text-xs">
          <div className="bg-[#121217]/90 p-3 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold">۱</span>
            <div>
              <span className="font-bold text-zinc-200 block text-[11px]">پرزنت حضوری باشگاه</span>
              <span className="text-[10px] text-zinc-400">پریست‌های اکسیژن، پارت، انقلاب</span>
            </div>
          </div>

          <div className="bg-[#121217]/90 p-3 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">۲</span>
            <div>
              <span className="font-bold text-zinc-200 block text-[11px]">اصلاح ناهنجاری قامتی</span>
              <span className="text-[10px] text-zinc-400">تست دیوار و لوردوز ستون فقرات</span>
            </div>
          </div>

          <div className="bg-[#121217]/90 p-3 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">۳</span>
            <div>
              <span className="font-bold text-zinc-200 block text-[11px]">تنبلی چشم کودکان</span>
              <span className="text-[10px] text-zinc-400">تمرین عضلات برون‌چشمی</span>
            </div>
          </div>

          <div className="bg-[#121217]/90 p-3 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">۴</span>
            <div>
              <span className="font-bold text-zinc-200 block text-[11px]">خروجی ریلیز اندروید</span>
              <span className="text-[10px] text-zinc-400">آماده کافه بازار و مایکت</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
