import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // API Route: Send Lead notifications via Email/Webhook
  app.post("/api/send-lead", async (req, res) => {
    try {
      const { lead, settings } = req.body;

      if (!lead) {
        return res.status(400).json({ success: false, error: "Lead data is required" });
      }

      console.log(`[PlumLead Server] Received new lead booking: ${lead.name} from ${lead.company}`);

      const recipientEmail = settings?.notificationEmail || "abdullah@plumlead.com";
      const sendMethod = settings?.sendMethod || "local";
      const webhookUrl = settings?.webhookUrl;

      // Construct high-fidelity HTML email template
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New PlumLead Booking</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05); border: 1px border #e2e8f0; }
            .header { background-color: #2563eb; padding: 32px; text-align: center; }
            .logo-text { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin: 0; }
            .logo-text span { color: #93c5fd; }
            .content { padding: 40px 32px; }
            .badge { display: inline-block; background-color: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 6px 12px; border-radius: 20px; margin-bottom: 24px; tracking: 0.5px; }
            h1 { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0; letter-spacing: -0.3px; }
            p { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; }
            .lead-grid { border-top: 1px solid #f1f5f9; padding-top: 20px; margin-bottom: 28px; }
            .lead-row { display: flex; margin-bottom: 12px; font-size: 14px; }
            .lead-label { width: 140px; font-weight: 700; color: #475569; }
            .lead-value { flex: 1; color: #0f172a; }
            .goals-box { background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 20px; font-size: 14px; color: #334155; line-height: 1.6; font-style: italic; margin-bottom: 28px; }
            .footer { background-color: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; }
            .footer a { color: #2563eb; text-decoration: none; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="logo-text">Plum<span>Lead</span></h1>
            </div>
            <div class="content">
              <div class="badge">🔴 Direct Territory Booking</div>
              <h1>New Growth Strategy Booking Received!</h1>
              <p>Great news! A plumbing business decision maker has just filled out the strategy session form on your PlumLead landing page. Below are their complete acquisition goals and contact details.</p>
              
              <div class="lead-grid">
                <div class="lead-row">
                  <div class="lead-label">Decision Maker:</div>
                  <div class="lead-value"><strong>${lead.name}</strong></div>
                </div>
                <div class="lead-row">
                  <div class="lead-label">Company Name:</div>
                  <div class="lead-value">${lead.company}</div>
                </div>
                <div class="lead-row">
                  <div class="lead-label">Phone Number:</div>
                  <div class="lead-value"><a href="tel:${lead.phone}" style="color: #2563eb; font-weight: 600;">${lead.phone}</a></div>
                </div>
                <div class="lead-row">
                  <div class="lead-label">Email Address:</div>
                  <div class="lead-value"><a href="mailto:${lead.email}" style="color: #2563eb;">${lead.email}</a></div>
                </div>
                <div class="lead-row">
                  <div class="lead-label">Logged At:</div>
                  <div class="lead-value" style="font-family: monospace;">${lead.timestamp}</div>
                </div>
              </div>

              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">Business & Growth Goals:</div>
              <div class="goals-box">
                "${lead.goals}"
              </div>
            </div>
            <div class="footer">
              This lead was captured securely by the PlumLead Performance Engine.
              <br>
              <span style="display: block; margin-top: 8px;">© ${new Date().getFullYear()} PlumLead CRM Sandbox.</span>
            </div>
          </div>
        </body>
        </html>
      `;

      let emailSentResult = false;
      let emailErrorDetails = "";

      // 1. Send via webhook if requested
      if (sendMethod === "webhook" && webhookUrl) {
        try {
          console.log(`[PlumLead Server] Posting lead to custom Webhook: ${webhookUrl}`);
          const hookRes = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lead, recipientEmail }),
          });
          console.log(`[PlumLead Server] Webhook status response: ${hookRes.status}`);
        } catch (hookErr: any) {
          console.error("[PlumLead Server] Webhook dispatch failure:", hookErr.message);
        }
      }

      // 2. Dispatch via Resend API
      if (sendMethod === "resend" && settings?.resendApiKey) {
        try {
          console.log("[PlumLead Server] Sending lead notification via Resend API");
          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${settings.resendApiKey}`,
            },
            body: JSON.stringify({
              from: "PlumLead Leads <leads@plumlead.com>",
              to: [recipientEmail],
              subject: `🔔 New PlumLead Booking: ${lead.name} (${lead.company})`,
              html: emailHtml,
            }),
          });
          const resendData = await resendResponse.json();
          if (resendResponse.ok) {
            emailSentResult = true;
            console.log("[PlumLead Server] Resend email dispatched successfully:", resendData);
          } else {
            emailErrorDetails = JSON.stringify(resendData);
            console.error("[PlumLead Server] Resend API error details:", resendData);
          }
        } catch (resendErr: any) {
          emailErrorDetails = resendErr.message;
          console.error("[PlumLead Server] Resend API connection error:", resendErr);
        }
      }

      // 3. Dispatch via custom SMTP server
      if (sendMethod === "smtp" && settings?.smtpHost) {
        try {
          console.log(`[PlumLead Server] Dispatching lead via custom SMTP: ${settings.smtpHost}:${settings.smtpPort}`);
          const transporter = nodemailer.createTransport({
            host: settings.smtpHost,
            port: parseInt(settings.smtpPort) || 587,
            secure: settings.smtpPort === "465", // true for 465, false for other ports
            auth: {
              user: settings.smtpUser,
              pass: settings.smtpPass,
            },
          });

          const info = await transporter.sendMail({
            from: settings.smtpFrom || '"PlumLead Engine" <leads@plumlead.com>',
            to: recipientEmail,
            subject: `🔔 New PlumLead Booking: ${lead.name} (${lead.company})`,
            html: emailHtml,
          });

          emailSentResult = true;
          console.log("[PlumLead Server] SMTP email dispatched successfully:", info.messageId);
        } catch (smtpErr: any) {
          emailErrorDetails = smtpErr.message;
          console.error("[PlumLead Server] SMTP connection error:", smtpErr);
        }
      }

      // 4. Dispatch via Gmail OAuth or standard nodemailer fallback (if any credentials set in env)
      if (!emailSentResult && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          console.log("[PlumLead Server] Attempting default SMTP fallback using env credentials");
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: process.env.SMTP_FROM || '"PlumLead" <leads@plumlead.com>',
            to: recipientEmail,
            subject: `🔔 New PlumLead Booking: ${lead.name} (${lead.company})`,
            html: emailHtml,
          });

          emailSentResult = true;
          console.log("[PlumLead Server] Default SMTP fallback email sent successfully");
        } catch (envSmtpErr: any) {
          console.error("[PlumLead Server] Default SMTP fallback failure:", envSmtpErr.message);
        }
      }

      // Always print in dev server console as fallback so the user can easily see their formatted emails
      console.log("=========================================================");
      console.log(`[EMAIL DISPATCH MOCK / LOG] to: ${recipientEmail}`);
      console.log(`Subject: 🔔 New PlumLead Booking: ${lead.name} (${lead.company})`);
      console.log(`Name: ${lead.name}`);
      console.log(`Email: ${lead.email}`);
      console.log(`Phone: ${lead.phone}`);
      console.log(`Company: ${lead.company}`);
      console.log(`Goals: ${lead.goals}`);
      console.log("=========================================================");

      return res.status(200).json({
        success: true,
        sent: emailSentResult,
        method: sendMethod,
        error: emailErrorDetails || undefined,
        message: emailSentResult ? "Lead notification email sent!" : "Lead logged in terminal server console.",
      });

    } catch (err: any) {
      console.error("[PlumLead Server] Error handling send-lead route:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite development vs Production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PlumLead Server] Full-Stack Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
