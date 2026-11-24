import type { CSSProperties } from 'react';
import { experienceIntro, personalInfo, skills } from '../../data/site';
import { Reveal } from '../Reveal/Reveal';
import { SplitText } from '../SplitText/SplitText';
import './ExperienceIntro.css';

/**
 * Experience section ("Experienced Creative mind"), as in the live demo's section "03" (user request 2026-11-24):
 * centred introduction on top, personal info table and skill bars side by side below.
 * The three blocks fade up like the demo's AOS blocks; the bars also fill from the left.
 */
export function ExperienceIntro() {
  return (
    <div className="intro">
      <Reveal className="intro__intro">
        <p className="intro__eyebrow">{experienceIntro.eyebrow}</p>
        <SplitText as="h2" className="intro__heading" text={experienceIntro.heading} />
        <p className="intro__text">{experienceIntro.text}</p>
      </Reveal>

      <div className="intro__row">
        <Reveal className="intro__info">
          <dl className="info">
            {personalInfo.map((row) => (
              <div key={row.label} className="info__row">
                <dt className="info__label">{row.label}</dt>
                <dd className="info__value">
                  {row.href ? <a href={row.href}>{row.value}</a> : row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* The bars fill when this block is revealed (ExperienceIntro.css). */}
        <Reveal className="intro__skills">
          <ul className="skills" aria-label="Skills">
            {skills.map((skill, i) => (
              <li
                key={skill.name}
                className="skills__item"
                style={{ '--skill-value': skill.value, '--skill-index': i } as CSSProperties}
              >
                <span className="skills__header">
                  <span>{skill.name}</span>
                  <span>{skill.value}%</span>
                </span>
                <span className="skills__bar" aria-hidden="true">
                  <span className="skills__fill" />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
