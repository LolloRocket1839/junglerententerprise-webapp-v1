
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PropertyDetailsTab = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4 text-white/80">
      <div>
        <h4 className="font-semibold mb-2">{t('investmentFeatures')}</h4>
        <ul className="list-disc pl-4 space-y-2">
          <li>{t('annualReturn')}</li>
          <li>{t('minPeriod')}</li>
          <li>{t('profManagement')}</li>
          <li>{t('quarterlyReports')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">{t('taxBenefits')}</h4>
        <ul className="list-disc pl-4 space-y-2">
          <li>{t('taxDeductions')}</li>
          <li>{t('taxAdvice')}</li>
          <li>{t('returnOptimization')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">{t('propertyManagement')}</h4>
        <ul className="list-disc pl-4 space-y-2">
          <li>{t('scheduledMaintenance')}</li>
          <li>{t('cleaningService')}</li>
          <li>{t('insurance')}</li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetailsTab;
