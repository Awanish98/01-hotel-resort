import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { experiences, galleryImages, rooms } from './data';
import type { Room } from './data';
import Header from './components/Header';
import { Hero, HouseIntro } from './components/Hero';
import RoomsSection from './components/RoomsSection';
import ExperiencesSection from './components/ExperiencesSection';
import {
  DiningSection,
  FaqSection,
  Footer,
  GallerySection,
  LocationSection,
  StickyBookingBar,
} from './components/EditorialSections';
import RoomDialog from './components/RoomDialog';
import Lightbox from './components/Lightbox';
import EnquiryForm from './components/EnquiryForm';
import type { EnquiryPrefill } from './components/EnquiryForm';
import WhatsAppLink from './components/WhatsAppLink';

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [prefill, setPrefill] = useState<EnquiryPrefill | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const prefillCounter = useRef(0);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openEnquiry = useCallback((patch: Partial<Omit<EnquiryPrefill, 'id'>> = {}) => {
    prefillCounter.current += 1;
    setPrefill({ id: prefillCounter.current, ...patch });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('enquiry')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    const heading = document.getElementById('enquiry-title');
    window.setTimeout(() => heading?.focus({ preventScroll: true }), reduceMotion ? 0 : 320);
  }, []);

  const enquireRoom = useCallback(
    (room: Room) => {
      openEnquiry({
        room: room.name,
        purpose: 'Stay enquiry',
        note: `Sample enquiry about ${room.name}. Please confirm real details before launch.`,
      });
    },
    [openEnquiry],
  );

  const enquireExperiences = useCallback(() => {
    const chosen = experiences
      .filter((experience) => selectedExperiences.includes(experience.id))
      .map((experience) => experience.title);
    openEnquiry({
      purpose: 'Experiences',
      note: chosen.length
        ? `Sample interest: ${chosen.join(', ')}.`
        : 'Sample interest in experiences — please suggest options.',
    });
  }, [openEnquiry, selectedExperiences]);

  const toggleExperience = useCallback((id: string) => {
    setSelectedExperiences((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }, []);

  const closeRoom = useCallback(() => setSelectedRoom(null), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navigateLightbox = useCallback((index: number) => setLightboxIndex(index), []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />
        <HouseIntro />

        <RoomsSection
          onViewRoom={setSelectedRoom}
          onEnquireRoom={enquireRoom}
          onAskVilla={() =>
            openEnquiry({
              purpose: 'Stay enquiry',
              note: 'Sample enquiry: please tell us about private villa options.',
            })
          }
        />

        <ExperiencesSection
          selectedIds={selectedExperiences}
          onToggle={toggleExperience}
          onClear={() => setSelectedExperiences([])}
          onEnquire={enquireExperiences}
        />

        <DiningSection
          onReserve={() =>
            openEnquiry({
              purpose: 'Dining reservation',
              note: 'Sample dining enquiry — please confirm the real schedule and menu.',
            })
          }
        />

        <GallerySection onOpenImage={(index) => setLightboxIndex(index)} />

        <LocationSection
          onDirections={() =>
            openEnquiry({
              purpose: 'Directions',
              note: 'Sample request: please send the verified address, map pin and directions.',
            })
          }
        />

        <section id="enquiry" className="enquiry-section" aria-labelledby="enquiry-title">
          <div className="container enquiry-grid">
            <div className="enquiry-intro">
              <p className="eyebrow section-label">08 / Contact &amp; enquiry</p>
              <h2 id="enquiry-title" tabIndex={-1}>Begin with an enquiry.</h2>
              <p className="lead">
                Tell us when you would like to stay and what would make it memorable. This demo
                form validates your details and then shows a confirmation panel — it never sends
                or stores anything.
              </p>

              <div className="contact-channels">
                <p className="eyebrow">Demo contact channels — replace before launch</p>
                <WhatsAppLink className="contact-link">
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>WhatsApp demo link</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </WhatsAppLink>
                <a className="contact-link" href="mailto:hello@example.com" aria-label="Demo email address — replace with client email">
                  <Mail size={18} aria-hidden="true" />
                  <span>hello@example.com</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <p className="fine-print">
                  No real phone number, email address, physical address or live availability is
                  provided in this demo.
                </p>
              </div>
            </div>

            <div className="enquiry-card">
              <div className="enquiry-card-head">
                <p className="eyebrow">Sample booking journey</p>
                <p>Fields marked * are required. Dates and guest counts are validated locally.</p>
              </div>
              <EnquiryForm rooms={rooms} prefill={prefill} />
            </div>
          </div>
        </section>

        <FaqSection />
      </main>

      <Footer />
      <StickyBookingBar visible={stickyVisible} onEnquire={() => openEnquiry()} />

      <RoomDialog room={selectedRoom} onClose={closeRoom} onEnquire={enquireRoom} />
      <Lightbox
        images={galleryImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  );
}
