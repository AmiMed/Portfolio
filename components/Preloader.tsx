'use client'

import { motion } from 'framer-motion'

const logoText = "⚡ Build__Scale__Innovate".split("");

export function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      {/* Conteneur de l'icône */}
      <div className="relative flex items-center justify-center w-20 h-20 mb-8">
        {/* Anneau de chargement qui tourne */}
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-t-emerald-400 border-r-blue-500 border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {/* Point central qui pulse */}
        <motion.div
          className="w-4 h-4 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Texte du logo animé lettre par lettre */}
      <motion.div
        className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
      >
        {logoText.map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            // Faire clignoter les underscores comme un curseur de terminal
            className={char === '_' ? 'text-emerald-400 inline-block animate-pulse' : 'inline-block'}
          >
            {char}
          </motion.span>
        ))}
        {/* Le point final qui pulse */}
        <motion.span
          className="text-emerald-400 inline-block ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.4, 1] }}
          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
        >
          .
        </motion.span>
      </motion.div>

     
    </motion.div>
  )
}