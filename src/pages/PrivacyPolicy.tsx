import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Share2, FileText, Phone, Mail, MapPin, ChevronRight, Info } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import { useState } from 'react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    {
      id: 'intro',
      label: 'Your Privacy Matters',
      icon: ShieldCheck,
    },
    {
      id: 'information-collected',
      label: 'Information You Share',
      icon: Eye,
    },
    {
      id: 'why-collected',
      label: 'Why We Collect It',
      icon: FileText,
    },
    {
      id: 'data-security',
      label: 'Security & Confidentiality',
      icon: Lock,
    },
    {
      id: 'sharing-information',
      label: 'Sharing Practices',
      icon: Share2,
    },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // accounting for sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
    <head>
   <title id="metaTitle">SpySense Privacy Policy | Your Data Security & Privacy Commitment</title>
   <meta name="description" id="metaDescription" content="Read the official SpySense privacy policy to learn how we protect your information. Understand our strict confidentiality standards and secure data handling."/>
   <meta name="keywords" id="metaKeywords" content="spysense privacy policy, detective privacy policy, how detective agencies protect client information, client privacy protection, data protection for detective agency clients"/>
   <meta id="ogTitle" property="og:title" content="SpySense Privacy Policy | Your Data Security & Privacy Commitment"/>
   <meta id="ogType" property="og:type" content="website"/>
   <meta id="ogDescription" property="og:description" content="Read the official SpySense privacy policy to learn how we protect your information. Understand our strict confidentiality standards and secure data handling."/>
   <meta id="ogUrl" property="og:url" content="https://spysense.in/privacy-policy"/>
   <meta id="ogSiteName" property="og:site_name" content="SpySense Privacy Policy | Your Data Security & Privacy Commitment"/>
   <meta id="ogImage" property="og:image" content="https://spysense.in/images/spy-sense-logo2.png"/>
   <meta id="twitterSite" name="twitter:site" content="https://twitter.com/"/>
   <meta id="twitterTitle" name="twitter:title" content="SpySense Privacy Policy | Your Data Security & Privacy Commitment"/>
   <meta id="twitterDescription" name="twitter:description" content="Read the official SpySense privacy policy to learn how we protect your information. Understand our strict confidentiality standards and secure data handling."/>
   <meta id="author" name="author" content="Akshay"/>
   <link id="canonical" rel="canonical" href="https://spysense.in/privacy-policy"/>
   <meta id="indexingStatus" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
   <meta id="Publisher" property="publisher" content="Worexa Technologies"/>
   <meta property="og:locale" content="en_US"/>
</head>
      <PageHero
        title="Privacy Policy"
        subtitle="Your privacy is the absolute foundation of every investigation. Learn how we protect and manage your personal data."
      />

      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
            
            {/* Desktop Sticky Navigation Sidebar */}
            <aside className="hidden lg:block sticky top-32 bg-white rounded-2xl p-6 shadow-sm ring-1 ring-primary/5">
              <h3 className="font-display text-lg font-bold text-jet mb-4 pb-3 border-b border-primary/5">
                On This Page
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left font-poppins text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        isActive
                          ? 'bg-logo-black text-logo-gold shadow-sm'
                          : 'text-jet/60 hover:bg-logo-gold/10 hover:text-jet'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-logo-gold" />
                        {section.label}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'rotate-90 text-logo-gold' : 'text-jet/30'}`} />
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content Area */}
            <div className="space-y-12">
              
              {/* Section 1: Intro / Your Privacy Matters */}
              <motion.div
                id="intro"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onViewportEnter={() => setActiveSection('intro')}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-sm ring-1 ring-primary/5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-logo-gold" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-logo-gold/10 flex items-center justify-center text-logo-gold shrink-0">
                    <ShieldCheck className="w-6 h-6 animate-pulse" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-jet">
                    Your Privacy Matters
                  </h2>
                </div>
                <p className="text-jet/70 font-body leading-relaxed text-base md:text-lg mb-6">
                  We understand that privacy is the foundation of every investigation. This Privacy Policy explains how we collect, use, protect, and manage the personal information you provide while using our website or requesting our services.
                </p>
                <p className="text-jet/70 font-body leading-relaxed text-base md:text-lg">
                  By accessing our website or contacting us, you agree to the practices described in this Privacy Policy.
                </p>
              </motion.div>

              {/* Section 2: Information You Share With Us */}
              <motion.div
                id="information-collected"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onViewportEnter={() => setActiveSection('information-collected')}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-sm ring-1 ring-primary/5"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-logo-gold/10 flex items-center justify-center text-logo-gold shrink-0">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-jet">
                    Information You Share With Us
                  </h2>
                </div>
                <p className="text-jet/70 font-body leading-relaxed text-base md:text-lg mb-8">
                  When you interact with our website, we may receive details such as:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Your full name',
                    'Email address',
                    'Mobile number',
                    'City or location',
                    'Information submitted through enquiry or contact forms',
                    'Any documents or details voluntarily shared for investigation purposes.'
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F6F2]/50 hover:bg-[#F8F6F2] transition-colors duration-300"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-logo-gold text-logo-black text-[10px] font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-jet/80 font-body text-sm md:text-base font-medium">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Section 3: Why We Collect Your Information */}
              <motion.div
                id="why-collected"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onViewportEnter={() => setActiveSection('why-collected')}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-sm ring-1 ring-primary/5"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-logo-gold/10 flex items-center justify-center text-logo-gold shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-jet">
                    Why We Collect Your Information
                  </h2>
                </div>
                
                <p className="text-jet/70 font-body leading-relaxed text-base md:text-lg mb-8">
                  The information collected helps us to:
                </p>

                <div className="space-y-4">
                  {[
                    'Respond to your enquiries and consultation requests',
                    'Understand your investigation requirements',
                    'Provide suitable investigation services',
                    'Maintain communication throughout the service process',
                    'Improve our website, services, and customer experience',
                    'Meet legal, regulatory, or compliance obligations where required'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-logo-gold/12 flex items-center justify-center text-logo-gold shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-logo-gold" />
                      </div>
                      <p className="text-jet/80 font-body leading-relaxed text-sm md:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3 p-4 rounded-xl bg-logo-gold/5 border border-logo-gold/10">
                  <Info className="w-5 h-5 text-logo-gold shrink-0" />
                  <p className="text-jet/80 font-body text-xs md:text-sm font-medium">
                    We collect only the information necessary to deliver our services efficiently.
                  </p>
                </div>
              </motion.div>

              {/* Section 4: Data Security and Confidentiality */}
              <motion.div
                id="data-security"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onViewportEnter={() => setActiveSection('data-security')}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-sm ring-1 ring-primary/5 relative overflow-hidden"
              >
                <div className="absolute -right-16 -top-16 opacity-5 pointer-events-none transform rotate-12">
                  <Lock className="w-64 h-64 text-logo-black" />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-logo-gold/10 flex items-center justify-center text-logo-gold shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-jet">
                    Data Security and Confidentiality
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-jet/70 font-body leading-relaxed text-base md:text-lg font-semibold text-logo-gold">
                    Protecting your information is one of our highest priorities.
                  </p>
                  
                  <p className="text-jet/70 font-body leading-relaxed text-sm md:text-base">
                    We use appropriate administrative, technical, and security measures to safeguard your personal data from unauthorized access, misuse, alteration, or disclosure. Every investigation is handled with strict confidentiality, and access to client information is limited only to authorized personnel.
                  </p>

                  <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/40 text-amber-900/80 text-xs md:text-sm font-body leading-relaxed">
                    <strong>Disclaimer:</strong> Although we follow industry-standard security practices, no method of online transmission or electronic storage can guarantee absolute security.
                  </div>
                </div>
              </motion.div>

              {/* Section 5: Sharing of Information */}
              <motion.div
                id="sharing-information"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onViewportEnter={() => setActiveSection('sharing-information')}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-sm ring-1 ring-primary/5"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-logo-gold/10 flex items-center justify-center text-logo-gold shrink-0">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-jet">
                    Sharing of Information
                  </h2>
                </div>

                <p className="text-jet/70 font-body leading-relaxed text-base md:text-lg mb-8 font-semibold text-[#B22222]">
                  Your personal information is never sold, rented, or traded to third parties.
                </p>

                <p className="text-jet/70 font-body leading-relaxed text-sm md:text-base mb-6">
                  Information may be shared only when:
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'It is necessary to provide the requested services.',
                    'Disclosure is required by applicable law or legal authorities.',
                    'It is needed to protect our legal rights or comply with legal obligations.'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-logo-gold/12 flex items-center justify-center text-logo-gold shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      </div>
                      <p className="text-jet/80 font-body leading-relaxed text-sm md:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-jet/50 font-body text-xs italic">
                  All information shared under such circumstances is limited to what is reasonably required.
                </p>
              </motion.div>

              {/* Secure Footer Contact Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-logo-black text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
              >
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
                  <ShieldCheck className="w-96 h-96" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-6">
                    Confidential Contact & Queries
                  </h3>
                  <p className="text-white/70 font-body leading-relaxed mb-8 max-w-2xl text-sm md:text-base">
                    If you have any questions or concerns regarding this Privacy Policy, or if you wish to query about our data preservation practices, please connect with our compliance office:
                  </p>

                  <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                    <a
                      href="mailto:spysense.info@gmail.com"
                      className="group flex flex-col gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-logo-gold">
                        <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span className="font-poppins text-xs font-bold uppercase tracking-wider">Email</span>
                      </div>
                      <span className="text-white/80 group-hover:text-white transition-colors text-sm font-medium">
                        spysense.info@gmail.com
                      </span>
                    </a>

                    <a
                      href="tel:+919632441604"
                      className="group flex flex-col gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-logo-gold">
                        <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span className="font-poppins text-xs font-bold uppercase tracking-wider">Phone</span>
                      </div>
                      <span className="text-white/80 group-hover:text-white transition-colors text-sm font-medium">
                        +91 96324 41604
                      </span>
                    </a>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-logo-gold">
                        <MapPin className="w-5 h-5" />
                        <span className="font-poppins text-xs font-bold uppercase tracking-wider">Address</span>
                      </div>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=No.+18%2FB%2C+4th+Main%2C+Govindarajanagar%2C+Agrahara+Dasarahalli%2C+Basaveshwaranagar+Post%2C+Bangalore%2C+Karnataka+560079"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white transition-colors text-sm leading-relaxed"
                      >
                        No. 18/B, 4th Main, Govindarajanagar,<br />
                        Agrahara Dasarahalli, Basaveshwaranagar Post,<br />
                        Bangalore, Karnataka – 560079
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
