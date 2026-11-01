import React, { useState } from 'react';
import { Trophy, Dumbbell, TrendingUp, Calendar, Plus, CheckCircle, Award, Volume2, Trash2 } from 'lucide-react';
import { AdhdSettings, UserProfile } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface PersonalRecordItem {
  id: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  date: string;
  note: string;
}

interface PersonalRecordsTrackerProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const PersonalRecordsTracker: React.FC<PersonalRecordsTrackerProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile
}) => {
  const [records, setRecords] = useState<PersonalRecordItem[]>([
    { id: '1', exerciseName: 'پرس سینه (Bench Press)', weightKg: 140, reps: 1, date: '۱۴۰۵/۰۸/۱۰', note: 'ثبت رکورد مسابقات استانی' },
    { id: '2', exerciseName: 'اسکوات پا (Squat)', weightKg: 180, reps: 1, date: '۱۴۰۵/۰۸/۰۸', note: 'با کمربند و زانوبند' },
    { id: '3', exerciseName: 'ددلیفت (Deadlift)', weightKg: 220, reps: 1, date: '۱۴۰۵/۰۸/۰۵', note: 'پاورلیفتینگ حرفه‌ای' }
  ]);

  const [exerciseName, setExerciseName] = useState('پرس سینه (Bench Press)');
  const [weightKg, setWeightKg] = useState<number>(100);
  const [reps, setReps] = useState<number>(1);
  const [note, setNote] = useState('تمرینات سنگین حجمی');
  const [notification, setNotification] = useState('');

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseName || weightKg <= 0) return;

    soundAndSpeech.playSuccessChime();
    const newRecord: PersonalRecordItem = {
      id: Date.now().toString(),
      exerciseName,
      weightKg,
      reps,
      date: new Date().toLocaleDateString('fa-IR'),
      note
    };

    setRecords([newRecord, ...records]);
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 100
    }));

    setNotification(`✅ رکورد جدید "${exerciseName} با وزن ${weightKg} کیلوگرم" با موفقیت ثبت شد! (+۱۰۰ امتیاز وفاداری)`);
    setTimeout(() => setNotification(''), 4500);
  };

  const handleDeleteRecord = (id: string) => {
    soundAndSpeech.playTick();
    setRecords(records.filter(r => r.id !== id));
  };

  const handleSpeak = (text: string) => {
    soundAndSpeech.speakText(text);
  };

  const powerliftingTotal = records
    .filter(r => r.exerciseName.includes('پرس') || r.exerciseName.includes('اسکوات') || r.exerciseName.includes('ددلیفت'))
    .reduce((maxMap, curr) => {
      // take max of each
      return maxMap + curr.weightKg;
    }, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
        <div className="bg-gradient-to-r from-[#121216] via-[#1a1509] to-[#121216] p-6 sm:p-8 flex flex-col justify-between space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/40 w-fit">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>سیستم اختصاصی ثبت رکوردهای شخصی (PR Tracker)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            🏆 ثبت و پایش رکوردهای ورزشی و سوابق قدرتی (Personal Records)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            پیشرفت واقعی در بدنسازی و پاورلیفتینگ نیازمند ثبت دقیق وزنه‌ها، تعداد تکرارها و رکوردهای شخصی است. رکورد خود را ثبت کنید و در تالار مشاهیر توانا سیتی بدرخشید.
          </p>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-semibold shadow-lg animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-emerald-400 hover:text-white">بستن</button>
        </div>
      )}

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#121217] border border-[#d4af37]/40 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] text-zinc-400 block">تعداد رکوردهای ثبت‌شده:</span>
            <span className="text-xl font-bold text-white font-mono">{records.length} حرکت</span>
          </div>
          <Dumbbell className="w-8 h-8 text-[#d4af37]" />
        </div>

        <div className="bg-[#121217] border border-cyan-500/40 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] text-zinc-400 block">بالاترین وزنه ثبت‌شده:</span>
            <span className="text-xl font-bold text-cyan-400 font-mono">
              {records.length > 0 ? Math.max(...records.map(r => r.weightKg)) : 0} کیلوگرم
            </span>
          </div>
          <TrendingUp className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="bg-[#121217] border border-emerald-500/40 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] text-zinc-400 block">امتیاز وفاداری کسب‌شده:</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">+{userProfile.myLoyaltyPoints} پوند</span>
          </div>
          <Award className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      {/* Add New Record Form & Recent Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4 lg:col-span-1">
          <h3 className="text-sm font-bold text-[#d4af37] flex items-center gap-2 border-b border-zinc-800 pb-2">
            <Plus className="w-4 h-4" />
            <span>ثبت رکورد جدید (Personal Record)</span>
          </h3>

          <form onSubmit={handleAddRecord} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-zinc-300 font-semibold">نام حرکت ورزشی:</label>
              <select
                value={exerciseName}
                onChange={e => setExerciseName(e.target.value)}
                className="w-full bg-[#181820] text-white border border-zinc-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              >
                <option value="پرس سینه (Bench Press)">پرس سینه (Bench Press)</option>
                <option value="اسکوات پا (Squat)">اسکوات پا (Squat)</option>
                <option value="ددلیفت (Deadlift)">ددلیفت (Deadlift)</option>
                <option value="سرشانه هالتر (Overhead Press)">سرشانه هالتر (Overhead Press)</option>
                <option value="بارفیکس با وزنه (Weighted Pull-up)">بارفیکس با وزنه (Weighted Pull-up)</option>
                <option value="جلو بازو هالتر (Barbell Curl)">جلو بازو هالتر (Barbell Curl)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-zinc-300 font-semibold">وزنه (کیلوگرم):</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={e => setWeightKg(Number(e.target.value))}
                  min={5}
                  max={500}
                  className="w-full bg-[#181820] text-white font-mono border border-zinc-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-semibold">تعداد تکرار (Reps):</label>
                <input
                  type="number"
                  value={reps}
                  onChange={e => setReps(Number(e.target.value))}
                  min={1}
                  max={50}
                  className="w-full bg-[#181820] text-white font-mono border border-zinc-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-zinc-300 font-semibold">یادداشت مربی / شرایط ثبت:</label>
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="مثلاً: با کمربند، بدون کمک یار تمرینی"
                className="w-full bg-[#181820] text-white border border-zinc-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa820a] text-black font-bold py-3 px-4 rounded-xl shadow-md hover:opacity-95 transition-all text-xs flex items-center justify-center gap-2 mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت رکورد در پایگاه داده (+۱۰۰ امتیاز)</span>
            </button>
          </form>
        </div>

        {/* Records List */}
        <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#d4af37]" />
              <span>تاریخچه رکوردهای شخصی ثبت‌شده</span>
            </h3>
            <button
              onClick={() => handleSpeak('تاریخچه رکوردهای شخصی شما در اکوسیستم توانا سیتی ثبت شده است.')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 text-[#d4af37] text-xs font-semibold"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>قرائت صوتی</span>
            </button>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
            {records.map(rec => (
              <div
                key={rec.id}
                className="bg-[#181820] border border-zinc-800 p-3.5 rounded-xl flex items-center justify-between gap-3 transition-all hover:border-[#d4af37]/40"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#d4af37]">{rec.exerciseName}</span>
                    <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-mono">
                      {rec.date}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-300 flex items-center gap-3">
                    <span>وزنه: <strong className="text-white font-mono">{rec.weightKg} کیلوگرم</strong></span>
                    <span>تکرار: <strong className="text-white font-mono">{rec.reps} تکرار</strong></span>
                    {rec.note && <span className="text-[11px] text-zinc-400">({rec.note})</span>}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteRecord(rec.id)}
                  className="text-zinc-500 hover:text-rose-400 p-2 rounded-lg transition-all"
                  title="حذف رکورد"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
