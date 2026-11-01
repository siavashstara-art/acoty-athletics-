import React, { useState } from 'react';
import {
  Dna,
  ShieldAlert,
  AlertOctagon,
  HeartPulse,
  Sparkles,
  CheckCircle,
  Search,
  Volume2,
  VolumeX,
  Activity,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  Info,
  Flame,
  Check
} from 'lucide-react';
import { AdhdSettings, HormoneItem, UserProfile, WadaSubstanceItem } from '../types/index.ts';
import { HORMONES_DATA, WADA_PROHIBITED_LIST } from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface BiochemistryAndWadaProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onProceedNext?: () => void;
}

export const BiochemistryAndWada: React.FC<BiochemistryAndWadaProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile,
  onProceedNext
}) => {
  const [activeTab, setActiveTab] = useState<'hormones' | 'wada' | 'pledge'>('hormones');
  const [searchWada, setSearchWada] = useState('');
  const [selectedHormoneId, setSelectedHormoneId] = useState<string>(HORMONES_DATA[0].id);
  const [expandedWadaId, setExpandedWadaId] = useState<string | null>(WADA_PROHIBITED_LIST[0].id);
  const [hasSignedPledge, setHasSignedPledge] = useState(false);
  const [notification, setNotification] = useState('');

  const selectedHormone = HORMONES_DATA.find(h => h.id === selectedHormoneId) || HORMONES_DATA[0];

  const filteredWada = WADA_PROHIBITED_LIST.filter(item =>
    item.nameFa.toLowerCase().includes(searchWada.toLowerCase()) ||
    item.nameEn.toLowerCase().includes(searchWada.toLowerCase()) ||
    item.wadaClass.toLowerCase().includes(searchWada.toLowerCase()) ||
    item.wadaCode.toLowerCase().includes(searchWada.toLowerCase())
  );

  const handleSpeak = (text: string) => {
    soundAndSpeech.speakText(text);
  };

  const handleSaveModule2 = () => {
    soundAndSpeech.playSuccessChime();
    setNotification('✅ اسکریپت دوم (بیوشیمی غدد و مرجع WADA) با موفقیت در ایبل‌سیتی ثبت و ذخیره شد!');
    setTimeout(() => setNotification(''), 4000);
  };

  const handleSignCleanPledge = () => {
    if (hasSignedPledge) return;
    setHasSignedPledge(true);
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 250
    }));
    soundAndSpeech.playSuccessChime();
    setNotification('🌟 سوگندنامه ورزشکار پاک توانا با موفقیت امضا شد! ۲۵۰ امتیاز وفاداری طلایی به حساب شما واریز گردید.');
    setTimeout(() => setNotification(''), 5000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Visualizer Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
        <img
          src="/src/assets/images/biochem_wada_banner_1793535413381.jpg"
          alt="بیوشیمی هورمونی و آزمایشگاه آنتی‌دوپینگ WADA"
          className="w-full h-48 sm:h-64 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent flex flex-col justify-end p-5 sm:p-7">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/40 w-fit mb-2">
            <Dna className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span>اسکریپت ۲: بیوشیمی غدد، آندروژن‌ها و قوانین آژانس جهانی WADA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>بدنسازی علمی ایبل‌سیتی | فیزیولوژی پایدار و ورزش پاک</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            بدن انسان یک کارخانه عظیم بیوشیمیایی است. شناخت هورمون‌های آنابولیک طبیعی، خطوط قرمز آژانس جهانی مبارزه با دوپینگ (WADA) و ترویج قدرت اصیل بدون شوک‌های مخرب دارویی.
          </p>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="flex rounded-2xl bg-[#121217] p-1.5 border border-zinc-800 shadow-lg">
        <button
          onClick={() => {
            setActiveTab('hormones');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'hormones'
              ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Dna className="w-4 h-4" />
          <span>۱. بیوشیمی غدد و هورمون‌ها</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('wada');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'wada'
              ? 'bg-gradient-to-r from-rose-500 to-rose-700 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>۲. لیست سیاه WADA و خطرات دوپینگ</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('pledge');
            soundAndSpeech.playTick();
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'pledge'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-700 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>۳. منشور و سوگندنامه ورزش پاک</span>
        </button>
      </div>

      {/* Notifications */}
      {notification && (
        <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-semibold shadow-lg animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-emerald-400 hover:text-white">بستن</button>
        </div>
      )}

      {/* SECTION 1: ENDOCRINE BIOCHEMISTRY */}
      {activeTab === 'hormones' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Scientific intro callout */}
          <div className="bg-[#121217] border border-[#d4af37]/40 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>محور بیوشیمیایی هیپوتالاموس - هیپوفیز - بیضه/غدد فوق‌کلیوی (HPTA)</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              رشد عضلانی پایدار و عملکرد قهرمانی نتیجه هارمونی بین هورمون‌های آنابولیک (تستوسترون، سوماتوتروپین GH، فاکتور رشد IGF-1 و انسولین) با هورمون‌های کاتابولیک (کورتیزول) است. در متدولوژی خدمات‌جو (اس‌ئی امیری)، یاد می‌گیرید چگونه با خواب عمیق در تاریکی مطلق، بارافزایی تدریجی تمرینات و تغذیه میکرو‌مغذی‌ها، حداکثر ظرفیت ژنتیکی غدد را بیدار کنید.
            </p>
          </div>

          {/* Hormone Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {HORMONES_DATA.map(hormone => (
              <button
                key={hormone.id}
                onClick={() => {
                  setSelectedHormoneId(hormone.id);
                  soundAndSpeech.playTick();
                }}
                className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  selectedHormoneId === hormone.id
                    ? 'bg-[#1c1810] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]'
                    : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="text-[10px] text-amber-400 font-semibold">{hormone.category}</span>
                <span className="text-xs font-bold text-white mt-1 truncate">{hormone.nameFa.split(' ')[0]}</span>
                <span className="text-[9px] text-zinc-400 font-mono mt-0.5" dir="ltr">{hormone.nameEn.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Selected Hormone Detailed Profile */}
          <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                    <Dna className="w-4 h-4" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">{selectedHormone.nameFa}</h3>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  منبع ترشح غددی: <strong className="text-zinc-200">{selectedHormone.glandFa}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak(`${selectedHormone.nameFa}. ${selectedHormone.roleFa}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-[#d4af37] hover:bg-zinc-700 text-xs font-semibold transition-colors"
                  title="شنیدن توضیحات صوتی"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>قرائت صوتی</span>
                </button>
              </div>
            </div>

            {/* Role & Bio Action */}
            <div className="bg-[#181820] p-4 rounded-xl border border-zinc-800 text-xs leading-relaxed text-zinc-200">
              <span className="text-[#d4af37] font-bold block mb-1">نقش فیزیولوژیک در ورزش:</span>
              {selectedHormone.roleFa}
            </div>

            {/* Natural Stimulations */}
            <div className="bg-[#0f1915] border border-emerald-500/30 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>پروتکل‌های اثبات‌شده علمی جهت تحریک و جهش طبیعی ترشح:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-100 list-disc pr-5 leading-relaxed">
                {selectedHormone.naturalBoostTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* ADHD Micro Step Focus */}
            <div className="bg-amber-950/20 border border-amber-500/40 p-3.5 rounded-xl text-xs text-amber-200 flex items-start gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 mb-0.5">میکرو-گام عملی ADHD (برای اجرای فوری):</strong>
                <span>{selectedHormone.adhdFocusNote}</span>
              </div>
            </div>

            {/* Exogenous Warnings */}
            <div className="bg-rose-950/25 border border-rose-500/40 p-4 rounded-xl space-y-1.5">
              <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>عواقب فاجعه‌بار و برگشت‌ناپذیر مصرف برون‌زاد (تزریقی / قرص):</span>
              </h4>
              <p className="text-xs text-rose-200 leading-relaxed">
                {selectedHormone.exogenousRisks}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: WADA BLACKLIST & DOPING DANGERS */}
      {activeTab === 'wada' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Warning banner */}
          <div className="bg-gradient-to-r from-rose-950/60 to-[#121217] border-2 border-rose-500/50 rounded-2xl p-5 shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
              <ShieldAlert className="w-4 h-4" />
              <span>مرجع رسمی آژانس جهانی مبارزه با دوپینگ (WADA Prohibited List)</span>
            </div>
            <h3 className="text-base font-bold text-white">
              خط قرمزهای جهانی و آگاهی از لیست سیاه داروهای ممنوعه
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              مصرف استروئیدها، سارمزها، پپتیدها و مدرها نه تنها به محرومیت‌های مادام‌العمر ورزشی منجر می‌شود، بلکه به صورت برگشت‌ناپذیر بافت قلب، کبد، کلیه و سیستم عصبی را تخریب می‌کند. بیش از ۹۰ درصد نمونه‌های بازار سیاه تقلبی، آلوده و مرگبار هستند.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchWada}
              onChange={e => setSearchWada(e.target.value)}
              placeholder="جستجو در لیست سیاه WADA (مثال: سارمز، ترنبولون، کلن‌بوترول، لازیکس)..."
              className="w-full bg-[#18181c] border border-zinc-700/80 focus:border-rose-500 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none"
            />
          </div>

          {/* WADA List Accordion */}
          <div className="space-y-3">
            {filteredWada.map(substance => {
              const isExpanded = expandedWadaId === substance.id;

              return (
                <div
                  key={substance.id}
                  className={`bg-[#121217] rounded-2xl border transition-all ${
                    isExpanded ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.15)]' : 'border-zinc-800'
                  }`}
                >
                  <div
                    onClick={() => {
                      setExpandedWadaId(isExpanded ? null : substance.id);
                      soundAndSpeech.playTick();
                    }}
                    className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                        <AlertOctagon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white">{substance.nameFa}</h4>
                          <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded-full font-mono">
                            {substance.wadaCode}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-mono mt-0.5" dir="ltr">
                          {substance.nameEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-rose-400 bg-rose-950/40 px-2 py-1 rounded-lg border border-rose-500/30 hidden sm:inline">
                        {substance.banStatus}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-rose-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 border-t border-zinc-800/80 pt-4 space-y-4">
                      {/* Affected Organs */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-semibold text-zinc-400 block">اندام‌های هدف تخریب بیولوژیک:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {substance.targetOrgansAffected.map((org, oIdx) => (
                            <span key={oIdx} className="bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs px-2.5 py-1 rounded-lg font-medium">
                              ⚠️ {org}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Consequences */}
                      <div className="bg-[#181820] p-3.5 rounded-xl border border-zinc-800 text-xs text-zinc-200 leading-relaxed">
                        <strong className="text-rose-400 block mb-1">عواقب بالینی و حقوقی در WADA:</strong>
                        {substance.consequencesFa}
                      </div>

                      {/* Black Market Poison warning */}
                      <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-200">
                        <strong className="text-amber-400 block mb-0.5">وضعیت در بازار سیاه و مکمل‌های آلوده:</strong>
                        {substance.commonCounterfeits}
                      </div>

                      {/* Clean Healthy Alternative */}
                      <div className="bg-emerald-950/20 border border-emerald-500/40 p-3.5 rounded-xl text-xs text-emerald-200">
                        <strong className="text-emerald-400 flex items-center gap-1.5 mb-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>جایگزین طبیعی، اخلاقی و پاک در اکوسیستم توانا سیتی:</span>
                        </strong>
                        {substance.cleanAlternativeFa}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: CLEAN SPORTS PLEDGE & TAVANA MANIFESTO */}
      {activeTab === 'pledge' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-gradient-to-br from-[#0c1f18] via-[#121217] to-[#09090b] border-2 border-emerald-500/60 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Award className="w-7 h-7" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white">
              منشور ورزشکار اصیل، پاک و قهرمان در «توانا سیتی» (ایبل‌سیتی)
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              «ایبل‌سیتی به ورزشکاران می‌آموزد که قدرت واقعی در اصالت جسم، ریکاوری علمی و پشتکار طولانی‌مدت نهفته است، نه میانبرهای مخرب و مرگبار.»
            </p>

            {/* Core commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-right pt-2">
              <div className="bg-[#141d19] p-3.5 rounded-xl border border-emerald-500/30 text-xs">
                <span className="font-bold text-emerald-400 block mb-1">تعهد اول: اصالت جسم</span>
                <span className="text-zinc-300">عدم مصرف هرگونه داروی ممنوعه لیست سیاه WADA و پرهیز از فریب خود و دیگران.</span>
              </div>

              <div className="bg-[#141d19] p-3.5 rounded-xl border border-emerald-500/30 text-xs">
                <span className="font-bold text-emerald-400 block mb-1">تعهد دوم: ریکاوری علمی</span>
                <span className="text-zinc-300">تحریک طبیعی غدد با خواب عمیق شبانه، فستینگ، تغذیه ارگانیک و تنفس آگاهانه.</span>
              </div>

              <div className="bg-[#141d19] p-3.5 rounded-xl border border-emerald-500/30 text-xs">
                <span className="font-bold text-emerald-400 block mb-1">تعهد سوم: وفاداری به اراده</span>
                <span className="text-zinc-300">ساختن بدنی پولادین با صبر و حضور مستمر در لیگ مشاهیر وفاداران توانا سیتی.</span>
              </div>
            </div>

            {/* Sign button */}
            <div className="pt-4">
              <button
                onClick={handleSignCleanPledge}
                disabled={hasSignedPledge}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 mx-auto ${
                  hasSignedPledge
                    ? 'bg-emerald-600/40 text-emerald-200 border border-emerald-400 cursor-default'
                    : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-black hover:opacity-95'
                }`}
              >
                {hasSignedPledge ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-300" />
                    <span>شما این سوگندنامه را امضا کرده‌اید (نشان زرین ورزشکار پاک فعال است)</span>
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5" />
                    <span>امضای دیجیتال سوگندنامه ورزش پاک (+۲۵۰ امتیاز وفاداری طلایی)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Submit Button required by Script 2 */}
      <div className="pt-2">
        <button
          onClick={handleSaveModule2}
          className="w-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#b8860b] text-black font-bold py-4 px-6 rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>ثبت بخش بیوشیمی و WADA در ایبل‌سیتی</span>
        </button>
      </div>
    </div>
  );
};
