import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Footer from "./components/Footer"
import SplashScreen from "./components/SplashScreen"
import FloatingButtons from "./components/FloatingButtons"

function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />

      {splashDone && (
        <BrowserRouter>
          <FloatingButtons />
          <Navbar />
          <div style={{ paddingTop: "68px", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/"        element={<Home />}    />
                <Route path="/menu"    element={<Menu />}    />
                <Route path="/booking" element={<Booking />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </>
  )
}

export default App