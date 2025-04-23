import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ResumeConfig } from "../../../../ResumeConfig";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { timestamp, sendMail = true } = body;

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
        message: "Email credentials not configured , Add them to .env",
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
      subject: "Someone just opened your resume! 📄",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #f9f9f9;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="background-color: #0f172a; padding: 20px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">Resume Notification</h1>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 30px 20px;">
                      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 500;">Hey Vishal,</h2>
                      
                      <p style="font-size: 16px; line-height: 1.5; color: #334155;">
                        Your resume link was just opened! 🚀
                      </p>
                      
                      <div style="background-color: #f1f5f9; border-left: 4px solid #64748b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                        <p style="margin: 0 0 10px 0; font-size: 15px; color: #334155;">
                          <strong style="color: #0f172a;">Redirected to:</strong><br>
                          <a href="${ResumeConfig.resumeUrl}" style="color: #0284c7; text-decoration: none; word-break: break-all;">${ResumeConfig.resumeUrl}</a>
                        </p>
                        <p style="margin: 0; font-size: 15px; color: #334155;">
                          <strong style="color: #0f172a;">Time:</strong><br>
                          ${formattedDate} IST
                        </p>
                      </div>
                      
                      <p style="font-size: 16px; line-height: 1.5; color: #334155; margin-top: 24px;">
                        Maybe it's time to check your inbox 👀
                      </p>
                      
                      <div style="text-align: center; margin-top: 30px;">
                        <a href="https://mail.google.com/mail/u/0/#inbox" style="display: inline-block; background-color: #0f172a; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-weight: 500; font-size: 14px;">Check Your Inbox</a>
                      </div>
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
