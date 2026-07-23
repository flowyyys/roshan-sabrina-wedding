import { env } from "cloudflare:workers";

const ADMIN_USERNAME = "admin";
const ADMIN_REALM = "Wedding RSVP Admin";

function secureEqual(left: string, right: string) {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return difference === 0;
}

function decodeBasicCredentials(header: string) {
  if (!header.startsWith("Basic ")) return null;

  try {
    const encoded = header.slice(6).trim();
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (character) =>
      character.charCodeAt(0),
    );
    const decoded = new TextDecoder().decode(bytes);
    const separator = decoded.indexOf(":");

    if (separator < 0) return null;

    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function authorizeRsvpAdmin(request: Request) {
  const adminPassword = env.RSVP_ADMIN_PASSWORD?.trim();

  if (!adminPassword) {
    return new Response(
      "RSVP administration is not configured. Add the RSVP_ADMIN_PASSWORD secret in Cloudflare.",
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      },
    );
  }

  const credentials = decodeBasicCredentials(
    request.headers.get("Authorization") ?? "",
  );
  const authorized =
    credentials !== null &&
    secureEqual(credentials.username, ADMIN_USERNAME) &&
    secureEqual(credentials.password, adminPassword);

  if (authorized) return null;

  return new Response("Administrator sign-in required.", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "WWW-Authenticate": `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
