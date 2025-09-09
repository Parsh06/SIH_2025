import React, { useState } from 'react';
import Page from '../components/Page';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { useI18n } from '../context/I18nContext';
import { useApp } from '../context/AppStore';

export default function Reminders(){
  const { t } = useI18n();
  const { state, setState } = useApp();
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const add = () => {
    if (!text || !date) return;
    setState(s => ({ ...s, reminders: [...s.reminders, { id: Date.now(), text, due: new Date(date).toISOString() }]}));
    setText(''); setDate('');
  };

  const remove = (id) => setState(s => ({ ...s, reminders: s.reminders.filter(r=>r.id!==id)}));

  return (
    <Page title={t["reminders.title"]}>
      <div className="grid md:grid-cols-3 gap-2">
        <Input placeholder="Reminder text" value={text} onChange={e=>setText(e.target.value)} />
        <Input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <Button onClick={add}>{t["action.add"]}</Button>
      </div>
      <ul className="mt-4 space-y-2">
        {state.reminders.map(r => (
          <li key={r.id} className="card p-4 flex items-center justify-between">
            <div>{r.text}</div>
            <div className="flex items-center gap-3">
              <span className="text-sm">{new Date(r.due).toLocaleDateString()}</span>
              <Button variant="outline" onClick={()=>remove(r.id)}>{t["action.delete"]}</Button>
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}
