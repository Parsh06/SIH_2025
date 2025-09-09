
import React from 'react';
import Page from '../components/Page';
import Switch from '../components/ui/switch';

export default function Settings(){
  const [alerts, setAlerts] = React.useState(true);
  const [tts, setTts] = React.useState(false);

  return (
    <Page title="Settings">
      <div className="card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Enable alerts</div>
            <div className="text-sm text-soil-700">Receive reminders for tasks, weather, and schemes.</div>
          </div>
          <Switch checked={alerts} onChange={setAlerts} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Text-to-Speech</div>
            <div className="text-sm text-soil-700">Read out advisories in your language.</div>
          </div>
          <Switch checked={tts} onChange={setTts} />
        </div>
      </div>
    </Page>
  );
}
