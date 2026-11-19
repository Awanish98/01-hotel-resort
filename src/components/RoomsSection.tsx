import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { roomFilters, rooms } from '../data';
import type { Room, RoomFilter } from '../data';

interface RoomsSectionProps {
  onViewRoom: (room: Room) => void;
  onEnquireRoom: (room: Room) => void;
  onAskVilla: () => void;
}

export default function RoomsSection({ onViewRoom, onEnquireRoom, onAskVilla }: RoomsSectionProps) {
  const [filter, setFilter] = useState<RoomFilter>('all');
  const visibleRooms = rooms.filter((room) => filter === 'all' || room.category === filter);

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % roomFilters.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + roomFilters.length) % roomFilters.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = roomFilters.length - 1;
    else return;

    event.preventDefault();
    const nextFilter = roomFilters[next].id;
    setFilter(nextFilter);
    document.getElementById(`room-filter-${nextFilter}`)?.focus();
  };

  return (
    <section id="rooms" className="rooms-section" aria-labelledby="rooms-title">
      <div className="container">
        <div className="section-heading rooms-heading">
          <div>
            <p className="eyebrow section-label">02 / Rooms &amp; suites</p>
            <h2 id="rooms-title">Rooms made for staying in.</h2>
          </div>
          <p>
            Five sample room styles, each with its own sense of place. Rates and inclusions below
            are illustrative demo values, not live availability.
          </p>
        </div>

        <div className="filter-bar">
          <div className="filter-tabs" role="tablist" aria-label="Filter sample rooms by category">
            {roomFilters.map((item, index) => {
              const selected = filter === item.id;
              return (
                <button
                  key={item.id}
                  id={`room-filter-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="rooms-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`filter-tab${selected ? ' is-selected' : ''}`}
                  onClick={() => setFilter(item.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="filter-count" aria-live="polite">
            {visibleRooms.length} {visibleRooms.length === 1 ? 'sample room' : 'sample rooms'}
          </p>
        </div>

        <div
          id="rooms-panel"
          role="tabpanel"
          aria-labelledby={`room-filter-${filter}`}
          tabIndex={0}
          className="rooms-panel"
        >
          {visibleRooms.length > 0 ? (
            <div className="room-grid">
              {visibleRooms.map((room) => (
                <article key={room.id} className="room-card">
                  <div className="room-card-media image-fallback">
                    <img
                      src={room.image}
                      alt={room.imageAlt}
                      width={room.width}
                      height={room.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="room-category">{room.categoryLabel}</span>
                  </div>
                  <div className="room-card-body">
                    <p className="card-kicker">Demo room · Sample photography</p>
                    <h3>{room.name}</h3>
                    <p className="room-tagline">{room.tagline}</p>
                    <ul className="room-facts" aria-label="Sample room details">
                      <li>{room.size}</li>
                      <li>{room.guests}</li>
                      <li>{room.bed}</li>
                    </ul>
                    <div className="room-card-footer">
                      <p className="room-rate">
                        <span>From</span>
                        <strong>${room.rate}</strong>
                        <small>/ night · sample rate</small>
                      </p>
                      <button type="button" className="card-details" onClick={() => onViewRoom(room)}>
                        View details <ArrowUpRight size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <button type="button" className="card-enquire" onClick={() => onEnquireRoom(room)}>
                      Enquire about this room <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <p className="eyebrow">No sample inventory</p>
              <h3>No private villas are included in this demo.</h3>
              <p>
                This filter shows how an empty category behaves. A real client can add villa
                inventory — or ask the team about options through the sample enquiry flow.
              </p>
              <div className="empty-actions">
                <button type="button" className="button button-primary" onClick={() => setFilter('all')}>
                  View all sample rooms
                </button>
                <button type="button" className="button button-outline-light" onClick={onAskVilla}>
                  Ask about villas <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="section-footnote">
          Illustrative rates only. No dates are held, no payment is taken and no availability is
          claimed by this demo.
        </p>
      </div>
    </section>
  );
}
