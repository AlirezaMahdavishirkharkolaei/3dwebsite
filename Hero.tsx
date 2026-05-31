import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import HlsVideo from './HlsVideo';

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
const ROLES = ['Creative', 'Fullstack', 'Founder', 'Scholar'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
        '-=0.8'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      id="home"
    >
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo
          src={HLS_SRC}
          className="absolute min-w-full min-h-full object-cover"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to top, hsl(var(--bg)), transparent)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p
          className="blur-in text-xs uppercase mb-8 tracking-[0.3em]"
          style={{ color: 'hsl(var(--muted))' }}
        >
          COLLECTION '26
        </p>

        {/* Name */}
        <h1
          className="name-reveal text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-6"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            color: 'hsl(var(--text))',
          }}
        >
          Michael Smith
        </h1>

        {/* Role line */}
        <p
          className="blur-in text-sm md:text-base mb-4"
          style={{ color: 'hsl(var(--muted))' }}
        >
          A{' '}
          <span
            key={roleIndex}
            className="animate-role-fade-in inline-block"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              color: 'hsl(var(--text))',
            }}
          >
            {ROLES[roleIndex]}
          </span>{' '}
          lives in Chicago.
        </p>

        {/* Description */}
        <p
          className="blur-in text-sm md:text-base max-w-md mx-auto mb-12"
          style={{ color: 'hsl(var(--muted))' }}
        >
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTAs */}
        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          <CTAButton
            href="#work"
            variant="solid"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See Works
          </CTAButton>
          <CTAButton
            href="mailto:hello@michaelsmith.com"
            variant="outline"
          >
            Reach out...
          </CTAButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: 'hsl(var(--muted))' }}
        >
          SCROLL
        </span>
        <div className="relative w-px h-10 overflow-hidden" style={{ backgroundColor: 'hsl(var(--stroke))' }}>
          <div
            className="animate-scroll-down absolute top-0 left-0 w-full h-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, #89AACC, transparent)' }}
          />
        </div>
      </div>
    </section>
  );
}

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant: 'solid' | 'outline';
  onClick?: () => void;
}

function CTAButton({ children, href, variant, onClick }: CTAButtonProps) {
  const [hovered, setHovered] = useState(false);

  const base = 'relative rounded-full text-sm px-7 py-3.5 transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer';

  const solidStyle: React.CSSProperties = hovered
    ? {
        backgroundColor: 'hsl(var(--bg))',
        color: 'hsl(var(--text))',
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
      }
    : {
        backgroundColor: 'hsl(var(--text))',
        color: 'hsl(var(--bg))',
        border: '2px solid transparent',
      };

  const outlineStyle: React.CSSProperties = hovered
    ? {
        backgroundColor: 'hsl(var(--bg))',
        color: 'hsl(var(--text))',
        border: '2px solid transparent',
      }
    : {
        backgroundColor: 'hsl(var(--bg))',
        color: 'hsl(var(--text))',
        border: `2px solid hsl(var(--stroke))`,
      };

  return (
    <div className="relative group" style={{ borderRadius: '999px' }}>
      {hovered && (
        <span
          className="absolute rounded-full"
          style={{
            inset: '-2px',
            background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            zIndex: 0,
          }}
        />
      )}
      <a
        href={href}
        className={base}
        style={{
          ...(variant === 'solid' ? solidStyle : outlineStyle),
          position: 'relative',
          zIndex: 1,
          display: 'inline-block',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        {children}
      </a>
    </div>
  );
}
