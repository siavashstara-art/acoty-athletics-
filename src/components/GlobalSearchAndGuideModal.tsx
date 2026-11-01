import React, { useState } from 'react';
import {
  Search,
  X,
  Sparkles,
  Filter,
  Globe,
  BookOpen,
  UserCheck,
  GraduationCap,
  Dumbbell,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { GymWhiteLabelConfig, Language } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface GlobalSearchAndGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  whiteLabel: GymWhiteLabelConfig;
  setWhiteLabel: React.Dispatch<React.SetStateAction<GymWhiteLabelConfig>>;
}

interface SearchItem {
  id: string;
  titleFa: string;
  categoryFa: string;
  targetAudience: 'coaches' | 'parents' | 'athletes' | 'all';
  targetAudienceFa: string;
  seasonFa: string;
  keywords: string[];
}

const SEARCH_DATABASE: SearchItem[] = [
  {
    id: 'whitelabel',
    titleFa: '۱. هسته وایت‌لیبل و هویت بصری باشگاه (تغییر لوگو، نام و مربی)',
    categoryFa: 'زیرساخت باشگاهی',
    targetAudience: 'coaches',
    targetAudienceFa: 'ویژه مربیان',
    seasonFa: 'فصل ۱',
    keywords: ['وایت‌لیبل', 'باشگاه', 'لوگو', 'مربی', 'هویت', 'آریا گلد']
  },
  {
    id: 'biochem',
    titleFa: '۲. بیوشیمی غدد، هورمون‌ها و قوانین Anti-Doping WADA',
    categoryFa: 'علوم پایه ورزش',
    targetAudience: 'coaches',
    targetAudienceFa: 'ویژه مربیان و ورزشکاران',
    seasonFa: 'فصل ۲',
    keywords: ['بیوشیمی', 'غدد', 'تستوسترون', 'GH', 'WADA', 'سوگندنامه', 'پاک']
  },
  {
    id: 'biomechanics',
    titleFa: '۳. آناتومی کاربردی، بیومکانیک و اهرم‌های حرکتی',
    categoryFa: 'بیومکانیک زیستی',
    targetAudience: 'coaches',
    targetAudienceFa: 'ویژه مربیان',
    seasonFa: 'فصل ۲',
    keywords: ['آناتومی', 'اهرم', 'گشتاور', 'بیومکانیک', 'زنجیره حرکتی']
  },
  {
    id: 'package1',
    titleFa: '۴. پکیج ۱: آسیب‌شناسی، زاویه قیچی مفاصل و اصلاح ناهنجاری‌ها',
    categoryFa: 'حرکات اصلاحی',
    targetAudience: 'coaches',
    targetAudienceFa: 'ویژه مربیان و فیزیوتراپیست‌ها',
    seasonFa: 'فصل ۲',
    keywords: ['آسیب', 'رباط', 'ACL', 'روتاتور کاف', 'دیسک', 'آشیل', 'ارزیابی']
  },
  {
    id: 'deep-muscles',
    titleFa: '🫁 عضلات پنهان، فیزیوتراپی تنفسی، پرزنت باشگاه‌های تهران، سلامت قامت و چشم کودکان',
    categoryFa: 'پرزنت و کلینیک کودکان',
    targetAudience: 'parents',
    targetAudienceFa: 'ویژه والدین، معلمان و مربیان',
    seasonFa: 'فصل ۴',
    keywords: ['ریه', 'تنفس', 'فوت به کاغذ', 'تار صوتی', 'کگل', 'پرزنت', 'اکسیژن', 'پارت', 'قامت', 'دیوار', 'تنبلی چشم', 'بینایی']
  },
  {
    id: 'nutrition',
    titleFa: '۵. تغذیه تخصصی، متابولیسم سلولی و سیستم‌های سه‌گانه انرژی',
    categoryFa: 'مهندسی عملکرد',
    targetAudience: 'athletes',
    targetAudienceFa: 'ویژه ورزشکاران',
    seasonFa: 'فصل ۳',
    keywords: ['تغذیه', 'متابولیسم', 'ATP', 'کربوهیدرات', 'پروتئین', 'مکمل', 'ISSN']
  },
  {
    id: 'periodization',
    titleFa: '۶. سیستم‌های تمرینی، پیریودیزاسیون و تپرینگ مسابقات',
    categoryFa: 'طراحی برنامه',
    targetAudience: 'coaches',
    targetAudienceFa: 'ویژه مربیان',
    seasonFa: 'فصل ۳',
    keywords: ['پیریودیزاسیون', 'ماکروسیکل', 'تپرینگ', 'سوپرکامپنسیشن', 'RPE', 'RIR']
  },
  {
    id: 'encyclopedia',
    titleFa: '۷. دائرةالمعارف حرکات بدنسازی با متد خدمات‌جو (۱۶ حرکت کاربردی)',
    categoryFa: 'بانک حرکات',
    targetAudience: 'athletes',
    targetAudienceFa: 'ویژه ورزشکاران',
    seasonFa: 'فصل ۳',
    keywords: ['دائرةالمعارف', 'حرکات', 'پرس سینه', 'ددلیفت', 'اسکوات', 'تایمر استراحت']
  },
  {
    id: 'package3',
    titleFa: '۸. پکیج ۳: تکنولوژی، شبیه‌ساز ACWR و خودتنظیمی هوشمند',
    categoryFa: 'آنالیز داده',
    targetAudience: 'coaches',
    targetAudienceFa: 'ویژه مربیان',
    seasonFa: 'فصل ۳',
    keywords: ['تکنولوژی', 'ACWR', 'شبیه‌ساز', 'خودتنظیمی', 'خستگی', 'آمار']
  },
  {
    id: 'package2',
    titleFa: '۹. پکیج ۲: روانشناسی ورزشی، تنفس مربع 4-4-4-4 و تمرکز تونلی',
    categoryFa: 'روانشناسی مسابقه',
    targetAudience: 'athletes',
    targetAudienceFa: 'ویژه ورزشکاران و قهرمانان',
    seasonFa: 'فصل ۴',
    keywords: ['روانشناسی', 'استرس', 'تنفس مربع', 'Box Breathing', 'تمرکز تونلی', 'ذهنیت']
  },
  {
    id: 'referral',
    titleFa: '۱۰. لیگ معرفان و سیستم دعوتی (Referral League)',
    categoryFa: 'اکوسیستم جذب',
    targetAudience: 'all',
    targetAudienceFa: 'همگانی',
    seasonFa: 'فصل ۴',
    keywords: ['معرفان', 'دعوت', 'امتیاز', 'باشگاه', 'کد معرف']
  },
  {
    id: 'loyalty',
    titleFa: '۱۱. تالار مشاهیر وفاداران رویال (Loyalty Legends)',
    categoryFa: 'رتبه‌بندی اعضا',
    targetAudience: 'all',
    targetAudienceFa: 'همگانی',
    seasonFa: 'فصل ۴',
    keywords: ['مشاهیر', 'وفاداران', 'رتبه‌بندی', 'کاپ', 'مدال']
  },
  {
    id: 'android',
    titleFa: '۱۲. خروجی اتوماتیک اندروید برای کافه‌بازار و مایکت (Gradle 34 & Termux)',
    categoryFa: 'توسعه اندروید',
    targetAudience: 'coaches',
    targetAudienceFa: 'ویژه توسعه‌دهندگان و مربیان',
    seasonFa: 'فصل ۴',
    keywords: ['اندروید', 'گریدل', 'ترموکس', 'APK', 'AAB', 'بازار', 'مایکت']
  }
];

export const GlobalSearchAndGuideModal: React.FC<GlobalSearchAndGuideModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  whiteLabel,
  setWhiteLabel
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [audienceFilter, setAudienceFilter] = useState<'all' | 'coaches' | 'parents' | 'athletes'>('all');
  const [activeGuideTab, setActiveGuideTab] = useState<'search' | 'guide' | 'language'>('search');

  if (!isOpen) return null;

  const filteredItems = SEARCH_DATABASE.filter(item => {
    const matchesAudience = audienceFilter === 'all' || item.targetAudience === audienceFilter || item.targetAudience === 'all';
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesAudience;

    const matchesTitle = item.titleFa.toLowerCase().includes(query);
    const matchesCategory = item.categoryFa.toLowerCase().includes(query);
    const matchesKeyword = item.keywords.some(k => k.toLowerCase().includes(query));

    return matchesAudience && (matchesTitle || matchesCategory || matchesKeyword);
  });

  const languagesList: { id: Language; nameFa: string; flag: string; nativeName: string }[] = [
    { id: 'fa', nameFa: 'فارسی (رسمی)', flag: '🇮🇷', nativeName: 'Persian / فارسی' },
    { id: 'en', nameFa: 'انگلیسی (International)', flag: '🇬🇧', nativeName: 'English' },
    { id: 'ku', nameFa: 'کوردی (سورانی / کرمانجی)', flag: '☀️', nativeName: 'Kurdî / کوردی' },
    { id: 'ur', nameFa: 'اردو (پاکستان و هند)', flag: '🇵🇰', nativeName: 'Urdu / اردو' },
    { id: 'tr', nameFa: 'ترکی استانبولی (Türkiye)', flag: '🇹🇷', nativeName: 'Türkçe' }
  ];

  const handleSelectLanguage = (lang: Language) => {
    setWhiteLabel(prev => ({ ...prev, lang }));
    soundAndSpeech.playSuccessChime();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-[#121217] border-2 border-[#d4af37] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Modal Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-[#181820]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-sm sm:text-base font-extrabold text-[#d4af37]">
              🔍 راهنمای جامع، سرچ هوشمند و تنظیمات زبان اکوسیستم
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-[#101014] border-b border-zinc-800 text-xs">
          <button
            onClick={() => setActiveGuideTab('search')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeGuideTab === 'search'
                ? 'bg-[#d4af37] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>سرچ و فیلتر هوشمند</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('guide')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeGuideTab === 'guide'
                ? 'bg-[#d4af37] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>نقشه راهنمای گام‌به‌گام</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('language')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeGuideTab === 'language'
                ? 'bg-[#d4af37] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>زبان‌های ۵ گانه</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* SEARCH TAB */}
          {activeGuideTab === 'search' && (
            <div className="space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#d4af37] absolute right-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="جستجو در تمام فصل‌ها (مثلاً: تنبلی چشم، ACWR، لوردوز، تستوسترون، WADA...)"
                  className="w-full bg-black border border-zinc-700 focus:border-[#d4af37] text-white pr-10 pl-4 py-2.5 rounded-xl text-xs outline-none transition-colors"
                />
              </div>

              {/* Category Audience Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-zinc-400 font-semibold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>فیلتر گروه‌های هدف:</span>
                </label>

                <div className="flex flex-wrap gap-1.5 text-xs">
                  <button
                    onClick={() => setAudienceFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      audienceFilter === 'all'
                        ? 'bg-[#d4af37] text-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    همه موارد ({SEARCH_DATABASE.length})
                  </button>

                  <button
                    onClick={() => setAudienceFilter('coaches')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                      audienceFilter === 'coaches'
                        ? 'bg-amber-400 text-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>ویژه مربیان</span>
                  </button>

                  <button
                    onClick={() => setAudienceFilter('parents')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                      audienceFilter === 'parents'
                        ? 'bg-cyan-400 text-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>ویژه والدین و دانش‌آموزان</span>
                  </button>

                  <button
                    onClick={() => setAudienceFilter('athletes')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                      audienceFilter === 'athletes'
                        ? 'bg-emerald-400 text-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>ویژه ورزشکاران</span>
                  </button>
                </div>
              </div>

              {/* Results List */}
              <div className="space-y-2 pt-2">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 text-xs">
                    موردی منطبق با عبارت متنی یا فیلتر شما یافت نشد.
                  </div>
                ) : (
                  filteredItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        soundAndSpeech.playTick();
                        onClose();
                      }}
                      className="w-full text-right p-3 rounded-xl bg-[#181820] hover:bg-zinc-800 border border-zinc-800 hover:border-[#d4af37] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded border border-[#d4af37]/40 font-bold">
                            {item.seasonFa}
                          </span>
                          <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-semibold">
                            {item.categoryFa}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-zinc-200 group-hover:text-[#d4af37] transition-colors">
                          {item.titleFa}
                        </h4>
                      </div>

                      <ChevronLeft className="w-4 h-4 text-zinc-500 group-hover:text-[#d4af37] shrink-0" />
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* GUIDE TAB */}
          {activeGuideTab === 'guide' && (
            <div className="space-y-4 text-xs leading-relaxed text-zinc-300">
              <div className="bg-[#181820] border border-[#d4af37]/30 p-4 rounded-xl space-y-2">
                <h3 className="font-extrabold text-[#d4af37] text-sm flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>راهنمای کلی استفاده و نقشه راهنمای گام‌به‌گام برنامه</span>
                </h3>
                <p className="text-zinc-400 text-[11px]">
                  برنامه بر اساس معماری فصول چهارگانه و متد اس‌ئی امیری طوری طراحی شده تا نیاز مربیان، خانواده‌ها و ورزشکاران را پوشش دهد:
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
                  <h4 className="font-bold text-amber-300 mb-1">🏛️ فصل ۱: وایت‌لیبل و برندینگ باشگاه</h4>
                  <p className="text-zinc-400 text-[11px]">
                    برای مربیان و مدیران: نام باشگاه، لوگو، مربی ارشد و رنگ تم خود را تنظیم کنید تا کل برنامه به پلتفرم اختصاصی شما تبدیل شود.
                  </p>
                </div>

                <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
                  <h4 className="font-bold text-amber-300 mb-1">🧬 فصل ۲: علوم پایه، بیوشیمی، WADA و آسیب‌شناسی</h4>
                  <p className="text-zinc-400 text-[11px]">
                    شامل آنالیز هورمون‌ها، سوگندنامه پاکی WADA، اهرم‌های بیومکانیک و پروتکل ۴ مرحله‌ای بازگشت به پد در آسیب‌های ACL و کتف.
                  </p>
                </div>

                <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
                  <h4 className="font-bold text-amber-300 mb-1">⚡ فصل ۳: تغذیه، پیریودیزاسیون، دائرةالمعارف و شبیه‌ساز ACWR</h4>
                  <p className="text-zinc-400 text-[11px]">
                    شامل دیتابیس ۱۶ حرکت استاندارد، گام‌های خرد ADHD، تایمر بین ست‌ها و محاسبات آنی بار حاد به مزمن برای جلوگیری از تمرین‌زدگی.
                  </p>
                </div>

                <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
                  <h4 className="font-bold text-amber-300 mb-1">👑 فصل ۴: عضلات پنهان، پرزنت، کلینیک سلامت قامت و چشم کودکان</h4>
                  <p className="text-zinc-400 text-[11px]">
                    شامل پرزنت حضوری در باشگاه‌های تهران، فیزیوتراپی تنفسی، کلینیک قامت دانش‌آموزان (تست دیوار)، تست بینایی کودکان و خروجی ریلیز اندروید.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* LANGUAGE TAB */}
          {activeGuideTab === 'language' && (
            <div className="space-y-4">
              <div className="bg-[#181820] border border-[#d4af37]/30 p-4 rounded-xl space-y-2">
                <h3 className="font-extrabold text-[#d4af37] text-sm flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>انتخاب زبان رسمی اپلیکیشن (پشتیبانی از زبان‌های ۵ گانه)</span>
                </h3>
                <p className="text-zinc-400 text-[11px]">
                  زبان مورد نظر خود را جهت نمایش عناوین و کارکرد پلتفرم انتخاب کنید:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {languagesList.map(lang => {
                  const isSelected = whiteLabel.lang === lang.id;
                  return (
                    <button
                      key={lang.id}
                      onClick={() => handleSelectLanguage(lang.id)}
                      className={`p-3.5 rounded-xl border text-right transition-all flex items-center justify-between active:scale-[0.98] ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-extrabold border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                          : 'bg-[#181820] hover:bg-zinc-800 border-zinc-800 text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="text-xs font-bold">{lang.nameFa}</div>
                          <div className={`text-[10px] ${isSelected ? 'text-black/80 font-medium' : 'text-zinc-400'}`}>
                            {lang.nativeName}
                          </div>
                        </div>
                      </div>

                      {isSelected && <CheckCircle2 className="w-5 h-5 text-black shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
