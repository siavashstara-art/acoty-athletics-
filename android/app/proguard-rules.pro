# Proguard rules for Tavana City Athletics - EbarCity
-keepattributes *Annotation*
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class androidx.webkit.** { *; }
-dontwarn com.google.android.material.**
