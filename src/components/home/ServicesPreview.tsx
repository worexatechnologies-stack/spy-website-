import { motion } from 'framer-motion';
import { ArrowRight, Eye, FileText, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Observation',
    description: 'Every process begins with a very thorough observation of all available intelligence and situational parameters.',
    icon: Eye,
  },
  {
    num: '02',
    title: 'Analysis',
    description: 'Our analysis of the facts is a structured strategy to uncover crucial insights and connect disparate clues.',
    icon: Search,
  },
  {
    num: '03',
    title: 'Verification',
    description: 'All facts are independently verified through professional, forensic-level methods and strict protocols.',
    icon: ShieldCheck,
  },
  {
    num: '04',
    title: 'Reporting',
    description: 'We deliver comprehensive, court-ready dossiers and reports with complete confidentiality and precision.',
    icon: FileText,
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="mb-3">
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold">
                How We Operate
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0B0B0B]">
              Our Proven Methodology
            </h2>
            <p className="mt-3 text-black/60 text-sm sm:text-base leading-relaxed">
              Every case is handled through rigorous observation, strategic analysis, professional verification, and confidential reporting.
            </p>
          </div>
          <Link
            to="/services"
            className="group inline-flex shrink-0 items-center gap-2 font-poppins text-xs font-bold uppercase tracking-wider text-black/60 hover:text-logo-gold transition-colors duration-300"
          >
            <span>Explore All Services</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Column Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-black/8 bg-[#F8F9FA] p-7 transition-all duration-300 hover:border-logo-gold/40 hover:bg-white hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  {/* Top row: Icon & Number watermark */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-black/8 shadow-2xs group-hover:bg-[#0B0B0B] group-hover:border-transparent transition-colors duration-300">
                      <Icon className="h-5 w-5 text-[#0B0B0B] group-hover:text-logo-gold transition-colors duration-300" />
                    </div>
                    <span className="font-display text-3xl font-bold text-black/15 group-hover:text-logo-gold/30 transition-colors duration-300">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#0B0B0B] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-black/55 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-poppins font-semibold uppercase tracking-wider text-black/40 group-hover:text-logo-gold transition-colors">
                  <span>Step {step.num}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
