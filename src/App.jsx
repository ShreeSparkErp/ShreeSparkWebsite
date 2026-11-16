import { useState, useEffect, useRef } from 'react'
import './App.css'
import bannerMultiDevice from './assets/banners/banner-multidevice-hd.png'
import bannerDashboard from './assets/banners/banner-dashboard-hd.png'
import bannerLogin from './assets/banners/banner-login-hd.png'
import JewelBackdrop from './JewelBackdrop.jsx'
import LogoTransition from './LogoTransition.jsx'

const heroBanners = [
  {
    id: 'multidevice',
    title: 'Multi-Device ERP Platform',
    subtitle: 'Access showroom & workshop on Desktop, Laptop, Tablet & Mobile',
    badge: '100% Web-Based • Multi-Device Access',
    chips: [
      '🖥️ Desktop Showroom POS',
      '💻 Laptop Workshop Sync',
      '📱 Tablet & Phone Real-time'
    ],
    src: bannerMultiDevice,
    alt: 'Shree Spark Jewellery ERP on Desktop, Laptop, Tablet and Mobile'
  },
  {
    id: 'dashboard',
    title: 'Real-Time ERP Operations Dashboard',
    subtitle: 'Live Sales, Stock Value, Karigar tracking & P&L Analytics',
    badge: 'Real-Time Analytics • Live Bullion Rates',
    chips: [
      '₹4.82L Today Sales',
      '₹2.4 Cr Total Stock',
      '38 Karigar Orders',
      '₹18.6L Dues'
    ],
    src: bannerDashboard,
    alt: 'Shree Spark Jewellery ERP Dashboard with Sales, Stock and Karigar Overview'
  },
  {
    id: 'login',
    title: 'Secure Multi-Tenant Cloud ERP Portal',
    subtitle: 'Enterprise-grade encryption, tenant isolation & role governance',
    badge: 'Bank-Grade Security • Cloud Synced',
    chips: [
      '🔒 256-Bit SSL Encrypted',
      '🏢 Multi-Tenant Security',
      '👥 Role-Based Governance'
    ],
    src: bannerLogin,
    alt: 'Shree Spark Jewellery ERP Secure Cloud Login'
  }
]

function HeroBannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [zoomModalOpen, setZoomModalOpen] = useState(false)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  // Auto-scroll horizontally every 4 seconds
  useEffect(() => {
    if (isPaused || zoomModalOpen) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, zoomModalOpen])

  // Keyboard navigation when lightbox modal is open
  useEffect(() => {
    if (!zoomModalOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setZoomModalOpen(false)
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % heroBanners.length)
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [zoomModalOpen])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 45) {
      nextSlide()
    } else if (diff < -45) {
      prevSlide()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const currentBanner = heroBanners[currentSlide]

  return (
    <>
      <div
        className="dashboard hero-banner-dashboard"
        aria-label="Jewellery ERP Interactive Banners"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="dash-head">
          <div className="dash-title">
            <div className="dash-title-main">
              <span className="dash-window-dots" aria-hidden="true">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </span>
              <span>Shree Spark Jewellery ERP</span>
            </div>
            <small className="dash-subtitle">
              {currentBanner.title}
            </small>
          </div>
          <div className="banner-top-meta">
            <span className="live">
              <span className="live-dot"></span>
              SYSTEM ONLINE
            </span>
            <span className="banner-slide-count">
              {String(currentSlide + 1).padStart(2, '0')} / {String(heroBanners.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div
          className="banner-slider-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="banner-slider-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroBanners.map((banner, index) => (
              <div
                key={banner.id}
                className="banner-slide-item"
                onClick={() => setZoomModalOpen(true)}
                title="Click to view full 2K HD preview"
              >
                <div className="banner-img-wrapper">
                  <img
                    src={banner.src}
                    alt={banner.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="banner-img"
                  />
                  <div className="banner-chips-overlay">
                    {banner.chips.map((chip, i) => (
                      <span key={i} className="banner-chip">{chip}</span>
                    ))}
                  </div>
                  <div className="banner-zoom-hint">
                    🔍 Click for 2K HD Full View
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left / Right Arrow Navigation */}
          <button
            type="button"
            className="banner-arrow banner-arrow-prev"
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            aria-label="Previous banner"
          >
            ‹
          </button>
          <button
            type="button"
            className="banner-arrow banner-arrow-next"
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            aria-label="Next banner"
          >
            ›
          </button>
        </div>

        {/* Bottom Bar: Indicators & Subtitle */}
        <div className="banner-bottom-bar">
          <div className="banner-dots">
            {heroBanners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                className={`banner-dot-btn ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Jump to banner ${index + 1}: ${banner.title}`}
                title={banner.title}
              >
                <span className="banner-dot-fill" />
              </button>
            ))}
          </div>

          <div className="banner-subtext">
            {currentBanner.subtitle}
          </div>
        </div>

        {/* Floating Pill Badge */}
        <div className="dash-floating-pill">
          🌐 {currentBanner.badge}
        </div>
      </div>

      {/* Lightbox Modal for enlarged view */}
      {zoomModalOpen && (
        <div
          className="banner-modal-backdrop"
          onClick={() => setZoomModalOpen(false)}
        >
          <div
            className="banner-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="banner-modal-header">
              <div>
                <strong className="banner-modal-title">{currentBanner.title}</strong>
                <p className="banner-modal-subtitle">
                  {currentBanner.subtitle}
                </p>
              </div>
              <button
                type="button"
                className="banner-modal-close"
                onClick={() => setZoomModalOpen(false)}
                aria-label="Close enlarged preview"
              >
                ✕
              </button>
            </div>
            <div className="banner-modal-body">
              <img
                src={currentBanner.src}
                alt={currentBanner.alt}
                className="banner-modal-img"
              />
            </div>
            <div className="banner-modal-footer">
              <div className="banner-dots">
                {heroBanners.map((banner, index) => (
                  <button
                    key={banner.id}
                    type="button"
                    className={`banner-dot-btn ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Jump to banner ${index + 1}`}
                  >
                    <span className="banner-dot-fill" />
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className="banner-modal-nav-btn"
                  onClick={prevSlide}
                >
                  ‹ Previous
                </button>
                <button
                  type="button"
                  className="banner-modal-nav-btn"
                  onClick={nextSlide}
                >
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const featureCategories = [
  'All',
  'Artisan & Karigar',
  'Inventory & Barcoding',
  'Finance & Ledgers',
  'Security & Governance'
]

const jewelleryFeatures = [
  {
    id: 'karigar-issue-receipt',
    title: 'Karigar wise Issue/Receipt',
    symbol: '⚒',
    category: 'Artisan & Karigar',
    badge: 'Manufacturing',
    desc: 'Seamlessly issue raw gold bullion, silver alloys, and loose gemstones to karigars (artisans) and record receipts of finished ornaments with automatic melting loss, purity checks, and labor charge tracking.',
    highlights: ['Fine Metal Issue & Return', 'Wastage & Loss Calculation', 'Labour & Making Charge Khata']
  },
  {
    id: 'customer-issue-receipt',
    title: 'Customer wise Issue/Receipt',
    symbol: '👥',
    category: 'Artisan & Karigar',
    badge: 'Retail Counter',
    desc: 'Manage custom jewellery orders, advance metal deposits, old gold exchange receipts, and repair intakes with automated voucher generation, instant customer SMS/WhatsApp receipts, and photo proofing.',
    highlights: ['Old Gold Exchange Testing', 'Custom Order Advance Track', 'Repair Intake & Delivery Slips']
  },
  {
    id: 'karigar-customer-rate-analysis',
    title: 'Karigar/Customer wise Rate analysis',
    symbol: '📈',
    category: 'Artisan & Karigar',
    badge: 'Rate Intelligence',
    desc: 'In-depth rate analysis evaluating making charge variance, artisan cost efficiency, and customer-specific price lists across fluctuating 24K, 22K, 18K gold and silver market bhav.',
    highlights: ['Artisan Making Charge Audits', 'Customer Pricing Tiers', 'Real-Time Margin Tracking']
  },
  {
    id: 'stock-barcoding',
    title: 'Stock management with Barcoding Facility',
    symbol: '▥',
    category: 'Inventory & Barcoding',
    badge: 'Barcode & Tagging',
    desc: 'End-to-end stock control with high-precision barcode tagging. Automatically segregates Gross Weight, Net Weight, Stone Carats, and Wastage for instant scan-and-bill counter checkout.',
    highlights: ['1D/2D Barcode & QR Printing', 'Barcode Tag Compatibility', 'Gross/Net/Stone Breakup']
  },
  {
    id: 'tag-image-catalogue',
    title: 'Tag Image Catalogue',
    symbol: '📷',
    category: 'Inventory & Barcoding',
    badge: 'Visual Merchandising',
    desc: 'Attach high-definition photos directly to item barcode tags. Create interactive digital lookbooks, showcase counter vault collections on tablets, and share instant WhatsApp catalogues with buyers.',
    highlights: ['HD Multi-Angle Ornament Photos', 'Tablet Showcase Presentation', 'Direct WhatsApp Share']
  },
  {
    id: 'physical-stock-scan',
    title: 'Physical Stock verification with Scan facility',
    symbol: '🔍',
    category: 'Inventory & Barcoding',
    badge: 'Rapid Audit',
    desc: 'Audit thousands of ornaments across showroom display counters, trays, and vault safes in minutes using handheld barcode scanners. Instantly spots missing or misplaced items with zero downtime.',
    highlights: ['Handheld Scanner Support', 'Tray-by-Tray Instant Auditing', 'Discrepancy & Missing Item Alerts']
  },
  {
    id: 'cash-bank-management',
    title: 'Cash/Bank Management',
    symbol: '🏦',
    category: 'Finance & Ledgers',
    badge: 'Multi-Account Treasury',
    desc: 'Centralized financial management across multiple counter cash drawers, safe lockers, and bank accounts. Instantly reconcile RTGS/NEFT metal transfers, POS card swipe settlements, and UPI QR payments.',
    highlights: ['Counter Cash Day-Book', 'Multi-Bank Reconciliation', 'EDC Swipe & UPI QR Sync']
  },
  {
    id: 'metal-amount-ledger',
    title: 'Metal & Amount wise Ledger management',
    symbol: '⚖',
    category: 'Finance & Ledgers',
    badge: 'Dual-Balance Ledgers',
    desc: 'Native jewellery dual-ledger architecture: maintains running balance in Pure Metal Weight (Fine Grams / Tola) simultaneously with Monetary Currency (₹) for 100% foolproof party accounts.',
    highlights: ['Fine Gold/Silver Weight Balance', 'Currency (₹) Ledger Tracking', 'Bhav Fixing & Metal Settlements']
  },
  {
    id: 'sales-purchase-analysis',
    title: 'Sales & Purchase Analysis',
    symbol: '📊',
    category: 'Finance & Ledgers',
    badge: 'Executive BI',
    desc: 'Executive business intelligence reports analyzing highest-selling jewellery categories, vendor purchase trends, seasonal sales spikes (Dhanteras, Wedding season), and gross profit margins.',
    highlights: ['Category Turnover Velocity', 'Vendor Price Comparison', 'Gross Margin & Profit Audits']
  },
  {
    id: 'aging-stock-analysis',
    title: 'Aging wise Stock Analysis',
    symbol: '⏳',
    category: 'Finance & Ledgers',
    badge: 'Capital Optimization',
    desc: 'Classify inventory by aging brackets (30, 60, 90, 180+ days) to identify dead stock and slow-moving jewelry designs. Empowers you to melt, remake, or liquidate idle gold weight to free working capital.',
    highlights: ['30 / 60 / 90 / 180+ Day Buckets', 'Dead Stock Identification', 'Idle Gold Liquidation Insights']
  },
  {
    id: 'user-access-control',
    title: 'User Access Control management',
    symbol: '🔒',
    category: 'Security & Governance',
    badge: 'Role-Based Security',
    desc: 'Enterprise-grade permission controls ensuring counter salesmen, cashiers, accountants, and branch managers only access designated screens. Hide purchase costs, supplier margins, and ledger reports by role.',
    highlights: ['Role-Based Permission Matrix', 'Hide Sensitive Costs/Margins', 'Multi-Branch Staff Governance']
  },
  {
    id: 'entry-log-facility',
    title: 'Every Entry wise Log Facility',
    symbol: '📝',
    category: 'Security & Governance',
    badge: 'Forensic Audit Trail',
    desc: 'Immutable digital audit log recording every single creation, alteration, rate edit, and voucher deletion. Captures exact timestamps, user identity, IP address, and previous vs. new values for total transparency.',
    highlights: ['Timestamp & User ID Stamping', 'Before vs. After Value Tracking', 'Zero Tampering Accountability']
  }
]

const faqItems = [
  {
    q: 'What is Web-Based Jewellery ERP Software, and how does it benefit my showroom?',
    a: 'Web-Based Jewellery ERP Software runs entirely in modern web browsers (Chrome, Safari, Edge) without requiring expensive in-house physical servers, static IPs, or local desktop software installation. It allows owners, managers, and accountants to securely access showroom billing, inventory, karigar accounts, and live bullion rates from PCs, Macs, iPads, and smartphones from anywhere in the world with real-time multi-branch synchronization.'
  },
  {
    q: 'How does Karigar wise Issue and Receipt work in Shree Spark Jewellery ERP?',
    a: 'Our specialized Karigar module accurately tracks pure gold (24K bullion), silver alloys, and loose diamonds or gemstones issued to artisans. Upon receiving the crafted jewellery, the system automatically calculates gross weight, net weight, stone weight, allowable wastage, and melting loss percentage. It directly reconciles labor making charges with the karigar ledger khata.'
  },
  {
    q: 'Can our showroom perform physical stock verification with Barcode scanners?',
    a: 'Yes. Shree Spark Jewellery ERP Software supports 1D & 2D barcode printing and QR codes. Showroom staff can scan entire display counter trays and vault safes in minutes using wireless handheld scanners. The system immediately alerts you to missing items, misplaced trays, or unbilled pieces with zero showroom downtime.'
  },
  {
    q: 'How does Metal & Amount-wise Ledger Management ensure bullion accuracy?',
    a: 'Unlike conventional generic software that only tracks monetary figures (₹), our Jewellery ERP features a native dual-ledger architecture. Every transaction maintains two distinct balances: Pure Metal Weight (Fine 999.0 Grams/Tola) and Currency Amount (INR). This guarantees 100% accuracy during metal advances, old gold exchanges, Bhav cuts (rate fixing), and party ledger settlements.'
  },
  {
    q: 'How does Aging-wise Stock Analysis help in working capital optimization?',
    a: 'Aging-wise analysis categorizes your showroom inventory into customizable age brackets (such as 30, 60, 90, 180+ days). It identifies slow-moving collections, dead designs, and idle gold weight, empowering you to liquidate, discount, or melt and remake ornaments to unlock working capital for trending festive designs.'
  },
  {
    q: 'Is our jewellery showroom and customer financial data secure in the cloud?',
    a: 'Absolutely. Shree Spark Web-Based Jewellery ERP Software operates on enterprise-grade cloud architecture protected by 256-bit SSL encryption, automated daily off-site cloud backups, role-based access governance (hiding cost prices and metal purchase margins from counter staff), and tamper-proof user activity logs.'
  }
]

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shree_theme')
      if (saved === 'light' || saved === 'dark') return saved
    }
    return 'dark'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [openFaq, setOpenFaq] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('shree_theme', theme)
    } catch (err) {
      console.warn('Could not save theme preference to localStorage', err)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('Website enquiry from ' + formData.name)
    const body = encodeURIComponent(
      'Name: ' + formData.name + '\n' +
      'Email: ' + formData.email + '\n\n' +
      'Enquiry:\n' + formData.message
    )
    window.location.href = `mailto:sales@shreesparkinfotech.com?subject=${subject}&body=${body}`
  }

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  // Header link click -> full-screen logo transition, then jump to the section
  const SECTION_LABELS = {
    home: 'Home', about: 'About', solutions: 'Solutions', 'web-erp': 'Web ERP',
    features: 'Features', services: 'Services', faq: 'FAQ', contact: 'Contact',
  }
  const [jump, setJump] = useState(null)

  const handleHeaderClick = (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href').slice(1)
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    setMenuOpen(false)
    if (jump) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.scrollIntoView({ block: 'start' })
      window.history.replaceState(null, '', '#' + id)
      return
    }
    const rect = link.getBoundingClientRect()
    setJump({
      id,
      label: SECTION_LABELS[id] || '',
      x: Math.round(rect.left + rect.width / 2) + 'px',
      y: Math.round(rect.top + rect.height / 2) + 'px',
      n: Date.now(),
    })
  }

  useEffect(() => {
    if (!jump) return
    const jumpTimer = setTimeout(() => {
      const el = document.getElementById(jump.id)
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
        window.history.replaceState(null, '', '#' + jump.id)
      }
    }, 1650)
    const endTimer = setTimeout(() => setJump(null), 2450)
    return () => {
      clearTimeout(jumpTimer)
      clearTimeout(endTimer)
    }
  }, [jump])

  // Scroll reveal animations on every box & content
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target
        if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
          // Entering view: play the reveal animation
          el.classList.remove('reveal-from-top')
          el.classList.add('is-revealed')
        } else if (!entry.isIntersecting) {
          // Fully out of view: reset so the animation replays on the next scroll.
          // Elements leaving through the top are parked above (slide down on return),
          // elements leaving through the bottom are parked below (slide up on return).
          const rootTop = entry.rootBounds ? entry.rootBounds.top : 0
          el.classList.toggle('reveal-from-top', entry.boundingClientRect.top < rootTop)
          el.classList.remove('is-revealed')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.08],
      rootMargin: '0px 0px -30px 0px'
    })

    const targets = document.querySelectorAll(
      '.section-head, .mini-card, .solution, .web-erp-card, .web-erp-comparison-banner, .comp-col, .jewel-feature-card, .service-card, .why-image, .benefits li, .quote, .faq-item, .contact-item, .contact-form, .map-card, .cta, .two-col > div'
    )

    targets.forEach((el) => {
      el.classList.add('reveal-on-scroll')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [activeCategory])

  const filteredFeatures = activeCategory === 'All'
    ? jewelleryFeatures
    : jewelleryFeatures.filter(f => f.category === activeCategory)

  return (
    <>
      {jump && <LogoTransition key={jump.n} label={jump.label} x={jump.x} y={jump.y} />}

      <header className="topbar-wrapper" onClick={handleHeaderClick}>
        <div className="topbar">
          <a className="brand" href="#home">
            <img
              src="/logo.jpg"
              alt="Shree Spark Infotech - Web-Based Jewellery ERP Software"
              className="brand-logo"
              width="44"
              height="44"
              loading="eager"
              decoding="async"
            />
            <div className="brand-text">
              <span className="brand-title">
                <span className="brand-shree">Shree</span>
                <span className="brand-spark">Spark</span>
              </span>
              <span className="brand-subtitle">INFOTECH</span>
            </div>
          </a>
          <nav className={`nav ${menuOpen ? 'open' : ''}`} id="nav">
            <a href="#home" onClick={handleNavClick}>Home</a>
            <a href="#about" onClick={handleNavClick}>About</a>
            <a href="#solutions" onClick={handleNavClick}>Solutions</a>
            <a href="#web-erp" onClick={handleNavClick}>Web ERP</a>
            <a href="#features" onClick={handleNavClick}>Features</a>
            <a href="#services" onClick={handleNavClick}>Services</a>
            <a href="#faq" onClick={handleNavClick}>FAQ</a>
            <a href="#contact" onClick={handleNavClick}>Contact</a>
            
            <button
              type="button"
              className="theme-toggle-btn mobile-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Current theme: ${theme === 'dark' ? 'Dark' : 'Light'} mode. Click to toggle.`}
            >
              <span className="theme-toggle-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>

            <a className="btn mobile-nav-cta" href="#contact" onClick={handleNavClick}>Get a Quote ↗</a>
          </nav>

          <button
            type="button"
            className="theme-toggle-btn mobile-header-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Current theme: ${theme === 'dark' ? 'Dark' : 'Light'} mode. Click to toggle.`}
            title={`Theme: ${theme === 'dark' ? 'Dark' : 'Light'}`}
          >
            <span className="theme-toggle-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
          </button>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Current theme: ${theme === 'dark' ? 'Dark' : 'Light'} mode. Click to toggle.`}
            title={`Theme: ${theme === 'dark' ? 'Dark' : 'Light'} (click to switch)`}
          >
            <span className="theme-toggle-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
            <span className="theme-toggle-text">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>

          <a className="btn btn-nav-cta" href="#contact">Get a Quote ↗</a>
          <button
            className="mobile-toggle"
            id="toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          {/* Animated Jewellery ERP Background Elements */}
          <div className="jewellery-hero-bg" aria-hidden="true">
            <JewelBackdrop variant={1} dust={24} className="jb-hero" />
            <div className="gold-glow-orb"></div>
            <div className="cyan-glow-orb"></div>

            {/* Faceted Diamond Wireframes */}
            <svg className="jewel-shape diamond-1" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="25,30 75,30 92,48 50,92 8,48" />
              <line x1="25" y1="30" x2="8" y2="48" />
              <line x1="75" y1="30" x2="92" y2="48" />
              <line x1="38" y1="30" x2="32" y2="48" />
              <line x1="62" y1="30" x2="68" y2="48" />
              <line x1="8" y1="48" x2="92" y2="48" />
              <line x1="32" y1="48" x2="50" y2="92" />
              <line x1="68" y1="48" x2="50" y2="92" />
            </svg>

            <svg className="jewel-shape diamond-2" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="50,15 85,50 50,85 15,50" />
              <line x1="50" y1="15" x2="50" y2="85" />
              <line x1="15" y1="50" x2="85" y2="50" />
              <polygon points="50,30 70,50 50,70 30,50" />
            </svg>

            <svg className="jewel-shape diamond-3" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="25,30 75,30 92,48 50,92 8,48" />
              <line x1="25" y1="30" x2="8" y2="48" />
              <line x1="75" y1="30" x2="92" y2="48" />
              <line x1="8" y1="48" x2="92" y2="48" />
              <line x1="32" y1="48" x2="50" y2="92" />
              <line x1="68" y1="48" x2="50" y2="92" />
            </svg>

            {/* Sparkles */}
            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle gold sparkle-2">★</span>
            <span className="sparkle sparkle-3">✦</span>
            <span className="sparkle gold sparkle-4">✧</span>
            <span className="sparkle sparkle-5">★</span>

            {/* Floating Jewellery ERP Telemetry Badges */}
            <div className="jewel-tag-float tag-1">✦ HUID 916 CERTIFIED</div>
            <div className="jewel-tag-float tag-2">BARCODE TRAY SYNCED</div>
            <div className="jewel-tag-float tag-3">22K / 18K LIVE RATES</div>
          </div>

          <div className="container hero-grid">
            <div>
              <div className="eyebrow">🌐 NEXT-GENERATION CLOUD &amp; WEB-BASED JEWELLERY ERP</div>
              <h1>One Platform. Complete Control.<br /><span>Limitless Growth.</span></h1>
              <div className="hero-subheading">Intelligent Jewellery ERP Software Built for the Future of Your Business.</div>
              <p>Shree Spark Infotech offers an advanced, web-based Jewellery ERP solution for retailers, wholesalers, manufacturers, and multi-branch businesses. Manage inventory, barcoding, karigar operations, metal and customer ledgers, and branch activities through one secure, centralized platform accessible anytime, anywhere.</p>
              <p className="hero-tagline">Work Smarter. Track Every Gram. Grow Without Limits.</p>
              <div className="actions">
                <a className="btn" href="#solutions">Explore Jewellery ERP →</a>
                <a className="btn outline" href="#contact">Book Your Live Demo →</a>
              </div>
              <div className="proof hero-proof">
                <span>⚡ 100% Web-Based Access</span>
                <span>🌐 Seamless Access. Anytime. Anywhere.</span>
                <span>🔐 Secure Access &amp; User Permissions</span>
                <span>📊 Intelligent Business Insights</span>
              </div>
            </div>
            <HeroBannerSlider />
          </div>
        </section>

        <section className="section" id="about">

          <JewelBackdrop variant={0} />
          <div className="container two-col">
            <div>
              <div className="eyebrow">Jewellery ERP Specialists</div>
              <h2>Enterprise Jewellery ERP Software<br />Built for Real Growth.</h2>
              <p className="lead">Shree Spark Infotech specializes in powerful Jewellery ERP Software and custom digital solutions that help jewellery retailers, wholesalers, and manufacturers simplify operations, connect workflows, and maximize profitability.</p>
              <p className="lead">From our flagship Web-Based Jewellery ERP Software to custom business applications, we provide scalable systems designed specifically for the precious metal industry.</p>
              <a className="btn small-btn" href="#solutions">Explore Jewellery ERP Software →</a>
            </div>
            <div className="mini-grid">
              <article className="mini-card">
                <div className="icon">♢</div>
                <h3>Reliable Systems</h3>
                <p>Designed around business needs.</p>
              </article>
              <article className="mini-card">
                <div className="icon">♧</div>
                <h3>Integrated Workflows</h3>
                <p>Connected business processes.</p>
              </article>
              <article className="mini-card">
                <div className="icon">▥</div>
                <h3>Better Visibility</h3>
                <p>Useful reporting and insights.</p>
              </article>
              <article className="mini-card">
                <div className="icon">◉</div>
                <h3>Customer Focus</h3>
                <p>Support built around your needs.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section tint jewellery-solutions-section" id="solutions">

          <JewelBackdrop variant={1} />
          <div className="jewel-section-bg" aria-hidden="true">
            <svg className="jewel-section-watermark" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <polygon points="25,30 75,30 92,48 50,92 8,48" />
              <line x1="25" y1="30" x2="8" y2="48" />
              <line x1="75" y1="30" x2="92" y2="48" />
              <line x1="38" y1="30" x2="32" y2="48" />
              <line x1="62" y1="30" x2="68" y2="48" />
              <line x1="8" y1="48" x2="92" y2="48" />
              <line x1="32" y1="48" x2="50" y2="92" />
              <line x1="68" y1="48" x2="50" y2="92" />
            </svg>
          </div>
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Our Jewellery ERP Software Solutions</div>
              <h2>One Integrated Jewellery ERP Software Platform</h2>
              <p>Bring showroom billing, barcoding, karigar management, bullion ledgers, and accounts together with our specialized Jewellery ERP Software.</p>
            </div>
            <div className="solution-grid">
              <article className="solution dark">
                <div className="solution-cloud-badge">☁ 100% CLOUD &amp; WEB-BASED</div>
                <div className="icon">◇</div>
                <h3>Web-Based Jewellery ERP Software</h3>
                <p>Run your jewellery business from any web browser on desktop, laptop, tablet, or smartphone with zero local installation and multi-branch real-time sync.</p>
                <ul className="check-list">
                  <li>Zero local server setup — runs on Chrome, Safari &amp; Edge</li>
                  <li>Multi-branch &amp; counter real-time stock synchronization</li>
                  <li>Retail, wholesale and manufacturing karigar workflows</li>
                  <li>Dual metal-weight (Grams) and amount-wise (₹) ledgers</li>
                  <li>Instant barcode scanning with digital catalogues</li>
                </ul>
                <a className="btn" href="#contact">Request a Demo →</a>
              </article>
              <article className="solution">
                <div className="icon">&lt;/&gt;</div>
                <h3>Custom Business Software</h3>
                <p>Digitize unique workflows with software tailored to your business model, reporting requirements and future plans.</p>
                <ul className="check-list">
                  <li>Custom business applications</li>
                  <li>Workflow and process automation</li>
                  <li>Web-based management systems</li>
                  <li>Business reporting and integrations</li>
                </ul>
                <a className="btn" href="#contact">Discuss Your Project →</a>
              </article>
            </div>
          </div>
        </section>

        <section className="section web-erp-section" id="web-erp">

          <JewelBackdrop variant={2} />
          <div className="container">
            <div className="section-head text-light">
              <div className="eyebrow web-erp-eyebrow">☁ Next-Gen Cloud Architecture</div>
              <h2 className="text-white">100% Web-Based Jewellery ERP Software<br /><span>Access Anywhere. Anytime. On Any Device.</span></h2>
              <p className="text-light-muted">
                Break free from legacy desktop software bound to a single counter PC. Shree Spark's Web-Based Jewellery ERP Software delivers the security, mobility, and speed your jewellery business needs to thrive across multiple stores and workshops.
              </p>
            </div>

            <div className="web-erp-grid">
              <div className="web-erp-card">
                <div className="web-erp-card-icon">🌐</div>
                <div className="web-erp-badge">Browser-Based</div>
                <h3>Zero Installation &amp; Any Device</h3>
                <p>Run seamlessly on Google Chrome, Apple Safari, Microsoft Edge across Windows, macOS, iPad, and Android phones without installing heavy client software.</p>
                <div className="web-erp-stat"><span>✓</span> Works on PC, Mac, iPad &amp; Mobile</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon">🏢</div>
                <div className="web-erp-badge">Multi-Showroom</div>
                <h3>Multi-Branch Real-Time Sync</h3>
                <p>Connect unlimited showrooms, wholesale counters, and manufacturing workshops into one unified central cloud database with zero sync delay.</p>
                <div className="web-erp-stat"><span>✓</span> Instant Inter-Branch Transfers</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon">☁️</div>
                <div className="web-erp-badge">Cost Saving</div>
                <h3>Zero Server &amp; Hardware Overhead</h3>
                <p>Eliminate costly physical in-house servers, expensive AMC contracts, static IP headaches, and local server hardware crash nightmares.</p>
                <div className="web-erp-stat"><span>✓</span> Save ₹1L+ on Server Hardware</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon">🔄</div>
                <div className="web-erp-badge">Zero Data Loss</div>
                <h3>Automated Daily Cloud Backups</h3>
                <p>Continuous encrypted database snapshots backed up to world-class cloud storage. If a showroom PC fails, your stock and ledgers remain 100% safe.</p>
                <div className="web-erp-stat"><span>✓</span> 99.99% Uptime &amp; Auto-Snapshots</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon">📱</div>
                <div className="web-erp-badge">Floor Mobility</div>
                <h3>Tablet Counter &amp; Digital Lookbooks</h3>
                <p>Sales staff can walk customers through high-definition jewellery catalogues on tablets, generate instant estimates, and check live vault availability.</p>
                <div className="web-erp-stat"><span>✓</span> Modern VIP Customer Experience</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon">🔒</div>
                <div className="web-erp-badge">Bank-Grade</div>
                <h3>Enterprise Security &amp; Role Access</h3>
                <p>256-bit SSL encryption, granular permission shields (hide costs/bhav from staff), and multi-factor authentication protect your bullion confidentiality.</p>
                <div className="web-erp-stat"><span>✓</span> 256-Bit SSL &amp; Forensic User Logs</div>
              </div>
            </div>

            <div className="web-erp-comparison-banner">
              <div className="comparison-content">
                <div className="comparison-tag">TRADITIONAL DESKTOP vs. SHREE SPARK JEWELLERY ERP SOFTWARE</div>
                <h3>Upgrade from Outdated Desktop Systems to Modern Cloud Jewellery ERP Software</h3>
                <p>Why jewellers across India are switching to our browser-based platform.</p>
              </div>
              <div className="comparison-table-wrapper">
                <div className="comp-col old">
                  <h4>❌ Legacy Desktop ERP</h4>
                  <ul>
                    <li>Locked to single physical shop PC</li>
                    <li>High server, UPS &amp; static IP setup costs</li>
                    <li>Risk of hard disk crashes &amp; data loss</li>
                    <li>Manual data export for head office</li>
                    <li>Cannot access while traveling or at home</li>
                  </ul>
                </div>
                <div className="comp-col new">
                  <h4>✓ Shree Spark Web-Based Jewellery ERP Software</h4>
                  <ul>
                    <li>Access from any browser (PC, Tablet, Phone)</li>
                    <li>Zero server maintenance &amp; zero local setup</li>
                    <li>Automated cloud backups &amp; instant recovery</li>
                    <li>Live real-time multi-branch synchronization</li>
                    <li>Monitor sales, stock &amp; bhav from anywhere 24/7</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section jewellery-features-section" id="features">

          <JewelBackdrop variant={3} />
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Enterprise Jewellery ERP Software Modules</div>
              <h2>Specialized Features of Our Jewellery ERP Software</h2>
              <p>Engineered to handle the unique complexities of jewellery retail, wholesale, manufacturing karigar workflows, bullion accounts, and vault stock auditing with specialized Jewellery ERP Software.</p>
            </div>

            <div className="feature-filter-bar" role="tablist" aria-label="Feature categories">
              {featureCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`feature-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat} {cat === 'All' ? `(${jewelleryFeatures.length})` : ''}
                </button>
              ))}
            </div>

            <div className="jewel-features-grid">
              {filteredFeatures.map(item => (
                <article className="jewel-feature-card" key={item.id}>
                  <div className="feature-card-top">
                    <div className="feature-card-icon" aria-hidden="true">{item.symbol}</div>
                    <span className="feature-card-badge">{item.badge}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <ul className="feature-highlights">
                    {item.highlights.map((point, idx) => (
                      <li key={idx}>
                        <span className="bullet">✦</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="services">

          <JewelBackdrop variant={4} />
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">What we do</div>
              <h2>Complete IT solutions under one roof</h2>
              <p>Build, modernize and manage your digital business with solutions aligned to your goals.</p>
            </div>
            <div className="services-grid">
              <article className="service-card">
                <div className="icon">◇</div>
                <h3>Web-Based Jewellery ERP</h3>
                <p>100% browser-based business management for jewellery retailers, wholesalers, and manufacturers with multi-branch cloud sync.</p>
              </article>
              <article className="service-card">
                <div className="icon">&lt;/&gt;</div>
                <h3>Custom Software</h3>
                <p>Tailor-made business applications designed around your workflows.</p>
              </article>
              <article className="service-card">
                <div className="icon">◎</div>
                <h3>Web Development</h3>
                <p>Modern, responsive websites and web applications for growing businesses.</p>
              </article>
              <article className="service-card">
                <div className="icon">▯</div>
                <h3>Mobile Applications</h3>
                <p>Business apps that help teams stay connected and productive.</p>
              </article>
              <article className="service-card">
                <div className="icon">☁</div>
                <h3>Cloud Solutions</h3>
                <p>Scalable technology solutions for secure and efficient operations.</p>
              </article>
              <article className="service-card">
                <div className="icon">⚙</div>
                <h3>Business Automation</h3>
                <p>Reduce repetitive work, improve accuracy and gain business insights.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section tint">

          <JewelBackdrop variant={5} />
          <div className="container two-col">
            <div>
              <div className="eyebrow">Why choose us</div>
              <h2>Your Growth. Our Priority.</h2>
              <p className="lead">We combine industry understanding with modern technology to deliver solutions that create real business value.</p>
              <div className="why-image">
                <div className="laptop">
                  <div className="screen">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                      </div>
                      <div className="browser-url">
                        🔒 https://erp.shreesparkinfotech.com/cloud-dashboard
                      </div>
                      <span className="browser-cloud-badge">☁ Web ERP</span>
                    </div>
                    <h4>Live Showroom &amp; Karigar Overview</h4>
                    <div className="screen-bars">
                      <i style={{ height: '35%' }}></i>
                      <i style={{ height: '55%' }}></i>
                      <i style={{ height: '42%' }}></i>
                      <i style={{ height: '75%' }}></i>
                      <i style={{ height: '60%' }}></i>
                      <i style={{ height: '92%' }}></i>
                      <i style={{ height: '78%' }}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul className="benefits">
                <li>100% Web-Based Jewellery ERP Software (Zero local server setup)</li>
                <li>Comprehensive Jewellery Barcoding &amp; Tagging tracking</li>
                <li>Metal-weight (Grams) &amp; amount-wise dual ledger tracking</li>
                <li>Multi-branch &amp; karigar workshop real-time synchronization</li>
                <li>Automated daily cloud backups &amp; dedicated support</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section">

          <JewelBackdrop variant={6} />
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Our commitment</div>
              <h2>Built around your business goals</h2>
              <p>We focus on practical software that supports your processes today and can grow with your business tomorrow.</p>
            </div>
            <div className="testimonials">
              <article className="quote">
                <div className="stars">✦ ✦ ✦ ✦ ✦</div>
                <p>“A well-planned ERP can bring stock, sales and operations into one clearer workflow.”</p>
                <div className="person">
                  <span className="avatar">S</span>
                  <span>Retail Business<br /><small className="client-subtitle">Illustrative client profile</small></span>
                </div>
              </article>
              <article className="quote">
                <div className="stars">✦ ✦ ✦ ✦ ✦</div>
                <p>“The right business software helps teams spend less time on repetitive tasks and more time serving customers.”</p>
                <div className="person">
                  <span className="avatar">W</span>
                  <span>Wholesale Business<br /><small className="client-subtitle">Illustrative client profile</small></span>
                </div>
              </article>
              <article className="quote">
                <div className="stars">✦ ✦ ✦ ✦ ✦</div>
                <p>“Useful reports and connected workflows give business owners better visibility into daily operations.”</p>
                <div className="person">
                  <span className="avatar">M</span>
                  <span>Manufacturing Business<br /><small className="client-subtitle">Illustrative client profile</small></span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">

          <JewelBackdrop variant={7} />
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Frequently Asked Questions</div>
              <h2>Everything Jewellers Ask About Our ERP Software</h2>
              <p>Common questions answered about implementing our 100% Web-Based Jewellery ERP Software in retail showrooms, wholesale counters, and manufacturing workshops.</p>
            </div>

            <div className="faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index
                return (
                  <div className={`faq-item ${isOpen ? 'open' : ''}`} key={index}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-toggle-icon" aria-hidden="true">+</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="cta">

          <JewelBackdrop variant={8} />
          <div className="container cta-row">
            <div>
              <div className="eyebrow">Transform Your Jewellery Business</div>
              <h2>Ready to Experience Modern Jewellery ERP Software?</h2>
              <p>Schedule a personalized demo to see how Shree Spark's Jewellery ERP Software streamlines your showroom and workshop.</p>
            </div>
            <a className="btn" href="#contact">Request ERP Software Demo →</a>
          </div>
        </section>

        <section className="section" id="contact">

          <JewelBackdrop variant={9} />
          <div className="container contact-grid">
            <div>
              <div className="eyebrow">Contact us</div>
              <h2>Let's discuss your project.</h2>
              <p className="lead">Looking for jewellery ERP software, custom development or a technology partner? Send us your requirements.</p>
              <div className="contact-items">
                <div className="contact-item">
                  <span className="icon">✉</span>
                  <span><b>Email us</b><a href="mailto:sales@shreesparkinfotech.com">sales@shreesparkinfotech.com</a></span>
                </div>
                <div className="contact-item">
                  <span className="icon">☎</span>
                  <span><b>Call us</b><a href="tel:+919265713425">+91 92657 13425</a></span>
                </div>
                <div className="contact-item">
                  <span className="icon">📍</span>
                  <span>
                    <b>Office Address</b>
                    518, Hilltown Landmark, Opp. Das Khaman, Nikol - Naroda Rd, Nicol Gam, Nikol, Ahmedabad, Gujarat 382350
                    <a
                      href="https://maps.app.goo.gl/UquSkzt45jeTa1in6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link-btn"
                    >
                      📍 View on Google Maps ↗
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
              <h3 className="form-title">Send an enquiry</h3>
              <p className="form-subtitle">Tell us a little about what you need.</p>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Your name *</label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">How can we help? *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us about your software requirements..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button className="btn" type="submit">Send Enquiry →</button>
              <p className="form-note">This demo form opens your default email application. Connect a backend or form service to receive submissions directly.</p>
            </form>
          </div>

          {/* Interactive Google Map Location Card */}
          <div className="container map-section-wrapper">
            <div className="map-card">
              <div className="map-card-header">
                <div>
                  <div className="eyebrow map-card-eyebrow">📍 Our Office Location</div>
                  <h3 className="map-card-title">
                    Visit Shree Spark Infotech
                  </h3>
                  <p className="map-card-address">
                    Hilltown Landmark, 518, Nikol - Naroda Rd, Nicol Gam, Nikol, Ahmedabad, Gujarat 382350
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/UquSkzt45jeTa1in6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn small-btn map-directions-btn"
                >
                  Get Directions on Google Maps ↗
                </a>
              </div>
              <div className="map-embed-container">
                <iframe
                  title="Shree Spark Infotech Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.3893190203676!2d72.66046587509277!3d23.046184279157348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87943bfc0187%3A0x3936c79442d9a7b5!2sShree%20Spark%20Infotech!5e0!3m2!1sen!2sin!4v1793889077119!5m2!1sen!2sin"
                  width="100%"
                  height="390"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top-row">
            <div className="footer-brand-info">
              <a className="brand footer-brand" href="#home">
                <img
                  src="/logo.jpg"
                  alt="Shree Spark Infotech - Web-Based Jewellery ERP Software"
                  className="brand-logo footer-logo"
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                />
                <div className="brand-text">
                  <span className="brand-title">
                    <span className="brand-shree">Shree</span>
                    <span className="brand-spark">Spark</span>
                  </span>
                  <span className="brand-subtitle">INFOTECH</span>
                </div>
              </a>
              <p className="footer-tagline">
                Specialized Web-Based Jewellery ERP Software &amp; Custom IT Solutions.
              </p>
            </div>
            <address className="footer-contact-details" style={{ fontStyle: 'normal' }}>
              <p className="footer-detail-line">
                <strong>Address:</strong>{' '}
                <a
                  href="https://maps.app.goo.gl/UquSkzt45jeTa1in6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  518, Hilltown Landmark, Opp. Das Khaman, Nikol Naroda Road, Nikol, Ahmedabad-382350, Gujarat ↗
                </a>
              </p>
              <p className="footer-detail-line">
                <strong>Phone:</strong> <a href="tel:+919265713425">+91 92657 13425</a> &nbsp;|&nbsp; <strong>Email:</strong> <a href="mailto:sales@shreesparkinfotech.com">sales@shreesparkinfotech.com</a>
              </p>
            </address>
          </div>
          <div className="footer-row">
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#solutions">Solutions</a>
              <a href="#web-erp">Web ERP</a>
              <a href="#features">Features</a>
              <a href="#services">Services</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="copyright">© {new Date().getFullYear()} Shree Spark Infotech. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
