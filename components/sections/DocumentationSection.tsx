'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, BookOpen } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext' // <-- Import ajouté

export function DocumentationSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const { t } = useLanguage() // <-- Hook ajouté

  // Les données viennent maintenant du fichier de traduction
  const quickLinks = t.docs.quickLinks
  const techStack = t.docs.techStack
  const faqs = t.docs.faqs

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
            {t.docs.label} {/* <-- Traduit */}
          </span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-medium text-neutral-600">04</span>
        </motion.div>

        <div className="border border-white/10 bg-neutral-900 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-4 shadow-2xl">
          
          {/* Sidebar (Table of Contents) */}
          <aside className="border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={16} /> {t.docs.gettingStarted} {/* <-- Traduit */}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-emerald-400 transition-colors" />
                    {link.label} {/* <-- Traduit */}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3 p-8 space-y-12">
            
            {/* Intro */}
            <div id="intro">
              <h2 className="text-2xl font-bold text-white mb-3"># {t.docs.introTitle}</h2> {/* <-- Traduit */}
              <p className="text-neutral-400 leading-relaxed">
                {t.docs.introText} {/* <-- Traduit */}
              </p>
            </div>

            {/* Tech Stack */}
            <div id="stack">
              <h2 className="text-2xl font-bold text-white mb-4"># {t.docs.stackTitle}</h2> {/* <-- Traduit */}
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
                    <div className="text-[10px] text-neutral-500 mt-1">{tech.desc}</div> {/* <-- Traduit */}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recruiter FAQ (Accordion) */}
            <div id="faq">
              <h2 className="text-2xl font-bold text-white mb-4"># {t.docs.faqTitle}</h2> {/* <-- Traduit */}
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
                    >
                      <span className="font-medium text-white text-sm">{faq.q}</span> {/* <-- Traduit */}
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
                            {faq.a} {/* <-- Traduit */}
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