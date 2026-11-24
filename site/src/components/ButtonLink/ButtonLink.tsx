import type { ReactNode } from 'react';
import './ButtonLink.css';

type ButtonLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Black rectangular button that navigates (Figma 1:140 "btn"). Reused in sections 04 and 05. */
export function ButtonLink({ href, className, children }: ButtonLinkProps) {
  return (
    <a href={href} className={['button', className].filter(Boolean).join(' ')}>
      {children}
    </a>
  );
}
