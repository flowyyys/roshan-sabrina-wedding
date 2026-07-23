import type { Metadata } from "next";
import { RsvpForm } from "@/app/RsvpForm";
import { invitations } from "@/app/invitation-data";

export const metadata: Metadata = {
  title: "RSVP",
  robots: { index: false, follow: false },
};

export default function SabrinaRoshanRsvpPage() {
  const { accessCode, theme, artUrl, locationLabel, rsvpNote } =
    invitations.sabrinaroshan;
  return (
    <RsvpForm
      data={{ accessCode, theme, artUrl, locationLabel, rsvpNote }}
    />
  );
}
