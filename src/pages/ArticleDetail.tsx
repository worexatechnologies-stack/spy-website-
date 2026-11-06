import { useParams, Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Tag, ChevronDown, CheckCircle } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { sendEmail } from '../lib/sendEmail';

interface FAQItem {
  question: string;
  answer: string;
}

const renderTextWithBold = (text: string) => {
  // Regex matches **bold**, [markdown](links), and <a href="url">html links</a> (handles both href= and href:)
  const regex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|<a\s+href[:=]["']([^"']+)["'][^>]*>([^<]+)<\/a>)/gi;
  const elements = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    if (match[1].startsWith('**')) {
      elements.push(
        <strong key={`bold-${keyIndex++}`} className="font-bold text-jet">
          {match[2]}
        </strong>
      );
    } else if (match[1].startsWith('[')) {
      elements.push(
        <a 
          key={`link-${keyIndex++}`} 
          href={match[4]} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-logo-gold hover:underline font-medium"
        >
          {match[3]}
        </a>
      );
    } else if (match[1].toLowerCase().startsWith('<a')) {
      elements.push(
        <a 
          key={`html-link-${keyIndex++}`} 
          href={match[5]} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-logo-gold hover:underline font-medium"
        >
          {match[6]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
};

const parseArticleContent = (content: string) => {
  const faqHeaderIndex = content.search(/^[#\s]*(Frequently|Commonly) Asked Questions/im);
  let mainContent = content;
  let faqText = '';

  if (faqHeaderIndex !== -1) {
    mainContent = content.substring(0, faqHeaderIndex);
    faqText = content.substring(faqHeaderIndex);
  }

  const faqs: FAQItem[] = [];
  if (faqText) {
    const faqLines = faqText.split('\n');
    let currentQuestion = '';
    let currentAnswerLines: string[] = [];

    for (const line of faqLines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.toLowerCase().includes('frequently asked questions') || trimmed.toLowerCase().includes('commonly asked questions') || trimmed.toLowerCase().match(/^#+\s*faqs?/)) {
        continue;
      }

      const isQuestion = 
        /^\*\*?\s*(Q|q)?\d+[\.:\]]/i.test(trimmed) || 
        /^\d+[\.:\]]\s*.*(\?\*\*|\?)$/.test(trimmed) ||
        /^\*\*?\s*Q\s*:/i.test(trimmed) ||
        (trimmed.startsWith('**') && trimmed.endsWith('**') && (trimmed.includes('?') || trimmed.toLowerCase().includes('what') || trimmed.toLowerCase().includes('when') || trimmed.toLowerCase().includes('how') || trimmed.toLowerCase().includes('why') || trimmed.toLowerCase().includes('is a') || trimmed.toLowerCase().includes('who')));

      if (isQuestion) {
        if (currentQuestion) {
          faqs.push({
            question: cleanQuestionText(currentQuestion),
            answer: currentAnswerLines.join('\n').trim(),
          });
        }
        currentQuestion = trimmed;
        currentAnswerLines = [];
      } else {
        if (currentQuestion) {
          currentAnswerLines.push(trimmed);
        }
      }
    }

    if (currentQuestion && currentAnswerLines.length > 0) {
      faqs.push({
        question: cleanQuestionText(currentQuestion),
        answer: currentAnswerLines.join('\n').trim(),
      });
    }
  }

  const lines = mainContent.split('\n');
  const blocks: Array<
    | { type: 'heading'; text: string; level: number }
    | { type: 'list'; items: string[] }
    | { type: 'toc'; items: string[] }
    | { type: 'paragraph'; text: string }
  > = [];

  let currentParagraphLines: string[] = [];
  let currentListItems: string[] = [];
  let currentTocItems: string[] = [];
  let isInToc = false;

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      blocks.push({ type: 'paragraph', text: currentParagraphLines.join(' ').trim() });
      currentParagraphLines = [];
    }
  };

  const flushList = () => {
    if (currentListItems.length > 0) {
      blocks.push({ type: 'list', items: currentListItems });
      currentListItems = [];
    }
  };

  const flushToc = () => {
    if (currentTocItems.length > 0) {
      blocks.push({ type: 'toc', items: currentTocItems });
      currentTocItems = [];
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushToc();
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushAll();
      continue;
    }

    if (trimmed.toLowerCase().startsWith('table of content')) {
      flushAll();
      isInToc = true;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushAll();
      isInToc = false;
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemText = trimmed.replace(/^([-\*]|\d+\.)\s+/, '').trim();
      if (isInToc) {
        currentTocItems.push(itemText);
      } else {
        flushParagraph();
        currentListItems.push(itemText);
      }
      continue;
    }

    flushList();
    currentParagraphLines.push(trimmed);
  }

  flushAll();
  return { blocks, faqs };
};

const cleanQuestionText = (text: string): string => {
  return text
    .replace(/^\*\*?/, '')
    .replace(/\*\*?$/, '')
    .replace(/^\d+[\.:\]]\s*/, '')
    .replace(/^Q\d+[\.:\]]\s*/i, '')
    .replace(/^Q\s*:\s*/i, '')
    .trim();
};

const getReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 225));
};

export default function ArticleDetail() {
  const { slug } = useParams();
  const { blogs } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Quick Contact form state
  const [qcName, setQcName] = useState('');
  const [qcPhone, setQcPhone] = useState('');
  const [qcEmail, setQcEmail] = useState('');
  const [qcSending, setQcSending] = useState(false);
  const [qcSent, setQcSent] = useState(false);
  const [qcError, setQcError] = useState('');

  const handleQuickContact = async (e: FormEvent) => {
    e.preventDefault();
    setQcSending(true);
    setQcError('');
    try {
      await sendEmail({
        from_name:  qcName,
        from_email: qcEmail || 'Not provided',
        phone:      qcPhone || 'Not provided',
        message:    `Quick contact enquiry from article: "${post?.title || 'Unknown article'}".`,
        service:    'General Inquiry',
        location:   '',
      });
      setQcSent(true);
      setQcName('');
      setQcPhone('');
      setQcEmail('');
      setTimeout(() => setQcSent(false), 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setQcError('Failed to send: ' + msg);
    } finally {
      setQcSending(false);
    }
  };

  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-jet mb-4">Article Not Found</h1>
          <Button to="/articles">Back to Articles</Button>
        </div>
      </div>
    );
  }

  const related = blogs
    .filter((b) => b.category === post.category && b.id !== post.id)
    .slice(0, 3);

  const recent = blogs.filter((b) => b.id !== post.id).slice(0, 4);
  const readTime = getReadTime(post.content);

  return (
    <>
      {post.metaTitle && (
        <head>
          <title id="metaTitle">{post.metaTitle}</title>
          {post.metaDescription && <meta name="description" id="metaDescription" content={post.metaDescription} />}
          {post.metaKeywords && <meta name="keywords" id="metaKeywords" content={post.metaKeywords} />}
          {post.ogTitle && <meta id="ogTitle" property="og:title" content={post.ogTitle} />}
          {post.ogType && <meta id="ogType" property="og:type" content={post.ogType} />}
          {post.ogDescription && <meta id="ogDescription" property="og:description" content={post.ogDescription} />}
          {post.ogUrl && <meta id="ogUrl" property="og:url" content={post.ogUrl} />}
          {post.ogSiteName && <meta id="ogSiteName" property="og:site_name" content={post.ogSiteName} />}
          {post.ogImage && <meta id="ogImage" property="og:image" content={post.ogImage} />}
          {post.twitterSite && <meta id="twitterSite" name="twitter:site" content={post.twitterSite} />}
          {post.twitterTitle && <meta id="twitterTitle" name="twitter:title" content={post.twitterTitle} />}
          {post.twitterDescription && <meta id="twitterDescription" name="twitter:description" content={post.twitterDescription} />}
          {post.metaAuthor && <meta id="author" name="author" content={post.metaAuthor} />}
          {post.canonical && <link id="canonical" rel="canonical" href={post.canonical} />}
          {post.indexingStatus && <meta id="indexingStatus" name="robots" content={post.indexingStatus} />}
          {post.Publisher && <meta id="Publisher" property="publisher" content={post.Publisher} />}
          {post.ogLocale && <meta property="og:locale" content={post.ogLocale} />}
        </head>
      )}

      <PageHero title={post.title} breadcrumb={`Home / Articles / ${post.category}`} image={post.image} />

      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm font-poppins font-semibold text-jet/60 hover:text-logo-gold mb-8 transition-colors group"
          >
            <span className="w-8 h-8 rounded-full bg-white border border-black/8 flex items-center justify-center group-hover:bg-logo-gold group-hover:border-logo-gold transition-colors shadow-sm">
              <ArrowLeft className="w-4 h-4 text-jet/60 group-hover:text-white transition-colors" />
            </span>
            Back to Articles
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Article */}
            <article className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden mb-8 shadow-md border border-black/6 bg-[#F4F4F4] flex justify-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                </div>

                {/* Meta bar */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-logo-gold text-logo-black text-[10px] font-poppins font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-poppins text-jet/50">
                    <Calendar className="w-3.5 h-3.5 text-logo-gold" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-poppins text-jet/50">
                    <User className="w-3.5 h-3.5 text-logo-gold" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-poppins font-bold text-logo-gold uppercase tracking-wide ml-auto">
                    <Clock className="w-3.5 h-3.5" />
                    {readTime} MIN READ
                  </span>
                </div>

                {/* Article Body */}
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-black/6 mb-8">
                  {(() => {
                    const { blocks, faqs } = parseArticleContent(post.content);
                    
                    return (
                      <>
                        {blocks.map((block, i) => {
                          if (block.type === 'toc') {
                            if (block.items.length === 0) return null;
                            return (
                              <div key={i} className="bg-[#F8F6F2] rounded-xl p-5 mb-8 border border-logo-gold/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-logo-gold/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                                <h4 className="font-display font-bold text-base text-jet mb-3 flex items-center gap-2">
                                  <span className="w-1.5 h-4 bg-logo-gold rounded-sm inline-block"></span>
                                  In This Article
                                </h4>
                                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                                  {block.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-xs font-poppins text-jet/70 hover:text-logo-gold transition-colors">
                                      <span className="w-1.5 h-1.5 rounded-full bg-logo-gold/60" />
                                      <a href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="underline decoration-black/5 hover:decoration-logo-gold transition-colors">
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          }
                          
                          if (block.type === 'heading') {
                            const headingId = block.text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            return (
                              <h3 
                                key={i} 
                                id={headingId} 
                                className="font-display font-bold text-xl md:text-2xl text-jet mb-4 mt-8 flex items-center gap-3 scroll-mt-28"
                              >
                                <span className="w-1.5 h-6 bg-logo-gold rounded-full inline-block shrink-0"></span>
                                {block.text}
                              </h3>
                            );
                          }
                          
                          if (block.type === 'list') {
                            return (
                              <ul key={i} className="space-y-3 my-5 pl-1">
                                {block.items.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-jet/70 leading-relaxed font-body">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-logo-gold shrink-0" />
                                    <span className="flex-1">{renderTextWithBold(item)}</span>
                                  </li>
                                ))}
                              </ul>
                            );
                          }
                          
                          return (
                            <p
                              key={i}
                              className={`leading-relaxed mb-5 font-body text-jet/70 ${
                                i === 0 ? 'text-base md:text-lg text-jet/80 font-medium' : 'text-sm md:text-base'
                              }`}
                            >
                              {renderTextWithBold(block.text)}
                            </p>
                          );
                        })}
                        
                        {faqs.length > 0 && (
                          <div className="mt-12 pt-8 border-t border-black/6">
                            <h3 className="font-display text-2xl font-bold text-jet mb-6 flex items-center gap-3">
                              <span className="w-1.5 h-6 bg-logo-gold rounded-full inline-block shrink-0"></span>
                              Frequently Asked Questions
                            </h3>
                            <div className="space-y-4">
                              {faqs.map((faq, index) => {
                                const isOpen = openFaqIndex === index;
                                return (
                                  <div
                                    key={index}
                                    className="bg-[#FDFDFD] rounded-xl border border-black/6 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                  >
                                    <button
                                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-poppins font-semibold text-sm md:text-base text-jet hover:text-logo-gold transition-colors focus:outline-none cursor-pointer"
                                    >
                                      <span>{faq.question}</span>
                                      <span className={`w-8 h-8 rounded-full bg-[#F4F4F4] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-logo-gold/10' : ''}`}>
                                        <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-logo-gold' : 'text-jet/50'}`} />
                                      </span>
                                    </button>
                                    
                                    <motion.div
                                      initial={false}
                                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-5 pb-5 pt-1 text-sm md:text-base text-jet/65 leading-relaxed font-body border-t border-black/5 bg-white">
                                        {faq.answer}
                                      </div>
                                    </motion.div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-10">
                  <Tag className="w-3.5 h-3.5 text-logo-gold shrink-0" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white border border-black/8 text-jet/60 text-xs font-poppins shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Related Articles */}
                {related.length > 0 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-jet mb-6">Related Articles</h3>
                    <div className="grid sm:grid-cols-3 gap-5">
                      {related.map((r) => (
                        <Link
                          key={r.id}
                          to={`/articles/${r.slug}`}
                          className="group bg-white rounded-2xl overflow-hidden border border-black/6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                          <div className="relative h-36 overflow-hidden">
                            <img
                              src={r.image}
                              alt={r.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h4 className="font-display text-sm font-bold text-jet group-hover:text-logo-gold transition-colors line-clamp-2 mb-3 flex-grow">
                              {r.title}
                            </h4>
                            <div className="flex items-center justify-between pt-3 border-t border-black/6">
                              <span className="text-[10px] font-poppins text-jet/45 uppercase tracking-wide">
                                Read article
                              </span>
                              <span className="w-7 h-7 rounded-full bg-logo-gold flex items-center justify-center group-hover:bg-logo-black transition-colors shrink-0">
                                <ArrowRight className="w-3.5 h-3.5 text-white" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* Quick Contact Form */}
                <div className="bg-white rounded-2xl p-6 border border-black/6 shadow-sm">
                  <h3 className="font-display text-base font-bold text-jet mb-5 pb-3 border-b border-black/6">
                    Quick Contact
                  </h3>
                  {qcSent ? (
                    <div className="text-center py-6">
                      <CheckCircle className="w-12 h-12 text-logo-gold mx-auto mb-3" />
                      <p className="text-sm font-poppins font-semibold text-jet">Message Sent!</p>
                      <p className="text-xs text-jet/55 mt-1">We'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleQuickContact}>
                      <div>
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          value={qcName}
                          onChange={(e) => setQcName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F4F4F4] text-sm font-poppins focus:outline-none focus:border-logo-gold focus:bg-white transition-colors placeholder:text-jet/40"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          required
                          maxLength={10}
                          pattern="[0-9]{10}"
                          title="Please enter a 10-digit phone number"
                          value={qcPhone}
                          onChange={(e) => {
                            const cleaned = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                            setQcPhone(cleaned);
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F4F4F4] text-sm font-poppins focus:outline-none focus:border-logo-gold focus:bg-white transition-colors placeholder:text-jet/40"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address (optional)"
                          value={qcEmail}
                          onChange={(e) => setQcEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F4F4F4] text-sm font-poppins focus:outline-none focus:border-logo-gold focus:bg-white transition-colors placeholder:text-jet/40"
                        />
                      </div>
                      {qcError && (
                        <p className="text-xs text-red-600 font-poppins">{qcError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={qcSending}
                        className="w-full bg-logo-gold text-logo-black font-poppins font-bold text-sm py-3.5 rounded-xl hover:bg-logo-black hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {qcSending ? 'Sending...' : 'Submit'}
                        {!qcSending && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </form>
                  )}
                </div>

                {/* Recent Articles */}
                <div className="bg-white rounded-2xl p-6 border border-black/6 shadow-sm">
                  <h3 className="font-display text-base font-bold text-jet mb-5 pb-3 border-b border-black/6">
                    Recent Articles
                  </h3>
                  <div className="space-y-5">
                    {recent.map((r) => (
                      <Link key={r.id} to={`/articles/${r.slug}`} className="flex gap-3 group">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-black/6">
                          <img
                            src={r.image}
                            alt={r.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-poppins font-semibold text-jet group-hover:text-logo-gold transition-colors line-clamp-2 mb-1 leading-snug">
                            {r.title}
                          </h4>
                          <span className="text-[10px] font-poppins text-jet/40 flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5 text-logo-gold" />
                            {new Date(r.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link
                    to="/articles"
                    className="mt-6 w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#F4F4F4] border border-black/6 hover:border-logo-gold/40 hover:bg-logo-gold/5 transition-all group"
                  >
                    <span className="text-xs font-poppins font-bold text-jet/70 group-hover:text-jet uppercase tracking-wide">
                      View All Articles
                    </span>
                    <span className="w-7 h-7 rounded-full bg-logo-gold flex items-center justify-center group-hover:bg-logo-black transition-colors shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
