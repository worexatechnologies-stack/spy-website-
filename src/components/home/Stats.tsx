import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import { Briefcase, Smile, UserCheck, Calendar } from 'lucide-react';

const stats = [
  { icon: Briefcase, end: 1000, suffix: '+', label: 'Cases Completed' },
  { icon: Smile, end: 500, suffix: '+', label: 'Happy Clients' },
  { icon: UserCheck, end: 50, suffix: '+', label: 'Expert Investigators' },
  { icon: Calendar, end: 15, suffix: '+', label: 'Years Experience' },
];

export default function Stats() {
  return (
    <section className="py-20 md:py-24 bg-[#0B0B0B] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-3">
            <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold">
              Our Track Record
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Numbers That Define Our Legacy
          </h2>
        </div>

        {/* 4 Equal Stats Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/4 p-6 sm:p-8 text-center backdrop-blur-xs transition-all duration-300 hover:border-logo-gold/40 hover:bg-white/8 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-logo-gold">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="font-poppins text-xs font-semibold uppercase tracking-wider text-white/55">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
