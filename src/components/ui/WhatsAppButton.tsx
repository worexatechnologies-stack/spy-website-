import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, FileText, Building2, Scale, ShieldCheck, MessageCircle } from 'lucide-react';

const phoneNumber = '919632441604';

interface ServiceOption {
  id: string;
  label: string;
  icon: typeof FileText;
  msg: string;
  badge?: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'fsl-signature',
    label: 'FSL Signature Verification',
    icon: FileText,
    msg: 'Hello Spy Sense, I would like to inquire about FSL Signature Verification services. Please share consultation details.',
    badge: 'Forensics',
  },
  {
    id: 'background-checking',
    label: 'Company Background Check',
    icon: Building2,
    msg: 'Hello Spy Sense, I would like to inquire about Company Background Verification services. Please share details.',
    badge: 'Corporate',
  },
  {
    id: 'property-disputes',
    label: 'Property Dispute Investigation',
    icon: Scale,
    msg: 'Hello Spy Sense, I would like to inquire about Property Dispute Investigation services. Please share details.',
    badge: 'Legal',
  },
  {
    id: 'proof-evidence',
    label: 'Proof & Evidence Collection',
    icon: ShieldCheck,
    msg: 'Hello Spy Sense, I would like to inquire about Proof & Evidence Collection services. Please share details.',
    badge: 'Evidence',
  },
  {
    id: 'general',
    label: 'General / Other Inquiry',
    icon: MessageCircle,
    msg: 'Hello Spy Sense, I would like to have a confidential consultation regarding your investigation services.',
  },
];

const generalDefaultMessage = encodeURIComponent(
  `Hello Spy Sense, I would like to inquire about your investigation services.\n\nService Required:\n1. FSL Signature Verification\n2. Company Background Check\n3. Property Dispute Investigation\n4. Proof & Evidence Collection\n5. General Inquiry\n\nPlease let me know how to proceed.`
);

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close popup if clicked outside or on pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Close popup on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const openWhatsAppWith = (customMessage: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside
      ref={containerRef}
      aria-label="WhatsApp Quick Contact"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
    >
      {/* Quick Services WhatsApp Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-88 max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-[#0B0B0B] px-4 py-3.5 text-white flex items-center justify-between border-b border-logo-gold/20">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.3-.777.978-.952 1.179-.176.2-.351.226-.652.075-1.528-.767-2.528-1.368-3.535-3.097-.266-.456.267-.424.764-1.42.083-.166.042-.312-.021-.437s-.678-1.633-.929-2.238c-.244-.59-.492-.51-.678-.52h-.579c-.201 0-.527.075-.803.376s-1.055 1.03-1.055 2.511 1.08 2.912 1.23 3.113c.15.2 2.126 3.247 5.151 4.554.72.31 1.282.496 1.72.636.724.23 1.382.198 1.903.12.58-.088 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.125-.276-.2-.577-.35m-5.467 7.406c-1.92 0-3.803-.516-5.45-1.493l-.391-.232-4.053 1.063 1.082-3.953-.254-.405a10.66 10.66 0 0 1-1.636-5.698C2.303 5.86 7.545.617 14.004.617c3.127 0 6.067 1.218 8.278 3.434 2.212 2.215 3.428 5.16 3.427 8.29 0 6.45-5.242 11.693-11.698 11.693m0-21.688c-7.394 0-13.411 6.018-13.411 13.412 0 2.36.615 4.664 1.784 6.69L.001 24l5.441-1.428a13.38 13.38 0 0 0 6.564 1.716c7.394 0 13.41-6.018 13.41-13.413 0-3.583-1.396-6.953-3.93-9.488C18.951 1.353 15.582.1 12.005.1" />
                  </svg>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B0B0B]" />
                </div>
                <div>
                  <h4 className="font-poppins text-xs font-bold uppercase tracking-wider text-logo-gold">
                    Spy Sense
                  </h4>
                  <p className="text-[11px] text-white/70">Confidential WhatsApp Desk</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close WhatsApp options"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="bg-[#FAF8F5] p-3.5">
              <p className="text-xs text-jet/70 font-medium mb-2.5 px-0.5">
                Select your service to send message instantly:
              </p>

              {/* Service Options Buttons */}
              <div className="space-y-1.5">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      openWhatsAppWith(opt.msg);
                      setIsOpen(false);
                    }}
                    className="group w-full flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white border border-primary/10 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-left shadow-xs hover:shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-logo-gold/15 text-primary group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                        <opt.icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-jet group-hover:text-[#0f7a37] transition-colors truncate">
                          {opt.label}
                        </p>
                        {opt.badge && (
                          <span className="text-[10px] text-jet/45 font-medium">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-jet/30 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              {/* Direct Full-Template Option */}
              <div className="mt-3 pt-2.5 border-t border-primary/10 flex items-center justify-between">
                <span className="text-[10px] text-jet/50 font-poppins">
                  Response within minutes
                </span>
                <button
                  type="button"
                  onClick={() => {
                    window.open(
                      `https://wa.me/${phoneNumber}?text=${generalDefaultMessage}`,
                      '_blank',
                      'noopener,noreferrer'
                    );
                    setIsOpen(false);
                  }}
                  className="text-[11px] font-poppins font-semibold text-[#0f7a37] hover:text-[#095023] underline underline-offset-2"
                >
                  Direct chat &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Open WhatsApp service options"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.6)] transition-colors duration-300 hover:bg-[#20ba59] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.8)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Radar ping ring (only when closed) */}
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"
            style={{ animationDuration: '2.5s' }}
          />
        )}

        {/* Desktop Tooltip (only when closed) */}
        {!isOpen && (
          <span
            role="tooltip"
            className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#111111]/95 px-3.5 py-1.5 text-xs font-poppins font-medium text-white shadow-xl backdrop-blur-md opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:block"
          >
            Chat on WhatsApp
            <span
              aria-hidden="true"
              className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-[#111111]/95"
            />
          </span>
        )}

        {/* Icon (toggles between WhatsApp and X) */}
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <svg
            className="h-7 w-7 fill-white transition-transform duration-300 group-hover:rotate-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.3-.777.978-.952 1.179-.176.2-.351.226-.652.075-1.528-.767-2.528-1.368-3.535-3.097-.266-.456.267-.424.764-1.42.083-.166.042-.312-.021-.437s-.678-1.633-.929-2.238c-.244-.59-.492-.51-.678-.52h-.579c-.201 0-.527.075-.803.376s-1.055 1.03-1.055 2.511 1.08 2.912 1.23 3.113c.15.2 2.126 3.247 5.151 4.554.72.31 1.282.496 1.72.636.724.23 1.382.198 1.903.12.58-.088 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.125-.276-.2-.577-.35m-5.467 7.406c-1.92 0-3.803-.516-5.45-1.493l-.391-.232-4.053 1.063 1.082-3.953-.254-.405a10.66 10.66 0 0 1-1.636-5.698C2.303 5.86 7.545.617 14.004.617c3.127 0 6.067 1.218 8.278 3.434 2.212 2.215 3.428 5.16 3.427 8.29 0 6.45-5.242 11.693-11.698 11.693m0-21.688c-7.394 0-13.411 6.018-13.411 13.412 0 2.36.615 4.664 1.784 6.69L.001 24l5.441-1.428a13.38 13.38 0 0 0 6.564 1.716c7.394 0 13.41-6.018 13.41-13.413 0-3.583-1.396-6.953-3.93-9.488C18.951 1.353 15.582.1 12.005.1" />
          </svg>
        )}
      </motion.button>
    </aside>
  );
}
