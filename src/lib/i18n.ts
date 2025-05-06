
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import { translations } from '../translations';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        translation: translations.EN,
      },
      IT: {
        translation: translations.IT,
      },
      FR: {
        translation: translations.FR,
      },
      DE: {
        translation: translations.DE,
      },
    },
    lng: 'IT', // Default language
    fallbackLng: 'EN',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
