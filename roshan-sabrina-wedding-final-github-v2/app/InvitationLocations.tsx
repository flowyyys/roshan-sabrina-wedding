import Link from "next/link";
import type { InvitationData } from "./invitation-types";

export function InvitationLocations({ data }: { data: InvitationData }) {
  const basePath = `/invite/${data.accessCode}`;

  return (
    <main className={`subpage-shell subpage-shell--${data.theme}`}>
      <img className="subpage-shell__art" src={data.artUrl} alt="" />
      <div className="subpage-panel locations-panel">
        <nav className="subpage-nav" aria-label="Invitation navigation">
          <Link href={basePath}>← Invitation</Link>
          <Link href={`${basePath}/rsvp`}>RSVP →</Link>
        </nav>

        <header className="subpage-header locations-header">
          <p className="invite-eyebrow">
            Roshan {data.theme === "christian" ? "weds" : "with"} Sabrina
          </p>
          <h1>{data.locationLabel}</h1>
          <p>{data.locationsIntro}</p>
        </header>

        <div
          className={`locations-grid ${
            data.locations.length === 1 ? "locations-grid--single" : ""
          }`}
        >
          {data.locations.map((location, index) => (
            <article className="location-card" key={location.label}>
              {data.locations.length > 1 ? (
                <span className="location-card__number" aria-hidden="true">
                  {index + 1}
                </span>
              ) : null}
              <div className="location-card__copy">
                <p className="location-card__label">{location.label}</p>
                <h2>{location.name}</h2>
                <strong>{location.time}</strong>
                <p>{location.address}</p>
              </div>
              <a
                className="action-button action-button--primary location-map"
                href={location.mapUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${location.name} in Google Maps`}
              >
                Open in Google Maps
              </a>
            </article>
          ))}
        </div>

        <div className="locations-footer">
          <a href={data.calendarUrl} target="_blank" rel="noreferrer">
            + Add the wedding to my calendar
          </a>
          <p>{data.closingLine}</p>
        </div>
      </div>
    </main>
  );
}
