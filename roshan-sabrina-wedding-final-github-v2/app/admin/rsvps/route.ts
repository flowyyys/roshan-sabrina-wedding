import { authorizeRsvpAdmin } from "@/app/admin-auth";

export const dynamic = "force-dynamic";

const adminPage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow,noarchive" />
    <title>Wedding RSVP exports</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Arial, sans-serif;
        background: #f7f4ef;
        color: #5e504a;
      }
      * { box-sizing: border-box; }
      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        padding: 24px;
        background:
          radial-gradient(circle at top left, #f2dfd9 0, transparent 36%),
          radial-gradient(circle at bottom right, #e8eadf 0, transparent 34%),
          #f7f4ef;
      }
      main {
        width: min(680px, 100%);
        padding: clamp(28px, 7vw, 64px);
        border: 1px solid #dfc789;
        border-radius: 32px;
        background: rgba(255, 253, 249, 0.94);
        box-shadow: 0 24px 70px rgba(80, 57, 48, 0.14);
        text-align: center;
      }
      .eyebrow {
        margin: 0;
        color: #6d7e67;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.17em;
        text-transform: uppercase;
      }
      h1 {
        margin: 14px 0 0;
        color: #6e2c3a;
        font-family: Georgia, serif;
        font-size: clamp(38px, 8vw, 64px);
        font-weight: 400;
        line-height: 1;
      }
      p {
        max-width: 500px;
        margin: 20px auto 0;
        font-family: Georgia, serif;
        font-size: 18px;
        line-height: 1.55;
      }
      .downloads {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
        margin-top: 30px;
      }
      a {
        display: grid;
        min-height: 58px;
        place-items: center;
        padding: 14px 18px;
        border: 1px solid #6e2c3a;
        border-radius: 999px;
        color: #fffdf9;
        background: #6e2c3a;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-decoration: none;
        text-transform: uppercase;
      }
      a:last-child {
        border-color: #71806b;
        background: #71806b;
      }
      small {
        display: block;
        margin-top: 22px;
        color: #766860;
        line-height: 1.5;
      }
      @media (max-width: 560px) {
        .downloads { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Private administration</p>
      <h1>RSVP exports</h1>
      <p>
        Download the latest replies as Excel workbooks. Each workbook contains
        separate Accepted and Rejected worksheet tabs.
      </p>
      <div class="downloads">
        <a href="/api/admin/rsvp-export?side=bride">Download bride Excel</a>
        <a href="/api/admin/rsvp-export?side=groom">Download groom Excel</a>
      </div>
      <small>Keep this address and administrator password private.</small>
    </main>
  </body>
</html>`;

export async function GET(request: Request) {
  const unauthorized = authorizeRsvpAdmin(request);
  if (unauthorized) return unauthorized;

  return new Response(adminPage, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Security-Policy":
        "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      "Content-Type": "text/html; charset=utf-8",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
