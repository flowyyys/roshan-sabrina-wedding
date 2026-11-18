"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { InvitationData } from "./invitation-types";
import "./christian-scene.css";
import "./hindu-scene.css";

const LIGHTS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 9) % 100}%`,
  top: `${(i * 23 + 13) % 100}%`,
  delay: `${i * -.7}s`,
  duration: `${5 + i % 5}s`,
}));

export function HinduInvitation({ data, initiallyOpened = false }: { data: InvitationData; initiallyOpened?: boolean }) {
  const [opened, setOpened] = useState(initiallyOpened);
  const [countdown, setCountdown] = useState("");
  const basePath = `/invite/${data.accessCode}`;

  useEffect(() => {
    const update = () => {
      const remaining = Math.max(0, new Date(data.date.countdownTarget).getTime() - Date.now());
      setCountdown(`${Math.floor(remaining / 86400000)} days · ${Math.floor(remaining / 3600000) % 24} hours · ${Math.floor(remaining / 60000) % 60} minutes`);
    };
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, [data.date.countdownTarget]);

  return (
    <main className={`christian-world hindu-world ${opened ? "is-open" : ""}`}>
      {!opened && (
        <div className="scene-envelope">
          <span className="envelope-cross" aria-hidden="true">श्री</span>
          <p className="scene-overline">With love & blessings</p>
          <p className="envelope-title">A sacred beginning.<br /><em>A lifetime of love.</em></p>
          <button className="envelope-seal" onClick={() => { window.dispatchEvent(new Event("invitation:open")); setOpened(true); }} aria-label="Open Roshan and Sabrina’s invitation">
            <span>R <i>&</i> S</span>
            <small>Open invitation</small>
            <b aria-hidden="true">↓</b>
          </button>
          <p className="envelope-footnote">Roshan & Sabrina · {data.date.day}.{data.date.month === "February" ? "02" : data.date.month}.{data.date.year}</p>
        </div>
      )}

      <section className="scene-hero" aria-label="Our wedding invitation" inert={!opened}>
        <img className="scene-landscape" src="/hindu-temple-garden.png" alt="The white domed temple from your reference, illustrated at dusk with marigolds and glowing lamps" fetchPriority="high" />
        <div className="scene-sky" aria-hidden="true" />
        <div className="scene-light" aria-hidden="true" />
        <div className="scene-fireflies" aria-hidden="true">
          {LIGHTS.map((light, i) => <span key={i} style={{ left: light.left, top: light.top, animationDelay: light.delay, animationDuration: light.duration }} />)}
        </div>
        <div className="scene-petals" aria-hidden="true">
          {LIGHTS.slice(0, 7).map((light, i) => <span key={i} style={{ left: light.left, animationDelay: `${i * -2.3}s`, animationDuration: `${14 + i}s` }} />)}
        </div>
        <div className="scene-monogram" aria-hidden="true">R<span>&</span>S</div>
        <header className="scene-heading">
          <img className="scene-om" src="/om-mandala.png" alt="Golden Om mandala" />
          
          <p className="scene-overline">|| SHREE KULADEVATHA PRASANA ||</p>
          <h1><span>Roshan</span><em>with</em><span>Sabrina</span></h1>
          <p className="scene-vow">A sacred beginning.<br />A lifetime together.</p>
        </header>
        <div className="scene-date" aria-label={data.date.ariaLabel}>
          <p>We’re getting married</p>
          <strong>{data.date.day} <span>/</span> {data.date.month} <span>/</span> {data.date.year}</strong>
          <span className="scene-city">{data.locations[0]?.time} · {data.locationSummary}</span>
        </div>
        <nav className="scene-dock" aria-label="Invitation navigation">
          <a href="#celebration">The wedding</a>
          <Link href={`${basePath}/rsvp`} className="scene-rsvp">RSVP</Link>
          <Link href={`${basePath}/locations`}>{data.locationLabel}</Link>
        </nav>
      </section>

      <section className="scene-details" id="celebration" inert={!opened} aria-labelledby="celebration-heading">
        <p className="scene-overline">Two families. One beautiful promise.</p>
        <h2 id="celebration-heading">Together in love,<br /><em>surrounded by blessings.</em></h2>
        {data.hostNames && data.hostMessage && (
          <div className="scene-hosts">
            <p>{data.hostNames}</p>
            <span>{data.hostMessage}</span>
          </div>
        )}
        <div className="scene-family">
          <div><h3>Roshan</h3>{data.roshanParentage.map(line => <p key={line}>{line}</p>)}</div>
          <span aria-hidden="true">&</span>
          <div><h3>Sabrina</h3>{data.sabrinaParentage.map(line => <p key={line}>{line}</p>)}</div>
        </div>
        <p className="scene-details-date">{data.date.weekday}, {data.date.day} {data.date.month} {data.date.year}</p>
        <p className="scene-venue">{data.locations[0]?.name}<br />{data.locations[0]?.address}<br />{data.locations[0]?.time}</p>
        <p className="scene-countdown" aria-label="Time until the wedding">{countdown || "A day to remember"}</p>
        <a className="scene-calendar" href={data.calendarUrl} target="_blank" rel="noreferrer">Save the date <span aria-hidden="true">↗</span></a>
        <p className="scene-closing">We can’t wait to celebrate with you.</p>
        <a className="scene-back" href="#top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }}>Back to invitation ↑</a>
      </section>
    </main>
  );
}
