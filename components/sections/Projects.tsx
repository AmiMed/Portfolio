'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { projects, type Project } from '@/data/projects'
import { ProjectDetailsModal } from './ProjectDetailsModal' // Adjust import path as needed

type FilterType = 'all' | 'featured'

export function Projects() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [filter, setFilter] = useState<FilterType>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  
  // NEW: State to track which project's details to show
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects: Project[] =
    filter === 'featured'
      ? projects.filter((p) => p.featured)
      : projects

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
     {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-500">
            Projects
          </span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-medium text-neutral-600">02</span>
        </motion.div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Selected{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                works
              </span>
            </h2>
            <p className="mt-4 text-neutral-400 text-base max-w-lg">
              A collection of projects I've built — from full-stack apps to
              open-source tools.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-full"
          >
            <FilterButton
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              All ({projects.length})
            </FilterButton>
            <FilterButton
              active={filter === 'featured'}
              onClick={() => setFilter('featured')}
            >
              In production ({projects.filter((p) => p.featured).length})
            </FilterButton>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isInView={isInView}
                  isHovered={hoveredId === project.id}
                  onHoverStart={() => setHoveredId(project.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onDetailsClick={() => setSelectedProject(project)} // NEW: Pass trigger function
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* NEW: Render the Modal conditionally */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// ============ Sub Components ============

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 ${
        active ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
      }`}
    >
      {active && (
        <motion.span
          layoutId="activeFilter"
          className="absolute inset-0 bg-white/10 border border-white/10 rounded-full"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
function ProjectCard({
  project,
  index,
  isInView,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onDetailsClick, // NEW: Receive the trigger function
}: {
  project: Project
  index: number
  isInView: boolean
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  onDetailsClick: () => void // NEW: Type definition
}) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ scale: 1.02, y: -5, zIndex: 10, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="group relative rounded-xl border border-white/5 hover:border-emerald-400/50 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-neutral-900">
        {!imageError ? (
          <motion.img
            src={project.image}
            alt={project.title}
            onError={() => setImageError(true)}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
          />
        ) : (
          /* ... Keep your fallback svg here ... */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900"></div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full backdrop-blur-sm">
              In production
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500 bg-white/5 rounded">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* NEW: Action Details Button pushed to the bottom */}
        <button 
          onClick={onDetailsClick}
          className="mt-auto pt-4 text-left text-sm font-medium text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-1 group/btn"
        >
          Details
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:translate-x-1 transition-transform">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.article>
  )
}