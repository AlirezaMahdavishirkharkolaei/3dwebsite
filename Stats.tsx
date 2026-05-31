import { motion } from 'framer-motion';

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '95+', label: 'Projects Done' },
  { value: '200%', label: 'Satisfied Clients' },
];

export default function Stats() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'hsl(var(--bg))' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'hsl(var(--stroke))' }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="p-12 md:p-16 text-center"
              style={{ backgroundColor: 'hsl(var(--bg))' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="text-5xl md:text-7xl mb-3"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  color: 'hsl(var(--text))',
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--muted))' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
