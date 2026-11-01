import React, { useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  Trophy,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Award,
  ChevronLeft,
  Flame,
  Activity,
  Lightbulb,
  ShieldAlert,
  BookOpen,
  Users
} from 'lucide-react';
import { UserProfile } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface BrainTrainingCenterProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onGoToLoyalty?: () => void;
}

// Data structures for Stroop Game
const COLOR_WORDS = [
  { textFa: 'قرمز', colorHex: '#ef4444', id: 'red' },
  { textFa: 'آبی', colorHex: '#3b82f6', id: 'blue' },
  { textFa: 'سبز', colorHex: '#22c55e', id: 'green' },
  { textFa: 'طلایی', colorHex: '#eab308', id: 'yellow' },
  { textFa: 'بنفش', colorHex: '#a855f7', id: 'purple' }
];

// Data structures for Memory Matrix Cards
const CARD_ICONS = ['🧠', '🏋️', '🏆', '⚡', '🛡️', '💎', '👑', '🎯'];

// Sports General Knowledge Questions Bank (League Iran)
interface SportsTriviaQuestion {
  id: number;
  questionFa: string;
  optionsFa: string[];
  correctIndex: number;
  explanationFa: string;
}

const SPORTS_TRIVIA_QUESTIONS: SportsTriviaQuestion[] = [
  {
    id: 1,
    questionFa: 'افتخار قهرمانی در جام ملت‌های آسیا ۱۹۶۸، ۱۹۷۲ و ۱۹۷۶ متعلق به تیم ملی فوتبال کدام کشور است؟',
    optionsFa: ['کره جنوبی', 'ایران', 'ژاپن', 'عربستان سعودی'],
    correctIndex: 1,
    explanationFa: 'تیم ملی فوتبال ایران تنها تیمی در آسیا است که توانسته ۳ دوره متوالی قهرمان جام ملت‌های آسیا شود.'
  },
  {
    id: 2,
    questionFa: 'کدام وزندار ایرانی موفق به کسب مدال طلا در المپیک توکیو ۲۰۲۰ در رشته وزنه‌برداری شد؟',
    optionsFa: ['کیانوش رستمی', 'سهراب مرادی', 'سهراب مرادی', 'سهراب مرادی (سهراب مرادی) / علی داودی', 'سهراب مرادی / کیانوش رستمی', 'مدال طلا کسب نشد / سهراب در توکیو نبود، سهراب ۲۰۱۶ بود / در توکیو طلا نداشتیم'],
    correctIndex: 3,
    explanationFa: 'در المپیک توکیو ۲۰۲۰، علی داودی در دسته فوق سنگین موفق به کسب مدال نقره شد و در وزنه‌برداری طلا نداشتیم (سهراب مرادی مدال طلای خود را در ریو ۲۰۱۶ کسب کرده بود).'
  },
  {
    id: 3,
    questionFa: 'بنیان‌گذار و پدر کشتی فرنگی نوین ایران و قهرمان نامدار جهان چه کسی است؟',
    optionsFa: ['غلامرضا تختی', 'حبیب‌الله اخلاقی', 'محمد بنا', 'حسن یزدانی'],
    correctIndex: 2,
    explanationFa: 'محمد بنا به عنوان معمار و پدر کشتی فرنگی نوین ایران شناخته می‌شود که افتخارات تاریخی در المپیک‌ها کسب کرده است.'
  },
  {
    id: 4,
    questionFa: 'کدام شهر ایران به عنوان پایتخت کشتی آزاد جهان شناخته می‌شود و مهد پهلوانان است؟',
    optionsFa: ['شیراز', 'جویبار مازندران', 'تبریز', 'اصفهان'],
    correctIndex: 1,
    explanationFa: 'شهر جویبار در استان مازندران به دلیل پرورش ده‌ها قهرمان جهان و المپیک به پایتخت کشتی آزاد جهان شهرت دارد.'
  },
  {
    id: 5,
    questionFa: 'نخستین مدال‌آور تاریخ ورزش زنان ایران در بازی‌های المپیک (مدال برنز تکواندو ریو ۲۰۱۶) چه کسی است؟',
    optionsFa: ['کیمیا علیزاده', 'زهرا نعمتی', 'سارا خادم‌الشریعه', 'الهه احمدی'],
    correctIndex: 0,
    explanationFa: 'کیمیا علیزاده با کسب مدال برنز در المپیک ریو ۲۰۱۶، نام خود را به عنوان نخستین زن مدال‌آور المپیک تاریخ ایران ثبت کرد.'
  },
  {
    id: 6,
    questionFa: 'در فوتسال آسیا، تیم ملی فوتسال ایران با کسب چند عنوان قهرمانی پرافتخارترین تیم قاره کهن است؟',
    optionsFa: ['۸ دوره', '۱۰ دوره', '۱۳ دوره', '۵ دوره'],
    correctIndex: 2,
    explanationFa: 'تیم ملی فوتسال ایران با کسب ۱۳ قهرمانی در مسابقات قهرمانی فوتسال آسیا، اقتدار بی‌رقیبی در قاره آسیا دارد.'
  }
];

export const BrainTrainingCenter: React.FC<BrainTrainingCenterProps> = ({
  userProfile,
  setUserProfile,
  onGoToLoyalty
}) => {
  const [activeGame, setActiveGame] = useState<'stroop' | 'pattern' | 'math' | 'memory' | 'trivia'>('stroop');
  const [brainScore, setBrainScore] = useState<number>(350);
  const [completedGames, setCompletedGames] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(3);

  // --------------------------------------------------------------------------
  // GAME 1: STROOP NEURO-TEST (تست استروپ انطباق کلامی-رنگی)
  // --------------------------------------------------------------------------
  const [stroopWord, setStroopWord] = useState(COLOR_WORDS[0]);
  const [stroopColor, setStroopColor] = useState(COLOR_WORDS[1]);
  const [stroopScore, setStroopScore] = useState(0);
  const [stroopTimer, setStroopTimer] = useState(3);
  const [isStroopActive, setIsStroopActive] = useState(false);
  const [stroopFeedback, setStroopFeedback] = useState<string | null>(null);

  const startStroopGame = () => {
    setStroopScore(0);
    setIsStroopActive(true);
    nextStroopQuestion();
  };

  const nextStroopQuestion = () => {
    const randomWordIdx = Math.floor(Math.random() * COLOR_WORDS.length);
    let randomColorIdx = Math.floor(Math.random() * COLOR_WORDS.length);
    
    if (Math.random() > 0.3) {
      while (randomColorIdx === randomWordIdx) {
        randomColorIdx = Math.floor(Math.random() * COLOR_WORDS.length);
      }
    }

    setStroopWord(COLOR_WORDS[randomWordIdx]);
    setStroopColor(COLOR_WORDS[randomColorIdx]);
    setStroopTimer(3);
    setStroopFeedback(null);
  };

  useEffect(() => {
    let timer: any;
    if (isStroopActive && stroopTimer > 0) {
      timer = setInterval(() => {
        setStroopTimer(prev => prev - 1);
      }, 1000);
    } else if (isStroopActive && stroopTimer === 0) {
      soundAndSpeech.playError();
      setStroopFeedback('زمان تمام شد! رنگ ظاهری متن را انتخاب کنید.');
      setTimeout(() => {
        nextStroopQuestion();
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isStroopActive, stroopTimer]);

  const handleStroopAnswer = (selectedColorId: string) => {
    if (!isStroopActive) return;

    if (selectedColorId === stroopColor.id) {
      soundAndSpeech.playSuccess();
      const points = 25;
      setStroopScore(prev => prev + points);
      setBrainScore(prev => prev + points);
      setStroopFeedback('✨ عالی! رنگ کلمه صحیح بود (+۲۵ امتیاز)');
    } else {
      soundAndSpeech.playError();
      setStroopFeedback(`❌ اشتباه! رنگ متن ${stroopColor.textFa} بود، نه نوشته کلمه!`);
    }

    setTimeout(() => {
      nextStroopQuestion();
    }, 1000);
  };

  // --------------------------------------------------------------------------
  // GAME 2: SPATIAL PATTERN MEMORY (حافظه فضایی گوهرها)
  // --------------------------------------------------------------------------
  const gems = [
    { id: 0, label: 'طلا', color: 'bg-amber-500 border-amber-300 shadow-amber-500/50' },
    { id: 1, label: 'زمرد', color: 'bg-emerald-500 border-emerald-300 shadow-emerald-500/50' },
    { id: 2, label: 'یاقوت', color: 'bg-rose-500 border-rose-300 shadow-rose-500/50' },
    { id: 3, label: 'لاجورد', color: 'bg-blue-500 border-blue-300 shadow-blue-500/50' }
  ];

  const [patternSeq, setPatternSeq] = useState<number[]>([]);
  const [userSeqIdx, setUserSeqIdx] = useState<number>(0);
  const [activeGem, setActiveGem] = useState<number | null>(null);
  const [isDisplayingSeq, setIsDisplayingSeq] = useState(false);
  const [patternScore, setPatternScore] = useState(0);
  const [patternStatus, setPatternStatus] = useState<string>('روی "شروع بازی الگوی حافظه" کلیک کنید');

  const startPatternGame = () => {
    setPatternScore(0);
    const firstSeq = [Math.floor(Math.random() * 4)];
    setPatternSeq(firstSeq);
    setUserSeqIdx(0);
    playPatternSequence(firstSeq);
  };

  const playPatternSequence = (sequence: number[]) => {
    setIsDisplayingSeq(true);
    setPatternStatus('الگو را با دقت تماشا کنید...');
    
    sequence.forEach((gemIdx, index) => {
      setTimeout(() => {
        setActiveGem(gemIdx);
        soundAndSpeech.playTick();
        setTimeout(() => {
          setActiveGem(null);
          if (index === sequence.length - 1) {
            setIsDisplayingSeq(false);
            setPatternStatus('حالا نوبت شماست! الگو را به ترتیب لمس کنید.');
          }
        }, 500);
      }, (index + 1) * 800);
    });
  };

  const handleGemClick = (gemIdx: number) => {
    if (isDisplayingSeq || patternSeq.length === 0) return;

    soundAndSpeech.playTick();
    if (gemIdx === patternSeq[userSeqIdx]) {
      if (userSeqIdx + 1 === patternSeq.length) {
        soundAndSpeech.playSuccess();
        const newScore = patternScore + 50;
        setPatternScore(newScore);
        setBrainScore(prev => prev + 50);
        setPatternStatus(`👏 آفرین! مرحله ${patternSeq.length} کامل شد (+۵۰ امتیاز)`);

        const nextSeq = [...patternSeq, Math.floor(Math.random() * 4)];
        setPatternSeq(nextSeq);
        setUserSeqIdx(0);

        setTimeout(() => {
          playPatternSequence(nextSeq);
        }, 1200);
      } else {
        setUserSeqIdx(prev => prev + 1);
      }
    } else {
      soundAndSpeech.playError();
      setPatternStatus('❌ اشتباه در الگو! بازی بازنشانی شد.');
      setTimeout(() => {
        startPatternGame();
      }, 1500);
    }
  };

  // --------------------------------------------------------------------------
  // GAME 3: FAST MENTAL MATH (رفلکس محاسبات ذهنی)
  // --------------------------------------------------------------------------
  const [mathProblem, setMathProblem] = useState<{ expr: string; answer: number; options: number[] }>({
    expr: '14 + 18',
    answer: 32,
    options: [30, 32, 34, 28]
  });
  const [mathScore, setMathScore] = useState(0);
  const [mathTimer, setMathTimer] = useState(5);
  const [isMathActive, setIsMathActive] = useState(false);
  const [mathFeedback, setMathFeedback] = useState<string | null>(null);

  const generateMathProblem = () => {
    const ops = ['+', '-', 'x'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1 = Math.floor(Math.random() * 20) + 5;
    let n2 = Math.floor(Math.random() * 15) + 3;
    let ans = 0;

    if (op === '+') {
      ans = n1 + n2;
    } else if (op === '-') {
      if (n1 < n2) [n1, n2] = [n2, n1];
      ans = n1 - n2;
    } else {
      n1 = Math.floor(Math.random() * 9) + 2;
      n2 = Math.floor(Math.random() * 9) + 2;
      ans = n1 * n2;
    }

    const opts = new Set<number>();
    opts.add(ans);
    while (opts.size < 4) {
      const offset = (Math.floor(Math.random() * 7) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const wrong = ans + offset;
      if (wrong >= 0) opts.add(wrong);
    }

    const shuffledOpts = Array.from(opts).sort(() => Math.random() - 0.5);

    setMathProblem({
      expr: `${n1} ${op === 'x' ? '×' : op} ${n2}`,
      answer: ans,
      options: shuffledOpts
    });
    setMathTimer(5);
    setMathFeedback(null);
  };

  const startMathGame = () => {
    setMathScore(0);
    setIsMathActive(true);
    generateMathProblem();
  };

  useEffect(() => {
    let timer: any;
    if (isMathActive && mathTimer > 0) {
      timer = setInterval(() => {
        setMathTimer(prev => prev - 1);
      }, 1000);
    } else if (isMathActive && mathTimer === 0) {
      soundAndSpeech.playError();
      setMathFeedback(`زمان تمام شد! پاسخ صحیح ${mathProblem.answer} بود.`);
      setTimeout(() => {
        generateMathProblem();
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isMathActive, mathTimer]);

  const handleMathAnswer = (selectedAns: number) => {
    if (!isMathActive) return;

    if (selectedAns === mathProblem.answer) {
      soundAndSpeech.playSuccess();
      const points = 30;
      setMathScore(prev => prev + points);
      setBrainScore(prev => prev + points);
      setMathFeedback('🎯 پاسخ صحیح! سرعت پردازش عالی (+۳۰ امتیاز)');
    } else {
      soundAndSpeech.playError();
      setMathFeedback(`❌ اشتباه! پاسخ درست ${mathProblem.answer} بود.`);
    }

    setTimeout(() => {
      generateMathProblem();
    }, 1000);
  };

  // --------------------------------------------------------------------------
  // GAME 4: MEMORY MATRIX TILE MATCH (کارت‌های حافظه شطرنجی)
  // --------------------------------------------------------------------------
  interface CardItem {
    id: number;
    icon: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);

  const initMemoryGame = () => {
    const duplicated = [...CARD_ICONS, ...CARD_ICONS];
    const shuffled = duplicated
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffled);
    setFlippedCards([]);
    setMemoryScore(0);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedCards.length >= 2) return;

    soundAndSpeech.playTick();

    const updated = [...cards];
    updated[index].isFlipped = true;
    setCards(updated);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const idx1 = newFlipped[0];
      const idx2 = newFlipped[1];

      if (cards[idx1].icon === cards[idx2].icon) {
        soundAndSpeech.playSuccess();
        setTimeout(() => {
          setCards(prev =>
            prev.map((c, i) => (i === idx1 || i === idx2 ? { ...c, isMatched: true } : c))
          );
          setFlippedCards([]);
          setMemoryScore(prev => prev + 40);
          setBrainScore(prev => prev + 40);
        }, 600);
      } else {
        soundAndSpeech.playError();
        setTimeout(() => {
          setCards(prev =>
            prev.map((c, i) => (i === idx1 || i === idx2 ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // --------------------------------------------------------------------------
  // GAME 5: SPORTS TRIVIA LEAGUE (لیگ اطلاعات عمومی ورزشی ایران)
  // --------------------------------------------------------------------------
  const [currentTriviaIdx, setCurrentTriviaIdx] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isTriviaAnswered, setIsTriviaAnswered] = useState(false);
  const [triviaGameActive, setTriviaGameActive] = useState(false);

  const currentTrivia = SPORTS_TRIVIA_QUESTIONS[currentTriviaIdx];

  const handleTriviaAnswer = (optIdx: number) => {
    if (isTriviaAnswered) return;
    setSelectedOptionIdx(optIdx);
    setIsTriviaAnswered(true);

    if (optIdx === currentTrivia.correctIndex) {
      soundAndSpeech.playSuccess();
      const points = 50;
      setTriviaScore(prev => prev + points);
      setBrainScore(prev => prev + points);
    } else {
      soundAndSpeech.playError();
    }
  };

  const nextTriviaQuestion = () => {
    if (currentTriviaIdx + 1 < SPORTS_TRIVIA_QUESTIONS.length) {
      setCurrentTriviaIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsTriviaAnswered(false);
    } else {
      // Completed all questions
      soundAndSpeech.playSuccess();
      alert(`🏆 تبریک! شما دور اول «لیگ اطلاعات عمومی ورزشی ایران» را به پایان رساندید. امتیاز کسب شده: ${triviaScore}`);
      setCurrentTriviaIdx(0);
      setSelectedOptionIdx(null);
      setIsTriviaAnswered(false);
    }
  };

  // Register Score to Loyalty Legends
  const handleRegisterToLoyalty = () => {
    soundAndSpeech.playSuccess();
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + brainScore
    }));
    setCompletedGames(prev => prev + 1);
    alert(`🎉 امتیاز ${brainScore} شما با موفقیت به "تالار مشاهیر وفاداران" اضافه شد!`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-blue-950/40 border-2 border-amber-500/40 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shrink-0">
              <div className="w-full h-full bg-[#121217] rounded-[14px] flex items-center justify-center">
                <Brain className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-extrabold gold-gradient-text">
                  🧠 باشگاه ورزش مغز، بازی‌های فکری و لیگ اطلاعات عمومی ورزشی
                </h2>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                  پیشگیری از آلزایمر & لیگ ایران
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                💡 <strong>چرا ورزش مغز الزامی است؟</strong> مغز هم جزئی از عضلات بدن است که نباید رها شود! همان‌گونه که عضلات بدن برای حفظ قدرت محتاج تمرین هستند، مغز نیز برای جلوگیری از حواس‌پرتی، پیری زودرس ذهنی و آلزایمر، نیازمند ورزش‌های فکری روزانه است (متد انحصاری اس‌ئی امیری / سیاوش).
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 bg-[#181820]/90 border border-amber-500/30 p-2.5 rounded-2xl shrink-0 w-full md:w-auto justify-around md:justify-start">
            <div className="text-center px-2">
              <span className="text-[10px] text-zinc-400 block">امتیاز مغز (Brain Score)</span>
              <span className="text-base font-extrabold text-amber-400">{brainScore}</span>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="text-center px-2">
              <span className="text-[10px] text-zinc-400 block">سن پویایی ذهنی</span>
              <span className="text-base font-extrabold text-emerald-400">۲۲ سال</span>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="text-center px-2">
              <span className="text-[10px] text-zinc-400 block">زنجیره تمرکز روزانه</span>
              <span className="text-base font-extrabold text-purple-400 flex items-center justify-center gap-0.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                {streakCount} روز
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: Register to Loyalty Legends */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>بازی‌های فوق‌العاده سبک، روان و بدون کوچک‌ترین فشار به سیستم (مناسب گوشی‌های ساده).</span>
          </div>
          <button
            onClick={handleRegisterToLoyalty}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-4 py-2 rounded-xl text-xs font-extrabold shadow-md transition-all shrink-0"
          >
            <Trophy className="w-4 h-4 text-black" />
            <span>ثبت امتیاز مغز در تالار مشاهیر وفاداران (+{brainScore})</span>
          </button>
        </div>
      </div>

      {/* Game Selector Tabs (5 Games including Trivia League) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <button
          onClick={() => {
            setActiveGame('stroop');
            soundAndSpeech.playTick();
          }}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between h-24 ${
            activeGame === 'stroop'
              ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
              : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-400">بازی ۱</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-bold block text-white">تست استروپ رنگی</span>
            <span className="text-[10px] text-zinc-400">انطباق و مهار کورتکس</span>
          </div>
        </button>

        <button
          onClick={() => {
            setActiveGame('pattern');
            soundAndSpeech.playTick();
          }}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between h-24 ${
            activeGame === 'pattern'
              ? 'bg-purple-500/15 border-purple-500 text-white shadow-lg shadow-purple-500/10'
              : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-purple-400">بازی ۲</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <span className="text-xs font-bold block text-white">الگوی فضایی گوهرها</span>
            <span className="text-[10px] text-zinc-400">حافظه ریتمیک کوتاه مدت</span>
          </div>
        </button>

        <button
          onClick={() => {
            setActiveGame('math');
            soundAndSpeech.playTick();
          }}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between h-24 ${
            activeGame === 'math'
              ? 'bg-blue-500/15 border-blue-500 text-white shadow-lg shadow-blue-500/10'
              : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-400">بازی ۳</span>
            <Flame className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <span className="text-xs font-bold block text-white">رفلکس سریع ریاضی</span>
            <span className="text-[10px] text-zinc-400">سرعت پردازش عددی</span>
          </div>
        </button>

        <button
          onClick={() => {
            setActiveGame('memory');
            soundAndSpeech.playTick();
          }}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between h-24 ${
            activeGame === 'memory'
              ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
              : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-400">بازی ۴</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold block text-white">کارت‌های حافظه</span>
            <span className="text-[10px] text-zinc-400">تطبیق تصاویر ورزشی</span>
          </div>
        </button>

        <button
          onClick={() => {
            setActiveGame('trivia');
            soundAndSpeech.playTick();
          }}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between h-24 col-span-2 sm:col-span-1 ${
            activeGame === 'trivia'
              ? 'bg-rose-500/20 border-rose-500 text-white shadow-lg shadow-rose-500/10'
              : 'bg-[#121217] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-rose-400">بازی ۵ (جدید)</span>
            <BookOpen className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <span className="text-xs font-bold block text-white">🏆 لیگ اطلاعات عمومی ورزشی</span>
            <span className="text-[10px] text-zinc-400">سوالات چهارگزینه‌ای ایران</span>
          </div>
        </button>
      </div>

      {/* ACTIVE GAME CONTAINER */}
      <div className="bg-[#121217] border border-zinc-800 rounded-3xl p-5 md:p-6 space-y-5">
        {/* GAME 1: STROOP TEST */}
        {activeGame === 'stroop' && (
          <div className="space-y-6 text-center">
            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
              <div className="text-right">
                <h3 className="text-sm md:text-base font-extrabold text-amber-400">
                  ⚡ آزمون استروپ (Stroop Test): چالش انطباق کلامی و رنگ
                </h3>
                <p className="text-xs text-zinc-400">
                  قانون: رنگ ظاهری نوشته را لمس کنید، نه معنی کلمه‌ای که نوشته شده!
                </p>
              </div>
              <div className="bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-xl text-xs font-bold text-amber-300">
                امتیاز این بازی: {stroopScore}
              </div>
            </div>

            {!isStroopActive ? (
              <div className="py-8 space-y-4">
                <Brain className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  این آزمون کورتکس پیش‌پیشانی مغز شما را مجبور می‌کند تا واکنش خودکار خواندن نوشته را مهار کرده و منحصراً رنگ ظاهری را شناسایی کند. تمرین عالی پیشگیری از آلزایمر.
                </p>
                <button
                  onClick={startStroopGame}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-2xl font-extrabold text-sm shadow-xl transition-all"
                >
                  🚀 شروع آزمون استروپ مغز
                </button>
              </div>
            ) : (
              <div className="space-y-6 py-4">
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden max-w-md mx-auto">
                  <div
                    className="bg-amber-400 h-full transition-all duration-1000"
                    style={{ width: `${(stroopTimer / 3) * 100}%` }}
                  />
                </div>

                <div className="py-8 bg-[#181820] rounded-2xl border border-zinc-800 max-w-md mx-auto flex flex-col items-center justify-center">
                  <span
                    className="text-4xl md:text-5xl font-black tracking-wider transition-all scale-110"
                    style={{ color: stroopColor.colorHex }}
                  >
                    {stroopWord.textFa}
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-3 font-semibold">
                    رنگ ظاهری متن چیست؟
                  </span>
                </div>

                {stroopFeedback && (
                  <div className="text-xs font-bold text-amber-300 bg-amber-950/30 border border-amber-500/30 p-2.5 rounded-xl max-w-md mx-auto">
                    {stroopFeedback}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-md mx-auto">
                  {COLOR_WORDS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleStroopAnswer(c.id)}
                      className="p-3 rounded-xl border border-zinc-700 bg-[#1a1a24] hover:border-amber-400 text-white text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: c.colorHex }}
                      />
                      <span>{c.textFa}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* GAME 2: SPATIAL PATTERN MEMORY */}
        {activeGame === 'pattern' && (
          <div className="space-y-6 text-center">
            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
              <div className="text-right">
                <h3 className="text-sm md:text-base font-extrabold text-purple-400">
                  💎 الگوی حافظه فضایی و ریتم گوهرها (Spatial Memory Pattern)
                </h3>
                <p className="text-xs text-zinc-400">
                  توالی درخشش گوهرهای گرانبها را به خاطر بسپارید و دقیقاً به همان ترتیب لمس کنید.
                </p>
              </div>
              <div className="bg-purple-950/40 border border-purple-500/30 px-3 py-1 rounded-xl text-xs font-bold text-purple-300">
                امتیاز الگوی حافظه: {patternScore}
              </div>
            </div>

            <div className="space-y-6 py-4">
              <p className="text-xs font-bold text-purple-300 bg-purple-950/30 border border-purple-500/30 p-2.5 rounded-xl max-w-md mx-auto">
                {patternStatus}
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                {gems.map(g => (
                  <button
                    key={g.id}
                    onClick={() => handleGemClick(g.id)}
                    disabled={isDisplayingSeq}
                    className={`h-28 rounded-2xl border-2 text-white font-extrabold text-sm flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                      activeGem === g.id
                        ? `${g.color} scale-105 shadow-2xl brightness-125`
                        : 'bg-[#181822] border-zinc-700 hover:border-purple-400 opacity-90'
                    }`}
                  >
                    <Sparkles className={`w-6 h-6 ${activeGem === g.id ? 'animate-spin' : ''}`} />
                    <span>گوهر {g.label}</span>
                  </button>
                ))}
              </div>

              {patternSeq.length === 0 && (
                <button
                  onClick={startPatternGame}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl font-extrabold text-sm shadow-xl transition-all"
                >
                  🚀 شروع بازی حافظه فضایی گوهرها
                </button>
              )}
            </div>
          </div>
        )}

        {/* GAME 3: FAST MENTAL MATH */}
        {activeGame === 'math' && (
          <div className="space-y-6 text-center">
            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
              <div className="text-right">
                <h3 className="text-sm md:text-base font-extrabold text-blue-400">
                  📐 رفلکس سریع محاسبات ذهنی (Fast Mental Math Reflex)
                </h3>
                <p className="text-xs text-zinc-400">
                  قبل از اتمام مهلت ۵ ثانیه‌ای، حاصل عبارت ریاضی را به درستی محاسبه و انتخاب کنید.
                </p>
              </div>
              <div className="bg-blue-950/40 border border-blue-500/30 px-3 py-1 rounded-xl text-xs font-bold text-blue-300">
                امتیاز محاسبات: {mathScore}
              </div>
            </div>

            {!isMathActive ? (
              <div className="py-8 space-y-4">
                <Flame className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  محاسبات ریاضی سریع به سرعت پردازش اطلاعات در مغز سرعت می‌بخشد و از بی‌پاسخی و کندی رفلکس‌های ذهنی جلوگیری می‌نماید.
                </p>
                <button
                  onClick={startMathGame}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-extrabold text-sm shadow-xl transition-all"
                >
                  🚀 شروع چالش محاسبات سریع
                </button>
              </div>
            ) : (
              <div className="space-y-6 py-4">
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden max-w-md mx-auto">
                  <div
                    className="bg-blue-400 h-full transition-all duration-1000"
                    style={{ width: `${(mathTimer / 5) * 100}%` }}
                  />
                </div>

                <div className="py-8 bg-[#181820] rounded-2xl border border-zinc-800 max-w-md mx-auto">
                  <span className="text-4xl md:text-5xl font-black text-blue-300 tracking-wider">
                    {mathProblem.expr} = ?
                  </span>
                </div>

                {mathFeedback && (
                  <div className="text-xs font-bold text-blue-300 bg-blue-950/30 border border-blue-500/30 p-2.5 rounded-xl max-w-md mx-auto">
                    {mathFeedback}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  {mathProblem.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleMathAnswer(opt)}
                      className="p-4 rounded-xl border border-zinc-700 bg-[#181822] hover:border-blue-400 text-white text-lg font-black transition-all shadow-md active:scale-95"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* GAME 4: MEMORY MATRIX TILE MATCH */}
        {activeGame === 'memory' && (
          <div className="space-y-6 text-center">
            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
              <div className="text-right">
                <h3 className="text-sm md:text-base font-extrabold text-emerald-400">
                  🎯 کارت‌های حافظه شطرنجی و تطبیق تصاویر (Memory Matrix)
                </h3>
                <p className="text-xs text-zinc-400">
                  کارت‌ها را دو به دو برگردانید و نمادهای علوم ورزشی جفت را پیدا کنید.
                </p>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-xl text-xs font-bold text-emerald-300">
                امتیاز حافظه شطرنجی: {memoryScore}
              </div>
            </div>

            <div className="space-y-6 py-2">
              <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    className={`h-16 sm:h-20 rounded-xl border text-2xl flex items-center justify-center transition-all duration-300 ${
                      card.isFlipped || card.isMatched
                        ? 'bg-emerald-950/60 border-emerald-500/80 scale-100 shadow-md'
                        : 'bg-[#181820] border-zinc-700 hover:border-zinc-500 hover:bg-[#20202a]'
                    }`}
                  >
                    {card.isFlipped || card.isMatched ? card.icon : '❓'}
                  </button>
                ))}
              </div>

              <button
                onClick={initMemoryGame}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold mx-auto transition-all shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>بازنشانی و ساخت چیدمان جدید کارت‌ها</span>
              </button>
            </div>
          </div>
        )}

        {/* GAME 5: SPORTS TRIVIA LEAGUE (لیگ اطلاعات عمومی ورزشی ایران) */}
        {activeGame === 'trivia' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-rose-400">
                  🏆 لیگ اطلاعات عمومی ورزشی ایران (سطح ملی)
                </h3>
                <p className="text-xs text-zinc-400">
                  سوالات چهارگزینه‌ای تخصصی ورزش ایران و المپیک؛ پاسخ دهید و امتیاز خود را در لیگ ثبت کنید.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-rose-950/60 border border-rose-500/40 px-3 py-1 rounded-xl text-xs font-bold text-rose-300">
                  سوال {currentTriviaIdx + 1} از {SPORTS_TRIVIA_QUESTIONS.length}
                </span>
                <span className="bg-amber-950/60 border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-bold text-amber-300">
                  امتیاز لیگ: {triviaScore}
                </span>
              </div>
            </div>

            <div className="bg-[#181822] border border-rose-500/30 rounded-2xl p-5 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <BookOpen className="w-4 h-4 text-rose-400" />
                <span>سوال چهارگزینه‌ای:</span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
                {currentTrivia.questionFa}
              </h4>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentTrivia.optionsFa.map((opt, idx) => {
                  let btnStyle = 'bg-[#121217] border-zinc-700 text-zinc-200 hover:border-rose-400';
                  if (isTriviaAnswered) {
                    if (idx === currentTrivia.correctIndex) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-extrabold';
                    } else if (idx === selectedOptionIdx) {
                      btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'bg-[#121217] border-zinc-800 text-zinc-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleTriviaAnswer(idx)}
                      disabled={isTriviaAnswered}
                      className={`p-3.5 rounded-xl border text-right text-xs font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      <span className="w-5 h-5 rounded-full border border-zinc-600 flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isTriviaAnswered && (
                <div className="space-y-3 pt-3 border-t border-zinc-800 animate-fadeIn">
                  <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                    selectedOptionIdx === currentTrivia.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                  }`}>
                    <strong>{selectedOptionIdx === currentTrivia.correctIndex ? '✅ پاسخ صحیح!' : '❌ پاسخ اشتباه!'}</strong>{' '}
                    {currentTrivia.explanationFa}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={nextTriviaQuestion}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all"
                    >
                      <span>سوال بعدی لیگ</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Future Preview Note */}
            <div className="bg-[#181820] border border-zinc-800 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-zinc-300">
              <Users className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <strong className="text-white block mb-0.5">آینده لیگ اطلاعات عمومی (فرد به فرد و تیمی):</strong>
                <span>به زودی در نسخه‌های بعدی، امکان رقابت آنلاین نفر به نفر (دوئل ورزشی) و مسابقات تیمی باشگاهی ایران در این بخش فعال خواهد شد.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NEURO-HEALTH & ALZHEIMER PREVENTION PROTOCOL */}
      <div className="bg-[#121217] border border-amber-500/30 rounded-3xl p-5 md:p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm md:text-base font-extrabold text-white">
            📜 ۵ اصل نورولوژی طلایی پیشگیری از آلزایمر و کندی مغز (متد اس‌ئی امیری)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-[#181822] p-3.5 rounded-2xl border border-zinc-800 space-y-1">
            <span className="font-extrabold text-amber-300 block">
              ۱. تمرینات ذهنی روزانه (Neurobic Exercises):
            </span>
            <p className="text-zinc-300 leading-relaxed">
              انجام روزانه بازی‌های فکری و لیگ اطلاعات عمومی، مغز را به ساخت سیناپس‌های جدید ترغیب کرده و ذخیره شناختی را به حداکثر می‌رساند.
            </p>
          </div>

          <div className="bg-[#181822] p-3.5 rounded-2xl border border-zinc-800 space-y-1">
            <span className="font-extrabold text-emerald-300 block">
              ۲. ورزش هوازی و قدرت عضلانی (افزایش BDNF):
            </span>
            <p className="text-zinc-300 leading-relaxed">
              تمرینات بدنسازی و کاردیو باعث ترشح فاکتور رشد عصبی مشتق از مغز (BDNF) شده و سلول‌های هیپوکامپ (مرکز حافظه) را بازسازی می‌کنند.
            </p>
          </div>

          <div className="bg-[#181822] p-3.5 rounded-2xl border border-zinc-800 space-y-1">
            <span className="font-extrabold text-purple-300 block">
              ۳. خواب عمیق و پاکسازی سیستم گلیمفاتیک:
            </span>
            <p className="text-zinc-300 leading-relaxed">
              خواب کیفیت‌دار ۷ الی ۸ ساعته شبانه، سیستم گلیمفاتیک مغز را فعال کرده و رسوبات پروتئینی بتا-آمیلوئید (عامل اصلی آلزایمر) را شستشو می‌دهد.
            </p>
          </div>

          <div className="bg-[#181822] p-3.5 rounded-2xl border border-zinc-800 space-y-1">
            <span className="font-extrabold text-blue-300 block">
              ۴. تغذیه تخصصی و آنتی‌اکسیدانی مغز:
            </span>
            <p className="text-zinc-300 leading-relaxed">
              مصرف اسیدهای چرب امگا ۳، زردچوبه، توت‌های سرشار از آنتی‌اکسیدان و هیدراسیون مناسب، التهابات عصبی را متوقف می‌سازد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
