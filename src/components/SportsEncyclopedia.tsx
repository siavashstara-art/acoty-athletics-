import React, { useState, useEffect } from 'react';
import {
  Search,
  Dumbbell,
  Layers,
  Activity,
  Zap,
  Shield,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertTriangle,
  Flame,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookmarkPlus,
  Play,
  Plus,
  Trash2,
  Save,
  Compass,
  ArrowLeft,
  Award
} from 'lucide-react';
import { AdhdSettings, ExerciseItem, MuscleGroup } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface SportsEncyclopediaProps {
  exercises: ExerciseItem[];
  adhdSettings: AdhdSettings;
  onStartTimer: (seconds: number, exerciseName: string) => void;
  onProceedToNextScript?: () => void;
}

interface WorkoutSetLog {
  id: string;
  setNumber: number;
  weightKg: string;
  reps: string;
  completed: boolean;
}

export const SportsEncyclopedia: React.FC<SportsEncyclopediaProps> = ({
  exercises,
  adhdSettings,
  onStartTimer,
  onProceedToNextScript
}) => {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'مبتدی' | 'متوسط' | 'پیشرفته'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(exercises[0]?.id || null);
  const [checkedMicroSteps, setCheckedMicroSteps] = useState<Record<string, boolean>>({});
  const [activeBodyView, setActiveBodyView] = useState<'anterior' | 'posterior'>('anterior');

  // Exercise log state stored per exercise id
  const [workoutLogs, setWorkoutLogs] = useState<Record<string, WorkoutSetLog[]>>(() => {
    try {
      const saved = localStorage.getItem('tavana_exercise_workout_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('tavana_exercise_workout_logs', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  const categories: { id: MuscleGroup | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'همه حرکات', icon: '⚡' },
    { id: 'chest', label: 'سینه (Chest)', icon: '🛡️' },
    { id: 'back', label: 'زیربغل و پشت (Back)', icon: '🦅' },
    { id: 'shoulders', label: 'سرشانه (Delts)', icon: '🔱' },
    { id: 'arms', label: 'بازو و پشت‌بازو (Arms)', icon: '💪' },
    { id: 'legs', label: 'پا و باسن (Legs)', icon: '🦵' },
    { id: 'core', label: 'شکم و کر (Core)', icon: '🎯' },
    { id: 'functional', label: 'فانکشنال و توانی', icon: '🔥' }
  ];

  const anteriorMuscles = [
    { name: 'عضلات سینه (Pectorals)', group: 'chest' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'chest').length },
    { name: 'دلتوئید قدامی و میانی', group: 'shoulders' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'shoulders').length },
    { name: 'جلو بازو (Biceps)', group: 'arms' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'arms').length },
    { name: 'چهارسر ران (Quadriceps)', group: 'legs' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'legs').length },
    { name: 'راست شکمی و مورب‌ها', group: 'core' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'core').length }
  ];

  const posteriorMuscles = [
    { name: 'عضلات پشتی بزرگ (Lats)', group: 'back' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'back').length },
    { name: 'ذوزنقه‌ای و کول (Traps)', group: 'back' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'back').length },
    { name: 'پشت‌بازو (Triceps)', group: 'arms' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'arms').length },
    { name: 'عضلات سرینی (Glutes)', group: 'legs' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'legs').length },
    { name: 'همسترینگ و فیله کمر', group: 'legs' as MuscleGroup, count: exercises.filter(e => e.muscleGroup === 'legs').length }
  ];

  const filteredExercises = exercises.filter(item => {
    const matchesGroup = selectedGroup === 'all' || item.muscleGroup === selectedGroup;
    const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
    const matchesQuery =
      item.titleFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.primaryMuscleFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.equipmentFa.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesDifficulty && matchesQuery;
  });

  const toggleMicroStep = (stepKey: string) => {
    const next = !checkedMicroSteps[stepKey];
    setCheckedMicroSteps(prev => ({ ...prev, [stepKey]: next }));
    if (next) {
      soundAndSpeech.playSuccessChime();
    } else {
      soundAndSpeech.playTick();
    }
  };

  const handleSpeech = (exercise: ExerciseItem) => {
    const textToRead = `${exercise.titleFa}. عضلات اصلی هدف: ${exercise.primaryMuscleFa}. شیوه اجرا: ${exercise.stepsFa[0]}. توصیه مربی سیاوش علی‌میری: ${exercise.proTipFa}`;
    soundAndSpeech.speakText(textToRead);
  };

  // Workout Log actions
  const getExerciseLogs = (exerciseId: string): WorkoutSetLog[] => {
    return (
      workoutLogs[exerciseId] || [
        { id: `${exerciseId}-1`, setNumber: 1, weightKg: '60', reps: '10', completed: false },
        { id: `${exerciseId}-2`, setNumber: 2, weightKg: '65', reps: '8', completed: false },
        { id: `${exerciseId}-3`, setNumber: 3, weightKg: '70', reps: '8', completed: false }
      ]
    );
  };

  const addSetToExercise = (exerciseId: string) => {
    const current = getExerciseLogs(exerciseId);
    const lastSet = current[current.length - 1];
    const newSet: WorkoutSetLog = {
      id: `${exerciseId}-${Date.now()}`,
      setNumber: current.length + 1,
      weightKg: lastSet ? lastSet.weightKg : '50',
      reps: lastSet ? lastSet.reps : '10',
      completed: false
    };
    setWorkoutLogs(prev => ({ ...prev, [exerciseId]: [...current, newSet] }));
    soundAndSpeech.playTick();
  };

  const removeSetFromExercise = (exerciseId: string, setId: string) => {
    const current = getExerciseLogs(exerciseId);
    setWorkoutLogs(prev => ({
      ...prev,
      [exerciseId]: current.filter(s => s.id !== setId)
    }));
    soundAndSpeech.playTick();
  };

  const updateSetField = (
    exerciseId: string,
    setId: string,
    field: 'weightKg' | 'reps' | 'completed',
    val: any
  ) => {
    const current = getExerciseLogs(exerciseId);
    const updated = current.map(s => {
      if (s.id === setId) {
        return { ...s, [field]: val };
      }
      return s;
    });
    setWorkoutLogs(prev => ({ ...prev, [exerciseId]: updated }));
    if (field === 'completed' && val === true) {
      soundAndSpeech.playSuccessChime();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Anatomy Visualizer Banner with Official Script 6 Stamp */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl">
        <img
          src="/src/assets/images/sports_anatomy_banner_1793532688544.jpg"
          alt="دائرةالمعارف تخصصی حرکات بدنسازی و آناتومی"
          className="w-full h-48 sm:h-56 md:h-64 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent flex flex-col justify-end p-5">
          <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 w-fit mb-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>اسکریپت ۶: دائرةالمعارف تخصصی حرکات بدنسازی و تمرینات ورزشی</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-md">
            تحلیل جامع بیومکانیکی حرکات، ثبت ست‌ها و متدولوژی خدمات‌جو
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
            بانک جامع حرکات ورزشی با طبقه‌بندی آناتومیکی، ریزگام‌های ADHD، ثبت زنده‌ی رکورد ست‌ها و تمهیدات پیشگیری از آسیب طبق متد اس‌ئی امیری (سیاوش علی‌میری).
          </p>
        </div>
      </div>

      {/* Interactive Anatomical Body Target Map (قدامی و خلفی) */}
      <div className="bg-[#121217] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37]">
            <Compass className="w-4 h-4" />
            <span>نقشه تعاملی عضلات هدف (انتخاب مستقیم گروه عضلانی):</span>
          </div>
          <div className="flex items-center gap-2 bg-[#18181f] p-1 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => {
                setActiveBodyView('anterior');
                soundAndSpeech.playTick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeBodyView === 'anterior'
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              نمای قدامی (جلوی بدن)
            </button>
            <button
              onClick={() => {
                setActiveBodyView('posterior');
                soundAndSpeech.playTick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeBodyView === 'posterior'
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              نمای خلفی (پشت بدن)
            </button>
          </div>
        </div>

        {/* Muscle Selection Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {(activeBodyView === 'anterior' ? anteriorMuscles : posteriorMuscles).map((m, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedGroup(m.group);
                soundAndSpeech.playTick();
              }}
              className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between ${
                selectedGroup === m.group
                  ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)] font-bold'
                  : 'bg-[#18181f] border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <span className="text-xs">{m.name}</span>
              <span className="text-[10px] text-zinc-400 mt-1">
                {m.count} حرکت ثبت‌شده
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search, Group & Difficulty Filter Controls */}
      <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-4 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="جستجوی سریع بر اساس نام حرکت، عضله هدف، یا تجهیزات (فارسی و انگلیسی)..."
            className="w-full bg-[#18181c] border border-zinc-700/80 focus:border-[#d4af37] rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedGroup(cat.id);
                soundAndSpeech.playTick();
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
                selectedGroup === cat.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-md font-bold'
                  : 'bg-[#18181c] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2 pt-1 text-xs">
          <span className="text-zinc-400 text-[11px]">سطح دشواری:</span>
          {(['all', 'مبتدی', 'متوسط', 'پیشرفته'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => {
                setSelectedDifficulty(diff);
                soundAndSpeech.playTick();
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                selectedDifficulty === diff
                  ? 'bg-zinc-200 text-black font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {diff === 'all' ? 'همه سطوح' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Count & ADHD Status Bar */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>نمایش {filteredExercises.length} حرکت ورزشی در اسکریپت شماره ۶</span>
        {adhdSettings.isEnabled && (
          <span className="text-amber-400 font-semibold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>حالت تمرکز ADHD فعال است (میکرو-استپ‌ها فعال)</span>
          </span>
        )}
      </div>

      {/* Exercises Accordion List */}
      <div className="space-y-4">
        {filteredExercises.map(exercise => {
          const isExpanded = expandedId === exercise.id;
          const currentLogs = getExerciseLogs(exercise.id);

          return (
            <div
              key={exercise.id}
              className={`bg-[#121217] rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'border-[#d4af37] shadow-[0_4px_30px_rgba(212,175,55,0.18)] ring-1 ring-[#d4af37]/40'
                  : 'border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Header Bar of Exercise */}
              <div
                onClick={() => {
                  setExpandedId(isExpanded ? null : exercise.id);
                  soundAndSpeech.playTick();
                }}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none bg-gradient-to-r from-transparent via-transparent to-zinc-900/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c24] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0 shadow-sm">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
                      <span>{exercise.titleFa}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-amber-300 font-normal">
                        {exercise.difficulty}
                      </span>
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-mono tracking-tight" dir="ltr">
                      {exercise.titleEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeech(exercise);
                    }}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-700 transition-colors"
                    title="قرائت صوتی اطلاعات و نکته مربی"
                    aria-label="قرائت صوتی"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartTimer(60, exercise.titleFa);
                    }}
                    className="hidden sm:flex items-center gap-1 text-[11px] bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] px-2.5 py-1.5 rounded-lg hover:bg-[#d4af37]/25 transition-colors font-semibold"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>تایمر استراحت (۶۰ث)</span>
                  </button>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#d4af37]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              </div>

              {/* Expanded Detailed Content */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 border-t border-zinc-800/80 pt-4 space-y-6">
                  {/* Anatomical Targets Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-[#18181f] p-3 rounded-xl border border-zinc-800">
                      <span className="text-zinc-400 text-[11px] block mb-1">عضله هدف اصلی (Primary Muscle):</span>
                      <span className="text-[#d4af37] font-semibold">{exercise.primaryMuscleFa}</span>
                    </div>
                    <div className="bg-[#18181f] p-3 rounded-xl border border-zinc-800">
                      <span className="text-zinc-400 text-[11px] block mb-1">عضلات کمکی و همکار (Synergists):</span>
                      <span className="text-zinc-200">{exercise.secondaryMuscleFa}</span>
                    </div>
                    <div className="bg-[#18181f] p-3 rounded-xl border border-zinc-800">
                      <span className="text-zinc-400 text-[11px] block mb-1">تجهیزات و پروتکل استاندارد:</span>
                      <span className="text-zinc-200">{exercise.equipmentFa} · {exercise.recommendedSets}</span>
                    </div>
                  </div>

                  {/* Step-by-Step Biomechanical Execution */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>مراحل اجرای صحیح و استاندارد بیومکانیکی:</span>
                    </h4>
                    <ol className="space-y-2 pr-4 border-r-2 border-[#d4af37]/40 text-xs text-zinc-300 leading-relaxed">
                      {exercise.stepsFa.map((step, idx) => (
                        <li key={idx} className="relative">
                          <span className="text-amber-400 font-bold ml-1.5">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Interactive Live Workout Log (ثبت ست‌ها و رکوردهای وزنه و تکرار در اسکریپت ۶) */}
                  <div className="bg-[#181822] border border-[#d4af37]/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#d4af37]" />
                        <h4 className="text-xs font-bold text-zinc-100">
                          لاگ زنده تمرین و ثبت ست‌ها (Workout Tracker):
                        </h4>
                      </div>
                      <button
                        onClick={() => addSetToExercise(exercise.id)}
                        className="flex items-center gap-1 text-[11px] bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] px-2.5 py-1 rounded-lg border border-[#d4af37]/40 font-semibold transition-all"
                      >
                        <Plus className="w-3 h-3" />
                        <span>افزودن ست جدید</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-right">
                        <thead>
                          <tr className="text-zinc-400 border-b border-zinc-800 pb-1 text-[11px]">
                            <th className="py-1 px-2 font-normal">ست</th>
                            <th className="py-1 px-2 font-normal">وزن (کیلوگرم)</th>
                            <th className="py-1 px-2 font-normal">تعداد تکرار</th>
                            <th className="py-1 px-2 font-normal text-center">وضعیت</th>
                            <th className="py-1 px-2 font-normal text-center">حذف</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60">
                          {currentLogs.map(s => (
                            <tr key={s.id} className="hover:bg-zinc-800/20">
                              <td className="py-2 px-2 font-bold text-amber-400">{s.setNumber}</td>
                              <td className="py-2 px-2">
                                <input
                                  type="number"
                                  value={s.weightKg}
                                  onChange={e =>
                                    updateSetField(exercise.id, s.id, 'weightKg', e.target.value)
                                  }
                                  className="w-16 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-center text-zinc-100 outline-none focus:border-[#d4af37]"
                                />
                              </td>
                              <td className="py-2 px-2">
                                <input
                                  type="number"
                                  value={s.reps}
                                  onChange={e =>
                                    updateSetField(exercise.id, s.id, 'reps', e.target.value)
                                  }
                                  className="w-16 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-center text-zinc-100 outline-none focus:border-[#d4af37]"
                                />
                              </td>
                              <td className="py-2 px-2 text-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateSetField(exercise.id, s.id, 'completed', !s.completed)
                                  }
                                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                                    s.completed
                                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-zinc-200'
                                  }`}
                                >
                                  {s.completed ? 'انجام شد ✓' : 'ثبت اتمام'}
                                </button>
                              </td>
                              <td className="py-2 px-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => removeSetFromExercise(exercise.id, s.id)}
                                  className="p-1 text-zinc-500 hover:text-rose-400 transition-colors"
                                  title="حذف ست"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ADHD Micro-Steps Interactive Checklist */}
                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-bold text-amber-300">
                          ریزگام‌های اختصاصی ADHD (انجام تک‌به‌تک با تمرکز کامل):
                        </h4>
                      </div>
                      <span className="text-[10px] text-amber-300/80">برای تایید روی هر گام تیک بزنید</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {exercise.adhdMicroSteps.map((mStep, sIdx) => {
                        const stepKey = `${exercise.id}-step-${sIdx}`;
                        const isDone = checkedMicroSteps[stepKey];

                        return (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => toggleMicroStep(stepKey)}
                            className={`text-right p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${
                              isDone
                                ? 'bg-amber-500/20 border-amber-500 text-amber-200 line-through opacity-85'
                                : 'bg-[#18181f] border-zinc-700/70 text-zinc-200 hover:border-amber-400'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border text-[10px] ${
                                isDone
                                  ? 'bg-amber-400 border-amber-400 text-black font-bold'
                                  : 'border-zinc-500'
                              }`}
                            >
                              {isDone ? '✓' : ''}
                            </span>
                            <span className="leading-snug">{mStep}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Common Mistakes & Pathology Warnings */}
                  <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>اشتباهات رایج و هشدارهای آسیب‌شناسی:</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-rose-200/90 list-disc pr-4 leading-relaxed">
                      {exercise.mistakesFa.map((mistake, mIdx) => (
                        <li key={mIdx}>{mistake}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Coach Pro-Tip (Khadamat-Joo Methodology by Siavash Ali-Miri) */}
                  <div className="bg-gradient-to-r from-[#d4af37]/15 via-[#d4af37]/5 to-transparent border-r-4 border-[#d4af37] p-4 rounded-lg text-xs leading-relaxed">
                    <div className="font-bold text-[#d4af37] flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>متدولوژی اختصاصی خدمات‌جو (اس‌ئی امیری / سیاوش علی‌میری):</span>
                    </div>
                    <p className="text-zinc-200">{exercise.proTipFa}</p>
                  </div>

                  {/* Mobile Quick Action Buttons */}
                  <div className="flex sm:hidden items-center gap-2 pt-2">
                    <button
                      onClick={() => onStartTimer(60, exercise.titleFa)}
                      className="flex-1 bg-zinc-800 text-[#d4af37] border border-[#d4af37]/40 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>تایمر استراحت (۶۰ ثانیه)</span>
                    </button>
                    <button
                      onClick={() => handleSpeech(exercise)}
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white"
                      aria-label="پخش صوتی"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion & Transition to Season 4 / Referral League */}
      <div className="bg-gradient-to-r from-[#d4af37]/15 via-[#aa820a]/10 to-[#d4af37]/15 border border-[#d4af37]/40 rounded-2xl p-5 text-center space-y-3 shadow-xl">
        <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto">
          <Award className="w-5 h-5" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">
          پایان موفقیت‌آمیز اسکریپت شماره ۶: دائرةالمعارف حرکات ورزشی
        </h3>
        <p className="text-xs text-zinc-300 max-w-xl mx-auto leading-relaxed">
          اکنون بانک حرکات و ثبت ست‌ها کاملاً فعال است. برای ورود به فصل ۴ (شامل لیگ معرفان، تالار مشاهیر وفاداران، سناریوی آپارات و خروجی کافه‌بازار و مایکت) کلیک کنید.
        </p>
        {onProceedToNextScript && (
          <button
            onClick={() => {
              onProceedToNextScript();
              soundAndSpeech.playSuccessChime();
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:from-[#e5c158] hover:to-[#b88c0c] text-black font-extrabold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg transition-transform active:scale-95"
          >
            <span>ورود به اسکریپت ۷: لیگ معرفان (فصل ۴)</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
