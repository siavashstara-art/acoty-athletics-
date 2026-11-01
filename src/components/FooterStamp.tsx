import React from 'react';
import { Shield, Smartphone, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const FooterStamp: React.FC = () => {
  const portfolioItems = [
    { name: 'فرش بازار', desc: 'مارکت‌پلیس تخصصی فرش دستباف و ماشینی' },
    { name: 'طلایار', desc: 'سامانه هوشمند تحلیل بازار طلا، جواهرات و صندوق‌های سرمایه‌گذاری طلا' },
    { name: 'لینگوی', desc: 'پلتفرم هوشمند یادگیری زبان‌های زنده دنیا' },
    { name: 'تی‌دیپلوی (TDeploy)', desc: 'موتور استقرار و اتوماسیون برنامه‌ها در موبایل و سرور' },
    { name: 'توانا پلتفرم', desc: 'بستر جامع مدیریت کسب‌وکارهای مدرن متاورسی' },
    { name: 'دکورمیت', desc: 'سامانه طراحی دکوراسیون و شبیه‌سازی معماری' },
    { name: 'سالونیار', desc: 'اتوماسیون تخصصی مدیریت سالن‌های زیبایی و نوبت‌دهی' },
    { name: 'کلینیکیار', desc: 'سامانه جامع پرونده‌های پزشکی و مدیریت مطب' },
    { name: 'خدمات‌یار', desc: 'موتور انحصاری خدمات با متدولوژی اس‌ئی امیری' },
    { name: 'شطرنج هم‌جهان', desc: 'بازی هوشمند شطرنج متاورسی چندبعدی' },
    { name: 'ابزارهای توسعه‌دهندگان', desc: 'کیت‌های کاربری ترموکس، اکود و ترمیوس در اندروید' }
  ];

  return (
    <footer className="mt-16 bg-[#07070a] border-t border-[#d4af37]/30 text-zinc-400 text-xs">
      {/* Upper Footer: Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-[#d4af37] font-bold text-sm">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span>پورتفوی جامع پروژه‌های اکوسیستم توانا سیتی (جهان ایبل سیتی)</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              طراحی و توسعه یافته بر بستر موبایل (Redmi Note 8 اندروید ۱۱) با ترموکس، ترمیوس و اکود
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-lg text-amber-300">
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>پروتکل اتوماسیون امن موبایل و کلیدهای آماده</span>
          </div>
        </div>

        {/* Portfolio List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-6">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#121217] border border-zinc-800/80 hover:border-[#d4af37]/50 rounded-xl p-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(212,175,55,0.08)] group"
            >
              <div className="font-semibold text-zinc-200 group-hover:text-[#d4af37] flex items-center justify-between text-xs">
                <span>{item.name}</span>
                <Sparkles className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-[#d4af37] transition-opacity" />
              </div>
              <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Footer Legal Stamp according to Directive 7 */}
      <div className="bg-[#050507] border-t border-zinc-900 py-6 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-zinc-300 text-xs md:text-sm font-semibold leading-relaxed">
            «تمام حقوق مادی و معنوی این اثر متعلق است به آقای اکبر علیمیری (معروف به سیاوش / توسعه‌دهنده).»
          </p>
          <p className="text-zinc-400 text-[11px] flex items-center justify-center gap-1.5 flex-wrap">
            <span>اکوسیستم آفرینش آفرینا شهر جدید نیو متاورسی جهان ایبل سیتی (توانا سیتی)</span>
            <span>·</span>
            <span>طراحی انحصاری استودیو آریا گلد (Black & Gold Aesthetix)</span>
            <span>·</span>
            <span className="text-[#d4af37]">نسخه آماده انتشار کافه بازار و مایکت</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
