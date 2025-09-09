
import React, { useState } from 'react';
import Page from '../components/Page';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { useI18n } from '../context/I18nContext';

export default function Chat(){
  const { t } = useI18n();
  const [messages, setMessages] = useState([{role:'assistant', content:'How can I help you today?'}]);
  const [text, setText] = useState('');

  const send = () => {
    if(!text.trim()) return;
    setMessages(m => [...m, {role:'user', content:text}, {role:'assistant', content:'(Demo) Not connected to backend yet.'}]);
    setText('');
  };

  return (
    <Page title={t["chat.title"]}>
      <div className="card p-4 h-[60vh] overflow-y-auto space-y-2">
        {messages.map((m,i)=>(
          <div key={i} className={`max-w-[75%] px-3 py-2 rounded-2xl ${m.role==='assistant'?'bg-leaf-50':'bg-white border border-leaf-200 ml-auto'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask about your crop…" />
        <Button onClick={send}>{t["action.send"]||'Send'}</Button>
      </div>
    </Page>
  );
}
