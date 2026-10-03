'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Mic, Volume2, VolumeX } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext' // <-- Import ajouté

export function ChatWidget({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void 
}) {
  const { t, lang } = useLanguage() // <-- Hook ajouté
  
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isVoiceMode, setIsVoiceMode] = useState(true)
  
  const { messages, sendMessage, status } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  
  const isLoading = status === 'submitted' || status === 'streaming'

  // Détermine la langue pour la parole (voix)
  const speechLang = lang === 'fr' ? 'fr-FR' : 'en-US'

  // 1. Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = speechLang; // <-- Langue dynamique
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          sendMessage({ text: transcript });
          setInput('');
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [lang]); // <-- Se met à jour si la langue change

  // 2. Text-to-Speech for AI Replies
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    
    if (!isLoading && isVoiceMode && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const textToSpeak = lastMessage.parts.map((part: any) => part.type === 'text' ? part.text : '').join('');
        if (textToSpeak) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = speechLang; // <-- Langue dynamique
          window.speechSynthesis.speak(utterance);
        }
      }
    }
  }, [messages, isLoading, isVoiceMode, lang]);

  // 3. Speak Welcome Message on Mount (Page Reload)
  useEffect(() => {
    if (isVoiceMode && isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(t.chat.welcomeSpeech);
        utterance.lang = speechLang; // <-- Langue dynamique
        window.speechSynthesis.speak(utterance);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, lang]);

  // Stop audio immediately when the user clicks mute
  useEffect(() => {
    if (!isVoiceMode) {
      window.speechSynthesis?.cancel();
    }
  }, [isVoiceMode]);

  // Stop speaking if the chat is closed
  useEffect(() => {
    if (!isOpen) {
      window.speechSynthesis?.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input }) 
    setInput('')
  }

  const handleQuickPrompt = (text: string) => {
    if (isLoading) return;
    sendMessage({ text });
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-muted/50 p-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-foreground font-semibold text-sm">{t.chat.headerTitle}</h3> {/* <-- Traduit */}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsVoiceMode(!isVoiceMode)} 
                className={`text-muted-foreground hover:text-foreground transition-colors ${isVoiceMode ? 'text-blue-500' : ''}`}
                title={isVoiceMode ? t.chat.mute : t.chat.unmute} // <-- Traduit
              >
                {isVoiceMode ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            {messages.length === 0 && (
              <div className="text-muted-foreground text-sm text-center mt-8 space-y-4">
                <p className="text-foreground font-semibold text-base">{t.chat.welcomeTitle}</p> {/* <-- Traduit */}
                <p className="text-muted-foreground px-2">
                  {t.chat.welcomeDesc} {/* <-- Traduit */}
                </p>
                
                <div className="flex flex-col gap-2 mt-6 text-left">
                  <button 
                    onClick={() => handleQuickPrompt(t.chat.prompt1Text)}
                    className="bg-muted hover:bg-muted/70 text-foreground text-xs p-2.5 rounded-lg border border-border transition-colors flex items-center gap-2"
                  >
                    {t.chat.prompt1Label} {/* <-- Traduit */}
                  </button>
                  <button 
                    onClick={() => handleQuickPrompt(t.chat.prompt2Text)}
                    className="bg-muted hover:bg-muted/70 text-foreground text-xs p-2.5 rounded-lg border border-border transition-colors flex items-center gap-2"
                  >
                    {t.chat.prompt2Label} {/* <-- Traduit */}
                  </button>
                  <button 
                    onClick={() => handleQuickPrompt(t.chat.prompt3Text)}
                    className="bg-muted hover:bg-muted/70 text-foreground text-xs p-2.5 rounded-lg border border-border transition-colors flex items-center gap-2"
                  >
                    {t.chat.prompt3Label} {/* <-- Traduit */}
                  </button>
                </div>
              </div>
            )}
            
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                  m.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                    : 'bg-muted text-foreground rounded-bl-none'
                }`}>
                  {m.parts.map((part: any, i: number) => {
                    if (part.type === 'text') {
                      return <span key={i}>{part.text}</span>
                    }
                    return null
                  })}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-2xl text-sm text-muted-foreground">
                  {t.chat.typing} {/* <-- Traduit */}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={onSubmit} className="p-3 border-t border-border bg-card flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.inputPlaceholder} // <-- Traduit
              className="flex-1 bg-background text-foreground text-sm rounded-full px-4 py-2 outline-none border border-border focus:border-primary transition-colors"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground p-2.5 rounded-full transition-colors flex items-center justify-center"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Floating Action Button with Text & Animations */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={isOpen ? { 
          scale: 1, 
          opacity: 1 
        } : { 
          scale: 1, 
          opacity: 1,
          boxShadow: [
            '0 0 0 0px rgba(37, 99, 235, 0.5)', 
            '0 0 0 12px rgba(37, 99, 235, 0)'
          ] 
        }}
        transition={{ 
          scale: { type: 'spring', stiffness: 200 },
          opacity: { duration: 0.2 },
          boxShadow: { duration: 2, repeat: Infinity, ease: 'easeOut' }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X className="shrink-0" size={27} />
        ) : (
          <>
            <Bot className="shrink-0" size={27} />
            <span className="max-w-0 group-hover:max-w-[250px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden font-medium text-sm pl-0 group-hover:pl-2">
              {t.chat.fabText} {/* <-- Traduit */}
            </span>
          </>
        )}
      </motion.button>
    </div>
  )
}