import type { ReactNode } from 'react';

interface WhatsAppLinkProps {
  className?: string;
  children: ReactNode;
}

export default function WhatsAppLink({ className, children }: WhatsAppLinkProps) {
  return (
    <a
      className={className}
      href="https://wa.me/000000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Demo WhatsApp link — replace with client number (opens in a new tab)"
    >
      {children}
    </a>
  );
}
