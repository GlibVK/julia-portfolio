import type { SocialLink } from '../../data/site';
import './SocialLinks.css';

type SocialLinksProps = { links: readonly SocialLink[] };

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <ul className="social-links">
      {links.map((link) => (
        <li key={link.name}>
          <a
            className="social-links__link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.name} (opens in a new tab)`}
          >
            <img src={link.icon} alt="" width={26} height={26} />
          </a>
        </li>
      ))}
    </ul>
  );
}
