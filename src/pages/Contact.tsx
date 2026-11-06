import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { sendEmail } from '../lib/sendEmail';

export default function Contact() {
  const { addContact, services } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendEmail({
        from_name: form.name,
        from_email: form.email,
        phone: form.phone || 'Not provided',
        message: form.message,
        service: form.service || 'General Inquiry',
        location: '',
      });
      addContact(form);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert('Failed to send message: ' + msg);
    } finally {
      setSending(false);
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      <head>
        <title id="metaTitle">Contact Private Detective for Confidential Cases | Spy Sense</title>
        <meta name="description" id="metaDescription" content="Need the truth? Contact Private Detective agency SpySense for asset tracking, background checks, and discreet evidence collection. Speak to our experts today"/>
        <meta name="keywords" id="metaKeywords" content="contact private detective, detective agency contact, private detective in bangalore, background verification bangalore, book a private investigator online, hire a private investigator today"/>
        <meta id="ogTitle" property="og:title" content="Contact Private Detective for Confidential Cases | SpySense"/>
        <meta id="ogType" property="og:type" content="website"/>
        <meta id="ogDescription" property="og:description" content="Need the truth? Contact Private Detective agency SpySense for asset tracking, background checks, and discreet evidence collection. Speak to our experts today"/>
        <meta id="ogUrl" property="og:url" content="https://spysense.in/contact"/>
        <meta id="ogSiteName" property="og:site_name" content="Contact Private Detective for Confidential Cases | SpySense"/>
        <meta id="ogImage" property="og:image" content="https://spysense.in/images/spy-sense-logo2.png"/>
        <meta id="twitterSite" name="twitter:site" content="https://twitter.com/"/>
        <meta id="twitterTitle" name="twitter:title" content="Contact Private Detective for Confidential Cases | SpySense"/>
        <meta id="twitterDescription" name="twitter:description" content="Need the truth? Contact Private Detective agency SpySense for asset tracking, background checks, and discreet evidence collection. Speak to our experts today"/>
        <meta id="author" name="author" content="Akshay"/>
        <link id="canonical" rel="canonical" href="https://spysense.in/contact"/>
        <meta id="indexingStatus" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
        <meta id="Publisher" property="publisher" content="Worexa Technologies"/>
        <meta property="og:locale" content="en_US"/>
      </head>

      <PageHero
        title="Contact Us"
        subtitle="Reach out for a confidential consultation. All communication is strictly protected under non-disclosure protocols."
        breadcrumb="Home / Contact"
      />

      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left: Contact Info (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-4"
            >
              <div>
                <div className="mb-2">
                  <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold">
                    Confidential Channels
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B0B0B] mb-2">
                  Get In Touch Directly
                </h2>
                <p className="text-black/60 text-sm leading-relaxed">
                  Our senior intelligence operatives are available for discreet evaluations across Bangalore and pan-India.
                </p>
              </div>

              {[
                { icon: Phone, label: 'Direct Helpline', value: '+91 96324 41604', href: 'tel:+919632441604', action: 'Call Now' },
                { icon: Mail, label: 'Encrypted Email', value: 'spysense.info@gmail.com', href: 'mailto:spysense.info@gmail.com', action: 'Send Email' },
                {
                  icon: MapPin,
                  label: 'Registered Office',
                  value: 'No. 18/B, 4th Main, Govindarajanagar,\nAgrahara Dasarahalli, Basaveshwaranagar Post,\nBangalore, Karnataka – 560079',
                  href: 'https://www.google.com/maps/search/?api=1&query=No.+18%2FB%2C+4th+Main%2C+Govindarajanagar%2C+Agrahara+Dasarahalli%2C+Basaveshwaranagar+Post%2C+Bangalore%2C+Karnataka+560079',
                  action: 'View Map'
                },
                { icon: Clock, label: 'Working Hours', value: 'Mon – Fri: 8:00 AM – 8:00 PM\nSat: 9:00 AM – 5:00 PM\n(24/7 Emergency Dispatch Available)' },
              ].map((item) => {
                const isLink = Boolean(item.href);
                const Tag = isLink ? 'a' : 'div';
                return (
                  <Tag
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Registered Office' ? '_blank' : undefined}
                    rel={item.label === 'Registered Office' ? 'noopener noreferrer' : undefined}
                    className={`group flex items-start gap-4 p-4 rounded-2xl bg-white border border-black/8 shadow-2xs transition-all duration-300 ${
                      isLink ? 'hover:border-logo-gold/50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-black/4 border border-black/6 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#0B0B0B] text-[#0B0B0B] group-hover:text-logo-gold">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="font-poppins text-xs font-bold uppercase tracking-wider text-black/50 group-hover:text-logo-gold transition-colors">
                          {item.label}
                        </h4>
                        {isLink && 'action' in item && (
                          <span className="text-[11px] font-poppins font-semibold text-logo-gold group-hover:translate-x-0.5 transition-transform">
                            {item.action} &rarr;
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-black/80 whitespace-pre-line group-hover:text-black transition-colors leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </Tag>
                );
              })}
            </motion.div>

            {/* Right: Contact Form (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-9 border border-black/8 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/6">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B0B0B]">
                      Confidential Case Inquiry
                    </h3>
                    <p className="text-xs text-black/50 font-poppins mt-0.5">
                      Information submitted here is encrypted and delivered strictly to senior investigators.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-poppins font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Protected</span>
                  </div>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
                    <h4 className="font-display text-xl font-bold text-[#0B0B0B] mb-2">
                      Inquiry Received Confidentially
                    </h4>
                    <p className="text-black/60 text-sm max-w-md mx-auto">
                      Thank you for contacting Spy Sense. A lead investigator will review your parameters and respond within 24 hours via secure communication.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-poppins font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F8F9FA] focus:bg-white focus:border-logo-gold focus:ring-2 focus:ring-logo-gold/20 outline-none transition-all text-sm"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-poppins font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F8F9FA] focus:bg-white focus:border-logo-gold focus:ring-2 focus:ring-logo-gold/20 outline-none transition-all text-sm"
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-poppins font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => {
                            const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                            update('phone', cleaned);
                          }}
                          maxLength={10}
                          pattern="[0-9]{10}"
                          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F8F9FA] focus:bg-white focus:border-logo-gold focus:ring-2 focus:ring-logo-gold/20 outline-none transition-all text-sm"
                          placeholder="10-digit number"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-poppins font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                          Service Required
                        </label>
                        <select
                          value={form.service}
                          onChange={(e) => update('service', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F8F9FA] focus:bg-white focus:border-logo-gold focus:ring-2 focus:ring-logo-gold/20 outline-none transition-all text-sm cursor-pointer"
                        >
                          <option value="">Select a service category</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="Other">Other Confidential Matter</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-poppins font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                        Case Description *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F8F9FA] focus:bg-white focus:border-logo-gold focus:ring-2 focus:ring-logo-gold/20 outline-none transition-all text-sm resize-none"
                        placeholder="Briefly describe your situation, requirements, and preferred contact timeline..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <Button
                        type="submit"
                        size="md"
                        className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#0B0B0B] text-white hover:bg-logo-gold hover:text-[#0B0B0B] transition-all"
                        disabled={sending}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {sending ? 'Sending Securely...' : 'Send Message'}
                      </Button>
                      <span className="text-xs text-black/50 font-poppins text-center sm:text-right">
                        Or call directly: <a href="tel:+919632441604" className="font-bold text-[#0B0B0B] hover:text-logo-gold underline underline-offset-2">+91 96324 41604</a>
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

          </div>

          {/* Google Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 rounded-3xl overflow-hidden shadow-md border border-black/8 h-80 sm:h-96"
          >
            <iframe
              title="Spy Sense Location"
              src="https://maps.google.com/maps?q=No.+18%2FB%2C+4th+Main%2C+Govindarajanagar%2C+Agrahara+Dasarahalli%2C+Basaveshwaranagar+Post%2C+Bangalore%2C+Karnataka+560079&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
