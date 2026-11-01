import React from 'react';
import { Eye, Volume2, VolumeX, Sparkles, UserCheck, LogIn, Menu, X, Search } from 'lucide-react';
import { AdhdSettings, GymWhiteLabelConfig, UserProfile } from '../types/index.ts';

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
}

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
  setIsMobileMenuOpen
}) => {
  const navItems = [
    { id: 'whitelabel', label: '۱. وایت‌لیبل (فصل ۱)' },
    { id: 'biochem', label: '۲. غدد و WADA (فصل ۲)' },
    { id: 'biomechanics', label: '۳. بیومکانیک (فصل ۲)' },
    { id: 'package1', label: '🛡️ پکیج ۱: آسیب‌شناسی (ماژول ۷-۱۰)' },
    { id: 'package2', label: '🧠 پکیج ۲: روانشناسی (ماژول ۱۱-۱۴)' },
    { id: 'package3', label: '📊 پکیج ۳: تکنولوژی و ارزیابی (ماژول ۱۵-۱۹)' },
    { id: 'deep-muscles', label: '🫁 عضلات پنهان و پرزنت (فصل ۴)' },
    { id: 'nutrition', label: '۴. تغذیه و متابولیسم (فصل ۳)' },
    { id: 'periodization', label: '۵. سیستم‌های تمرینی (فصل ۳)' },
    { id: 'encyclopedia', label: '۶. دائرةالمعارف حرکات (اسکریپت ۶)' },
    { id: 'referral', label: '۷. لیگ معرفان (فصل ۴)' },
    { id: 'loyalty', label: '۸. مشاهیر وفاداران (فصل ۴)' },
    { id: 'hamraz', label: '۹. همراز و آفرینش (فصل ۴)' },
    { id: 'promo', label: '۱۰. سناریوی آپارات (فصل ۴)' },
    { id: 'android', label: '۱۱. خروجی بازار و مایکت (فصل ۴)' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/95 backdrop-blur-md border-b border-[#d4af37]/30 transition-all">
      {/* Official Header Stamp according to Ecosystem Directive 7 */}
      <div className="bg-gradient-to-r from-[#aa820a]/20 via-[#d4af37]/15 to-[#aa820a]/20 border-b border-[#d4af37]/20 py-1.5 px-3 text-center text-[10px] md:text-xs text-[#d4af37] font-semibold tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
        <span className="truncate">
          اکوسیستم آفرینش آفرینا شهر جدید نیو متاورسی جهان ایبل سیتی (توانا سیتی) - FB NewMeta دائرةالمعارف جهانی ورزش
        </span>
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

        {/* Desktop Nav Links */}
        <nav className="hidden 2xl:flex items-center gap-1 text-xs font-medium overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === item.id
                  ? 'bg-[#d4af37] text-black font-bold shadow-md'
                  : 'text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Accessibility, Search & Auth Zone */}
        <div className="flex items-center gap-1.5 sm:gap-2">
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

          {/* ADHD Mode Quick Toggle */}
          <button
            onClick={onToggleAdhd}
            className={`px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all border ${
              adhdSettings.isEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-700 hover:text-zinc-200'
            }`}
            title="حالت تمرکز و ریزگام‌های ADHD"
          >
            <span>ADHD</span>
            <span className="text-[10px] hidden sm:inline">{adhdSettings.isEnabled ? 'روشن' : 'خاموش'}</span>
          </button>

          {/* Voice Narration Audio */}
          <button
            onClick={onToggleVoice}
            className={`p-1.5 rounded-lg border transition-all ${
              adhdSettings.voiceNarration
                ? 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-700'
            }`}
            title={adhdSettings.voiceNarration ? 'صدا فعال است' : 'صدا غیرفعال است'}
            aria-label="روشن/خاموش کردن راهنمای صوتی"
          >
            {adhdSettings.voiceNarration ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* High Contrast */}
          <button
            onClick={onToggleContrast}
            className={`p-1.5 rounded-lg border transition-all ${
              adhdSettings.highContrast
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-700'
            }`}
            title="حالت کنتراست بالا برای معلولین و کم‌بینایان"
            aria-label="حالت کنتراست بالا"
          >
            <Eye className="w-4 h-4" />
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

          {/* Mobile & Tablet Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="2xl:hidden p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
            aria-label="منوی گزینه‌ها"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="2xl:hidden bg-[#121217] border-b border-[#d4af37]/30 px-4 py-3 space-y-1.5 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-right px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-[#d4af37] text-black font-bold'
                  : 'text-zinc-300 hover:bg-zinc-800 hover:text-[#d4af37]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
