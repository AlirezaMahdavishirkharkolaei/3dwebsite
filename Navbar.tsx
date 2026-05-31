import { useState, useEffect } from 'react';

const NAV_LINKS = ['Home', 'Work', 'Resume'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (link: string) => {
    setActive(link);
    if (link === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link === 'Work') {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className="inline-flex items-center rounded-full border px-2 py-2 transition-shadow duration-300"
        style={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'hsl(var(--surface))',
          borderColor: 'rgba(255,255,255,0.1)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav('Home')}
          className="relative w-9 h-9 rounded-full flex items-center justify-center group transition-transform duration-200 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #89AACC 0%, #4E85BF 100%)',
            padding: '1.5px',
          }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'hsl(var(--bg))' }}
          >
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: '13px',
                color: 'hsl(var(--text))',
              }}
            >
              JA
            </span>
          </div>
        </button>

        {/* Divider */}
        <div
          className="hidden sm:block w-px h-5 mx-1"
          style={{ backgroundColor: 'hsl(var(--stroke))' }}
        />

        {/* Nav links */}
        {NAV_LINKS.map(link => (
          <button
            key={link}
            onClick={() => handleNav(link)}
            className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200"
            style={{
              color: active === link ? 'hsl(var(--text))' : 'hsl(var(--muted))',
              backgroundColor: active === link ? 'hsla(var(--stroke), 0.5)' : 'transparent',
            }}
            onMouseEnter={e => {
              if (active !== link) {
                (e.currentTarget as HTMLElement).style.color = 'hsl(var(--text))';
                (e.currentTarget as HTMLElement).style.backgroundColor = 'hsla(var(--stroke), 0.5)';
              }
            }}
            onMouseLeave={e => {
              if (active !== link) {
                (e.currentTarget as HTMLElement).style.color = 'hsl(var(--muted))';
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }
            }}
          >
            {link}
          </button>
        ))}

        {/* Divider */}
        <div
          className="hidden sm:block w-px h-5 mx-1"
          style={{ backgroundColor: 'hsl(var(--stroke))' }}
        />

        {/* Say hi button */}
        <div className="relative group">
          <span
            className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
          />
          <a
            href="mailto:hello@michaelsmith.com"
            className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 transition-colors duration-200"
            style={{
              backgroundColor: 'hsl(var(--surface))',
              backdropFilter: 'blur(12px)',
              color: 'hsl(var(--text))',
            }}
          >
            Say hi <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
