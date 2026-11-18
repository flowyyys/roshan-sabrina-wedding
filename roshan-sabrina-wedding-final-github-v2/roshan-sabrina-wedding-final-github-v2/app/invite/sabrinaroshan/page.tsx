import type { Metadata } from "next";
import { ChristianInvitation } from "@/app/ChristianInvitation";
import { invitations } from "@/app/invitation-data";

export const metadata: Metadata = {
  title: "Our Wedding Invitation",
  robots: { index: false, follow: false },
};

export default async function SabrinaRoshanInvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  return <ChristianInvitation data={invitations.sabrinaroshan} initiallyOpened={view === "invitation"} />;
}
