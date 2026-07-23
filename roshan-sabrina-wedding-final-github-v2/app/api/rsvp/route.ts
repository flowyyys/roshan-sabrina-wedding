import { saveRsvp, type RsvpInput } from "@/db/rsvp";

const allowedInvitations = new Set(["roshansabrina", "sabrinaroshan"]);
const allowedAttendance = new Set(["joyfully-accepts", "sadly-declines"]);

function asText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (asText(body.website, 20)) {
      return Response.json({
        message: "Thank you — your RSVP has been received with love.",
      });
    }

    const invitation = asText(body.invitation, 30);
    const name = asText(body.name, 100);
    const attendance = asText(body.attendance, 30);
    const message = asText(body.message, 600);
    const requestedGuests = Number(body.guests);
    const guests =
      attendance === "sadly-declines"
        ? 0
        : Math.min(20, Math.max(1, requestedGuests || 1));

    if (
      !name ||
      !allowedInvitations.has(invitation) ||
      !allowedAttendance.has(attendance)
    ) {
      return Response.json(
        { message: "Please complete the required RSVP details." },
        { status: 400 },
      );
    }

    await saveRsvp({
      invitation,
      name,
      attendance,
      guests,
      message,
    } as RsvpInput);

    return Response.json({
      message:
        attendance === "joyfully-accepts"
          ? "We’re delighted — your place is saved!"
          : "Thank you for letting us know. You’ll be missed and held close in our hearts.",
    });
  } catch {
    return Response.json(
      { message: "We could not save your RSVP just now. Please try again." },
      { status: 500 },
    );
  }
}
