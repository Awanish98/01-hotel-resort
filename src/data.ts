export type RoomCategory = 'suites' | 'garden' | 'poolside' | 'villas';
export type RoomFilter = 'all' | RoomCategory;

export interface Room {
  id: string;
  name: string;
  category: Exclude<RoomCategory, 'villas'>;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  size: string;
  guests: string;
  bed: string;
  rate: number;
  tagline: string;
  description: string;
  highlights: string[];
  inclusions: string[];
}

export const rooms: Room[] = [
  {
    id: 'aurelia-suite',
    name: 'The Aurelia Suite',
    category: 'suites',
    categoryLabel: 'Suite',
    image: 'images/hero-suite.jpg',
    imageAlt: 'Sample photograph of a warm, light-filled suite with a soft bed and lounge',
    width: 1800,
    height: 1200,
    size: '68 m²',
    guests: '2 guests',
    bed: 'King bed + daybed',
    rate: 540,
    tagline: 'A corner suite for slow mornings and late conversations.',
    description:
      'The most generous of our sample suites: a quiet sitting room, a deep soaking bath and a terrace positioned for the first warmth of the day. Every finish is imagined for the demo — materials and layout are yours to define with the client.',
    highlights: ['Private sitting room', 'Soaking bath', 'Terrace doorway', 'Garden-facing aspect'],
    inclusions: ['Daily housekeeping (sample)', 'Breakfast for two (sample)', 'Garden access (sample)', 'Wi-Fi (sample)'],
  },
  {
    id: 'garden-terrace',
    name: 'Garden Terrace Room',
    category: 'garden',
    categoryLabel: 'Garden room',
    image: 'images/room-terrace.jpg',
    imageAlt: 'Sample photograph of a guest room opening onto a furnished terrace',
    width: 1100,
    height: 825,
    size: '46 m²',
    guests: '2 guests',
    bed: 'King bed',
    rate: 420,
    tagline: 'Step outside without ever leaving the room behind.',
    description:
      'A calm, low-slung room with a terrace of its own. In this demo concept it is the room for readers, early risers and anyone who would rather take coffee outdoors than in a lobby.',
    highlights: ['Private terrace', 'Rainfall shower', 'Writing desk', 'Garden outlook'],
    inclusions: ['Daily housekeeping (sample)', 'Breakfast for two (sample)', 'Wi-Fi (sample)'],
  },
  {
    id: 'poolside-pavilion',
    name: 'Poolside Pavilion',
    category: 'poolside',
    categoryLabel: 'Poolside room',
    image: 'images/room-pool.jpg',
    imageAlt: 'Sample photograph of a pavilion beside a still swimming pool',
    width: 1100,
    height: 733,
    size: '54 m²',
    guests: '2 guests',
    bed: 'King bed + loungers',
    rate: 480,
    tagline: 'A few unhurried steps from the water.',
    description:
      'An airy pavilion with an outdoor lounge and a direct pool connection. Distances, access rules and safety details are illustrative here and must be confirmed before launch.',
    highlights: ['Pool-edge position', 'Outdoor loungers', 'Walk-in shower', 'Evening lighting'],
    inclusions: ['Pool access (sample)', 'Breakfast for two (sample)', 'Towels (sample)', 'Wi-Fi (sample)'],
  },
  {
    id: 'deluxe-room',
    name: 'The Deluxe Room',
    category: 'garden',
    categoryLabel: 'Garden room',
    image: 'images/room-deluxe.jpg',
    imageAlt: 'Sample photograph of a restrained, contemporary hotel bedroom',
    width: 1100,
    height: 733,
    size: '38 m²',
    guests: '2 guests',
    bed: 'Queen bed',
    rate: 340,
    tagline: 'Everything considered, nothing excessive.',
    description:
      'A compact room with a generous sense of proportion. The sample scheme pairs soft textiles with dark timber and a single piece of art — a useful starting point for the client’s own interiors.',
    highlights: ['Garden aspect', 'Built-in wardrobe', 'Walk-in shower', 'Reading chair'],
    inclusions: ['Daily housekeeping (sample)', 'Wi-Fi (sample)'],
  },
  {
    id: 'grand-suite',
    name: 'The Grand Suite',
    category: 'suites',
    categoryLabel: 'Suite',
    image: 'images/detail.jpg',
    imageAlt: 'Sample close-up photograph of layered textiles and details in a hotel suite',
    width: 1000,
    height: 680,
    size: '84 m²',
    guests: '3 guests',
    bed: 'King bed + sofa bed',
    rate: 720,
    tagline: 'The long-stay suite, with room to gather.',
    description:
      'A larger sample suite for guests who want a separate lounge and a table worth lingering at. The third-guest arrangement, sofa bed and all inclusions are demo details only.',
    highlights: ['Separate lounge', 'Dining table for four', 'Dual vanity', 'Walk-in wardrobe'],
    inclusions: ['Breakfast for three (sample)', 'Daily housekeeping (sample)', 'Lounge access (sample)', 'Wi-Fi (sample)'],
  },
];

export const roomFilters: { id: RoomFilter; label: string }[] = [
  { id: 'all', label: 'All stays' },
  { id: 'suites', label: 'Suites' },
  { id: 'garden', label: 'Garden rooms' },
  { id: 'poolside', label: 'Poolside' },
  { id: 'villas', label: 'Private villas' },
];

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  shape: 'wide' | 'tall' | 'standard';
}

export const galleryImages: GalleryImage[] = [
  {
    src: 'images/hero-resort.jpg',
    alt: 'Sample wide view of the retreat among its grounds',
    caption: 'The approach — sample resort photograph',
    width: 1600,
    height: 1067,
    shape: 'wide',
  },
  {
    src: 'images/garden.jpg',
    alt: 'Sample photograph of a planted garden path',
    caption: 'The garden walk — sample photograph',
    width: 1000,
    height: 1500,
    shape: 'tall',
  },
  {
    src: 'images/hero-suite.jpg',
    alt: 'Sample photograph of a sunlit suite interior',
    caption: 'A suite in daylight — sample photograph',
    width: 1800,
    height: 1200,
    shape: 'standard',
  },
  {
    src: 'images/dining.jpg',
    alt: 'Sample photograph of a dining room laid for a meal',
    caption: 'The long table — sample photograph',
    width: 1200,
    height: 800,
    shape: 'standard',
  },
  {
    src: 'images/spa.jpg',
    alt: 'Sample photograph of a calm treatment or relaxation space',
    caption: 'The stillness room — sample photograph',
    width: 1000,
    height: 667,
    shape: 'standard',
  },
  {
    src: 'images/room-pool.jpg',
    alt: 'Sample photograph of a pavilion beside a pool',
    caption: 'Poolside — sample photograph',
    width: 1100,
    height: 733,
    shape: 'standard',
  },
  {
    src: 'images/room-terrace.jpg',
    alt: 'Sample photograph of a room terrace with seating',
    caption: 'A private terrace — sample photograph',
    width: 1100,
    height: 825,
    shape: 'wide',
  },
  {
    src: 'images/room-deluxe.jpg',
    alt: 'Sample photograph of a contemporary guest bedroom',
    caption: 'Guest room detail — sample photograph',
    width: 1100,
    height: 733,
    shape: 'standard',
  },
  {
    src: 'images/detail.jpg',
    alt: 'Sample close-up of textiles and finishes in a suite',
    caption: 'Materials and quiet detail — sample photograph',
    width: 1000,
    height: 680,
    shape: 'standard',
  },
];

export interface Experience {
  id: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
}

export const experiences: Experience[] = [
  {
    id: 'stillness',
    title: 'The Stillness Ritual',
    kicker: '01 / Spa',
    description: 'A slow sample treatment sequence built around warmth, quiet and unhurried time. Treatment names and durations are for demonstration only.',
    image: 'images/spa.jpg',
    imageAlt: 'Sample photograph of a serene treatment space',
    width: 1000,
    height: 667,
  },
  {
    id: 'garden-light',
    title: 'Garden at First Light',
    kicker: '02 / Outdoors',
    description: 'An early walk through the sample gardens, followed by tea outdoors. Routes, timings and planting are illustrative and should be replaced with client detail.',
    image: 'images/garden.jpg',
    imageAlt: 'Sample photograph of a garden pathway at the retreat',
    width: 1000,
    height: 1500,
  },
  {
    id: 'long-table',
    title: 'The Long Table',
    kicker: '03 / Dining',
    description: 'A seasonal sample menu served at a shared table. Dishes, prices and service times are illustrative only — never presented as a real restaurant offering.',
    image: 'images/dining.jpg',
    imageAlt: 'Sample photograph of a dining table prepared for guests',
    width: 1200,
    height: 800,
  },
  {
    id: 'suite-evening',
    title: 'An Evening In',
    kicker: '04 / In-room',
    description: 'A sample in-room evening: a bath drawn early, a nightcap and no schedule at all. Any added amenities must be confirmed with the client before launch.',
    image: 'images/detail.jpg',
    imageAlt: 'Sample close-up of layered textiles in a suite',
    width: 1000,
    height: 680,
  },
];

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    id: 'faq-rates',
    question: 'Are the room rates real?',
    answer:
      'No. Every nightly rate on this site is an illustrative sample number used to show the design of the booking journey. The client must supply confirmed pricing, taxes and seasonal rules before this demo goes live.',
  },
  {
    id: 'faq-book',
    question: 'Can I complete a booking here?',
    answer:
      'No reservation or payment is processed. The enquiry form validates your input and then displays a demo confirmation only. Replace it with the client’s confirmed booking process before launch.',
  },
  {
    id: 'faq-photos',
    question: 'Do the photographs show the actual property?',
    answer:
      'The site uses the supplied sample photography to demonstrate art direction. Captions and alt text label it as sample imagery; the client should replace it with licensed photography of the real property.',
  },
  {
    id: 'faq-inclusions',
    question: 'What is included in a stay?',
    answer:
      'The inclusions listed with each room are sample content. Meals, housekeeping, pool and garden access must all be verified by the client, including any conditions or exclusions.',
  },
  {
    id: 'faq-directions',
    question: 'How do I get exact directions and contact details?',
    answer:
      'There is no real address or map pin in this demo. Use “Request full directions” in the enquiry form to see the sample flow, then replace the placeholder contact block with the client’s verified details.',
  },
];
