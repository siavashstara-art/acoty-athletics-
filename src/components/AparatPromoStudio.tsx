import React, { useState } from 'react';
import { Video, Copy, Check, Sparkles, Play, Clock, Share2, Film } from 'lucide-react';
import { APARAT_PROMO_SCRIPT } from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

export const AparatPromoStudio: React.FC = () => {
  const [copiedAll, setCopiedAll] = useState(false);

  const fullScriptText = `================================================================================
🎬 ${APARAT_PROMO_SCRIPT.title}
مدت زمان استاندارد: ${APARAT_PROMO_SCRIPT.targetDuration}
فرمت پیشنهادی: ${APARAT_PROMO_SCRIPT.format}
لحن گوینده: ${APARAT_PROMO_SCRIPT.narratorVoice}
================================================================================

${APARAT_PROMO_SCRIPT.scenes
  .map(
    (s, i) => `[صحنه ${i + 1}] (${s.time})
• قلاب و تم: ${s.hook}
• تصویر و نما: ${s.visual}
• متن نریشن (گوینده): «${s.voiceover}»
• متن زیرنویس درشت روی صفحه: ${s.onscreenText}
`
  )
  .join('\n--------------------------------------------------------------------------------\n')}
`;

  const handleCopyFullScript = () => {
    navigator.clipboard.writeText(fullScriptText);
    setCopiedAll(true);
    soundAndSpeech.playSuccessChime();
    setTimeout(() => setCopiedAll(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#1e1308] via-[#121217] to-[#09090b] border-2 border-[#d4af37] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] mb-1">
              <Film className="w-4 h-4" />
              <span>استودیوی سناریونویسی ویدیوی تبلیغاتی آپارات (الزامی بند ۱۰)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              سناریوی تبلیغاتی ۳۰ ثانیه‌ای با استاندارد اکسپلور آپارات
            </h2>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl leading-relaxed">
              طراحی شده جهت قلاب‌اندازی فوری در ۳ ثانیه اول، معرفی ارزش وایت‌لیبل، لیگ معرفان و جذب حداکثری مخاطب برای کافه بازار و مایکت.
            </p>
          </div>

          <button
            onClick={handleCopyFullScript}
            className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#e5c158] text-black font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shrink-0 w-full sm:w-auto justify-center"
          >
            {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'سناریو کپی شد!' : 'کپی کل سناریو برای موبایل'}</span>
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>زمان‌بندی دقیق: ۳۰ ثانیه</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span>فرمت: استوری و شورتس عمودی (1080x1920)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>تم بصری: Black & Gold آریا گلد استودیو</span>
          </div>
        </div>
      </div>

      {/* Storyboard Scene-by-Scene Timeline */}
      <div className="space-y-4">
        {APARAT_PROMO_SCRIPT.scenes.map((scene, idx) => (
          <div
            key={idx}
            className="bg-[#121217] border border-zinc-800 hover:border-[#d4af37]/60 rounded-2xl p-5 transition-all shadow-md space-y-3"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-bold text-zinc-100">
                  {scene.hook}
                </span>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-zinc-800 px-2 py-0.5 rounded-md" dir="ltr">
                {scene.time}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-[#d4af37] font-semibold block mb-1">
                  🎬 نما و تصویرسازی (Visual & B-Roll):
                </span>
                <p className="text-zinc-300 leading-relaxed">{scene.visual}</p>
              </div>

              <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-cyan-400 font-semibold block mb-1">
                  🎙️ نریشن گوینده (Voiceover):
                </span>
                <p className="text-zinc-200 font-medium leading-relaxed">«{scene.voiceover}»</p>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-500/30 p-2.5 rounded-xl text-xs text-amber-200 flex items-center justify-between">
              <span>متن بزرگ تایپوگرافی روی صفحه: <strong>{scene.onscreenText}</strong></span>
              <span className="text-[10px] text-zinc-400">کپشن رسمی آپارات</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
