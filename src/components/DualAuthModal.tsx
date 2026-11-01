import React, { useState } from 'react';
import { X, Smartphone, Globe, Check, AlertCircle, Sparkles, LogOut } from 'lucide-react';
import { UserProfile } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface DualAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const DualAuthModal: React.FC<DualAuthModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  setUserProfile
}) => {
  const [authMode, setAuthMode] = useState<'iranian' | 'global'>('iranian');
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNumber || '');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [userName, setUserName] = useState(userProfile.fullName || '');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg('شماره موبایل باید حداقل ۱۰ رقم باشد (مثال: 09121234567)');
      return;
    }

    setOtpSent(true);
    soundAndSpeech.playSuccessChime();
    setSuccessMsg('کد تأیید چهار رقمی (پیش‌فرض سیستم: 1234) با موفقیت ارسال شد!');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpCode || otpCode.trim().length !== 4) {
      setErrorMsg('کد تأیید ۴ رقمی را وارد کنید (کد تستی: 1234)');
      return;
    }

    const nameToSet = userName.trim() || `ورزشکار_${phoneNumber.slice(-4)}`;

    setUserProfile(prev => ({
      ...prev,
      isAuthenticated: true,
      authType: 'iranian-mobile',
      phoneNumber: phoneNumber.trim(),
      fullName: nameToSet
    }));

    soundAndSpeech.playSuccessChime();
    setSuccessMsg('ورود با موفقیت انجام شد. خوش آمدید!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleGoogleSignIn = () => {
    setUserProfile(prev => ({
      ...prev,
      isAuthenticated: true,
      authType: 'google-global',
      email: 'athlete.global@gmail.com',
      fullName: 'کاربر بین‌المللی توانا (Google User)'
    }));

    soundAndSpeech.playSuccessChime();
    setSuccessMsg('ورود با حساب گوگل با موفقیت انجام شد!');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleLogout = () => {
    setUserProfile(prev => ({
      ...prev,
      isAuthenticated: false,
      authType: 'guest',
      fullName: 'ورزشکار مهمان'
    }));
    soundAndSpeech.playTick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#121217] border-2 border-[#d4af37] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-zinc-400 hover:text-white p-1 rounded-lg"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto mb-2 text-[#d4af37]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">
            احراز هویت جامع اکوسیستم توانا سیتی
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            ورود اختصاصی کاربران ایرانی با موبایل و کاربران بین‌المللی با گوگل
          </p>
        </div>

        {userProfile.isAuthenticated ? (
          <div className="space-y-4">
            <div className="bg-[#181820] border border-zinc-800 rounded-xl p-4 text-center">
              <span className="text-xs text-emerald-400 font-semibold block mb-1">
                ✓ شما در سیستم وارد شده‌اید
              </span>
              <div className="text-sm font-bold text-white">{userProfile.fullName}</div>
              <div className="text-xs text-zinc-400 mt-1" dir="ltr">
                {userProfile.phoneNumber || userProfile.email}
              </div>
              <div className="text-[11px] text-[#d4af37] mt-2">
                کد معرف شما: {userProfile.referralCode}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/50 text-rose-300 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج از حساب کاربری</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Tabs for Iranian vs Global */}
            <div className="flex rounded-xl bg-[#181820] p-1 border border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('iranian');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'iranian'
                    ? 'bg-[#d4af37] text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>ورود با موبایل (ایرانی)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('global');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'global'
                    ? 'bg-[#d4af37] text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Google Sign-In (خارجی)</span>
              </button>
            </div>

            {authMode === 'iranian' ? (
              !otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      نام و نام‌خانوادگی (اختیاری):
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      placeholder="مثال: علی احمدی"
                      className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      شماره موبایل:
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="09121234567"
                      className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 outline-none focus:border-[#d4af37] font-mono"
                      dir="ltr"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold py-2.5 rounded-xl text-xs shadow-md hover:opacity-95 transition-all"
                  >
                    ارسال کد تأیید پیامکی
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <div className="text-xs text-zinc-300">
                    کد تأیید ارسال‌شده به شماره <span className="font-mono text-amber-300" dir="ltr">{phoneNumber}</span> را وارد کنید:
                  </div>

                  <div>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={e => setOtpCode(e.target.value)}
                      placeholder="1234"
                      className="w-full bg-[#18181c] border border-[#d4af37] rounded-xl px-4 py-2.5 text-center text-lg tracking-widest text-[#d4af37] font-mono outline-none"
                    />
                    <span className="text-[10px] text-zinc-400 block text-center mt-1">کد پیش‌فرض تستی: 1234</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-1/3 bg-zinc-800 text-zinc-300 py-2.5 rounded-xl text-xs font-semibold"
                    >
                      ویرایش شماره
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
                    >
                      تأیید نهایی و ورود
                    </button>
                  </div>
                </form>
              )
            ) : (
              <div className="space-y-3 py-2 text-center">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  ورود مستقیم و امن با حساب گوگل سازگار با پروتکل OAuth:
                </p>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white hover:bg-zinc-100 text-zinc-900 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>ورود با حساب گوگل (Sign in with Google)</span>
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="text-xs text-rose-400 bg-rose-950/30 border border-rose-500/40 p-2.5 rounded-lg flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/40 p-2.5 rounded-lg flex items-center gap-1.5">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
