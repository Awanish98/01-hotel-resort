import { ArrowDown, ArrowUpRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <img
          src="images/hero-resort.jpg"
          alt="Sample cinematic view of a retreat set among gardens and architecture"
          width={1600}
          height={1067}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content container">
        <p className="eyebrow hero-eyebrow">Aurelia House · Demo hospitality concept</p>
        <h1 id="hero-title">A quieter kind of <em>luxury.</em></h1>
        <p className="hero-lede">
          Suites, gardens and long-table dinners in a place designed to slow the hours.
        </p>
        <div className="hero-actions">
          <a className="button button-light" href="#rooms">
            Explore the rooms <ArrowDown size={17} aria-hidden="true" />
          </a>
          <a className="text-link text-link-light" href="#enquiry">
            Plan a stay <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className="hero-side-caption">Sample property · Sample rates · Sample availability</p>

      <a className="hero-scroll" href="#house">
        <span>Scroll to discover</span>
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}

export function HouseIntro() {
  return (
    <section id="house" className="intro-section" aria-labelledby="house-title">
      <div className="container intro-grid">
        <div className="intro-heading">
          <p className="eyebrow section-label">01 / The house</p>
          <h2 id="house-title">An address for the unhurried.</h2>
        </div>
        <div className="intro-copy">
          <p className="lead">
            Aurelia House is an imagined boutique retreat: a small collection of rooms, a garden
            that invites a second cup of tea, and a dining room where dinner is never rushed.
          </p>
          <p>
            This site is a design demonstration. The photography, rates, schedules, room details
            and availability are sample content — each one is clearly labelled so nothing here can
            be mistaken for a confirmed offer.
          </p>
          <a className="text-link" href="#experiences">
            See the sample rituals <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="container">
        <div className="ornament-rule" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
