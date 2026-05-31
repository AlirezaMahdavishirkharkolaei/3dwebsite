import { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientBorderButton } from './SelectedWorks';

const ENTRIES = [
  {
    title: 'The Art of Minimal Design',
    date: 'Mar 12, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
  },
  {
    title: 'Motion Design as Communication',
    date: 'Feb 28, 2026',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=200&q=80',
  },
  {
    title: 'Building Systems That Scale',
    date: 'Feb 10, 2026',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80',
  },
  {
    title: 'Typography and Brand Voice',
    date: 'Jan 24, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=200&q=80',
  },
];

export default function Journal() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'hsl(var(--bg))' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'hsl(var(--stroke))' }} />
              <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'hsl(var(--muted))' }}>
                Journal
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light mb-3" style={{ color: 'hsl(var(--text))' }}>
              Recent{' '}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>thoughts</em>
            </h2>
            <p className="text-sm" style={{ color: 'hsl(var(--muted))' }}>
              Reflections on design, technology, and the creative process.
            </p>
          </div>
          <GradientBorderButton className="hidden md:inline-flex items-center gap-2 rounded-full text-sm px-6 py-3">
            View all <span>→</span>
          </GradientBorderButton>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-3">
          {ENTRIES.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <JournalEntry {...entry} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JournalEntry({
  title,
  date,
  readTime,
  img,
}: {
  title: string;
  date: string;
  readTime: string;
  img: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-6 p-4 rounded-[40px] sm:rounded-full border cursor-pointer transition-all duration-300"
      style={{
        backgroundColor: hovered ? 'hsl(var(--surface))' : 'hsla(var(--surface), 0.3)',
        borderColor: 'hsl(var(--stroke))',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'hsl(var(--text))' }}>
          {title}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
        <span className="text-xs" style={{ color: 'hsl(var(--muted))' }}>
          {readTime}
        </span>
        <span className="text-xs" style={{ color: 'hsl(var(--muted))' }}>
          {date}
        </span>
        <span style={{ color: 'hsl(var(--muted))' }}>→</span>
      </div>
    </div>
  );
}
