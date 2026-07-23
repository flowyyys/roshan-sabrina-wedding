"use client";

import { useEffect, useRef, useState } from "react";

const BACKGROUND_MUSIC = "/media/background-music.mp3";
const FEATURE_VIDEO = "/media/our-song.mp4";

export function BackgroundMusic() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [ambientMuted, setAmbientMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoPanelRef = useRef<HTMLDivElement>(null);

  function startAmbientMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.14;
    void audio.play().catch(() => {
      // Browsers can require the guest's first interaction before sound starts.
    });
  }

  function toggleAmbientMute() {
    const nextMuted = !ambientMuted;
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    setAmbientMuted(nextMuted);
    if (!nextMuted && !videoOpen) {
      startAmbientMusic();
    }
  }

  function openFeatureVideo() {
    const panel = videoPanelRef.current;
    const video = videoRef.current;

    audioRef.current?.pause();
    panel?.classList.add("is-open");
    setVideoOpen(true);

    if (video) {
      video.currentTime = 0;
      void video.play();
    }

    void panel?.requestFullscreen?.().catch(() => {
      // The fixed full-screen overlay remains available when browser fullscreen
      // is unavailable or disabled.
    });
  }

  function closeFeatureVideo() {
    videoRef.current?.pause();
    videoPanelRef.current?.classList.remove("is-open");
    setVideoOpen(false);

    if (document.fullscreenElement === videoPanelRef.current) {
      void document.exitFullscreen();
    }

    startAmbientMusic();
  }

  useEffect(() => {
    startAmbientMusic();

    const retryAmbientAfterGesture = () => {
      startAmbientMusic();
      window.removeEventListener("pointerdown", retryAmbientAfterGesture, true);
      window.removeEventListener("keydown", retryAmbientAfterGesture, true);
    };

    window.addEventListener("pointerdown", retryAmbientAfterGesture, true);
    window.addEventListener("keydown", retryAmbientAfterGesture, true);
    return () => {
      window.removeEventListener("pointerdown", retryAmbientAfterGesture, true);
      window.removeEventListener("keydown", retryAmbientAfterGesture, true);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (videoOpen && document.fullscreenElement !== videoPanelRef.current) {
        videoRef.current?.pause();
        videoPanelRef.current?.classList.remove("is-open");
        setVideoOpen(false);
        startAmbientMusic();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [videoOpen]);

  return (
    <>
      <audio
        ref={audioRef}
        src={BACKGROUND_MUSIC}
        autoPlay
        loop
        muted={ambientMuted}
        preload="auto"
        onCanPlay={startAmbientMusic}
      />

      <div className="music-controls">
        <button
          className="music-mute"
          type="button"
          onClick={toggleAmbientMute}
          aria-pressed={ambientMuted}
        >
          <span aria-hidden="true">{ambientMuted ? "🔇" : "♫"}</span>
          {ambientMuted ? "Unmute music" : "Mute music"}
        </button>
        <button
          className="music-toggle"
          type="button"
          onClick={openFeatureVideo}
          aria-haspopup="dialog"
        >
          <span aria-hidden="true">▶</span>
          Play our song
        </button>
      </div>

      <div
        ref={videoPanelRef}
        className={`video-modal ${videoOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Our wedding song video"
      >
        <button
          className="video-modal__close"
          type="button"
          onClick={closeFeatureVideo}
        >
          Close video ✕
        </button>
        <video
          ref={videoRef}
          src={FEATURE_VIDEO}
          controls
          playsInline
          preload="auto"
          onEnded={closeFeatureVideo}
        />
      </div>
    </>
  );
}
