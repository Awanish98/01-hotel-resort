import { useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown, MapPin, MessageCircle, Minus, Plus } from 'lucide-react';
import { faqs, galleryImages } from '../data';
import type { GalleryImage } from '../data';
import WhatsAppLink from './WhatsAppLink';

interface DiningSectionProps {
  onReserve: () => void;
}

export function DiningSection({ onReserve }: DiningSectionProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="dining" className="dining-section" aria-labelledby="dining-title">
      <div className="container">
        <div className="dining-grid">
          <div className="dining-copy">
            <p className="eyebrow section-label">04 / Dining</p>
            <h2 id="dining-title">A table worth dressing for.</h2>
            <p className="lead">
              The Orangery is our sample restaurant: one long table, a short seasonal menu and
              service that takes its time. Everything on this page is illustrative dining copy.
            </p>
            <p>
              Breakfast is quiet and unhurried; dinner is a set sequence built around what is in
              season. Menus, prices and service patterns must be replaced with the client’s actual
              offering before launch.
            </p>

            <div className="demo-schedule">
              <p className="eyebrow">Demo schedule — illustrative only</p>
              <div className="schedule-row"><span>Breakfast</span><span>07:30 – 10:30</span></div>
              <div className="schedule-row"><span>Lunch</span><span>12:30 – 14:30</span></div>
              <div className="schedule-row"><span>Dinner</span><span>18:30 – 21:30</span></div>
            </div>

            <div className="dining-actions">
              <button
                type="button"
                className="button button-primary"
                aria-expanded={menuOpen}
                aria-controls="sample-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? 'Hide sample menu' : 'View sample menu'}
                <ChevronDown size={16} aria-hidden="true" className={menuOpen ? 'is-rotated' : ''} />
              </button>
              <button type="button" className="text-link" onClick={onReserve}>
                Enquire about a table <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="dining-media">
            <div className="image-fallback">
              <img
                src="images/dining.jpg"
                alt="Sample photograph of a dining room laid for a shared meal"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="image-caption">Sample dining photograph · not a real restaurant</p>
          </div>
        </div>

        <div id="sample-menu" className="sample-menu" hidden={!menuOpen}>
          <div className="sample-menu-head">
            <div>
              <p className="eyebrow">Illustrative sample menu</p>
              <h3>Seasonal, simple, served slowly.</h3>
            </div>
            <p className="fine-print">All dishes and prices below are demo content. Nothing can be ordered.</p>
          </div>
          <div className="menu-columns">
            <div>
              <h4>Morning</h4>
              <p><span>Garden toast, preserves</span><span>$14</span></p>
              <p><span>Eggs, herbs, sourdough</span><span>$18</span></p>
              <p><span>Stewed fruit, yoghurt</span><span>$12</span></p>
            </div>
            <div>
              <h4>Evening</h4>
              <p><span>Seasonal soup, bread</span><span>$16</span></p>
              <p><span>Herb-roasted vegetables</span><span>$26</span></p>
              <p><span>Fruit tart, cream</span><span>$14</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface GallerySectionProps {
  onOpenImage: (index: number, opener: HTMLElement) => void;
}

export function GallerySection({ onOpenImage }: GallerySectionProps) {
  return (
    <section id="gallery" className="gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-heading gallery-heading">
          <div>
            <p className="eyebrow section-label">05 / Gallery</p>
            <h2 id="gallery-title">The house, in fragments.</h2>
          </div>
          <p>
            Nine supplied sample photographs. Open any image to browse the full set with keyboard
            controls; captions identify every frame as sample imagery.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image: GalleryImage, index) => (
            <button
              key={image.src}
              type="button"
              className={`gallery-tile gallery-${image.shape} image-fallback`}
              onClick={(event) => onOpenImage(index, event.currentTarget)}
              aria-label={`Open sample photograph ${index + 1}: ${image.caption}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
              <span className="gallery-tile-caption">
                <span>{String(index + 1).padStart(2, '0')}</span>
                {image.caption}
              </span>
            </button>
          ))}
        </div>

        <p className="section-footnote">Lightbox: ← → to browse · Esc to close · all images labelled as sample photography.</p>
      </div>
    </section>
  );
}

interface LocationSectionProps {
  onDirections: () => void;
}

export function LocationSection({ onDirections }: LocationSectionProps) {
  return (
    <section id="location" className="location-section" aria-labelledby="location-title">
      <div className="container location-grid">
        <div className="location-copy">
          <p className="eyebrow section-label">06 / Location</p>
          <h2 id="location-title">Out of the way, never far from everything.</h2>
          <p className="lead">
            The demo places Aurelia House on a quiet hillside, close enough to a town for an
            afternoon out and far enough away for an undisturbed evening.
          </p>
          <p>
            No real address, coordinates or travel times are supplied in this concept. The panel
            opposite is a stylised illustration, not a map, and every distance below is labelled
            as illustrative.
          </p>

          <div className="travel-notes">
            <p className="eyebrow">Illustrative travel notes — replace with verified details</p>
            <p><span>Regional airport</span><span>Approx. 20 min</span></p>
            <p><span>Nearest town</span><span>Approx. 15 min</span></p>
            <p><span>Transfer arrangements</span><span>Client to confirm</span></p>
          </div>

          <button type="button" className="button button-primary" onClick={onDirections}>
            Request full directions <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="map-card" aria-label="Stylised sample location illustration — not a real map">
          <div className="map-grid" aria-hidden="true">
            <span className="map-line map-line-one" />
            <span className="map-line map-line-two" />
            <span className="map-line map-line-three" />
            <span className="map-dot map-dot-one" />
            <span className="map-dot map-dot-two" />
          </div>
          <div className="map-pin">
            <MapPin size={28} aria-hidden="true" />
          </div>
          <div className="map-label">
            <p className="eyebrow">Sample setting</p>
            <p>A quiet hillside — exact address supplied by the client</p>
          </div>
          <p className="map-disclaimer">Illustration only · no live map data</p>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-heading">
          <p className="eyebrow section-label">07 / Good to know</p>
          <h2 id="faq-title">Questions, answered honestly.</h2>
          <p>These answers explain which parts of the site are demo content and which need real client information.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => {
            const expanded = openId === faq.id;
            return (
              <div key={faq.id} className={`faq-item${expanded ? ' is-open' : ''}`}>
                <h3>
                  <button
                    id={`faq-button-${faq.id}`}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${faq.id}`}
                    onClick={() => setOpenId(expanded ? null : faq.id)}
                  >
                    <span>{faq.question}</span>
                    {expanded ? <Minus size={19} aria-hidden="true" /> : <Plus size={19} aria-hidden="true" />}
                  </button>
                </h3>
                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${faq.id}`}
                  hidden={!expanded}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <p className="footer-logo">AURELIA <span>HOUSE</span></p>
          <p>An imagined retreat, built as a demonstration of editorial hospitality design.</p>
          <p className="demo-note">Demo concept — sample information</p>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <ul>
            <li><a href="#house">The House</a></li>
            <li><a href="#rooms">Rooms &amp; suites</a></li>
            <li><a href="#experiences">Experiences</a></li>
            <li><a href="#dining">Dining</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#location">Location</a></li>
            <li><a href="#faq">Good to know</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h2>Enquiries</h2>
          <ul>
            <li><a href="#enquiry">Send a demo enquiry</a></li>
            <li>
              <WhatsAppLink className="footer-link">
                <MessageCircle size={15} aria-hidden="true" /> WhatsApp demo
              </WhatsAppLink>
            </li>
            <li>
              <a href="mailto:hello@example.com" aria-label="Demo email address — replace with client email">
                hello@example.com
              </a>
            </li>
          </ul>
          <p className="fine-print">Placeholder contact details only.</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Aurelia House · Demo concept, not a real business.</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top <ArrowDown size={15} aria-hidden="true" className="back-arrow" />
        </button>
      </div>
    </footer>
  );
}

interface StickyBookingBarProps {
  visible: boolean;
  onEnquire: () => void;
}

export function StickyBookingBar({ visible, onEnquire }: StickyBookingBarProps) {
  if (!visible) return null;

  return (
    <div className="sticky-booking">
      <div className="container sticky-inner">
        <p className="sticky-rate">
          <span>Sample rates from</span>
          <strong>$340</strong>
          <span>/ night · illustrative only</span>
        </p>
        <div className="sticky-actions">
          <WhatsAppLink className="sticky-whatsapp">
            <MessageCircle size={17} aria-hidden="true" />
            <span>WhatsApp demo</span>
          </WhatsAppLink>
          <button type="button" className="button button-brass" onClick={onEnquire}>
            Check availability
          </button>
        </div>
      </div>
    </div>
  );
}
