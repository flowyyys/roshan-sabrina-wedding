import type { Metadata } from "next";
import { WeddingInvitation } from "@/app/WeddingInvitation";
import { invitations } from "@/app/invitation-data";

export const metadata: Metadata = {
  title: "Our Wedding Invitation",
  robots: { index: false, follow: false },
};

export default function SabrinaRoshanInvitationPage() {
  return <WeddingInvitation data={invitations.sabrinaroshan} />;
}
