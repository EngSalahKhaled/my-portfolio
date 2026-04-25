'use client'
import { useEffect, useRef } from 'react'

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const { scrollY, innerHeight } = window
      const totalHeight = document.body.scrollHeight - innerHeight
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[100] h-[2px] pointer-events-none"
      style={{
        width: '100%',
        background: 'linear-gradient(90deg, var(--theme-dark), var(--theme-primary), var(--theme-light))',
        transform: 'scaleX(0)',
        transformOrigin: '0 50%',
      }}
      aria-hidden="true"
    />
  )
}
