import { useState } from 'react';

export default function Header({ props }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const rawLinks = props.links ? props.links.split(',').map(s => s.trim()) : ['Home', 'Shop', 'Contact'];
  const links = rawLinks.map(entry => {
    const parts = entry.split('|').map(s => s.trim());
    return { label: parts[0], url: parts[1] || '#' };
  });

  if (props.linkUrls) {
    const urls = props.linkUrls.split(',').map(s => s.trim());
    links.forEach((link, i) => {
      if (urls[i]) link.url = urls[i];
    });
  }

  return (
    <header
      style={{ padding: `${props.padding}px 24px`, backgroundColor: props.bgColor, color: props.textColor }}
      className="w-full relative header-container"
    >
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
          {props.image && <img src={props.image} alt="Logo" className="h-8 w-auto flex-shrink-0" />}
          <span className="text-lg font-bold tracking-[0.2em] uppercase truncate">{props.title || 'TRAFASA'}</span>
        </div>

        {/* Desktop Nav — hidden on small containers */}
        <div className="header-desktop-nav items-center gap-8">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="text-sm tracking-wide hover:opacity-60 transition-opacity whitespace-nowrap"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <svg className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <svg className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="header-hamburger p-1 -mr-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="header-mobile-menu absolute left-0 right-0 top-full z-50 border-t shadow-lg"
          style={{ backgroundColor: props.bgColor, color: props.textColor, borderColor: props.textColor + '15' }}
        >
          <div className="py-4 px-6 flex flex-col gap-1">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-2 text-sm tracking-wide hover:opacity-60 transition-opacity border-b"
                style={{ color: 'inherit', textDecoration: 'none', borderColor: props.textColor + '10' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
