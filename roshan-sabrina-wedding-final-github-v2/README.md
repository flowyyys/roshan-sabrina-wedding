# Roshan and Sabrina — Wedding Invitation

A mobile-first, private wedding invitation with two unlinked guest experiences
and a durable RSVP list.

## Private guest links

- `/invite/roshansabrina` — the peacock-and-Ganesha Hindu invitation for the
  Goa celebration on 10 February 2027
- `/invite/sabrinaroshan` — the floral Christian invitation for the Bangalore
  wedding on 30 December 2026, with the Jesus-and-lilies blessing artwork on
  the main invitation

Each link opens a single-screen invitation card. Its RSVP and Locations buttons
stay inside that family’s private route. The root page does not link to either
experience, all pages are excluded from search indexing, and neither experience
contains a link or reference to the other.

The bride invitation uses “Roshan weds Sabrina”; the groom invitation uses
“Roshan with Sabrina”.

## Bride invitation locations

1. Holy Trinity Church, Kodigehalli, Bangalore — 3:00 PM
2. Vanya Luxury Boutique Resort — 6:00 PM

## Groom invitation location

The Goa venue and time remain placeholders until the final details are supplied.
Its button and page use the singular “Location” and omit a location number.

## Music

- `public/media/background-music.mp3` is preloaded as low-volume background
  music. Browsers may block unmuted autoplay, so the site retries after the
  guest’s first interaction. A side control lets the guest mute or unmute it.
- “Play our song” opens `public/media/our-song.mp4` in a full-screen video
  player and pauses the background track while it is playing.

## Parents and family wording

- The bride invitation places Roshan’s parents directly below his name and
  Sabrina’s parents directly below hers.
- The groom invitation opens with the formal host invitation from Smt.
  Dongerkerry Sandhya Pai and Sri. Dongerkerry Ramakrishna Pai, followed by the
  requested parent and grandparent lines below each name.

## RSVP

The form asks only for name, attendance, number attending and a note. Accepting
shows a flower celebration; declining shows a gentle farewell animation.
Submissions are validated by `app/api/rsvp/route.ts` and saved to Cloudflare D1.

## Local development

```bash
npm install
npm run dev
```

## Hosting

The production build targets Cloudflare Workers because a static GitHub Pages
site cannot run the RSVP database or server endpoint.
