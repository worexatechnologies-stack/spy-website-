import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, ShieldCheck, Eye, Search, Lock, BadgeCheck, Star } from 'lucide-react';

/* ─── static data ─────────────────────────────────────── */
const services = [
  { icon: Eye, label: 'Surveillance' },
  { icon: Search, label: 'Background Checks' },
  { icon: Lock, label: 'Cyber Investigation' },
  { icon: ShieldCheck, label: 'Matrimonial Cases' },
];

/* ─── component ───────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-[#0B0B0B] pt-28 lg:pt-36 pb-16 lg:pb-24">

      {/* Subtle background decoration */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0B0B0B 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] bg-logo-gold/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/3 rounded-full blur-2xl" />

      {/* ── Main Container (Perfect max-w-7xl alignment with all other sections) ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ════════ LEFT COLUMN — TEXT (Order 2 on mobile, Order 1 on desktop) ════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">

            {/* Gold label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-4"
            >
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold">
                Professional Detective Agency
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 font-display text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#0B0B0B]"
            >
              Beyond{' '}
              <span className="italic font-normal font-serif text-[#2B1E16]">assumptions.</span>{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#0B0B0B]">Beyond doubt.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.55, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-logo-gold"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-black/60 font-body"
            >
              Every decision requires more than just faith; it requires verification. Our agency offers background verification, information gathering, and investigation services in total secrecy and accuracy. Because the truth lies in the details.
            </motion.p>

            {/* Service badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mb-8 flex flex-wrap gap-2.5"
            >
              {services.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group flex cursor-default items-center gap-2 rounded-lg border border-black/8 bg-black/3 px-3.5 py-1.5 transition-all duration-300 hover:border-logo-gold hover:bg-[#0B0B0B]"
                >
                  <Icon className="h-3.5 w-3.5 text-logo-gold shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-poppins text-[11px] font-semibold uppercase tracking-wider text-black/70 group-hover:text-white transition-colors duration-300">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#0B0B0B] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0B0B0B]">
                  Start Investigation
                </span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0B0B0B]" />
                <span className="absolute inset-0 -translate-x-full bg-logo-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
              </Link>
              <a
                href="tel:+919632441604"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-black/15 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-logo-gold hover:bg-logo-gold/8 shadow-2xs"
              >
                <Phone className="h-4 w-4 text-logo-gold" />
                <span>Call Now</span>
              </a>
            </motion.div>
          </div>

          {/* ════════ RIGHT COLUMN — IMAGE (Order 1 on mobile, Order 2 on desktop) ════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-md lg:max-w-none">

              {/* Main image container */}
              <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#F4F4F4] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)]">
                <img
                  src="/images/hero.jpg"
                  alt="Professional detective in trench coat"
                  className="w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5] object-cover object-top filter contrast-[1.02] hover:scale-102 transition-transform duration-700"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:from-black/40" />

                {/* Floating badge — Top right */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-xl border border-white/40 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-logo-gold text-white">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-poppins text-[9px] font-bold uppercase tracking-wider text-black/50">Verified</p>
                    <p className="font-poppins text-xs font-bold text-black">100% Confidential</p>
                  </div>
                </div>

                {/* Floating badge — Bottom left */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 rounded-xl border border-white/40 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-md">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-logo-gold text-logo-gold" />
                    ))}
                  </div>
                  <span className="font-poppins text-xs font-bold text-black">Trusted by 500+ Clients</span>
                </div>
              </div>

              {/* Decorative accent behind */}
              <div className="absolute -bottom-3 -right-3 -z-10 w-full h-full rounded-3xl border border-logo-gold/30 bg-logo-gold/5 hidden sm:block" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
