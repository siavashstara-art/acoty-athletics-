import React, { useState } from 'react';
import { Eye, Globe, Accessibility, Volume2, VolumeX, Sparkles, UserCheck, LogIn, Menu, X, Search } from 'lucide-react';
import { AdhdSettings, GymWhiteLabelConfig, UserProfile, Language } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface HeaderStampProps {
  whiteLabel: GymWhiteLabelConfig;
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  onToggleAdhd: () => void;
  onToggleContrast: () => void;
  onToggleVoice: () => void;
  onOpenAuth: () => void;
  onOpenSearch?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  currentLang?: Language;
  onSelectLang?: (lang: Language) => void;
}

interface LanguageOption {
  code: Language;
  nameFa: string;
  flag: string;
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'fa', nameFa: 'فارسی', flag: '🇮🇷' },
  { code: 'en', nameFa: 'English', flag: '🇬🇧' },
  { code: 'ar', nameFa: 'العربية', flag: '🇸🇦' },
  { code: 'tr', nameFa: 'Türkçe', flag: '🇹🇷' },
  { code: 'es', nameFa: 'Español', flag: '🇪🇸' },
  { code: 'fr', nameFa: 'Français', flag: '🇫🇷' },
  { code: 'de', nameFa: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', nameFa: 'Русский', flag: '🇷🇺' },
  { code: 'zh', nameFa: '中文', flag: '🇨🇳' },
  { code: 'ja', nameFa: '日本語', flag: '🇯🇵' },
  { code: 'ko', nameFa: '한국어', flag: '🇰🇷' },
  { code: 'hi', nameFa: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ur', nameFa: 'اردو', flag: '🇵🇰' },
  { code: 'ku', nameFa: 'کوردی', flag: '☀️' }
];

export const HeaderStamp: React.FC<HeaderStampProps> = ({
  whiteLabel,
  adhdSettings,
  userProfile,
  onToggleAdhd,
  onToggleContrast,
  onToggleVoice,
  onOpenAuth,
  onOpenSearch,
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  currentLang = 'fa',
  onSelectLang
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>(currentLang);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const primaryItems = [
    { id: 'master-bank', label: '🏋️‍♂️🏆 مرجع جامع حرکات، پاورلیفتینگ و بدنسازی' },
    { id: 'pr-tracker', label: '📊🏆 ثبت رکوردهای ورزشی شخصی (PR Tracker)' },
    { id: 'nutrition', label: '🍎 تغذیه تخصصی و متابولیسم سلولی' },
    { id: 'weight-cutting', label: '🤼‍♂️🥊 پروتکل علمی سر وزن آمدن کشتی و رزمی' },
    { id: 'gym-music', label: '🎧 رادیو DJ و آهنگ‌های ورزشی باشگاه' },
    { id: 'periodization', label: '⚡ سیستم‌های تمرینی و پیریودیزاسیون' },
    { id: 'encyclopedia', label: '📚 دائرةالمعارف ۱۶ حرکت بدنسازی' }
  ];

  const vipItems = [
    { id: 'deep-muscles', label: '🫁 پرزنت حضوری باشگاه‌ها، حنجره، قامت و چشم' },
    { id: 'gym-music', label: '🎧 رادیو DJ آهنگ‌های هیجانی باشگاه' },
    { id: 'weight-cutting', label: '🤼‍♂️🥊 پروتکل علمی سر وزن آمدن کشتی و رزمی' },
    { id: 'pr-tracker', label: '📊🏆 ثبت رکوردهای ورزشی شخصی (PR Tracker)' },
    { id: 'brain-training', label: '🧠 باشگاه ورزش مغز و بازی‌های فکری' },
    { id: 'blog', label: '📰 مجله علمی تخصصی ورزش و سلامت' },
    { id: 'ads', label: '📢 جذب اسپانسرینگ و تجهیزات ورزشی' },
    { id: 'android', label: '📱 خروجی اتوماتیک اندروید (بازار و مایکت)' },
    { id: 'biochem', label: '🧪 بیوشیمی غدد و قوانین Anti-Doping WADA' },
    { id: 'package3', label: '📊 تکنولوژی، شبیه‌ساز ACWR و آنالیز' },
    { id: 'package2', label: '🧠 روانشناسی ورزشی و تمرکز تونلی' },
    { id: 'referral', label: '🏆 لیگ معرفان (Referral League VIP)' },
    { id: 'loyalty', label: '👑 تالار مشاهیر وفاداران (Loyalty VIP)' },
    { id: 'hamraz', label: '📜 همراز و آفرینش (محتوای اختصاصی)' },
    { id: 'promo', label: '🎬 استودیوی سناریوی تبلیغاتی آپارات' }
  ];

  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/95 backdrop-blur-md border-b border-[#d4af37]/30 transition-all">
      {/* Official Header Stamp & Multi-Language Flag Bar */}
      <div className="bg-gradient-to-r from-[#aa820a]/20 via-[#d4af37]/15 to-[#aa820a]/20 border-b border-[#d4af37]/20 py-1.5 px-3 flex items-center justify-between text-[10px] md:text-xs text-[#d4af37] font-semibold tracking-wide">
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          <span className="truncate">
            اکوسیستم آفرینش آفرینا شهر جدید نیو متاورسی جهان ایبل سیتی (توانا سیتی) - FB NewMeta EbarCity Athletics
          </span>
        </div>

        {/* Multi-Language Flag Selector (14 Languages) */}
        <div className="relative shrink-0">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="flex items-center gap-1.5 bg-[#181820] hover:bg-zinc-800 border border-[#d4af37]/50 px-2 py-1 rounded-lg text-xs text-white transition-all shadow-sm"
          >
            <span>{activeLangObj.flag}</span>
            <span className="font-bold">{activeLangObj.nameFa}</span>
          </button>

          {isLangDropdownOpen && (
            <div className="absolute left-0 sm:right-0 mt-1 w-44 bg-[#121217] border border-[#d4af37]/40 rounded-xl shadow-2xl py-1 z-50 max-h-60 overflow-y-auto no-scrollbar">
              <div className="px-3 py-1.5 text-[10px] text-zinc-400 border-b border-zinc-800 font-bold">
                انتخاب زبان (Multi-Language):
              </div>
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang.code);
                    setIsLangDropdownOpen(false);
                    if (onSelectLang) onSelectLang(lang.code);
                    soundAndSpeech.playTick();
                  }}
                  className={`w-full text-right px-3 py-2 text-xs flex items-center gap-2 transition-all ${
                    selectedLang === lang.code
                      ? 'bg-[#d4af37]/20 text-[#d4af37] font-bold'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.nameFa}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & White-label Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={whiteLabel.logoUrl}
              alt={whiteLabel.name}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#d4af37] object-cover shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#09090b] rounded-full" title="پلتفرم آنلاین و فعال"></span>
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold gold-gradient-text truncate max-w-[190px] md:max-w-none">
              {whiteLabel.name}
            </h1>
            <p className="text-[10px] text-zinc-400 truncate hidden sm:block">
              {whiteLabel.slogan}
            </p>
          </div>
        </div>

        {/* Clean Primary Navigation Items for Desktop */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-medium">
          {primaryItems.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeTab === item.id
                  ? 'bg-[#d4af37] text-black font-extrabold shadow-md'
                  : 'text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Accessibility (Disability & ADHD Icon Badge), Search & Drawer Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Disability & ADHD Accessibility Badge (مخصوص معلولین و ADHD) */}
          <button
            onClick={onToggleAdhd}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              adhdSettings.isEnabled
                ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                : 'bg-[#181820] text-amber-300 border-amber-500/30 hover:bg-zinc-800'
            }`}
            title="حالت دسترس‌پذیری معلولین و تمرکز ADHD"
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">معلولین & ADHD</span>
          </button>

          {/* Global Search & Guide Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1 bg-[#181820] hover:bg-zinc-800 text-[#d4af37] border border-[#d4af37]/40 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              title="سرچ هوشمند و راهنمای کلی سیستم"
            >
              <Search className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">سرچ و راهنما</span>
            </button>
          )}

          {/* Menu Drawer Button (Unified Menu for Clean Desktop & Mobile View) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-1.5 bg-[#181820] hover:bg-zinc-800 text-amber-300 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            aria-label="منوی گزینه‌ها و بخش VIP"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-amber-400" />}
            <span>منوی امکانات & VIP</span>
          </button>

          {/* User Auth Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:from-[#e5c158] hover:to-[#b88c0c] text-black px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            {userProfile.isAuthenticated ? (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span className="truncate max-w-[80px]">{userProfile.fullName}</span>
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5" />
                <span>ورود</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Categorized Drawer Menu (Prevents Main Screen Clutter During Gym Pitches) */}
      {isMobileMenuOpen && (
        <div className="bg-[#0e0e12] border-b-2 border-[#d4af37] px-4 py-5 space-y-5 animate-in slide-in-from-top-2 shadow-2xl max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category 1: Main Gym Pitch & Sports Science */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-[#d4af37] border-b border-zinc-800 pb-2 flex items-center gap-1.5">
                <span>🏋️ ۱. بخش‌های اصلی و پرزنت حضوری باشگاه:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {primaryItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-right px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === item.id
                        ? 'bg-[#d4af37] text-black font-extrabold shadow-md'
                        : 'bg-[#181820] text-zinc-300 hover:bg-zinc-800 hover:text-[#d4af37]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category 2: Specialized & VIP Tools (Kept in Drawer to Avoid Clutter) */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-amber-300 border-b border-zinc-800 pb-2 flex items-center gap-1.5">
                <span>👑 ۲. امکانات اختصاصی، خروجی اندروید و بخش‌های VIP:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {vipItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-right px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === item.id
                        ? 'bg-amber-400 text-black font-extrabold shadow-md'
                        : 'bg-[#181820] text-zinc-300 hover:bg-zinc-800 hover:text-amber-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
