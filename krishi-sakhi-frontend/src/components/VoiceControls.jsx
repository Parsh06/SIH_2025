import React, { useEffect, useRef, useState } from 'react';
import Button from './ui/button';
import Alert from './ui/alert';

export default function VoiceControls({ onResult }){
  const recRef = useRef(null);
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      setSupported(true);
      const rec = new SR();
      rec.lang = 'ml-IN'; // Malayalam by default
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        onResult && onResult(text);
      };
      rec.onend = () => setActive(false);
      recRef.current = rec;
    }
  }, [onResult]);

  const toggle = () => {
    if (!recRef.current) return;
    if (!active) {
      setActive(true);
      recRef.current.start();
    } else {
      recRef.current.stop();
      setActive(false);
    }
  };

  if (!supported) return <Alert variant="warn">Voice recognition not supported in this browser.</Alert>;

  return (
    <div className="flex items-center gap-2">
      <Button onClick={toggle}>{active ? "Stop" : "🎤 Speak"}</Button>
    </div>
  );
}
