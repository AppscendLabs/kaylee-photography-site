import { Resend } from "resend";
import { formatCents } from "./stripe";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const SITE_NAME = "Kaylee Light Photography";
const FROM = `${SITE_NAME} <noreply@kaymariephoto.com>`;
const KAYLEE_EMAIL = "kayleelightphotography@gmail.com";

interface BookingNotificationParams {
  clientName: string;
  clientEmail: string;
  sessionType: string;
  sessionDate: Date;
  sessionTime: string;
  message: string;
}

export async function sendBookingNotification(params: BookingNotificationParams): Promise<void> {
  const { clientName, clientEmail, sessionType, sessionDate, sessionTime, message } = params;

  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const adminUrl = `${siteUrl}/admin`;

  const sessionDateFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(sessionDate);

  await getResend().emails.send({
    from: FROM,
    to: KAYLEE_EMAIL,
    replyTo: clientEmail,
    subject: `New Booking Request — ${clientName}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#F8F8F6;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F6;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e5e5;max-width:560px;width:100%;">
          <tr>
            <td style="background:#1A1A1A;padding:32px 48px;text-align:center;">
              <p style="color:#F8F8F6;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 8px;">Kaylee Light Photography</p>
              <h1 style="color:#F8F8F6;font-size:24px;font-weight:400;margin:0;letter-spacing:1px;">New Booking Request</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F6;border:1px solid #e5e5e5;margin-bottom:32px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="font-family:'Helvetica Neue',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:0 0 16px;">Request Details</p>
                    <table width="100%">
                      <tr>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;padding:4px 0;">Client</td>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#1A1A1A;text-align:right;font-weight:500;">${clientName}</td>
                      </tr>
                      <tr>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;padding:4px 0;">Email</td>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#1A1A1A;text-align:right;font-weight:500;">${clientEmail}</td>
                      </tr>
                      <tr>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;padding:4px 0;">Session</td>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#1A1A1A;text-align:right;font-weight:500;">${sessionType}</td>
                      </tr>
                      <tr>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;padding:4px 0;">Date</td>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#1A1A1A;text-align:right;font-weight:500;">${sessionDateFormatted}</td>
                      </tr>
                      <tr>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;padding:4px 0;">Time</td>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#1A1A1A;text-align:right;font-weight:500;">${sessionTime}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              ${message ? `
              <div style="border-left:2px solid #e5e5e5;padding-left:16px;margin-bottom:32px;">
                <p style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;font-style:italic;line-height:1.7;margin:0;">"${message}"</p>
              </div>` : ""}
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${adminUrl}" style="display:inline-block;background:#1A1A1A;color:#F8F8F6;font-family:'Helvetica Neue',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:16px 40px;">
                      View in Admin Panel
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #e5e5e5;padding:24px 48px;text-align:center;">
              <p style="font-family:'Helvetica Neue',sans-serif;font-size:11px;color:#bbb;letter-spacing:1px;margin:0;">
                Kaylee Light Photography &nbsp;·&nbsp; Star, Idaho &nbsp;·&nbsp; Available Worldwide
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });
}

interface DepositEmailParams {
  clientName: string;
  clientEmail: string;
  sessionType: string;
  sessionDate: Date;
  sessionTime: string;
  depositCents: number;
  bookingId: string;
}

export async function sendDepositEmail(params: DepositEmailParams): Promise<void> {
  const { clientName, clientEmail, sessionType, sessionDate, sessionTime, depositCents, bookingId } = params;

  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const paymentUrl = `${siteUrl}/pay/${bookingId}`;
  const depositFormatted = formatCents(depositCents);
  const sessionDateFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(sessionDate);

  await getResend().emails.send({
    from: FROM,
    to: clientEmail,
    replyTo: KAYLEE_EMAIL,
    subject: `Your Photography Session is Confirmed — Deposit Required`,
    html: buildDepositEmailHtml({
      clientName,
      sessionType,
      sessionDateFormatted,
      sessionTime,
      depositFormatted,
      paymentUrl,
    }),
  });
}

interface EmailTemplateParams {
  clientName: string;
  sessionType: string;
  sessionDateFormatted: string;
  sessionTime: string;
  depositFormatted: string;
  paymentUrl: string;
}

function buildDepositEmailHtml(p: EmailTemplateParams): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Deposit Request — Kaylee Light Photography</title>
</head>
<body style="margin:0;padding:0;background:#F8F8F6;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F6;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e5e5;max-width:560px;width:100%;">
          <tr>
            <td style="background:#1A1A1A;padding:40px 48px;text-align:center;">
              <p style="color:#F8F8F6;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 8px;">Kaylee Light Photography</p>
              <h1 style="color:#F8F8F6;font-size:28px;font-weight:400;margin:0;letter-spacing:1px;">Session Confirmed</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:48px;">
              <p style="font-family:'Helvetica Neue',sans-serif;font-size:15px;color:#4a4a4a;line-height:1.7;margin:0 0 24px;">Hi ${p.clientName},</p>
              <p style="font-family:'Helvetica Neue',sans-serif;font-size:15px;color:#4a4a4a;line-height:1.7;margin:0 0 32px;">
                I'm so excited to work with you! Your session has been approved and is now ready to confirm. Please complete your deposit to lock in your date.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F6;border:1px solid #e5e5e5;margin-bottom:32px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="font-family:'Helvetica Neue',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:0 0 16px;">Session Details</p>
                    <table width="100%">
                      <tr>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;padding:4px 0;">Type</td>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#1A1A1A;text-align:right;font-weight:500;">${p.sessionType}</td>
                      </tr>
                      <tr>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;padding:4px 0;">Date</td>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#1A1A1A;text-align:right;font-weight:500;">${p.sessionDateFormatted}</td>
                      </tr>
                      <tr>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;padding:4px 0;">Time</td>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#1A1A1A;text-align:right;font-weight:500;">${p.sessionTime}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top:1px solid #e5e5e5;padding-top:12px;margin-top:8px;"></td>
                      </tr>
                      <tr>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#777;padding:4px 0;">Deposit Due</td>
                        <td style="font-family:'Helvetica Neue',sans-serif;font-size:16px;color:#1A1A1A;text-align:right;font-weight:600;">${p.depositFormatted}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="${p.paymentUrl}" style="display:inline-block;background:#1A1A1A;color:#F8F8F6;font-family:'Helvetica Neue',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:16px 40px;">
                      Pay Deposit Now
                    </a>
                  </td>
                </tr>
              </table>
              <p style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#999;line-height:1.7;margin:0;">
                This deposit secures your date. The remaining balance is due on the day of your session. If you have any questions, reply to this email or reach me at <a href="mailto:kayleelightphotography@gmail.com" style="color:#1A1A1A;">kayleelightphotography@gmail.com</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #e5e5e5;padding:24px 48px;text-align:center;">
              <p style="font-family:'Helvetica Neue',sans-serif;font-size:11px;color:#bbb;letter-spacing:1px;margin:0;">
                Kaylee Light Photography &nbsp;·&nbsp; Star, Idaho &nbsp;·&nbsp; Available Worldwide
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
  await getResend().emails.send({
    from: FROM,
    to: email,
    replyTo: KAYLEE_EMAIL,
    subject: "Reset Your Password — Kaylee Light Photography",
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#F8F8F6;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F6;padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e5e5;max-width:560px;width:100%;">
        <tr>
          <td style="background:#1A1A1A;padding:32px 48px;text-align:center;">
            <p style="color:#F8F8F6;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 8px;">Kaylee Light Photography</p>
            <h1 style="color:#F8F8F6;font-size:24px;font-weight:400;margin:0;letter-spacing:1px;">Password Reset</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 48px;">
            <p style="font-family:'Helvetica Neue',sans-serif;font-size:15px;color:#4a4a4a;line-height:1.7;margin:0 0 24px;">
              You requested a password reset for your admin portal. Click the button below to set a new password. This link expires in 1 hour.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td align="center">
                  <a href="${resetUrl}" style="display:inline-block;background:#1A1A1A;color:#F8F8F6;font-family:'Helvetica Neue',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:16px 40px;">
                    Reset Password
                  </a>
                </td>
              </tr>
            </table>
            <p style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#999;line-height:1.7;margin:0;">
              If you didn't request this, you can safely ignore this email. Your password won't change.
            </p>
          </td>
        </tr>
        <tr>
          <td style="border-top:1px solid #e5e5e5;padding:24px 48px;text-align:center;">
            <p style="font-family:'Helvetica Neue',sans-serif;font-size:11px;color:#bbb;letter-spacing:1px;margin:0;">
              Kaylee Light Photography &nbsp;·&nbsp; Star, Idaho &nbsp;·&nbsp; Available Worldwide
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}
