import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Footer() {
  return (
    <footer style={{
      position: "relative",
      background: "linear-gradient(180deg, #0d0500 0%, #1a0800 50%, #080200 100%)",
      borderTop: "1px solid rgba(255,180,80,0.12)",
      overflow: "hidden",
    }}>
      {/* Gold top border */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(to right, transparent, #FFD700, #FF6B35, #FFD700, transparent)",
      }} />

      {/* Ambient orb */}
      <div style={{
        position: "absolute", width: "500px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(180,60,0,0.08) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "60px 32px 32px" }}>

        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "48px",
        }}>

          {/* Brand */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <h2 style={{
              fontSize: "30px", fontFamily: "'Georgia', serif", fontWeight: "300",
              background: "linear-gradient(135deg, #FFD700, #FF6B35)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "6px", marginBottom: "4px",
            }}>PRAJNA</h2>
            <p style={{ color: "rgba(255,200,120,0.45)", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", fontFamily: "'Georgia', serif", marginBottom: "18px" }}>
              Fine Dining · Hyderabad
            </p>
            <p style={{ color: "rgba(255,200,160,0.5)", fontSize: "13px", lineHeight: 1.9, fontWeight: 300, maxWidth: "240px" }}>
              Three world cuisines, one unforgettable experience. Crafted with passion, served with love.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
              {[{ l: "IG", t: "Instagram" }, { l: "FB", t: "Facebook" }, { l: "TW", t: "Twitter" }].map(s => (
                <a key={s.l} href="#" title={s.t} style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  border: "1px solid rgba(255,180,80,0.25)",
                  background: "rgba(255,140,40,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,200,120,0.65)", fontSize: "10px", fontWeight: "700",
                  textDecoration: "none", transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,140,40,0.2)"; e.currentTarget.style.borderColor="rgba(255,180,80,0.6)"; e.currentTarget.style.color="#FFD700"; e.currentTarget.style.transform="translateY(-2px)" }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,140,40,0.06)"; e.currentTarget.style.borderColor="rgba(255,180,80,0.25)"; e.currentTarget.style.color="rgba(255,200,120,0.65)"; e.currentTarget.style.transform="translateY(0)" }}
                >{s.l}</a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }}>
            <h4 style={{ color: "rgba(255,200,120,0.55)", fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "'Georgia', serif", marginBottom: "20px" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[{ label:"Home", to:"/" }, { label:"Menu", to:"/menu" }, { label:"Booking", to:"/booking" }, { label:"Contact", to:"/contact" }].map(link => (
                <Link key={link.label} to={link.to} style={{ color: "rgba(255,200,160,0.5)", fontSize: "13px", textDecoration: "none", fontWeight: "300", transition: "all 0.25s", display: "flex", alignItems: "center", gap: "8px" }}
                  onMouseEnter={e => { e.currentTarget.style.color="#FFD700"; e.currentTarget.style.paddingLeft="6px" }}
                  onMouseLeave={e => { e.currentTarget.style.color="rgba(255,200,160,0.5)"; e.currentTarget.style.paddingLeft="0" }}
                >
                  <span style={{ color: "rgba(255,140,40,0.4)", fontSize: "8px" }}>✦</span>{link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.2 }}>
            <h4 style={{ color: "rgba(255,200,120,0.55)", fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "'Georgia', serif", marginBottom: "20px" }}>Hours</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[{ day:"Mon – Fri", time:"11 AM – 11 PM" }, { day:"Sat – Sun", time:"10 AM – 12 AM" }].map(h => (
                <div key={h.day}>
                  <p style={{ color: "rgba(255,200,160,0.38)", fontSize: "10px", letterSpacing: "1px", marginBottom: "2px" }}>{h.day}</p>
                  <p style={{ color: "rgba(255,200,160,0.72)", fontSize: "13px", fontWeight: "300" }}>{h.time}</p>
                </div>
              ))}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.22)", borderRadius: "20px", padding: "4px 12px", marginTop: "4px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                <span style={{ color: "#22c55e", fontSize: "10px", letterSpacing: "1px" }}>Open Now</span>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.3 }}>
            <h4 style={{ color: "rgba(255,200,120,0.55)", fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "'Georgia', serif", marginBottom: "20px" }}>Find Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <p style={{ color: "rgba(255,200,160,0.38)", fontSize: "10px", letterSpacing: "1px", marginBottom: "4px" }}>📍 Address</p>
                <p style={{ color: "rgba(255,200,160,0.68)", fontSize: "13px", fontWeight: "300", lineHeight: 1.7 }}>Road No. 12, Banjara Hills<br />Hyderabad, TG 500034</p>
              </div>
              <div>
                <p style={{ color: "rgba(255,200,160,0.38)", fontSize: "10px", letterSpacing: "1px", marginBottom: "4px" }}>📞 Phone</p>
                <a href="tel:+919876543210" style={{ color: "rgba(255,200,160,0.68)", fontSize: "13px", fontWeight: "300", textDecoration: "none", transition: "color 0.25s" }}
                  onMouseEnter={e => e.currentTarget.style.color="#FFD700"}
                  onMouseLeave={e => e.currentTarget.style.color="rgba(255,200,160,0.68)"}
                >+91 98765 43210</a>
              </div>
              <div>
                <p style={{ color: "rgba(255,200,160,0.38)", fontSize: "10px", letterSpacing: "1px", marginBottom: "4px" }}>✉️ Email</p>
                <a href="mailto:hello@prajnarestaurant.com" style={{ color: "rgba(255,200,160,0.68)", fontSize: "12px", fontWeight: "300", textDecoration: "none", transition: "color 0.25s" }}
                  onMouseEnter={e => e.currentTarget.style.color="#FFD700"}
                  onMouseLeave={e => e.currentTarget.style.color="rgba(255,200,160,0.68)"}
                >hello@prajnarestaurant.com</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255,180,80,0.18), rgba(255,180,80,0.18), transparent)", marginBottom: "26px" }} />

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <p style={{ color: "rgba(255,200,160,0.3)", fontSize: "11px", letterSpacing: "1px" }}>
            © {new Date().getFullYear()} Prajna Restaurant. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,200,160,0.28)", fontSize: "11px", letterSpacing: "1px" }}>
            ✦ Crafted with ♥ in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer