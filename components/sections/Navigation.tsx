'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { LanguageToggle } from '@/components/LanguageToggle'

// Static section IDs: they never change with the language
const sectionIds = ['home', 'about', 'projects', 'certifications', 'docs', 'contact']

const logoText = '⚡ Build__Scale__Innovate'.split('')

// === Composant pour animer la couleur de chaque lettre ===
function LogoChar({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: any
}) {
  const start = (index / total) * 0.85
  const end = start + 0.15

  // Démarre en blanc (#ffffff) et finit en émeraude (#34d399)
  const color = useTransform(progress, [start, end], ['#ffffff', '#34d399'])

  return (
    <motion.span
      style={{ color }}
      className="inline-block"
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        hover: { y: -4 },
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {char}
    </motion.span>
  )
}

export function Navigation() {
  // ✅ Hook called inside the component
  const { t } = useLanguage()

  // ✅ navLinks built inside the component so it reacts to language changes
  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.certifications, href: '#certifications' },
    { name: t.nav.docs, href: '#docs' },
    { name: t.nav.contact, href: '#contact' },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // --- Scroll Progress Hook ---
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Handle initial load with hash in URL
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(hash)
        }
        setIsInitialLoad(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setIsInitialLoad(false)
    }
  }, [])

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      if (isInitialLoad) return

      let newActiveSection = 'home'

      for (const section of sectionIds) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            newActiveSection = section
          }
        }
      }

      setActiveSection(newActiveSection)

      if (window.location.hash !== `#${newActiveSection}`) {
        window.history.replaceState(null, '', `#${newActiveSection}`)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInitialLoad])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home'
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setActiveSection(hash)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      window.history.pushState(null, '', href)
    }
    setIsOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* === LOGO AVEC TEXTE COLORÉ PROGRESSIVEMENT === */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              className="relative group inline-block"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-bold tracking-tight flex">
                {logoText.map((char, index) => (
                  <LogoChar
                    key={index}
                    char={char}
                    index={index}
                    total={logoText.length}
                    progress={scaleX}
                  />
                ))}
                <motion.span
                  className="text-emerald-400 inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: [1, 1.4, 1] }}
                  transition={{ delay: 0.8, duration: 1.5, repeat: Infinity }}
                >
                  .
                </motion.span>
              </span>

              {/* Ligne en dessous du logo qui agit comme barre de progression */}
              <motion.span
                style={{ scaleX }}
                className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-emerald-400 to-blue-500 origin-left"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-white/10 border border-white/10 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </motion.a>
                )
              })}

              <div className="ml-4 flex items-center gap-4">
                <LanguageToggle />

                {/* === SOCIAL LINKS ON SCROLL === */}
                <AnimatePresence>
                  {scrolled && (
                    <motion.div
                      initial={{ opacity: 0, x: 20, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: 'auto' }}
                      exit={{ opacity: 0, x: 20, width: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="flex items-center gap-4 overflow-hidden pl-4 ml-2 border-l border-white/10"
                    >
                      <a
                        href="https://www.linkedin.com/in/boutiti-med-amine-518312152"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon />
                      </a>
                      <a
                        href="https://wa.me/21628635316"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                        aria-label="WhatsApp"
                      >
                        <WhatsappIcon />
                      </a>
                      <a
                        href="mailto:boutitimedamine1@gmail.com"
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                        aria-label="Email"
                      >
                        <EmailIcon />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-white rounded-full origin-left"
                />
                <motion.span
                  animate={{
                    opacity: isOpen ? 0 : 1,
                    x: isOpen ? -20 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-white rounded-full origin-left"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-neutral-950 border-l border-white/10 md:hidden"
            >
              <div className="flex flex-col h-full pt-24 px-6">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.replace('#', '')
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(link.href)
                        }}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.3 }}
                        className={`relative px-4 py-3.5 text-lg font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'text-white bg-white/10 border border-white/10'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-400 rounded-r-full" />
                        )}
                      </motion.a>
                    )
                  })}
                </div>

                <div className="my-6 border-t border-white/10" />

                {/* === Sélecteur de langue pour mobile === */}
                <div className="mb-6">
                  <LanguageToggle />
                </div>

                <div className="mt-auto pb-8">
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for work
                  </div>
                  <div className="mt-4 flex gap-4">
                    <a
                      href="https://www.linkedin.com/in/boutiti-med-amine-518312152"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon />
                    </a>
                    <a
                      href="https://wa.me/21628635316"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                      aria-label="WhatsApp"
                    >
                      <WhatsappIcon />
                    </a>
                    <a
                      href="mailto:boutitimedamine1@gmail.com"
                      className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      aria-label="Email"
                    >
                      <EmailIcon />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ============ Icons ============

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}