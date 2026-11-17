import { useState, useEffect, useRef } from 'react'
import './App.css'
import bannerMultiDevice from './assets/banners/banner-multidevice-hd.webp'
import bannerDashboard from './assets/banners/banner-dashboard-hd.webp'
import bannerLogin from './assets/banners/banner-login-hd.webp'
import Icon from './Icon.jsx'
import BrandBackdrop from './BrandBackdrop.jsx'

const heroBanners = [
  {
    id: 'multidevice',
    title: 'Multi-Device ERP Platform',
    subtitle: 'Access showroom & workshop on Desktop, Laptop, Tablet & Mobile',
    badge: 'Web-Based • Multi-Device Access',
    chips: [
      'Desktop Showroom POS',
      'Laptop Workshop Sync',
      'Tablet & Phone Real-time'
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
    subtitle: 'Encrypted access, separate data for every business & role-based permissions',
    badge: 'Secure Access • Cloud Synced',
    chips: [
      '256-Bit SSL Encrypted',
      'Multi-Tenant Security',
      'Role-Based Permissions'
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
    }, 3000)
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
              <span>Shree Spark Jewellery ERP</span>
            </div>
            <small className="dash-subtitle">
              {currentBanner.title}
            </small>
          </div>
          <div className="banner-top-meta">
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
                title="Click to enlarge"
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
          {currentBanner.badge}
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
                <Icon name="x" size={20} />
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
    icon: 'hammer',
    category: 'Artisan & Karigar',
    badge: 'Manufacturing',
    desc: 'Issue raw gold bullion, silver alloys, and loose gemstones to karigars (artisans) and record receipts of finished ornaments with automatic melting loss, purity checks, and labor charge tracking.',
    highlights: ['Fine Metal Issue & Return', 'Wastage & Loss Calculation', 'Labour & Making Charge Khata']
  },
  {
    id: 'customer-issue-receipt',
    title: 'Customer wise Issue/Receipt',
    icon: 'users',
    category: 'Artisan & Karigar',
    badge: 'Retail Counter',
    desc: 'Manage custom jewellery orders, advance metal deposits, old gold exchange receipts, and repair intakes with automated voucher generation, instant customer SMS/WhatsApp receipts, and photo proofing.',
    highlights: ['Old Gold Exchange Testing', 'Custom Order Advance Track', 'Repair Intake & Delivery Slips']
  },
  {
    id: 'karigar-customer-rate-analysis',
    title: 'Karigar/Customer wise Rate analysis',
    icon: 'trending-up',
    category: 'Artisan & Karigar',
    badge: 'Rate Analysis',
    desc: 'In-depth rate analysis evaluating making charge variance, artisan cost efficiency, and customer-specific price lists across fluctuating 24K, 22K, 18K gold and silver market bhav.',
    highlights: ['Artisan Making Charge Audits', 'Customer Pricing Tiers', 'Real-Time Margin Tracking']
  },
  {
    id: 'stock-barcoding',
    title: 'Stock management with Barcoding Facility',
    icon: 'scan-barcode',
    category: 'Inventory & Barcoding',
    badge: 'Barcode & Tagging',
    desc: 'End-to-end stock control with high-precision barcode tagging. Automatically segregates Gross Weight, Net Weight, Stone Carats, and Wastage for instant scan-and-bill counter checkout.',
    highlights: ['1D/2D Barcode & QR Printing', 'Barcode Tag Compatibility', 'Gross/Net/Stone Breakup']
  },
  {
    id: 'tag-image-catalogue',
    title: 'Tag Image Catalogue',
    icon: 'camera',
    category: 'Inventory & Barcoding',
    badge: 'Visual Merchandising',
    desc: 'Attach high-definition photos directly to item barcode tags. Create interactive digital lookbooks, showcase counter vault collections on tablets, and share instant WhatsApp catalogues with buyers.',
    highlights: ['HD Multi-Angle Ornament Photos', 'Tablet Showcase Presentation', 'Direct WhatsApp Share']
  },
  {
    id: 'physical-stock-scan',
    title: 'Physical Stock verification with Scan facility',
    icon: 'scan-search',
    category: 'Inventory & Barcoding',
    badge: 'Rapid Audit',
    desc: 'Audit thousands of ornaments across showroom display counters, trays, and vault safes in minutes using handheld barcode scanners. Instantly spots missing or misplaced items with zero downtime.',
    highlights: ['Handheld Scanner Support', 'Tray-by-Tray Instant Auditing', 'Discrepancy & Missing Item Alerts']
  },
  {
    id: 'cash-bank-management',
    title: 'Cash/Bank Management',
    icon: 'landmark',
    category: 'Finance & Ledgers',
    badge: 'Multi-Account Treasury',
    desc: 'Centralized financial management across multiple counter cash drawers, safe lockers, and bank accounts. Instantly reconcile RTGS/NEFT metal transfers, POS card swipe settlements, and UPI QR payments.',
    highlights: ['Counter Cash Day-Book', 'Multi-Bank Reconciliation', 'EDC Swipe & UPI QR Sync']
  },
  {
    id: 'metal-amount-ledger',
    title: 'Metal & Amount wise Ledger management',
    icon: 'scale',
    category: 'Finance & Ledgers',
    badge: 'Dual-Balance Ledgers',
    desc: 'Native jewellery dual-ledger architecture: maintains running balance in Pure Metal Weight (Fine Grams / Tola) simultaneously with Monetary Currency (₹) for accurate party accounts.',
    highlights: ['Fine Gold/Silver Weight Balance', 'Currency (₹) Ledger Tracking', 'Bhav Fixing & Metal Settlements']
  },
  {
    id: 'sales-purchase-analysis',
    title: 'Sales & Purchase Analysis',
    icon: 'chart-column',
    category: 'Finance & Ledgers',
    badge: 'Business Reports',
    desc: 'Reports showing your highest-selling jewellery categories, vendor purchase trends, seasonal sales spikes (Dhanteras, Wedding season), and gross profit margins.',
    highlights: ['Category Turnover Velocity', 'Vendor Price Comparison', 'Gross Margin & Profit Audits']
  },
  {
    id: 'aging-stock-analysis',
    title: 'Aging wise Stock Analysis',
    icon: 'hourglass',
    category: 'Finance & Ledgers',
    badge: 'Capital Optimization',
    desc: 'Classify inventory by aging brackets (30, 60, 90, 180+ days) to identify dead stock and slow-moving jewelry designs. Helps you decide what to melt, remake, or sell so idle gold weight frees up working capital.',
    highlights: ['30 / 60 / 90 / 180+ Day Buckets', 'Dead Stock Identification', 'Idle Gold Liquidation Insights']
  },
  {
    id: 'user-access-control',
    title: 'User Access Control management',
    icon: 'lock',
    category: 'Security & Governance',
    badge: 'Role-Based Security',
    desc: 'Permission controls so that counter salesmen, cashiers, accountants, and branch managers only access designated screens. Hide purchase costs, supplier margins, and ledger reports by role.',
    highlights: ['Role-Based Permission Matrix', 'Hide Sensitive Costs/Margins', 'Multi-Branch Staff Governance']
  },
  {
    id: 'entry-log-facility',
    title: 'Every Entry wise Log Facility',
    icon: 'file-text',
    category: 'Security & Governance',
    badge: 'Audit Trail',
    desc: 'An audit log that records every creation, alteration, rate edit, and voucher deletion. Captures exact timestamps, user identity, IP address, and previous vs. new values for total transparency.',
    highlights: ['Timestamp & User ID Stamping', 'Before vs. After Value Tracking', 'Clear Accountability']
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
    a: 'Yes. Shree Spark ERP supports 1D & 2D barcode printing and QR codes. Showroom staff can scan entire display counter trays and vault safes in minutes using wireless handheld scanners. The system immediately alerts you to missing items, misplaced trays, or unbilled pieces with zero showroom downtime.'
  },
  {
    q: 'How does Metal & Amount-wise Ledger Management ensure bullion accuracy?',
    a: 'Unlike conventional generic software that only tracks monetary figures (₹), our Jewellery ERP features a native dual-ledger architecture. Every transaction maintains two distinct balances: Pure Metal Weight (Fine 999.0 Grams/Tola) and Currency Amount (INR). This keeps balances accurate during metal advances, old gold exchanges, Bhav cuts (rate fixing), and party ledger settlements.'
  },
  {
    q: 'How does Aging-wise Stock Analysis help in working capital optimization?',
    a: 'Aging-wise analysis categorizes your showroom inventory into customizable age brackets (such as 30, 60, 90, 180+ days). It identifies slow-moving collections, dead designs, and idle gold weight, so you can liquidate, discount, or melt and remake ornaments and free up working capital for trending festive designs.'
  },
  {
    q: 'Is our jewellery showroom and customer financial data secure in the cloud?',
    a: 'Yes. Shree Spark ERP runs on secure cloud servers protected by 256-bit SSL encryption, automated daily off-site cloud backups, role-based access governance (hiding cost prices and metal purchase margins from counter staff), and user activity logs.'
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
      '.section-head, .mini-card, .solution, .web-erp-card, .web-erp-comparison-banner, .comp-col, .jewel-feature-card, .service-card, .why-image, .benefits li, .faq-item, .contact-item, .contact-form, .map-card, .cta, .two-col > div'
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

      <header className="topbar-wrapper">
        <div className="topbar">
          <a className="brand" href="#home">
            <img
              src="/logo.jpg"
              alt="Shree Spark Infotech logo"
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
              <span className="theme-toggle-icon"><Icon name={theme === 'dark' ? 'moon' : 'sun'} size={16} /></span>
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
            <span className="theme-toggle-icon"><Icon name={theme === 'dark' ? 'moon' : 'sun'} size={16} /></span>
          </button>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Current theme: ${theme === 'dark' ? 'Dark' : 'Light'} mode. Click to toggle.`}
            title={`Theme: ${theme === 'dark' ? 'Dark' : 'Light'} (click to switch)`}
          >
            <span className="theme-toggle-icon"><Icon name={theme === 'dark' ? 'moon' : 'sun'} size={16} /></span>
            <span className="theme-toggle-text">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>

          <a className="btn btn-nav-cta" href="#contact">Get a Quote ↗</a>
          <button
            className="mobile-toggle"
            id="toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <BrandBackdrop variant={1} dust={24} className="jb-hero" />
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Web-Based Jewellery ERP</div>
              <h1>One Platform. Complete Control.<br /><span>Room to Grow.</span></h1>
              <div className="hero-subheading">Jewellery ERP Software Built Around How Your Business Works.</div>
              <p>Shree Spark Infotech offers a web-based Jewellery ERP for retailers, wholesalers, manufacturers, and multi-branch businesses. Manage inventory, barcoding, karigar operations, metal and customer ledgers, and branch activities through one secure, centralized platform accessible anytime, anywhere.</p>
              <p className="hero-tagline">Work Smarter. Track Every Gram. Grow Without Limits.</p>
              <div className="actions">
                <a className="btn" href="#solutions">Explore Jewellery ERP →</a>
                <a className="btn outline" href="#contact">Book Your Live Demo →</a>
              </div>
              <div className="proof hero-proof">
                <span>Web-Based Access</span>
                <span>Access Anytime, Anywhere</span>
                <span>Secure Access &amp; User Permissions</span>
                <span>Clear Business Reports</span>
              </div>
            </div>
            <HeroBannerSlider />
          </div>
        </section>

        <section className="section" id="about">
          <BrandBackdrop variant={0} />
          <div className="container two-col">
            <div>
              <div className="eyebrow">Jewellery ERP Specialists</div>
              <h2>Jewellery ERP Software<br />Built for Real Growth.</h2>
              <p className="lead">Shree Spark Infotech specializes in Jewellery ERP software and custom digital solutions that help jewellery retailers, wholesalers, and manufacturers simplify operations, connect workflows, and maximize profitability.</p>
              <p className="lead">From our web-based Jewellery ERP to custom business applications, we provide scalable systems designed specifically for the precious metal industry.</p>
              <a className="btn small-btn" href="#solutions">Explore Jewellery ERP →</a>
            </div>
            <div className="mini-grid">
              <article className="mini-card">
                <div className="icon"><Icon name="shield-check" /></div>
                <h3>Reliable Systems</h3>
                <p>Designed around business needs.</p>
              </article>
              <article className="mini-card">
                <div className="icon"><Icon name="workflow" /></div>
                <h3>Integrated Workflows</h3>
                <p>Connected business processes.</p>
              </article>
              <article className="mini-card">
                <div className="icon"><Icon name="chart-column" /></div>
                <h3>Better Visibility</h3>
                <p>Useful reporting and insights.</p>
              </article>
              <article className="mini-card">
                <div className="icon"><Icon name="headset" /></div>
                <h3>Customer Focus</h3>
                <p>Support built around your needs.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section tint jewellery-solutions-section" id="solutions">
          <BrandBackdrop variant={1} />
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Our Solutions</div>
              <h2>One Integrated Jewellery ERP Platform</h2>
              <p>Bring showroom billing, barcoding, karigar management, bullion ledgers, and accounts together in one system.</p>
            </div>
            <div className="solution-grid">
              <article className="solution dark">
                <div className="solution-cloud-badge">CLOUD &amp; WEB-BASED</div>
                <div className="icon"><Icon name="gem" /></div>
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
                <div className="icon"><Icon name="code-xml" /></div>
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
          <BrandBackdrop variant={2} />
          <div className="container">
            <div className="section-head text-light">
              <div className="eyebrow web-erp-eyebrow">Cloud-Based</div>
              <h2 className="text-white">Web-Based Jewellery ERP Software<br /><span>Access Anywhere. Anytime. On Any Device.</span></h2>
              <p className="text-light-muted">
                Break free from legacy desktop software bound to a single counter PC. Shree Spark's web-based ERP gives your jewellery business the security, mobility, and speed it needs across multiple stores and workshops.
              </p>
            </div>

            <div className="web-erp-grid">
              <div className="web-erp-card">
                <div className="web-erp-card-icon"><Icon name="globe" size={24} /></div>
                <div className="web-erp-badge">Browser-Based</div>
                <h3>Zero Installation &amp; Any Device</h3>
                <p>Runs on Google Chrome, Apple Safari, Microsoft Edge across Windows, macOS, iPad, and Android phones without installing heavy client software.</p>
                <div className="web-erp-stat"><span><Icon name="check" size={12} strokeWidth={3} /></span> Works on PC, Mac, iPad &amp; Mobile</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon"><Icon name="building-2" size={24} /></div>
                <div className="web-erp-badge">Multi-Showroom</div>
                <h3>Multi-Branch Real-Time Sync</h3>
                <p>Connect multiple showrooms, wholesale counters, and manufacturing workshops into one unified central cloud database.</p>
                <div className="web-erp-stat"><span><Icon name="check" size={12} strokeWidth={3} /></span> Instant Inter-Branch Transfers</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon"><Icon name="cloud" size={24} /></div>
                <div className="web-erp-badge">Cost Saving</div>
                <h3>Zero Server &amp; Hardware Overhead</h3>
                <p>No in-house servers, server AMC contracts, static IPs, or local hardware crashes to worry about.</p>
                <div className="web-erp-stat"><span><Icon name="check" size={12} strokeWidth={3} /></span> No In-House Server Needed</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon"><Icon name="refresh-cw" size={24} /></div>
                <div className="web-erp-badge">Zero Data Loss</div>
                <h3>Automated Daily Cloud Backups</h3>
                <p>Encrypted database backups stored in the cloud. If a showroom PC fails, your stock and ledgers stay safe.</p>
                <div className="web-erp-stat"><span><Icon name="check" size={12} strokeWidth={3} /></span> Daily Cloud Backups</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon"><Icon name="tablet-smartphone" size={24} /></div>
                <div className="web-erp-badge">Floor Mobility</div>
                <h3>Tablet Counter &amp; Digital Lookbooks</h3>
                <p>Sales staff can walk customers through high-definition jewellery catalogues on tablets, generate instant estimates, and check live vault availability.</p>
                <div className="web-erp-stat"><span><Icon name="check" size={12} strokeWidth={3} /></span> Better Customer Experience</div>
              </div>

              <div className="web-erp-card">
                <div className="web-erp-card-icon"><Icon name="lock" size={24} /></div>
                <div className="web-erp-badge">Secure</div>
                <h3>Enterprise Security &amp; Role Access</h3>
                <p>256-bit SSL encryption and granular permission shields (hide costs/bhav from staff) protect your bullion confidentiality.</p>
                <div className="web-erp-stat"><span><Icon name="check" size={12} strokeWidth={3} /></span> 256-Bit SSL &amp; Role Permissions</div>
              </div>
            </div>

            <div className="web-erp-comparison-banner">
              <div className="comparison-content">
                <div className="comparison-tag">TRADITIONAL DESKTOP vs. SHREE SPARK</div>
                <h3>Move from Desktop Software to a Cloud Jewellery ERP</h3>
                <p>Why jewellers across India are switching to our browser-based platform.</p>
              </div>
              <div className="comparison-table-wrapper">
                <div className="comp-col old">
                  <h4>Legacy Desktop ERP</h4>
                  <ul>
                    <li>Locked to single physical shop PC</li>
                    <li>High server, UPS &amp; static IP setup costs</li>
                    <li>Risk of hard disk crashes &amp; data loss</li>
                    <li>Manual data export for head office</li>
                    <li>Cannot access while traveling or at home</li>
                  </ul>
                </div>
                <div className="comp-col new">
                  <h4>Shree Spark Web-Based ERP</h4>
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
          <BrandBackdrop variant={3} />
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">ERP Modules</div>
              <h2>Specialized Features of Our Jewellery ERP Software</h2>
              <p>Built to handle the unique complexities of jewellery retail, wholesale, manufacturing karigar workflows, bullion accounts, and vault stock auditing.</p>
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
                    <div className="feature-card-icon" aria-hidden="true"><Icon name={item.icon} /></div>
                    <span className="feature-card-badge">{item.badge}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <ul className="feature-highlights">
                    {item.highlights.map((point, idx) => (
                      <li key={idx}>
                        <span className="bullet"><Icon name="check" size={14} strokeWidth={2.5} /></span>
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
          <BrandBackdrop variant={4} />
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">What we do</div>
              <h2>Complete IT solutions under one roof</h2>
              <p>Build, modernize and manage your digital business with solutions aligned to your goals.</p>
            </div>
            <div className="services-grid">
              <article className="service-card">
                <div className="icon"><Icon name="gem" /></div>
                <h3>Web-Based Jewellery ERP</h3>
                <p>100% browser-based business management for jewellery retailers, wholesalers, and manufacturers with multi-branch cloud sync.</p>
              </article>
              <article className="service-card">
                <div className="icon"><Icon name="code-xml" /></div>
                <h3>Custom Software</h3>
                <p>Tailor-made business applications designed around your workflows.</p>
              </article>
              <article className="service-card">
                <div className="icon"><Icon name="globe" /></div>
                <h3>Web Development</h3>
                <p>Modern, responsive websites and web applications for growing businesses.</p>
              </article>
              <article className="service-card">
                <div className="icon"><Icon name="smartphone" /></div>
                <h3>Mobile Applications</h3>
                <p>Business apps that help teams stay connected and productive.</p>
              </article>
              <article className="service-card">
                <div className="icon"><Icon name="cloud" /></div>
                <h3>Cloud Solutions</h3>
                <p>Scalable technology solutions for secure and efficient operations.</p>
              </article>
              <article className="service-card">
                <div className="icon"><Icon name="settings" /></div>
                <h3>Business Automation</h3>
                <p>Reduce repetitive work, improve accuracy and gain business insights.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section tint">
          <BrandBackdrop variant={5} />
          <div className="container two-col">
            <div>
              <div className="eyebrow">Why choose us</div>
              <h2>Your Growth. Our Priority.</h2>
              <p className="lead">We combine industry understanding with modern technology to deliver solutions that create real business value.</p>
              <div className="why-image">
                <div className="laptop">
                  <div className="screen">
                    <div className="browser-bar">
                      <div className="browser-url">
                        <Icon name="lock" size={12} strokeWidth={2.25} /> shreesparkinfotech.com
                      </div>
                      <span className="browser-cloud-badge">Web ERP</span>
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
                <li>Web-based Jewellery ERP (no local server setup)</li>
                <li>Comprehensive Jewellery Barcoding &amp; Tagging tracking</li>
                <li>Metal-weight (Grams) &amp; amount-wise dual ledger tracking</li>
                <li>Multi-branch &amp; karigar workshop real-time synchronization</li>
                <li>Automated daily cloud backups &amp; dedicated support</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <BrandBackdrop variant={7} />
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Frequently Asked Questions</div>
              <h2>Everything Jewellers Ask About Our ERP Software</h2>
              <p>Common questions about using our web-based Jewellery ERP in retail showrooms, wholesale counters, and manufacturing workshops.</p>
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
          <BrandBackdrop variant={8} />
          <div className="container cta-row">
            <div>
              <div className="eyebrow">Transform Your Jewellery Business</div>
              <h2>Ready to Try a Modern Jewellery ERP?</h2>
              <p>Schedule a personalized demo to see how Shree Spark's Jewellery ERP fits your showroom and workshop.</p>
            </div>
            <a className="btn" href="#contact">Request a Demo →</a>
          </div>
        </section>

        <section className="section" id="contact">
          <BrandBackdrop variant={9} />
          <div className="container contact-grid">
            <div>
              <div className="eyebrow">Contact us</div>
              <h2>Let's discuss your project.</h2>
              <p className="lead">Looking for jewellery ERP software, custom development or a technology partner? Send us your requirements.</p>
              <div className="contact-items">
                <div className="contact-item">
                  <span className="icon"><Icon name="mail" size={20} /></span>
                  <span><b>Email us</b><a href="mailto:sales@shreesparkinfotech.com">sales@shreesparkinfotech.com</a></span>
                </div>
                <div className="contact-item">
                  <span className="icon"><Icon name="phone" size={20} /></span>
                  <span><b>Call us</b><a href="tel:+919265713425">+91 92657 13425</a></span>
                </div>
                <div className="contact-item">
                  <span className="icon"><Icon name="map-pin" size={20} /></span>
                  <span>
                    <b>Office Address</b>
                    518, Hilltown Landmark, Opp. Das Khaman, Nikol Naroda Road, Nikol, Ahmedabad, Gujarat 382350
                    <a
                      href="https://maps.app.goo.gl/UquSkzt45jeTa1in6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link-btn"
                    >
                      View on Google Maps ↗
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
            </form>
          </div>

          {/* Interactive Google Map Location Card */}
          <div className="container map-section-wrapper">
            <div className="map-card">
              <div className="map-card-header">
                <div>
                  <div className="eyebrow map-card-eyebrow">Our Office Location</div>
                  <h3 className="map-card-title">
                    Visit Shree Spark Infotech
                  </h3>
                  <p className="map-card-address">
                    518, Hilltown Landmark, Opp. Das Khaman, Nikol Naroda Road, Nikol, Ahmedabad, Gujarat 382350
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
                  alt="Shree Spark Infotech logo"
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
                  518, Hilltown Landmark, Opp. Das Khaman, Nikol Naroda Road, Nikol, Ahmedabad, Gujarat 382350 ↗
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
