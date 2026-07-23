import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Private Wedding Invitation",
  robots: { index: false, follow: false },
};

export default function PrivateInvitationPage() {
  return (
    <main className="private-gate">
      <div className="private-gate__flower" aria-hidden="true">
        ✦
      </div>
      <p className="eyebrow">A private celebration</p>
      <h1>Your invitation is personal.</h1>
      <p>
        Please open the link shared with you by the family to view your
        invitation and RSVP.
      </p>
      <span className="flourish" aria-hidden="true">
        R · S
      </span>
    </main>
  );
}
