import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 900)
    const t2 = setTimeout(() => setPhase(2), 2800)
    const t3 = setTimeout(() => onComplete(), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "linear-gradient(160deg, #0d0500 0%, #1a0800 40%, #2d1000 70%, #080200 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <style>{`
            @keyframes sOrb1 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(60px,40px) scale(1.2)} }
            @keyframes sOrb2 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(-40px,-60px) scale(1.15)} }
            @keyframes sPart { 0%{transform:translate(0,0) scale(1);opacity:0.4} 50%{transform:translate(8px,-14px) scale(1.5);opacity:0.7} 100%{transform:translate(-6px,-22px) scale(0.7);opacity:0.1} }
          `}</style>

          {/* Orbs */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
            <div style={{ position:"absolute", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle, rgba(200,80,0,0.18) 0%, transparent 70%)", top:"-100px", left:"-100px", animation:"sOrb1 8s ease-in-out infinite alternate" }} />
            <div style={{ position:"absolute", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,140,0,0.12) 0%, transparent 70%)", bottom:"-60px", right:"-80px", animation:"sOrb2 10s ease-in-out infinite alternate" }} />
          </div>

          {/* Particles */}
          {Array.from({ length: 18 }, (_, i) => ({
            x: (i * 33.7) % 100, y: (i * 51.3) % 100,
            size: 2 + (i % 3),
            color: ["#FF6B35","#FFD700","#FFA500"][i % 3],
            delay: (i * 0.3) % 4, dur: 3 + (i % 3),
          })).map((p, i) => (
            <div key={i} style={{
              position:"absolute", left:`${p.x}%`, top:`${p.y}%`,
              width:p.size, height:p.size, borderRadius:"50%",
              background:p.color, opacity:0.35,
              animation:`sPart ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
              filter:"blur(0.5px)",
            }} />
          ))}

          {/* Center */}
          <div style={{ position:"relative", zIndex:10, textAlign:"center" }}>

            {/* Pulsing rings behind logo */}
            <div style={{ position:"relative", display:"inline-block" }}>
              <motion.div animate={{ scale:[1,1.09,1], opacity:[0.12,0.22,0.12] }} transition={{ duration:2.5, repeat:Infinity }} style={{ position:"absolute", inset:"-50px", borderRadius:"50%", border:"1px solid rgba(255,200,80,0.3)" }} />
              <motion.div animate={{ scale:[1,1.14,1], opacity:[0.06,0.14,0.06] }} transition={{ duration:2.5, repeat:Infinity, delay:0.5 }} style={{ position:"absolute", inset:"-85px", borderRadius:"50%", border:"1px solid rgba(255,180,60,0.2)" }} />

              {/* Logo */}
              <motion.h1
                initial={{ opacity:0, y:30, filter:"blur(12px)" }}
                animate={{ opacity:1, y:0, filter:"blur(0px)" }}
                transition={{ duration:1.0, delay:0.15, ease:[0.22,1,0.36,1] }}
                style={{
                  fontSize:"clamp(64px, 14vw, 110px)",
                  fontFamily:"'Georgia', serif", fontWeight:"300",
                  background:"linear-gradient(135deg, #FFD700 0%, #FF9500 40%, #FF6B35 70%, #FFD700 100%)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  letterSpacing:"12px", lineHeight:1, margin:0,
                }}
              >
                Prajna
              </motion.h1>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX:0, opacity:0 }}
              animate={{ scaleX: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", margin:"22px 0 14px" }}
            >
              <div style={{ width:"70px", height:"1px", background:"linear-gradient(to right, transparent, #FFD700)" }} />
              <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#FFD700", boxShadow:"0 0 10px #FFD700" }} />
              <div style={{ width:"70px", height:"1px", background:"linear-gradient(to left, transparent, #FFD700)" }} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity:0, y:14, filter:"blur(8px)" }}
              animate={{ opacity: phase>=1?1:0, y: phase>=1?0:14, filter: phase>=1?"blur(0px)":"blur(8px)" }}
              transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
              style={{ color:"rgba(255,210,150,0.7)", fontSize:"11px", letterSpacing:"6px", textTransform:"uppercase", fontFamily:"'Georgia', serif", fontStyle:"italic" }}
            >
              Fine Dining Experience
            </motion.p>

            {/* Bouncing dots */}
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity: phase>=1?1:0 }}
              transition={{ duration:0.5, delay:0.3 }}
              style={{ display:"flex", justifyContent:"center", gap:"6px", marginTop:"38px" }}
            >
              {[0,1,2].map(i => (
                <motion.div key={i}
                  animate={{ opacity:[0.2,1,0.2], scale:[0.8,1.1,0.8] }}
                  transition={{ duration:1.2, repeat:Infinity, delay:i*0.2, ease:"easeInOut" }}
                  style={{ width:"6px", height:"6px", borderRadius:"50%", background:"linear-gradient(135deg, #FFD700, #FF6B35)" }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen