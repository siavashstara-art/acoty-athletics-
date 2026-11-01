// ==============================================================================
// EbarCity Athletics - Automated Environment & Secret Manager
// Author: Akbar Alimiri (Siavash / SE Amiri)
// Ensures zero manual typing on Redmi Note 8 mobile (Termux/Acode)
// ==============================================================================

export interface AppEnvConfig {
  appName: string;
  packageId: string;
  versionName: string;
  defaultLang: string;
  googleClientId: string;
  smsGatewayApiKey: string;
  keystoreAlias: string;
  keystoreFile: string;
  keystorePass: string;
  isAutoConfigured: boolean;
}

export const autoEnv: AppEnvConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'EbarCity Athletics',
  packageId: import.meta.env.VITE_APP_ID || 'ir.ebarcity.athletics',
  versionName: import.meta.env.VITE_APP_VERSION || '1.0.0',
  defaultLang: import.meta.env.VITE_DEFAULT_LANG || 'fa',
  googleClientId:
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    '987654321000-tavanaebarcity.apps.googleusercontent.com',
  smsGatewayApiKey:
    import.meta.env.VITE_SMS_GATEWAY_API_KEY ||
    'auto_generated_tavana_sms_gateway_key',
  keystoreAlias: 'ebarkey',
  keystoreFile: 'keystore/ebarcity-release-key.jks',
  keystorePass: 'TavanaCity2026@ReleaseKey',
  isAutoConfigured: true
};

/**
 * Returns automated authentication headers so Iranian SMS gateway & Google OAuth
 * operate without manual mobile key entry.
 */
export function getAutomatedAuthHeaders(): Record<string, string> {
  return {
    'X-Tavana-App-ID': autoEnv.packageId,
    'X-Tavana-Developer': 'Akbar Alimiri (Siavash)',
    'X-Tavana-Platform': 'Redmi Note 8 Android 11 Mobile Automation',
    'Authorization': `Bearer ${autoEnv.smsGatewayApiKey}`
  };
}
