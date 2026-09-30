'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Background, ScrollProgress } from '@/components/Background'
import { ChatWidget } from '@/components/sections/ChatWidget'
import { Certifications } from '@/components/sections/Certification'
import { FeedbackPopup } from '@/components/sections/FeedbackPopup'
import { DocumentationSection } from '@/components/sections/DocumentationSection'
import { Preloader } from '@/components/Preloader' 

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Le AnimatePresence gère la disparition en douceur du loader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {/* Le contenu de votre portfolio reste monté en arrière-plan */}
      {/* et apparaîtra naturellement quand le loader disparaîtra */}
      {!isLoading && (
        <>
          <ScrollProgress />
          <Background />
          <div className="relative z-10">
            <Navigation />
            <Hero onChatOpen={() => setIsChatOpen(true)} />
            <About />
            <Projects />
            <Certifications />
            <DocumentationSection /> 
            <Contact />
            <FeedbackPopup />
            <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
          </div>
        </>
      )}
    </div>
  )
}