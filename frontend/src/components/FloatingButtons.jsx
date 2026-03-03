import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const btnBase = {
    width: "50px", height: "50px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", border: "none", backdropFilter: "blur(12px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)", transition: "all 0.3s",
  }

  return (
    <>
      <style>{`
        @keyframes floatPulse {
          0%,100% { box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 0 0 rgba(37,211,102,0.4); }
          50%      { box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 0 10px rgba(37,211,102,0); }
        }
        @keyframes callPulse {
          0%,100% { box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 0 0 rgba(255,107,53,0.4); }
          50%      { box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 0 10px rgba(255,107,53,0); }
        }
      `}</style>

      {/* Floating action cluster — bottom right */}
      <div style={{ position:"fixed", bottom:"28px", right:"24px", zIndex:1000, display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>

        {/* Expandable sub-buttons */}
        <AnimatePresence>
          {expanded && (
            <>
              {/* Call button */}
              <motion.a
                href="tel:+919876543210"
                initial={{ opacity:0, scale:0.4, y:20 }}
                animate={{ opacity:1, scale:1, y:0 }}
                exit={{ opacity:0, scale:0.4, y:20 }}
                transition={{ duration:0.35, delay:0.05, ease:[0.22,1,0.36,1] }}
                title="Call Us"
                style={{
                  ...btnBase,
                  background: "linear-gradient(135deg, #FF6B35, #c45200)",
                  color: "white", fontSize: "20px", textDecoration: "none",
                  animation: "callPulse 2s ease-in-out infinite",
                }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.12)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
              >
                📞
              </motion.a>

              {/* WhatsApp button */}
              <motion.a
                href="https://wa.me/919876543210?text=Hi%20Prajna!%20I'd%20like%20to%20make%20a%20reservation."
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity:0, scale:0.4, y:20 }}
                animate={{ opacity:1, scale:1, y:0 }}
                exit={{ opacity:0, scale:0.4, y:20 }}
                transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
                title="WhatsApp"
                style={{
                  ...btnBase,
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  color: "white", fontSize: "22px", textDecoration: "none",
                  animation: "floatPulse 2s ease-in-out infinite",
                }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.12)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
              >
                💬
              </motion.a>
            </>
          )}
        </AnimatePresence>

        {/* Main toggle button */}
        <motion.button
          onClick={() => setExpanded(e => !e)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          style={{
            ...btnBase,
            width: "56px", height: "56px",
            background: expanded
              ? "rgba(255,255,255,0.12)"
              : "linear-gradient(135deg, #FF6B35, #c45200)",
            border: expanded
              ? "1.5px solid rgba(255,180,80,0.4)"
              : "none",
            color: "white", fontSize: expanded ? "20px" : "22px",
            boxShadow: "0 8px 30px rgba(255,107,53,0.35)",
          }}
        >
          {expanded ? "✕" : "💬"}
        </motion.button>
      </div>

      {/* Scroll to top — bottom left */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity:0, scale:0.5, y:20 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.5, y:20 }}
            transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
            onClick={scrollToTop}
            whileHover={{ scale:1.1, y:-3 }}
            whileTap={{ scale:0.93 }}
            title="Scroll to top"
            style={{
              position:"fixed", bottom:"28px", left:"24px", zIndex:1000,
              ...btnBase,
              width: "46px", height: "46px",
              background: "rgba(13,5,0,0.85)",
              border: "1.5px solid rgba(255,180,80,0.35)",
              color: "rgba(255,200,120,0.9)", fontSize: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,180,80,0.1)",
            }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingButtons