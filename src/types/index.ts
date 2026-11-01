export type Language = 'fa' | 'en' | 'ku' | 'ur' | 'tr' | 'ar' | 'es' | 'fr' | 'de' | 'ru' | 'zh' | 'ja' | 'ko' | 'hi';

export type SeasonId = 'season-1' | 'season-2' | 'season-3' | 'season-4';

export interface SeasonInfo {
  id: SeasonId;
  numberFa: string;
  titleFa: string;
  titleEn: string;
  icon: string;
  descriptionFa: string;
  subModules: { id: string; label: string; scriptNum: string }[];
}

export interface GymWhiteLabelConfig {
  name: string;
  coach: string;
  phone: string;
  instagram: string;
  address: string;
  slogan: string;
  logoUrl: string;
  lang: Language;
  theme: 'dark-gold' | 'light-clean';
  brandColor: string;
}

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'legs'
  | 'core'
  | 'functional'
  | 'cardio';

export interface ExerciseItem {
  id: string;
  titleFa: string;
  titleEn: string;
  muscleGroup: MuscleGroup;
  primaryMuscleFa: string;
  secondaryMuscleFa: string;
  equipmentFa: string;
  difficulty: 'مبتدی' | 'متوسط' | 'پیشرفته';
  stepsFa: string[];
  mistakesFa: string[];
  proTipFa: string;
  recommendedSets: string;
  adhdMicroSteps: string[];
  iconType: string;
}

export interface HormoneItem {
  id: string;
  nameFa: string;
  nameEn: string;
  category: 'آنابولیک' | 'رشد و ترمیم' | 'کاتابولیک' | 'متابولیک';
  glandFa: string;
  roleFa: string;
  naturalBoostTips: string[];
  exogenousRisks: string;
  adhdFocusNote: string;
}

export interface WadaSubstanceItem {
  id: string;
  nameFa: string;
  nameEn: string;
  wadaClass: string;
  wadaCode: string;
  banStatus: 'ممنوع همیشگی (داخل و خارج مسابقه)' | 'ممنوع در حین مسابقه';
  targetOrgansAffected: string[];
  consequencesFa: string;
  commonCounterfeits: string;
  cleanAlternativeFa: string;
}

export interface BiomechanicsLeverItem {
  id: string;
  classType: 'اهرم نوع اول (تکیه‌گاه در وسط)' | 'اهرم نوع دوم (مقاومت/بار در وسط)' | 'اهرم نوع سوم (نیروی عضلانی در وسط)';
  titleFa: string;
  titleEn: string;
  fulcrumFa: string;
  effortForceFa: string;
  loadResistanceFa: string;
  mechanicalAdvantage: string;
  bodyExampleFa: string;
  exerciseApplicationFa: string;
  proTipFa: string;
}

export interface SportDisciplineAnatomy {
  id: string;
  sportFa: string;
  sportEn: string;
  icon: string;
  keyMusclesFa: string[];
  kineticChainFa: string;
  commonInjuriesFa: string;
  biomechanicsLawFa: string;
  neuromuscularDrillFa: string;
}

export interface EnergySystemItem {
  id: string;
  nameFa: string;
  nameEn: string;
  dominantDuration: string;
  fuelSourceFa: string;
  intensityLevel: string;
  sportExamplesFa: string;
  biochemicalMechanismFa: string;
  recoveryGuidelineFa: string;
}

export interface SupplementGradeItem {
  id: string;
  nameFa: string;
  nameEn: string;
  category: 'پروتئین و اسیدآمینه' | 'توان و قدرت' | 'استقامت و بافر لاکتات' | 'ریکاوری و خواب';
  evidenceGrade: 'گرید A (اثبات‌شده علمی WADA/ISSN)' | 'گرید B (امیدبخش و وابسته به هدف)';
  dosageFa: string;
  optimalTimingFa: string;
  mechanismFa: string;
  proTipFa: string;
}

export interface PeriodizationCycleItem {
  id: string;
  nameFa: string;
  nameEn: string;
  cycleType: 'ماکروسیکل (بلندمدت)' | 'مزوسیکل (میان‌مدت)' | 'میکروسیکل (کوتاه‌مدت)';
  timeFrameFa: string;
  objectiveFa: string;
  volumePercent: number; // 0 - 100
  intensityPercent: number; // 0 - 100
  keyFocusFa: string;
  proTipFa: string;
}

export interface TrainingSystemMethodItem {
  id: string;
  nameFa: string;
  nameEn: string;
  category: 'قدرت بیشینه' | 'هایپرتروفی عضلانی' | 'توان انفجاری' | 'استقامت و چابکی';
  setsRepsScheme: string;
  restIntervalFa: string;
  physiologicalAdaptationFa: string;
  howToExecuteFa: string[];
  bestSuitedForFa: string;
}

export interface ReferralUser {
  id: string;
  name: string;
  code: string;
  invitedCount: number;
  pointsEarned: number;
  rank: number;
  tier: 'برنزی' | 'نقره‌ای' | 'طلایی' | 'الماس پلاتینیوم';
  avatar: string;
  joinDate: string;
}

export interface LoyaltyLegend {
  id: string;
  rank: number;
  name: string;
  gymRole: string;
  city: string;
  loyaltyPoints: number;
  consecutiveDays: number;
  badge: string;
  quote: string;
  achievements: string[];
  avatar: string;
}

export interface UserProfile {
  isAuthenticated: boolean;
  authType: 'iranian-mobile' | 'google-global' | 'guest';
  phoneNumber?: string;
  email?: string;
  fullName: string;
  referralCode: string;
  referredBy?: string;
  myReferralPoints: number;
  myInvites: number;
  myLoyaltyPoints: number;
  streakDays: number;
  vipTier: string;
}

export interface AdhdSettings {
  isEnabled: boolean;
  highContrast: boolean;
  voiceNarration: boolean;
  timerDurationSeconds: number;
  fontSize: 'normal' | 'large' | 'extra-large';
}

export interface JointAngleBiomechanicsItem {
  id: string;
  titleFa: string;
  titleEn: string;
  chainType: 'زنجیره حرکتی بسته (CKC)' | 'زنجیره حرکتی باز (OKC)';
  safeAngleRange: string;
  riskAngleThreshold: string;
  shearForceWarning: string;
  correctionCuesFa: string[];
  proTipFa: string;
}

export interface SportsPathologyItem {
  id: string;
  injuryNameFa: string;
  injuryNameEn: string;
  anatomicalSite: 'زانو (ACL/مینیسک)' | 'شانه و روتاتور کاف' | 'ستون فقرات و دیسک کمری' | 'تاندون آشیل و مچ پا';
  injuryMechanismFa: string;
  vulnerabilityFactorFa: string;
  clinicalScreeningFa: string;
  preventionProtocolFa: string[];
}

export interface ReturnToPlayPhase {
  phaseNumber: number;
  phaseNameFa: string;
  phaseObjectiveFa: string;
  clinicalCriteriaFa: string;
  permittedActivitiesFa: string[];
  clearanceTestFa: string;
}

export interface PosturalCorrectionItem {
  id: string;
  conditionNameFa: string;
  conditionNameEn: string;
  descriptionFa: string;
  tightMusclesFa: string[];
  inhibitedMusclesFa: string[];
  correctiveExercisesFa: string[];
  dailyErgonomicTipFa: string;
  adhdMicroSteps: string[];
}

export interface SportsPsychologyModule {
  id: string;
  moduleNumber: number;
  badgeLabel: string;
  titleFa: string;
  titleEn: string;
  imageUrl: string;
  summaryFa: string[];
  keyTechniqueTitle: string;
  keyTechniqueSteps: string[];
  proTipFa: string;
  adhdMicroSteps: string[];
}

export interface SportsTechAssessmentModule {
  id: string;
  moduleNumbers: string;
  badgeLabel: string;
  titleFa: string;
  titleEn: string;
  imageUrl: string;
  summaryFa: string[];
  keyProtocolTitle: string;
  protocolDetails: { name: string; standard: string; metric: string }[];
  proTipFa: string;
  adhdMicroSteps: string[];
}

export interface InPersonPresentationConfig {
  gymName: string;
  managerName: string;
  coachName: string;
  gymType?: string;
  isActive: boolean;
}

export interface TehranGymPitchPreset {
  id: string;
  name: string;
  manager: string;
  coach: string;
  gymType: string;
  zoneFa: string;
}

export interface DeepHiddenMusclesModule {
  id: string;
  sectionNumber: number;
  icon: string;
  titleFa: string;
  titleEn: string;
  targetMusclesFa: string;
  summaryPointsFa: string[];
  scientificMechanismFa: string;
  executionStepsFa: string[];
  proTipFa?: string;
  adhdMicroSteps: string[];
  isLocked?: boolean;
}

export interface StrokeNeuroRehabItem {
  id: string;
  stageNameFa: string;
  stageNameEn: string;
  clinicalObjectiveFa: string;
  neurologicalMechanismFa: string; // e.g., نوروپلاستی و تحریک قشر حرکتی
  exercisesFa: string[];
  caregiverRoleFa: string[]; // نقش همراهان و خانواده در منزل
  adaptiveEquipmentFa: string; // تجهیزات فیزیوتراپی خانگی
  safetyWarningFa: string;
  adhdMicroSteps: string[];
}

export interface JournalArticle {
  id: string;
  titleFa: string;
  authorNameFa: string;
  authorRoleFa: string; // e.g., روانشناس ورزشی، حقوقدان، متخصص تغذیه، فیزیوتراپیست
  categoryFa: 'روانشناسی ورزشی' | 'حقوق ورزشی' | 'تمرینات ترک اعتیاد' | 'تغذیه تخصصی و رژیم‌شناسی' | 'مدیریت برنامه و ایجنسی ورزشکاران' | 'آسیب‌شناسی و بیومکانیک' | 'بازتوانی عصبی و سکته مغزی';
  abstractFa: string;
  contentParagraphsFa: string[];
  publishDate: string;
  readTimeMinutes: number;
  likesCount: number;
  tagsFa: string[];
  isVerifiedByEditor: boolean;
}

export interface AdCampaignSponsor {
  id: string;
  sponsorNameFa: string;
  categoryFa: 'باشگاه و آکادمی ورزشی' | 'تجهیزات بدنسازی' | 'مکمل‌های ورزشی' | 'کلینیک ترک اعتیاد ورزشی' | 'مشاوره حقوقی و روانشناسی' | 'کلینیک تغذیه ورزشی' | 'مدیریت برنامه و ایجنسی ورزشکاران' | 'تجهیزات پزشکی و فیزیوتراپی';
  logoOrBannerUrl: string;
  headlineFa: string;
  descriptionFa: string;
  contactPhone: string;
  websiteUrl: string;
  adPlacement: 'بنر اصلی (Hero)' | 'بنر مجله علمی' | 'کارت اختصاصی اسپانسر' | 'واترمارک پرزنت';
  discountCode?: string;
  isFeatured: boolean;
}





