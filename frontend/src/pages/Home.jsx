import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ── Subtle spice particles ── */
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (i * 31.7) % 100,
  y: (i * 49.3) % 100,
  size: 2 + (i % 4),
  color: ["#FF6B35","#FFD700","#E63946","#FFA500","#FF4500","#C4A0D4"][i % 6],
  delay: (i * 0.28) % 5,
  dur: 3 + (i % 4),
}))

/* ── Light ray data ── */
const rays = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  left: 10 + i * 13,
  delay: i * 0.6,
  dur: 4 + (i % 3),
  width: 1 + (i % 3),
  opacity: 0.04 + (i % 3) * 0.015,
}))

const taglines = [
  "Where Every Meal Tells a Story",
  "Authentic Flavours, Royal Experience",
  "From Our Kitchen to Your Heart",
  "Three Cuisines, One Passion",
]

/* ── Hero background slides ── */
const heroSlides = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=85", // fine dining
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=85", // restaurant interior
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1800&q=85", // table setting
]

const dishes = [
  {
    name: 'Hyderabadi Biryani',
    desc: 'Aromatic basmati rice with tender meat',
    price: '₹280',
    img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
    tag: "🇮🇳 Indian",
    tagColor: "#FF6B35",
  },
  {
    name: 'Truffle Pasta',
    desc: 'Handmade pasta with black truffle cream',
    price: '₹420',
    img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    tag: "🇮🇹 Italian",
    tagColor: "#6DBF4A",
  },
  {
    name: 'Mexican Tacos',
    desc: 'Crispy tacos with fresh salsa and guac',
    price: '₹320',
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    tag: "🇲🇽 Mexican",
    tagColor: "#FFA500",
  },
]

function Home() {
  const [tagIdx, setTagIdx] = useState(0)
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTagIdx(t => t + 1), 2800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSlideIdx(t => (t + 1) % heroSlides.length), 6000)
    return () => clearInterval(id)
  }, [])

  const tagline = taglines[tagIdx % taglines.length]

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0d0500 0%, #1a0a00 30%, #2d1000 60%, #0d0500 100%)",
      position: "relative",
      overflow: "hidden",
    }}>

      <style>{`
        @keyframes spiceDrift {
          0%   { transform: translate(0,0) scale(1); opacity: 0.3; }
          50%  { transform: translate(8px,-12px) scale(1.4); opacity: 0.55; }
          100% { transform: translate(-6px,-20px) scale(0.75); opacity: 0.15; }
        }
        @keyframes orbFloat1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(80px,60px) scale(1.2); } }
        @keyframes orbFloat2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-60px,-80px) scale(1.15); } }
        @keyframes orbFloat3 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px,-50px) scale(0.9); } }
        @keyframes rayShimmer {
          0%   { opacity: 0; transform: scaleY(0.6) skewX(-8deg); }
          50%  { opacity: 1; transform: scaleY(1.1) skewX(-8deg); }
          100% { opacity: 0; transform: scaleY(0.8) skewX(-8deg); }
        }
        @keyframes slowKen {
          0%   { transform: scale(1.0) translateX(0px); }
          100% { transform: scale(1.12) translateX(-20px); }
        }
        @keyframes grainMove {
          0%   { transform: translate(0,0); }
          100% { transform: translate(-50px, -50px); }
        }
        @keyframes borderGlow {
          0%   { opacity: 0.6; }
          50%  { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @keyframes scrollBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>

      {/* ══ BACKGROUND ORBS ══ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: "650px", height: "650px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,80,0,0.16) 0%, transparent 70%)",
          top: "-150px", left: "-150px",
          animation: "orbFloat1 9s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", width: "550px", height: "550px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,140,0,0.10) 0%, transparent 70%)",
          bottom: "-80px", right: "-100px",
          animation: "orbFloat2 11s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", width: "420px", height: "420px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(150,30,0,0.09) 0%, transparent 70%)",
          top: "45%", left: "35%",
          animation: "orbFloat3 13s ease-in-out infinite alternate",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ════ HERO ════ */}
        <div style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
        }}>

          {/* ── CINEMATIC BACKGROUND SLIDESHOW ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url("${heroSlides[slideIdx]}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  animation: "slowKen 12s ease-in-out infinite alternate",
                }}
              />
            </AnimatePresence>

            {/* Multi-layer cinematic overlay */}
            {/* 1. Dark vignette base */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(8,3,0,0.72) 0%, rgba(13,5,0,0.45) 40%, rgba(13,5,0,0.78) 100%)",
            }} />
            {/* 2. Warm amber tint */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 60%, rgba(180,60,0,0.22) 0%, transparent 65%)",
            }} />
            {/* 3. Deep vignette edges */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)",
            }} />
            {/* 4. Film grain overlay */}
            <div style={{
              position: "absolute", inset: "-100px",
              opacity: 0.035,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "256px 256px",
              animation: "grainMove 0.5s steps(1) infinite",
            }} />
          </div>

          {/* ── LIGHT RAYS ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
            {rays.map(ray => (
              <div key={ray.id} style={{
                position: "absolute",
                left: `${ray.left}%`,
                top: "-10%",
                width: `${ray.width}px`,
                height: "130%",
                background: "linear-gradient(to bottom, rgba(255,200,100,0.0) 0%, rgba(255,180,60,0.9) 30%, rgba(255,150,40,0.5) 70%, rgba(255,200,100,0.0) 100%)",
                opacity: ray.opacity,
                animation: `rayShimmer ${ray.dur}s ease-in-out ${ray.delay}s infinite`,
                transformOrigin: "top center",
                filter: "blur(3px)",
              }} />
            ))}
          </div>

          {/* ── Spice particles ── */}
          {particles.map(p => (
            <div key={p.id} style={{
              position: "absolute",
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              borderRadius: "50%", background: p.color,
              opacity: 0.35,
              animation: `spiceDrift ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
              filter: "blur(0.8px)", pointerEvents: "none",
              zIndex: 2,
            }} />
          ))}

          {/* Gold top border */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px", zIndex: 5,
            background: "linear-gradient(to right, transparent, #FFD700, #FF6B35, #FFD700, transparent)",
            animation: "borderGlow 3s ease-in-out infinite",
          }} />

          {/* Slide dots */}
          <div style={{
            position: "absolute", bottom: "80px", right: "40px",
            display: "flex", flexDirection: "column", gap: "8px", zIndex: 10,
          }}>
            {heroSlides.map((_, i) => (
              <div key={i} onClick={() => setSlideIdx(i)} style={{
                width: i === slideIdx ? "3px" : "2px",
                height: i === slideIdx ? "28px" : "14px",
                borderRadius: "2px",
                background: i === slideIdx
                  ? "linear-gradient(to bottom, #FFD700, #FF6B35)"
                  : "rgba(255,180,80,0.3)",
                cursor: "pointer",
                transition: "all 0.4s",
              }} />
            ))}
          </div>

          {/* ── Hero Text ── */}
          <div style={{ position: "relative", zIndex: 10, padding: "0 24px" }}>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                color: "rgba(255,210,140,0.85)",
                textTransform: "uppercase", fontSize: "12px",
                letterSpacing: "8px", marginBottom: "24px",
                fontFamily: "'Georgia', serif",
              }}
            >
              ✦ Fine Dining Experience ✦
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                fontSize: "clamp(72px, 14vw, 130px)",
                fontWeight: "300",
                fontFamily: "'Georgia', serif",
                color: "white",
                margin: "0 0 8px 0",
                letterSpacing: "8px",
                lineHeight: 1,
                textShadow: "0 0 100px rgba(255,140,0,0.5), 0 4px 40px rgba(0,0,0,0.8)",
              }}
            >
              Prajna
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", margin: "16px 0 20px" }}
            >
              <div style={{ width: "80px", height: "1px", background: "linear-gradient(to right, transparent, #FFD700)" }} />
              <span style={{ color: "#FFD700", fontSize: "18px", filter: "drop-shadow(0 0 8px rgba(255,200,0,0.8))" }}>✦</span>
              <div style={{ width: "80px", height: "1px", background: "linear-gradient(to left, transparent, #FFD700)" }} />
            </motion.div>

            {/* Rotating tagline */}
            <div style={{ height: "36px", overflow: "hidden", marginBottom: "36px" }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tagline}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    color: "rgba(255,210,160,0.9)",
                    fontSize: "16px", letterSpacing: "3px",
                    fontFamily: "'Georgia', serif",
                    fontStyle: "italic", margin: 0,
                    textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                  }}
                >
                  {tagline}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Cuisine pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}
            >
              {[
                { label: "🇮🇳 Indian",  color: "#FF6B35" },
                { label: "🇮🇹 Italian", color: "#6DBF4A" },
                { label: "🇲🇽 Mexican", color: "#FFA500" },
              ].map(c => (
                <span key={c.label} style={{
                  background: "rgba(0,0,0,0.35)",
                  border: `1px solid ${c.color}66`,
                  color: c.color,
                  fontSize: "12px", padding: "6px 18px",
                  borderRadius: "20px", backdropFilter: "blur(12px)",
                  letterSpacing: "1px", fontWeight: "600",
                  boxShadow: `0 0 16px ${c.color}22`,
                }}>
                  {c.label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
            >
              <Link to="/booking" style={{
                background: "linear-gradient(135deg, #FF6B35, #c45200)",
                color: "white", padding: "15px 40px",
                borderRadius: "8px", textDecoration: "none",
                fontWeight: "700", fontSize: "13px",
                letterSpacing: "2px", textTransform: "uppercase",
                boxShadow: "0 8px 30px rgba(255,107,53,0.5), 0 0 60px rgba(255,107,53,0.2)",
                transition: "transform 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Reserve Table
              </Link>
              <Link to="/menu" style={{
                background: "rgba(0,0,0,0.3)",
                color: "white", padding: "15px 40px",
                borderRadius: "8px",
                border: "1.5px solid rgba(255,180,80,0.5)",
                textDecoration: "none", fontWeight: "600",
                fontSize: "13px", letterSpacing: "2px",
                textTransform: "uppercase", backdropFilter: "blur(16px)",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,120,40,0.15)"; e.currentTarget.style.transform = "translateY(-3px)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                View Menu
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              position: "absolute", bottom: "32px", left: "50%",
              transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "8px", color: "rgba(255,200,120,0.5)",
              fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase",
              zIndex: 10,
            }}
          >
            <span>Scroll</span>
            <span style={{ animation: "scrollBob 1.5s ease-in-out infinite" }}>↓</span>
          </motion.div>
        </div>

        {/* ════ SPECIAL DISHES ════ */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "60px" }}
          >
            <div style={{
              position: "relative", borderRadius: "16px", overflow: "hidden",
              padding: "32px 24px", textAlign: "center",
              background: "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, #FFD700, #FF6B35, #FFD700, transparent)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, #FF6B35, #FFD700, #FF6B35, transparent)" }} />
              <p style={{ textTransform: "uppercase", fontSize: "11px", letterSpacing: "6px", color: "rgba(255,200,120,0.7)", marginBottom: "10px", fontFamily: "'Georgia', serif" }}>
                Chef Recommends
              </p>
              <h2 style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontFamily: "'Georgia', serif", fontWeight: "400",
                background: "linear-gradient(135deg, #FFD700, #FF6B35, #FFD700)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                margin: "0 0 12px 0",
              }}>
                Special Dishes
              </h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, #FFD700)" }} />
                <span style={{ color: "#FFD700", fontSize: "16px" }}>✦</span>
                <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left, transparent, #FFD700)" }} />
              </div>
            </div>
          </motion.div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {dishes.map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.03, y: -6 }}
                style={{
                  borderRadius: "18px", overflow: "hidden",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,180,80,0.15)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  cursor: "pointer",
                }}
              >
                <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                  <motion.img
                    src={dish.img} alt={dish.name}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute", top: "12px", left: "12px",
                    background: `${dish.tagColor}22`,
                    border: `1px solid ${dish.tagColor}66`,
                    color: dish.tagColor, fontSize: "11px",
                    padding: "4px 12px", borderRadius: "20px",
                    backdropFilter: "blur(8px)", fontWeight: "700",
                  }}>
                    {dish.tag}
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,5,0,0.7) 0%, transparent 50%)" }} />
                </div>

                <div style={{ padding: "20px 22px 22px" }}>
                  <h3 style={{ fontSize: "20px", marginBottom: "6px", fontFamily: "'Georgia', serif", color: "white" }}>
                    {dish.name}
                  </h3>
                  <p style={{ fontSize: "13px", marginBottom: "18px", color: "rgba(255,200,160,0.7)", lineHeight: 1.5 }}>
                    {dish.desc}
                  </p>
                  <div style={{ height: "1px", background: "linear-gradient(to right, rgba(255,180,80,0.3), transparent)", marginBottom: "16px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontSize: "24px", fontFamily: "'Georgia', serif",
                      background: "linear-gradient(135deg, #FFD700, #FF6B35)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      fontWeight: "700",
                    }}>
                      {dish.price}
                    </span>
                    <Link to="/menu" style={{
                      background: "linear-gradient(135deg, rgba(255,107,53,0.8), rgba(196,82,0,0.8))",
                      color: "white", padding: "8px 20px", borderRadius: "8px",
                      fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
                      fontWeight: "700", textDecoration: "none",
                      border: "1px solid rgba(255,150,50,0.3)",
                    }}>
                      Order
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ textAlign: "center", marginTop: "60px" }}
          >
            <Link to="/menu" style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,180,80,0.4)",
              color: "rgba(255,210,140,0.9)",
              padding: "14px 48px", borderRadius: "8px",
              textDecoration: "none", fontSize: "12px",
              letterSpacing: "4px", textTransform: "uppercase",
              fontWeight: "600", backdropFilter: "blur(10px)",
            }}>
              Explore Full Menu →
            </Link>
          </motion.div>
        </div>

        {/* Bottom gold line */}
        <div style={{
          height: "3px",
          background: "linear-gradient(to right, transparent, #FFD700, #FF6B35, #FFD700, transparent)",
          margin: "0 24px 40px", borderRadius: "2px",
        }} />

      </div>
    </div>
  )
}

export default Home