
import React from 'react';
import Page from '../components/Page';
import Alert from '../components/ui/alert';
import { useI18n } from '../context/I18nContext';
import { useApp } from '../context/AppStore';

export default function Advisory(){
  const { t } = useI18n();
  const { state } = useApp();
  return (
    <Page title={t["advisory.title"]} subtitle={t["advisory.subtitle"]}>
      <div className="space-y-3">
        {state.advisories.map(a => (
          <Alert key={a.id} variant={a.severity}>
            <div className="font-medium">{a.title}</div>
            <div className="text-sm opacity-80">{new Date(a.time).toLocaleString()}</div>
          </Alert>
        ))}
      </div>
    </Page>
  );
}
