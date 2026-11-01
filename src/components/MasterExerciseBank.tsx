import React, { useState } from 'react';
import {
  Dumbbell,
  Sparkles,
  Trophy,
  CheckCircle2,
  Zap,
  Flame,
  Activity,
  Layers,
  Award
} from 'lucide-react';
import { UserProfile, AdhdSettings } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface MasterExerciseBankProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  adhdSettings: AdhdSettings;
}

export const MasterExerciseBank: React.FC<MasterExerciseBankProps> = ({
  userProfile,
  setUserProfile,
  adhdSettings
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'bodybuilding' | 'powerlifting' | 'weightlifting'>('bodybuilding');
  const [systemType, setSystemType] = useState<string>('هرمی افزایشی');
  const [setsCount, setSetsCount] = useState<number>(4);
  const [repsCount, setRepsCount] = useState<number>(8);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSaveProtocol = () => {
    soundAndSpeech.playSuccessChime();
    const msg = `✅ پروتکل "${systemType}" با ${setsCount} ست و ${repsCount} تکرار با موفقیت به برنامه شاگرد اضافه شد.`;
    setStatusMessage(msg);
    if (adhdSettings.voiceNarration) {
      soundAndSpeech.speakText(msg);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#121216] to-[#0d1b2a] border-2 border-[#d4af37]/50 rounded-3xl p-5 md:p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Dumbbell className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold gold-gradient-text">
              🏋️‍♂️🏆 مرجع جامع حرکات، سیستم‌های تمرینی و تصاویر واقعی قهرمانان
            </h3>
            <p className="text-xs text-zinc-300 mt-0.5">
              پروتکل کامل بدنسازی، پاورلیفتینگ، وزنه‌برداری المپیکی و سیستم‌های شوک عضلانی مربی‌محور (متد خدمات‌جو)
            </p>
          </div>
        </div>
      </div>

      {/* 1. Category Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#d4af37] block">
          انتخاب شاخه تمرینی هدف:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value as any);
            soundAndSpeech.playTick();
            setStatusMessage('');
          }}
          className="w-full bg-[#181822] border border-zinc-700 text-white rounded-xl p-3 text-xs font-semibold focus:border-amber-400 outline-none transition-all shadow-inner"
        >
          <option value="bodybuilding">💪 بدنسازی و تفکیک عضلات (Chest, Back, Legs, Arms, Core)</option>
          <option value="powerlifting">🏋️‍♂️🏛️ پاورلیفتینگ و رکوردهای قدرت (Powerlifting 3RM)</option>
          <option value="weightlifting">🥇 وزنه‌برداری المپیکی (Snatch & Clean and Jerk)</option>
        </select>
      </div>

      {/* 2. Dynamic Content & Real Images Display */}
      <div className="bg-black/60 border border-dashed border-[#d4af37]/40 p-4 sm:p-5 rounded-2xl shadow-inner space-y-4">
        {selectedCategory === 'bodybuilding' && (
          <div className="space-y-3 animate-fadeIn">
            <h4 className="text-sm font-bold text-amber-300">
              💪 بانک حرکات تفکیک‌شده و سیستم‌های بدنسازی قهرمانان
            </h4>
            <div className="text-xs text-zinc-200 space-y-1.5 leading-relaxed">
              <p>• <strong>بخش‌ها و عضلات تحت پوشش:</strong> سینه، زیربغل، سرشانه، بازو، جلوپا، پشتپا، ساق، شکم، پهلو، فیله و ذوزنقه.</p>
              <p>• <strong>قابلیت مربیگری پیشرفته:</strong> تعیین تعداد ست، تکرار و وزنه به‌صورت آنی و اختصاصی برای هر شاگرد.</p>
              <p>• <strong>سیستم‌های شدت‌دهنده عضلانی:</strong> هرمی، هرمی معکوس، دراپست، استراحت-توقف و تکنیک تقلب کنترل‌شده (Cheating).</p>
            </div>
            <div className="mt-4 text-center bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80"
                alt="Bodybuilding Training"
                className="w-full h-44 object-cover rounded-lg border border-amber-500/40 shadow-md"
              />
              <span className="text-[10px] text-zinc-400 block mt-2">
                📸 تصویر واقعی از اجرای صحیح تمرینات بدنسازی و تفکیک عضلات (منبع آزاد)
              </span>
            </div>
          </div>
        )}

        {selectedCategory === 'powerlifting' && (
          <div className="space-y-3 animate-fadeIn">
            <h4 className="text-sm font-bold text-[#ff9f43]">
              🏋️‍♂️🏛️ پاورلیفتینگ: افزایش رکوردهای قدرت (اسکوات، پرس سینه، ددلیفت)
            </h4>
            <div className="text-xs text-zinc-200 space-y-1.5 leading-relaxed">
              <p>• <strong>ماهیت تمرین:</strong> تمرکز بر ست‌های کم‌تکرار (۳تایی، ۲تایی و تک‌تکرار قدرتی) با وزنه‌های بالای ۸۵٪ توان بیشینه.</p>
              <p>• <strong>هدف بیومکانیکی:</strong> تنش مکانیکی بالا، هماهنگی عصب و عضله و عبور قطعی از سقف رکوردها (1RM).</p>
              <p>• <strong>ریکاوری عصبی:</strong> نیازمند استراحت طولانی‌تر (۳ تا ۵ دقیقه) بین ست‌های سنگین.</p>
            </div>
            <div className="mt-4 text-center bg-amber-950/20 p-3 rounded-xl border border-[#ff9f43]/30">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
                alt="Powerlifter Heavy Squat"
                className="w-full h-44 object-cover rounded-lg border border-[#ff9f43]/50 shadow-md"
              />
              <span className="text-[10px] text-zinc-400 block mt-2">
                📸 تصویر واقعی از قهرمانان پاورلیفتینگ در حال مهار وزنه سنگین اسکوات (منبع آزاد)
              </span>
            </div>
          </div>
        )}

        {selectedCategory === 'weightlifting' && (
          <div className="space-y-3 animate-fadeIn">
            <h4 className="text-sm font-bold text-[#00f2fe]">
              🥇 وزنه‌برداری المپیکی (یکضرب و دوضرب انفجاری)
            </h4>
            <div className="text-xs text-zinc-200 space-y-1.5 leading-relaxed">
              <p>• <strong>حرکات اصلی رقابتی:</strong> یکضرب (Snatch) و دوضرب (Clean & Jerk).</p>
              <p>• <strong>فاکتورهای کلیدی:</strong> سرعت انفجاری، انعطاف‌پذیری فوق‌العاده مفاصل (مچ پا، لگن، شانه) و هماهنگی نوروماسکولار.</p>
              <p>• <strong>پاورپوتکل مربیگری:</strong> ترکیب کشش‌های المپیکی با تمرینات توان و استقامت سرعتی.</p>
            </div>
            <div className="mt-4 text-center bg-cyan-950/20 p-3 rounded-xl border border-cyan-500/30">
              <img
                src="https://images.unsplash.com/photo-1567598501477-d65e22903ef3?auto=format&fit=crop&w=600&q=80"
                alt="Olympic Weightlifting"
                className="w-full h-44 object-cover rounded-lg border border-cyan-500/50 shadow-md"
              />
              <span className="text-[10px] text-zinc-400 block mt-2">
                📸 تصویر واقعی از تمرینات انفجاری وزنه‌برداری المپیکی در سطح قه قهرمانان (منبع آزاد)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Coach Programming & Dose Adjustment Tool */}
      <div className="bg-black/40 border border-dashed border-[#d4af37] p-4 rounded-2xl space-y-4 text-xs">
        <div className="flex items-center gap-2 text-amber-300 font-bold">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>⚙️ تنظیم دوز و سیستم تمرینی امروز شاگرد:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-zinc-400 block mb-1">سیستم تمرینی:</label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value)}
              className="w-full bg-[#181822] border border-zinc-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 outline-none"
            >
              <option value="هرمی افزایشی">سیستم هرمی (Pyramid)</option>
              <option value="هرمی معکوس">هرمی معکوس (Reverse)</option>
              <option value="دراپ ست">دراپست (Drop Set)</option>
              <option value="پاورلیفتینگ ۳تایی">پاورلیفتینگ (3RM)</option>
              <option value="سوپرست دوبل">سوپرست دوبل تخصصی</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">تعداد ست:</label>
            <input
              type="number"
              value={setsCount}
              onChange={(e) => setSetsCount(parseInt(e.target.value) || 1)}
              min={1}
              max={10}
              className="w-full bg-[#181822] border border-zinc-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">تکرار / رکورد:</label>
            <input
              type="number"
              value={repsCount}
              onChange={(e) => setRepsCount(parseInt(e.target.value) || 1)}
              min={1}
              max={30}
              className="w-full bg-[#181822] border border-zinc-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSaveProtocol}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-[#d4af37] hover:from-amber-400 hover:to-amber-500 text-black font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>➕ ثبت و افزودن پروتکل به برنامه شاگرد</span>
        </button>

        {statusMessage && (
          <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-xl text-amber-300 font-bold text-center animate-fadeIn">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};
