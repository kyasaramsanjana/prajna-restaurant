import { useState } from 'react'
import { motion } from 'framer-motion'

/* ── Subtle background particles (same as Booking/Menu) ── */
const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: (i * 31.7) % 100,
  y: (i * 49.3) % 100,
  size: 2 + (i % 4),
  color: ["#FF6B35","#FFD700","#E63946","#FFA500","#C4A0D4"][i % 5],
  delay: (i * 0.28) % 5,
  dur: 3 + (i % 4),
}))

const labelStyle = {
  display: "block",
  color: "rgba(255,200,120,0.7)",
  fontSize: "10px",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "8px",
  fontFamily: "'Georgia', serif",
}

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
  fontFamily: "inherit",
}

const infoCardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,180,80,0.15)",
  backdropFilter: "blur(16px)",
  borderRadius: "14px",
  padding: "24px 28px",
}

function Contact() {
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://prajna-restaurant.onrender.com/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      console.log(data)
      setSubmitted(true)
    } catch (err) {
      console.log("Error:", err)
      alert("Something went wrong. Please try again.")
    }
  }

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
      paddingBottom: "80px",
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
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #1a0800 inset !important;
          -webkit-text-fill-color: white !important;
          caret-color: white !important;
        }
        a.social-btn {
          border: 1px solid rgba(255,180,80,0.3);
          color: rgba(255,200,120,0.8);
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
          backdrop-filter: blur(6px);
          background: rgba(255,255,255,0.04);
        }
        a.social-btn:hover {
          background: rgba(255,140,40,0.15);
          border-color: rgba(255,180,80,0.6);
          color: #FFD700;
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
      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "60px 24px 0" }}>

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <div style={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            padding: "32px 24px",
            background: "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, #FFD700, #FF6B35, #FFD700, transparent)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, #FF6B35, #FFD700, #FF6B35, transparent)" }} />

            <p style={{ color: "rgba(255,200,120,0.7)", fontSize: "10px", letterSpacing: "6px", textTransform: "uppercase", marginBottom: "12px", fontFamily: "'Georgia', serif" }}>
              We'd Love to Hear From You
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
              Contact Us
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

        {/* ── Two Column Layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>

          {/* LEFT — Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div style={infoCardStyle}>
              <p style={{ ...labelStyle, marginBottom: "12px" }}>📍 Location</p>
              <p style={{ color: "rgba(255,200,160,0.75)", fontSize: "14px", lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
                Prajna Restaurant<br />
                Road No. 12, Banjara Hills<br />
                Hyderabad, Telangana 500034
              </p>
            </div>

            <div style={infoCardStyle}>
              <p style={{ ...labelStyle, marginBottom: "12px" }}>🕐 Hours</p>
              <p style={{ color: "rgba(255,200,160,0.75)", fontSize: "14px", lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
                Monday – Friday<br />
                <span style={{ color: "#FFD700" }}>11:00 AM – 11:00 PM</span><br /><br />
                Saturday – Sunday<br />
                <span style={{ color: "#FFD700" }}>10:00 AM – 12:00 AM</span>
              </p>
            </div>

            <div style={infoCardStyle}>
              <p style={{ ...labelStyle, marginBottom: "12px" }}>📞 Contact</p>
              <p style={{ color: "rgba(255,200,160,0.75)", fontSize: "14px", lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
                +91 98765 43210<br />
                hello@prajnarestaurant.com
              </p>
            </div>

            <div style={infoCardStyle}>
              <p style={{ ...labelStyle, marginBottom: "14px" }}>🌐 Follow Us</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {['Instagram', 'Facebook', 'Twitter'].map(s => (
                  <a key={s} href="#" className="social-btn">{s}</a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,180,80,0.15)",
              backdropFilter: "blur(16px)",
              borderRadius: "18px",
              padding: "36px 32px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              height: "100%",
              boxSizing: "border-box",
            }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "40px 0" }}
                >
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF6B35, #FFD700)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px", fontSize: "26px",
                    boxShadow: "0 8px 30px rgba(255,107,53,0.4)",
                  }}>✓</div>
                  <h2 style={{
                    fontSize: "28px", fontFamily: "'Georgia', serif", fontWeight: "300",
                    background: "linear-gradient(135deg, #FFD700, #FF6B35)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    marginBottom: "12px",
                  }}>Message Sent!</h2>
                  <p style={{ color: "rgba(255,200,160,0.7)", fontSize: "14px", lineHeight: 1.7 }}>
                    Thank you <strong style={{ color: "#FFD700" }}>{form.name}</strong>!<br />
                    We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:'', email:'', message:'' }) }}
                    style={{
                      marginTop: "28px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(255,180,80,0.4)",
                      color: "rgba(255,210,140,0.9)",
                      padding: "10px 28px", borderRadius: "8px",
                      fontSize: "10px", letterSpacing: "3px",
                      textTransform: "uppercase", cursor: "pointer",
                    }}
                  >Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="Your name" style={getFocusStyle("name")}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange}
                      placeholder="your@email.com" style={getFocusStyle("email")}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea name="message" required value={form.message} onChange={handleChange}
                      placeholder="Write your message..." rows={6}
                      style={{ ...getFocusStyle("message"), resize: "none" }}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(255,180,80,0.25))" }} />
                    <span style={{ color: "rgba(255,180,80,0.3)", fontSize: "12px" }}>✦</span>
                    <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(255,180,80,0.25))" }} />
                  </div>

                  <button type="submit"
                    style={{
                      background: "linear-gradient(135deg, #FF6B35, #c45200)",
                      color: "white", padding: "16px", borderRadius: "8px",
                      border: "none", fontSize: "12px", letterSpacing: "3px",
                      textTransform: "uppercase", fontWeight: "700", cursor: "pointer",
                      boxShadow: "0 8px 30px rgba(255,107,53,0.35)", transition: "all 0.3s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Map ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginTop: "40px" }}
        >
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,180,80,0.15)",
            backdropFilter: "blur(16px)",
            borderRadius: "16px",
            overflow: "hidden",
            padding: "4px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}>
            <div style={{ height: "2px", background: "linear-gradient(to right, transparent, #FFD700, #FF6B35, #FFD700, transparent)", borderRadius: "2px 2px 0 0", marginBottom: "4px" }} />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9!2d78.4477!3d17.4126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzQ1LjQiTiA3OMKwMjYnNTEuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="280"
              style={{ border: 0, display: "block", borderRadius: "10px", filter: "sepia(0.4) hue-rotate(10deg) brightness(0.75)" }}
              allowFullScreen
              loading="lazy"
              title="Prajna Restaurant Location"
            />
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Contact