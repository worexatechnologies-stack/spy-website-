import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ShieldCheck, Scale, Globe, FileText } from 'lucide-react';
import PageHero from '../components/ui/PageHero';

export default function TermsConditions() {
  const sections = [
    {
      id: 1,
      title: 'Acceptance of Terms',
      icon: Scale,
      content: 'Use of this website signifies that you agree to be bound by all laws, regulations, and these Terms & Conditions. These terms shall apply to all users, visitors, and clients. The use of the website signifies acceptance of any amendments in these terms.'
      
    },
    {
      id: 2,
      title: 'Scope of Services',
      icon: FileText,
      content: 'Any information provided on this website is for general purposes only. It shall neither be construed as legal nor professional advice. Making an inquiry, filling out a contact form, or interacting with us will not create a client relationship. Investigative services can only commence after signing a formal contract and completing all formalities.'
    },
    {
      id: 3,
      title: 'Legal Use of Services',
      icon: ShieldCheck,
      content: 'All our services are intended to be used for legal and ethical reasons. All requests should be for legal and ethical uses only, and we reserve the right to refuse or cancel any such request if we believe it to be illegal or unethical.'
    },
    {
      id: 4,
      title: 'Privacy and Confidentiality',
      icon: ShieldCheck,
      content: 'We will keep all information about our clients confidential and will only disclose information about the investigation to authorized parties with your consent or under legal requirements. Although we make efforts to ensure that all our information is secure, no system on the internet can provide full security.'
    },
    {
      id: 5,
      title: 'User Obligations',
      icon: FileText,
      content: 'The user will agree to supply all information truthfully and correctly when contacting us or requesting services from us. You are responsible for making sure that the information you supply to us is legal and does not violate the rights of individuals or organizations in any way.'
    },
    {
      id: 6,
      title: 'Fees and Payments',
      icon: FileText,
      content: 'Service charges, payment procedures, and all other business terms will be conveyed separately via the written agreement or quotation. Provided no other arrangements are made, payments for the investigative services rendered are non-refundable as soon as the process starts. Extra charges might be incurred in case of prolonged investigation or travel costs.'
    },
    {
      id: 7,
      title: 'Intel Property Rights',
      icon: Globe,
      content: 'All material presented on this website including text, graphics, logos, images, videos, documents, and website layout are owned exclusively by SPY SENSE and are subject to the intellectual property laws. No material can be duplicated, replicated, altered, or distributed in any form without a prior written consent.'
    },
    {
      id: 8,
      title: 'Limitation of Liability',
      icon: Scale,
      content: 'Although we make efforts to provide dependable and professional investigative services, we make no guarantees regarding the results of the investigation. We shall not be liable for any direct, indirect, incidental, special or consequential damages arising out of the use of this website or results of any investigations.'
    },
    {
      id: 9,
      title: 'Websites of Third Parties',
      icon: Globe,
      content: 'The website may include links to websites of third parties for your convenience. The inclusion of such links does not mean that we endorse the information or services offered by these websites. We are not liable for the accuracy, privacy policies, or accessibility of third-party websites.'
    },
    {
      id: 10,
      title: 'Privacy Policy',
      icon: ShieldCheck,
      content: 'In addition, the use of this website is subject to our Privacy Policy that describes our collection, use, storage and protection of your personal data. Your use of this website means that you accept the policies of our Privacy Policy.'
    },
    {
      id: 11,
      title: 'Changes to These Terms',
      icon: FileText,
      content: 'We have the right to revise or amend the Terms & Conditions at any time without providing notice beforehand. Revised Terms & Conditions will be posted on this website with a new effective date. Your continued use of the website after posting of the revised version will constitute acceptance of the revised Terms & Conditions.'
    },
    {
      id: 12,
      title: 'Governing Law and Jurisdiction',
      icon: Scale,
      content: 'These Terms & Conditions will be governed by and construed in accordance with the law of India. Any disputes relating to the usage of this website or our services shall be exclusively referred to the courts situated in Bangalore.'
    }
  ];

  return (
    <>

    <head>
   <title id="metaTitle">SpySense Terms and Conditions | Client Agreement & Legal Guidelines</title>
   <meta name="description" id="metaDescription" content="Review the official SpySense terms and conditions. Understand our client agreements, service policies, legal limitations, and investigative agency guidelines"/>
   <meta name="keywords" id="metaKeywords" content="spysense terms and conditions, terms and conditions of spysense, detective agency terms of service, legal terms for private investigation, private detective website terms"/>
   <meta id="ogTitle" property="og:title" content="SpySense Terms and Conditions | Client Agreement & Legal Guidelines"/>
   <meta id="ogType" property="og:type" content="website"/>
   <meta id="ogDescription" property="og:description" content="Review the official SpySense terms and conditions. Understand our client agreements, service policies, legal limitations, and investigative agency guidelines"/>
   <meta id="ogUrl" property="og:url" content="https://spysense.in/terms-and-conditions"/>
   <meta id="ogSiteName" property="og:site_name" content="SpySense Terms and Conditions | Client Agreement & Legal Guidelines"/>
   <meta id="ogImage" property="og:image" content="https://spysense.in/images/spy-sense-logo2.png"/>
   <meta id="twitterSite" name="twitter:site" content="https://twitter.com/"/>
   <meta id="twitterTitle" name="twitter:title" content="SpySense Terms and Conditions | Client Agreement & Legal Guidelines"/>
   <meta id="twitterDescription" name="twitter:description" content="Review the official SpySense terms and conditions. Understand our client agreements, service policies, legal limitations, and investigative agency guidelines"/>
   <meta id="author" name="author" content="Akshay"/>
   <link id="canonical" rel="canonical" href="https://spysense.in/terms-and-conditions"/>
   <meta id="indexingStatus" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
   <meta id="Publisher" property="publisher" content="Worexa Technologies"/>
   <meta property="og:locale" content="en_US"/>
</head>
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read our terms and conditions carefully before utilizing our services."
      />

      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm ring-1 ring-primary/5 mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-jet mb-6">
              Welcome to SPY SENSE
            </h2>
            <p className="text-jet/70 font-body leading-relaxed text-base md:text-lg">
              The following Terms & Conditions apply to the use of our website and services.
              By entering this website, making an inquiry, or utilizing our services, you signify
              that you have carefully read and agree to our Terms & Conditions. If you do not
              accept any part of these terms, kindly refrain from using this website.
            </p>
          </motion.div>

          {/* Terms Grid/List */}
          <div className="space-y-8">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm ring-1 ring-primary/5 flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-logo-gold/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-logo-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-poppins text-xs font-bold tracking-wider text-logo-gold uppercase">
                        Section {section.id}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-jet mb-4">
                      {section.title}
                    </h3>
                    <p className="text-jet/65 font-body leading-relaxed text-sm md:text-base">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Contact Information (Section 13) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-logo-black text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
                <Scale className="w-96 h-96" />
              </div>

              <div className="relative z-10">
                <span className="font-poppins text-xs font-bold tracking-widest text-logo-gold uppercase mb-3 block">
                  Section 13
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-6">
                  Contact Information
                </h3>
                <p className="text-white/70 font-body leading-relaxed mb-8 max-w-2xl text-sm md:text-base">
                  In case you have any queries regarding these Terms & Conditions or our services, feel free to contact us:
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

                <p className="mt-8 text-white/50 text-xs italic font-body">
                  Our goal is to offer professional, confidential, and legally valid investigation services. Should you have any doubts regarding these Terms & Conditions, kindly get in touch with us.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
