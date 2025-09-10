import { motion } from 'framer-motion';
import React from 'react';
import { useI18n } from '../context/I18nContext';
import schemesData from "../data/schemeData";
import Card from '../components/ui/card';

const externalLinks = {
    1: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/pradhan-mantri-kisan-samman-nidhi?lgn=en', // PM Kisan Samman Nidhi
    2: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/pm-kisan-maan-dhan-yojana?lgn=en', // PM Kisan Maan Dhan Yojana
    3: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/credit-facility-for-farmers?lgn=en', // Credit facility for farmers
    4: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/crop-insurance-schemes?lgn=en', // Crop insurance schemes
    5: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/pradhan-mantri-krishi-sinchai-yojana?lgn=en', // PM Krishi Sinchai Yojana
    6: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/interest-subvention-for-dairy-sector?lgn=en', // Interest subvention for dairy sector
    7: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/national-scheme-of-welfare-of-fishermen?lgn=en',
    8: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/agriculture-infrastructure-fund?lgn=en',
    9: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/kcc-for-animal-husbandry-and-fisheries?lgn=en',
    10: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/national-mission-on-edible-oils?lgn=en',
    11: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/krishi-udan-scheme?lgn=en',
    12: 'https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers/group-accident-insurance-scheme-for-fishermen?lgn=en',
};

export default function Schemes() {
  const { t } = useI18n();

  const handleSchemeClick = (schemeId) => {
    const externalUrl = externalLinks[schemeId];
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-soil-900">{t['schemes.title']}</h1>
        <p className="text-soil-600">{t['schemes.subtitle']}</p>
      </motion.div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemesData.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border border-leaf-200 hover:border-leaf-300"
              onClick={() => handleSchemeClick(scheme.id)}
            >
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-soil-900 line-clamp-2">
                  {scheme.name}
                </h3>
                <p className="text-soil-600 text-sm leading-relaxed line-clamp-3">
                  {scheme.description}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center text-leaf-600 text-sm font-medium">
                    {t['schemes.learnMore']}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      <motion.div 
        className="mt-8 p-6 bg-leaf-50 rounded-xl border border-leaf-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-soil-900 mb-2">
              {t['schemes.info.title']}
            </h3>
            <p className="text-soil-600 text-sm">
              {t['schemes.info.description']}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
