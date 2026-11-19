import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '../data';

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      closeButtonRef.current?.focus();
      document.body.classList.add('modal-open');
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.classList.remove('modal-open');
      if (!isOpen && previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  useEffect(() => {
    if (index === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNavigate((index + 1) % images.length);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onNavigate((index - 1 + images.length) % images.length);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [index, images.length, onNavigate]);

  const current = index === null ? null : images[index];

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Sample gallery lightbox"
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      {current && index !== null && (
        <div className="lightbox-inner">
          <div className="lightbox-topbar">
            <p className="eyebrow">Aurelia House · sample gallery</p>
            <button
              ref={closeButtonRef}
              type="button"
              className="dialog-close lightbox-close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close gallery lightbox"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <div className="lightbox-stage">
            <button
              type="button"
              className="lightbox-arrow"
              onClick={() => onNavigate((index - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              <ChevronLeft size={26} aria-hidden="true" />
            </button>
            <img
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              loading="eager"
              decoding="async"
            />
            <button
              type="button"
              className="lightbox-arrow"
              onClick={() => onNavigate((index + 1) % images.length)}
              aria-label="Next image"
            >
              <ChevronRight size={26} aria-hidden="true" />
            </button>
          </div>

          <div className="lightbox-caption">
            <p aria-live="polite">Image {index + 1} of {images.length}</p>
            <p>{current.caption}</p>
            <p className="lightbox-hint">Use ← → to browse · Esc to close</p>
          </div>
        </div>
      )}
    </dialog>
  );
}
