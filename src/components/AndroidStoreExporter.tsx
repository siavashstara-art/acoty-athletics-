import React, { useState } from 'react';
import {
  Smartphone,
  Copy,
  Check,
  Download,
  FileCode,
  Terminal,
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  AndroidPackageConfig,
  generateAndroidManifest,
  generateBuildGradle,
  generateTermuxBuildScript
} from '../utils/androidGenerator.ts';
import { GymWhiteLabelConfig } from '../types/index.ts';
import { soundAndSpeech } from '../utils/soundAndSpeech.ts';

interface AndroidStoreExporterProps {
  whiteLabel: GymWhiteLabelConfig;
}

export const AndroidStoreExporter: React.FC<AndroidStoreExporterProps> = ({ whiteLabel }) => {
  const [pkgName, setPkgName] = useState('ir.ebarcity.athletics');
  const [verName, setVerName] = useState('1.0.0');
  const [verCode, setVerCode] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState<'gradle' | 'manifest' | 'termux' | 'github'>('gradle');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const config: AndroidPackageConfig = {
    appName: whiteLabel.name,
    packageName: pkgName,
    versionName: verName,
    versionCode: verCode,
    coachName: whiteLabel.coach
  };

  const manifestContent = generateAndroidManifest(config);
  const gradleContent = generateBuildGradle(config);
  const termuxContent = generateTermuxBuildScript(config);
  const githubContent = `name: EbarCity Athletics Android Release CI/CD

on:
  push:
    branches: [ "main", "master" ]
  workflow_dispatch:

jobs:
  build-android:
    name: Build Signed Android APK & AAB
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Java JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Setup Node.js & Build Web Assets
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Web Dependencies & Build Web Project
        run: |
          npm ci
          npm run build

      - name: Decode Android Keystore File
        env:
          KEYSTORE_BASE64: \${{ secrets.ANDROID_KEYSTORE_BASE64 }}
        run: |
          mkdir -p android/app/keystore
          if [ -n "$KEYSTORE_BASE64" ]; then
            echo "$KEYSTORE_BASE64" | base64 --decode > android/app/keystore/ebarcity-release-key.jks
            echo "Keystore successfully decoded from GitHub Secrets."
          else
            echo "Generating auto-keystore..."
            keytool -genkey -v -keystore android/app/keystore/ebarcity-release-key.jks \\
              -alias ebarkey -keyalg RSA -keysize 2048 -validity 10000 \\
              -storepass default_password -keypass default_password \\
              -dname "CN=Akbar Ali Miri, OU=EbarCity Athletics, O=FB NewMeta Tavana City, L=Tehran, C=IR"
          fi

      - name: Build Release APK & AAB with Gradle
        working-directory: ./android
        env:
          SIGNING_STORE_PASSWORD: \${{ secrets.SIGNING_STORE_PASSWORD || 'default_password' }}
          SIGNING_KEY_ALIAS: \${{ secrets.SIGNING_KEY_ALIAS || 'ebarkey' }}
          SIGNING_KEY_PASSWORD: \${{ secrets.SIGNING_KEY_PASSWORD || 'default_password' }}
        run: |
          ./gradlew assembleRelease bundleRelease

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: ebarcity-athletics-release-apk
          path: android/app/build/outputs/apk/release/*.apk

      - name: Upload AAB (Bundle for Cafe Bazaar & Myket) Artifact
        uses: actions/upload-artifact@v4
        with:
          name: ebarcity-athletics-release-aab
          path: android/app/build/outputs/bundle/release/*.aab`;

  const handleCopyCode = (content: string, key: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    soundAndSpeech.playSuccessChime();
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    soundAndSpeech.playSuccessChime();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#12161f] via-[#121217] to-[#09090b] border-2 border-[#d4af37] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] mb-2">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>موتور اتوماتیک آماده‌سازی اندروید برای بازار و مایکت (الزامی بند ۲)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          ساختار گریدل (Gradle)، مانیفست، اتوماسیون گیت‌هاب و اسکریپت ترموکس برای ردمی نوت ۸
        </h2>
        <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
          تمام فایل‌های لازم برای تبدیل این وب‌اپلیکیشن به فایل‌های APK و AAB قابل انتشار در استورهای کافه بازار و مایکت، به همراه کلیدهای امضای اختصاصی ریلیز و اکشن گیت‌هاب به صورت خودکار فراهم شده است.
        </p>
      </div>

      {/* Package Configuration */}
      <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-amber-300">
          ⚙️ مشخصات بسته اندروید (Android Package Spec):
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">شناسه بسته (Package ID):</label>
            <input
              type="text"
              value={pkgName}
              onChange={e => setPkgName(e.target.value)}
              className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 font-mono"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">نسخه نمایشی (Version Name):</label>
            <input
              type="text"
              value={verName}
              onChange={e => setVerName(e.target.value)}
              className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 font-mono"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">کد عددی نسخه (Version Code):</label>
            <input
              type="number"
              value={verCode}
              onChange={e => setVerCode(Number(e.target.value))}
              className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 font-mono"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      {/* Code Tabs */}
      <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveSubTab('gradle')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'gradle'
                ? 'bg-[#d4af37] text-black shadow-md'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>فایل build.gradle</span>
          </button>

          <button
            onClick={() => setActiveSubTab('manifest')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'manifest'
                ? 'bg-[#d4af37] text-black shadow-md'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>فایل AndroidManifest.xml</span>
          </button>

          <button
            onClick={() => setActiveSubTab('termux')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'termux'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>اسکریپت ترموکس (Termux)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('github')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'github'
                ? 'bg-sky-500 text-black shadow-md'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>GitHub CI/CD Action</span>
          </button>
        </div>

        {/* Code Content Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-mono">
              {activeSubTab === 'gradle' && 'app/build.gradle'}
              {activeSubTab === 'manifest' && 'app/src/main/AndroidManifest.xml'}
              {activeSubTab === 'termux' && 'build_termux_redmi.sh'}
              {activeSubTab === 'github' && '.github/workflows/android-release.yml'}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const content =
                    activeSubTab === 'gradle'
                      ? gradleContent
                      : activeSubTab === 'manifest'
                      ? manifestContent
                      : activeSubTab === 'termux'
                      ? termuxContent
                      : githubContent;
                  handleCopyCode(content, activeSubTab);
                }}
                className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                {copiedKey === activeSubTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === activeSubTab ? 'کپی شد!' : 'کپی کد'}</span>
              </button>

              <button
                onClick={() => {
                  const filename =
                    activeSubTab === 'gradle'
                      ? 'build.gradle'
                      : activeSubTab === 'manifest'
                      ? 'AndroidManifest.xml'
                      : activeSubTab === 'termux'
                      ? 'build_termux_redmi.sh'
                      : 'android-release.yml';
                  const content =
                    activeSubTab === 'gradle'
                      ? gradleContent
                      : activeSubTab === 'manifest'
                      ? manifestContent
                      : activeSubTab === 'termux'
                      ? termuxContent
                      : githubContent;
                  handleDownloadFile(filename, content);
                }}
                className="flex items-center gap-1 bg-[#d4af37]/20 border border-[#d4af37]/40 hover:bg-[#d4af37]/30 text-[#d4af37] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود فایل</span>
              </button>
            </div>
          </div>

          <pre
            className="bg-[#0b0b0e] border border-zinc-800 p-4 rounded-xl text-xs text-emerald-300 font-mono overflow-x-auto max-h-80 leading-relaxed"
            dir="ltr"
          >
            {activeSubTab === 'gradle' && gradleContent}
            {activeSubTab === 'manifest' && manifestContent}
            {activeSubTab === 'termux' && termuxContent}
            {activeSubTab === 'github' && githubContent}
          </pre>
        </div>
      </div>

      {/* Bazaar & Myket Publishing Checklist */}
      <div className="bg-[#121217] border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3">
        <h3 className="text-sm font-bold text-[#d4af37] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>چک‌لیست انتشار قطعی در کافه بازار و مایکت:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
          <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800">
            <span className="font-bold text-amber-300 block mb-1">۱. آیکون رسمی برنامه:</span>
            <span>ابعاد ۵۱۲×۵۱۲ پیکسل PNG شفاف با گوشه‌های منحنی طبق استاندارد بازار.</span>
          </div>

          <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800">
            <span className="font-bold text-amber-300 block mb-1">۲. امضای دیجیتال Keystore:</span>
            <span>استفاده از کلید tavana-release.jks با رمز امن تعریف‌شده در اسکریپت ترموکس.</span>
          </div>

          <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800">
            <span className="font-bold text-amber-300 block mb-1">۳. اسکرین‌شات‌های موبایلی:</span>
            <span>ثبت ۳ الی ۵ اسکرین‌شات با تم مشکی و طلایی آریا گلد از صفحه آناتومی و وایت‌لیبل.</span>
          </div>

          <div className="bg-[#181820] p-3 rounded-xl border border-zinc-800">
            <span className="font-bold text-amber-300 block mb-1">۴. پشتیبانی از اندروید ۵ به بالا:</span>
            <span>تنظیم minSdk: 21 و targetSdk: 34 جهت سازگاری با تمام گوشی‌های شیائومی و سامسونگ.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
