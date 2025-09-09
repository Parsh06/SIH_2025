
import React from 'react';
import Page from '../components/Page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import Badge from '../components/ui/badge';
import { useI18n } from '../context/I18nContext';
import { useApp } from '../context/AppStore';

export default function Dashboard(){
  const { t } = useI18n();
  const { state } = useApp();
  return (
    <Page title={`${t["welcome"]}, ${state.profile.name || 'Farmer'}`} subtitle={t["footer"]}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t["nav.advisory"]}</CardTitle>
            <CardDescription>{t["advisory.subtitle"]}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {state.advisories.slice(0,3).map(a => (
              <div key={a.id} className="flex items-start gap-2">
                <Badge>{new Date(a.time).toLocaleDateString()}</Badge>
                <div>{a.title}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t["nav.activity"]}</CardTitle>
            <CardDescription>{t["activity.subtitle"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {state.activities.slice(0,4).map(act => (
                <li key={act.id} className="flex items-start gap-2">
                  <Badge>{act.type||'Activity'}</Badge>
                  <div>{act.text}</div>
                </li>
              ))}
              {state.activities.length===0 && <div className="text-soil-700">No activities yet.</div>}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t["nav.reminders"]}</CardTitle>
            <CardDescription>Upcoming tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {state.reminders.map(r => (
              <div key={r.id} className="flex items-center justify-between">
                <div>{r.text}</div>
                <Badge>{new Date(r.due).toLocaleDateString()}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
