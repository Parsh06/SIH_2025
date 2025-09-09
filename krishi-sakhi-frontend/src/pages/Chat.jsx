
import { motion } from 'framer-motion';
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
      <motion.div 
        className="card p-4 h-[60vh] overflow-y-auto space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {messages.map((m,i)=>(
          <motion.div 
            key={i} 
            className={`max-w-[75%] px-3 py-2 rounded-2xl ${m.role==='assistant'?'bg-leaf-50':'bg-white border border-leaf-200 ml-auto'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {m.content}
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        className="mt-3 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Input value={text} onChange={e=>setText(e.target.value)} placeholder={t["chat.placeholder"]} />
        <Button onClick={send}>{t["action.send"]}</Button>
      </motion.div>
    </Page>
  );
}
