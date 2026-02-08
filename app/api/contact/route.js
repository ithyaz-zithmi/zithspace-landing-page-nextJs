import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create reusable transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { companyName, phoneNumber, companyEmail, industry, subject } = body;

    // Validate required fields
    if (!companyName || !phoneNumber || !companyEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get recipients from environment
    const recipients = process.env.CONTACT_EMAIL_TO;
    if (!recipients) {
      console.error('CONTACT_EMAIL_TO not configured');
      return NextResponse.json(
        { success: false, error: 'Email configuration error' },
        { status: 500 }
      );
    }

    // Create email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> Let's Talk with Zithtech Form</p>
      <hr/>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Company Name</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${companyName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${phoneNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Company Email</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${companyEmail}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Industry</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${industry || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Subject/Message</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${subject || 'No message provided'}</td>
        </tr>
      </table>
      <hr/>
      <p style="color: #666; font-size: 12px;">
        This email was sent from the Zithtech website contact form.
      </p>
    `;

    const emailText = `
New Contact Form Submission
===========================

Company Name: ${companyName}
Phone Number: ${phoneNumber}
Company Email: ${companyEmail}
Industry: ${industry || 'Not specified'}
Subject/Message: ${subject || 'No message provided'}

---
This email was sent from the Zithtech website contact form.
    `;

    // Send email
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipients,
      subject: `New Contact: ${companyName} - Let's Talk with Zithtech`,
      text: emailText,
      html: emailHtml,
      replyTo: companyEmail,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
