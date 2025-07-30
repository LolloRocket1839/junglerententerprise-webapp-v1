import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f0050b5f895b49bcbcecce443f0a0e6d',
  appName: 'junglerententerprise-webapp-v1',
  webDir: 'dist',
  server: {
    url: 'https://f0050b5f-895b-49bc-bcec-ce443f0a0e6d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;