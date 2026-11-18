import type { Metadata } from "next";
import { HinduInvitation } from "@/app/HinduInvitation";
import { invitations } from "@/app/invitation-data";

export const metadata: Metadata = {
  title: "Our Wedding Invitation",
  robots: { index: false, follow: false },
};

export default async function RoshanSabrinaInvitationPage({ searchParams }: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  return <HinduInvitation data={invitations.roshansabrina} initiallyOpened={view === "invitation"} />;
}
