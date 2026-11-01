import React, { useState } from 'react';
import { BookOpen, Award, FileText, Send, Sparkles, Filter, ThumbsUp, Clock, UserCheck, ShieldCheck, Check, AlertCircle, ChevronLeft } from 'lucide-react';
import { JournalArticle, UserProfile } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface SportsJournalAndBlogProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const INITIAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    titleFa: 'بررسی مسئولیت مدنی مربیان در حوادث ورزشی و نحوه تنظیم قراردادهای رسمی',
    authorNameFa: 'دکتر علیرضا رستمی',
    authorRoleFa: 'حقوقدان رسمی ورزش و وکیل پایه یک دادگستری',
    categoryFa: 'حقوق ورزشی',
    abstractFa: 'تحلیلی بر بندهای حیاتی در قراردادهای مربیگری، بیمه مسئولیت مدنی باشگاه‌ها و تعهدات قانونی در قبال آسیب‌های احتمالی ورزشکاران.',
    contentParagraphsFa: [
      'مربیان ورزشی طبق قوانین جاری کشور مسئول حفظ ایمنی تجهیزات و اجرای پروتکل‌های گرم کردن و حرکات اصلاحی هستند. در صورت بروز هرگونه مصدومیت شدید نظیر پارگی تاندون یا افتادگی وزنه، دادگاه‌های تخصصی ورزش قصور یا عدم قصور مربی را بر اساس تعاریف استاندارد بررسی می‌کنند.',
      'یکی از نکات کلیدی، اخذ رضایت‌نامه آگاهانه و فرم چک‌لیست سلامت از ورزشکار پیش از شروع برنامه‌های سنگین هایپرتروفی یا توانبخشی است. عدم وجود فرم غربالگری سلامت می‌تواند مربی را در معرض جریمه‌های سنگین دیه قرار دهد.',
      'توصیه حقوقی: حتماً در بند ۳ قرارداد مربیگری، حدود مسئولیت‌های فنی مربی و تعهدات باشگاه در قبال ایمنی دستگاه‌ها به طور صریح تفکیک و امضا گردد.'
    ],
    publishDate: '۱۴۰۵/۰۸/۱۰',
    readTimeMinutes: 6,
    likesCount: 240,
    tagsFa: ['حقوق ورزشی', 'قرارداد مربیگری', 'بیمه ورزشی', 'مسئولیت مدنی'],
    isVerifiedByEditor: true
  },
  {
    id: 'art-2',
    titleFa: 'مدیریت برنامه حرفه‌ای فوتبالیست‌ها، لژیونرها و مشاهیر ورزشی در مسیر ترانسفر بین‌المللی',
    authorNameFa: 'مهندس کیوان رحیمی',
    authorRoleFa: 'مدیر برنامه رسمی فیفا و ایجنت مشاهیر ورزشی',
    categoryFa: 'مدیریت برنامه و ایجنسی ورزشکاران',
    abstractFa: 'راهنمای جامع مدیریت برند شخصی، مذاکره قراردادهای اسپانسرینگ، ترانسفر لژیونرها و حفاظت از حقوق مالی و تصویر چهره قهرمانان.',
    contentParagraphsFa: [
      'مدیریت برنامه (Sports Management) تنها به انتقال فوتبالیست بین دو باشگاه محدود نمی‌شود، بلکه شامل برندینگ شخصی، تبلیغات محیطی، مدیریت بحران رسانه‌ای و سرمایه‌گذاری امن درآمد ورزشی است.',
      'یک مدیر برنامه حرفه‌ای باید پیش از امضای قراردادهای ترانسفر، بندهای فسخ یک‌طرفه، پاداش‌های گل‌زنی، کلین‌شیت و حق تصویر (Image Rights) را با وکلای ورزشی هماهنگ کند تا آینده حرفه‌ای ورزشکار تضمین شود.',
      'توصیه به قهرمانان: همکاری با مدیران برنامه شناسنامه‌دار و رسمی باعث آزاد شدن ذهن تمرکزی ورزشکار جهت درخشش ۱۰۰٪ در زمین مسابقه خواهد شد.'
    ],
    publishDate: '۱۴۰۵/۰۸/۰۹',
    readTimeMinutes: 7,
    likesCount: 420,
    tagsFa: ['مدیریت برنامه', 'ایجنت فوتبالیست', 'ترانسفر', 'برندینگ چهره'],
    isVerifiedByEditor: true
  },
  {
    id: 'art-3',
    titleFa: 'استراتژی‌های نوین دوره بارگیری کربوهیدرات و رژیم‌های کتوژنیک هدفمند در ورزشکاران حرفه‌ای',
    authorNameFa: 'دکتر سارا حسینی',
    authorRoleFa: 'متخصص تغذیه ورزشی و عضو انجمن رژیم‌شناسان ایران',
    categoryFa: 'تغذیه تخصصی و رژیم‌شناسی',
    abstractFa: 'ارزیابی علمی مکمل‌های پروتئینی، زمان‌بندی مصرف درشت‌مغذی‌ها و تنظیم رژیم اختصاصی بر اساس تست آنالیز InBody.',
    contentParagraphsFa: [
      'زمان‌بندی تغذیه (Nutrient Timing) نقشی کلیدی در بازسازی ذخایر گلیکوژن کبد و عضله بازی می‌کند. مصرف نسبت ۴ به ۱ کربوهیدرات به پروتئین در ۴۵ دقیقه اولیه پس از تمرین، سرعت ریکاوری را تا ۲ برابر افزایش می‌دهد.',
      'متخصصان تغذیه ورزشی با تنظیم دقیق نسبت درشت‌مغذی‌ها و ریزمغذی‌ها (روی، منیزیم، ویتامین D3) از افت سیستم ایمنی و سندرم بیش‌تمرینی در فصول مسابقات جلوگیری می‌کنند.',
      'توصیه رژیم‌شناس: تنظیم برنامه غذایی باید کاملاً فردی‌سازی شده و بر اساس ارزیابی درصد چربی، حجم عضلانی اسکلتی و متابولیسم پایه (BMR) صورت گیرد.'
    ],
    publishDate: '۱۴۰۵/۰۸/۰۷',
    readTimeMinutes: 6,
    likesCount: 395,
    tagsFa: ['تغذیه ورزشی', 'رژیم غذایی', 'InBody', 'گلیکوژن', 'ریکاوری'],
    isVerifiedByEditor: true
  },
  {
    id: 'art-4',
    titleFa: 'نقش تمرینات هوازدگی و مقاومتی در بازسازی گیرنده‌های دوپامین بیماران در حال ترک اعتیاد',
    authorNameFa: 'استاد سیاوش علیمیری (اس‌ئی امیری)',
    authorRoleFa: 'مربی ارشد و طراح متدولوژی ورزش‌درمانی',
    categoryFa: 'تمرینات ترک اعتیاد',
    abstractFa: 'پروتکل کاربردی ورزش‌درمانی برای بازگرداندن تراز طبیعی اندورفین و دوپامین در عضلات افراد پاک‌شده از مواد مخدر.',
    contentParagraphsFa: [
      'اعتیاد به مواد افیونی یا محرک، سیستم پاداش مغز و گیرنده‌های D2 دوپامین را سرکوب می‌کند. یکی از سریع‌ترین راه‌های بازگرداندن نشاط طبیعی و جلوگیری از لغزش مجدد، اجرای سیستماتیک ورزش هوازدگی تناوبی (HIIT ملایم) و تمرینات قدرتی دایره‌ای است.',
      'ورزش باعث ترشح فاکتور رشد عصبی BDNF در مغز شده و به بازسازی الیاف عصبی کمک شایانی می‌کند. در این مقاله پروتکل ۴ هفته‌ای شروع حرکت بدون ایجاد فشار سنگین به قلب و مفاصل ارائه گردیده است.',
      'توصیه مربی: در ۳ ماه اول پاکی، تمرکز اصلی باید روی استقامت قلبی-عروقی و تمرینات گروهی مفرخ باشد تا ذهن ورزشکار از افکار منفی تخلیه شود.'
    ],
    publishDate: '۱۴۰۵/۰۸/۰۵',
    readTimeMinutes: 8,
    likesCount: 512,
    tagsFa: ['ترک اعتیاد', 'ورزش درمانی', 'دوپامین', 'BDNF', 'تمرینات هوازدگی'],
    isVerifiedByEditor: true
  }
];

export const SportsJournalAndBlog: React.FC<SportsJournalAndBlogProps> = ({
  userProfile,
  setUserProfile
}) => {
  const [articles, setArticles] = useState<JournalArticle[]>(INITIAL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  // Form states for submitting new article
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthorName, setNewAuthorName] = useState(userProfile.fullName || '');
  const [newAuthorRole, setNewAuthorRole] = useState('روانشناس ورزشی / حقوقدان / متخصص تغذیه / مدیر برنامه');
  const [newCategory, setNewCategory] = useState<'روانشناسی ورزشی' | 'حقوق ورزشی' | 'تمرینات ترک اعتیاد' | 'تغذیه تخصصی و رژیم‌شناسی' | 'مدیریت برنامه و ایجنسی ورزشکاران' | 'آسیب‌شناسی و بیومکانیک'>('حقوق ورزشی');
  const [newAbstract, setNewAbstract] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = ['همه', 'حقوق ورزشی', 'مدیریت برنامه و ایجنسی ورزشکاران', 'تغذیه تخصصی و رژیم‌شناسی', 'تمرینات ترک اعتیاد', 'روانشناسی ورزشی', 'آسیب‌شناسی و بیومکانیک'];

  const filteredArticles = selectedCategory === 'همه'
    ? articles
    : articles.filter(a => a.categoryFa === selectedCategory);

  const handleSubmitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAbstract || !newContent) return;

    const newArt: JournalArticle = {
      id: `art-${Date.now()}`,
      titleFa: newTitle,
      authorNameFa: newAuthorName || 'استاد محقق',
      authorRoleFa: newAuthorRole,
      categoryFa: newCategory,
      abstractFa: newAbstract,
      contentParagraphsFa: newContent.split('\n').filter(p => p.trim().length > 0),
      publishDate: new Date().toLocaleDateString('fa-IR'),
      readTimeMinutes: Math.max(3, Math.ceil(newContent.length / 300)),
      likesCount: 1,
      tagsFa: newTags ? newTags.split(',').map(t => t.trim()) : ['مقاله علمی', newCategory],
      isVerifiedByEditor: true
    };

    setArticles([newArt, ...articles]);
    setSubmitSuccess(true);
    soundAndSpeech.playSuccessChime();

    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setNewTitle('');
      setNewAbstract('');
      setNewContent('');
      setNewTags('');
    }, 1500);
  };

  const handleLike = (artId: string) => {
    setArticles(prev =>
      prev.map(a => (a.id === artId ? { ...a, likesCount: a.likesCount + 1 } : a))
    );
    soundAndSpeech.playTick();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#1c1808] via-[#121217] to-[#09090b] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] mb-2">
              <BookOpen className="w-4 h-4" />
              <span>نبض علمی اکوسیستم توانا - مجله تخصصی داوری‌شده</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              مجله و وبلاگ رسمی علوم ورزشی، حقوق ورزشی و روانشناسی
            </h2>
            <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              بستر انتشار مقالات علمی مربیان، روانشناسان ورزشی، حقوقدانان رسمی و متخصصان ترک اعتیاد جهت ارتقای دانش جامعه ورزشی کشور.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold px-5 py-3 rounded-2xl text-xs transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] shrink-0 w-full md:w-auto justify-center"
          >
            <Send className="w-4 h-4" />
            <span>ارسال مقاله علمی جدید</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map(art => (
          <div
            key={art.id}
            className="bg-[#121217] border border-zinc-800 hover:border-[#d4af37]/60 rounded-2xl p-5 transition-all shadow-lg flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] px-2.5 py-0.5 rounded-full font-bold">
                  {art.categoryFa}
                </span>
                <span className="text-zinc-500 font-mono">{art.publishDate}</span>
              </div>

              <h3 className="text-sm font-extrabold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                {art.titleFa}
              </h3>

              <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{art.authorNameFa}</span>
                <span className="text-zinc-500 text-[10px]">({art.authorRoleFa})</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                {art.abstractFa}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{art.readTimeMinutes} دقیقه مطالعه</span>
                </span>
                <button
                  onClick={() => handleLike(art.id)}
                  className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-bold"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{art.likesCount}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setActiveArticle(art);
                  soundAndSpeech.playTick();
                }}
                className="flex items-center gap-1 text-[#d4af37] font-bold hover:underline"
              >
                <span>مطالعه مقاله کامل</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#121217] border-2 border-[#d4af37] rounded-3xl w-full max-w-2xl max-h-[85vh] p-6 overflow-y-auto space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 left-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2 rounded-full"
            >
              ✕
            </button>

            <div className="space-y-2 border-b border-zinc-800 pb-4">
              <span className="bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] px-3 py-1 rounded-full text-xs font-bold">
                {activeArticle.categoryFa}
              </span>

              <h2 className="text-lg font-extrabold text-white leading-snug">
                {activeArticle.titleFa}
              </h2>

              <div className="flex items-center gap-2 text-xs text-amber-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>نویسنده: <strong>{activeArticle.authorNameFa}</strong></span>
                <span>• {activeArticle.authorRoleFa}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-200 leading-relaxed">
              {activeArticle.contentParagraphsFa.map((p, idx) => (
                <p key={idx} className="bg-[#181820] p-3.5 rounded-xl border border-zinc-800/80">
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1.5">
                {activeArticle.tagsFa.map((t, idx) => (
                  <span key={idx} className="bg-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded text-[10px]">
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleLike(activeArticle.id)}
                className="flex items-center gap-1.5 bg-rose-950/40 border border-rose-500/50 text-rose-300 px-3 py-1.5 rounded-xl font-bold"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>پسندیدن مقاله ({activeArticle.likesCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#121217] border-2 border-[#d4af37] rounded-3xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 left-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2 rounded-full"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-white flex items-center justify-center gap-2">
                <FileText className="w-5 h-5 text-[#d4af37]" />
                <span>ارسال مقاله برای هیئت تحریریه مجله توانا</span>
              </h3>
              <p className="text-xs text-zinc-400">
                ویژه روانشناسان ورزشی، حقوقدانان، مربیان ترک اعتیاد و متخصصان بیومکانیک
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-950/40 border border-emerald-500 text-emerald-300 p-4 rounded-xl text-center text-xs font-bold space-y-2">
                <Check className="w-6 h-6 mx-auto text-emerald-400" />
                <span>مقاله شما با موفقیت برای هیئت تحریریه ارسال شد و پس از بررسی منتشر خواهد شد!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitArticle} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">عنوان مقاله علمی:</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="مثال: حقوق ورزشی در قراردادهای باشگاهی..."
                    className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-zinc-400 mb-1">نام نویسنده:</label>
                    <input
                      type="text"
                      value={newAuthorName}
                      onChange={e => setNewAuthorName(e.target.value)}
                      className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">دسته‌بندی تخصصی:</label>
                    <select
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value as any)}
                      className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none"
                    >
                      <option value="حقوق ورزشی">حقوق ورزشی</option>
                      <option value="مدیریت برنامه و ایجنسی ورزشکاران">مدیریت برنامه و ایجنسی ورزشکاران</option>
                      <option value="تغذیه تخصصی و رژیم‌شناسی">تغذیه تخصصی و رژیم‌شناسی</option>
                      <option value="تمرینات ترک اعتیاد">تمرینات ترک اعتیاد</option>
                      <option value="روانشناسی ورزشی">روانشناسی ورزشی</option>
                      <option value="آسیب‌شناسی و بیومکانیک">آسیب‌شناسی و بیومکانیک</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">چکیده مقاله (خلاصه کوتاه):</label>
                  <textarea
                    rows={2}
                    required
                    value={newAbstract}
                    onChange={e => setNewAbstract(e.target.value)}
                    placeholder="خلاصه‌ای از اهداف و دستاوردهای مقاله..."
                    className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">متن کامل مقاله (هر پاراگراف در یک خط):</label>
                  <textarea
                    rows={4}
                    required
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    placeholder="متن اصلی مقاله علمی..."
                    className="w-full bg-[#181820] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d4af37] text-black font-extrabold py-2.5 rounded-xl shadow-md hover:bg-[#e5c158] transition-all"
                >
                  ثبت نهایی مقاله
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
