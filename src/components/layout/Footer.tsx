import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { services } = useApp();
  const footerServices = services.slice(0, 4);

  return (
    <footer className="bg-[#0B0B0B] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Col 1: Brand & Bio (4 Cols) */}
          <div className="lg:col-span-4">
            <Link to="/" className="mb-6 inline-flex rounded-2xl bg-white px-3.5 py-2 ring-1 ring-white/10 shadow-sm">
              <img src="/images/spy-sense-logo2.png" alt="Spy Sense logo" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-body max-w-sm">
              Professional private investigation, corporate due diligence, and forensic verification agency driven by confidentiality, integrity, and verified evidence.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-poppins text-logo-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Govt. Compliant & Certified Operatives</span>
            </div>
          </div>

          {/* Col 2: Company Navigation (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-poppins text-xs font-bold tracking-[0.2em] uppercase mb-5 text-logo-gold">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Articles', path: '/articles' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 text-sm hover:text-white transition-colors font-poppins"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Services (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-poppins text-xs font-bold tracking-[0.2em] uppercase mb-5 text-logo-gold">
              Our Services
            </h4>
            <ul className="space-y-3">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-white/60 text-sm hover:text-white transition-colors font-poppins line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-poppins text-xs font-bold tracking-[0.2em] uppercase mb-5 text-logo-gold">
              Contact Us
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="tel:+919632441604"
                  className="group flex items-start gap-3 text-white/60 text-sm hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-logo-gold mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="group-hover:text-logo-gold transition-colors font-medium">+91 96324 41604</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:spysense.info@gmail.com"
                  className="group flex items-start gap-3 text-white/60 text-sm hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-logo-gold mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="group-hover:text-logo-gold transition-colors break-all">spysense.info@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=No.+18%2FB%2C+4th+Main%2C+Govindarajanagar%2C+Agrahara+Dasarahalli%2C+Basaveshwaranagar+Post%2C+Bangalore%2C+Karnataka+560079"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-white/60 text-sm hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4 text-logo-gold mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="leading-relaxed">
                    No. 18/B, 4th Main, Govindarajanagar,
                    <br />
                    Agrahara Dasarahalli, Basaveshwaranagar Post,
                    <br />
                    Bangalore, Karnataka – 560079
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-poppins">
          <p className="text-white/45 text-center sm:text-left">
            &copy; 2026 Spy Sense. All Rights Reserved. | Designed by{' '}
            <a
              href="https://worexaTechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-logo-gold transition-colors font-medium underline underline-offset-2"
            >
              Worexa Technologies
            </a>
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-white/45 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-white/45 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
