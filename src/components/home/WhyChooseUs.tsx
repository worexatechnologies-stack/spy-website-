import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Search, FileText, Eye, BadgeCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const reasons = [
  { icon: Lock, title: 'Confidential & Professional', desc: 'Every engagement is handled with discretion, professionalism, and absolute respect for privacy.' },
  { icon: ShieldCheck, title: 'Fact-Based Verification', desc: 'We rely on verified information, careful review, and credible evidence — never assumptions.' },
  { icon: Search, title: 'Strategic Analysis', desc: 'We interpret findings with clarity, logic, and a seasoned investigative intelligence mindset.' },
  { icon: FileText, title: 'Reliable Process', desc: 'Our approach is structured, consistent, and focused on delivering dependable outcomes every time.' },
  { icon: Eye, title: 'Total Privacy Guarantee', desc: 'Your identity and case materials are protected under strict non-disclosure safeguards.' },
  { icon: BadgeCheck, title: 'Accurate Reports', desc: 'We provide precise, documented dossiers that support sound legal decisions and confident action.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-[#F8F9FA] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="mb-3">
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold">
                Why Choose Us
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0B0B0B]">
              Because Trust Deserves Proof
            </h2>
            <p className="mt-3 text-black/60 text-sm sm:text-base leading-relaxed">
              We deliver clarity, confidence, and court-grade evidence through professional verification and intelligence support.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2 font-poppins text-xs font-bold uppercase tracking-wider text-black/60 hover:text-logo-gold transition-colors duration-300"
          >
            <span>Start A Consultation</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-7 transition-all duration-300 hover:border-logo-gold/40 hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-black/4 border border-black/6 text-[#0B0B0B] group-hover:bg-[#0B0B0B] group-hover:text-logo-gold group-hover:border-transparent transition-colors duration-300">
                  <reason.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#0B0B0B] mb-2 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-black/55 text-xs sm:text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Pledge Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#0B0B0B] p-8 sm:p-10 lg:p-12 text-white border border-white/10 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold mb-2 block">
                Our Solemn Pledge
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                Are You Ready to Get the Proof You Need?
              </h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                We understand the weight of each decision you must make. That is why we pledge to provide verified insights rooted in accuracy, confidentiality, and professional integrity. We don't just supply information — we give you indisputable proof.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-logo-gold px-8 py-4 font-poppins text-xs font-bold uppercase tracking-[0.16em] text-[#0B0B0B] hover:bg-white transition-all duration-300 hover:-translate-y-0.5 shadow-md"
            >
              <span>Connect For The Proof</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
