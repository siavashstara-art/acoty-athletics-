import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  RotateCcw,
  Bone,
  CheckCircle2,
  AlertTriangle,
  Compass,
  ArrowRight,
  Sparkles,
  Volume2,
  Zap,
  Award,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  FileCheck
} from 'lucide-react';
import {
  AdhdSettings,
  JointAngleBiomechanicsItem,
  PosturalCorrectionItem,
  ReturnToPlayPhase,
  SportsPathologyItem,
  UserProfile
} from '../types/index.ts';
import {
  PACKAGE1_BIOMECHANICS_DATA,
  PACKAGE1_PATHOLOGY_DATA,
  PACKAGE1_POSTURAL_DATA,
  PACKAGE1_RTP_PHASES
} from '../data/sportsData.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface SportsRehabAndPathologyProps {
  adhdSettings: AdhdSettings;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onProceedNext?: () => void;
}

export const SportsRehabAndPathology: React.FC<SportsRehabAndPathologyProps> = ({
  adhdSettings,
  userProfile,
  setUserProfile,
  onProceedNext
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'biomech' | 'pathology' | 'rtp' | 'posture'>('biomech');
  const [selectedBioId, setSelectedBioId] = useState<string>(PACKAGE1_BIOMECHANICS_DATA[0].id);
  const [selectedPathId, setSelectedPathId] = useState<string>(PACKAGE1_PATHOLOGY_DATA[0].id);
  const [selectedPostureId, setSelectedPostureId] = useState<string>(PACKAGE1_POSTURAL_DATA[0].id);
  const [checkedAdhdSteps, setCheckedAdhdSteps] = useState<Record<string, boolean>>({});

  // Local state for Package 1 submission confirmation
  const [isPackageSaved, setIsPackageSaved] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tavana_package1_registered') === 'true';
    } catch {
      return false;
    }
  });

  const [saveToast, setSaveToast] = useState<string | null>(null);

  const handleSavePackage1 = () => {
    setIsPackageSaved(true);
    try {
      localStorage.setItem('tavana_package1_registered', 'true');
    } catch {
      // ignore
    }
    soundAndSpeech.playSuccessChime();
    setSaveToast('پکیج اول (آسیب‌شناسی، حرکات اصلاحی و بیومکانیک پیشرفته) با موفقیت در ایسیتی اتلتیکس ثبت و تایید گردید!');
    setTimeout(() => {
      setSaveToast(null);
    }, 4500);

    // Give bonus loyalty points
    setUserProfile(prev => ({
      ...prev,
      myLoyaltyPoints: prev.myLoyaltyPoints + 500
    }));

    if (adhdSettings.voiceNarration) {
      soundAndSpeech.speakText('پکیج اول آسیب‌شناسی و بیومکانیک با موفقیت ثبت شد.');
    }
  };

  const toggleAdhdStep = (stepKey: string) => {
    const next = !checkedAdhdSteps[stepKey];
    setCheckedAdhdSteps(prev => ({ ...prev, [stepKey]: next }));
    if (next) {
      soundAndSpeech.playSuccessChime();
    } else {
      soundAndSpeech.playTick();
    }
  };

  const currentBio = PACKAGE1_BIOMECHANICS_DATA.find(b => b.id === selectedBioId) || PACKAGE1_BIOMECHANICS_DATA[0];
  const currentPath = PACKAGE1_PATHOLOGY_DATA.find(p => p.id === selectedPathId) || PACKAGE1_PATHOLOGY_DATA[0];
  const currentPosture = PACKAGE1_POSTURAL_DATA.find(p => p.id === selectedPostureId) || PACKAGE1_POSTURAL_DATA[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Package 1 Hero Header Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#121217]">
        <div className="p-5 sm:p-7 relative z-10 bg-gradient-to-r from-[#181822] via-[#121217] to-[#1a1710]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold bg-black/60 px-3 py-1 rounded-full border border-[#d4af37]/30">
              <ShieldAlert className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span>پکیج ۱: آسیب‌شناسی، حرکات اصلاحی و بیومکانیک پیشرفته (ماژول‌های ۷ تا ۱۰)</span>
            </div>
            {isPackageSaved && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ثبت‌شده در ایسیتی اتلتیکس</span>
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
            مهندسی پیشگیری از آسیب، تحلیل زوایای مفصلی و بازگشت به ورزش
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-3xl leading-relaxed">
            مبتنی بر استانداردهای فدراسیون جهانی پزشکی ورزشی و متدولوژی اختصاصی خدمات‌جو (اس‌ئی امیری / سیاوش علی‌میری)؛ بهینه‌سازی گشتاورهای برشی، مهار ناهنجاری‌های اسکلتی و غربالگری پارگی ACL و دیسک کمری.
          </p>

          {/* Toast Notification */}
          {saveToast && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{saveToast}</span>
            </div>
          )}
        </div>
      </div>

      {/* 4 Modules Sub-Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => {
            setActiveSubTab('biomech');
            soundAndSpeech.playTick();
          }}
          className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
            activeSubTab === 'biomech'
              ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] font-bold shadow-md'
              : 'bg-[#121217] border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">ماژول ۷</span>
          </div>
          <span className="text-xs font-bold">۱. زوایای بیومکانیک و CKC/OKC</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('pathology');
            soundAndSpeech.playTick();
          }}
          className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
            activeSubTab === 'pathology'
              ? 'bg-[#00f2fe]/20 border-[#00f2fe] text-[#00f2fe] font-bold shadow-md'
              : 'bg-[#121217] border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">ماژول ۸</span>
          </div>
          <span className="text-xs font-bold">۲. پاتولوژی و نقاط بحرانی آسیب</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('rtp');
            soundAndSpeech.playTick();
          }}
          className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
            activeSubTab === 'rtp'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold shadow-md'
              : 'bg-[#121217] border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">ماژول ۹</span>
          </div>
          <span className="text-xs font-bold">۳. پروتکل بازگشت به مسابقه (RTP)</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('posture');
            soundAndSpeech.playTick();
          }}
          className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
            activeSubTab === 'posture'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md'
              : 'bg-[#121217] border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Bone className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">ماژول ۱۰</span>
          </div>
          <span className="text-xs font-bold">۴. حرکات اصلاحی ناهنجاری‌ها</span>
        </button>
      </div>

      {/* Module 7: Biomechanics & Angles Analysis */}
      {activeSubTab === 'biomech' && (
        <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#d4af37]" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  📐 ماژول ۷: بیومکانیک کاربردی و تحلیل زوایای اجرای حرکت
                </h3>
                <p className="text-xs text-zinc-400">
                  بررسی خطوط نیروی گرانش، گشتاورهای مفصلی و توزیع فشار روی زنجیره‌های حرکتی بسته و باز
                </p>
              </div>
            </div>
          </div>

          {/* Selector pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {PACKAGE1_BIOMECHANICS_DATA.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedBioId(item.id);
                  soundAndSpeech.playTick();
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  selectedBioId === item.id
                    ? 'bg-[#d4af37] text-black font-bold shadow'
                    : 'bg-[#181820] text-zinc-300 hover:text-white border border-zinc-800'
                }`}
              >
                {item.titleFa}
              </button>
            ))}
          </div>

          {/* Current Biomechanics Detail Card */}
          <div className="bg-[#181822] border border-[#d4af37]/30 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-[#d4af37] font-bold">
                  {currentBio.chainType}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                  {currentBio.titleFa}
                </h4>
                <p className="text-[11px] text-zinc-400 font-mono" dir="ltr">
                  {currentBio.titleEn}
                </p>
              </div>
              <button
                onClick={() => {
                  soundAndSpeech.speakText(`${currentBio.titleFa}. دامنه زوایای ایمن: ${currentBio.safeAngleRange}. نکته خدمات‌جو: ${currentBio.proTipFa}`);
                }}
                className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-[#d4af37]"
                title="قرائت صوتی"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-xl">
                <span className="text-emerald-400 font-bold block mb-1">
                  ✅ دامنه ایمن زاویه مفصل (Safe Range):
                </span>
                <p className="text-zinc-200 leading-relaxed">{currentBio.safeAngleRange}</p>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/30 p-3.5 rounded-xl">
                <span className="text-rose-400 font-bold block mb-1">
                  ⚠️ آستانه زاویه بحرانی و پرخطر (Risk Threshold):
                </span>
                <p className="text-zinc-200 leading-relaxed">{currentBio.riskAngleThreshold}</p>
              </div>
            </div>

            {/* Shear Force Warning */}
            <div className="bg-[#1e1c15] border-r-4 border-amber-500 p-3 rounded-lg text-xs">
              <span className="font-bold text-amber-300 block mb-1">
                ⚡ تحلیل گشتاور و نیروی برشی (Shear Force Analysis):
              </span>
              <p className="text-zinc-300 leading-relaxed">{currentBio.shearForceWarning}</p>
            </div>

            {/* Form Correction Cues */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-zinc-200">
                اصلاح خطاهای فرمی و استانداردهای قرارگیری:
              </h5>
              <ul className="space-y-1.5 text-xs text-zinc-300 pr-4 list-disc">
                {currentBio.correctionCuesFa.map((cue, idx) => (
                  <li key={idx}>{cue}</li>
                ))}
              </ul>
            </div>

            {/* Coach Siavash Pro-Tip */}
            <div className="bg-[#14141c] border border-[#d4af37]/40 p-3.5 rounded-xl text-xs">
              <div className="font-bold text-[#d4af37] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>متدولوژی خدمات‌جو (اس‌ئی امیری / سیاوش علی‌میری):</span>
              </div>
              <p className="text-zinc-300">{currentBio.proTipFa}</p>
            </div>
          </div>
        </div>
      )}

      {/* Module 8: Sports Pathology & Critical Injury Screen */}
      {activeSubTab === 'pathology' && (
        <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  ⚠️ ماژول ۸: پاتولوژی ورزشی و شناسایی نقاط بحرانی آسیب
                </h3>
                <p className="text-xs text-zinc-400">
                  شناخت مکانیزم‌های آسیب در تاندون‌ها، رباط‌ها (ACL) و دیسک‌های ستون فقرات + تست‌های غربالگری
                </p>
              </div>
            </div>
          </div>

          {/* Pathology buttons */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {PACKAGE1_PATHOLOGY_DATA.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedPathId(item.id);
                  soundAndSpeech.playTick();
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  selectedPathId === item.id
                    ? 'bg-rose-500 text-white font-bold shadow'
                    : 'bg-[#181820] text-zinc-300 hover:text-white border border-zinc-800'
                }`}
              >
                {item.injuryNameFa}
              </button>
            ))}
          </div>

          <div className="bg-[#181822] border border-rose-500/30 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold border border-rose-800">
                  موقعیت آسیب: {currentPath.anatomicalSite}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                  {currentPath.injuryNameFa}
                </h4>
                <p className="text-[11px] text-zinc-400 font-mono" dir="ltr">
                  {currentPath.injuryNameEn}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#1f1618] border-r-4 border-rose-500 p-3 rounded-lg">
                <span className="font-bold text-rose-300 block mb-1">
                  🩸 مکانیزم فیزیوپاتولوژیک آسیب (Mechanism of Injury):
                </span>
                <p className="text-zinc-200 leading-relaxed">{currentPath.injuryMechanismFa}</p>
              </div>

              <div className="bg-[#181820] p-3 rounded-lg border border-zinc-800">
                <span className="font-bold text-amber-300 block mb-1">
                  🔍 فاکتورهای آسیب‌پذیری و ضعف‌های پنهان عضلانی:
                </span>
                <p className="text-zinc-300 leading-relaxed">{currentPath.vulnerabilityFactorFa}</p>
              </div>

              <div className="bg-[#121c22] border border-cyan-500/30 p-3 rounded-lg">
                <span className="font-bold text-cyan-300 block mb-1">
                  🩺 تست‌های غربالگری بالینی و فانکشنال (Clinical Screening):
                </span>
                <p className="text-zinc-200 leading-relaxed">{currentPath.clinicalScreeningFa}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-emerald-400 block">
                  🛡️ پروتکل پیشگیرانه و تمرینات تقویتی اختصاصی:
                </span>
                <ul className="space-y-1.5 text-zinc-300 pr-4 list-disc">
                  {currentPath.preventionProtocolFa.map((proto, idx) => (
                    <li key={idx}>{proto}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module 9: Return to Play (RTP) Protocols */}
      {activeSubTab === 'rtp' && (
        <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  🔄 ماژول ۹: پروتکل‌های بازگشت به تمرین و مسابقه پس از آسیب (Rehab & Return to Play)
                </h3>
                <p className="text-xs text-zinc-400">
                  مراحل گام‌به‌گام توانبخشی ورزشی از فاز حاد تا صدور مجوز ترخیص و مسابقه پرفشار
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {PACKAGE1_RTP_PHASES.map(phase => (
              <div
                key={phase.phaseNumber}
                className="bg-[#181822] border border-zinc-800 hover:border-emerald-500/40 rounded-xl p-4 space-y-3 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-black text-xs font-black flex items-center justify-center">
                      {phase.phaseNumber}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {phase.phaseNameFa}
                    </h4>
                  </div>
                  <span className="text-[10px] text-zinc-400">
                    معیار بالینی: {phase.clinicalCriteriaFa}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-emerald-400">هدف این فاز:</strong> {phase.phaseObjectiveFa}
                </p>

                <div className="bg-[#14141c] p-3 rounded-lg space-y-1 text-xs">
                  <span className="text-zinc-400 text-[11px] block">فعالیت‌های مجاز:</span>
                  <ul className="pr-4 list-disc text-zinc-200 space-y-1">
                    {phase.permittedActivitiesFa.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-950/20 border-r-3 border-emerald-400 p-2.5 rounded text-[11px] text-emerald-200">
                  <strong>آزمون مجوز عبور به فاز بعد:</strong> {phase.clearanceTestFa}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module 10: Corrective Exercises & Postural Alignment */}
      {activeSubTab === 'posture' && (
        <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bone className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  🦴 ماژول ۱۰: حرکات اصلاحی تخصصی ناهنجاری‌های قامتی و اسکلتی
                </h3>
                <p className="text-xs text-zinc-400">
                  اصلاح گودی کمر (Lordosis)، پشت گرد (Kyphosis)، سر به جلو (Text Neck) و افت لگن
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {PACKAGE1_POSTURAL_DATA.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedPostureId(item.id);
                  soundAndSpeech.playTick();
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  selectedPostureId === item.id
                    ? 'bg-amber-500 text-black font-bold shadow'
                    : 'bg-[#181820] text-zinc-300 hover:text-white border border-zinc-800'
                }`}
              >
                {item.conditionNameFa}
              </button>
            ))}
          </div>

          <div className="bg-[#181822] border border-amber-500/30 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="border-b border-zinc-800 pb-3">
              <h4 className="text-sm sm:text-base font-bold text-amber-300">
                {currentPosture.conditionNameFa}
              </h4>
              <p className="text-[11px] text-zinc-400 font-mono" dir="ltr">
                {currentPosture.conditionNameEn}
              </p>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                {currentPosture.descriptionFa}
              </p>
            </div>

            {/* Tight vs Inhibited Muscles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-rose-950/20 border border-rose-500/30 p-3 rounded-xl">
                <span className="text-rose-400 font-bold block mb-1">
                  عضلات سفت و کوتاه‌شده (نیازمند کشش روزانه):
                </span>
                <ul className="list-disc pr-4 text-zinc-200 space-y-1">
                  {currentPosture.tightMusclesFa.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-xl">
                <span className="text-emerald-400 font-bold block mb-1">
                  عضلات مهارشده و ضعیف (نیازمند تقویت فعال):
                </span>
                <ul className="list-disc pr-4 text-zinc-200 space-y-1">
                  {currentPosture.inhibitedMusclesFa.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Corrective Exercise Prescription */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-zinc-200 block">
                تمرینات اصلاحی تجویز‌شده بر اساس متد خدمات‌جو:
              </span>
              <ul className="pr-4 list-disc text-zinc-300 space-y-1.5 leading-relaxed">
                {currentPosture.correctiveExercisesFa.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>

            {/* Ergonomic Tip */}
            <div className="bg-[#1f1c14] border-r-3 border-amber-400 p-3 rounded text-xs text-amber-200">
              <strong>نکته ارگونومی روزمره:</strong> {currentPosture.dailyErgonomicTipFa}
            </div>

            {/* ADHD Micro-Steps Interactive Checklist */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>ریزگام‌های تمرکز ADHD برای تمرین اصلاحی:</span>
                </div>
                <span className="text-[10px] text-amber-300/80">برای تایید کلیک کنید</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentPosture.adhdMicroSteps.map((step, idx) => {
                  const key = `${currentPosture.id}-${idx}`;
                  const isDone = checkedAdhdSteps[key];

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleAdhdStep(key)}
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
                      <span className="leading-snug">{step}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formal Submission Button for Package 1 */}
      <div className="pt-2">
        <button
          onClick={handleSavePackage1}
          className="w-full bg-gradient-to-r from-[#d4af37] via-[#f1d06b] to-[#b8860b] hover:from-[#e5c158] hover:to-[#a77a0a] text-black border-none rounded-2xl py-4 px-6 text-sm sm:text-base font-black cursor-pointer shadow-[0_4px_25px_rgba(212,175,55,0.4)] transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <FileCheck className="w-5 h-5 text-black" />
          <span>ثبت پکیج اول در ایسیتی اتلتیکس (ماژول‌های ۷ تا ۱۰)</span>
        </button>

        {isPackageSaved && (
          <div className="text-center mt-3 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>پکیج اول (آسیب‌شناسی و بیومکانیک پیشرفته) با موفقیت در سیستم تایید شد و ۵۰۰ امتیاز وفاداری به حساب شما افزوده گردید!</span>
          </div>
        )}
      </div>
    </div>
  );
};
