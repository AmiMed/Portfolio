'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function Hero() {

  return (
    <section id="home" className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
        Hi, I'm BOUTITI MED AMINE
      </h1>
        <p className="text-xl text-muted-foreground mb-8">
         Software Engineer & Full Stack Developer
        </p>
        <div className="flex gap-4 justify-center">
        <Button  size="lg">
          <a href="#projects">View My Work</a>
        </Button>
            <Button  size="lg" variant="outline">
          <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}