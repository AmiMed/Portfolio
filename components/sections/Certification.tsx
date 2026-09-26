'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { certifications, type Certification, getAllCertificationTags, getAllProviders } from '@/data/Certifications'

type FilterMode = 'all' | 'tag' | 'provider'

export function Certifications() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  const [filterMode, setFilterMode] = useState<FilterMode>('all')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const allTags = getAllCertificationTags()
  const allProviders = getAllProviders()

  const filteredCertifications = certifications.filter((cert) => {
    if (filterMode === 'tag' && selectedTag) {
      return cert.tags.includes(selectedTag)
    }
    if (filterMode === 'provider' && selectedProvider) {
      return cert.provider === selectedProvider
    }
    return true
  })

  const handleTagClick = (tag: string) => {
    setFilterMode('tag')
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const handleProviderClick = (provider: string) => {
    setFilterMode('provider')
    setSelectedProvider(selectedProvider === provider ? null : provider)
  }

  const handleResetFilters = () => {
    setFilterMode('all')
    setSelectedTag(null)
    setSelectedProvider(null)
  }

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-500">
            Certifications
          </span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-medium text-neutral-600">03</span>
        </motion.div>

        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Professional{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="mt-4 text-neutral-400 text-base max-w-lg">
              Industry-recognized certifications across cloud, AI, DevOps, and agile methodologies.
            </p>
          </motion.div>
        </div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          {/* Filter by Technology Tags */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-300 mb-3">Filter by Technology</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    selectedTag === tag && filterMode === 'tag'
                      ? 'bg-blue-500 text-white border border-blue-400'
                      : 'bg-white/5 text-neutral-400 border border-white/10 hover:border-blue-500/30 hover:text-neutral-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by Provider/Source */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-neutral-300 mb-3">Filter by Source</h3>
            <div className="flex flex-wrap gap-2">
              {allProviders.map((provider) => (
                <button
                  key={provider}
                  onClick={() => handleProviderClick(provider)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    selectedProvider === provider && filterMode === 'provider'
                      ? 'bg-purple-500 text-white border border-purple-400'
                      : 'bg-white/5 text-neutral-400 border border-white/10 hover:border-purple-500/30 hover:text-neutral-300'
                  }`}
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          {(selectedTag || selectedProvider) && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-medium text-blue-400 hover:text-blue-300 mt-4 transition-colors"
            >
              ✕ Clear filters
            </button>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6 text-sm text-neutral-500"
        >
          Showing {filteredCertifications.length} of {certifications.length} certifications
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredCertifications.length > 0 ? (
              filteredCertifications.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  cert={cert}
                  index={index}
                  isInView={isInView}
                  isHovered={hoveredId === cert.id}
                  onHoverStart={() => setHoveredId(cert.id)}
                  onHoverEnd={() => setHoveredId(null)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-20"
              >
                <div className="text-neutral-500 text-sm">No certifications found matching your filters.</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ============ Sub Components ============

function CertificationCard({
  cert,
  index,
  isInView,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  cert: Certification
  index: number
  isInView: boolean
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      
      // ADDED: Tactile lift effect to match your Project cards
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        zIndex: 10,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      
      // UPDATED: Border changes to blue on hover, removed transition-all
      className="group relative rounded-xl border border-white/5 hover:border-blue-400/50 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Provider Badge */}
      <div className="p-5 pb-3">
        <div className="inline-flex items-center">
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full backdrop-blur-sm">
            {cert.provider}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 pt-0">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200 leading-snug">
          {cert.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-500 leading-relaxed mb-4">
          {cert.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {cert.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button - NOW ALWAYS VISIBLE & PUSHED TO BOTTOM */}
      <div className="p-5 pt-0 mt-auto">
        <a
          href={cert.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!cert.certificateUrl || cert.certificateUrl === '#') {
              e.preventDefault()
            }
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg text-xs font-medium text-blue-300 hover:text-blue-200 hover:border-blue-500/50 hover:from-blue-500/30 hover:to-purple-500/30 transition-all"
        >
          <CertificateIcon size={14} />
          View Certificate
        </a>
      </div>

      {/* Bottom border glow on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.article>
  )
}

// ============ Icons ============

function CertificateIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15h6" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  )
}