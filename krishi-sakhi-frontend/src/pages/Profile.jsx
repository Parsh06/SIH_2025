import React, { useState } from 'react';
import Page from '../components/Page';
import Input from '../components/ui/input';
import Label from '../components/ui/label';
import Button from '../components/ui/button';
import { useI18n } from '../context/I18nContext';
import { useApp } from '../context/AppStore';

export default function Profile(){
  const { t } = useI18n();
  const { state, updateProfile } = useApp();
  const [form, setForm] = useState(state.profile);

  const onSave = () => updateProfile(form);

  return (
    <Page title={t["profile.title"]} subtitle={t["profile.subtitle"]}>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {name:'name', label:t["profile.name"]},
          {name:'phone', label:t["profile.phone"]},
          {name:'location', label:t["profile.location"]},
          {name:'landSize', label:t["profile.landSize"]},
          {name:'crop', label:t["profile.crop"]},
          {name:'soil', label:t["profile.soil"]},
          {name:'irrigation', label:t["profile.irrigation"]}
        ].map(f => (
          <div key={f.name}>
            <Label>{f.label}</Label>
            <Input value={form[f.name]||''} onChange={e=>setForm({...form, [f.name]: e.target.value})} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Button onClick={onSave}>{t["profile.save"]}</Button>
      </div>
    </Page>
  );
}
