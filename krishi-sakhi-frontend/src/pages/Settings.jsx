import { motion } from 'framer-motion';
import React from 'react';
import Page from '../components/Page';
import Switch from '../components/ui/switch';
import { useI18n } from '../context/I18nContext';

export default function Settings(){
  const { t } = useI18n();
  const [alerts, setAlerts] = React.useState(true);
  const [tts, setTts] = React.useState(false);

  return (
    <Page title={t['settings.title']}>
      <motion.div 
        className="card p-4 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <div className="font-medium">{t['settings.enableAlerts']}</div>
            <div className="text-sm text-soil-700">{t['settings.alertsDescription']}</div>
          </div>
          <Switch checked={alerts} onChange={setAlerts} />
        </motion.div>
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <div className="font-medium">{t['settings.textToSpeech']}</div>
            <div className="text-sm text-soil-700">{t['settings.ttsDescription']}</div>
          </div>
          <Switch checked={tts} onChange={setTts} />
        </motion.div>
      </motion.div>
    </Page>
  );
}
