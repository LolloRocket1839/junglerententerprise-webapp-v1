import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { 
  PushNotifications, 
  Token, 
  PushNotificationSchema, 
  ActionPerformed 
} from '@capacitor/push-notifications';

export function useNotifications() {
  const [token, setToken] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if push notifications are supported
    if (Capacitor.isNativePlatform()) {
      setIsSupported(true);
      initializePushNotifications();
    } else if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const initializePushNotifications = async () => {
    try {
      // Request permission
      const permResult = await PushNotifications.requestPermissions();
      
      if (permResult.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration', (token: Token) => {
          setToken(token.value);
        });

        // Some issue with the registration
        PushNotifications.addListener('registrationError', (error: any) => {
          console.error('Error on registration: ', error);
        });

        // Show us the notification payload if the app is open on the device
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
          console.log('Push notification received: ', notification);
        });

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
          console.log('Push notification action performed', notification);
        });
      }
    } catch (error) {
      console.error('Error initializing push notifications:', error);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) {
      return false;
    }

    try {
      if (Capacitor.isNativePlatform()) {
        const result = await PushNotifications.requestPermissions();
        return result.receive === 'granted';
      } else {
        const permission = await Notification.requestPermission();
        setPermission(permission);
        return permission === 'granted';
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const showLocalNotification = async (title: string, body: string, data?: any) => {
    if (!isSupported) {
      return;
    }

    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor local notifications for native platforms
        const { LocalNotifications } = await import('@capacitor/local-notifications');
        await LocalNotifications.schedule({
          notifications: [
            {
              title,
              body,
              id: Date.now(),
              extra: data,
              iconColor: '#10B981',
              sound: 'default'
            }
          ]
        });
      } else {
        // Use Web Notification API for web
        if (permission === 'granted') {
          const notification = new Notification(title, {
            body,
            icon: '/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png',
            badge: '/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png',
            data
          });
          
          // Try to vibrate if supported
          if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
          }
        }
      }
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  };

  return {
    isSupported,
    permission,
    token,
    requestPermission,
    showLocalNotification
  };
}