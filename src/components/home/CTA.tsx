import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-[#0B0B0B] p-8 sm:p-12 lg:p-16 text-white border border-white/10 shadow-2xl"
        >
          {/* Subtle gold accent light */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-logo-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-logo-gold/10 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold mb-3 block">
                Get In Touch
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                Need Professional Investigation? Ensure It's in Safe Hands.
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Speak with our lead investigators today for a confidential, no-obligation case evaluation. Your privacy and safety are guaranteed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
              <a
                href="tel:+919632441604"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-logo-gold px-7 py-4 font-poppins text-xs font-bold uppercase tracking-[0.14em] text-[#0B0B0B] hover:bg-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg text-center"
              >
                <Phone className="w-4 h-4" />
                <span>+91 96324 41604</span>
              </a>
              <a
                href="mailto:spysense.info@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-poppins text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5 text-center"
              >
                <Mail className="w-4 h-4 text-logo-gold" />
                <span>Email Us</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
