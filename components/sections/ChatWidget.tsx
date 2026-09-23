'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { MessageCircle, X, Send } from 'lucide-react'

// Accept isOpen and setIsOpen as props from the parent
export function ChatWidget({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void 
}) {
  const [input, setInput] = useState('')
  
  // useChat defaults to '/api/chat' automatically
  const { messages, sendMessage, status } = useChat()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    sendMessage({ text: input }) 
    setInput('')
  }

  // Helper function for quick prompt buttons
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
              <h3 className="text-white font-semibold text-sm">Med Amine's Assistant AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {messages.length === 0 && (
              <div className="text-zinc-400 text-sm text-center mt-8 space-y-4">
                <p className="text-white font-semibold text-base">👋 Hello! I'm Med Amine's AI Assistant.</p>
                <p className="text-zinc-500 px-2">
                  I can help you learn about his FullStack experience, tech stack, and availability for new roles.
                </p>
                
                {/* Interactive Quick Prompts */}
                <div className="flex flex-col gap-2 mt-6 text-left">
                  <button 
                    onClick={() => handleQuickPrompt("Are you available for new opportunities?")}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs p-2.5 rounded-lg border border-zinc-700 transition-colors flex items-center gap-2"
                  >
                    💼 Are you available for hire?
                  </button>
                  <button 
                    onClick={() => handleQuickPrompt("Tell me about your DevOps and Cloud skills")}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs p-2.5 rounded-lg border border-zinc-700 transition-colors flex items-center gap-2"
                  >
                    ⚙️ Tell me about your FullStack skills
                  </button>
                  <button 
                    onClick={() => handleQuickPrompt("What is your experience with React Native?")}
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
                  {m.parts.map((part, i) => {
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
              placeholder="Ask a question..."
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
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
      </button>
    </div>
  )
}