import React, { memo } from 'react';
import { TFunction } from 'i18next';

interface RoommatePreferences {
  livingSpace: string;
  noiseLevel: string;
  guests: string;
  studyTime: string;
  studyStyle: string;
  socialLevel: string;
  foodSharing: string;
  sleepSchedule: string;
  pets: string;
  smoking: string;
  communication: string;
  conflict: string;
  cleaning: string;
  cleaningResponsibilities: string;
  temperature: string;
  personalItems: string;
}

interface FormContentProps {
  preferences: Partial<RoommatePreferences>;
  translations: any;
  saving: boolean;
  onPreferenceChange: (key: keyof RoommatePreferences, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  t: TFunction;
}

const FormContent: React.FC<FormContentProps> = ({
  preferences,
  translations,
  saving,
  onPreferenceChange,
  onSubmit,
  t
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {Object.entries(preferences).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <label className="block text-lg font-medium">
            {translations.questions[key as keyof typeof translations.questions]}
          </label>
          <select
            value={value || ''}
            onChange={(e) => onPreferenceChange(key as keyof RoommatePreferences, e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          >
            <option value="">{t('selectOption')}</option>
            {Object.entries(translations.options).map(([optionKey, optionValue]) => (
              <option key={optionKey} value={optionKey}>
                {optionValue}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {saving ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              {t('saving')}
            </div>
          ) : (
            t('saveChanges')
          )}
        </button>
      </div>
    </form>
  );
};

export default memo(FormContent); 