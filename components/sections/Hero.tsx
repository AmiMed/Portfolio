'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'

export function Hero({ onChatOpen }: { onChatOpen: () => void }) {
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
            width={200}
            height={200}
            className="rounded-full object-cover mx-auto w-48 h-48"
            priority
          />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Hi, I'm BOUTITI MED AMINE
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Software Engineer & Full Stack Developer
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg">
            <a href="#projects">View My Work</a>
          </Button>
          <Button size="lg" variant="outline">
            <a href="#contact">Contact Me</a>
          </Button>
          
          {/* Chat button triggers the prop passed from the parent */}
          <Button 
            size="lg" 
            variant="secondary"
            onClick={onChatOpen}
          >
            Ask My Portfolio AI
          </Button>
        </div>
      </motion.div>
    </section>
  )
}