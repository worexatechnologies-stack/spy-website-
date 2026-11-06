import { ElementType, useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ArrowRight, Phone, Mail } from 'lucide-react';
import {
  Building2, UserCheck, Eye, Search, ShieldAlert, Heart, Monitor, Scale,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';
import CTA from '../components/home/CTA';
import { useApp } from '../context/AppContext';
import { sendEmail } from '../lib/sendEmail';

const iconMap: Record<string, ElementType> = {
  Building2, UserCheck, Eye, Search, ShieldAlert, Heart, Monitor, Scale,
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services } = useApp();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactLocation, setContactLocation] = useState('');
  const [sending, setSending] = useState(false);

  const service = services.find((s) => s.slug === slug);



  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-jet mb-4">Service Not Found</h1>
          <Button to="/services">Back to Services</Button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Search;
  const related = services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3);

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setContactLocation(`${pos.coords.latitude}, ${pos.coords.longitude}`),
      () => alert('Unable to retrieve your location')
    );
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendEmail({
        from_name: contactName,
        from_email: contactEmail,
        phone: contactPhone || 'Not provided',
        message: contactMessage,
        service: service.title,
        location: contactLocation || 'Not provided',
      });
      alert('Message sent — we will contact you shortly.');
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
      setContactLocation('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert('Failed to send: ' + msg);
    } finally {
      setSending(false);
    }
  };



  return (
    <>
      <head>
        <title id="metaTitle">{service.metaTitle || service.title}</title>
        {service.metaDescription && <meta name="description" id="metaDescription" content={service.metaDescription} />}
        {service.metaKeywords && <meta name="keywords" id="metaKeywords" content={service.metaKeywords} />}
        {service.ogTitle && <meta id="ogTitle" property="og:title" content={service.ogTitle} />}
        {service.ogType && <meta id="ogType" property="og:type" content={service.ogType} />}
        {service.ogDescription && <meta id="ogDescription" property="og:description" content={service.ogDescription} />}
        {service.ogUrl && <meta id="ogUrl" property="og:url" content={service.ogUrl} />}
        {service.ogSiteName && <meta id="ogSiteName" property="og:site_name" content={service.ogSiteName} />}
        {service.ogImage && <meta id="ogImage" property="og:image" content={service.ogImage} />}
        {service.twitterSite && <meta id="twitterSite" name="twitter:site" content={service.twitterSite} />}
        {service.twitterTitle && <meta id="twitterTitle" name="twitter:title" content={service.twitterTitle} />}
        {service.twitterDescription && <meta id="twitterDescription" name="twitter:description" content={service.twitterDescription} />}
        {service.author && <meta id="author" name="author" content={service.author} />}
        {service.canonical && <link id="canonical" rel="canonical" href={service.canonical} />}
        {service.indexingStatus && <meta id="indexingStatus" name="robots" content={service.indexingStatus} />}
        {service.Publisher && <meta id="Publisher" property="publisher" content={service.Publisher} />}
        {service.ogLocale && <meta property="og:locale" content={service.ogLocale} />}
      </head>
      <PageHero title={service.title} subtitle={service.shortDescription} breadcrumb={`Home / Services / ${service.title}`} />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary text-sm font-poppins font-medium mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl overflow-hidden mb-8 shadow-lg ring-1 ring-primary/10"
              >
                <img src={service.image} alt={service.title} className="w-full h-72 md:h-96 object-cover" />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-logo-gold/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-poppins font-medium text-dark-brown/70 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                <h2 className="font-display text-3xl font-semibold text-jet mb-6">Service Overview</h2>
                <p className="text-jet/60 leading-relaxed text-lg mb-8">{service.description}</p>

                <h3 className="font-display text-2xl font-semibold text-jet mb-4">What We Offer</h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-light">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-jet/70 font-poppins">{feature}</span>
                    </div>
                  ))}
                </div>

                {service.slug === 'investigation-of-property-disputes' && (
                  <div className="mb-8 rounded-2xl bg-light p-6 md:p-8 space-y-8">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-jet mb-4">
                        Property Dispute Investigations
                      </h3>
                      <h4 className="font-poppins font-semibold text-primary mb-3">
                        Securing Your Property Interests Through Professional Investigations
                      </h4>
                      <p className="text-jet/60 leading-relaxed mb-4">
                        Property disputes can often become complicated from both a legal and emotional perspective, and even become costly. From property belonging to one’s family members to land issues, property inheritance disputes, and fraud, having access to information becomes imperative. This is why Spy Sense offers professional and confidential investigations into property disputes to assist individuals, families, companies, and legal professionals in securing their rights.
                      </p>
                      <p className="text-jet/60 leading-relaxed mb-4">
                        Our professional investigators will perform thorough investigations into your property dispute through strategic investigation methods, field intelligence, surveillance, background check and evidence gathering. Our aim is to acquire factual and objective information in order to facilitate any dispute resolution process.
                      </p>
                      <p className="text-jet/60 leading-relaxed">
                        We recognize that each property dispute case is unique, and for that reason, our investigation will be customized according to the specifics of each case.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display text-xl font-semibold text-jet mb-4">
                        Our Property Investigations Service Includes:
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3 mb-4">
                        {[
                          'Verification of the ownership of the property',
                          'Background investigation on the land, properties, and associated assets',
                          'Investigation of the illegal occupation of the property',
                          'Investigation of disputes relating to inheritance and family properties',
                          'Verification of the tenants and occupants',
                          'Investigation of fraud involving property documentation',
                          'Investigation of asset trace and ownership history',
                          'Investigation of unauthorized possession of the property',
                          'Evidence collection and documentation',
                          'Verification of the property records and associated parties',
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-jet/70 font-poppins">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-primary/10">
                      <div>
                        <h4 className="font-display text-lg font-semibold text-jet mb-3">
                          Why Choose Spy Sense?
                        </h4>
                        <p className="text-sm text-jet/60 leading-relaxed">
                          We at Spy Sense offer professional, investigative, and confidential services to provide our customers with the information that they can act upon. From disputed ownership, inheritance family conflicts, land encroachment, forgery of documents, unauthorized possession, or even suspicious property dealings, our investigators are dedicated to providing you with accurate results and investigative assistance.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-display text-lg font-semibold text-jet mb-3">
                          Our Commitment
                        </h4>
                        <ul className="space-y-2">
                          {[
                            'Total confidentiality and privacy assurance',
                            'Professional and ethical investigation procedures',
                            'Precise and evidence-based results',
                            'Customized investigation approaches',
                            'Regular updates and transparency in communication',
                            'Personalized investigation assistance',
                          ].map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-jet/70 font-poppins">
                              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-primary/10 text-center">
                      <p className="text-jet/70 italic font-poppins leading-relaxed">
                        In Spy Sense, we feel that every dispute should have clarity, every claim should be verified, and every client should be told the truth. Contact us for help in protecting your rights and securing your assets with our professional team of investigators.
                      </p>
                    </div>
                  </div>
                )}

                {service.slug === 'fsl-signature' && (
                  <div className="mb-8 rounded-2xl bg-light p-6 md:p-8">
                    <h3 className="font-display text-2xl font-semibold text-jet mb-4">
                      The Characteristics of Signature FSL
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-4">
                      {[
                        'Attention to Details',
                        'Strategic Thinking',
                        'Analytical Excellence',
                        'Professional Integrity',
                        'Innovative Perspective',
                        'Commitment to Results',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-jet/70 font-poppins">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-jet/60 leading-relaxed">
                      At Signature FSL, we do more than observe the reality - we study it, interpret it,
                      and discover its hidden potential.
                    </p>
                  </div>
                )}

                {service.slug === 'background-checking-for-companies' && (
                  <div className="mb-8 rounded-2xl bg-light p-6 md:p-8">
                    <h3 className="font-display text-2xl font-semibold text-jet mb-4">
                      Why Should an Organization Verify the Company Background?
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-4">
                      {[
                        'It ensures the credibility of the business.',
                        'Check the legitimacy and authenticity of the organization prior to cooperation.',
                        'It helps reduce possible business risks.',
                        'Detect possible problems in advance.',
                        'It facilitates informed decision-making.',
                        'Make decisions based on verified information.',
                        'It builds trust between organizations.',
                        'It protects organizations from fraudulent businesses and cooperation with unreliable companies.',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-jet/70 font-poppins">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-display text-xl font-semibold text-jet mb-3">
                      Key Fields to be Verified
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-4">
                      {[
                        'Company Registration & Corporate Structure',
                        'Business Operation & Market Presence',
                        'Financial Verification & Compliance',
                        'Company Credibility and Reputation',
                        'Corporate Structure and Ownership Verification',
                        'Business Operation & Risk Analysis',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-jet/70 font-poppins">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-jet/60 leading-relaxed">
                      Company Background Verification is not only a process but also a tool to know about
                      the businesses that you are associating with. Through the verification of pertinent data.
                    </p>
                  </div>
                )}

                {service.slug === 'connect-for-the-proof-evidence' && (
                  <div className="mb-8 rounded-2xl bg-light p-6 md:p-8">
                    <h3 className="font-display text-2xl font-semibold text-jet mb-4">
                      Why Connect for the Proof?
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-poppins font-semibold text-jet mb-1">Verify First And Only Then Trust</h4>
                        <p className="text-sm text-jet/70">Be guided by verified information rather than assumptions.</p>
                      </div>
                      <div>
                        <h4 className="font-poppins font-semibold text-jet mb-1">Uncover Critical Evidence</h4>
                        <p className="text-sm text-jet/70">Reveal facts that could not be revealed otherwise.</p>
                      </div>
                      <div>
                        <h4 className="font-poppins font-semibold text-jet mb-1">Minimize The Risk</h4>
                        <p className="text-sm text-jet/70">Eliminate doubts and make safe decisions.</p>
                      </div>
                      <div>
                        <h4 className="font-poppins font-semibold text-jet mb-1">Keep Your Interests Secure</h4>
                        <p className="text-sm text-jet/70">Protect yourself from risks and threats.</p>
                      </div>
                      <div>
                        <h4 className="font-poppins font-semibold text-jet mb-1">Build Trust With Facts</h4>
                        <p className="text-sm text-jet/70">Create solid relationships through verification.</p>
                      </div>
                    </div>

                    <h4 className="font-display text-xl font-semibold text-jet mb-3">Areas of Our Expertise</h4>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                      {[
                        'Property Dispute Investigations',
                        'Corporate Background Verification',
                        'Employee Background Verification',
                        'Verification of Identity & Address',
                        'Due Diligence Services',
                        'Intelligence & Surveillance Assistance',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-jet/70 font-poppins">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-display text-xl font-semibold text-jet mb-3">The Way We Do It</h4>
                    <ul className="space-y-2 mb-6">
                      {[
                        'Watch - Every piece of information counts.',
                        'Evaluate - Every single fact is evaluated properly.',
                        'Verify - Every statement is professionally confirmed.',
                        'Provide - Every piece of information is delivered confidentially.',
                      ].map((item) => (
                        <li key={item} className="text-sm text-jet/70 font-poppins">{item}</li>
                      ))}
                    </ul>

                    <p className="text-jet/60 leading-relaxed">
                      At Spy Sense, we do not work on assumptions. We use facts, insights, and expertise to ensure that you can move ahead with confidence.
                    </p>
                    <p className="text-jet/60 leading-relaxed mt-3">
                      Contact us for the Evidence. Because trust starts with the proof.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-[#F8F9FA] rounded-3xl p-6 sm:p-7 sticky top-36 border border-black/8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-[#0B0B0B] mb-2">Request This Service</h3>
                <p className="text-black/60 text-xs sm:text-sm mb-5 leading-relaxed">
                  Get a confidential consultation about how we can help with your {service.title.toLowerCase()} needs.
                </p>
                <div className="space-y-2.5 mb-6">
                  <Button to="/contact" className="w-full py-3 rounded-xl bg-[#0B0B0B] text-white hover:bg-logo-gold hover:text-[#0B0B0B] text-xs font-bold uppercase tracking-wider transition-all">
                    Inquire Online
                  </Button>
                  <Button href="tel:+919632441604" variant="outline" className="w-full py-3 rounded-xl border-black/15 text-black hover:border-logo-gold hover:bg-logo-gold/10 text-xs font-bold uppercase tracking-wider transition-all">
                    <Phone className="w-3.5 h-3.5 mr-2 text-logo-gold" />
                    Call +91 96324 41604
                  </Button>
                </div>

                <div className="border-t border-black/8 pt-5">
                  <h4 className="font-poppins text-xs font-bold uppercase tracking-wider text-black/50 mb-3">Quick Direct Message</h4>
                  <div className="space-y-2 mb-4">
                    <a
                      href="tel:+919632441604"
                      className="group flex items-center gap-2.5 text-xs text-black/70 hover:text-logo-gold transition-colors font-medium"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-logo-gold/15 text-logo-gold group-hover:bg-logo-gold group-hover:text-black transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                      </span>
                      <span>+91 96324 41604</span>
                    </a>
                    <a
                      href="mailto:spysense.info@gmail.com"
                      className="group flex items-center gap-2.5 text-xs text-black/70 hover:text-logo-gold transition-colors font-medium"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-logo-gold/15 text-logo-gold group-hover:bg-logo-gold group-hover:text-black transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </span>
                      <span>spysense.info@gmail.com</span>
                    </a>
                  </div>

                  <form onSubmit={handleSend} className="space-y-3">
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your name *"
                      className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-poppins focus:border-logo-gold outline-none transition-all"
                      required
                    />
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Your email address *"
                      className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-poppins focus:border-logo-gold outline-none transition-all"
                      required
                    />
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setContactPhone(cleaned);
                      }}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      placeholder="Phone number (optional)"
                      className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-poppins focus:border-logo-gold outline-none transition-all"
                    />
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Case brief / inquiry..."
                      className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-poppins focus:border-logo-gold outline-none transition-all h-24 resize-none"
                      required
                    />
                    <div className="flex gap-2 pt-1">
                      <button type="button" onClick={handleMyLocation} className="px-3 py-2 rounded-xl bg-black/5 text-[11px] font-poppins font-medium text-black/70 hover:bg-black/10 transition-colors">
                        Use GPS
                      </button>
                      <button type="submit" disabled={sending} className="flex-1 py-2.5 rounded-xl bg-[#0B0B0B] text-white text-xs font-poppins font-bold uppercase tracking-wider hover:bg-logo-gold hover:text-[#0B0B0B] transition-all">
                        {sending ? 'Sending...' : 'Send Inquiry'}
                      </button>
                    </div>
                    {contactLocation && <div className="text-[11px] text-black/50">Location: {contactLocation}</div>}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Related Services */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="font-display text-2xl font-semibold text-jet mb-6">Related Services</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${s.slug}`}
                    className="group bg-light rounded-2xl p-5 ring-1 ring-primary/8 hover:shadow-lg transition-all"
                  >
                    <h4 className="font-display text-lg font-semibold text-jet group-hover:text-primary transition-colors mb-2">
                      {s.title}
                    </h4>
                    <p className="text-sm text-jet/55 mb-3 line-clamp-2">{s.shortDescription}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
