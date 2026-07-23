import { env } from "cloudflare:workers";

export type RsvpInput = {
  invitation: "roshansabrina" | "sabrinaroshan";
  name: string;
  attendance: "joyfully-accepts" | "sadly-declines";
  guests: number;
  message: string;
};

export type StoredRsvp = {
  id: number;
  invitation: RsvpInput["invitation"];
  name: string;
  attendance: RsvpInput["attendance"];
  guests: number;
  message: string | null;
  created_at: string;
};

const createTableSql = `
  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invitation TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    attendance TEXT NOT NULL,
    guests INTEGER NOT NULL DEFAULT 1,
    meal TEXT,
    message TEXT,
    created_at TEXT NOT NULL
  )
`;

export async function saveRsvp(input: RsvpInput) {
  const database = env.DB;
  if (!database) {
    throw new Error("RSVP storage is not available.");
  }

  await database.prepare(createTableSql).run();
  await database
    .prepare(
      `INSERT INTO rsvps
        (invitation, name, phone, attendance, guests, meal, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      input.invitation,
      input.name,
      null,
      input.attendance,
      input.guests,
      null,
      input.message || null,
      new Date().toISOString(),
    )
    .run();
}

export async function listRsvpsByInvitation(
  invitation: RsvpInput["invitation"],
) {
  const database = env.DB;
  if (!database) {
    throw new Error("RSVP storage is not available.");
  }

  await database.prepare(createTableSql).run();
  const result = await database
    .prepare(
      `SELECT id, invitation, name, attendance, guests, message, created_at
       FROM rsvps
       WHERE invitation = ?
       ORDER BY created_at DESC, id DESC`,
    )
    .bind(invitation)
    .all<StoredRsvp>();

  return result.results;
}
