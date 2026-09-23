'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { MessageCircle, X, Send, Mic, Volume2, VolumeX } from 'lucide-react'

export function ChatWidget({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void 
}) {
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isVoiceMode, setIsVoiceMode] = useState(true)
  
  const { messages, sendMessage, status } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  
  const isLoading = status === 'submitted' || status === 'streaming'

  // 1. Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; 
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
  }, []);

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
          utterance.lang = 'en-US';
          window.speechSynthesis.speak(utterance);
        }
      }
    }
  }, [messages, isLoading, isVoiceMode]);

  // 3. Speak Welcome Message on Mount (Page Reload)
  useEffect(() => {
    if (isVoiceMode && isOpen && messages.length === 0) {
      const welcomeText = "Hello! I'm Med Amine's AI Assistant. I can help you learn about his FullStack experience, tech stack, and availability for new roles.";
      
      const timer = setTimeout(() => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(welcomeText);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }, 500); // Small delay to let the browser load

      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array means this only runs once on mount

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
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] h-[500px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-zinc-800 p-4 flex items-center justify-between border-b border-zinc-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-white font-semibold text-sm">Med Amine's AI Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsVoiceMode(!isVoiceMode)} 
                className={`text-zinc-400 hover:text-white transition-colors ${isVoiceMode ? 'text-blue-500' : ''}`}
                title={isVoiceMode ? "Mute AI Voice" : "Unmute AI Voice"}
              >
                {isVoiceMode ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {messages.length === 0 && (
              <div className="text-zinc-400 text-sm text-center mt-8 space-y-4">
                <p className="text-white font-semibold text-base">👋 Hello! I'm Med Amine's AI Assistant.</p>
                <p className="text-zinc-500 px-2">
                  I can help you learn about his FullStack experience, tech stack, and availability for new roles.
                </p>
                
                <div className="flex flex-col gap-2 mt-6 text-left">
                  <button 
                    onClick={() => handleQuickPrompt("Are you available for new opportunities?")}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs p-2.5 rounded-lg border border-zinc-700 transition-colors flex items-center gap-2"
                  >
                    💼 Are you available for hire?
                  </button>
                  <button 
                    onClick={() => handleQuickPrompt("Tell me about your FullStack skills")}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs p-2.5 rounded-lg border border-zinc-700 transition-colors flex items-center gap-2"
                  >
                    ⚙️ Tell me about your FullStack skills
                  </button>
                  <button 
                    onClick={() => handleQuickPrompt("Tell me about your projects ?")}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs p-2.5 rounded-lg border border-zinc-700 transition-colors flex items-center gap-2"
                  >
                    🚀 Tell me about your projects 
                  </button>
                </div>
              </div>
            )}
            
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-zinc-800 text-zinc-100 rounded-bl-none'
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
                <div className="bg-zinc-800 p-3 rounded-2xl text-sm text-zinc-400">
                  Typing... 
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={onSubmit} className="p-3 border-t border-zinc-700 bg-zinc-900 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-zinc-800 text-white text-sm rounded-full px-4 py-2 outline-none border border-zinc-700 focus:border-blue-500 transition-colors"
            />

            <button 
              type="submit" 
              disabled={isLoading || !input}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2.5 rounded-full transition-colors flex items-center justify-center"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}