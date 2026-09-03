import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Background, ScrollProgress } from '@/components/Background'
import { ChatWidget } from '@/components/sections/ChatWidget'
import { Certifications } from '@/components/sections/Certification'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <ScrollProgress />
      <Background />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Contact />
      </div>
    </div>
  )
}