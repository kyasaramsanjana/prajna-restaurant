import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Subtle background particles ── */
const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: (i * 31.7) % 100,
  y: (i * 49.3) % 100,
  size: 2 + (i % 4),
  color: ["#FF6B35","#FFD700","#E63946","#FFA500","#C4A0D4"][i % 5],
  delay: (i * 0.28) % 5,
  dur: 3 + (i % 4),
}))

/* ── Reusable input style ── */
const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,180,80,0.2)",
  color: "white",
  padding: "12px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  transition: "border 0.3s",
  boxSizing: "border-box",
  backdropFilter: "blur(6px)",
}

const labelStyle = {
  display: "block",
  color: "rgba(255,200,120,0.7)",
  fontSize: "10px",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "8px",
  fontFamily: "'Georgia', serif",
}

function Booking() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  const getFocusStyle = (name) => ({
    ...inputStyle,
    border: focused === name
      ? "1px solid rgba(255,180,80,0.7)"
      : "1px solid rgba(255,180,80,0.2)",
    boxShadow: focused === name ? "0 0 0 3px rgba(255,140,40,0.1)" : "none",
  })

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0d0500 0%, #1a0a00 30%, #2d1000 60%, #0d0500 100%)",
      position: "relative",
      overflow: "hidden",
      paddingBottom: "60px",
    }}>

      <style>{`
        @keyframes spiceDrift {
          0%   { transform: translate(0,0) scale(1); opacity: 0.3; }
          50%  { transform: translate(8px,-12px) scale(1.4); opacity: 0.55; }
          100% { transform: translate(-6px,-20px) scale(0.75); opacity: 0.15; }
        }
        @keyframes orbFloat1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(70px,50px) scale(1.2); } }
        @keyframes orbFloat2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-50px,-70px) scale(1.15); } }
        input::placeholder, textarea::placeholder { color: rgba(255,180,100,0.3); }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) saturate(2) hue-rotate(5deg); cursor: pointer; }
        select option { background: #1a0a00; color: white; }

        /* ✅ FIX: Stop browser autofill turning inputs white */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px #1a0800 inset !important;
          -webkit-text-fill-color: white !important;
          caret-color: white !important;
          border: 1px solid rgba(255,180,80,0.4) !important;
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,80,0,0.14) 0%, transparent 70%)",
          top: "-100px", left: "-100px",
          animation: "orbFloat1 9s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,140,0,0.09) 0%, transparent 70%)",
          bottom: "-60px", right: "-80px",
          animation: "orbFloat2 11s ease-in-out infinite alternate",
        }} />
      </div>

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "fixed",
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          borderRadius: "50%", background: p.color,
          opacity: 0.3,
          animation: `spiceDrift ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
          filter: "blur(0.8px)", pointerEvents: "none", zIndex: 0,
        }} />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", margin: "0 auto", padding: "60px 24px 0" }}>

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          {/* Banner style header — same as menu banners */}
          <div style={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            padding: "32px 24px",
            background: "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)",
            marginBottom: "0",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, #FFD700, #FF6B35, #FFD700, transparent)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, #FF6B35, #FFD700, #FF6B35, transparent)" }} />

            <p style={{ color: "rgba(255,200,120,0.7)", fontSize: "10px", letterSpacing: "6px", textTransform: "uppercase", marginBottom: "12px", fontFamily: "'Georgia', serif" }}>
              Book Your Spot
            </p>
            <h1 style={{
              fontSize: "clamp(36px, 7vw, 52px)",
              fontFamily: "'Georgia', serif",
              fontWeight: "300",
              background: "linear-gradient(135deg, #FFD700, #FF6B35, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 14px 0",
              letterSpacing: "4px",
            }}>
              Reserve a Table
            </h1>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "50px", height: "1px", background: "linear-gradient(to right, transparent, #FFD700)" }} />
              <span style={{ color: "#FFD700", fontSize: "16px" }}>✦</span>
              <div style={{ width: "50px", height: "1px", background: "linear-gradient(to left, transparent, #FFD700)" }} />
            </div>

            <p style={{ color: "rgba(255,200,120,0.5)", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "'Georgia', serif", margin: 0 }}>
              Prajna Restaurant — Hyderabad
            </p>
          </div>
        </motion.div>

        {/* ── Success State ── */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,180,80,0.2)",
                backdropFilter: "blur(16px)",
                borderRadius: "18px",
                padding: "56px 40px",
                textAlign: "center",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* Success icon */}
              <div style={{
                width: "72px", height: "72px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6B35, #FFD700)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px",
                fontSize: "28px",
                boxShadow: "0 8px 30px rgba(255,107,53,0.4)",
              }}>
                ✓
              </div>

              <h2 style={{
                fontSize: "32px",
                fontFamily: "'Georgia', serif",
                fontWeight: "300",
                background: "linear-gradient(135deg, #FFD700, #FF6B35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}>
                Booking Confirmed!
              </h2>

              <p style={{ color: "rgba(255,200,160,0.8)", lineHeight: 1.7, marginBottom: "8px", fontSize: "15px" }}>
                Thank you <strong style={{ color: "#FFD700" }}>{form.name}</strong>!
              </p>
              <p style={{ color: "rgba(255,200,160,0.6)", lineHeight: 1.7, fontSize: "14px", marginBottom: "32px" }}>
                We look forward to seeing you on <strong style={{ color: "rgba(255,180,80,0.9)" }}>{form.date}</strong> at <strong style={{ color: "rgba(255,180,80,0.9)" }}>{form.time}</strong> for <strong style={{ color: "rgba(255,180,80,0.9)" }}>{form.guests} guest{form.guests > 1 ? 's' : ''}</strong>.
              </p>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "32px" }}>
                <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,180,80,0.4))" }} />
                <span style={{ color: "rgba(255,180,80,0.4)", fontSize: "14px" }}>🪔</span>
                <div style={{ width: "40px", height: "1px", background: "linear-gradient(to left, transparent, rgba(255,180,80,0.4))" }} />
              </div>

              <button
                onClick={() => setSubmitted(false)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1.5px solid rgba(255,180,80,0.4)",
                  color: "rgba(255,210,140,0.9)",
                  padding: "12px 32px",
                  borderRadius: "8px",
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: "600",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s",
                }}
              >
                Make Another Booking
              </button>
            </motion.div>

          ) : (

            // ── FORM ──
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,180,80,0.15)",
                backdropFilter: "blur(16px)",
                borderRadius: "18px",
                padding: "40px 36px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text" name="name" required
                    value={form.name} onChange={handleChange}
                    placeholder="Your name"
                    style={getFocusStyle("name")}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email" name="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    style={getFocusStyle("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel" name="phone" required
                    value={form.phone} onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                    style={getFocusStyle("phone")}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Date + Time side by side */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Date</label>
                    <input
                      type="date" name="date" required
                      value={form.date} onChange={handleChange}
                      style={getFocusStyle("date")}
                      onFocus={() => setFocused("date")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Time</label>
                    <select
                      name="time" required
                      value={form.time} onChange={handleChange}
                      style={getFocusStyle("time")}
                      onFocus={() => setFocused("time")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="">Select time</option>
                      {["12:00 PM","1:00 PM","2:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label style={labelStyle}>Number of Guests</label>
                  <select
                    name="guests"
                    value={form.guests} onChange={handleChange}
                    style={getFocusStyle("guests")}
                    onFocus={() => setFocused("guests")}
                    onBlur={() => setFocused(null)}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Special requests */}
                <div>
                  <label style={labelStyle}>Special Requests</label>
                  <textarea
                    name="message"
                    value={form.message} onChange={handleChange}
                    placeholder="Any special requests or occasions?"
                    rows={4}
                    style={{
                      ...getFocusStyle("message"),
                      resize: "none",
                      fontFamily: "inherit",
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Gold divider before button */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                }}>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(255,180,80,0.25))" }} />
                  <span style={{ color: "rgba(255,180,80,0.3)", fontSize: "12px" }}>✦</span>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(255,180,80,0.25))" }} />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35, #c45200)",
                    color: "white",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "12px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 8px 30px rgba(255,107,53,0.35)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.target.style.transform = "translateY(0)"}
                >
                  Confirm Reservation
                </button>

              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default Booking