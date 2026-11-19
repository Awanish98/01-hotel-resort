import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import type { Room } from '../data';

export type EnquiryPurpose = 'Stay enquiry' | 'Dining reservation' | 'Experiences' | 'Directions' | 'Something else';

export interface EnquiryPrefill {
  id: number;
  room?: string;
  purpose?: EnquiryPurpose;
  note?: string;
}

interface EnquiryFormProps {
  rooms: Room[];
  prefill: EnquiryPrefill | null;
}

type FieldName = 'name' | 'email' | 'checkIn' | 'checkOut' | 'guests';

interface FormValues {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  purpose: EnquiryPurpose;
  message: string;
}

type FieldErrors = Partial<Record<FieldName, string>>;

const purposes: EnquiryPurpose[] = [
  'Stay enquiry',
  'Dining reservation',
  'Experiences',
  'Directions',
  'Something else',
];

function emptyValues(): FormValues {
  return {
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    room: 'No preference',
    purpose: 'Stay enquiry',
    message: '',
  };
}

function localToday() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email, for example name@example.com.';
  }

  if (!values.checkIn) {
    errors.checkIn = 'Choose an arrival date.';
  } else if (values.checkIn < localToday()) {
    errors.checkIn = 'Arrival cannot be in the past.';
  }

  if (!values.checkOut) {
    errors.checkOut = 'Choose a departure date.';
  } else if (values.checkIn && values.checkOut <= values.checkIn) {
    errors.checkOut = 'Departure must be after arrival.';
  }

  const guestCount = Number(values.guests);
  if (!values.guests || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 6) {
    errors.guests = 'Choose between 1 and 6 guests.';
  }

  return errors;
}

export default function EnquiryForm({ rooms, prefill }: EnquiryFormProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (field: string) => `${uid}-${field}`;
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [success, setSuccess] = useState(false);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLSelectElement | null>>>({});

  useEffect(() => {
    if (!prefill) return;
    setValues((current) => ({
      ...current,
      room: prefill.room ?? current.room,
      purpose: prefill.purpose ?? current.purpose,
      message: prefill.note ?? current.message,
    }));
    setSuccess(false);
  }, [prefill]);

  const visibleError = (field: FieldName) =>
    touched[field] || submitAttempted ? errors[field] : undefined;

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    setErrors(validate(next));
  };

  const blur = (field: FieldName) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitAttempted(true);

    const firstInvalid = (['name', 'email', 'checkIn', 'checkOut', 'guests'] as FieldName[]).find(
      (field) => nextErrors[field],
    );
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setSuccess(true);
  };

  const reset = () => {
    setValues(emptyValues());
    setErrors({});
    setTouched({});
    setSubmitAttempted(false);
    setSuccess(false);
    fieldRefs.current.name?.focus();
  };

  if (success) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <p className="eyebrow">Demo confirmation only</p>
        <h3>Demo enquiry received — no real booking/payment is made. Replace this demo flow with your client's confirmed process before launch.</h3>
        <div className="success-summary">
          <p><span>Sample name</span>{values.name}</p>
          <p><span>Sample dates</span>{values.checkIn} → {values.checkOut}</p>
          <p><span>Sample guests</span>{values.guests}</p>
          <p><span>Room interest</span>{values.room}</p>
          <p><span>Enquiry type</span>{values.purpose}</p>
        </div>
        <p className="fine-print">Nothing was transmitted, stored or charged. This panel exists to demonstrate the client-side flow only.</p>
        <button type="button" className="button button-primary" onClick={reset}>
          <RotateCcw size={16} aria-hidden="true" /> Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={id('name')}>Full name <span aria-hidden="true">*</span></label>
          <input
            ref={(element) => { fieldRefs.current.name = element; }}
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            onBlur={() => blur('name')}
            required
            aria-required="true"
            aria-invalid={Boolean(visibleError('name'))}
            aria-describedby={visibleError('name') ? id('name-error') : undefined}
          />
          {visibleError('name') && <p className="field-error" id={id('name-error')}>{visibleError('name')}</p>}
        </div>

        <div className="field">
          <label htmlFor={id('email')}>Email address <span aria-hidden="true">*</span></label>
          <input
            ref={(element) => { fieldRefs.current.email = element; }}
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            onBlur={() => blur('email')}
            required
            aria-required="true"
            aria-invalid={Boolean(visibleError('email'))}
            aria-describedby={visibleError('email') ? id('email-error') : undefined}
          />
          {visibleError('email') && <p className="field-error" id={id('email-error')}>{visibleError('email')}</p>}
        </div>

        <div className="field">
          <label htmlFor={id('checkIn')}>Arrival <span aria-hidden="true">*</span></label>
          <input
            ref={(element) => { fieldRefs.current.checkIn = element; }}
            id={id('checkIn')}
            name="checkIn"
            type="date"
            min={localToday()}
            autoComplete="off"
            value={values.checkIn}
            onChange={(event) => update('checkIn', event.target.value)}
            onBlur={() => blur('checkIn')}
            required
            aria-required="true"
            aria-invalid={Boolean(visibleError('checkIn'))}
            aria-describedby={visibleError('checkIn') ? id('checkIn-error') : undefined}
          />
          {visibleError('checkIn') && <p className="field-error" id={id('checkIn-error')}>{visibleError('checkIn')}</p>}
        </div>

        <div className="field">
          <label htmlFor={id('checkOut')}>Departure <span aria-hidden="true">*</span></label>
          <input
            ref={(element) => { fieldRefs.current.checkOut = element; }}
            id={id('checkOut')}
            name="checkOut"
            type="date"
            min={values.checkIn || localToday()}
            autoComplete="off"
            value={values.checkOut}
            onChange={(event) => update('checkOut', event.target.value)}
            onBlur={() => blur('checkOut')}
            required
            aria-required="true"
            aria-invalid={Boolean(visibleError('checkOut'))}
            aria-describedby={visibleError('checkOut') ? id('checkOut-error') : undefined}
          />
          {visibleError('checkOut') && <p className="field-error" id={id('checkOut-error')}>{visibleError('checkOut')}</p>}
        </div>

        <div className="field">
          <label htmlFor={id('guests')}>Guests <span aria-hidden="true">*</span></label>
          <select
            ref={(element) => { fieldRefs.current.guests = element; }}
            id={id('guests')}
            name="guests"
            autoComplete="off"
            value={values.guests}
            onChange={(event) => update('guests', event.target.value)}
            onBlur={() => blur('guests')}
            required
            aria-required="true"
            aria-invalid={Boolean(visibleError('guests'))}
            aria-describedby={visibleError('guests') ? id('guests-error') : undefined}
          >
            <option value="">Select guests</option>
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <option key={count} value={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
          {visibleError('guests') && <p className="field-error" id={id('guests-error')}>{visibleError('guests')}</p>}
        </div>

        <div className="field">
          <label htmlFor={id('room')}>Room interest</label>
          <select
            id={id('room')}
            name="room"
            autoComplete="off"
            value={values.room}
            onChange={(event) => update('room', event.target.value)}
          >
            <option value="No preference">No preference</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.name}>{room.name}</option>
            ))}
          </select>
        </div>

        <div className="field field-full">
          <label htmlFor={id('purpose')}>What is this about?</label>
          <select
            id={id('purpose')}
            name="purpose"
            autoComplete="off"
            value={values.purpose}
            onChange={(event) => update('purpose', event.target.value as EnquiryPurpose)}
          >
            {purposes.map((purpose) => (
              <option key={purpose} value={purpose}>{purpose}</option>
            ))}
          </select>
        </div>

        <div className="field field-full">
          <label htmlFor={id('message')}>Anything else we should know?</label>
          <textarea
            id={id('message')}
            name="message"
            rows={4}
            autoComplete="off"
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            placeholder="Optional — sample dates and requests are fine."
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="button button-primary">
          Send demo enquiry <ArrowUpRight size={16} aria-hidden="true" />
        </button>
        <p className="fine-print">Demo form only — no data is sent anywhere.</p>
      </div>
    </form>
  );
}
