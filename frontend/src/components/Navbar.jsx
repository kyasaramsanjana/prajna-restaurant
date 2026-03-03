import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location])

  const links = [
    { label: "Home",    to: "/" },
    { label: "Menu",    to: "/menu" },
    { label: "Booking", to: "/booking" },
    { label: "Contact", to: "/contact" },
  ]

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to)

  return (
    <>
      <style>{`
        @keyframes navBorderPulse {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
      `}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
          height: "68px",
          background: scrolled
            ? "rgba(13,5,0,0.97)"
            : "rgba(13,5,0,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,180,80,0.2)"
            : "1px solid rgba(255,180,80,0.08)",
          transition: "all 0.4s ease",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Gold bottom glow line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,180,60,0.3), rgba(255,140,40,0.5), rgba(255,180,60,0.3), transparent)",
          animation: "navBorderPulse 4s ease-in-out infinite",
        }} />

        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          height: "100%", padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <h1 style={{
                fontSize: "22px", fontFamily: "'Georgia', serif", fontWeight: "300",
                background: "linear-gradient(135deg, #FFD700, #FF9500, #FF6B35)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: "6px", margin: 0,
              }}>
                PRAJNA
              </h1>
              <p style={{
                fontSize: "7px", letterSpacing: "4px", textTransform: "uppercase",
                color: "rgba(255,200,120,0.45)", fontFamily: "'Georgia', serif",
                margin: "1px 0 0 1px",
              }}>
                Fine Dining
              </p>
            </motion.div>
          </Link>

          {/* Desktop nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="desktop-nav">
            {links.map((link) => (
              <Link key={link.to} to={link.to} style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ position: "relative", padding: "8px 18px" }}
                >
                  <span style={{
                    fontSize: "11px", letterSpacing: "2.5px",
                    textTransform: "uppercase", fontWeight: "500",
                    fontFamily: "'Georgia', serif",
                    color: isActive(link.to)
                      ? "#FFD9A0"
                      : "rgba(255,220,180,0.6)",
                    transition: "color 0.3s",
                  }}>
                    {link.label}
                  </span>

                  {/* Active underline */}
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="activeUnderline"
                      style={{
                        position: "absolute", bottom: "2px", left: "18px", right: "18px",
                        height: "1px",
                        background: "linear-gradient(to right, transparent, #FFD700, #FF6B35, transparent)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}

            {/* Reserve Table CTA */}
            <Link to="/booking" style={{ textDecoration: "none", marginLeft: "12px" }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(255,107,53,0.4)" }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "9px 22px",
                  background: "linear-gradient(135deg, #FF6B35, #c45200)",
                  border: "none", borderRadius: "6px",
                  color: "white", fontSize: "11px",
                  fontWeight: "700", letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Georgia', serif",
                  boxShadow: "0 2px 16px rgba(255,107,53,0.25)",
                  transition: "all 0.3s",
                }}
              >
                Reserve Table
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display: "none",
              background: "none", border: "none", cursor: "pointer",
              padding: "8px", color: "rgba(255,200,120,0.8)", fontSize: "20px",
            }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                overflow: "hidden",
                background: "rgba(13,5,0,0.98)",
                borderTop: "1px solid rgba(255,180,80,0.12)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link to={link.to} style={{ textDecoration: "none" }}>
                      <div style={{
                        padding: "12px 16px", borderRadius: "8px",
                        background: isActive(link.to) ? "rgba(255,140,40,0.12)" : "transparent",
                        border: isActive(link.to) ? "1px solid rgba(255,180,80,0.2)" : "1px solid transparent",
                        color: isActive(link.to) ? "#FFD9A0" : "rgba(255,210,160,0.6)",
                        fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase",
                        fontFamily: "'Georgia', serif",
                        transition: "all 0.2s",
                      }}>
                        {link.label}
                      </div>
                    </Link>
                  </motion.div>
                ))}
                <Link to="/booking" style={{ textDecoration: "none", marginTop: "8px" }}>
                  <div style={{
                    padding: "12px 16px", borderRadius: "6px",
                    background: "linear-gradient(135deg, #FF6B35, #c45200)",
                    color: "white", fontSize: "12px", fontWeight: "700",
                    letterSpacing: "2px", textTransform: "uppercase",
                    textAlign: "center", fontFamily: "'Georgia', serif",
                  }}>
                    Reserve Table
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar