// components/LanguageToggle.tsx
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
      <button
        onClick={() => setLang('en')}
        className={`relative px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
          lang === 'en' ? 'text-black' : 'text-neutral-400 hover:text-white'
        }`}
      >
        {lang === 'en' && (
          <motion.span
            layoutId="lang-pill"
            className="absolute inset-0 bg-white rounded-full"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
      <button
        onClick={() => setLang('fr')}
        className={`relative px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
          lang === 'fr' ? 'text-black' : 'text-neutral-400 hover:text-white'
        }`}
      >
        {lang === 'fr' && (
          <motion.span
            layoutId="lang-pill"
            className="absolute inset-0 bg-white rounded-full"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        )}
        <span className="relative z-10">FR</span>
      </button>
    </div>
  )
}