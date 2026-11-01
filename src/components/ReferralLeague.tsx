import React, { useState } from 'react';
import {
  Users,
  Copy,
  Check,
  Award,
  Gift,
  Share2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Send,
  MessageSquare
} from 'lucide-react';
import { ReferralUser, UserProfile } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface ReferralLeagueProps {
  referralUsers: ReferralUser[];
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onAddReferral: (code: string) => void;
}

export const ReferralLeague: React.FC<ReferralLeagueProps> = ({
  referralUsers,
  userProfile,
  setUserProfile,
  onAddReferral
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [inputFriendCode, setInputFriendCode] = useState('');
  const [friendCodeError, setFriendCodeError] = useState('');
  const [friendCodeSuccess, setFriendCodeSuccess] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(userProfile.referralCode);
    setCopiedCode(true);
    soundAndSpeech.playSuccessChime();
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleApplyFriendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setFriendCodeError('');
    setFriendCodeSuccess('');

    if (!inputFriendCode.trim()) {
      setFriendCodeError('لطفاً کد معرف را وارد نمایید.');
      return;
    }

    if (inputFriendCode.trim() === userProfile.referralCode) {
      setFriendCodeError('شما نمی‌توانید کد معرف خودتان را وارد کنید!');
      return;
    }

    if (userProfile.referredBy) {
      setFriendCodeError(`شما قبلاً کد معرف ${userProfile.referredBy} را ثبت کرده‌اید.`);
      return;
    }

    // Award bonus
    setUserProfile(prev => ({
      ...prev,
      referredBy: inputFriendCode.trim(),
      myReferralPoints: prev.myReferralPoints + 200,
      myLoyaltyPoints: prev.myLoyaltyPoints + 150
    }));

    onAddReferral(inputFriendCode.trim());
    soundAndSpeech.playSuccessChime();
    setFriendCodeSuccess('🎉 کد معرف با موفقیت ثبت شد! ۲۰۰ امتیاز هدیه به کیف پول شما اضافه شد.');
    setInputFriendCode('');
  };

  const shareText = `رفیق ورزشکارم! بیا با هم در باشگاه رویال توانا تمرین کنیم و از دائرةالمعارف تخصصی ورزش لذت ببریم. با کد معرف من [${userProfile.referralCode}] عضو شو و ۲۰۰ امتیاز هدیه رایگان بگیر! 🏆💪`;

  const handleShareApp = (platform: 'whatsapp' | 'telegram' | 'eitaa' | 'sms') => {
    const encoded = encodeURIComponent(shareText);
    let url = '';
    if (platform === 'whatsapp') url = `https://api.whatsapp.com/send?text=${encoded}`;
    else if (platform === 'telegram') url = `https://t.me/share/url?url=${window.location.origin}&text=${encoded}`;
    else if (platform === 'sms') url = `sms:?body=${encoded}`;
    else url = `https://rubika.ir`;

    if (url) window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1c160c] via-[#121217] to-[#09090b] border-2 border-[#d4af37] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37]">
              <Sparkles className="w-4 h-4" />
              <span>سیستم رسمی پاداش‌دهی اکوسیستم توانا سیتی (الزامی بند ۳)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>لیگ معرفان ورزشکاران (Referral League)</span>
            </h2>
            <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
              با دعوت دوستان و همرزمان ورزشی خود، هم آنها تخفیف ویژه عضویت و اشتراک دریافت می‌کنند و هم شما پاداش نقدی، امتیاز وفاداری و صعود به تالار الماس پلاتینیوم کسب می‌کنید.
            </p>
          </div>

          {/* User Status Badge */}
          <div className="bg-[#18181f] border border-[#d4af37]/40 rounded-xl p-4 text-center shrink-0 w-full sm:w-auto shadow-md">
            <div className="text-[11px] text-zinc-400">امتیاز معرف شما:</div>
            <div className="text-2xl font-bold text-[#d4af37] my-1 tabular-nums">
              {userProfile.myReferralPoints.toLocaleString('fa-IR')}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              سطح: {userProfile.vipTier}
            </div>
          </div>
        </div>

        {/* My Referral Code Box */}
        <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d0d12]/70 p-4 rounded-xl border border-zinc-800">
          <div>
            <span className="text-xs text-zinc-400 block mb-0.5">کد معرف اختصاصی شما:</span>
            <span className="font-mono text-base sm:text-lg font-bold text-amber-300 tracking-wider">
              {userProfile.referralCode}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#d4af37] hover:bg-[#e5c158] text-black font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'کپی شد!' : 'کپی کد معرف'}</span>
            </button>

            <button
              onClick={() => handleShareApp('whatsapp')}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors"
              title="اشتراک‌گذاری در واتساپ"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleShareApp('sms')}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors"
              title="ارسال با پیامک"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Enter Friend's Referral Code */}
      <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 mb-2">
          <Gift className="w-4 h-4 text-emerald-400" />
          <span>ثبت کد معرف یکی از دوستان (دریافت ۲۰۰ امتیاز هدیه شروع):</span>
        </h3>
        <p className="text-xs text-zinc-400 mb-3">
          اگر توسط دوستی به باشگاه یا این اپلیکیشن دعوت شده‌اید، کد او را اینجا وارد کنید.
        </p>

        <form onSubmit={handleApplyFriendCode} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={inputFriendCode}
            onChange={e => setInputFriendCode(e.target.value)}
            placeholder="کد معرف دوست خود را وارد کنید (مثال: ROYAL-FIT-99)"
            className="flex-1 bg-[#18181c] border border-zinc-700 focus:border-[#d4af37] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none uppercase font-mono"
            dir="ltr"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ثبت و دریافت پاداش</span>
          </button>
        </form>

        {friendCodeError && (
          <p className="text-xs text-rose-400 mt-2 font-medium">{friendCodeError}</p>
        )}
        {friendCodeSuccess && (
          <p className="text-xs text-emerald-400 mt-2 font-medium">{friendCodeSuccess}</p>
        )}
      </div>

      {/* Leaderboard Table of Referral League */}
      <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#d4af37]" />
            <h3 className="text-sm font-bold text-[#d4af37]">
              جدول رده‌بندی برترین معرفان باشگاه و اکوسیستم
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400">به‌روزرسانی هفتگی</span>
        </div>

        <div className="space-y-2.5">
          {referralUsers.map((user, index) => {
            const isTop3 = index < 3;
            const rankColors = [
              'bg-amber-400/20 text-amber-300 border-amber-400/50',
              'bg-slate-300/20 text-slate-200 border-slate-400/50',
              'bg-amber-700/20 text-amber-500 border-amber-700/50'
            ];

            return (
              <div
                key={user.id}
                className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                  isTop3
                    ? 'bg-[#181822] border-[#d4af37]/40 shadow-sm'
                    : 'bg-[#141418] border-zinc-800'
                }`}
              >
                {/* Rank & User Info */}
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border ${
                      isTop3 ? rankColors[index] : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    {user.rank}
                  </span>

                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border border-[#d4af37]/40 object-cover"
                  />

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-100 flex items-center gap-1.5">
                      <span>{user.name}</span>
                      <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20 hidden sm:inline">
                        {user.tier}
                      </span>
                    </h4>
                    <span className="text-[11px] text-zinc-400 font-mono" dir="ltr">
                      {user.code}
                    </span>
                  </div>
                </div>

                {/* Score & Invites */}
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-[#d4af37] tabular-nums">
                    {user.invitedCount.toLocaleString('fa-IR')} دعوت موفق
                  </div>
                  <div className="text-[10px] text-zinc-400 tabular-nums">
                    {user.pointsEarned.toLocaleString('fa-IR')} امتیاز پاداش
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
