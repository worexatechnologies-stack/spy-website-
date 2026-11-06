import { motion } from 'framer-motion';
import { Award, Lock, Scale, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Award, title: 'FSL Sign (Fake Signature)', desc: 'Forensic examination of signatures for legal, financial, and personal disputes.', slug: 'fsl-signature' },
  { icon: Lock, title: 'Company Background Check', desc: 'Corporate credibility, ownership, finances, and risk assessment.', slug: 'background-checking-for-companies' },
  { icon: Scale, title: 'Property Dispute Investigation', desc: 'Professional assistance and evidence gathering for property ownership disputes.', slug: 'investigation-of-property-disputes' },
  { icon: ShieldAlert, title: 'Connect for the Proof [Evidence]', desc: 'Professional evidence support and documentation for confident legal decisions.', slug: 'connect-for-the-proof-evidence' },
];

const highlights = [
  'Complete discretion on every case',
  'Verified facts, not assumptions',
  'Licensed & experienced investigators',
];

export default function AboutPreview() {
  return (
    <section className="bg-[#F8F9FA] py-20 md:py-28 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="mb-3">
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold">
                Who We Are
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0B0B0B]">
              About Our Agency
            </h2>
          </div>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 font-poppins text-xs font-bold uppercase tracking-wider text-black/60 hover:text-logo-gold transition-colors duration-300"
          >
            <span>Learn More About Us</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left: Image with principle card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]">
              <img
                src="/images/image7.jpg"
                alt="Spy Sense investigation office"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating principle card */}
            <div className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 md:left-auto md:right-4 md:w-80 rounded-2xl bg-[#0B0B0B] p-5 shadow-xl border border-white/10">
              <p className="font-poppins text-[10px] font-bold uppercase tracking-[0.2em] text-logo-gold mb-1.5">
                First Principle
              </p>
              <p className="font-display text-base font-semibold leading-snug text-white">
                Every decision is easier when the facts are verified.
              </p>
            </div>
          </motion.div>

          {/* Right: Copy & Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7 mt-6 lg:mt-0 flex flex-col justify-center"
          >
            <p className="text-black/65 text-base sm:text-lg leading-relaxed mb-4 font-body">
              At Spy Sense, knowledge begins with validated information. We observe, analyze, and investigate with care so the facts are separated from assumption.
            </p>
            <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-6 font-body">
              Whether you require our services for personal, matrimonial, or corporate reasons, we offer confidential and reliable services that enable you to proceed confidently.
            </p>

            {/* Checklist highlights */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 mb-8 pt-2 border-t border-black/8">
              {highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-xs sm:text-sm font-poppins font-semibold text-black/75">
                  <CheckCircle2 className="h-4 w-4 text-logo-gold shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* 2x2 Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {features.map((f, i) => (
                <Link
                  key={f.title}
                  to={`/services/${f.slug}`}
                  className="group block rounded-2xl border border-black/8 bg-white p-4.5 transition-all duration-300 hover:border-logo-gold/50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-logo-gold/10 group-hover:bg-[#0B0B0B] flex items-center justify-center shrink-0 transition-colors duration-300">
                      <f.icon className="w-5 h-5 text-[#0B0B0B] group-hover:text-logo-gold transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-poppins text-sm font-bold text-[#0B0B0B] group-hover:text-logo-gold transition-colors duration-300 leading-snug">
                        {f.title}
                      </h4>
                      <p className="text-xs text-black/50 mt-1 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
