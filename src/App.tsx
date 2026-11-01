import React, { useState, useEffect } from 'react';
import {
  GymWhiteLabelConfig,
  AdhdSettings,
  UserProfile,
  ExerciseItem,
  ReferralUser,
  LoyaltyLegend,
  SeasonId
} from './types/index.ts';
import {
  INITIAL_EXERCISES,
  INITIAL_REFERRAL_LEAGUE,
  INITIAL_LOYALTY_LEGENDS,
  SEASONS_DATA
} from './data/sportsData.ts';
import { HeaderStamp } from './components/HeaderStamp.tsx';
import { FooterStamp } from './components/FooterStamp.tsx';
import { SeasonNavigator } from './components/SeasonNavigator.tsx';
import { ScriptOneWhiteLabel } from './components/ScriptOneWhiteLabel.tsx';
import { BiochemistryAndWada } from './components/BiochemistryAndWada.tsx';
import { BiomechanicsAndAnatomy } from './components/BiomechanicsAndAnatomy.tsx';
import { SportsRehabAndPathology } from './components/SportsRehabAndPathology.tsx';
import { SportsPsychologyAndFocus } from './components/SportsPsychologyAndFocus.tsx';
import { SportsTechAndAnalytics } from './components/SportsTechAndAnalytics.tsx';
import { SportsNutritionAndMetabolism } from './components/SportsNutritionAndMetabolism.tsx';
import { PeriodizationAndTrainingSystems } from './components/PeriodizationAndTrainingSystems.tsx';
import { SportsEncyclopedia } from './components/SportsEncyclopedia.tsx';
import { ReferralLeague } from './components/ReferralLeague.tsx';
import { LoyaltyLegends } from './components/LoyaltyLegends.tsx';
import { HamrazAfarinesh } from './components/HamrazAfarinesh.tsx';
import { AparatPromoStudio } from './components/AparatPromoStudio.tsx';
import { AndroidStoreExporter } from './components/AndroidStoreExporter.tsx';
import { DualAuthModal } from './components/DualAuthModal.tsx';
import { AdhdFocusTimerBar } from './components/AdhdFocusTimerBar.tsx';
import { DeepMusclesAndPitchPresenter } from './components/DeepMusclesAndPitchPresenter.tsx';
import { GlobalSearchAndGuideModal } from './components/GlobalSearchAndGuideModal.tsx';
import { CentralHeroBanner } from './components/CentralHeroBanner.tsx';
import { SportsJournalAndBlog } from './components/SportsJournalAndBlog.tsx';
import { SportsAdSponsorHub } from './components/SportsAdSponsorHub.tsx';
import { soundAndSpeech } from './utils/soundAndSpeech.ts';

const DEFAULT_WHITE_LABEL: GymWhiteLabelConfig = {
  name: 'باشگاه جهانی رویال (وایت‌لیبل رسمی)',
  coach: 'استاد سیاوش علی‌میری (اس‌ئی امیری)',
  phone: '09121112233',
  instagram: '@Global_Gym_Tavana',
  address: 'اکوسیستم آفرینش آفرینا جهان ایبل سیتی',
  slogan: 'تندیس اراده، سلامتی و افتخار در عصر نیو متاورس',
  logoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=80',
  lang: 'fa',
  theme: 'dark-gold',
  brandColor: '#d4af37'
};

const DEFAULT_ADHD: AdhdSettings = {
  isEnabled: false,
  highContrast: false,
  voiceNarration: false,
  timerDurationSeconds: 60,
  fontSize: 'normal'
};

const DEFAULT_PROFILE: UserProfile = {
  isAuthenticated: false,
  authType: 'guest',
  fullName: 'ورزشکار مهمان',
  referralCode: 'TAVANA-SPORT-77',
  myReferralPoints: 1200,
  myInvites: 12,
  myLoyaltyPoints: 3700,
  streakDays: 14,
  vipTier: 'طلایی VIP'
};

export default function App() {
  // Load persisted states from localStorage or defaults
  const [whiteLabel, setWhiteLabel] = useState<GymWhiteLabelConfig>(() => {
    try {
      const saved = localStorage.getItem('tavana_gym_whitelabel');
      return saved ? JSON.parse(saved) : DEFAULT_WHITE_LABEL;
    } catch {
      return DEFAULT_WHITE_LABEL;
    }
  });

  const [adhdSettings, setAdhdSettings] = useState<AdhdSettings>(() => {
    try {
      const saved = localStorage.getItem('tavana_adhd_settings');
      return saved ? JSON.parse(saved) : DEFAULT_ADHD;
    } catch {
      return DEFAULT_ADHD;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('tavana_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('deep-muscles');
  const [activeSeasonId, setActiveSeasonId] = useState<SeasonId>('season-4');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Sync activeSeasonId with activeTab
  useEffect(() => {
    if (['whitelabel'].includes(activeTab)) {
      setActiveSeasonId('season-1');
    } else if (['biochem', 'biomechanics', 'package1'].includes(activeTab)) {
      setActiveSeasonId('season-2');
    } else if (['nutrition', 'periodization', 'encyclopedia', 'package3'].includes(activeTab)) {
      setActiveSeasonId('season-3');
    } else {
      setActiveSeasonId('season-4');
    }
  }, [activeTab]);

  // Focus Timer state
  const [timerVisible, setTimerVisible] = useState(false);
  const [timerTitle, setTimerTitle] = useState('استراحت بین ست‌ها');
  const [timerDuration, setTimerDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('tavana_gym_whitelabel', JSON.stringify(whiteLabel));
  }, [whiteLabel]);

  useEffect(() => {
    localStorage.setItem('tavana_adhd_settings', JSON.stringify(adhdSettings));
  }, [adhdSettings]);

  useEffect(() => {
    localStorage.setItem('tavana_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Interval timer tick effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            soundAndSpeech.playSuccessChime();
            if (adhdSettings.voiceNarration) {
              soundAndSpeech.speakText('زمان استراحت به پایان رسید! آماده ست بعدی باشید.');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, adhdSettings.voiceNarration]);

  const handleStartTimer = (seconds: number, exerciseName: string) => {
    setTimerTitle(exerciseName);
    setTimerDuration(seconds);
    setTimeLeft(seconds);
    setIsTimerRunning(true);
    setTimerVisible(true);
    soundAndSpeech.playTick();
  };

  const handleAddReferral = (code: string) => {
    setUserProfile(prev => ({
      ...prev,
      myInvites: prev.myInvites + 1,
      myReferralPoints: prev.myReferralPoints + 200
    }));
  };

  const fontClass =
    adhdSettings.fontSize === 'extra-large'
      ? 'text-lg'
      : adhdSettings.fontSize === 'large'
      ? 'text-base'
      : 'text-sm';

  return (
    <div
      className={`min-h-screen bg-[#09090b] text-[#f8fafc] font-sans transition-colors ${
        adhdSettings.highContrast ? 'high-contrast' : ''
      } ${fontClass}`}
      dir="rtl"
    >
      {/* Official Header Stamp */}
      <HeaderStamp
        whiteLabel={whiteLabel}
        adhdSettings={adhdSettings}
        userProfile={userProfile}
        onToggleAdhd={() => {
          setAdhdSettings(prev => ({ ...prev, isEnabled: !prev.isEnabled }));
          soundAndSpeech.playTick();
        }}
        onToggleContrast={() => {
          setAdhdSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
          soundAndSpeech.playTick();
        }}
        onToggleVoice={() => {
          setAdhdSettings(prev => ({ ...prev, voiceNarration: !prev.voiceNarration }));
          soundAndSpeech.playTick();
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main App Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Central Hero Banner (Muscle Anatomy & Platform Identity) */}
        <CentralHeroBanner
          whiteLabel={whiteLabel}
          userProfile={userProfile}
          onOpenPitchPresenter={() => {
            setActiveTab('deep-muscles');
            soundAndSpeech.playTick();
          }}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenVipMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Four Seasons Top-Level Navigator */}
        <SeasonNavigator
          seasons={SEASONS_DATA}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSeasonId={activeSeasonId}
          setActiveSeasonId={setActiveSeasonId}
        />

        {activeTab === 'whitelabel' && (
          <ScriptOneWhiteLabel
            whiteLabel={whiteLabel}
            setWhiteLabel={setWhiteLabel}
            adhdSettings={adhdSettings}
            setAdhdSettings={setAdhdSettings}
            onProceedToScriptTwo={() => setActiveTab('biochem')}
          />
        )}

        {activeTab === 'biochem' && (
          <BiochemistryAndWada
            adhdSettings={adhdSettings}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onProceedNext={() => setActiveTab('biomechanics')}
          />
        )}

        {activeTab === 'biomechanics' && (
          <BiomechanicsAndAnatomy
            adhdSettings={adhdSettings}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onProceedNext={() => setActiveTab('package1')}
          />
        )}

        {activeTab === 'package1' && (
          <SportsRehabAndPathology
            adhdSettings={adhdSettings}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onProceedNext={() => setActiveTab('nutrition')}
          />
        )}

        {activeTab === 'nutrition' && (
          <SportsNutritionAndMetabolism
            adhdSettings={adhdSettings}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onProceedNext={() => setActiveTab('periodization')}
          />
        )}

        {activeTab === 'periodization' && (
          <PeriodizationAndTrainingSystems
            adhdSettings={adhdSettings}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onProceedNext={() => setActiveTab('encyclopedia')}
          />
        )}

        {activeTab === 'encyclopedia' && (
          <SportsEncyclopedia
            exercises={INITIAL_EXERCISES}
            adhdSettings={adhdSettings}
            onStartTimer={handleStartTimer}
            onProceedToNextScript={() => setActiveTab('referral')}
          />
        )}

        {activeTab === 'package3' && (
          <SportsTechAndAnalytics
            adhdSettings={adhdSettings}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onProceedNext={() => setActiveTab('deep-muscles')}
          />
        )}

        {activeTab === 'deep-muscles' && (
          <DeepMusclesAndPitchPresenter
            adhdSettings={adhdSettings}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onProceedNext={() => setActiveTab('package2')}
          />
        )}

        {activeTab === 'package2' && (
          <SportsPsychologyAndFocus
            adhdSettings={adhdSettings}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onProceedNext={() => setActiveTab('referral')}
          />
        )}

        {activeTab === 'referral' && (
          <ReferralLeague
            referralUsers={INITIAL_REFERRAL_LEAGUE}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onAddReferral={handleAddReferral}
          />
        )}

        {activeTab === 'loyalty' && (
          <LoyaltyLegends
            legends={INITIAL_LOYALTY_LEGENDS}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}

        {activeTab === 'blog' && (
          <SportsJournalAndBlog
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}

        {activeTab === 'ads' && (
          <SportsAdSponsorHub
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}

        {activeTab === 'hamraz' && <HamrazAfarinesh />}

        {activeTab === 'promo' && <AparatPromoStudio />}

        {activeTab === 'android' && <AndroidStoreExporter whiteLabel={whiteLabel} />}
      </main>

      {/* Floating ADHD & Rest Interval Timer */}
      {timerVisible && (
        <AdhdFocusTimerBar
          exerciseTitle={timerTitle}
          timeLeft={timeLeft}
          isRunning={isTimerRunning}
          onTogglePlayPause={() => {
            setIsTimerRunning(!isTimerRunning);
            soundAndSpeech.playTick();
          }}
          onReset={() => {
            setTimeLeft(timerDuration);
            setIsTimerRunning(false);
            soundAndSpeech.playTick();
          }}
          onClose={() => {
            setTimerVisible(false);
            setIsTimerRunning(false);
          }}
        />
      )}

      {/* Dual Authentication Modal */}
      <DualAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />

      {/* Global Search, Onboarding Map & Language Modal */}
      <GlobalSearchAndGuideModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        whiteLabel={whiteLabel}
        setWhiteLabel={setWhiteLabel}
      />

      {/* Official Footer Stamp */}
      <FooterStamp />
    </div>
  );
}
