import { biodata } from '../../data/site';
import { Reveal } from '../Reveal/Reveal';
import { SplitText } from '../SplitText/SplitText';
import './Biodata.css';

/** Groups per row: Education + Experiences, Interests + References (demo layout). */
const rows = [biodata.groups.slice(0, 2), biodata.groups.slice(2, 4)];

/**
 * About section, as in the live demo's section "02" ("BIODATA"): a 2x2 grid of headed groups,
 * each with two dated entries. As in the demo, each row fades up, and inside it the entries
 * fade up 0 / 100 / 200 / 300ms apart (left column first); headings slide up letter by letter.
 */
export function Biodata() {
  return (
    <div className="biodata">
      {rows.map((row, r) => (
        <Reveal key={r} className="biodata__row">
          {row.map((group, g) => (
            <div key={group.heading} className="biodata__group">
              {r === 0 && g === 0 && <p className="biodata__eyebrow">{biodata.eyebrow}</p>}
              <SplitText as="h2" className="biodata__heading" text={group.heading} />
              {group.entries.map((entry, e) => (
                <Reveal key={entry.title + e} className="biodata__entry" delay={(g * 2 + e) * 100}>
                  <p className="biodata__date">{entry.date}</p>
                  <h3 className="biodata__title">{entry.title}</h3>
                  <p className="biodata__text">{entry.text}</p>
                </Reveal>
              ))}
            </div>
          ))}
        </Reveal>
      ))}
    </div>
  );
}
