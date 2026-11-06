import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Testimonials() {
  const { testimonials } = useApp();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="mb-3">
            <span className="font-poppins text-xs font-bold uppercase tracking-[0.25em] text-logo-gold">
              Testimonials
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-black/60 text-sm sm:text-base leading-relaxed">
            Trusted by corporate leaders, law firms, and private individuals who require utmost discretion and proven results.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-black/8 bg-[#F8F9FA] p-8 sm:p-12 shadow-sm">
            {/* Subtle quotation background watermark */}
            <Quote className="absolute top-6 right-6 h-20 w-20 text-black/4 pointer-events-none" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-logo-gold text-logo-gold" />
                  ))}
                </div>

                {/* Review quote */}
                <p className="font-merriweather text-base sm:text-lg md:text-xl text-black/75 leading-relaxed mb-8 italic">
                  &ldquo;{t.review}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-6 border-t border-black/6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B0B0B] font-poppins text-sm font-bold text-logo-gold shadow-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-poppins text-sm font-bold text-[#0B0B0B]">
                      {t.name}
                    </h4>
                    <p className="text-xs text-black/50 font-poppins">
                      {t.role}{t.company ? `, ${t.company}` : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-jet hover:border-logo-gold hover:text-logo-gold transition-all shadow-2xs cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? 'bg-logo-gold w-6' : 'bg-black/15 w-2 hover:bg-black/30'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-jet hover:border-logo-gold hover:text-logo-gold transition-all shadow-2xs cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
