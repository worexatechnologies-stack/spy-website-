import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { caseStudies } from '../../data/initialData';

export default function CaseStudies() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Our Work"
          title="Recent Investigation Cases"
          description="A selection of successful investigations that demonstrate our expertise and commitment to results."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-light shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-poppins font-medium">
                    {study.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-jet mb-2 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                <p className="text-jet/55 text-sm leading-relaxed mb-4">{study.description}</p>
                <button className="inline-flex items-center gap-1.5 text-primary text-sm font-poppins font-medium hover:gap-2.5 transition-all cursor-pointer">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}