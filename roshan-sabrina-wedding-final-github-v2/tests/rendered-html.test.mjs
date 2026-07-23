import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { strFromU8, unzipSync } from "fflate";
import { createRsvpWorkbook } from "../app/rsvp-workbook.ts";

const root = new URL("../", import.meta.url);

test("keeps the private root free of invitation links", async () => {
  const source = await readFile(new URL("app/page.tsx", root), "utf8");

  assert.match(source, /Your invitation is personal/);
  assert.match(source, /index: false, follow: false/);
  assert.doesNotMatch(source, /invite\/roshansabrina|invite\/sabrinaroshan/);
});

test("keeps the two invitation experiences unlinked and distinct", async () => {
  const [landing, data, rsvp, music] = await Promise.all([
    readFile(new URL("app/WeddingInvitation.tsx", root), "utf8"),
    readFile(new URL("app/invitation-data.ts", root), "utf8"),
    readFile(new URL("app/RsvpForm.tsx", root), "utf8"),
    readFile(new URL("app/BackgroundMusic.tsx", root), "utf8"),
  ]);
  const locations = await readFile(
    new URL("app/InvitationLocations.tsx", root),
    "utf8",
  );

  assert.match(landing, /data\.locationLabel/);
  assert.match(landing, /RSVP/);
  assert.match(landing, /ganesha-blessing\.png/);
  assert.match(landing, /jesus-blessing\.png/);
  assert.doesNotMatch(
    landing,
    /invite\/roshansabrina|invite\/sabrinaroshan/,
  );
  assert.match(data, /theme: "hindu"/);
  assert.match(data, /theme: "christian"/);
  assert.match(data, /google\.com\/maps/);
  assert.match(data, /10 February 2027/);
  assert.match(data, /30 December 2026/);
  assert.match(data, /Holy Trinity Church/);
  assert.match(data, /Vanya Luxury Boutique Resort/);
  assert.match(data, /peacock-frame\.png/);
  assert.match(data, /locationLabel: "Location"/);
  assert.match(data, /locationLabel: "Locations"/);
  assert.match(data, /Dongerkerry Ramakrishna Pai/);
  assert.match(data, /G\.S\/o\. \(Late\) Sri\. Dongerkerry Padmanabha Pai/);
  assert.match(data, /Daughter of \(Late\) Mr\. Glen Fredrick Picardo/);
  assert.doesNotMatch(data, /With the blessings of our families/);
  assert.doesNotMatch(rsvp, /phone|meal/i);
  assert.doesNotMatch(rsvp, /Kindly reply|30 November 2026/i);
  assert.match(rsvp, /decline-drift/);
  assert.match(rsvp, /type="number"/);
  assert.match(music, /\/media\/background-music\.mp3/);
  assert.match(music, /\/media\/our-song\.mp4/);
  assert.match(music, /<audio/);
  assert.match(music, /<video/);
  assert.match(music, /requestFullscreen/);
  assert.match(music, /Mute music/);
  assert.match(locations, /data\.locations\.length > 1/);
  assert.doesNotMatch(locations, /jesus-blessing/);
});

test("produces the deployable server and refreshed visual assets", async () => {
  await Promise.all([
    access(new URL("dist/server/index.js", root)),
    access(new URL("public/og.png", root)),
    access(new URL("public/floral-frame-rich.png", root)),
    access(new URL("public/ganesha-blessing.png", root)),
    access(new URL("public/peacock-frame.png", root)),
    access(new URL("public/jesus-blessing.png", root)),
    access(new URL("public/media/background-music.mp3", root)),
    access(new URL("public/media/our-song.mp4", root)),
    access(new URL("app/invite/roshansabrina/locations/page.tsx", root)),
    access(new URL("app/invite/sabrinaroshan/locations/page.tsx", root)),
    access(new URL("app/admin/rsvps/route.ts", root)),
    access(new URL("app/api/admin/rsvp-export/route.ts", root)),
    access(new URL("drizzle/0000_burly_lady_ursula.sql", root)),
  ]);
});

test("produces a Cloudflare-ready Worker with automatic D1 provisioning", async () => {
  const config = JSON.parse(
    await readFile(new URL("dist/server/wrangler.json", root), "utf8"),
  );

  assert.equal(config.name, "roshan-sabrina-wedding");
  assert.equal(config.main, "index.js");
  assert.equal(config.assets.directory, "../client");
  assert.deepEqual(config.d1_databases, [{ binding: "DB" }]);
});

test("creates bride and groom compatible Excel workbooks with two sheets", () => {
  const workbook = createRsvpWorkbook({
    accepted: [
      {
        name: "Alice & Bob",
        guests: 2,
        message: "Can’t wait!",
        created_at: "2026-07-23T18:00:00.000Z",
      },
    ],
    rejected: [
      {
        name: "Charlie",
        guests: 0,
        message: null,
        created_at: "2026-07-23T18:05:00.000Z",
      },
    ],
  });
  const files = unzipSync(workbook);
  const workbookXml = strFromU8(files["xl/workbook.xml"]);
  const acceptedXml = strFromU8(files["xl/worksheets/sheet1.xml"]);
  const rejectedXml = strFromU8(files["xl/worksheets/sheet2.xml"]);

  assert.match(workbookXml, /name="Accepted"/);
  assert.match(workbookXml, /name="Rejected"/);
  assert.match(acceptedXml, /Alice &amp; Bob/);
  assert.match(acceptedXml, /Can’t wait!/);
  assert.match(rejectedXml, /Charlie/);
});
