import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Articles', path: '/articles' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Top contact strip (globedetective.com style) ── */}
      <div className="hidden lg:block bg-[#0B0B0B] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-[11px] font-poppins">
          <div className="flex items-center gap-2 text-white/60">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Confidential Private Investigation & Intelligence Agency</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+919632441604"
              className="flex items-center gap-1.5 text-white/70 hover:text-logo-gold transition-colors font-medium"
            >
              <Phone className="h-3 w-3 text-logo-gold" />
              <span>+91 96324 41604</span>
            </a>
            <span className="h-3 w-px bg-white/20" />
            <a
              href="mailto:spysense.info@gmail.com"
              className="flex items-center gap-1.5 text-white/70 hover:text-logo-gold transition-colors font-medium"
            >
              <Mail className="h-3 w-3 text-logo-gold" />
              <span>spysense.info@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border-b border-black/8 py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-black/5 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src="/images/spy-sense-logo2.png"
              alt="SPY SENSE logo"
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* NAVIGATION LINKS */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative rounded-full px-4 py-2 font-poppins text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive
                      ? 'text-logo-gold'
                      : 'text-jet/70 hover:text-jet'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>

                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="hoverBackground"
                      className="absolute inset-0 -z-0 rounded-full bg-black/5"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}

                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-logo-gold"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919632441604"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 font-poppins text-xs font-semibold text-jet hover:border-logo-gold hover:text-logo-gold transition-all duration-300 shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-logo-gold" />
              <span>Call Us</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#0B0B0B] px-5 py-2 font-poppins text-xs font-bold uppercase tracking-wider text-white hover:bg-logo-gold hover:text-[#0B0B0B] transition-all duration-300 shadow-sm"
            >
              <span>Consult Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl border border-black/10 bg-white/80 p-2 text-jet backdrop-blur lg:hidden hover:border-logo-gold hover:bg-logo-gold/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-black/8 bg-white/98 shadow-xl backdrop-blur-2xl lg:hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-5 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 font-poppins text-sm font-semibold tracking-wide transition-colors ${
                      location.pathname === link.path
                        ? 'bg-[#0B0B0B] text-logo-gold'
                        : 'text-jet/70 hover:bg-black/5 hover:text-jet'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4 mt-2 border-t border-black/8 space-y-2">
                  <a
                    href="tel:+919632441604"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/4 text-sm font-poppins font-medium text-jet hover:bg-logo-gold/15"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-logo-gold/20 text-logo-gold">
                      <Phone className="h-3.5 w-3.5" />
                    </span>
                    <span>+91 96324 41604</span>
                  </a>
                  <a
                    href="mailto:spysense.info@gmail.com"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/4 text-sm font-poppins font-medium text-jet hover:bg-logo-gold/15"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-logo-gold/20 text-logo-gold">
                      <Mail className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs">spysense.info@gmail.com</span>
                  </a>
                  <div className="pt-2">
                    <Link
                      to="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B0B0B] px-5 py-3 font-poppins text-xs font-bold uppercase tracking-wider text-logo-gold shadow-md"
                    >
                      <span>Book Confidential Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
