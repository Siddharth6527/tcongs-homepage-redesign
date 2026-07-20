import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FaBars,
  FaTimes,
  FaArrowRight,
  FaChevronDown,
  FaGlobe,
  FaMobileAlt,
  FaShoppingCart,
  FaPaintBrush,
  FaChartLine,
  FaRobot,
  FaRocket,
  FaCogs,
  FaHeadset,
  FaLaptopCode,
  FaQuoteLeft,
  FaStar,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa'

// ─── Site Data ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  {
    icon: FaGlobe,
    title: 'Website Development',
    desc: 'Lightning-fast, SEO-friendly websites built with modern frameworks for peak performance.',
  },
  {
    icon: FaMobileAlt,
    title: 'Mobile Apps',
    desc: 'Native & cross-platform mobile experiences that users love and keep coming back to.',
  },
  {
    icon: FaShoppingCart,
    title: 'E-Commerce',
    desc: 'High-converting online stores with seamless checkout, analytics, and growth tools.',
  },
  {
    icon: FaPaintBrush,
    title: 'Branding',
    desc: 'Distinctive brand identities — logos, systems, and guidelines that make you unforgettable.',
  },
  {
    icon: FaChartLine,
    title: 'Digital Marketing',
    desc: 'Data-driven campaigns across SEO, social, and paid media that deliver real ROI.',
  },
  {
    icon: FaRobot,
    title: 'AI Solutions',
    desc: 'Smart automation, chatbots, and ML integrations that future-proof your business.',
  },
]

const WHY_CHOOSE = [
  {
    icon: FaRocket,
    title: 'Fast Delivery',
    desc: 'Agile sprints, regular demos, and on-time launches — every single time.',
  },
  {
    icon: FaCogs,
    title: 'Scalable Architecture',
    desc: 'Clean, modular code that grows with your business — no costly rewrites.',
  },
  {
    icon: FaLaptopCode,
    title: 'Modern UI/UX',
    desc: 'Pixel-perfect interfaces backed by research, accessibility, and best practices.',
  },
  {
    icon: FaHeadset,
    title: '24x7 Support',
    desc: 'Round-the-clock monitoring and dedicated support to keep you ahead.',
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Discover', desc: 'We listen, research, and define your goals.' },
  { num: '02', title: 'Design', desc: 'Wireframes, prototypes, and polished UI flows.' },
  { num: '03', title: 'Develop', desc: 'Clean code, rigorous testing, and CI/CD pipelines.' },
  { num: '04', title: 'Launch', desc: 'Deployment, performance tuning, and go-live support.' },
  { num: '05', title: 'Grow', desc: 'Iteration, analytics, and continuous improvement.' },
]

const PORTFOLIO = [
  {
    title: 'NovaPay Dashboard',
    tag: 'Fintech',
    gradient: 'from-blue-500/20 to-violet-500/20',
    img: '💳',
  },
  {
    title: 'MediCare App',
    tag: 'Healthcare',
    gradient: 'from-pink-500/20 to-orange-500/20',
    img: '🏥',
  },
  {
    title: 'ShopVista',
    tag: 'E-Commerce',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    img: '🛒',
  },
  {
    title: 'EduSpark',
    tag: 'EdTech',
    gradient: 'from-violet-500/20 to-pink-500/20',
    img: '📚',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Tcongs transformed our digital presence. The new website doubled our conversion rate within a month.',
    name: 'Rahul Sharma',
    role: 'CEO, NovaPay',
    avatar: 'RS',
    stars: 5,
  },
  {
    quote: 'Exceptional quality and communication. They felt like part of our team, not an outsourced agency.',
    name: 'Priya Menon',
    role: 'CTO, MediCare',
    avatar: 'PM',
    stars: 5,
  },
  {
    quote: 'From concept to launch — every step was smooth. Our e-commerce sales jumped 140% post-redesign.',
    name: 'Arjun Kapoor',
    role: 'Founder, ShopVista',
    avatar: 'AK',
    stars: 5,
  },
]

const STATS = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 7, suffix: '+', label: 'Years Experience' },
  { value: 4.9, suffix: '★', label: 'Average Rating' },
]

// ─── Animated Counter ─────────────────────────────────────────────────────────

function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!startOnView) return
    let start = null
    let raf
    const step = (ts) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, startOnView])
  return count
}

function Counter({ end, suffix, duration = 2000 }) {
  const count = useCountUp(end, duration)
  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

function useInView(threshold = 0.4) {
  const ref = React.useRef(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function AnimatedStat({ value, suffix, label }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-display text-gradient mb-1">
        {inView ? <Counter end={value} suffix={suffix} /> : '0' + suffix}
      </div>
      <div className="text-ink-400 text-sm md:text-base">{label}</div>
    </div>
  )
}

// ─── Reusable Animation Components ────────────────────────────────────────────

function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.7,
}) {
  const offsets = { up: 40, down: -40, left: -40, right: 40 }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offsets.up, x: 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  children,
  className,
  id,
}) {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 md:px-8 lg:px-12 ${className || ''}`}>
      {children}
    </section>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-black/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 flex items-center justify-center text-white font-bold text-sm font-display shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
            TC
          </div>
          <span className="font-display font-bold text-lg text-white tracking-tight">
            Tcongs<span className="text-brand-400">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-300 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href="#contact" className="btn-primary text-sm">
            Get Free Consultation <FaArrowRight className="text-xs" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-ink-200 text-xl p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glass mx-4 mb-4 rounded-2xl p-6 flex flex-col gap-4"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-ink-200 hover:text-white transition-colors text-lg"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary justify-center text-sm mt-2"
          >
            Get Free Consultation <FaArrowRight className="text-xs" />
          </a>
        </motion.div>
      )}
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="glow-orb w-[600px] h-[400px] bg-brand-500/25 top-[-100px] right-[-100px] animate-blob" />
      <div className="glow-orb w-[500px] h-[350px] bg-violet-glow/20 bottom-[-50px] left-[-150px] animate-blob" style={{ animationDelay: '-5s' }} />
      <div className="glow-orb w-[300px] h-[300px] bg-accent-400/15 top-[40%] left-[50%] animate-blob" style={{ animationDelay: '-9s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Copy */}
          <div className="flex-1 max-w-2xl">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs font-medium text-brand-300 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                Trusted by 50+ businesses worldwide
              </span>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display leading-[1.08] mb-6">
                Build Digital
                <br />
                Products That
                <br />
                <span className="text-gradient">Grow Businesses</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-ink-300 leading-relaxed mb-8 max-w-lg">
                We craft websites, mobile apps, branding, and AI-powered solutions that turn bold ideas into market-leading digital products.
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#contact" className="btn-primary text-base">
                  Start a Project <FaArrowRight className="text-sm" />
                </a>
                <a href="#portfolio" className="btn-ghost text-base">
                  View Portfolio
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-wrap gap-3 text-sm text-ink-400">
                {['Websites', 'Apps', 'Branding', 'Marketing', 'AI Solutions'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full glass-light text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 relative max-w-lg lg:max-w-xl">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Floating cards */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Central glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-brand-500/30 via-violet-glow/20 to-accent-400/20 blur-3xl" />
                </div>

                {/* Browser Mockup */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10"
                >
                  <div className="glass rounded-2xl p-3 shadow-2xl shadow-brand-500/10">
                    <div className="flex items-center gap-2 px-3 py-2 mb-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                      </div>
                      <div className="flex-1 mx-3">
                        <div className="bg-ink-800/80 rounded-md h-6 text-[10px] flex items-center px-3 text-ink-400">
                          tcongs.dev
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 p-2">
                      <div className="h-4 w-3/4 rounded bg-gradient-to-r from-brand-400/30 to-violet-glow/30 shimmer" />
                      <div className="h-3 w-full rounded bg-white/5 shimmer" />
                      <div className="h-3 w-5/6 rounded bg-white/5 shimmer" />
                      <div className="h-3 w-4/6 rounded bg-white/5 shimmer" />
                      <div className="flex gap-3 mt-4">
                        <div className="h-8 w-24 rounded-lg bg-brand-500/30" />
                        <div className="h-8 w-24 rounded-lg border border-white/10" />
                      </div>
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="rounded-lg bg-white/5 p-3">
                            <div className="h-6 w-6 rounded bg-white/10 mb-2" />
                            <div className="h-2 w-full rounded bg-white/5 mb-1" />
                            <div className="h-2 w-2/3 rounded bg-white/5" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card 1 — Stats */}
                <motion.div
                  animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -right-2 top-8 md:top-12 glass rounded-xl px-4 py-3 z-20"
                >
                  <div className="text-2xl font-bold font-display text-gradient">150+</div>
                  <div className="text-[11px] text-ink-400">Projects Shipped</div>
                </motion.div>

                {/* Floating card 2 — Rating */}
                <motion.div
                  animate={{ y: [0, -10, 0], x: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                  className="absolute -left-2 bottom-20 md:bottom-24 glass rounded-xl px-4 py-3 z-20"
                >
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FaStar key={s} />
                    ))}
                    <span className="text-white ml-1 font-bold">4.9</span>
                  </div>
                  <div className="text-[11px] text-ink-400">Client Rating</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TRUST / STATS ─────────────────────────────────────────────────────────────

function TrustBar() {
  return (
    <section className="relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <AnimatedStat {...s} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <Section id="services">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-wider">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-black font-display mt-3 mb-4">
            Services Built for the{' '}
            <span className="text-gradient-brand">Modern Web</span>
          </h2>
          <p className="text-ink-400 max-w-xl mx-auto text-lg">
            End-to-end digital solutions — from first sketch to live product — engineered for performance and crafted for users.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <FadeIn key={svc.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative glass-light rounded-2xl p-7 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/5 to-violet-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-violet-glow/20 flex items-center justify-center text-brand-300 text-xl mb-5 group-hover:scale-110 transition-transform">
                      <Icon />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2">{svc.title}</h3>
                    <p className="text-ink-400 text-sm leading-relaxed">{svc.desc}</p>
                    <div className="mt-5 flex items-center gap-2 text-brand-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0 transition-transform">
                      Learn more <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────

function WhyChooseUs() {
  return (
    <Section className="!py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider">Why Us</span>
          <h2 className="text-3xl md:text-4xl font-black font-display mt-3">
            Why Partner With <span className="text-gradient-brand">Tcongs</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = item.icon
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="glass-light rounded-2xl p-7 text-center group hover:border-brand-400/30 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500/15 to-accent-400/15 flex items-center justify-center text-2xl text-brand-300 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-ink-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────

function Process() {
  return (
    <Section id="process">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-wider">Our Process</span>
          <h2 className="text-3xl md:text-5xl font-black font-display mt-3 mb-4">
            From <span className="text-gradient-brand">Idea</span> to{' '}
            <span className="text-gradient-brand">Launch</span>
          </h2>
          <p className="text-ink-400 max-w-lg mx-auto">
            A proven five-phase workflow that ensures quality, transparency, and rapid delivery.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/40 via-violet-glow/30 to-accent-400/40 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.15}>
                <motion.div
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-light rounded-2xl p-6 md:p-8 inline-block max-w-md">
                      <span className="text-brand-400 text-xs font-mono mb-2 block">{step.num}</span>
                      <h3 className="font-display font-bold text-xl text-white mb-1">{step.title}</h3>
                      <p className="text-ink-400 text-sm">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-ink-950 border-2 border-brand-400 flex items-center justify-center text-brand-400 text-sm font-bold font-mono shadow-lg shadow-brand-500/30">
                      {step.num}
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────

function Portfolio() {
  return (
    <Section id="portfolio">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-wider">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-black font-display mt-3 mb-4">
            Selected <span className="text-gradient-brand">Work</span>
          </h2>
          <p className="text-ink-400 max-w-lg mx-auto">
            A curated showcase of products we've shipped for clients across industries.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PORTFOLIO.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`relative glass-light rounded-2xl p-1 overflow-hidden group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 p-8">
                  <div className="text-5xl mb-4">{project.img}</div>
                  <span className="text-xs font-medium text-brand-300 uppercase tracking-wider">{project.tag}</span>
                  <h3 className="font-display font-bold text-xl text-white mt-1 group-hover:text-brand-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm text-ink-400 group-hover:text-white transition-colors">
                    View case study <FaArrowRight className="text-xs" />
                  </div>
                </div>
                {/* Hover shimmer overlay */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <Section id="testimonials" className="!py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-black font-display mt-3">
            What Our <span className="text-gradient-brand">Clients</span> Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-light rounded-2xl p-7 flex flex-col justify-between h-full"
              >
                <div>
                  <FaQuoteLeft className="text-brand-400/40 text-3xl mb-4" />
                  <p className="text-ink-200 leading-relaxed mb-5 text-[15px]">{t.quote}</p>
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-violet-glow flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-ink-400 text-xs">{t.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-4 text-yellow-400 text-xs">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <FaStar key={s} />
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <Section id="contact" className="!py-24 md:!py-32">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="relative glass rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-violet-glow/10 to-accent-400/10" />
            <div className="glow-orb w-96 h-64 bg-brand-500/20 top-[-50px] left-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-display mb-4">
                Let&apos;s Build Something{' '}
                <span className="text-gradient">Amazing</span>
              </h2>
              <p className="text-ink-300 text-lg max-w-lg mx-auto mb-8">
                Tell us about your project. We&apos;ll get back to you within 24 hours with a proposal.
              </p>
              <a href="mailto:hello@tcongsinfotech.com" className="btn-primary text-lg px-8 py-4">
                Book Free Consultation <FaArrowRight className="text-sm" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-accent-400 flex items-center justify-center text-white font-bold text-xs font-display">
                TC
              </div>
              <span className="font-display font-bold text-white">Tcongs<span className="text-brand-400">.</span></span>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed mb-5">
              A premium digital agency crafting world-class web, mobile, and AI products for forward-thinking businesses.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaInstagram, href: '#' },
                { icon: FaLinkedin, href: '#' },
                { icon: FaTwitter, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-ink-300 hover:text-white hover:border-brand-400/30 transition-colors"
                  aria-label={s.href}
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-ink-400">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-ink-400">
              {SERVICES.map((s) => (
                <li key={s.title} className="hover:text-white transition-colors cursor-default">
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-ink-400">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-brand-400 mt-0.5 text-xs" />
                <span>123 Tech Park, HITEC City<br />Hyderabad, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-brand-400 text-xs" />
                <a href="mailto:hello@tcongsinfotech.com" className="hover:text-white transition-colors">hello@tcongsinfotech.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhone className="text-brand-400 text-xs" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-500 text-xs">
            &copy; {new Date().getFullYear()} Tcongs Infotech. All rights reserved.
          </p>
          <p className="text-ink-500 text-xs flex items-center gap-1">
            Designed & Built with <span className="text-red-400">♥</span> by Tcongs Team
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── SCROLL-TO-TOP ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 hover:bg-brand-400 transition-colors"
      aria-label="Scroll to top"
    >
      <FaChevronDown className="rotate-180 text-sm" />
    </motion.button>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <WhyChooseUs />
        <Process />
        <Portfolio />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
