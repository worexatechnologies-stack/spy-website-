import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import CTA from '../components/home/CTA';
import { useApp } from '../context/AppContext';

const getReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 225));
};

export default function Articles() {
  const { blogs } = useApp();

  const filtered = useMemo(() => {
    return blogs;
  }, [blogs]);

  return (
    <>
    <head>
   <title id="metaTitle">Private Investigator Blog: Insider Insights & Case Studies</title>
   <meta name="description" id="metaDescription" content="Read our private investigator blog for expert tips on surveillance, background checks, and digital forensics. Discover how real investigators uncover the truth."/>
   <meta name="keywords" id="metaKeywords" content="private investigator blog,detective blog,detective tips and tricks,benefits of hiring a private investigator,detective agency blog"/>
   <meta id="ogTitle" property="og:title" content="Private Investigator Blog: Insider Insights & Case Studies"/>
   <meta id="ogType" property="og:type" content="article"/>
   <meta id="ogDescription" property="og:description" content="Read our private investigator blog for expert tips on surveillance, background checks, and digital forensics. Discover how real investigators uncover the truth."/>
   <meta id="ogUrl" property="og:url" content="https://spysense.in/articles"/>
   <meta id="ogSiteName" property="og:site_name" content="Private Investigator Blog: Insider Insights & Case Studies"/>
   <meta id="ogImage" property="og:image" content="https://spysense.in/images/spy-sense-logo2.png"/>
   <meta id="twitterSite" name="twitter:site" content="https://twitter.com/"/>
   <meta id="twitterTitle" name="twitter:title" content="Private Investigator Blog: Insider Insights & Case Studies"/>
   <meta id="twitterDescription" name="twitter:description" content="Read our private investigator blog for expert tips on surveillance, background checks, and digital forensics. Discover how real investigators uncover the truth."/>
   <meta id="author" name="author" content="Akshay"/>
   <link id="canonical" rel="canonical" href="https://spysense.in/articles"/>
   <meta id="indexingStatus" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
   <meta id="Publisher" property="publisher" content="Worexa Technologies"/>
   <meta property="og:locale" content="en_US"/>
</head>
      <PageHero
        title="Investigation Articles"
        subtitle="Insights, guides, and expert perspectives on professional investigation practices."
        breadcrumb="Home / Articles"
      />

      <section className="py-16 md:py-24 bg-[#F8F9FA] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Cards Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white rounded-3xl border border-black/8"
              >
                <p className="text-jet/50 font-poppins text-sm">No articles found.</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
              >
                {filtered.map((post, i) => {
                  const readTime = getReadTime(post.content);
                  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }).toUpperCase();

                  return (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ delay: Math.min(i * 0.06, 0.3) }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 border border-black/6 flex flex-col"
                    >
                      <Link to={`/articles/${post.slug}`} className="flex flex-col h-full w-full">
                      {/* Top: Image with title overlay */}
                      <div className="relative h-52 overflow-hidden bg-[#F0EEE9] shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/40" />
                        {/* Title overlaid on image */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h2 className="font-display text-white text-sm md:text-base font-bold leading-snug line-clamp-3 drop-shadow">
                            {/* Highlight category keywords in gold */}
                            {post.title.split(' ').map((word, wi) =>
                              post.category && word.toLowerCase().includes(post.category.toLowerCase().slice(0, 4)) ? (
                                <span key={wi} className="text-logo-gold">{word} </span>
                              ) : (
                                <span key={wi}>{word} </span>
                              )
                            )}
                          </h2>
                        </div>
                      </div>

                      {/* Bottom: Meta + Title + CTA */}
                      <div className="p-5 flex flex-col flex-grow">
                        {/* Date + Read time */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="flex items-center gap-1.5 text-[11px] font-poppins text-jet/45 uppercase tracking-wide">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                          </span>
                          <span className="text-jet/25 select-none">·</span>
                          <span className="flex items-center gap-1 text-[11px] font-poppins font-bold text-logo-gold uppercase tracking-wide">
                            <Clock className="w-3 h-3" />
                            {readTime} MIN READ
                          </span>
                        </div>

                        {/* Full title below image */}
                        <h3 className={`font-display text-base md:text-lg font-bold leading-snug mb-4 flex-grow ${
                          i === 0 ? 'text-logo-gold' : 'text-jet'
                        } group-hover:text-logo-gold transition-colors duration-300`}>
                          {post.title}
                        </h3>

                        {/* Read article + arrow button */}
                        <div className="flex items-center justify-between pt-4 border-t border-black/6 mt-auto">
                          <span
                            className="text-xs font-poppins font-semibold text-jet/60 hover:text-jet transition-colors"
                          >
                            Read article
                          </span>
                          <span
                            className="w-9 h-9 rounded-full bg-logo-gold flex items-center justify-center hover:bg-logo-black transition-colors duration-300 shadow-md group/btn shrink-0"
                          >
                            <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <CTA />
    </>
  );
}
