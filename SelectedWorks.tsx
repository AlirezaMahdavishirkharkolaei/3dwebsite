import { useState } from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  {
    title: 'Automotive Motion',
    cols: 7,
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80',
  },
  {
    title: 'Urban Architecture',
    cols: 5,
    aspect: 'aspect-[3/4]',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
  },
  {
    title: 'Human Perspective',
    cols: 5,
    aspect: 'aspect-[3/4]',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80',
  },
  {
    title: 'Brand Identity',
    cols: 7,
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut' as const },
  },
};

export default function SelectedWorks() {
  return (
    <section id="work" className="py-12 md:py-16" style={{ backgroundColor: 'hsl(var(--bg))' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'hsl(var(--stroke))' }} />
              <span
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: 'hsl(var(--muted))' }}
              >
                Selected Work
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-light mb-3"
              style={{ color: 'hsl(var(--text))' }}
            >
              Featured{' '}
              <em
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                }}
              >
                projects
              </em>
            </h2>
            <p className="text-sm" style={{ color: 'hsl(var(--muted))' }}>
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <GradientBorderButton className="hidden md:inline-flex items-center gap-2 rounded-full text-sm px-6 py-3">
            View all work <span>→</span>
          </GradientBorderButton>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              className={`md:col-span-${p.cols}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  aspect,
  img,
}: {
  title: string;
  aspect: string;
  img: string;
  cols: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border cursor-pointer group ${aspect}`}
      style={{
        backgroundColor: 'hsl(var(--surface))',
        borderColor: 'hsl(var(--stroke))',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
      />

      {/* Halftone */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300 flex items-end p-6"
        style={{
          backgroundColor: 'hsla(var(--bg), 0.7)',
          backdropFilter: hovered ? 'blur(8px)' : 'blur(0px)',
          opacity: hovered ? 1 : 0,
        }}
      >
        {/* Hover label pill */}
        <div className="relative">
          <span
            className="absolute rounded-full"
            style={{
              inset: '-1px',
              background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            }}
          />
          <div
            className="relative rounded-full px-4 py-2 text-sm"
            style={{ backgroundColor: 'white', color: '#000' }}
          >
            View —{' '}
            <em
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
              }}
            >
              {title}
            </em>
          </div>
        </div>
      </div>
    </div>
  );
}

function GradientBorderButton({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative"
      style={{ borderRadius: '999px', display: 'inline-block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span
          className="absolute rounded-full"
          style={{
            inset: '-1px',
            background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
          }}
        />
      )}
      <div
        className={`relative ${className}`}
        style={{
          backgroundColor: 'hsl(var(--surface))',
          color: 'hsl(var(--text))',
          border: hovered ? 'none' : `1px solid hsl(var(--stroke))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export { GradientBorderButton };
