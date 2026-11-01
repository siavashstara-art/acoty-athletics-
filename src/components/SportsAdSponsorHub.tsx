import React, { useState } from 'react';
import { Megaphone, DollarSign, Award, Building2, Dumbbell, ShieldCheck, Check, Sparkles, Send, PhoneCall, ExternalLink, Calculator } from 'lucide-react';
import { AdCampaignSponsor, UserProfile } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface SportsAdSponsorHubProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const INITIAL_SPONSORS: AdCampaignSponsor[] = [
  {
    id: 'sp-1',
    sponsorNameFa: 'مجموعه ورزشی اکسیژن الهیه',
    categoryFa: 'باشگاه و آکادمی ورزشی',
    logoOrBannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80',
    headlineFa: 'مجهزترین آکادمی بدنسازی شمال تهران با دستگاه‌های المپیکی ۲۰۲۶',
    descriptionFa: 'ثبت‌نام سانس‌های اختصاصی آقایان و بانوان به همراه آنالیز ترکیب بدن InBody و برنامه تخصصی وایت‌لیبل.',
    contactPhone: '021-22001122',
    websiteUrl: 'https://oxygen.tavana',
    adPlacement: 'بنر اصلی (Hero)',
    discountCode: 'OXYGEN-TAVANA20',
    isFeatured: true
  },
  {
    id: 'sp-2',
    sponsorNameFa: 'ایجنسی مدیریت برنامه و ترانسفر لژیونرها (Tavana Sports Management)',
    categoryFa: 'مدیریت برنامه و ایجنسی ورزشکاران',
    logoOrBannerUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80',
    headlineFa: 'مدیریت حرفه‌ای برنامه، برندینگ شخصی و ترانسفر بین‌المللی فوتبالیست‌ها و مشاهیر',
    descriptionFa: 'تنظیم قراردادهای فیفا، مدیریت اسپانسرینگ، حفظ حقوق تصویر چهره و برنامه‌ریزی جامع مالی ورزشکاران.',
    contactPhone: '021-88990011',
    websiteUrl: 'https://agent.tavana',
    adPlacement: 'بنر اصلی (Hero)',
    discountCode: 'AGENT-VIP',
    isFeatured: true
  },
  {
    id: 'sp-3',
    sponsorNameFa: 'کلینیک تخصصی تغذیه ورزشی و آنالیز InBody دکتر حسینی',
    categoryFa: 'کلینیک تغذیه ورزشی',
    logoOrBannerUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&auto=format&fit=crop&q=80',
    headlineFa: 'تنظیم رژیم‌های علمی افزایش حجم خشک عضلانی و کاهش چربی بدون افت توان',
    descriptionFa: 'برنامه‌ریزی تغذیه دوره مسابقه، بارگیری کربوهیدرات و پاک‌سازی کبد با تاییدیه نظام پزشکی.',
    contactPhone: '021-44556677',
    websiteUrl: 'https://nutrition.tavana',
    adPlacement: 'کارت اختصاصی اسپانسر',
    discountCode: 'DIET-GOLD',
    isFeatured: true
  },
  {
    id: 'sp-4',
    sponsorNameFa: 'تجهیزات بدنسازی آریا اسپرت (تولید ملی)',
    categoryFa: 'تجهیزات بدنسازی',
    logoOrBannerUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&auto=format&fit=crop&q=80',
    headlineFa: 'طراحی و ساخت سازه‌های کراس‌فیت و دستگاه‌های سیم‌کش با استاندارد جهانی',
    descriptionFa: 'گارانتی ۵ ساله بی‌قیدوشرط شاسی و کابل‌های فولادی جهت تجهیز باشگاه‌های سراسر کشور.',
    contactPhone: '09123334455',
    websiteUrl: 'https://ariasport.tavana',
    adPlacement: 'کارت اختصاصی اسپانسر',
    discountCode: 'ARIA-GOLD10',
    isFeatured: true
  }
];

export const SportsAdSponsorHub: React.FC<SportsAdSponsorHubProps> = ({
  userProfile,
  setUserProfile
}) => {
  const [sponsors, setSponsors] = useState<AdCampaignSponsor[]>(INITIAL_SPONSORS);
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');

  // Ad calculator states
  const [calcPlacement, setCalcPlacement] = useState<'بنر اصلی (Hero)' | 'بنر مجله علمی' | 'کارت اختصاصی اسپانسر' | 'واترمارک پرزنت'>('بنر اصلی (Hero)');
  const [calcDurationMonths, setCalcDurationMonths] = useState<number>(1);

  // Campaign Form Modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [category, setCategory] = useState<'باشگاه و آکادمی ورزشی' | 'تجهیزات بدنسازی' | 'مکمل‌های ورزشی' | 'کلینیک ترک اعتیاد ورزشی' | 'مشاوره حقوقی و روانشناسی' | 'کلینیک تغذیه ورزشی' | 'مدیریت برنامه و ایجنسی ورزشکاران'>('باشگاه و آکادمی ورزشی');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [discount, setDiscount] = useState('');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  const categories = ['همه', 'باشگاه و آکادمی ورزشی', 'مدیریت برنامه و ایجنسی ورزشکاران', 'کلینیک تغذیه ورزشی', 'تجهیزات بدنسازی', 'مکمل‌های ورزشی', 'کلینیک ترک اعتیاد ورزشی', 'مشاوره حقوقی و روانشناسی'];

  const filteredSponsors = selectedCategory === 'همه'
    ? sponsors
    : sponsors.filter(s => s.categoryFa === selectedCategory);

  // Price calculator logic
  const baseMonthlyRates = {
    'بنر اصلی (Hero)': 5000000,
    'بنر مجله علمی': 3500000,
    'کارت اختصاصی اسپانسر': 2500000,
    'واترمارک پرزنت': 4000000
  };

  const calculatedPriceToman = baseMonthlyRates[calcPlacement] * calcDurationMonths;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorName || !headline || !phone) return;

    const newAd: AdCampaignSponsor = {
      id: `sp-${Date.now()}`,
      sponsorNameFa: sponsorName,
      categoryFa: category,
      logoOrBannerUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80',
      headlineFa: headline,
      descriptionFa: description,
      contactPhone: phone,
      websiteUrl: website || 'https://tavanasports.ir',
      adPlacement: calcPlacement,
      discountCode: discount || undefined,
      isFeatured: true
    };

    setSponsors([newAd, ...sponsors]);
    setIsOrderSubmitted(true);
    soundAndSpeech.playSuccessChime();

    setTimeout(() => {
      setIsOrderSubmitted(false);
      setShowFormModal(false);
      setSponsorName('');
      setHeadline('');
      setDescription('');
      setPhone('');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#1e1308] via-[#121217] to-[#09090b] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] mb-2">
              <Megaphone className="w-4 h-4 text-[#d4af37]" />
              <span>نبض اقتصادی و مرکز تبلیغات تخصصی اکوسیستم توانا</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              مرکز جذب اسپانسرینگ، تبلیغات آکادمی‌ها و تجهیزات ورزشی
            </h2>
            <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              پلتفرم پذیرش بنرهای تبلیغاتی باشگاه‌های ورزشی، تولیدکنندگان تجهیزات، برندهای مکمل، کلینیک‌های ترک اعتیاد ورزشی، حقوقدانان و روانشناسان ورزشی.
            </p>
          </div>

          <button
            onClick={() => setShowFormModal(true)}
            className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold px-5 py-3 rounded-2xl text-xs transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] shrink-0 w-full md:w-auto justify-center"
          >
            <DollarSign className="w-4 h-4" />
            <span>ثبت کمپین تبلیغاتی جدید</span>
          </button>
        </div>
      </div>

      {/* Ad Price Calculator Tool */}
      <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-[#d4af37] flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>محاسبه‌گر هوشمند تعرفه تبلیغات و اسپانسرینگ:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-zinc-400 mb-1">موقعیت بنر تبلیغاتی:</label>
            <select
              value={calcPlacement}
              onChange={e => setCalcPlacement(e.target.value as any)}
              className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none"
            >
              <option value="بنر اصلی (Hero)">بنر اصلی صفحه اول (Hero)</option>
              <option value="بنر مجله علمی">بنر ویژه مجله و مقاله علمی</option>
              <option value="کارت اختصاصی اسپانسر">کارت اسپانسرینگ ویژه</option>
              <option value="واترمارک پرزنت">واترمارک پرزنت در باشگاه‌ها</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">مدت زمان نمایش (ماه):</label>
            <select
              value={calcDurationMonths}
              onChange={e => setCalcDurationMonths(Number(e.target.value))}
              className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none"
            >
              <option value={1}>۱ ماهه (تعرفه عادی)</option>
              <option value={3}>۳ ماهه (۱۰٪ تخفیف ویژه)</option>
              <option value={6}>۶ ماهه (۲۰٪ تخفیف ویژه)</option>
              <option value={12}>۱۲ ماهه (۳۰٪ تخفیف طلایی)</option>
            </select>
          </div>

          <div className="bg-[#181820] border border-[#d4af37]/40 p-3 rounded-xl flex flex-col justify-center text-center">
            <span className="text-[10px] text-zinc-400">هزینه کل کمپین:</span>
            <span className="text-base font-extrabold text-[#d4af37] font-mono">
              {calculatedPriceToman.toLocaleString('fa-IR')} تومان
            </span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#d4af37] text-black shadow-md'
                : 'bg-[#181820] text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sponsors Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSponsors.map(sp => (
          <div
            key={sp.id}
            className="bg-[#121217] border border-zinc-800 hover:border-[#d4af37]/60 rounded-2xl p-5 transition-all shadow-xl flex flex-col justify-between space-y-4 group relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="h-32 rounded-xl overflow-hidden relative">
                <img
                  src={sp.logoOrBannerUrl}
                  alt={sp.sponsorNameFa}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/50 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {sp.categoryFa}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-white group-hover:text-[#d4af37] transition-colors">
                  {sp.sponsorNameFa}
                </h3>
                <p className="text-xs font-bold text-amber-300 mt-1 leading-snug">
                  {sp.headlineFa}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                {sp.descriptionFa}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800 space-y-2 text-xs">
              {sp.discountCode && (
                <div className="bg-[#181820] border border-amber-500/30 p-2 rounded-lg text-[11px] text-amber-300 flex items-center justify-between">
                  <span>کد تخفیف اختصاصی:</span>
                  <span className="font-mono font-bold">{sp.discountCode}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-zinc-300">
                <a
                  href={`tel:${sp.contactPhone}`}
                  className="flex items-center gap-1 text-emerald-400 font-bold hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span dir="ltr">{sp.contactPhone}</span>
                </a>

                <a
                  href={sp.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#d4af37] font-bold hover:underline"
                >
                  <span>مشاهده وب‌سایت</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#121217] border-2 border-[#d4af37] rounded-3xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 left-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2 rounded-full"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-white flex items-center justify-center gap-2">
                <Megaphone className="w-5 h-5 text-[#d4af37]" />
                <span>فرم سفارش بنر تبلیغاتی و اسپانسرینگ</span>
              </h3>
              <p className="text-xs text-zinc-400">
                معرفی رسمی باشگاه، برند مکمل، شرکت تجهیزات یا خدمات حقوقی/روانشناسی
              </p>
            </div>

            {isOrderSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500 text-emerald-300 p-4 rounded-xl text-center text-xs font-bold space-y-2">
                <Check className="w-6 h-6 mx-auto text-emerald-400" />
                <span>سفارش تبلیغاتی شما ثبت گردید! همکاران واحد بازرگانی جهت تایید نهایی با شما تماس خواهند گرفت.</span>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">نام باشگاه / برند / شرکت:</label>
                  <input
                    type="text"
                    required
                    value={sponsorName}
                    onChange={e => setSponsorName(e.target.value)}
                    placeholder="مثال: آکادمی ورزشی اکسیژن..."
                    className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-zinc-400 mb-1">دسته‌بندی فعالیت:</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as any)}
                      className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none"
                    >
                      <option value="باشگاه و آکادمی ورزشی">باشگاه و آکادمی ورزشی</option>
                      <option value="مدیریت برنامه و ایجنسی ورزشکاران">مدیریت برنامه و ایجنسی ورزشکاران</option>
                      <option value="کلینیک تغذیه ورزشی">کلینیک تغذیه ورزشی</option>
                      <option value="تجهیزات بدنسازی">تجهیزات بدنسازی</option>
                      <option value="مکمل‌های ورزشی">مکمل‌های ورزشی</option>
                      <option value="کلینیک ترک اعتیاد ورزشی">کلینیک ترک اعتیاد ورزشی</option>
                      <option value="مشاوره حقوقی و روانشناسی">مشاوره حقوقی و روانشناسی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">شماره تماس مستقیم:</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="09121234567"
                      className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">تیتر جذاب بنر (Hook):</label>
                  <input
                    type="text"
                    required
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    placeholder="مثال: مجهزترین آکادمی بدنسازی شمال تهران..."
                    className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">توضیحات و خدمات ارائه شده:</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="توضیحات کامل خدمات..."
                    className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-zinc-400 mb-1">آدرس سایت یا اینستاگرام:</label>
                    <input
                      type="text"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      placeholder="https://gym.com"
                      className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none font-mono"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">کد تخفیف اختصاصی (اختیاری):</label>
                    <input
                      type="text"
                      value={discount}
                      onChange={e => setDiscount(e.target.value)}
                      placeholder="VIP2026"
                      className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="bg-[#181820] p-2.5 rounded-xl border border-zinc-800 text-center text-[11px] text-[#d4af37]">
                  مبلغ پیش‌فاکتور: <strong>{calculatedPriceToman.toLocaleString('fa-IR')} تومان</strong> ({calcPlacement})
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d4af37] text-black font-extrabold py-2.5 rounded-xl shadow-md hover:bg-[#e5c158] transition-all"
                >
                  ثبت نهایی سفارش تبلیغات
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
