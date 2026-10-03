'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Send, CheckCircle, FileText, X, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function AutoResumePopup() {
  const { t } = useLanguage()
  
  const [isVisible, setIsVisible] = useState(false)
  const [recruiterEmail, setRecruiterEmail] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recruiterEmail || !jobTitle) return
    setStatus('loading')

    try {
      const res = await fetch('/api/send-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recruiterEmail, jobTitle, companyName }),
      })

      if (res.ok) {
        setStatus('success')
        setRecruiterEmail('')
        setJobTitle('')
        setCompanyName('')
        setTimeout(() => {
          setIsVisible(false)
          setStatus('idle')
        }, 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsVisible(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close resume popup">
                <X size={20} />
              </button>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">{t.autoResume.successTitle}</h3>
                  <p className="text-muted-foreground mt-2">{t.autoResume.successDesc}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 mb-4">
                      <Sparkles className="text-purple-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{t.autoResume.title}</h2>
                    <p className="text-sm text-muted-foreground">{t.autoResume.desc}</p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="email"
                      required
                      value={recruiterEmail}
                      onChange={(e) => setRecruiterEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      placeholder={t.autoResume.emailPlaceholder}
                      disabled={status === 'loading'}
                    />
                    <input
                      type="text"
                      required
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      placeholder={t.autoResume.jobPlaceholder}
                      disabled={status === 'loading'}
                    />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      placeholder={t.autoResume.companyPlaceholder}
                      disabled={status === 'loading'}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      status === 'error' ? 'bg-red-500 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {status === 'loading' ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.autoResume.generating}</>
                    ) : status === 'error' ? (
                      t.autoResume.error
                    ) : (
                      <><Send className="mr-2 h-4 w-4" />{t.autoResume.submit}</>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bouton flottant identique au ChatWidget */}
      {!isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            boxShadow: [
              '0 0 0 0px rgba(147, 51, 234, 0.5)', 
              '0 0 0 12px rgba(147, 51, 234, 0)'
            ] 
          }}
          transition={{ 
            scale: { delay: 2, type: 'spring', stiffness: 200 },
            opacity: { delay: 2 },
            boxShadow: { duration: 2, repeat: Infinity, ease: 'easeOut' }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVisible(true)}
          className="group fixed bottom-44 right-6 z-40 flex items-center bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
          aria-label="Open Resume Generator"
        >
          <FileText className="shrink-0" size={27} />
          <span className="max-w-0 group-hover:max-w-[250px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden font-medium text-sm pl-0 group-hover:pl-2">
            {t.autoResume.fabText}
          </span>
        </motion.button>
      )}
    </>
  )
}