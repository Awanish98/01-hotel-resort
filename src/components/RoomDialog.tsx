import { useEffect, useRef } from 'react';
import { ArrowUpRight, Check, Users, X } from 'lucide-react';
import type { Room } from '../data';

interface RoomDialogProps {
  room: Room | null;
  onClose: () => void;
  onEnquire: (room: Room) => void;
}

export default function RoomDialog({ room, onClose, onEnquire }: RoomDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (room && !dialog.open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      closeButtonRef.current?.focus();
      document.body.classList.add('modal-open');
    } else if (!room && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.classList.remove('modal-open');
      if (!room && previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [room]);

  const requestEnquiry = () => {
    if (!room) return;
    previousFocusRef.current = document.getElementById('enquiry-title');
    dialogRef.current?.close();
    onEnquire(room);
  };

  return (
    <dialog
      ref={dialogRef}
      className="room-dialog"
      aria-labelledby="room-dialog-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      {room && (
        <div className="room-dialog-inner">
          <div className="room-dialog-media">
            <img
              src={room.image}
              alt={room.imageAlt}
              width={room.width}
              height={room.height}
              loading="lazy"
              decoding="async"
            />
            <p className="sample-chip">Sample photography</p>
          </div>

          <div className="room-dialog-body">
            <div className="dialog-topline">
              <p className="eyebrow">{room.categoryLabel} · Demo room</p>
              <button
                ref={closeButtonRef}
                type="button"
                className="dialog-close"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close room details"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <h2 id="room-dialog-title">{room.name}</h2>
            <p className="dialog-tagline">{room.tagline}</p>

            <div className="room-dialog-meta" aria-label="Sample room facts">
              <span>{room.size}</span>
              <span><Users size={15} aria-hidden="true" /> {room.guests}</span>
              <span>{room.bed}</span>
            </div>

            <p className="dialog-description">{room.description}</p>

            <div className="dialog-columns">
              <div>
                <h3>Highlights</h3>
                <ul className="tick-list">
                  {room.highlights.map((item) => (
                    <li key={item}><Check size={15} aria-hidden="true" /> {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Sample inclusions</h3>
                <ul className="tick-list">
                  {room.inclusions.map((item) => (
                    <li key={item}><Check size={15} aria-hidden="true" /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="dialog-rate">
              <div>
                <p className="eyebrow">Illustrative sample rate</p>
                <p className="rate-value">${room.rate}<span> / night</span></p>
                <p className="fine-print">Not a live price, quote or availability. Taxes and conditions are client-supplied.</p>
              </div>
              <button type="button" className="button button-primary" onClick={requestEnquiry}>
                Enquire about this room <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
