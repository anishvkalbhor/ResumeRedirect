import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ResumeConfig } from "../../../../ResumeConfig";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { timestamp, sendMail = true, source = "direct" } = body;

    console.log(`Resume viewed at ${new Date(timestamp).toLocaleString()}`);

    if (!sendMail || !ResumeConfig.notifications.sendMail) {
      return NextResponse.json({
        success: true,
        message: "View logged (email notifications disabled)",
      });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: "Email credentials not configured",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: "Someone viewed your resume 📄",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; line-height: 1.6;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
                  
                  <tr>
                    <td style="padding: 32px 32px 24px; text-align: center; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                      <h1 style="color: #111827; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">Resume Redirect</h1>
                      <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 16px;">     Good news! Someone just took a look at your resume. Here’s what we know:</p>

                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 32px;">
                      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                        <div style="margin-bottom: 20px;">
                          <p style="color: #374151; font-size: 14px; font-weight: 500; margin: 0 0 6px 0;">Resume URL</p>
                          <a href="${ResumeConfig.resumeUrl}" style="color: #3b82f6; text-decoration: none; font-size: 14px; word-break: break-all;">${ResumeConfig.resumeUrl}</a>
                        </div>
                        <div style="margin-bottom: 20px;">
                          <p style="color: #374151; font-size: 14px; font-weight: 500; margin: 0 0 6px 0;">Viewed At</p>
                          <p style="color: #111827; font-size: 14px; margin: 0; font-weight: 400;">${formattedDate} IST</p>
                        </div>
                        <div style="margin-bottom: 20px;">
                          <p style="color: #374151; font-size: 14px; font-weight: 500; margin: 0 0 6px 0;">Source</p>
                          <p style="color: #111827; font-size: 14px; margin: 0; font-weight: 400;">${source}</p>
                        </div>
                      </div>
                      
  
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 24px 32px; text-align: center; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                      <p style="color: #9ca3af; margin: 0; font-size: 12px;">
  Resume Redirect • You can disable automated notifications by updating ResumeConfig.ts
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send notification email:", error);
    return NextResponse.json(
      { error: "Failed to send notification email" },
      { status: 500 }
    );
  }
}
