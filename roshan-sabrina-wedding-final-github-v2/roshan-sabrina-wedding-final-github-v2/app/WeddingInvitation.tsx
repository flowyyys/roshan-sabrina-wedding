"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BackgroundMusic } from "./BackgroundMusic";
import type { LandingInvitationData } from "./invitation-types";

const PETALS = [
  ["10%", "12px", "13s", "-2s", "26px"],
  ["24%", "9px", "17s", "-8s", "-30px"],
  ["43%", "11px", "15s", "-5s", "34px"],
  ["67%", "10px", "18s", "-11s", "-28px"],
  ["84%", "13px", "14s", "-4s", "24px"],
];

function getCountdown(target: string) {
  const distance = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance / 3_600_000) % 24);
  const minutes = Math.floor((distance / 60_000) % 60);
  return `${days}d · ${hours}h · ${minutes}m`;
}

export function WeddingInvitation({
  data,
}: {
  data: LandingInvitationData;
}) {
  const [opening, setOpening] = useState(true);
  const [countdown, setCountdown] = useState("A day to remember");
  const basePath = `/invite/${data.accessCode}`;

  useEffect(() => {
    setCountdown(getCountdown(data.date.countdownTarget));
    const openingTimer = window.setTimeout(() => setOpening(false), 1050);
    const countdownTimer = window.setInterval(
      () => setCountdown(getCountdown(data.date.countdownTarget)),
      60_000,
    );
    return () => {
      window.clearTimeout(openingTimer);
      window.clearInterval(countdownTimer);
    };
  }, [data.date.countdownTarget]);

  return (
    <main className={`invite-screen invite-screen--${data.theme}`}>
      <div className={`opening ${opening ? "" : "is-finished"}`}>
        <div className="opening__monogram" aria-label="Roshan with Sabrina">
          R·S
        </div>
      </div>

      <img
        className="invite-screen__art"
        src={data.artUrl}
        alt=""
        fetchPriority="high"
      />
      <div className="invite-screen__wash" aria-hidden="true" />

      {data.theme === "christian" ? (
        <div className="petals" aria-hidden="true">
          {PETALS.map(([left, size, duration, delay, drift], index) => (
            <span
              className="petal"
              key={`${left}-${index}`}
              style={
                {
                  "--left": left,
                  "--size": size,
                  "--duration": duration,
                  "--delay": delay,
                  "--drift": drift,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ) : (
        <div className="peacock-glints" aria-hidden="true">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
        </div>
      )}

      <article className="invite-card" aria-labelledby="couple-names">
        {data.theme === "hindu" ? (
          <img
            className="ganesha-motif"
            src="/ganesha-blessing.png"
            alt="Lord Ganesha surrounded by marigolds and jasmine"
          />
        ) : (
          <img
            className="jesus-motif"
            src="/jesus-blessing.png"
            alt="Jesus surrounded by white lilies"
          />
        )}
        {data.hostNames && data.hostMessage ? (
          <div className="groom-host-invitation">
            <strong>{data.hostNames}</strong>
            <span>{data.hostMessage}</span>
          </div>
        ) : (
          <>
            <p className="invite-eyebrow">{data.eyebrow}</p>
            <p className="invite-kicker">You are invited to celebrate</p>
          </>
        )}

        <h1
          className={`invite-names invite-names--${data.lineageStyle}`}
          id="couple-names"
        >
          <span className="invite-person">
            <b>Roshan</b>
            <small className="invite-parentage">
              {data.roshanParentage.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </small>
          </span>
          <i>{data.theme === "christian" ? "weds" : "with"}</i>
          <span className="invite-person">
            <b>Sabrina</b>
            <small className="invite-parentage">
              {data.sabrinaParentage.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </small>
          </span>
        </h1>

        {data.invitationLine ? (
          <p className="invite-line">{data.invitationLine}</p>
        ) : null}

        <div className="invite-date" aria-label={data.date.ariaLabel}>
          <span>{data.date.weekday}</span>
          <strong>{data.date.day}</strong>
          <span>
            {data.date.month}
            <br />
            {data.date.year}
          </span>
        </div>

        <a
          className="invite-location"
          href={data.locationMapUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${data.locationSummary} in Google Maps`}
        >
          <span aria-hidden="true">⌖</span>
          {data.locationSummary}
        </a>

        <div className="invite-utility" aria-label="Wedding countdown and calendar">
          <span className="countdown-mini" title="Time until the wedding">
            {countdown}
          </span>
          <a href={data.calendarUrl} target="_blank" rel="noreferrer">
            + Add to calendar
          </a>
        </div>

        <div className="invite-actions">
          <Link
            className="action-button action-button--primary"
            href={`${basePath}/rsvp`}
          >
            RSVP
          </Link>
          <Link
            className="action-button action-button--secondary"
            href={`${basePath}/locations`}
          >
            {data.locationLabel}
          </Link>
        </div>
      </article>

      <BackgroundMusic />
    </main>
  );
}
