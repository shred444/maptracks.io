"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error" | "unconfigured";

const mountains = [
  { name: "Whistler Blackcomb", location: "British Columbia", code: "WB-50.116" },
  { name: "Jackson Hole", location: "Wyoming", code: "JH-43.588" },
  { name: "Stowe", location: "Vermont", code: "ST-44.530" },
];

function MountainArtwork({ variant = 0 }: { variant?: number }) {
  return (
    <div className={`mountain-art art-${variant}`} role="img" aria-label="Concept MapTracks artwork showing a ski mountain as contour lines with an illuminated activity route">
      <div className="art-grid" />
      <div className="contour contour-a" />
      <div className="contour contour-b" />
      <div className="contour contour-c" />
      <div className="contour contour-d" />
      <div className="route-line"><i /><i /><i /><i /><i /></div>
      <span className="art-coordinate">46°52&apos; N<br />121°43&apos; W</span>
      <span className="art-index">MT / 0{variant + 1}</span>
      <span className="art-name">MOUNTAIN<br />MEMORY</span>
    </div>
  );
}

export default function Home() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function submitCommission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="MapTracks home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          MAPTRACKS
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="button button-small" href="#commission">Start a commission <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span>Connected alpine artwork</span><span>Edition 01 / 2026</span></p>
          <h1 id="hero-title">Your mountain.<br />Your lines.<br /><em>Alive on the wall.</em></h1>
          <p className="hero-deck">A commissioned portrait of the mountain you return to—built as a connected wall piece that turns every Strava day into a new line of light.</p>
          <div className="hero-actions">
            <a className="button" href="#commission">Start a commission <span aria-hidden="true">↗</span></a>
            <span className="price-note"><b>From $499</b><small>Designed to order</small></span>
          </div>
          <dl className="hero-specs">
            <div><dt>INPUT</dt><dd>Your mountain</dd></div>
            <div><dt>FINISH</dt><dd>Your frame color</dd></div>
            <div><dt>SYNC</dt><dd>Strava via QR</dd></div>
          </dl>
        </div>
        <div className="hero-visual">
          <span className="measure measure-top">W / CUSTOM</span>
          <span className="measure measure-side">H / CUSTOM</span>
          <figure className="hero-photo-frame">
            <img
              src="./maptracks-dining-room.png"
              alt="A warm, neatly organized dining room with connected ski mountain artwork framed on the wall"
              width="1536"
              height="1024"
            />
            <figcaption>Connected artwork — shown in place</figcaption>
          </figure>
        </div>
      </section>

      <div className="signal-bar" aria-hidden="true">
        <span>MAP DATA / PERSONAL</span><i />
        <span>FRAME / CUSTOM</span><i />
        <span>ACTIVITY / CONNECTED</span><i />
        <span>OBJECT / ONE OF ONE</span>
      </div>

      <section className="intro section-grid" aria-labelledby="intro-title">
        <p className="section-index">01 — THE OBJECT</p>
        <div>
          <h2 id="intro-title">Not a trail map.<br /><span>A record of belonging.</span></h2>
          <p>MapTracks translates the character of a ski mountain into a precise, made-to-order wall object. The terrain stays constant. Your days on it keep adding the story.</p>
        </div>
        <div className="feature-list">
          <p><b>01</b><span><strong>Designed around one mountain</strong>Contours, scale, and composition are tuned to the place you choose.</span></p>
          <p><b>02</b><span><strong>Finished for your space</strong>Select a border and frame color that fits the room it will live in.</span></p>
          <p><b>03</b><span><strong>Connected after it arrives</strong>Scan the unique QR code to begin the owner activation and Strava connection.</span></p>
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="section-index">02 — FIELD STUDIES</p>
          <h2 id="work-title">Three mountains.<br /><span>Infinite personal lines.</span></h2>
          <p>Illustrative concepts shown for direction only. Every commissioned piece is composed for its owner.</p>
        </div>
        <div className="work-grid">
          {mountains.map((mountain, index) => (
            <article className="work-card" key={mountain.name}>
              <div className="mini-frame"><MountainArtwork variant={index} /></div>
              <div className="work-meta">
                <span>0{index + 1}</span>
                <div><h3>{mountain.name}</h3><p>{mountain.location}</p></div>
                <small>{mountain.code}</small>
              </div>
            </article>
          ))}
        </div>
        <p className="affiliation-note">Concept studies are independent artwork and are not affiliated with or endorsed by the resorts shown.</p>
      </section>

      <section className="process" id="how" aria-labelledby="process-title">
        <div className="process-top">
          <p className="section-index">03 — COMMISSION SEQUENCE</p>
          <h2 id="process-title">From a place you know<br />to an object that knows you.</h2>
        </div>
        <ol className="process-grid">
          <li><span>01</span><div className="process-icon icon-mountain" aria-hidden="true" /><h3>Choose the mountain</h3><p>Tell us the ski mountain you want visualized and where the finished piece will live.</p></li>
          <li><span>02</span><div className="process-icon icon-frame" aria-hidden="true" /><h3>Shape the piece</h3><p>We align the scale, orientation, border, and frame color before the commission moves forward.</p></li>
          <li><span>03</span><div className="process-icon icon-qr" aria-hidden="true" /><h3>Mount & connect</h3><p>After delivery, scan the unique QR code to begin activation and connect your Strava account.</p></li>
        </ol>
        <p className="process-caveat">Activation and Strava connection are completed after delivery and are not part of this inquiry website.</p>
      </section>

      <section className="commission" id="commission" aria-labelledby="commission-title">
        <div className="commission-copy">
          <p className="section-index">04 — START A COMMISSION</p>
          <h2 id="commission-title">Tell us which mountain<br />belongs on your wall.</h2>
          <p>Share the essentials. We’ll follow up personally to discuss dimensions, materials, timing, and a final quote.</p>
          <div className="price-block"><span>COMMISSIONS FROM</span><b>$499</b><small>Final price varies by size, materials, and customization.</small></div>
        </div>
        <form className="commission-form" onSubmit={submitCommission} noValidate>
          <div className="field-row">
            <label>Full name<input name="name" autoComplete="name" required placeholder="Alex Morgan" /></label>
            <label>Email address<input type="email" name="email" autoComplete="email" required placeholder="alex@example.com" /></label>
          </div>
          <label>Ski mountain<input name="skiMountain" required placeholder="e.g. Killington, Big Sky, Palisades Tahoe" /></label>
          <label>Border / frame color<input name="frameColor" required placeholder="e.g. Matte black with cobalt border" /></label>
          <div className="field-row">
            <label>Size or placement <span>(optional)</span><input name="sizePlacement" placeholder="e.g. 36 in wide, above a console" /></label>
            <label>Target timing <span>(optional)</span><input name="targetTiming" placeholder="e.g. Holiday gift, flexible" /></label>
          </div>
          <label>Project details <span>(optional)</span><textarea name="projectDetails" rows={4} placeholder="Tell us what makes this mountain yours." /></label>
          <button className="button submit-button" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send commission request"}<span aria-hidden="true">↗</span>
          </button>
          <div className="form-status" aria-live="polite">
            {status === "success" && <p className="status-success">Request received. We’ll be in touch soon.</p>}
            {status === "error" && <p className="status-error">We couldn’t send your request. Please check your connection and try again.</p>}
            {status === "unconfigured" && <p className="status-error">Inquiries aren’t connected yet. Please check back shortly.</p>}
          </div>
          <small className="privacy-note">Your details are used only to respond to this commission request.</small>
        </form>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <div><p className="section-index">05 — FIELD NOTES</p><h2 id="faq-title">Questions,<br />mapped.</h2></div>
        <div className="faq-list">
          <details><summary>Is the artwork ready-made?</summary><p>No. Each piece is commissioned around a chosen ski mountain, frame direction, and intended space.</p></details>
          <details><summary>How does the Strava connection work?</summary><p>After the finished artwork is delivered and mounted, its owner scans the unique QR code to begin a separate activation and Strava connection flow.</p></details>
          <details><summary>What does the $499 price include?</summary><p>$499 is the starting point. The final quote depends on the selected dimensions, materials, frame, and level of customization.</p></details>
          <details><summary>Can I request any ski mountain?</summary><p>Yes. Tell us the mountain in the inquiry form and we’ll confirm the available mapping and production options.</p></details>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>MAPTRACKS</a>
        <p>Connected mountain artwork.<br />Made one line at a time.</p>
        <div><a href="#work">Work</a><a href="#how">Process</a><a href="#commission">Commission</a></div>
        <small>© 2026 MapTracks. Independent concept site.</small>
      </footer>
    </main>
  );
}
