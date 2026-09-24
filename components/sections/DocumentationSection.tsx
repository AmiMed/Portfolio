'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, BookOpen } from 'lucide-react'

const quickLinks = [
  { id: 'intro', label: 'Introduction' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'faq', label: 'Recruiter FAQ' },
]

const techStack = [
  { name: 'Next.js', desc: 'App Router, SSR/SSG' },
  { name: 'TypeScript', desc: 'Type safety & interfaces' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling' },
  { name: 'Framer Motion', desc: 'Interactive animations' },
  { name: 'Vercel AI SDK', desc: 'Generative AI & RAG' },
  { name: 'Supabase', desc: 'Database & Auth' },
  { name: 'Docker', desc: 'Containerization' },
  { name: 'Shadcn UI', desc: 'Accessible components' },
]

const faqs = [
  {
    q: 'Is Med Amine available for new opportunities?',
    a: 'Yes! I am actively looking for new FullStack or Mobile Developer roles. I am open to remote work globally and relocation. You can contact me directly at boutitimedamine1@gmail.com.'
  },
  {
    q: 'What is his strongest technical advantage?',
    a: 'My main strength is end-to-end delivery. I can build a product from the Figma design, deploy it with CI/CD pipelines (Docker, GitHub Actions), and integrate modern AI features (LLMs, Voice AI) to optimize business processes.'
  },
  {
    q: 'Does he have mobile development experience?',
    a: 'Yes, I have over 3 years of experience shipping React Native (Expo) apps to Google Play, the App Store, and Huawei AppGallery. Check the "Projects" section for the ARVEA Business app.'
  },
  {
    q: 'How many years of experience does he have?',
    a: 'I have over 5 years of professional experience as a Full-Stack Developer, primarily at Maison du Web, where I have worked on the design and development of web and mobile applications.'  }
]

export function DocumentationSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <section id="docs" className="relative py-32 px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-500">
            Documentation
          </span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-medium text-neutral-600">04</span>
        </motion.div>

        <div className="border border-white/10 bg-neutral-900 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-4 shadow-2xl">
          
          {/* Sidebar (Table of Contents) */}
          <aside className="border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={16} /> Getting Started
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-emerald-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3 p-8 space-y-12">
            
            {/* Intro */}
            <div id="intro">
              <h2 className="text-2xl font-bold text-white mb-3"># Introduction</h2>
              <p className="text-neutral-400 leading-relaxed">
                Welcome to my portfolio documentation. This platform is not just a showcase of my work, 
                but a living example of my engineering capabilities. Built with Next.js and integrated 
                with AI, it demonstrates my ability to build modern, scalable, and interactive web applications.
              </p>
            </div>

            {/* Tech Stack */}
            <div id="stack">
              <h2 className="text-2xl font-bold text-white mb-4"># Tech Stack</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {techStack.map((tech, i) => (
                  <motion.div 
                    key={tech.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/[0.02] border border-white/5 rounded-lg p-3 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                  >
                    <div className="text-sm font-mono font-semibold text-white">{tech.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-1">{tech.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recruiter FAQ (Accordion) */}
            <div id="faq">
              <h2 className="text-2xl font-bold text-white mb-4"># Recruiter FAQ</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
                    >
                      <span className="font-medium text-white text-sm">{faq.q}</span>
                      <ChevronDown 
                        className={`text-neutral-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                        size={18} 
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="p-4 text-neutral-400 text-sm border-t border-white/10 bg-neutral-900/50">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}