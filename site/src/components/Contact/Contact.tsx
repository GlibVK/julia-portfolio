import { useState, type FormEvent } from 'react';
import { contactEmail, contactForm, contactIntro, faq } from '../../data/site';
import { Reveal } from '../Reveal/Reveal';
import { SplitText } from '../SplitText/SplitText';
import './Contact.css';

/**
 * Contact section = the live demo's section "05": centred intro, then the FAQ accordion
 * (left) and the message form (right).
 *
 * FAQ: native <details> elements sharing one `name`, so the browser keeps only one open
 * (like the demo's Bootstrap accordion, without its JS); the first one starts open.
 * Form: native validation (required fields, email format); on submit it opens the visitor's
 * email app with a message to `contactEmail` (mailto). Swap this for a form service later.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = `Message from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="contact">
      <Reveal className="contact__intro">
        <p className="contact__eyebrow">{contactIntro.eyebrow}</p>
        <SplitText as="h2" className="contact__heading" text={contactIntro.heading} />
        <p className="contact__text">{contactIntro.text}</p>
      </Reveal>

      <div className="contact__row">
        <Reveal className="contact__faq">
          <h3 className="contact__subheading">{faq.heading}</h3>
          <div className="faq">
            {faq.items.map((item, i) => (
              <details key={item.question} className="faq__item" name="faq" open={i === 0}>
                <summary className="faq__question">
                  {item.question}
                  <svg className="faq__chevron" viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </summary>
                <p className="faq__answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal className="contact__message">
          <h3 className="contact__subheading">{contactForm.heading}</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              className="contact-form__field"
              type="text"
              name="name"
              autoComplete="name"
              placeholder={contactForm.name}
              aria-label={contactForm.name}
              required
            />
            <input
              className="contact-form__field"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={contactForm.email}
              aria-label={contactForm.email}
              required
            />
            <textarea
              className="contact-form__field"
              name="message"
              rows={6}
              placeholder={contactForm.message}
              aria-label={contactForm.message}
              required
            />
            <button type="submit" className="contact-form__submit">
              {contactForm.submit}
            </button>
            <p className="contact-form__status" role="status">
              {sent ? contactForm.sent : ''}
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
