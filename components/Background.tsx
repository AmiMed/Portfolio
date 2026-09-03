'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

export function Background() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Large gradient orbs — MORE VISIBLE */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          left: '5%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float1 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          right: '0%',
          top: '40%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float2 25s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          left: '30%',
          bottom: '5%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float3 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          right: '20%',
          top: '0%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float1 18s ease-in-out infinite reverse',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.07,
        }}
      />

      {/* Particle canvas */}
      <ParticleCanvas />
    </div>
  )
}

// ============ Particles ============

interface P {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  o: number
  ph: number
  sp: number
}

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const ps = useRef<P[]>([])
  const mouse = useRef({ x: -9999, y: -9999 })
  const raf = useRef(0)

  const init = useCallback((w: number, h: number) => {
    const n = Math.min(Math.floor((w * h) / 18000), 80)
    const a: P[] = []
    for (let i = 0; i < n; i++) {
      a.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.5,
        o: Math.random() * 0.4 + 0.15,
        ph: Math.random() * 6.28,
        sp: Math.random() * 0.01 + 0.005,
      })
    }
    ps.current = a
  }, [])

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')!
    let w = 0, h = 0

    const resize = () => {
      const d = devicePixelRatio || 1
      w = innerWidth; h = innerHeight
      c.width = w * d; c.height = h * d
      c.style.width = w + 'px'; c.style.height = h + 'px'
      ctx.setTransform(d, 0, 0, d, 0, 0)
      init(w, h)
    }

    const onM = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onL = () => { mouse.current = { x: -9999, y: -9999 } }

    resize()
    addEventListener('resize', resize)
    addEventListener('mousemove', onM)
    addEventListener('mouseleave', onL)

    const LD = 140, MD = 200

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const arr = ps.current
      const mx = mouse.current.x, my = mouse.current.y

      for (let i = 0; i < arr.length; i++) {
        const p = arr[i]
        p.ph += p.sp

        const dx = p.x - mx, dy = p.y - my
        const md = Math.sqrt(dx * dx + dy * dy)
        if (md < MD && md > 0) {
          const f = ((MD - md) / MD) * 0.015
          p.vx += (dx / md) * f
          p.vy += (dy / md) * f
        }

        p.vx *= 0.99; p.vy *= 0.99
        p.x += p.vx; p.y += p.vy

        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        const op = Math.max(0.08, Math.min(0.6, p.o + Math.sin(p.ph) * 0.15))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, 6.28)
        ctx.fillStyle = `rgba(255,255,255,${op})`
        ctx.fill()

        for (let j = i + 1; j < arr.length; j++) {
          const q = arr[j]
          const cx = p.x - q.x, cy = p.y - q.y
          const cd = Math.sqrt(cx * cx + cy * cy)
          if (cd < LD) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(255,255,255,${(1 - cd / LD) * 0.08})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        if (md < MD) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `rgba(52,211,153,${(1 - md / MD) * 0.15})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }
      raf.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      removeEventListener('resize', resize)
      removeEventListener('mousemove', onM)
      removeEventListener('mouseleave', onL)
      cancelAnimationFrame(raf.current)
    }
  }, [init])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }} />
}

// ============ Scroll Progress ============

export function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const t = scrollY
      const total = document.documentElement.scrollHeight - innerHeight
      setP(total > 0 ? t / total : 0)
    }
    addEventListener('scroll', fn, { passive: true })
    return () => removeEventListener('scroll', fn)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
      style={{
        background: 'linear-gradient(to right, #34d399, #3b82f6)',
        transform: `scaleX(${p})`,
        transformOrigin: 'left',
      }}
    />
  )
}