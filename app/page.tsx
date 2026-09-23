'use client'

import { useState } from 'react'
import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Background, ScrollProgress } from '@/components/Background'
import { ChatWidget } from '@/components/sections/ChatWidget'
import { Certifications } from '@/components/sections/Certification'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(true)

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <ScrollProgress />
      <Background />
      <div className="relative z-10">
        <Navigation />
      <Hero onChatOpen={() => setIsChatOpen(true)} />
        <About />
        <Projects />
        <Certifications />
        <Contact />
      <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      </div>
    </div>
  )
}