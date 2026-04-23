import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/* ── Rate Limiting ──────────────────────────────────────────────────────────
   Simple in-memory rate limiter to prevent spam/abuse.
   Limits each IP to 3 submissions per 15-minute window.
   In production with multiple serverless instances, use Redis instead. */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

/* ── Input Sanitization ─────────────────────────────────────────────────────
   Strip HTML tags to prevent XSS in the email body.
   This ensures user input doesn't inject malicious scripts. */
function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/* ── Email Validation ───────────────────────────────────────────────────────
   Basic server-side email format check. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    /* ── Rate limit check ── */
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    /* ── Parse & validate input ── */
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Input exceeds maximum allowed length' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    /* ── Sanitize user input before embedding in HTML email ── */
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    /* ── Configure SMTP transporter ──
       All credentials come from server-side env vars only.
       None of these are prefixed with NEXT_PUBLIC_ so they
       are NEVER exposed to the client bundle. */
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@salahkhaled.com',
      to: 'info@salahkhaled.com',
      replyTo: email, // Raw email for Reply-To header (not HTML)
      subject: `New Message from ${safeName} (Portfolio)`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #F5C518; margin-bottom: 20px;">📩 New Contact Message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #555; background: #f9f9f9; padding: 15px; border-radius: 5px;">${safeMessage}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Sent from salahkhaled.com portfolio contact form</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    /* ── Return generic success — don't leak server internals ── */
    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Email sending error:', error);
    /* ── Return generic error — never expose stack traces or SMTP details ── */
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
