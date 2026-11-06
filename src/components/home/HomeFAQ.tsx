import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Are your services totally private and confidential?",
    answer: "Yes. All our clients' information, case details, investigative dossiers, and findings are protected under strict non-disclosure safeguards and stored in encrypted digital environments."
  },
  {
    question: "What investigation services do you offer?",
    answer: "Our core services include FSL Forensic Signature Verification, Corporate Background Verification, Matrimonial & Pre-marital Verification, Connect for the Proof (evidence collection), and Property Dispute Investigations."
  },
  {
    question: "What is FSL signature verification?",
    answer: "This is a forensic examination of questioned signatures and documents to determine authenticity, detect forgery, and verify alterations for legal, financial, and personal disputes."
  },
  {
    question: "What is company background verification?",
    answer: "Company background verification entails an in-depth examination of an organization's legal standing, corporate filings, financial health, director track records, litigation history, and reputational standing."
  },
  {
    question: "What does \"Connect for the Proof\" mean?",
    answer: "Connecting for proof is our specialized intelligence service where we gather, authenticate, and systematically document court-admissible evidence required for business, legal, or personal matters."
  },
  {
    question: "Can you assist with complex property disputes?",
    answer: "Yes. We verify legal title deeds, trace ownership histories, check revenue records, identify unauthorized possession or illegal occupancy, and gather photographic/field evidence for dispute resolution."
  },
  {
    question: "How long does a typical investigation take?",
    answer: "Timelines depend on complexity and required depth. Background checks and forensic signature analyses typically take 3 to 7 business days, whereas multi-jurisdiction surveillance or asset tracking is scoped per case."
  },
  {
    question: "Do you offer official reports and documentation?",
    answer: "Yes. We deliver formal, certified investigative reports complete with chronological timelines, verified documentation, and tamper-proof evidence suitable for legal proceedings."
  },
  {
    question: "What are your charges and pricing structure?",
    answer: "Our fees are tailored to the specific scope, complexity, and operational resources required for each engagement. We provide transparent, upfront quotations with no hidden costs."
  },
  {
    question: "How can I initiate a confidential consultation?",
    answer: "You can reach us through our secure website contact form, call our direct confidential helpline at +91 96324 41604, email spysense.info@gmail.com, or message us via WhatsApp."
  }
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8F9FA] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="mb-3">
            <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold">
              FAQ
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-black/60 text-sm sm:text-base leading-relaxed">
            Find immediate answers to common questions about our methodology, privacy protocols, and investigative solutions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-logo-gold/40 bg-white shadow-md'
                    : 'border-black/8 bg-white hover:border-black/15'
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer transition-colors"
                >
                  <span className="font-poppins font-semibold text-sm sm:text-base text-[#0B0B0B] pr-4">
                    {item.question}
                  </span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-logo-gold/15 text-logo-gold' : 'bg-black/4 text-black/60'
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 text-sm sm:text-base text-black/65 leading-relaxed border-t border-black/5 pt-3">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
