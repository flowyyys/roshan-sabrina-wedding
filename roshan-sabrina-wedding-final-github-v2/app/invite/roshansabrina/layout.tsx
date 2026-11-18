import type { ReactNode } from "react";
import { BackgroundMusic } from "@/app/BackgroundMusic";
import "@/app/christian-scene.css";
import "@/app/hindu-scene.css";

export default function HinduInvitationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div className="christian-audio hindu-audio">
        <BackgroundMusic startOnInvitationOpen showSong={false} volume={1} source="/media/background-music-mellow-v2.mp3" />
      </div>
    </>
  );
}
