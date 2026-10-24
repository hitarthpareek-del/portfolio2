import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import {
  developerInfo,
  whyWebsiteStats,
  projects,
  processSteps,
  servicesList,
  focusExpertiseList,
  technicalSkills,
  experienceData,
  educationData,
  achievementsData,
  tickerItems
} from './data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

function App() {
  // Hero interactive deck active project index
  const [heroDeckIndex, setHeroDeckIndex] = useState(0)

  // Per-project screen switcher (0 = primary image, 1 = secondary image)
  const [activeScreens, setActiveScreens] = useState({})

  // Case Study Modal & Fullscreen Image Lightbox
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)

  // Custom GSAP Cursor Follower
  const [cursorVisible, setCursorVisible] = useState(false)
  const [cursorText, setCursorText] = useState('Inspect Case Study ↗')
  const cursorRef = useRef(null)
  const appRef = useRef(null)

  // Interactive Business ROI & Missed Revenue Calculator
  const [monthlyVisitors, setMonthlyVisitors] = useState(1400)
  const [avgDealValue, setAvgDealValue] = useState(25000)
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(18)

  // Instant Client Project Brief Generator
  const [clientName, setClientName] = useState('')
  const [clientBusiness, setClientBusiness] = useState('')
  const [projectType, setProjectType] = useState('Custom Business Website & 24/7 Lead Engine')
  const [projectGoal, setProjectGoal] = useState('')

  // Auto-cycle hero showcase deck every 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroDeckIndex((prev) => (prev + 1) % projects.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // 60fps GSAP Cursor Follower
  useEffect(() => {
    const cursorEl = cursorRef.current
    if (!cursorEl) return

    const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.16, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.16, ease: 'power3.out' })

    const onMove = (e) => {
      xTo(e.clientX + 18)
      yTo(e.clientY + 18)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Heavy GSAP Animations: Split-Text Hero, Scroll Progress, Live Counters, Meter Bars, Clip-Path Reveals, Magnetic Buttons & 3D Tilt
  useEffect(() => {
    const cleanups = []

    const ctx = gsap.context(() => {
      // 1. Top Scroll Progress Bar
      gsap.fromTo(
        '.studio-scroll-bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2
          }
        }
      )

      // 2. Ambient Daylight Blobs Floating Motion
      gsap.to('.glow-cobalt', {
        x: -45,
        y: 35,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
      gsap.to('.glow-emerald', {
        x: 40,
        y: -30,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // 3. Hero Split-Character 3D Entrance + Deck Reveal
      const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      heroTl
        .fromTo(
          '.gsap-char',
          { yPercent: 115, rotateX: -75, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.024,
            ease: 'back.out(1.4)'
          }
        )
        .fromTo(
          '.gsap-hero-fade',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          '-=0.55'
        )
        .fromTo(
          '.hero-showcase-deck',
          { y: 44, opacity: 0, rotateY: -8, scale: 0.96 },
          { y: 0, opacity: 1, rotateY: 0, scale: 1, duration: 0.95, ease: 'power3.out' },
          '-=0.65'
        )

      // 4. Section Headers Scroll Reveal
      gsap.utils.toArray('.gsap-sec-head').forEach((head) => {
        gsap.fromTo(
          head,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: head,
              start: 'top 86%'
            }
          }
        )
      })

      // 5. Stat Bento Cards + Live Counting Numbers + Animated Meter Fill Bars
      gsap.fromTo(
        '.stat-studio-card',
        { y: 48, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-bento-6',
            start: 'top 84%'
          }
        }
      )

      gsap.utils.toArray('.gsap-stat-counter').forEach((el) => {
        const targetVal = parseFloat(el.getAttribute('data-target') || '0')
        const prefix = el.getAttribute('data-prefix') || ''
        const suffix = el.getAttribute('data-suffix') || ''
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10)
        const obj = { val: 0 }

        gsap.to(obj, {
          val: targetVal,
          duration: 1.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%'
          },
          onUpdate: () => {
            el.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`
          }
        })
      })

      gsap.utils.toArray('.stat-meter-fill').forEach((bar) => {
        const pct = bar.getAttribute('data-pct') || '80'
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${pct}%`,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%'
            }
          }
        )
      })

      // 6. Comparison Panels & ROI Calculator Reveal
      gsap.fromTo(
        '.comp-studio-panel',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.comparison-studio-grid',
            start: 'top 84%'
          }
        }
      )

      gsap.fromTo(
        '.roi-studio-card',
        { y: 48, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.roi-studio-card',
            start: 'top 86%'
          }
        }
      )

      // 7. Alternating Case Study Showcases — Curtain Clip-Path & Elevation Reveal
      gsap.utils.toArray('.project-showcase-row').forEach((row) => {
        const stage = row.querySelector('.project-browser-stage')
        gsap.fromTo(
          row,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%'
            }
          }
        )
        if (stage) {
          gsap.fromTo(
            stage,
            { clipPath: 'inset(10% 8% 10% 8% round 20px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 20px)',
              duration: 1.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%'
              }
            }
          )
        }
      })

      // 8. 4-Step Execution Blueprint Scroll-Scrubbed Progress Line
      gsap.fromTo(
        '.blueprint-progress-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.blueprint-track-wrap',
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 0.35
          }
        }
      )

      gsap.fromTo(
        '.blueprint-card',
        { y: 38, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blueprint-grid-4',
            start: 'top 85%'
          }
        }
      )

      // 9. Experience Cards & Tech Arsenal Reveal
      gsap.fromTo(
        '.exp-studio-card',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-grid-2',
            start: 'top 85%'
          }
        }
      )

      gsap.fromTo(
        '.arsenal-cell',
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.arsenal-bento-grid',
            start: 'top 86%'
          }
        }
      )

      // 10. About & Honors Reveal
      gsap.fromTo(
        ['.about-story-card', '.honors-studio-card'],
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-studio-grid',
            start: 'top 85%'
          }
        }
      )

      // 11. Footer Monumental Name Reveal
      gsap.fromTo(
        '.footer-monumental-name',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-monumental-name',
            start: 'top 92%'
          }
        }
      )

      // 12. Magnetic Buttons (.gsap-magnetic)
      const magBtns = document.querySelectorAll('.gsap-magnetic')
      magBtns.forEach((btn) => {
        const onMove = (e) => {
          const rect = btn.getBoundingClientRect()
          const dx = e.clientX - (rect.left + rect.width / 2)
          const dy = e.clientY - (rect.top + rect.height / 2)
          gsap.to(btn, { x: dx * 0.22, y: dy * 0.22, duration: 0.25, ease: 'power2.out' })
        }
        const onLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.35)' })
        }
        btn.addEventListener('mousemove', onMove)
        btn.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          btn.removeEventListener('mousemove', onMove)
          btn.removeEventListener('mouseleave', onLeave)
        })
      })

      // 13. 3D Perspective Tilt Cards (.gsap-tilt)
      const tiltCards = document.querySelectorAll('.gsap-tilt')
      tiltCards.forEach((card) => {
        const onMove = (e) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const cx = rect.width / 2
          const cy = rect.height / 2
          const rx = ((y - cy) / cy) * -4
          const ry = ((x - cx) / cx) * 4
          gsap.to(card, {
            rotationX: rx,
            rotationY: ry,
            transformPerspective: 1100,
            duration: 0.35,
            ease: 'power2.out'
          })
        }
        const onLeave = () => {
          gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.65, ease: 'power3.out' })
        }
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMove)
          card.removeEventListener('mouseleave', onLeave)
        })
      })
    }, appRef)

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleProjectScreen = (e, projectId, idx) => {
    e.stopPropagation()
    setActiveScreens((prev) => ({ ...prev, [projectId]: idx }))
  }

  // Split words into characters for GSAP 3D kinetic typography
  const renderKineticWords = (text) =>
    text.split(' ').map((word, wIdx) => (
      <span key={wIdx} className="hero-word">
        {word.split('').map((ch, cIdx) => (
          <span key={cIdx} className="gsap-char">
            {ch}
          </span>
        ))}
      </span>
    ))

  // ROI Calculations
  const estimatedNewLeads = Math.max(2, Math.round(monthlyVisitors * 0.035))
  const estimatedMonthlyRevenue = estimatedNewLeads * avgDealValue
  const hoursSavedMonthly = Math.round(manualHoursPerWeek * 4 * 0.6)

  const formatINR = (num) => '₹' + Number(num).toLocaleString('en-IN')

  const handleWhatsAppProposal = (e) => {
    e.preventDefault()
    const msg = `Hi Hitarth (${developerInfo.phone}), I reviewed your portfolio and would like to discuss a project.%0A%0A*Name:* ${
      clientName || 'Prospective Client'
    }%0A*Company:* ${clientBusiness || 'Growing Business'}%0A*Project Type:* ${projectType}%0A*Goals:* ${
      projectGoal || 'Want to build a high-converting website / custom web platform.'
    }`
    window.open(`https://wa.me/${developerInfo.whatsappNumber}?text=${msg}`, '_blank')
  }

  const handleEmailProposal = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${projectType} — ${clientBusiness || 'New Client'}`)
    const body = encodeURIComponent(
      `Hi Hitarth,\n\nI explored your portfolio and would like to discuss a web project.\n\nName: ${
        clientName || 'N/A'
      }\nCompany: ${clientBusiness || 'N/A'}\nProject Type: ${projectType}\nProject Goals: ${
        projectGoal || 'Looking for a custom high-converting website / web application.'
      }\n\nBest regards,\n${clientName || ''}`
    )
    window.location.href = `mailto:${developerInfo.email}?subject=${subject}&body=${body}`
  }

  const currentHeroProject = projects[heroDeckIndex]

  return (
    <div ref={appRef} className="studio-app">
      {/* Top Scroll Progress Bar */}
      <div className="studio-scroll-bar" />

      {/* Custom Interactive Cursor Pill */}
      <div
        ref={cursorRef}
        className="studio-cursor"
        style={{
          opacity: cursorVisible ? 1 : 0,
          transform: cursorVisible ? 'scale(1)' : 'scale(0.8)'
        }}
      >
        <span>{cursorText}</span>
      </div>

      {/* Fullscreen Image Lightbox */}
      {lightboxImage && (
        <div className="studio-modal-backdrop" onClick={() => setLightboxImage(null)}>
          <div
            style={{ maxWidth: '1120px', width: '100%', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.caption}
              style={{
                width: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '18px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.45)'
              }}
            />
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                color: '#ffffff',
                flexWrap: 'wrap'
              }}
            >
              <span>{lightboxImage.caption}</span>
              <button className="btn-studio" onClick={() => setLightboxImage(null)}>
                Close Preview ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deep Case Study Drawer / Modal */}
      {activeCaseStudy && (
        <div className="studio-modal-backdrop" onClick={() => setActiveCaseStudy(null)}>
          <div className="studio-modal-card" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="eyebrow-badge">
                  [{activeCaseStudy.index}] · {activeCaseStudy.category}
                </span>
                <span className="studio-mono">{activeCaseStudy.year}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <a href={`tel:${developerInfo.phone}`} className="phone-badge-highlight">
                  📞 {developerInfo.phone}
                </a>
                <button className="btn-studio" onClick={() => setActiveCaseStudy(null)}>
                  Close ✕
                </button>
              </div>
            </div>

            <h2 className="studio-h1" style={{ fontSize: '34px', marginTop: '22px' }}>
              {activeCaseStudy.title}
            </h2>
            <p className="studio-lead" style={{ marginTop: '10px' }}>
              {activeCaseStudy.summary}
            </p>

            {/* Screenshots inside Modal */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: activeCaseStudy.images.length > 1 ? '1fr 1fr' : '1fr',
                gap: '18px',
                marginTop: '24px'
              }}
            >
              {activeCaseStudy.images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-stone)'
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    style={{ width: '100%', maxHeight: '340px', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <div style={{ padding: '12px 16px', fontSize: '12.5px', color: 'var(--text-slate)' }}>
                    <strong>[Screen 0{i + 1}]</strong> {img.caption}
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-narrative-grid">
              <div className="modal-narrative-box">
                <span className="studio-mono" style={{ color: 'var(--cobalt)' }}>
                  01 · SYSTEM OVERVIEW
                </span>
                <p style={{ marginTop: '8px', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-slate)' }}>
                  {activeCaseStudy.overview}
                </p>
              </div>
              <div className="modal-narrative-box">
                <span className="studio-mono" style={{ color: 'var(--crimson)' }}>
                  02 · BUSINESS CHALLENGE
                </span>
                <p style={{ marginTop: '8px', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-slate)' }}>
                  {activeCaseStudy.context}
                </p>
              </div>
              <div className="modal-narrative-box">
                <span className="studio-mono" style={{ color: 'var(--indigo)' }}>
                  03 · ENGINEERING ARCHITECTURE
                </span>
                <p style={{ marginTop: '8px', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-slate)' }}>
                  {activeCaseStudy.approach}
                </p>
              </div>
              <div className="modal-narrative-box" style={{ background: '#ecfdf5', borderColor: '#6ee7b7' }}>
                <span className="studio-mono" style={{ color: 'var(--emerald-dark)' }}>
                  04 · COMMERCIAL OUTCOME
                </span>
                <p
                  style={{
                    marginTop: '8px',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'var(--text-obsidian)',
                    fontWeight: 600
                  }}
                >
                  {activeCaseStudy.outcome}
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div className="project-tech-chips">
                {activeCaseStudy.techStack.map((t) => (
                  <span key={t} className="tech-chip-light">
                    {t}
                  </span>
                ))}
              </div>
              <button
                className="btn-studio btn-studio-cobalt"
                onClick={() => {
                  setActiveCaseStudy(null)
                  scrollToSection('contact-section')
                }}
              >
                Build a Similar Platform for Your Business ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          FLOATING GLASSMORPHIC PILL NAVBAR
          ==================================================================== */}
      <div className="studio-nav-wrap">
        <header className="studio-navbar">
          <div className="nav-brand-group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="nav-monogram">HP</div>
            <div>
              <div className="nav-brand-name">HITARTH PAREEK</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
                Web &amp; SaaS Architect
              </div>
            </div>
            <span className="nav-live-dot" title="Available for Client Projects" />
          </div>

          <nav className="nav-pill-links">
            <button className="nav-pill-item" onClick={() => scrollToSection('market-reality')}>
              Why a Website?
            </button>
            <button className="nav-pill-item" onClick={() => scrollToSection('roi-estimator')}>
              ROI Calculator
            </button>
            <button className="nav-pill-item" onClick={() => scrollToSection('work-showcase')}>
              Projects [{projects.length}]
            </button>
            <button className="nav-pill-item" onClick={() => scrollToSection('blueprint-section')}>
              Process
            </button>
            <button className="nav-pill-item" onClick={() => scrollToSection('experience-section')}>
              Experience
            </button>
            <button className="nav-pill-item" onClick={() => scrollToSection('about-section')}>
              About
            </button>
          </nav>

          <div className="nav-cta-cluster">
            <a
              href={`tel:${developerInfo.phone}`}
              className="phone-badge-highlight gsap-magnetic"
              title="Call or WhatsApp Hitarth Directly"
            >
              <span>📞 {developerInfo.phone}</span>
            </a>
            <button
              className="btn-studio btn-studio-primary gsap-magnetic"
              onClick={() => scrollToSection('contact-section')}
            >
              Let&apos;s Talk ↗
            </button>
          </div>
        </header>
      </div>

      {/* ====================================================================
          1. HERO SECTION — KINETIC SPLIT-TEXT + LIVE PLATFORM PREVIEW DECK
          ==================================================================== */}
      <section className="hero-section">
        <div className="ambient-canvas-glow glow-cobalt" />
        <div className="ambient-canvas-glow glow-emerald" />

        <div className="studio-container">
          <div className="hero-grid">
            {/* Left Column: Kinetic Headline, Value Pitch & Highlighted Phone */}
            <div className="hero-left-col">
              <div className="eyebrow-badge emerald gsap-hero-fade">
                <span className="nav-live-dot" />
                <span>{developerInfo.availability} · Direct: {developerInfo.phone}</span>
              </div>

              <h1 className="hero-title-display">
                {renderKineticWords('Turn Your Business Into A')}{' '}
                <span className="studio-serif-italic">24/7 Digital</span>{' '}
                {renderKineticWords('Market Leader.')}
              </h1>

              <p className="studio-lead gsap-hero-fade">{developerInfo.heroPitch}</p>

              {/* Highlighted Phone & Primary CTAs */}
              <div className="hero-actions-row gsap-hero-fade">
                <button
                  className="btn-studio btn-studio-cobalt gsap-magnetic"
                  onClick={() => scrollToSection('contact-section')}
                >
                  Start Your Website / Platform ↗
                </button>
                <a
                  href={`https://wa.me/${developerInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="phone-hero-banner gsap-magnetic"
                >
                  <span>📞 Call / WhatsApp: {developerInfo.phone}</span>
                </a>
                <button
                  className="btn-studio gsap-magnetic"
                  onClick={() => scrollToSection('work-showcase')}
                >
                  Explore Live Work [{projects.length}]
                </button>
              </div>

              {/* Verified Commercial Metrics Strip */}
              <div className="hero-trust-strip gsap-hero-fade">
                <div className="hero-trust-item">
                  <span className="hero-trust-num" style={{ color: 'var(--emerald-dark)' }}>
                    60% Faster
                  </span>
                  <span className="hero-trust-label">
                    Reduction in manual quoting &amp; spreadsheet work (Medicca &amp; Vefes)
                  </span>
                </div>
                <div className="hero-trust-item">
                  <span className="hero-trust-num" style={{ color: 'var(--cobalt)' }}>
                    +35% Leads
                  </span>
                  <span className="hero-trust-label">
                    Higher client inquiry &amp; form conversion rate from engineered UX
                  </span>
                </div>
                <div className="hero-trust-item">
                  <span className="hero-trust-num">24 / 7 / 365</span>
                  <span className="hero-trust-label">
                    Automated client capture, quoting &amp; digital onboarding
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Live Platform Showcase Deck */}
            <div className="hero-showcase-deck gsap-tilt">
              <div className="deck-window-bar">
                <div className="window-dots">
                  <span className="win-dot red" />
                  <span className="win-dot amber" />
                  <span className="win-dot green" />
                </div>
                <span className="deck-url-pill">https://{currentHeroProject.domain}</span>
                <span className="studio-mono" style={{ color: 'var(--emerald-dark)' }}>
                  ● LIVE SYSTEM
                </span>
              </div>

              <div
                className="deck-screen-frame"
                onClick={() => setActiveCaseStudy(currentHeroProject)}
                onMouseEnter={() => {
                  setCursorText(`Inspect ${currentHeroProject.shortTitle} ↗`)
                  setCursorVisible(true)
                }}
                onMouseLeave={() => setCursorVisible(false)}
              >
                <img src={currentHeroProject.primaryImage} alt={currentHeroProject.title} />
                <div className="deck-floating-badge">
                  <div>
                    <div className="studio-mono" style={{ color: 'var(--cobalt)', fontSize: '10.5px' }}>
                      [{currentHeroProject.index}] {currentHeroProject.category}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--text-obsidian)' }}>
                      {currentHeroProject.shortTitle}
                    </div>
                  </div>
                  <span className="comp-pill success">{currentHeroProject.featuredMetric}</span>
                </div>
              </div>

              {/* Interactive Deck Switcher Tabs */}
              <div className="deck-tabs-row">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    className={`deck-tab-btn ${heroDeckIndex === idx ? 'active' : ''}`}
                    onClick={() => setHeroDeckIndex(idx)}
                  >
                    {proj.index}. {proj.shortTitle.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. DUAL-DIRECTION VELOCITY MARQUEE RIBBON
          ==================================================================== */}
      <div className="marquee-band">
        <div className="marquee-row marquee-left">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="marquee-chip">
              <span className="marquee-dot">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================
          3. WHY YOUR BUSINESS NEEDS A WEBSITE NOW (6 STATS + COMPARISON + ROI)
          ==================================================================== */}
      <section id="market-reality" className="studio-section">
        <div className="studio-container">
          <div className="section-head-split gsap-sec-head">
            <div style={{ maxWidth: '820px' }}>
              <span className="eyebrow-badge crimson">● {whyWebsiteStats.eyebrow}</span>
              <h2 className="studio-h1" style={{ marginTop: '16px' }}>
                Every Day Without a Modern Website, Your Competitors Are{' '}
                <span className="studio-serif-italic">Closing Your Clients.</span>
              </h2>
              <p className="studio-lead" style={{ marginTop: '14px' }}>
                {whyWebsiteStats.subheadline}
              </p>
            </div>
            <a href={`tel:${developerInfo.phone}`} className="phone-badge-highlight gsap-magnetic">
              📞 Direct Consultation: {developerInfo.phone}
            </a>
          </div>

          {/* 6 Bento Stat Cards with Live GSAP Number Counters & Animated Meter Bars */}
          <div className="stats-bento-6">
            {whyWebsiteStats.stats.map((stat) => (
              <div key={stat.index} className="stat-studio-card gsap-tilt">
                <div>
                  <div className="stat-top-bar">
                    <span
                      className="stat-giant-num gsap-stat-counter"
                      data-target={stat.numericValue}
                      data-prefix={stat.prefix}
                      data-suffix={stat.suffix}
                      data-decimals={stat.decimals}
                    >
                      {stat.value}
                    </span>
                    <span className="eyebrow-badge">[{stat.index}] {stat.label}</span>
                  </div>

                  <div className="stat-meter-track" style={{ marginTop: '14px' }}>
                    <div className="stat-meter-fill" data-pct={stat.meterPercent} />
                  </div>
                </div>

                <div>
                  <h3 className="stat-card-heading">{stat.title}</h3>
                  <p className="stat-card-copy" style={{ marginTop: '8px' }}>
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Side-by-Side Comparison Matrix */}
          <div className="comparison-studio-grid">
            <div className="comp-studio-panel comp-without">
              <div className="comp-head">
                <h3 className="studio-h2" style={{ fontSize: '22px', color: '#9f1239' }}>
                  {whyWebsiteStats.comparison.withoutWebsite.title}
                </h3>
                <span className="comp-pill danger">
                  {whyWebsiteStats.comparison.withoutWebsite.badge}
                </span>
              </div>
              <ul className="comp-points">
                {whyWebsiteStats.comparison.withoutWebsite.points.map((pt, i) => (
                  <li key={i} className="comp-point-row">
                    <span
                      className="comp-check-icon"
                      style={{ background: '#ffe4e6', color: '#e11d48' }}
                    >
                      ✕
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="comp-studio-panel comp-with">
              <div className="comp-head">
                <h3 className="studio-h2" style={{ fontSize: '22px', color: '#065f46' }}>
                  {whyWebsiteStats.comparison.withWebsite.title}
                </h3>
                <span className="comp-pill success">
                  {whyWebsiteStats.comparison.withWebsite.badge}
                </span>
              </div>
              <ul className="comp-points">
                {whyWebsiteStats.comparison.withWebsite.points.map((pt, i) => (
                  <li key={i} className="comp-point-row">
                    <span
                      className="comp-check-icon"
                      style={{ background: '#d1fae5', color: '#059669' }}
                    >
                      ✓
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Business Growth & Missed Revenue Calculator */}
          <div id="roi-estimator" className="roi-studio-card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '16px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--border-light)'
              }}
            >
              <div>
                <span className="eyebrow-badge">INTERACTIVE BUSINESS ROI ESTIMATOR</span>
                <h3 className="studio-h2" style={{ marginTop: '10px' }}>
                  Calculate How Much Revenue &amp; Time a Custom Website Unlocks for You
                </h3>
              </div>
              <span className="studio-mono">REAL-TIME COMMERCIAL MODEL</span>
            </div>

            <div className="roi-studio-body">
              <div className="roi-slider-stack">
                <div className="roi-slider-item">
                  <div className="roi-slider-top">
                    <span>Monthly People Searching for Your Service / Industry</span>
                    <span className="roi-slider-val">{monthlyVisitors.toLocaleString()} visitors/mo</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="10000"
                    step="100"
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                    className="studio-range"
                  />
                </div>

                <div className="roi-slider-item">
                  <div className="roi-slider-top">
                    <span>Your Average Client Order / Project Value (₹)</span>
                    <span className="roi-slider-val">{formatINR(avgDealValue)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="250000"
                    step="5000"
                    value={avgDealValue}
                    onChange={(e) => setAvgDealValue(Number(e.target.value))}
                    className="studio-range"
                  />
                </div>

                <div className="roi-slider-item">
                  <div className="roi-slider-top">
                    <span>Weekly Hours Spent on Manual Quotes, Excel &amp; Follow-ups</span>
                    <span className="roi-slider-val">{manualHoursPerWeek} hrs/week</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="60"
                    step="2"
                    value={manualHoursPerWeek}
                    onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                    className="studio-range"
                  />
                </div>
              </div>

              <div className="roi-result-panel">
                <span className="studio-mono" style={{ color: 'var(--cobalt)' }}>
                  ESTIMATED NEW MONTHLY REVENUE POTENTIAL
                </span>
                <div className="roi-big-figure">{formatINR(estimatedMonthlyRevenue)} / mo</div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-slate)', lineHeight: 1.55 }}>
                  Capturing just <strong>3.5%</strong> of your monthly search demand adds{' '}
                  <strong>~{estimatedNewLeads} paying clients</strong> every month.
                </p>

                <div className="roi-sub-grid">
                  <div>
                    <div className="studio-h2" style={{ fontSize: '22px', color: 'var(--cobalt)' }}>
                      +{estimatedNewLeads} Clients/mo
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Automated 24/7 lead capture
                    </div>
                  </div>
                  <div>
                    <div className="studio-h2" style={{ fontSize: '22px', color: 'var(--emerald-dark)' }}>
                      {hoursSavedMonthly} Hrs Saved/mo
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      60% less manual admin work
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '6px' }}>
                  <button
                    className="btn-studio btn-studio-cobalt gsap-magnetic"
                    style={{ flex: 1 }}
                    onClick={() => scrollToSection('contact-section')}
                  >
                    Claim This Growth — Let&apos;s Talk ↗
                  </button>
                  <a href={`tel:${developerInfo.phone}`} className="phone-badge-highlight gsap-magnetic">
                    📞 {developerInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. ALTERNATING EDITORIAL CASE STUDY SHOWCASE (4 REAL PROJECTS)
          ==================================================================== */}
      <section id="work-showcase" className="studio-section">
        <div className="studio-container">
          <div className="section-head-split gsap-sec-head">
            <div>
              <span className="eyebrow-badge">
                SELECTED PRODUCTION PLATFORMS · [{projects.length}] CASE STUDIES
              </span>
              <h2 className="studio-h1" style={{ marginTop: '14px' }}>
                Engineered Web Systems That{' '}
                <span className="studio-serif-italic">Multiply Revenue.</span>
              </h2>
            </div>
            <p className="studio-lead" style={{ maxWidth: '460px' }}>
              Click any live screenshot to enlarge or inspect the full engineering architecture and commercial outcome.
            </p>
          </div>

          <div className="case-studies-stack">
            {projects.map((project, idx) => {
              const currentScreen = activeScreens[project.id] || 0
              const imgSrc =
                currentScreen === 1 && project.secondaryImage
                  ? project.secondaryImage
                  : project.primaryImage
              const isReverse = idx % 2 === 1

              return (
                <article
                  key={project.id}
                  className={`project-showcase-row gsap-tilt ${isReverse ? 'reverse' : ''}`}
                >
                  {/* Browser Stage */}
                  <div className="project-browser-stage">
                    <div className="browser-chrome">
                      <div className="window-dots">
                        <span className="win-dot red" />
                        <span className="win-dot amber" />
                        <span className="win-dot green" />
                      </div>
                      <span className="deck-url-pill">https://{project.domain}</span>
                      {project.secondaryImage ? (
                        <div className="screen-switcher-group">
                          <button
                            className={`screen-switch-btn ${currentScreen === 0 ? 'active' : ''}`}
                            onClick={(e) => toggleProjectScreen(e, project.id, 0)}
                          >
                            Screen 1
                          </button>
                          <button
                            className={`screen-switch-btn ${currentScreen === 1 ? 'active' : ''}`}
                            onClick={(e) => toggleProjectScreen(e, project.id, 1)}
                          >
                            Screen 2
                          </button>
                        </div>
                      ) : (
                        <span className="studio-mono">[{project.year}]</span>
                      )}
                    </div>

                    <div
                      className="browser-screen-Viewport"
                      onClick={() => setActiveCaseStudy(project)}
                      onMouseEnter={() => {
                        setCursorText(`Read ${project.shortTitle} Case Study ↗`)
                        setCursorVisible(true)
                      }}
                      onMouseLeave={() => setCursorVisible(false)}
                    >
                      <img src={imgSrc} alt={project.title} loading="lazy" />
                      <div className="project-metric-pill-float">✦ {project.featuredMetric}</div>
                    </div>
                  </div>

                  {/* Narrative Column */}
                  <div className="project-narrative-col">
                    <div className="project-index-pill">
                      <span>CASE STUDY [{project.index}]</span>
                      <span>·</span>
                      <span>{project.category}</span>
                    </div>

                    <h3 className="studio-h2">{project.title}</h3>
                    <p className="studio-lead" style={{ fontSize: '15.5px' }}>
                      {project.summary}
                    </p>

                    <div className="project-outcome-callout">
                      <strong style={{ color: 'var(--emerald-dark)' }}>Commercial Impact: </strong>
                      {project.outcome}
                    </div>

                    <div className="project-tech-chips">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tech-chip-light">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '6px' }}>
                      <button
                        className="btn-studio btn-studio-primary gsap-magnetic"
                        onClick={() => setActiveCaseStudy(project)}
                      >
                        Explore Full Case Study ↗
                      </button>
                      <button
                        className="btn-studio"
                        onClick={() =>
                          setLightboxImage({
                            src: imgSrc,
                            caption: `${project.title} — ${project.featuredMetric}`
                          })
                        }
                      >
                        Zoom Screenshot 🔍
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. 4-STEP CLIENT EXECUTION BLUEPRINT
          ==================================================================== */}
      <section id="blueprint-section" className="studio-section">
        <div className="studio-container">
          <div className="section-head-split gsap-sec-head">
            <div>
              <span className="eyebrow-badge">CLIENT EXECUTION BLUEPRINT · 4 STEPS TO LAUNCH</span>
              <h2 className="studio-h1" style={{ marginTop: '14px' }}>
                How We Turn Your Idea Into{' '}
                <span className="studio-serif-italic">Live Revenue.</span>
              </h2>
            </div>
            <a href={`tel:${developerInfo.phone}`} className="phone-badge-highlight gsap-magnetic">
              📞 Start Step 01 Today: {developerInfo.phone}
            </a>
          </div>

          <div className="blueprint-track-wrap">
            <div className="blueprint-progress-line">
              <div className="blueprint-progress-fill" />
            </div>

            <div className="blueprint-grid-4">
              {processSteps.map((item) => (
                <div key={item.step} className="blueprint-card gsap-tilt">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="blueprint-num-badge">{item.step}</div>
                    <span className="studio-mono">{item.phase}</span>
                  </div>
                  <h3 className="stat-card-heading">{item.title}</h3>
                  <p className="stat-card-copy">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. EXPERIENCE (Medicca & Vefes Engineering — No Dates) & TECH ARSENAL
          ==================================================================== */}
      <section id="experience-section" className="studio-section">
        <div className="studio-container">
          <div className="section-head-split gsap-sec-head">
            <div>
              <span className="eyebrow-badge">VERIFIED INDUSTRY TRACK RECORD</span>
              <h2 className="studio-h1" style={{ marginTop: '14px' }}>
                Production Experience &amp;{' '}
                <span className="studio-serif-italic">Engineering Arsenal.</span>
              </h2>
            </div>
          </div>

          {/* 2-Column Executive Experience Cards (Medicca & Vefes Engineering — Zero Months/Dates) */}
          <div className="experience-grid-2">
            {experienceData.map((exp) => (
              <div key={exp.company} className="exp-studio-card gsap-tilt">
                <div className="exp-header-row">
                  <div>
                    <span className="studio-mono" style={{ color: 'var(--cobalt)' }}>
                      [{exp.index}] · VERIFIED PRODUCTION ROLE
                    </span>
                    <h3 className="studio-h2" style={{ marginTop: '6px' }}>
                      {exp.role} — <span style={{ color: 'var(--cobalt)' }}>{exp.company}</span>
                    </h3>
                  </div>
                  <span className="eyebrow-badge emerald">{exp.sector}</span>
                </div>

                <div className="exp-highlights-list">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="exp-highlight-item">
                      <span className="exp-metric-badge">{h.metric}</span>
                      <p style={{ fontSize: '14px', lineHeight: 1.55, color: 'var(--text-slate)' }}>
                        {h.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 4-Column Categorized Technical Skills Matrix */}
          <div className="arsenal-bento-grid">
            {Object.entries(technicalSkills).map(([cat, items], idx) => (
              <div key={cat} className="arsenal-cell">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px' }}>
                    {cat}
                  </span>
                  <span className="studio-mono">[0{idx + 1}]</span>
                </div>
                <div className="arsenal-tags">
                  {items.map((skill) => (
                    <span key={skill} className="arsenal-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Services & Focus 2-Column Split */}
          <div className="services-studio-grid">
            <div className="service-panel">
              <span className="studio-mono" style={{ color: 'var(--cobalt)' }}>
                [ WHAT I BUILD FOR CLIENTS ]
              </span>
              <h3 className="studio-h2" style={{ marginTop: '8px', marginBottom: '18px' }}>
                Commercial Web Services
              </h3>
              <div>
                {servicesList.map((srv, i) => (
                  <div key={srv} className="service-row-item">
                    <span>{srv}</span>
                    <span className="studio-mono">[0{i + 1}]</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-panel">
              <span className="studio-mono" style={{ color: 'var(--emerald-dark)' }}>
                [ CORE SPECIALIZATIONS ]
              </span>
              <h3 className="studio-h2" style={{ marginTop: '8px', marginBottom: '18px' }}>
                Focus &amp; Domain Expertise
              </h3>
              <div>
                {focusExpertiseList.map((foc, i) => (
                  <div key={foc} className="service-row-item">
                    <span>{foc}</span>
                    <span className="studio-mono">[0{i + 1}]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. ABOUT ME, CLEAN DEGREE CARD (NO CGPA) & NATIONAL HONORS
          ==================================================================== */}
      <section id="about-section" className="studio-section">
        <div className="studio-container">
          <div className="about-studio-grid">
            {/* Left Column: About Narrative + Clean Degree Card */}
            <div className="about-story-card">
              <span className="eyebrow-badge">ABOUT THE ARCHITECT</span>
              <h2 className="studio-h1" style={{ fontSize: '38px' }}>
                Engineering High-Trust Digital Platforms for Ambitious Brands.
              </h2>

              {developerInfo.aboutParagraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: i === 0 ? '17px' : '15px',
                    lineHeight: 1.68,
                    color: i === 0 ? 'var(--text-obsidian)' : 'var(--text-slate)',
                    fontWeight: i === 0 ? 600 : 400
                  }}
                >
                  {p}
                </p>
              ))}

              {/* Clean Academic Foundation Card (No CGPA, No Dates) */}
              <div className="degree-clean-box">
                <span className="studio-mono" style={{ color: 'var(--cobalt)' }}>
                  ACADEMIC FOUNDATION
                </span>
                <h3 className="studio-h2" style={{ fontSize: '21px', marginTop: '6px' }}>
                  {educationData.degree}
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--text-slate)', marginTop: '4px' }}>
                  {educationData.institution}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '6px' }}>
                <a href={`tel:${developerInfo.phone}`} className="phone-hero-banner gsap-magnetic">
                  📞 Direct Line: {developerInfo.phone}
                </a>
                <button
                  className="btn-studio btn-studio-primary gsap-magnetic"
                  onClick={() => scrollToSection('contact-section')}
                >
                  Schedule a Discovery Call ↗
                </button>
              </div>
            </div>

            {/* Right Column: National Qualifications & Honors */}
            <div className="honors-studio-card gsap-tilt">
              <div
                style={{
                  background: 'var(--text-obsidian)',
                  color: '#ffffff',
                  borderRadius: '18px',
                  padding: '26px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div className="studio-mono" style={{ color: '#94a3b8' }}>
                    VERIFIED SYSTEMS ARCHITECT
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '26px',
                      fontWeight: 700,
                      marginTop: '4px'
                    }}
                  >
                    {developerInfo.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#34d399', marginTop: '4px', fontWeight: 600 }}>
                    ● Direct: {developerInfo.phone}
                  </div>
                </div>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 700
                  }}
                >
                  HP.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="studio-mono">NATIONAL HONORS &amp; QUALIFICATIONS</span>
                <span className="studio-mono">[05]</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {achievementsData.map((ach, i) => (
                  <div key={ach.title} className="honor-row-card">
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--text-obsidian)' }}>
                        {ach.title}
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-slate)', marginTop: '2px' }}>
                        {ach.subtitle}
                      </div>
                    </div>
                    <span className="comp-pill success">[0{i + 1}]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. HIGH-CONVERTING FOOTER & INSTANT PROPOSAL GENERATOR
          ==================================================================== */}
      <footer id="contact-section" className="studio-footer">
        <div className="studio-container">
          {/* Highlighted Phone / WhatsApp Hotline Banner */}
          <div className="hotline-banner-card">
            <div>
              <span className="studio-mono" style={{ color: 'var(--emerald-dark)' }}>
                ● DIRECT CLIENT HOTLINE · CALL OR WHATSAPP ANYTIME
              </span>
              <div style={{ marginTop: '8px' }}>
                <a href={`tel:${developerInfo.phone}`} className="hotline-giant-phone">
                  <span>📞 {developerInfo.phone}</span>
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={`tel:${developerInfo.phone}`}
                className="btn-studio btn-studio-primary gsap-magnetic"
              >
                Call Now ({developerInfo.phone}) ↗
              </a>
              <a
                href={`https://wa.me/${developerInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="phone-badge-highlight gsap-magnetic"
              >
                WhatsApp Direct ↗
              </a>
            </div>
          </div>

          <div className="footer-main-grid">
            {/* Left Column: Direct Contact Details & LinkedIn */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span className="eyebrow-badge emerald">READY TO LAUNCH YOUR PLATFORM?</span>
              <h2 className="studio-h1">
                Let&apos;s Build Your{' '}
                <span className="studio-serif-italic">Competitive Advantage.</span>
              </h2>
              <p className="studio-lead" style={{ fontSize: '16px' }}>
                Whether you need a high-converting corporate website, an automated quotation &amp; CRM engine like{' '}
                <strong>QuoteRx</strong>, an AI analytics platform, or a paperless eSign portal — let&apos;s discuss how we can multiply your business revenue.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-light)'
                }}
              >
                <div>
                  <span className="studio-mono">DIRECT PHONE &amp; WHATSAPP</span>
                  <div style={{ marginTop: '8px' }}>
                    <a href={`tel:${developerInfo.phone}`} className="phone-hero-banner gsap-magnetic">
                      📞 {developerInfo.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="studio-mono">DIRECT EMAIL</span>
                  <div style={{ marginTop: '6px' }}>
                    <a
                      href={`mailto:${developerInfo.email}`}
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--cobalt)',
                        textDecoration: 'underline'
                      }}
                    >
                      {developerInfo.email}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
                  {developerInfo.socials.map((soc) => (
                    <a
                      key={soc.label}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-studio gsap-magnetic"
                    >
                      {soc.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Instant Client Project Brief Generator */}
            <form className="proposal-studio-form" onSubmit={handleWhatsAppProposal}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '14px',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '14px' }}>
                  INSTANT PROJECT BRIEF &amp; ESTIMATE
                </span>
                <span className="comp-pill success">● Replies within 2 hours</span>
              </div>

              <div className="studio-form-row">
                <div className="studio-field">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="studio-input"
                  />
                </div>
                <div className="studio-field">
                  <label>Company / Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Enterprises"
                    value={clientBusiness}
                    onChange={(e) => setClientBusiness(e.target.value)}
                    className="studio-input"
                  />
                </div>
              </div>

              <div className="studio-field">
                <label>What Do You Want to Build?</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="studio-select"
                >
                  <option value="Custom Business Website & 24/7 Lead Engine">
                    Custom Business Website &amp; 24/7 Lead Engine
                  </option>
                  <option value="Quotation & CRM Automation Platform (like QuoteRx)">
                    Quotation &amp; CRM Automation Platform (like QuoteRx)
                  </option>
                  <option value="Full-Stack SaaS / AI Web Dashboard">
                    Full-Stack SaaS / AI Web Dashboard
                  </option>
                  <option value="Digital Signing / Client Onboarding Portal (like eSign)">
                    Digital Signing / Client Onboarding Portal (like eSign)
                  </option>
                  <option value="Real-Time Chat / Custom Web Application">
                    Real-Time Chat / Custom Web Application
                  </option>
                  <option value="Complete Website Redesign & Conversion Optimization">
                    Complete Website Redesign &amp; Conversion Optimization
                  </option>
                </select>
              </div>

              <div className="studio-field">
                <label>Project Goals or Current Bottlenecks</label>
                <textarea
                  rows={3}
                  placeholder="Tell me about your business and what you want your website or custom platform to achieve..."
                  value={projectGoal}
                  onChange={(e) => setProjectGoal(e.target.value)}
                  className="studio-textarea"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  className="btn-studio btn-studio-cobalt gsap-magnetic"
                  style={{ flex: 1 }}
                >
                  Send Brief via WhatsApp ↗
                </button>
                <button type="button" className="btn-studio" onClick={handleEmailProposal}>
                  Send via Email ✉
                </button>
              </div>
            </form>
          </div>

          <div className="footer-monumental-name">{developerInfo.footerSignature}</div>

          <div className="footer-bottom-row">
            <span>
              © {new Date().getFullYear()} {developerInfo.name} · Direct: {developerInfo.phone}
            </span>
            <span>Swiss Daylight Studio Edition · React + GSAP Motion</span>
            <button
              className="btn-studio"
              style={{ padding: '7px 14px', fontSize: '12px' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
