import { motion } from 'framer-motion';
import { Target, Eye, Award, Shield, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CTA from '../components/home/CTA';

export default function About() {
  return (
    <>
      <head>
        <title id="metaTitle">About Our Private Investigation Agency | Meet Our Expert Team</title>
        <meta name="description" id="metaDescription" content="Read about our private investigation agency. Our licensed, experienced investigators deliver the truth with complete confidentiality. Contact us today"/>
        <meta name="keywords" id="metaKeywords" content="about our private investigation agency, professional detectives, detective services near me, confidential investigation services, experienced private investigators, trusted investigation company, background verification experts"/>
        <meta id="ogTitle" property="og:title" content="About Our Private Investigation Agency | Meet Our Expert Team"/>
        <meta id="ogType" property="og:type" content="website"/>
        <meta id="ogDescription" property="og:description" content="Read about our private investigation agency. Our licensed, experienced investigators deliver the truth with complete confidentiality. Contact us today"/>
        <meta id="ogUrl" property="og:url" content="https://spysense.in/about"/>
        <meta id="ogSiteName" property="og:site_name" content="About Our Private Investigation Agency | Meet Our Expert Team"/>
        <meta id="ogImage" property="og:image" content="https://spysense.in/images/spy-sense-logo2.png"/>
        <meta id="twitterSite" name="twitter:site" content="https://twitter.com/"/>
        <meta id="twitterTitle" name="twitter:title" content="About Our Private Investigation Agency | Meet Our Expert Team"/>
        <meta id="twitterDescription" name="twitter:description" content="Read about our private investigation agency. Our licensed, experienced investigators deliver the truth with complete confidentiality. Contact us today"/>
        <meta id="author" name="author" content="Akshay"/>
        <link id="canonical" rel="canonical" href="https://spysense.in/about"/>
        <meta id="indexingStatus" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
        <meta id="Publisher" property="publisher" content="Worexa Technologies"/>
        <meta property="og:locale" content="en_US"/>
      </head>

      <PageHero
        title="About Our Agency"
        subtitle="Decades of investigative excellence built on trust, integrity, and an unwavering commitment to the truth."
        breadcrumb="Home / About"
      />

      {/* ── Company Story ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-6"
            >
              <div className="mb-3">
                <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold">
                  About Spy Sense
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B] leading-tight mb-6">
                Uncovering the Truth. Offering Confidence.
              </h2>
              <div className="space-y-4 text-black/65 text-base sm:text-lg leading-relaxed font-body">
                <p>
                  At Spy Sense, we believe all crucial decisions should be backed not merely by suppositions or faith, but by verified insights, professional intelligence, and concrete evidence.
                </p>
                <p>
                  We provide a complete suite of verification, intelligence gathering, and forensic services built upon integrity, total confidentiality, and meticulous accuracy.
                </p>
                <p>
                  Trust is earned through transparency and rigorous verification. Our operational philosophy combines detailed field observation, strategic analysis, independent fact-checking, and flawless execution.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#F4F4F4] shadow-xl">
                <img
                  src="/images/about.jpg"
                  alt="Spy Sense investigation office"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 -z-10 w-full h-full rounded-3xl border border-logo-gold/30 bg-logo-gold/5 hidden sm:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-20 md:py-28 bg-[#F8F9FA] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="How We Work"
            title="Our Process"
            description="Every task receives dedicated attention to detail, complete confidentiality, and certified investigative accuracy."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: 'Observe',
                text: 'We examine all situational details with precision, uncovering evidence that others frequently overlook.',
              },
              {
                title: 'Analyze',
                text: 'We critically analyze information, cross-referencing records with proven analytical and investigative frameworks.',
              },
              {
                title: 'Verify',
                text: 'We independently authenticate every factual claim and document through verified, court-grade methods.',
              },
              {
                title: 'Deliver',
                text: 'We deliver comprehensive, legally defensible reports with complete confidentiality and speed.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-7 shadow-2xs hover:border-logo-gold/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-logo-gold/15 group-hover:bg-[#0B0B0B] group-hover:text-logo-gold transition-colors duration-300 mb-5 font-poppins text-sm font-bold text-jet">
                    0{index + 1}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0B0B0B] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-black/60 text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Us Strip */}
          <div className="mt-14 rounded-3xl bg-[#0B0B0B] border border-white/10 p-8 sm:p-10 lg:p-12 text-white shadow-xl">
            <div className="max-w-2xl mb-8">
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold mb-2 block">
                Guaranteed Standards
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                Why Clients Count on Spy Sense
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Total Privacy & Encrypted Records',
                'Proper, Ethical & Licensed Conduct',
                'Fact-Based, Irrefutable Proof',
                'Strategic Analysis & Key Insights',
                'Reliable, Court-Ready Reporting',
                'Decades of Investigative Excellence',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white/85 text-sm font-poppins font-medium">
                  <CheckCircle2 className="h-4 w-4 text-logo-gold shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 md:py-28 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Purpose & Values"
            title="Mission & Vision"
            description="Guided by steadfast principles that safeguard our clients' interests and guarantee absolute discretion."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-black/8 bg-[#F8F9FA] p-8 sm:p-10 shadow-2xs hover:border-logo-gold/40 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B0B0B] text-logo-gold mb-6 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0B0B0B] mb-3">
                Our Mission
              </h3>
              <p className="text-black/65 text-base leading-relaxed">
                Provide individuals and corporations with accurate, reliable, and strictly confidential intelligence that enables decisions based firmly on truth. Spy Sense is not merely about collecting facts; it is about providing the definitive proof you need to make your next move with clarity and confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl border border-black/8 bg-[#F8F9FA] p-8 sm:p-10 shadow-2xs hover:border-logo-gold/40 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B0B0B] text-logo-gold mb-6 shadow-sm">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0B0B0B] mb-3">
                Our Vision
              </h3>
              <p className="text-black/65 text-base leading-relaxed">
                To stand as the benchmark in the verification and intelligence industry by delivering clarity, certainty, and peace of mind through verifiable data, rigorous ethics, and seasoned operational acumen. Spy Sense — Connect for the Proof.
              </p>
            </motion.div>
          </div>

          {/* 4 Core Values */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14 pt-12 border-t border-black/8">
            {[
              { icon: Shield, title: 'Integrity', desc: 'Ethical conduct in every engagement' },
              { icon: Award, title: 'Excellence', desc: 'Highest standards of professional service' },
              { icon: Eye, title: 'Discretion', desc: 'Absolute confidentiality guaranteed' },
              { icon: Target, title: 'Results', desc: 'Actionable intelligence you can trust' },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-logo-gold/15 text-[#0B0B0B] mx-auto mb-3.5">
                  <v.icon className="w-5 h-5" />
                </div>
                <h4 className="font-poppins font-bold text-[#0B0B0B] text-base mb-1">
                  {v.title}
                </h4>
                <p className="text-xs sm:text-sm text-black/55 font-body">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
