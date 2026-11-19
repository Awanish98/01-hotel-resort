# AURELIA HOUSE — luxury hotel & resort website demo

A single-page, client-showcase-ready demo for an invented boutique retreat. It is a **design demonstration only**: every rate, room detail, schedule, photograph caption and availability statement is labelled as sample content. No real business, booking, payment or enquiry endpoint is represented.

## Design system

- **Brand story:** an imagined hillside retreat built around slow mornings, a garden, a shared dining table and generous quiet. Copy is editorial rather than transactional.
- **Palette:** warm ivory `#F6F1E7` and paper `#FCFAF5`, deep forest `#14392F` / `#0D261F`, muted brass `#A98A4F` / `#D8BD83`, error `#8E2F24`. Small text uses darker brass for AA contrast.
- **Typography:** Cormorant Garamond for display headings and rates; Manrope for navigation, body copy, labels and buttons. Fonts are loaded from the links already in `index.html`.
- **Grid & spacing:** 4/8/12/16/24/32/48/64/96/128 px scale; `container` uses fluid gutters; editorial two-column rhythms break to a single column on smaller screens.
- **Shape & depth:** sharp 2 px corners, hairline rules, one offset brass frame around the dining image, restrained card shadows, no rounded "app card" language.
- **Motion:** transform/opacity only, 240–350 ms with an ease-out curve. `prefers-reduced-motion: reduce` disables animations and smooth scrolling.
- **Imagery:** the nine supplied local JPEGs in `public/images`, always with descriptive sample-labelled alt text, explicit dimensions, gradient fallbacks, eager hero loading and lazy loading below the fold. No remote images and no generated imagery.

## Sections and interactions

| Area | What works |
| --- | --- |
| Header | Fixed responsive header; mobile menu with `aria-expanded`/`aria-controls`, Escape and outside-click close, focus return to the toggle, anchor scrolling. |
| Hero / The House | Full-bleed editorial hero with vertical side caption, two working CTAs, scroll cue and a demo disclosure. |
| Rooms & suites | Five sample rooms; category filter tabs with roving keyboard focus, visible selected state, live result count and a genuine empty state for "Private villas". Each card opens a focus-managed room-detail dialog or prefills the enquiry. |
| Experiences | Four sample rituals with toggle buttons (`aria-pressed`), a live sample-plan count, clear action and enquiry prefill. |
| Dining | Sample schedule, accessible show/hide sample menu with illustrative prices, and a table-enquiry CTA. |
| Gallery | Nine-image tiled gallery; native-modal lightbox with labelled close button, backdrop, alt/caption, image counter, arrow-key navigation, Escape and focus restoration. |
| Location | Stylised CSS map illustration (not a live map), clearly labelled illustrative travel notes and a directions enquiry CTA. |
| Contact & enquiry | Controlled form with visible labels, autocomplete, inline blur/submit validation, `aria-invalid`/`aria-describedby`, first-invalid-field focus, and an exact demo success panel with a "Send another enquiry" reset. Nothing is transmitted or stored. |
| FAQ | Five-question accordion with `aria-expanded`, labelled regions and hidden panels. |
| Sticky CTA | Appears after scrolling past the hero; sample rate disclosure, working availability CTA and a documented WhatsApp placeholder. |
| Footer | Section links, demo contact channels, demo notice and a working back-to-top button. |

Keyboard users can operate all controls. Dialogs use native `<dialog>` modality for focus trapping, with explicit focus restoration; headings are labelled and the page has one `h1`, landmarks and a skip link.

## Commands

Run from `P:\Demo_websites\01-hotel-resort`:

```bash
npm install
npm run dev       # local Vite server
npm run typecheck # tsc --noEmit (also used as lint)
npm run build     # typecheck + production build
npm run preview   # serve the production build locally
```

## Deployment

The output of `npm run build` is a fully static site in `dist/`. Deploy that directory to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, nginx, S3/CloudFront). No environment variables, server, database or API keys are required. If hosting under a subpath, set Vite's `base` option and keep `/images/...` references relative to that deployment path.

## Sample-data disclosure

The site **never** claims real availability, prices, reviews, ratings, awards, credentials, addresses or business facts. The success panel states: "Demo enquiry received — no real booking/payment is made. Replace this demo flow with your client's confirmed process before launch." The footer carries "Demo concept — sample information".

## Placeholders a real client must replace

1. **Photography:** all nine files in `public/images/` are supplied samples; replace with licensed property photography and update alt/caption text in `src/data.ts`, `src/components/Hero.tsx` and `src/components/EditorialSections.tsx`.
2. **Brand/address:** the invented name AURELIA HOUSE, the "quiet hillside" location copy, and all illustrative travel times/directions in `src/components/EditorialSections.tsx`.
3. **Prices & rooms:** every `$` rate, room size, guest count, bed type, inclusion, highlight and "Private villas" empty state in `src/data.ts` and the sticky bar copy.
4. **Dining:** restaurant name The Orangery, demo service times, all menu dishes and prices in `src/components/EditorialSections.tsx`.
5. **Contact:** `hello@example.com` in `src/App.tsx` and `src/components/EditorialSections.tsx`.
6. **WhatsApp:** `https://wa.me/000000000000` in `src/components/WhatsAppLink.tsx` — documented in the UI as "Demo WhatsApp link — replace with client number". No real phone number is supplied.
7. **Booking flow:** replace the local-only `EnquiryForm` success panel with the client's confirmed reservation process, including any real availability, payment, privacy and consent requirements.
8. **SEO:** update `index.html` title, description and Open Graph image for the real property. No structured data is included because no real business facts are available.

## Stack

React 19, TypeScript 5.9, Vite 7, `lucide-react`, hand-written CSS with design tokens. No Tailwind, animation library, analytics, tracking or network form submission.

The dev dependency `rollup` is aliased to `@rollup/wasm-node@4.68.7`. This environment blocks native `.node` bindings, so the WASM build is used for `vite build`; it is a drop-in build-time replacement and does not change the shipped site or runtime bundle.
