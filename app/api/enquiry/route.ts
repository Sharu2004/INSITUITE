import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  course: string;
  message?: string;
  subject?: string;
}

// Create transporter (reuse across requests in production)
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// HTML email template for admin
function buildAdminEmail(data: EnquiryPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry — NexusIT Academy</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f6fb; font-family: 'Segoe UI', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #4f52eb, #6272f7); padding: 32px 40px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 14px; }
    .body { padding: 36px 40px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #8892a4; margin-bottom: 6px; }
    .value { font-size: 15px; color: #1a2035; font-weight: 500; background: #f4f6fb; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #6272f7; }
    .message-value { font-size: 14px; color: #4a5568; line-height: 1.6; white-space: pre-wrap; }
    .divider { height: 1px; background: #edf0f7; margin: 28px 0; }
    .footer { background: #f8f9fd; padding: 20px 40px; text-align: center; }
    .footer p { color: #8892a4; font-size: 12px; margin: 0; }
    .badge { display: inline-block; background: #e8eaff; color: #4f52eb; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 100px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>⚡ New Course Enquiry</h1>
      <p>Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
    </div>
    <div class="body">
      <span class="badge">Action Required</span>

      <div class="field">
        <div class="label">Student Name</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>

      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color:#4f52eb;">${escapeHtml(data.email)}</a></div>
      </div>

      ${data.phone ? `
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${escapeHtml(data.phone)}" style="color:#4f52eb;">${escapeHtml(data.phone)}</a></div>
      </div>
      ` : ""}

      <div class="field">
        <div class="label">Course Interested In</div>
        <div class="value">${escapeHtml(data.course)}</div>
      </div>

      ${data.message ? `
      <div class="divider"></div>
      <div class="field">
        <div class="label">Message / Subject</div>
        <div class="value message-value">${escapeHtml(data.message || data.subject || "")}</div>
      </div>
      ` : ""}
    </div>
    <div class="footer">
      <p>NexusIT Academy · 42 Tech Park, Whitefield, Bangalore · hello@nexusitacademy.com</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Auto-reply email for student
function buildStudentEmail(data: EnquiryPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Enquiry Received — NexusIT Academy</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f6fb; font-family: 'Segoe UI', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #4f52eb, #6272f7); padding: 36px 40px; text-align: center; }
    .logo { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
    .tagline { color: rgba(255,255,255,0.7); font-size: 13px; margin-top: 4px; }
    .body { padding: 40px; }
    h2 { color: #1a2035; font-size: 22px; margin: 0 0 16px; }
    p { color: #4a5568; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .highlight { background: #f0f4ff; border-left: 4px solid #6272f7; padding: 16px 20px; border-radius: 8px; margin: 24px 0; }
    .highlight p { margin: 0; color: #3836a8; font-weight: 500; }
    .cta { display: block; width: fit-content; margin: 28px auto; background: linear-gradient(135deg, #4f52eb, #6272f7); color: #fff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 10px; }
    .footer { background: #f8f9fd; padding: 20px 40px; text-align: center; }
    .footer p { color: #8892a4; font-size: 12px; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">⚡ NexusIT Academy</div>
      <div class="tagline">Future-Ready Tech Training</div>
    </div>
    <div class="body">
      <h2>Hi ${escapeHtml(data.name)}, we got your enquiry! 🎉</h2>
      <p>Thank you for reaching out to NexusIT Academy. We're thrilled that you're interested in leveling up your tech skills.</p>

      <div class="highlight">
        <p>📚 Course Selected: <strong>${escapeHtml(data.course)}</strong></p>
      </div>

      <p>One of our career advisors will reach out to you within <strong>24 business hours</strong> to discuss your learning goals, batch schedules, and payment options.</p>

      <p>In the meantime, feel free to explore our courses and read success stories from students who've already transformed their careers:</p>

      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://nexusitacademy.com"}/courses" class="cta">
        Browse All Courses →
      </a>

      <p style="font-size:13px; color:#8892a4;">If you have any urgent questions, call us directly at <strong>+91 98765 43210</strong> (Mon–Sat, 9 AM–7 PM IST).</p>
    </div>
    <div class="footer">
      <p>NexusIT Academy · 42 Tech Park, Whitefield, Bangalore · hello@nexusitacademy.com</p>
      <p style="margin-top:6px;">© ${new Date().getFullYear()} NexusIT Academy. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body: EnquiryPayload = await req.json();
    const { name, email, phone, course, message, subject } = body;

    // Basic validation
    if (!name || !email || !course) {
      return NextResponse.json(
        { success: false, message: "Name, email and course are required." },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@nexusitacademy.com";
    const fromEmail = process.env.SMTP_FROM || `NexusIT Academy <${process.env.SMTP_USER}>`;

    // In development without SMTP credentials, just simulate success
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log("📧 [DEV MODE] Email would be sent:", {
        to: adminEmail,
        name,
        email,
        phone,
        course,
        message: message || subject,
      });
      // Simulate a small delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({ success: true, message: "Enquiry received (dev mode — no email sent)" });
    }

    const transporter = createTransporter();

    // Send both emails in parallel
    await Promise.all([
      // Admin notification
      transporter.sendMail({
        from: fromEmail,
        to: adminEmail,
        subject: `🎯 New Enquiry: ${name} — ${course}`,
        html: buildAdminEmail({ name, email, phone, course, message, subject }),
        replyTo: email,
      }),
      // Student auto-reply
      transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: `We received your enquiry — NexusIT Academy`,
        html: buildStudentEmail({ name, email, phone, course, message, subject }),
      }),
    ]);

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send enquiry. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
