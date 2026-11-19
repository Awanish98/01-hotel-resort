import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navItems = [
  { href: '#house', label: 'The House' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#dining', label: 'Dining' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const isCompact = window.matchMedia('(max-width: 900px)').matches;
    if (isCompact) firstLinkRef.current?.focus();
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="header-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)} aria-label="Aurelia House — back to top">
          <span className="brand-name">AURELIA</span>
          <span className="brand-sub">HOUSE · DEMO</span>
        </a>

        <nav id="site-navigation" className={`primary-nav${open ? ' is-open' : ''}`} aria-label="Primary">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-enquire" href="#enquiry" onClick={() => setOpen(false)}>
            Enquire <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>

        <a className="header-cta" href="#enquiry">
          Check availability <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-navigation"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
