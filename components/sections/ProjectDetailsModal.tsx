'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react' // Make sure to install lucide-react if you haven't

interface ProjectDetailsModalProps {
  project: any // Replace with your Project type
  onClose: () => void
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose} // Click outside to close
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 border border-white/10 text-neutral-300 hover:text-white hover:bg-black/80 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-800 rounded-t-2xl">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {/* Title & Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
          
          {/* Description */}
          <p className="text-neutral-400 leading-relaxed mb-8">
            {project.longDescription || project.description}
          </p>

          {/* Key Features (Example of extra details) */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features?.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="text-emerald-400 mt-1">▹</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 border-t border-white/10 pt-6">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 px-4 bg-white text-black rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors"
              >
                View Live Site
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 px-4 bg-white/10 border border-white/10 text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-colors"
              >
                View Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}