
import React, { useState } from 'react';
import Page from '../components/Page';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import { useI18n } from '../context/I18nContext';
import { useApp } from '../context/AppStore';
import VoiceControls from '../components/VoiceControls';

export default function Activity(){
  const { t } = useI18n();
  const { state, addActivity, removeActivity } = useApp();
  const [text, setText] = useState('');
  const [type, setType] = useState('General');

  const add = () => {
    if (!text.trim()) return;
    addActivity({ text, type, when: new Date().toISOString() });
    setText('');
  };

  return (
    <Page title={t["activity.title"]} subtitle={t["activity.subtitle"]}>
      <div className="flex gap-2">
        <input className="input flex-1" placeholder={t["activity.placeholder"]} value={text} onChange={e=>setText(e.target.value)} />
        <Button onClick={add}>{t["action.add"]}</Button>
        <VoiceControls onResult={setText} />
      </div>
      <ul className="mt-4 space-y-2">
        {state.activities.map(a => (
          <li key={a.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{a.type}</div>
              <div className="text-soil-700">{a.text}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-soil-700">{new Date(a.when || Date.now()).toLocaleString()}</span>
              <Button variant="outline" onClick={()=>removeActivity(a.id)}>Delete</Button>
            </div>
          </li>
        ))}
        {state.activities.length===0 && <div className="text-soil-700">No activities yet.</div>}
      </ul>
    </Page>
  );
}
