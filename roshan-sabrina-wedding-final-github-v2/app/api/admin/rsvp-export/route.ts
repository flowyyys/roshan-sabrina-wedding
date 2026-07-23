import { authorizeRsvpAdmin } from "@/app/admin-auth";
import { createRsvpWorkbook } from "@/app/rsvp-workbook";
import {
  listRsvpsByInvitation,
  type RsvpInput,
  type StoredRsvp,
} from "@/db/rsvp";

export const dynamic = "force-dynamic";

type ExportSide = "bride" | "groom";

const invitationsBySide: Record<ExportSide, RsvpInput["invitation"]> = {
  bride: "sabrinaroshan",
  groom: "roshansabrina",
};

function isExportSide(value: string | null): value is ExportSide {
  return value === "bride" || value === "groom";
}

function exportRow(row: StoredRsvp) {
  return {
    name: row.name,
    guests: row.guests,
    message: row.message,
    created_at: row.created_at,
  };
}

export async function GET(request: Request) {
  const unauthorized = authorizeRsvpAdmin(request);
  if (unauthorized) return unauthorized;

  const side = new URL(request.url).searchParams.get("side");

  if (!isExportSide(side)) {
    return Response.json(
      { message: "Choose either the bride or groom RSVP export." },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      },
    );
  }

  const responses = await listRsvpsByInvitation(invitationsBySide[side]);
  const workbook = createRsvpWorkbook({
    accepted: responses
      .filter(
        (row: StoredRsvp) => row.attendance === "joyfully-accepts",
      )
      .map(exportRow),
    rejected: responses
      .filter(
        (row: StoredRsvp) => row.attendance === "sadly-declines",
      )
      .map(exportRow),
  });

  return new Response(workbook, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": `attachment; filename="${side}-rsvps.xlsx"`,
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
