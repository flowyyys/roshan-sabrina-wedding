"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { InvitationData } from "./invitation-types";

const FLOWERS = [
  ["✿", "-148px", "-112px", "0ms"],
  ["❀", "-82px", "-164px", "45ms"],
  ["✦", "0px", "-188px", "90ms"],
  ["✿", "86px", "-162px", "135ms"],
  ["❀", "150px", "-106px", "180ms"],
  ["✿", "176px", "-18px", "225ms"],
  ["✦", "138px", "92px", "270ms"],
  ["❀", "62px", "150px", "315ms"],
  ["✿", "-42px", "164px", "360ms"],
  ["❀", "-132px", "106px", "405ms"],
  ["✦", "-176px", "10px", "450ms"],
];

const FAREWELL_SYMBOLS = [
  ["♡", "-132px", "-80px", "0ms"],
  ["❧", "-72px", "-128px", "80ms"],
  ["·", "-10px", "-158px", "160ms"],
  ["♡", "58px", "-122px", "240ms"],
  ["❧", "126px", "-70px", "320ms"],
  ["·", "92px", "-10px", "400ms"],
  ["♡", "18px", "28px", "480ms"],
  ["❧", "-82px", "-2px", "560ms"],
];

export function RsvpForm({
  data,
}: {
  data: Pick<
    InvitationData,
    "accessCode" | "theme" | "artUrl" | "locationLabel" | "rsvpNote"
  >;
}) {
  const [status, setStatus] = useState<{
    message: string;
    error?: boolean;
  }>({ message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [responseAnimation, setResponseAnimation] = useState<{
    key: number;
    type: "accept" | "decline";
  } | null>(null);
  const basePath = `/invite/${data.accessCode}`;

  async function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ message: "" });

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, invitation: data.accessCode }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "We could not save your RSVP.");
      }

      form.reset();
      setStatus({
        message:
          result.message ?? "Thank you — your RSVP has been received with love.",
      });
    } catch (error) {
      setStatus({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        error: true,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={`subpage-shell subpage-shell--${data.theme}`}>
      <img className="subpage-shell__art" src={data.artUrl} alt="" />
      {responseAnimation?.type === "accept" ? (
        <div
          className="acceptance-bloom"
          key={responseAnimation.key}
          aria-hidden="true"
        >
          {FLOWERS.map(([flower, x, y, delay], index) => (
            <span
              key={`${flower}-${index}`}
              style={
                {
                  "--bloom-x": x,
                  "--bloom-y": y,
                  "--bloom-delay": delay,
                } as React.CSSProperties
              }
            >
              {flower}
            </span>
          ))}
        </div>
      ) : null}
      {responseAnimation?.type === "decline" ? (
        <div
          className="decline-drift"
          key={responseAnimation.key}
          aria-hidden="true"
        >
          <p>You’ll be missed</p>
          {FAREWELL_SYMBOLS.map(([symbol, x, y, delay], index) => (
            <span
              key={`${symbol}-${index}`}
              style={
                {
                  "--farewell-x": x,
                  "--farewell-y": y,
                  "--farewell-delay": delay,
                } as React.CSSProperties
              }
            >
              {symbol}
            </span>
          ))}
        </div>
      ) : null}

      <div className="subpage-panel rsvp-panel">
        <nav className="subpage-nav" aria-label="Invitation navigation">
          <Link href={basePath}>← Invitation</Link>
          <Link href={`${basePath}/locations`}>{data.locationLabel} →</Link>
        </nav>

        <header className="subpage-header rsvp-header">
          <h1>Will you join us?</h1>
          <p>{data.rsvpNote}</p>
        </header>

        <form className="rsvp-form" onSubmit={submitRsvp}>
          <div className="field">
            <label htmlFor="guest-name">Your name</label>
            <input
              id="guest-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Full name"
            />
          </div>

          <fieldset className="attendance">
            <legend>Can you attend?</legend>
            <div className="attendance__options">
              <label className="attendance__option">
                <input
                  type="radio"
                  name="attendance"
                  value="joyfully-accepts"
                  required
                  onChange={() =>
                    setResponseAnimation({
                      key: Date.now(),
                      type: "accept",
                    })
                  }
                />
                <span>Joyfully accepts</span>
              </label>
              <label className="attendance__option">
                <input
                  type="radio"
                  name="attendance"
                  value="sadly-declines"
                  required
                  onChange={() =>
                    setResponseAnimation({
                      key: Date.now(),
                      type: "decline",
                    })
                  }
                />
                <span>Sadly declines</span>
              </label>
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="guest-count">Number attending</label>
            <input
              id="guest-count"
              name="guests"
              type="number"
              inputMode="numeric"
              min="0"
              max="20"
              defaultValue="1"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="guest-note">A note for the couple</label>
            <textarea
              id="guest-note"
              name="message"
              maxLength={600}
              placeholder="Share a wish or a note…"
            />
          </div>

          <label className="honeypot" aria-hidden="true">
            Leave this field empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>

          <button
            className="action-button action-button--primary form-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Sending your reply…" : "Send my RSVP"}
          </button>
          <p
            className={`form-status ${status.error ? "is-error" : ""}`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        </form>
      </div>
    </main>
  );
}
