import type { Metadata } from "next";
import { InvitationLocations } from "@/app/InvitationLocations";
import { invitations } from "@/app/invitation-data";

export const metadata: Metadata = {
  title: "Locations",
  robots: { index: false, follow: false },
};

export default function RoshanSabrinaLocationsPage() {
  return <InvitationLocations data={invitations.roshansabrina} />;
}
