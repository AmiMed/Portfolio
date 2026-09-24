'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Loader2, Send, CheckCircle, Star, X } from 'lucide-react'

export function FeedbackPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const manualOpen = () => {
    setIsVisible(true)
  }

  const closePopup = () => {
    setIsVisible(false)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0 || !message.trim()) return
    setIsLoading(true)

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, message }),
      })

      if (res.ok) {
        setIsSuccess(true)
        setRating(0)
        setHoverRating(0)
        setMessage('')
        setTimeout(() => {
          setIsVisible(false)
          setIsSuccess(false) // Reset success state for next time
        }, 4000)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closePopup}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close feedback"
              >
                <X size={20} />
              </button>

              {/* Success State */}
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">Thank You!</h3>
                  <p className="text-muted-foreground">Your feedback has been sent successfully.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Leave a Rating</h2>
                    <p className="text-sm text-muted-foreground">
                      How would you rate my portfolio? Let me know your thoughts!
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                        aria-label={`${star} stars`}
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            (hoverRating || rating) >= star
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground/40'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder="Tell me what you think..."
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex justify-center">
                    <Button type="submit" size="lg" disabled={isLoading || rating === 0 || !message.trim()}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Feedback
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button with Text & Animations */}
      {!isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            boxShadow: [
              '0 0 0 0px rgba(250, 204, 21, 0.5)', 
              '0 0 0 12px rgba(250, 204, 21, 0)'
            ] 
          }}
          transition={{ 
            scale: { delay: 1.5, type: 'spring', stiffness: 200 },
            opacity: { delay: 1.5 },
            boxShadow: { duration: 2, repeat: Infinity, ease: 'easeOut' }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={manualOpen}
          className="group fixed bottom-24 right-6 z-40 flex items-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-3 rounded-full shadow-lg transition-colors duration-300"
          aria-label="Open Feedback"
        >
          <Star className="fill-black shrink-0" size={30} />
          {/* Expanding Text on Hover */}
          <span className="max-w-0 group-hover:max-w-[150px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden font-medium text-sm pl-0 group-hover:pl-2">
            Send Feedback
          </span>
        </motion.button>
      )}
    </>
  )
}