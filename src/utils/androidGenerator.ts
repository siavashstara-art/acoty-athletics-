export interface AndroidPackageConfig {
  appName: string;
  packageName: string;
  versionName: string;
  versionCode: number;
  coachName: string;
}

export function generateAndroidManifest(config: AndroidPackageConfig): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${config.packageName}">

    <!-- دسترسی‌های رسمی جهت استورهای کافه بازار و مایکت -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="${config.appName}"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.TavanaSports">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:configChanges="orientation|keyboardHidden|screenSize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            
            <!-- پشتیبانی از دیپ‌لینک معرفان کافه بازار و مایکت -->
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="tavanasports" android:host="referral" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;
}

export function generateBuildGradle(config: AndroidPackageConfig): string {
  return `plugins {
    id 'com.android.application'
    id 'kotlin-android'
}

android {
    namespace '${config.packageName}'
    compileSdk 34

    defaultConfig {
        applicationId "${config.packageName}"
        minSdk 24
        targetSdk 34
        versionCode ${config.versionCode}
        versionName "${config.versionName}"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"

        // تنظیمات بیلد برای مایکت و کافه بازار
        manifestPlaceholders = [
            bazaarAppId: "${config.packageName}",
            myketAppId: "${config.packageName}"
        ]
    }

    // تنظیمات امنیتی امضای Release (برای تولید فایل APK نهایی و معتبر)
    signingConfigs {
        release {
            // خواندن امن اطلاعات امضا از متغیرهای محیطی یا فایل محلی امن
            storeFile file("keystore/ebarcity-release-key.jks")
            storePassword System.getenv("SIGNING_STORE_PASSWORD") ?: "default_password"
            keyAlias System.getenv("SIGNING_KEY_ALIAS") ?: "ebarkey"
            keyPassword System.getenv("SIGNING_KEY_PASSWORD") ?: "default_password"
        }
    }

    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            signingConfig signingConfigs.release
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.webkit:webkit:1.10.0'
    
    // درگاه پرداخت درون‌برنامه‌ای بازار و مایکت (اختیاری جهت فعال‌سازی لیگ معرفان)
    // implementation 'com.farsitel.bazaar:poolakey:2.2.0'
}`;
}

export function generateTermuxBuildScript(config: AndroidPackageConfig): string {
  return `#!/data/data/com.termux/files/usr/bin/bash
# ==============================================================================
# اسکریپت بیلد و تبدیل خودکار در ترموکس (Termux مخصوص گوشی ردمی نوت ۸)
# توسعه‌دهنده: آقای اکبر علی‌میری (سیاوش) | اکوسیستم توانا سیتی
# شناسه بسته: ${config.packageName}
# ==============================================================================

echo "🚀 آغاز فرایند آماده‌سازی اپلیکیشن ${config.appName} برای کافه بازار و مایکت..."

# ۱. به‌روزرسانی پکیج‌های پایه ترموکس
pkg update -y && pkg install -y openjdk-17 nodejs git

# ۲. ایجاد پوشه امن و ساخت کلید اختصاصی امضای ریلیز Keystore
mkdir -p keystore

export SIGNING_STORE_PASSWORD="TavanaCity2026@Release"
export SIGNING_KEY_ALIAS="ebarkey"
export SIGNING_KEY_PASSWORD="TavanaCity2026@Release"

if [ ! -f "keystore/ebarcity-release-key.jks" ]; then
    echo "🔑 در حال ساخت کلید امضای دیجیتال Keystore اختصاصی..."
    keytool -genkey -v -keystore keystore/ebarcity-release-key.jks \\
        -alias ebarkey \\
        -keyalg RSA \\
        -keysize 2048 \\
        -validity 10000 \\
        -dname "CN=Akbar Ali-Miri (Siavash), OU=TavanaCity Athletics, O=EbarCity, L=Tehran, C=IR" \\
        -storepass "$SIGNING_STORE_PASSWORD" \\
        -keypass "$SIGNING_KEY_PASSWORD"
    echo "✅ کلید امضا با موفقیت در keystore/ebarcity-release-key.jks ذخیره شد."
else
    echo "ℹ️ کلید امضای keystore/ebarcity-release-key.jks از قبل موجود است."
fi

# ۳. بیلد باندل و پکیج وب
echo "📦 در حال ساخت خروجی باندل پروژه..."
npm run build

# ۴. ساخت پکیج نهایی APK و AAB
echo "🔨 در حال تولید بسته Release امضاشده برای کافه بازار و مایکت..."
./gradlew assembleRelease bundleRelease

echo "✨ تمامی فایل‌های APK و AAB برای بسته ${config.packageName} آماده انتشار در مایکت و بازار هستند!"
echo "📍 مسیر فایل خروجی APK: app/build/outputs/apk/release/app-release.apk"
echo "📍 مسیر فایل خروجی AAB: app/build/outputs/bundle/release/app-release.aab"
`;
}
