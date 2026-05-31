import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
  'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=500&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80',
  'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&q=80',
];

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      });

      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: 120 },
          {
            y: -120,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: -120 },
          {
            y: 120,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const col1 = IMAGES.slice(0, 3);
  const col2 = IMAGES.slice(3, 6);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative"
        style={{ minHeight: '300vh', backgroundColor: 'hsl(var(--bg))' }}
      >
        {/* Pinned content layer */}
        <div
          ref={contentRef}
          className="h-screen w-full flex items-center justify-center relative z-10 pointer-events-none"
        >
          <div className="text-center px-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'hsl(var(--stroke))' }} />
              <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'hsl(var(--muted))' }}>
                Explorations
              </span>
              <div className="w-8 h-px" style={{ backgroundColor: 'hsl(var(--stroke))' }} />
            </div>
            <h2 className="text-4xl md:text-6xl font-light mb-4" style={{ color: 'hsl(var(--text))' }}>
              Visual{' '}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>playground</em>
            </h2>
            <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: 'hsl(var(--muted))' }}>
              A curated collection of experimental visual work and creative explorations.
            </p>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full text-sm px-6 py-3 border transition-colors duration-200"
              style={{
                borderColor: 'hsl(var(--stroke))',
                color: 'hsl(var(--text))',
                backgroundColor: 'hsla(var(--surface), 0.8)',
                backdropFilter: 'blur(8px)',
              }}
            >
              View on Dribbble ↗
            </a>
          </div>
        </div>

        {/* Parallax columns */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-full max-w-[1400px] px-6 grid grid-cols-2 gap-12 md:gap-40">
            <div ref={col1Ref} className="flex flex-col gap-6">
              {col1.map((src, i) => (
                <GalleryCard
                  key={i}
                  src={src}
                  rotation={(i - 1) * 2}
                  onClick={() => setLightbox(src)}
                />
              ))}
            </div>
            <div ref={col2Ref} className="flex flex-col gap-6 mt-24">
              {col2.map((src, i) => (
                <GalleryCard
                  key={i}
                  src={src}
                  rotation={(i - 1) * -2}
                  onClick={() => setLightbox(src)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-2xl"
            style={{ maxWidth: '80vw', maxHeight: '80vh' }}
          />
          <button
            className="absolute top-6 right-6 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'hsla(255,255,255,0.1)' }}
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

function GalleryCard({
  src,
  rotation,
  onClick,
}: {
  src: string;
  rotation: number;
  onClick: () => void;
}) {
  return (
    <div
      className="aspect-square max-w-[320px] rounded-2xl overflow-hidden cursor-pointer pointer-events-auto transition-transform duration-300 hover:scale-105"
      style={{
        transform: `rotate(${rotation}deg)`,
        border: '1px solid hsl(var(--stroke))',
      }}
      onClick={onClick}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}
