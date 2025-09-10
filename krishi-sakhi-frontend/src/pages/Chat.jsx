import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import Page from "../components/Page";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import { useI18n } from "../context/I18nContext";
import { useChat } from "../context/ChatContext";

export default function Chat() {
  const { t } = useI18n();
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!text.trim() || isLoading) return;
    
    const userMessage = text.trim();
    setText("");
    await sendMessage(userMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Page title={t["chat.title"]}>
      <motion.div
        className="card p-4 h-[60vh] overflow-y-auto space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            className={`max-w-[75%] px-3 py-2 rounded-2xl ${
              m.role === "assistant"
                ? "bg-leaf-50"
                : "bg-white border border-leaf-200 ml-auto"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="whitespace-pre-wrap">{m.content}</div>
          </motion.div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            className="max-w-[75%] px-3 py-2 rounded-2xl bg-leaf-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-leaf-600"></div>
              <span className="text-sm text-gray-600">ക്രിഷി സഖി ചിന്തിക്കുന്നു...</span>
            </div>
          </motion.div>
        )}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </motion.div>
      
      <motion.div
        className="mt-3 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t["chat.placeholder"] || "നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക..."}
          disabled={isLoading}
        />
        <Button 
          onClick={send} 
          disabled={isLoading || !text.trim()}
          className="min-w-[80px]"
        >
          {isLoading ? "..." : (t["chat.send"] || "അയയ്ക്കുക")}
        </Button>
        <Button 
          onClick={clearChat}
          variant="outline"
          className="min-w-[80px]"
          disabled={isLoading}
        >
          {t["chat.clear"] || "മായ്ക്കുക"}
        </Button>
      </motion.div>
    </Page>
  );
}
