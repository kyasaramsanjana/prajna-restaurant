import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

/* ================= BANNER CONFIG ================= */

const bannerConfig = {
  "Indian Cuisine": {
    bg: "linear-gradient(135deg, rgba(13,5,0,0.92) 0%, rgba(45,14,0,0.88) 40%, rgba(74,24,0,0.84) 70%, rgba(107,37,0,0.88) 100%)",
    accentColor: "rgba(255,107,53,0.2)",
    goldColor: "#FFD700",
    glowColor: "rgba(255,107,53,0.3)",
    borderColor1: "#FFD700",
    borderColor2: "#FF6B35",
    textGradient: "linear-gradient(135deg, #FFD700, #FF6B35, #FFD700)",
    subColor: "rgba(255,220,160,0.85)",
    dividerColor: "#FFD700",
    headlines: ["Aromatic","Flavorful","Spicy","Authentic","Royal"],
    tags: ["🌶️ Spicy", "🌿 Fresh", "🍯 Rich", "🔥 Dum Style"],
    pillBg: "rgba(255,107,53,0.15)",
    pillBorder: "rgba(255,200,80,0.35)",
    pillText: "#FFD9A0",
    shapes: [
      { type: "ring", x: 8,  y: 50, size: 120, opacity: 0.07, delay: 0 },
      { type: "ring", x: 88, y: 50, size: 180, opacity: 0.05, delay: 0.4 },
      { type: "ring", x: 50, y: 10, size: 80,  opacity: 0.06, delay: 0.8 },
      { type: "dot",  x: 15, y: 25, size: 6,   opacity: 0.4,  delay: 0.2 },
      { type: "dot",  x: 82, y: 70, size: 4,   opacity: 0.35, delay: 0.6 },
      { type: "dot",  x: 70, y: 15, size: 5,   opacity: 0.3,  delay: 1.0 },
      { type: "dot",  x: 25, y: 78, size: 3,   opacity: 0.45, delay: 0.3 },
      { type: "dot",  x: 92, y: 35, size: 4,   opacity: 0.3,  delay: 0.9 },
      { type: "line", x: 5,  y: 35, w: 60,  opacity: 0.08, delay: 0.5 },
      { type: "line", x: 70, y: 72, w: 80,  opacity: 0.06, delay: 0.7 },
    ],
  },
  "Italian Cuisine": {
    bg: "linear-gradient(135deg, rgba(13,5,0,0.92) 0%, rgba(45,14,0,0.88) 40%, rgba(74,24,0,0.84) 70%, rgba(107,37,0,0.88) 100%)",
    accentColor: "rgba(255,180,80,0.2)",
    goldColor: "#FFD700",
    glowColor: "rgba(255,140,40,0.12)",
    borderColor1: "#FFD700",
    borderColor2: "#FF6B35",
    textGradient: "linear-gradient(135deg, #FFD700, #FF6B35, #FFD700)",
    subColor: "rgba(255,220,160,0.85)",
    dividerColor: "#FFD700",
    headlines: ["Rustic","Authentic","Creamy","Artisan","Classico"],
    tags: ["🫒 Olive Oil", "🧀 Cheese", "🍷 Wine", "🌿 Basil"],
    pillBg: "rgba(255,107,53,0.12)",
    pillBorder: "rgba(255,200,80,0.3)",
    pillText: "#FFD9A0",
    shapes: [
      { type: "ring", x: 8,  y: 50, size: 120, opacity: 0.07, delay: 0 },
      { type: "ring", x: 88, y: 50, size: 180, opacity: 0.05, delay: 0.4 },
      { type: "ring", x: 50, y: 10, size: 80,  opacity: 0.06, delay: 0.8 },
      { type: "dot",  x: 15, y: 25, size: 6,   opacity: 0.4,  delay: 0.2 },
      { type: "dot",  x: 82, y: 70, size: 4,   opacity: 0.35, delay: 0.6 },
      { type: "dot",  x: 70, y: 15, size: 5,   opacity: 0.3,  delay: 1.0 },
      { type: "dot",  x: 25, y: 78, size: 3,   opacity: 0.45, delay: 0.3 },
      { type: "dot",  x: 92, y: 35, size: 4,   opacity: 0.3,  delay: 0.9 },
      { type: "line", x: 5,  y: 35, w: 60,  opacity: 0.08, delay: 0.5 },
      { type: "line", x: 70, y: 72, w: 80,  opacity: 0.06, delay: 0.7 },
    ],
  },
  "Mexican Cuisine": {
    bg: "linear-gradient(135deg, rgba(13,5,0,0.92) 0%, rgba(45,18,0,0.88) 40%, rgba(80,35,0,0.84) 70%, rgba(100,50,0,0.88) 100%)",
    accentColor: "rgba(255,165,0,0.2)",
    goldColor: "#FFC845",
    glowColor: "rgba(255,165,0,0.28)",
    borderColor1: "#FFA500",
    borderColor2: "#FF4500",
    textGradient: "linear-gradient(135deg, #FFC845, #FF4500, #FFC845)",
    subColor: "rgba(255,210,150,0.85)",
    dividerColor: "#FFA500",
    headlines: ["Fiesta","Caliente","Zesty","Vibrant","Picante"],
    tags: ["🌮 Tacos", "🥑 Fresh", "🌶️ Hot", "🎉 Fiesta"],
    pillBg: "rgba(220,80,0,0.15)",
    pillBorder: "rgba(255,180,50,0.35)",
    pillText: "#FFD9A0",
    shapes: [
      { type: "ring", x: 8,  y: 50, size: 120, opacity: 0.07, delay: 0 },
      { type: "ring", x: 88, y: 50, size: 180, opacity: 0.05, delay: 0.4 },
      { type: "ring", x: 50, y: 10, size: 80,  opacity: 0.06, delay: 0.8 },
      { type: "dot",  x: 15, y: 25, size: 6,   opacity: 0.4,  delay: 0.2 },
      { type: "dot",  x: 82, y: 70, size: 4,   opacity: 0.35, delay: 0.6 },
      { type: "dot",  x: 70, y: 15, size: 5,   opacity: 0.3,  delay: 1.0 },
      { type: "dot",  x: 25, y: 78, size: 3,   opacity: 0.45, delay: 0.3 },
      { type: "dot",  x: 92, y: 35, size: 4,   opacity: 0.3,  delay: 0.9 },
      { type: "line", x: 5,  y: 35, w: 60,  opacity: 0.08, delay: 0.5 },
      { type: "line", x: 70, y: 72, w: 80,  opacity: 0.06, delay: 0.7 },
    ],
  },
}

/* ================= REVEAL ON SCROLL ================= */

function RevealOnScroll({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ================= CUISINE BANNER ================= */

function CuisineBanner({ cuisineName }) {
  const [tick, setTick] = useState(0)
  const cfg = bannerConfig[cuisineName]
  const word = cfg.headlines[tick % cfg.headlines.length]

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "240px",
      overflow: "hidden",
      borderRadius: "20px",
      background: cfg.bg,
      marginBottom: "8px",
    }}>
      <style>{`
        @keyframes ringPulse {
          0%   { transform: translate(-50%,-50%) scale(1);    opacity: 0.08; }
          50%  { transform: translate(-50%,-50%) scale(1.06); opacity: 0.14; }
          100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.08; }
        }
        @keyframes dotFloat {
          0%   { transform: translate(0,0); }
          50%  { transform: translate(0,-8px); }
          100% { transform: translate(0,0); }
        }
        @keyframes shimmerLine {
          0%   { opacity: 0.04; transform: scaleX(0.7); }
          50%  { opacity: 0.12; transform: scaleX(1.05); }
          100% { opacity: 0.04; transform: scaleX(0.7); }
        }
      `}</style>

      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, ${cfg.glowColor} 0%, transparent 65%)`,
      }} />

      {/* Geometric shapes */}
      {cfg.shapes.map((s, i) => {
        if (s.type === "ring") return (
          <div key={i} style={{
            position: "absolute",
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            borderRadius: "50%",
            border: "1px solid rgba(255,200,120,0.12)",
            transform: "translate(-50%,-50%)",
            animation: `ringPulse ${4 + i * 0.6}s ease-in-out ${s.delay}s infinite`,
          }} />
        )
        if (s.type === "dot") return (
          <div key={i} style={{
            position: "absolute",
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            borderRadius: "50%",
            background: cfg.goldColor,
            opacity: s.opacity,
            animation: `dotFloat ${3 + i * 0.4}s ease-in-out ${s.delay}s infinite`,
          }} />
        )
        if (s.type === "line") return (
          <div key={i} style={{
            position: "absolute",
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.w, height: "1px",
            background: `linear-gradient(to right, transparent, ${cfg.accentColor}, transparent)`,
            animation: `shimmerLine ${3.5 + i * 0.5}s ease-in-out ${s.delay}s infinite`,
            transformOrigin: "left center",
          }} />
        )
        return null
      })}

      {/* Border lines */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:"2px",
        background: `linear-gradient(to right, transparent, ${cfg.borderColor1}, ${cfg.borderColor2}, ${cfg.borderColor1}, transparent)`
      }} />
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:"2px",
        background: `linear-gradient(to right, transparent, ${cfg.borderColor2}, ${cfg.borderColor1}, ${cfg.borderColor2}, transparent)`
      }} />

      {/* Center content */}
      <div style={{
        position:"absolute", inset:0,
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        zIndex:10, gap:"10px",
      }}>
        <div style={{ height:"52px", overflow:"hidden", display:"flex", alignItems:"center" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={word}
              initial={{ y: 44, opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0,  opacity: 1, filter: "blur(0px)" }}
              exit={{   y: -44, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
              style={{
                fontSize: "44px", fontWeight: "700",
                fontFamily: "'Georgia', serif",
                background: cfg.textGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "4px",
                textTransform: "uppercase",
                display: "block",
              }}
            >
              {word}
            </motion.span>
          </AnimatePresence>
        </div>

        <div style={{
          fontSize: "13px", color: cfg.subColor,
          fontFamily: "'Georgia', serif",
          letterSpacing: "6px", textTransform: "uppercase",
          fontStyle: "italic",
        }}>
          {cuisineName}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginTop:"2px" }}>
          <div style={{ width:"70px", height:"1px", background:`linear-gradient(to right, transparent, ${cfg.dividerColor})` }} />
          <div style={{ width:"5px", height:"5px", borderRadius:"50%", background: cfg.goldColor, boxShadow:`0 0 8px ${cfg.goldColor}` }} />
          <div style={{ width:"70px", height:"1px", background:`linear-gradient(to left, transparent, ${cfg.dividerColor})` }} />
        </div>

        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", justifyContent:"center", marginTop:"4px" }}>
          {cfg.tags.map(tag => (
            <span key={tag} style={{
              background: cfg.pillBg,
              border: `1px solid ${cfg.pillBorder}`,
              color: cfg.pillText,
              fontSize:"11px", padding:"3px 12px",
              borderRadius:"20px", backdropFilter:"blur(8px)",
              letterSpacing:"0.5px",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ================= CAROUSEL ================= */

function Carousel({ items }) {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const safeCurrent = current >= items.length ? 0 : current
  const prev = () => setCurrent(i => (i === 0 ? items.length - 1 : i - 1))
  const next = () => setCurrent(i => (i === items.length - 1 ? 0 : i + 1))

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px", color: "rgba(255,200,160,0.5)", fontSize: "18px" }}>
        🍽️ No items found in this category
      </div>
    )
  }

  /* ── MOBILE LAYOUT ── */
  if (isMobile) {
    return (
      <RevealOnScroll delay={0.1}>
        <div style={{ padding: "20px 20px 40px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={items[safeCurrent].name}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                width: "100%",
                height: "420px",
                position: "relative",
                boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={items[safeCurrent].img}
                alt={items[safeCurrent].name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Veg/Non-Veg badge */}
              {items[safeCurrent].type && (
                <div style={{
                  position: "absolute", top: "14px", right: "14px",
                  background: items[safeCurrent].type === "veg"
                    ? "rgba(34,197,94,0.9)"
                    : "rgba(239,68,68,0.9)",
                  borderRadius: "8px",
                  padding: "5px 12px",
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "11px", fontWeight: "700", color: "white",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                  zIndex: 30, letterSpacing: "1px",
                }}>
                  <span style={{
                    width: "8px", height: "8px",
                    borderRadius: items[safeCurrent].type === "veg" ? "50%" : "0",
                    background: "white", display: "inline-block", flexShrink: 0,
                  }} />
                  {items[safeCurrent].type === "veg" ? "VEG" : "NON-VEG"}
                </div>
              )}

              <div style={{
                position: "absolute",
                inset: 0,
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                background: "linear-gradient(to top, rgba(13,5,0,0.95) 0%, transparent 70%)",
              }}>
                <h3 style={{
                  color: "white",
                  fontSize: "20px",
                  fontFamily: "'Georgia', serif",
                  marginBottom: "6px",
                  margin: "0 0 6px 0",
                }}>
                  {items[safeCurrent].name}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ color: "rgba(255,200,160,0.8)", fontSize: "13px", margin: 0 }}>
                    {items[safeCurrent].desc}
                  </p>
                  <span style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    fontFamily: "'Georgia', serif",
                    background: "linear-gradient(135deg,#FFD700,#FF6B35)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    {items[safeCurrent].price}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px" }}>
            {items.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === safeCurrent ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === safeCurrent ? "#FFD700" : "rgba(255,200,120,0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "16px" }}>
            <button onClick={prev} className="navBtn">←</button>
            <button onClick={next} className="navBtn">→</button>
          </div>

          <style>{`
            .navBtn {
              width: 52px; height: 52px; border-radius: 50%;
              border: 1.5px solid rgba(255,180,80,0.4);
              background: rgba(255,140,40,0.08);
              color: rgba(255,200,120,0.9); font-size: 20px;
              cursor: pointer; transition: all 0.3s;
              backdrop-filter: blur(12px);
            }
            .navBtn:hover {
              background: rgba(255,140,40,0.2);
              border-color: rgba(255,180,80,0.7);
              transform: scale(1.1);
              box-shadow: 0 0 20px rgba(255,140,40,0.2);
            }
          `}</style>
        </div>
      </RevealOnScroll>
    )
  }

  /* ── DESKTOP 3D CAROUSEL ── */
  const visibleItems =
    items.length === 1 ? [items[0]] :
    items.length === 2 ? [items[0], items[1]] :
    [
      items[(safeCurrent - 1 + items.length) % items.length],
      items[safeCurrent],
      items[(safeCurrent + 1) % items.length],
    ]

  return (
    <RevealOnScroll delay={0.1}>
      <div className="relative py-12 overflow-hidden">
        <div className="flex justify-center items-center" style={{ height: "520px", perspective: "1400px" }}>
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, i) => {
              const isCenter = items.length === 1 ? true : items.length === 2 ? i === 0 : i === 1
              const isLeft = items.length >= 3 && i === 0

              return (
                <motion.div
                  key={item.name + i}
                  layout
                  animate={{
                    x: isCenter ? 0 : isLeft ? -360 : 360,
                    scale: isCenter ? 1.08 : 0.88,
                    rotateY: isCenter ? 0 : isLeft ? 22 : -22,
                    opacity: isCenter ? 1 : 0.55,
                  }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    width: isCenter ? "360px" : "280px",
                    height: isCenter ? "470px" : "410px",
                    borderRadius: "18px",
                    overflow: "hidden",
                    cursor: isCenter ? "default" : "pointer",
                    zIndex: isCenter ? 20 : 5,
                    boxShadow: isCenter
                      ? "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,180,80,0.12)"
                      : "0 15px 40px rgba(0,0,0,0.4)",
                  }}
                  onClick={() => {
                    if (isLeft) prev()
                    if (!isCenter && !isLeft) next()
                  }}
                >
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    animate={{ scale: isCenter ? 1.06 : 1 }}
                    transition={{ duration: 1.8 }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {isCenter && item.type && (
                    <div style={{
                      position: "absolute", top: "14px", right: "14px",
                      background: item.type === "veg"
                        ? "rgba(34,197,94,0.9)"
                        : "rgba(239,68,68,0.9)",
                      borderRadius: "8px",
                      padding: "5px 12px",
                      display: "flex", alignItems: "center", gap: "6px",
                      fontSize: "11px", fontWeight: "700", color: "white",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                      zIndex: 30, letterSpacing: "1px",
                    }}>
                      <span style={{
                        width: "8px", height: "8px",
                        borderRadius: item.type === "veg" ? "50%" : "0",
                        background: "white", display: "inline-block", flexShrink: 0,
                      }} />
                      {item.type === "veg" ? "VEG" : "NON-VEG"}
                    </div>
                  )}

                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.25 }}
                      style={{
                        position: "absolute", inset: 0, padding: "28px",
                        display: "flex", flexDirection: "column", justifyContent: "flex-end",
                        background: "linear-gradient(to top, rgba(13,5,0,0.95) 0%, rgba(13,5,0,0.55) 35%, transparent 65%)",
                      }}
                    >
                      <h3 style={{
                        color: "white", fontSize: "22px", marginBottom: "8px",
                        fontFamily: "'Georgia', serif", fontWeight: "400",
                        textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                      }}>
                        {item.name}
                      </h3>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "rgba(255,200,160,0.8)", margin: 0, fontSize: "13px" }}>{item.desc}</p>
                        <span style={{
                          fontSize: "22px", fontWeight: "700",
                          fontFamily: "'Georgia', serif",
                          background: "linear-gradient(135deg, #FFD700, #FF6B35)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}>{item.price}</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button onClick={prev} className="navBtn">←</button>
          <button onClick={next} className="navBtn">→</button>
        </div>

        <style>{`
          .navBtn {
            width: 52px; height: 52px; border-radius: 50%;
            border: 1.5px solid rgba(255,180,80,0.4);
            background: rgba(255,140,40,0.08);
            color: rgba(255,200,120,0.9); font-size: 20px;
            cursor: pointer; transition: all 0.3s;
            backdrop-filter: blur(12px);
          }
          .navBtn:hover {
            background: rgba(255,140,40,0.2);
            border-color: rgba(255,180,80,0.7);
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255,140,40,0.2);
          }
        `}</style>
      </div>
    </RevealOnScroll>
  )
}

/* ================= MENU DATA ================= */

const categories = [
  {
    cuisine: "Indian Cuisine",
    bg: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&q=80",
    hasVegFilter: true,
    showBanner: true,
    sections: [
      {
        name: "Biryani",
        items: [
          { name: "Chicken Biryani",   desc: "Hyderabadi style",       price: "₹180", type: "non-veg", img: "https://wallpapercave.com/wp/wp7556073.jpg" },
          { name: "Mutton Biryani",    desc: "Slow cooked",             price: "₹250", type: "non-veg", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600" },
          { name: "Prawn Biryani",     desc: "Coastal spices",          price: "₹280", type: "non-veg", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600" },
          { name: "Veg Biryani",       desc: "Garden vegetables",       price: "₹120", type: "veg",     img: "https://www.fatrainbow.com/wp-content/uploads/2020/10/hyderabadi-vegetable-dum-biryani-8.jpg" },
          { name: "Egg Biryani",       desc: "Boiled egg masala",       price: "₹130", type: "non-veg", img: "https://i0.wp.com/mytastycurry.com/wp-content/uploads/2018/06/egg-biryani-recipe.jpg?resize=600%2C900&ssl=1" },
          { name: "Paneer Biryani",    desc: "Rich paneer rice",        price: "₹160", type: "veg",     img: "https://kitchenmai.com/wp-content/uploads/2020/07/paneer_bir_blog.jpg" },
          { name: "Bagara Rice",       desc: "Telangana flavored rice", price: "₹160", type: "veg",     img: "https://www.whiskaffair.com/wp-content/uploads/2020/09/Bagara-Rice-2-1-1024x1536.jpg" },
          { name: "Aloo Biryani",      desc: "Potato dum biryani",      price: "₹170", type: "veg",     img: "https://1.bp.blogspot.com/-U5ZC-ImlN7U/XzLjfCfkvVI/AAAAAAAAAUQ/w-hikx_IvK0IWKlFXunTBnZ-5VgCNe-AACLcBGAsYHQ/s0/hyderabadi-aloo-dum-biryani.jpg" },
        ],
      },
      {
        name: "Curries",
        items: [
          { name: "Butter Chicken",      desc: "Creamy curry",           price: "₹220", type: "non-veg", img: "https://www.chompslurrpburp.com/wp-content/uploads/2022/11/butter-chicken-3-819x1024.jpg" },
          { name: "Paneer Tikka Masala", desc: "Paneer gravy",           price: "₹190", type: "veg",     img: "https://kannanskitchen.com/wp-content/uploads/2023/01/DSC_4752-1362x2048.jpg" },
          { name: "Dal Makhani",         desc: "Slow cooked dal",        price: "₹150", type: "veg",     img: "https://myfoodstory.com/wp-content/uploads/2018/08/Dal-Makhani-New-4.jpg?fit=1200,9999" },
          { name: "Gutti Vankay",        desc: "Andhra style veg curry", price: "₹150", type: "veg",     img: "https://cakeworkorange.com/wp-content/uploads/2020/11/stuffed-brinjal-curry-1-scaled.jpg" },
          { name: "Mutton Rogan Josh",   desc: "Kashmiri curry",         price: "₹280", type: "non-veg", img: "https://www.whiskaffair.com/wp-content/uploads/2019/02/Mutton-Rogan-Josh-2-1.jpg" },
          { name: "Kadai Chicken",       desc: "Spicy masala",           price: "₹210", type: "non-veg", img: "http://www.flavorquotient.com/wp-content/uploads/2016/08/Kadai-Chicken-FQ-4-1-of-1.jpg" },
        ],
      },
      {
        name: "Starters",
        items: [
          { name: "Veg Manchuria",    desc: "Crispy veg balls",      price: "₹120", type: "veg",     img: "https://wallpaperaccess.com/full/8995920.jpg" },
          { name: "Gobi Manchurian",  desc: "Cauliflower fritters",  price: "₹110", type: "veg",     img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600" },
          { name: "Egg Roast",        desc: "Spiced egg fry",        price: "₹80",  type: "non-veg", img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2013/01/egg-roast1.jpg" },
          { name: "Chilli Chicken",   desc: "Indo-Chinese classic",  price: "₹160", type: "non-veg", img: "https://spicysouthernkitchen.com/wp-content/uploads/general-tsau-chicken-8.jpg" },
          { name: "Chicken 65",       desc: "Indo classic",          price: "₹180", type: "non-veg", img: "https://sinfullyspicy.com/wp-content/uploads/2021/10/1.jpg" },
          { name: "Tandoori Chicken", desc: "Smoky Indian BBQ",      price: "₹160", type: "non-veg", img: "https://jamilghar.com/wp-content/uploads/2022/01/grilled-tandoori-chicken13-900x1200.jpeg" },
        ],
      },
      {
        name: "Desserts",
        items: [
          { name: "Gulab Jamun",      desc: "Milk dumplings",   price: "₹60", type: "veg", img: "https://butteroverbae.com/wp-content/uploads/2021/12/gulab-jamun-with-milk-powder-final.jpg" },
          { name: "Rasmalai",         desc: "Sweet cheese",     price: "₹80", type: "veg", img: "https://www.cookclickndevour.com/wp-content/uploads/2017/08/rasmalai-recipe-d-766x1024.jpg" },
          { name: "Jalebi",           desc: "Sugar spirals",    price: "₹50", type: "veg", img: "https://foodaazz.com/wp-content/uploads/2023/11/Jalebi-1.png" },
          { name: "Double Ka Meetha", desc: "Hyderabadi sweet", price: "₹90", type: "veg", img: "https://www.whiskaffair.com/wp-content/uploads/2018/08/Double-ka-Meetha-2-1.jpg" },
          { name: "Kheer",            desc: "Rice pudding",     price: "₹70", type: "veg", img: "https://masalaandchai.com/wp-content/uploads/2021/08/Kheer.jpg" },
        ],
      },
    ],
  },
  {
    cuisine: "Italian Cuisine",
    bg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80",
    hasVegFilter: false,
    showBanner: true,
    sections: [
      {
        name: "Pizza",
        items: [
          { name: "Margherita",  desc: "Classic basil",  price: "₹250", img: "https://tse4.mm.bing.net/th/id/OIP.xUOUpDcc1o0_yThOQwB8TwAAAA?w=427&h=640&rs=1&pid=ImgDetMain&o=7&rm=3" },
          { name: "Pepperoni",   desc: "Cheese loaded",  price: "₹350", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600" },
          { name: "BBQ Chicken", desc: "Smoky flavor",   price: "₹340", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600" },
          { name: "Four Cheese", desc: "Cheese mix",     price: "₹360", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600" },
          { name: "Veg Supreme", desc: "Loaded veggies", price: "₹280", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600" },
        ],
      },
      {
        name: "Pasta",
        items: [
          { name: "Spaghetti Carbonara", desc: "Creamy egg & cheese sauce", price: "₹260", img: "https://easyweeknight.com/wp-content/uploads/2019/02/spaghetti-carbonara6.jpg" },
          { name: "Pesto Pasta",         desc: "Basil, olive oil & nuts",   price: "₹240", img: "https://cdn.loveandlemons.com/wp-content/uploads/2025/07/pesto-pasta-recipe.jpg" },
          { name: "Fettuccine Alfredo",  desc: "Butter & parmesan sauce",   price: "₹300", img: "https://www.twopeasandtheirpod.com/wp-content/uploads/2018/05/fettuccine-alfredo-6-650x959.jpg" },
          { name: "Ravioli",             desc: "Stuffed pasta",             price: "₹280", img: "https://www.halfbakedharvest.com/wp-content/uploads/2020/04/Lemon-Butter-Cheese-Ravioli-with-Garlic-Basil-Breadcrumbs-1.jpg" },
          { name: "Mac & Cheese",        desc: "Cheesy pasta",              price: "₹230", img: "https://cookaifood.com/bundles/project/images/recipes/3437_1_1715540044.png" },
        ],
      },
      {
        name: "Desserts",
        items: [
          { name: "Tiramisu",    desc: "Coffee-flavored dessert",  price: "₹260", img: "https://cdn.pixabay.com/photo/2023/10/26/14/31/cake-8342822_1280.jpg" },
          { name: "Panna Cotta", desc: "Creamy pudding",           price: "₹240", img: "https://djalalicooks.com/wp-content/uploads/2021/05/IMG_5955.jpg" },
          { name: "Gelato",      desc: "Italian ice cream",        price: "₹300", img: "https://images.pexels.com/photos/5061254/pexels-photo-5061254.jpeg?cs=srgb&dl=pexels-roman-odintsov-5061254.jpg&fm=jpg" },
          { name: "Cannoli",     desc: "Crispy pastry sweet fill", price: "₹280", img: "https://thecrumbykitchen.com/wp-content/uploads/2018/03/Cannoli-Recipe-4-scaled.jpg" },
        ],
      },
    ],
  },
  {
    cuisine: "Mexican Cuisine",
    bg: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1600&q=80",
    hasVegFilter: false,
    showBanner: true,
    sections: [
      {
        name: "Tacos & Burritos",
        items: [
          { name: "Chicken Taco", desc: "Grilled taco",  price: "₹220", img: "https://butteryourbiscuit.com/wp-content/uploads/2020/10/baked-chicken-tacos-1.jpeg" },
          { name: "Fish Taco",    desc: "Crispy fish",   price: "₹240", img: "https://tse4.mm.bing.net/th/id/OIP.oShCKDD5XpGsZF6HkUjDBQHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3" },
          { name: "Paneer Taco",  desc: "Veg filling",   price: "₹210", img: "https://tse1.mm.bing.net/th/id/OIP.OlAymCiDu1N8TFJBLGlQhAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3" },
          { name: "Veg Burrito",  desc: "Mexican rice",  price: "₹200", img: "https://www.theseasonedmom.com/wp-content/uploads/2018/02/The-Easiest-Burrito-Recipe-9.jpg" },
        ],
      },
      {
        name: "Nachos & Sides",
        items: [
          { name: "Loaded Nachos",     desc: "Cheese toppings", price: "₹180", img: "https://images.squarespace-cdn.com/content/v1/5eb161ea3e308e68cc4ec740/1626793241107-8ISVYADTNVQCE0MW97RQ/BSB-18.jpg" },
          { name: "Guacamole",         desc: "Avocado dip",     price: "₹150", img: "https://www.cubesnjuliennes.com/wp-content/uploads/2021/02/Homemade-Guacamole-Recipe.jpg" },
          { name: "Mexican Rice",      desc: "Tomato rice",     price: "₹160", img: "https://www.rachelcooks.com/wp-content/uploads/2021/01/mexican-rice-web-1-of-6-1412x2048.jpg" },
          { name: "Churros",           desc: "Sweet sticks",    price: "₹150", img: "https://www.recipetineats.com/tachyon/2016/08/Churros_0.jpg" },
          { name: "Cheese Quesadilla", desc: "Cheese tortilla", price: "₹200", img: "https://i.pinimg.com/736x/f6/62/81/f6628127945517491088d06b5caac05c.jpg" },
        ],
      },
    ],
  },
]

/* ================= MENU PAGE ================= */

function Menu() {
  const [activeCuisine, setActiveCuisine] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [vegFilter, setVegFilter] = useState("all")

  const cuisine = categories[activeCuisine]
  const section = cuisine.sections[activeSection]

  const handleCuisineChange = (i) => {
    setActiveCuisine(i)
    setActiveSection(0)
    setVegFilter("all")
  }

  const filteredItems = cuisine.hasVegFilter && vegFilter !== "all"
    ? section.items.filter(item => item.type === vegFilter)
    : section.items

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "linear-gradient(160deg, #0d0500 0%, #1a0a00 30%, #2d1000 60%, #0d0500 100%)" }} />
      <style>{`
        @keyframes orbFloat1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(70px,50px) scale(1.2); } }
        @keyframes orbFloat2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-50px,-70px) scale(1.15); } }
      `}</style>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,80,0,0.14) 0%, transparent 70%)", top: "-100px", left: "-100px", animation: "orbFloat1 9s ease-in-out infinite alternate" }} />
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,140,0,0.09) 0%, transparent 70%)", bottom: "-60px", right: "-80px", animation: "orbFloat2 11s ease-in-out infinite alternate" }} />
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* Header */}
        <RevealOnScroll>
          <div style={{ textAlign: "center", padding: "52px 24px 20px" }}>
            <p style={{
              color: "rgba(255,200,120,0.6)", fontSize: "10px",
              letterSpacing: "6px", textTransform: "uppercase",
              fontFamily: "'Georgia', serif", marginBottom: "10px",
            }}>
              ✦ Prajna Restaurant ✦
            </p>
            <h1 style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontFamily: "'Georgia', serif", fontWeight: "300",
              background: "linear-gradient(135deg, #FFD700, #FF6B35, #FFD700)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              margin: "0 0 10px 0", letterSpacing: "4px",
            }}>
              Our Menu
            </h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right, transparent, #FFD700)" }} />
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#FFD700" }} />
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(to left, transparent, #FFD700)" }} />
            </div>
          </div>
        </RevealOnScroll>

        {/* Cuisine Tabs */}
        <RevealOnScroll delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", padding: "16px 24px 24px", flexWrap: "wrap" }}>
            {categories.map((cat, i) => (
              <motion.button
                key={cat.cuisine}
                onClick={() => handleCuisineChange(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "10px 28px", borderRadius: "30px",
                  border: activeCuisine === i
                    ? "1.5px solid rgba(255,180,80,0.7)"
                    : "1.5px solid rgba(255,255,255,0.2)",
                  background: activeCuisine === i
                    ? "rgba(255,140,40,0.18)"
                    : "rgba(255,255,255,0.06)",
                  color: activeCuisine === i ? "#FFD9A0" : "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(12px)",
                  fontWeight: "600", cursor: "pointer",
                  fontSize: "14px", letterSpacing: "1px",
                  transition: "all 0.3s",
                  boxShadow: activeCuisine === i ? "0 0 20px rgba(255,140,40,0.15)" : "none",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {cat.cuisine}
              </motion.button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Banner */}
        <RevealOnScroll delay={0.15}>
          <AnimatePresence>
            {cuisine.showBanner && (
              <motion.div
                key={activeCuisine + "-banner"}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
                style={{ padding: "0 24px" }}
              >
                <CuisineBanner cuisineName={cuisine.cuisine} />
              </motion.div>
            )}
          </AnimatePresence>
        </RevealOnScroll>

        {/* Section Tabs */}
        <RevealOnScroll delay={0.2}>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", padding: "16px 24px 8px" }}>
            {cuisine.sections.map((sec, i) => (
              <motion.button
                key={sec.name + i}
                onClick={() => setActiveSection(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "7px 20px", borderRadius: "20px",
                  border: activeSection === i
                    ? "1px solid rgba(255,180,80,0.6)"
                    : "1px solid rgba(255,255,255,0.2)",
                  background: activeSection === i
                    ? "rgba(255,140,40,0.15)"
                    : "rgba(255,255,255,0.06)",
                  color: activeSection === i ? "#FFD9A0" : "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(8px)",
                  cursor: "pointer", fontSize: "13px",
                  transition: "all 0.25s", letterSpacing: "0.5px",
                }}
              >
                {sec.name}
              </motion.button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Veg Filter */}
        {cuisine.hasVegFilter && (
          <RevealOnScroll delay={0.25}>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", padding: "12px 0 4px", flexWrap: "wrap" }}>
              {[
                { key: "all",     label: "All",     color: "#9B7DB8", dot: "◆" },
                { key: "veg",     label: "Veg",     color: "#16a34a", dot: "●" },
                { key: "non-veg", label: "Non-Veg", color: "#dc2626", dot: "●" },
              ].map(opt => (
                <motion.button
                  key={opt.key}
                  onClick={() => setVegFilter(opt.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: "7px 22px", borderRadius: "20px",
                    border: `1.5px solid ${opt.color}`,
                    background: vegFilter === opt.key ? opt.color : "rgba(255,255,255,0.06)",
                    color: "white", fontWeight: "600",
                    cursor: "pointer", fontSize: "13px",
                    transition: "all 0.25s", letterSpacing: "0.5px",
                    backdropFilter: "blur(4px)",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}
                >
                  <span style={{ fontSize: "8px", color: vegFilter === opt.key ? "white" : opt.color }}>{opt.dot}</span>
                  {opt.label}
                </motion.button>
              ))}
            </div>
            {vegFilter !== "all" && (
              <p style={{ textAlign: "center", color: "rgba(255,200,160,0.6)", fontSize: "12px", marginTop: "8px", letterSpacing: "1px" }}>
                {filteredItems.length} {vegFilter} item{filteredItems.length !== 1 ? "s" : ""} in {section.name}
              </p>
            )}
          </RevealOnScroll>
        )}

        <Carousel key={`${activeCuisine}-${activeSection}-${vegFilter}`} items={filteredItems} />
      </div>
    </div>
  )
}

export default function App() {
  return <Menu />
}