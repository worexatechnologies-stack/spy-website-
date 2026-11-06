import { ElementType, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, UserCheck, Eye, Search, ShieldAlert, Heart, Monitor, Scale,
  ArrowRight, ShieldCheck, Lock, Award, FileSearch,
  ChevronDown, Sparkles, Clock, Check, Layers
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CTA from '../components/home/CTA';
import { useApp } from '../context/AppContext';

const iconMap: Record<string, ElementType> = {
  Building2, UserCheck, Eye, Search, ShieldAlert, Heart, Monitor, Scale,
};

// Trust pillar highlights
const trustPillars = [
  {
    icon: Lock,
    title: '100% Confidentiality',
    description: 'Guaranteed non-disclosure protocols and encrypted communication channels protect your privacy at every stage.',
  },
  {
    icon: ShieldCheck,
    title: 'Court-Admissible Proof',
    description: 'Every dossier, forensic finding, and photographic record is collected following strict evidentiary standards.',
  },
  {
    icon: Award,
    title: 'Senior Intelligence Operatives',
    description: 'Handled exclusively by seasoned investigators with specialized forensic, corporate, and field backgrounds.',
  },
  {
    icon: Clock,
    title: 'Rapid Strategic Deployment',
    description: 'Time-critical case initiation with 24/7 covert operational readiness across pan-India jurisdictions.',
  },
];

// Investigation Workflow steps
const workflowSteps = [
  {
    step: '01',
    title: 'Confidential Briefing',
    description: 'Private discovery consultation to assess case parameters, legal scope, and specific intelligence objectives.',
  },
  {
    step: '02',
    title: 'Recon & Strategy',
    description: 'Designing tailored covert surveillance routes, forensic analysis schedules, and background verification mapping.',
  },
  {
    step: '03',
    title: 'Discreet Execution',
    description: 'Deploying high-tech surveillance, forensic laboratory analysis, and verifiable fact-checking in real time.',
  },
  {
    step: '04',
    title: 'Certified Dossier',
    description: 'Delivery of comprehensive, tamper-proof documentation with court-admissible evidence and clear actionable insights.',
  },
];

// Frequently Asked Questions
const faqs = [
  {
    question: 'How do you guarantee client confidentiality and privacy?',
    answer: 'Confidentiality is our cornerstone. All consultations, case files, and client interactions are strictly bound by non-disclosure agreements (NDAs) and stored in encrypted digital environments. Identity protection protocols ensure your involvement is never compromised.',
  },
  {
    question: 'Are the investigation reports and evidence admissible in court?',
    answer: 'Yes. Our forensic experts and field operatives operate strictly within legal guidelines. Photographic evidence, forensic document analysis, and detailed timelines are compiled following standard chain-of-custody protocols for legal and judicial proceedings.',
  },
  {
    question: 'How long does a typical private or corporate investigation take?',
    answer: 'Timelines vary based on complexity. Standard background verifications and signature forensic analyses typically take 3 to 7 business days, while ongoing surveillance or complex asset dispute cases are customized to the required observation window.',
  },
  {
    question: 'How do I receive updates during an ongoing investigation?',
    answer: 'You will be assigned a dedicated Lead Investigator who provides secure, scheduled status briefings via your preferred encrypted communication channel (Signal, encrypted email, or secure in-person meeting).',
  },
];

export default function Services() {
  const { services } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formatTitle = (title: string) => {
    return title.replace(/\[.*?\]/g, '').trim();
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(services.map((s) => s.category)));
    return ['all', ...cats];
  }, [services]);

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return services;
    return services.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());
  }, [services, activeCategory]);

  return (
    <>
      <head>
        <title id="metaTitle">Private Investigation Services | Expert Corporate & Personal Cases</title>
        <meta name="description" id="metaDescription" content="Hire SpySense for professional private investigation services. We provide background checks, asset tracing, and fraud discovery. Contact our experts today."/>
        <meta name="keywords" id="metaKeywords" content="private investigation services, private detective services, detective services near me, employment criminal background check, trusted detective agency near me, private detective in bangalore, affordable detective agency, trusted private detectives"/>
        <meta id="ogTitle" property="og:title" content="Private Investigation Services | Expert Corporate & Personal Cases"/>
        <meta id="ogType" property="og:type" content="website"/>
        <meta id="ogDescription" property="og:description" content="Hire SpySense for professional private investigation services. We provide background checks, asset tracing, and fraud discovery. Contact our experts today."/>
        <meta id="ogUrl" property="og:url" content="https://spysense.in/services"/>
        <meta id="ogSiteName" property="og:site_name" content="Private Investigation Services | Expert Corporate & Personal Cases"/>
        <meta id="ogImage" property="og:image" content="https://spysense.in/images/spy-sense-logo2.png"/>
        <meta id="twitterSite" name="twitter:site" content="https://twitter.com/"/>
        <meta id="twitterTitle" name="twitter:title" content="Private Investigation Services | Expert Corporate & Personal Cases"/>
        <meta id="twitterDescription" name="twitter:description" content="Hire SpySense for professional private investigation services. We provide background checks, asset tracing, and fraud discovery. Contact our experts today."/>
        <meta id="author" name="author" content="Akshay"/>
        <link id="canonical" rel="canonical" href="https://spysense.in/services"/>
        <meta id="indexingStatus" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
        <meta id="Publisher" property="publisher" content="Worexa Technologies"/>
        <meta property="og:locale" content="en_US"/>
      </head>

      <PageHero
        title="Our Investigation Services"
        subtitle="Forensic-grade accuracy, unmatched field intelligence, and absolute confidentiality tailored to safeguard your corporate and personal interests."
        breadcrumb="Home / Services"
      />

      {/* Main Services Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#F8F9FA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-black/8 pb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-logo-gold/15 border border-logo-gold/30 text-[#0B0B0B] text-xs font-poppins font-bold uppercase tracking-[0.2em] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-logo-gold shrink-0" />
                <span>Elite Intelligence Solutions</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B] tracking-tight leading-tight">
                Discreet, Verified & Actionable Evidence
              </h2>
              <p className="text-black/60 text-sm sm:text-base mt-3 leading-relaxed font-body">
                Whether protecting organizational integrity or uncovering personal clarity, our certified specialists deploy precise methodology to deliver unquestionable proof.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-poppins font-semibold uppercase tracking-wider transition-all duration-300 capitalize cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-[#0B0B0B] text-logo-gold shadow-sm'
                      : 'bg-white text-black/60 hover:text-black border border-black/8 hover:border-black/20'
                  }`}
                >
                  {cat === 'all' ? (
                    <>
                      <Layers className="w-3.5 h-3.5 text-logo-gold shrink-0" />
                      <span>All Services ({services.length})</span>
                    </>
                  ) : (
                    cat
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid — Unique, Simple & Minimal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, i) => {
                const Icon = iconMap[service.icon] || Search;
                const formattedTitle = formatTitle(service.title);
                const displayIndex = String(i + 1).padStart(2, '0');

                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="group flex flex-col justify-between bg-white rounded-3xl p-5 sm:p-6 border border-black/8 hover:border-black/20 shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                  >
                    <div>
                      {/* Top: Elegant Framed Case Image */}
                      <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-[#0B0B0B] mb-5">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={formattedTitle}
                            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out brightness-95"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#0B0B0B] to-[#2B1E16] flex items-center justify-center">
                            <Icon className="w-16 h-16 text-logo-gold/30" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                        {/* Minimal Corner Badges */}
                        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                          <span className="bg-black/60 text-white/90 text-[10px] font-poppins font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                            {service.category}
                          </span>
                          <span className="font-poppins text-xs font-bold text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                            #{displayIndex}
                          </span>
                        </div>
                      </div>

                      {/* Header & Title */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B0B0B] group-hover:text-logo-gold transition-colors duration-300 leading-snug">
                          <Link to={`/services/${service.slug}`}>
                            {formattedTitle}
                          </Link>
                        </h3>
                        <div className="w-10 h-10 rounded-xl bg-black/4 border border-black/6 flex items-center justify-center shrink-0 text-[#0B0B0B] group-hover:bg-[#0B0B0B] group-hover:text-logo-gold group-hover:border-transparent transition-colors duration-300">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-black/60 font-body text-xs sm:text-sm leading-relaxed mb-5">
                        {service.shortDescription}
                      </p>

                      {/* Minimal Investigation Scope */}
                      <div className="pt-4 border-t border-black/6 mb-6">
                        <span className="text-[10px] font-poppins font-bold uppercase tracking-[0.2em] text-black/40 mb-3 block">
                          Investigation Scope
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.slice(0, 4).map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-xs font-poppins text-black/75">
                              <span className="w-1.5 h-1.5 rounded-full bg-logo-gold shrink-0" />
                              <span className="truncate">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-black/6 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-poppins text-black/45">
                        <Lock className="w-3.5 h-3.5 text-logo-gold shrink-0" />
                        <span>100% Confidential</span>
                      </div>

                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-poppins font-bold uppercase tracking-wider text-[#0B0B0B] group-hover:text-logo-gold transition-colors"
                      >
                        <span>Explore Details</span>
                        <div className="w-7 h-7 rounded-full bg-black/5 group-hover:bg-[#0B0B0B] group-hover:text-white flex items-center justify-center transition-all">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trust & Methodology Pillars Section */}
      <section className="py-20 md:py-24 bg-[#0B0B0B] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            tag="Our Standards"
            title="The SpySense Standard of Excellence"
            description="Our methodologies combine rigorous forensic sciences, strict compliance protocols, and discrete operational discipline."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {trustPillars.map((pillar, i) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-white/4 p-6 sm:p-7 backdrop-blur-xs hover:border-logo-gold/40 hover:bg-white/8 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-logo-gold flex items-center justify-center mb-5">
                    <PillarIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-body">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investigation Process Step-by-Step */}
      <section className="py-20 md:py-28 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Proven Methodology"
            title="How We Execute Every Case"
            description="From initial discovery to final evidence handover, our structured lifecycle ensures every detail is verifiable and confidential."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-[#F8F9FA] border border-black/8 rounded-2xl p-7 hover:border-logo-gold/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-bold font-display text-logo-gold mb-3 flex items-center justify-between">
                    <span>{step.step}</span>
                    <div className="w-2 h-2 rounded-full bg-logo-gold" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0B0B0B] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-black/60 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-[#F8F9FA] border-t border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold mb-2 block">
              Clear Answers
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#0B0B0B]">
              Frequently Asked Questions
            </h2>
            <p className="text-black/60 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Got questions about confidentiality, legality, or timelines? Here is how we operate.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-black/8 overflow-hidden shadow-2xs transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-poppins text-sm sm:text-base font-semibold text-[#0B0B0B] hover:text-logo-gold transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-logo-gold shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-black/65 font-body text-xs sm:text-sm leading-relaxed border-t border-black/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
