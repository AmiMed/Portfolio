'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Briefcase, Mail, Bot } from 'lucide-react'
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

        {/* NEW: Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
            Available for new opportunities
          </span>
        </div>

        {/* MODIFIED: Title with gradient color on the name */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-500 bg-clip-text text-transparent">
            BOUTITI MED AMINE
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          Software Engineer & Full Stack Developer
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg">
            <a href="#projects" className="flex items-center gap-2">
              <Briefcase size={18} /> View My Work
            </a>
          </Button>
          
          <Button size="lg" variant="outline">
            <a href="#contact" className="flex items-center gap-2">
              <Mail size={18} /> Contact Me
            </a>
          </Button>
          
          {/* Chat button triggers the prop passed from the parent */}
          <Button 
            size="lg" 
            variant="secondary"
            onClick={onChatOpen}
            className="flex items-center gap-2"
          >
            <Bot size={18} /> Ask My AI Assistant
          </Button>
        </div>
      </motion.div>
    </section>
  )
}