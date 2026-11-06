import { motion } from 'framer-motion';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}

export default function SectionHeading({
  tag,
  title,
  description,
  light = false,
  center = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${center ? 'text-center' : 'text-left'} max-w-3xl ${center ? 'mx-auto' : ''}`}
    >
      {tag && (
        <span
          className={`inline-block text-xs font-poppins font-semibold tracking-[0.2em] uppercase mb-4 ${
            light ? 'text-logo-gold' : 'text-dark-brown'
          }`}
        >
          {tag}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4 ${
          light ? 'text-white' : 'text-jet'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`font-body text-base md:text-lg leading-relaxed ${
            light ? 'text-white/70' : 'text-jet/60'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
