import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-light px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Big 404 */}
        <p className="font-display text-[120px] md:text-[160px] font-bold leading-none text-primary/10 select-none">
          404
        </p>

        <h1 className="font-display text-3xl md:text-4xl font-semibold text-jet -mt-6 mb-4">
          Page Not Found
        </h1>
        <p className="text-jet/55 leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have been moved.
          Let us help you find what you need.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-poppins font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/20 text-primary font-poppins font-medium text-sm hover:bg-primary/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View Our Services
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
