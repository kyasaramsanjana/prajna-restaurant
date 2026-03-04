import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      background: 'rgba(13,5,0,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,180,80,0.12)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '26px',
            fontWeight: 300,
            background: 'linear-gradient(135deg, #FFD700, #FF6B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '6px',
            margin: 0,
          }}>PRAJNA</h2>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {[
            { label: 'Home', path: '/' },
            { label: 'Menu', path: '/menu' },
            { label: 'Booking', path: '/booking' },
            { label: 'Contact', path: '/contact' },
          ].map((item, i) => (
            <Link key={i} to={item.path} style={{
              textDecoration: 'none',
              color: 'rgba(255,200,160,0.7)',
              fontFamily: 'Lato',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = '#FFD700'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,200,160,0.7)'}
            >
              {item.label}
            </Link>
          ))}

          <Link to="/booking" style={{
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #FF6B35, #c45200)',
            color: 'white',
            fontFamily: 'Lato',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            padding: '10px 24px',
            borderRadius: '4px',
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Reserve Table
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '22px',
            color: '#FFD700',
          }}
          className="flex md:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          background: 'rgba(13,5,0,0.97)',
          padding: '20px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderTop: '1px solid rgba(255,180,80,0.15)',
        }}>
          {[
            { label: 'Home', path: '/' },
            { label: 'Menu', path: '/menu' },
            { label: 'Booking', path: '/booking' },
            { label: 'Contact', path: '/contact' },
          ].map((item, i) => (
            <Link key={i} to={item.path}
              onClick={() => setOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'rgba(255,200,160,0.7)',
                fontFamily: 'Lato',
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar