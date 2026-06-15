import nodemailer from 'nodemailer';

export const getEmailTemplate = (bodyContent: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
    .header { background-color: #111827; padding: 32px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; font-weight: 800; }
    .header h1 span { color: #4f46e5; }
    .content { padding: 40px; color: #374151; line-height: 1.6; font-size: 16px; }
    .footer { background-color: #f3f4f6; padding: 32px 24px; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    .social-links { margin-bottom: 20px; }
    .social-links a { color: #111827; text-decoration: none; margin: 0 12px; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
    .legal-links { margin-bottom: 20px; }
    .legal-links a { color: #6b7280; text-decoration: none; margin: 0 12px; font-size: 13px; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
    .legal-links a:hover { border-bottom-color: #6b7280; }
    .disclaimer { font-size: 12px; color: #9ca3af; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <!-- You can easily replace the text below with an <img src="..." /> tag later -->
      <h1>REINFORM<span>TECH</span></h1>
    </div>
    <div class="content">
      ${bodyContent}
    </div>
    <div class="footer">
      <div class="social-links">
        <a href="https://linkedin.com/company/reinformtech" target="_blank">LinkedIn</a>
        <a href="https://twitter.com/reinformtech" target="_blank">Twitter</a>
        <a href="https://facebook.com/reinformtech" target="_blank">Facebook</a>
      </div>
      <div class="legal-links">
        <a href="https://reinformtech.com/privacy" target="_blank">Privacy Policy</a>
        <a href="https://reinformtech.com/cookies" target="_blank">Cookies Policy</a>
        <a href="https://reinformtech.com/terms" target="_blank">Terms of Service</a>
      </div>
      <p>&copy; ${new Date().getFullYear()} ReInformTech Enterprise. All rights reserved.</p>
      <p class="disclaimer">This is an automated message. Please do not reply directly to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const sendEmail = async ({
  to,
  bcc,
  subject,
  html,
}: {
  to?: string | string[];
  bcc?: string | string[];
  subject: string;
  html: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"ReInformTech" <${process.env.GMAIL_EMAIL || 'test@example.com'}>`,
      to,
      bcc,
      subject,
      html,
    });
    
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
