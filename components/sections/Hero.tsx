'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Briefcase, Mail, Bot } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext' // <-- Import ajouté

export function Hero({ onChatOpen }: { onChatOpen: () => void }) {
  const { t } = useLanguage() // <-- Hook ajouté

  return (
    <section id="home" className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        {/* Circular photo */}
            <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <Image
            src="/photo.jpg"
            alt="BOUTITI MED AMINE"
            width={128}
            height={128}
            className="rounded-full object-cover mx-auto w-32 h-32"
            priority
          />
        </motion.div>

        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
            {t.hero.available} {/* <-- Texte traduit */}
          </span>
        </div>

        {/* Title with gradient color on the name */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          {t.hero.greeting}{' '} {/* <-- Texte traduit */}
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-500 bg-clip-text text-transparent">
            BOUTITI MED AMINE
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          {t.hero.role} {/* <-- Texte traduit */}
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <Button size="lg">
            <a href="#projects" className="flex items-center gap-2">
              <Briefcase size={18} /> {t.hero.viewWork} {/* <-- Texte traduit */}
            </a>
          </Button>
          
          <Button size="lg" variant="outline">
            <a href="#contact" className="flex items-center gap-2">
              <Mail size={18} /> {t.hero.contactMe} {/* <-- Texte traduit */}
            </a>
          </Button>
          
          {/* Chat button triggers the prop passed from the parent */}
          <Button 
            size="lg" 
            variant="secondary"
            onClick={onChatOpen}
            className="flex items-center gap-2"
          >
            <Bot size={18} /> {t.hero.aiAssistant} {/* <-- Texte traduit */}
          </Button>
        </div>

        {/* === Icônes Sociales depuis Contact.tsx avec couleurs d'origine === */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/boutiti-med-amine-518312152" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-[#0A66C2]"
            aria-label="LinkedIn"
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Email */}
          <a 
            href="mailto:boutitimedamine1@gmail.com" 
            className="hover:scale-110 transition-transform text-[#EA4335]"
            aria-label="Email"
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4l-10 8L2 4" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/21628635316?text=Hello%20Med%20Amine,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-[#25D366]"
            aria-label="WhatsApp"
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.587-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
        </motion.div>

      </motion.div>
    </section>
  )
}