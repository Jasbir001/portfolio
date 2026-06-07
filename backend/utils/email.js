const nodemailer = require('nodemailer');

// Create transporter helper
const createTransporter = async () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // If no custom SMTP credentials provided, log warning and return mock transporter
  if (!host || !user || !pass) {
    console.warn('SMTP credentials not configured in .env. Emails will be logged to terminal console.');
    return {
      sendMail: async (options) => {
        console.log('\n--- EMAIL SENT (LOGGING MODE) ---');
        console.log(`To: ${options.to}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Text: ${options.text || '(HTML Content only)'}`);
        console.log(`HTML: \n${options.html}\n`);
        console.log('---------------------------------\n');
        return { messageId: 'console-log-mock-id' };
      }
    };
  }

  // Use gmail service shortcut for better reliability with Google SMTP
  if (host.includes('gmail.com')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 5000, // 5 seconds connection timeout
      greetingTimeout: 5000,   // 5 seconds greeting timeout
      socketTimeout: 5000      // 5 seconds inactivity timeout
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass
    },
    tls: {
      rejectUnauthorized: false // Bypass SSL verification errors on local development
    },
    connectionTimeout: 5000, // 5 seconds connection timeout
    greetingTimeout: 5000,   // 5 seconds greeting timeout
    socketTimeout: 5000      // 5 seconds inactivity timeout
  });
};

// Send email helper
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = await createTransporter();
    const info = await transporter.sendMail({
      from: `"Nexbyte" <${process.env.ADMIN_EMAIL || 'portfolio@example.com'}>`,
      to,
      subject,
      html,
      text: text || 'This email contains HTML content. Please open it in an HTML-compatible client.'
    });
    console.log(`Email successfully sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    // Don't crash the application
    return null;
  }
};

// HTML Template: Confirmation to Client
const getClientConfirmationTemplate = (clientName, projectTitle) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1a202c; background-color: #ffffff;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 0;">Project Request Received</h2>
      <p>Dear <strong>${clientName}</strong>,</p>
      <p>Thank you for reaching out and submitting your project proposal: <strong>"${projectTitle}"</strong>.</p>
      <p>I have successfully received your request details and will review them shortly. Below is what you can expect next:</p>
      <ol style="line-height: 1.6;">
        <li>I will review your project description, requirements, budget, and timeline.</li>
        <li>I will update the status of your request in my dashboard (you'll receive an email update automatically).</li>
        <li>We can coordinate a brief discussion to align on further details if there's a mutual fit.</li>
      </ol>
      <p>If you need to make any immediate adjustments, feel free to reply directly to this email.</p>
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #f3f4f6; font-size: 0.85em; color: #718096; text-align: center;">
        <p>Best Regards,</p>
        <p><strong>Jasbir</strong><br>Full Stack Developer</p>
      </div>
    </div>
  `;
};

// HTML Template: Admin Notification
const getAdminNotificationTemplate = (request) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1a202c; background-color: #ffffff;">
      <h2 style="color: #dc2626; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 0;">New Project Request Submitted</h2>
      <p>A new hire/project request has been received on your portfolio dashboard.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Client Name</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${request.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Email</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${request.email}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Company</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${request.companyName || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Project Title</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${request.projectTitle}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Type</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${request.projectType}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Budget</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${request.budget}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Deadline</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${request.expectedDeadline}</td>
        </tr>
      </table>

      <h3 style="color: #4f46e5; margin-top: 20px; margin-bottom: 5px;">Project Description:</h3>
      <p style="background-color: #f8fafc; padding: 12px; border-radius: 4px; border-left: 4px solid #4f46e5; font-style: italic; white-space: pre-wrap; margin-top: 0;">${request.projectDescription}</p>

      ${request.additionalNotes ? `
        <h3 style="color: #4f46e5; margin-top: 15px; margin-bottom: 5px;">Additional Notes:</h3>
        <p style="background-color: #f8fafc; padding: 12px; border-radius: 4px; border-left: 4px solid #cbd5e1; white-space: pre-wrap; margin-top: 0;">${request.additionalNotes}</p>
      ` : ''}

      <div style="margin-top: 30px; text-align: center;">
        <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/admin/dashboard" style="background-color: #4f46e5; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Go to Admin Dashboard</a>
      </div>
    </div>
  `;
};

// HTML Template: Client Update (Status change or note added)
const getClientUpdateTemplate = (request, statusChanged, newNote, noteAuthor = 'Admin') => {
  let statusColor = '#3b82f6';
  switch (request.status) {
    case 'Accepted': statusColor = '#10b981'; break;
    case 'Rejected': statusColor = '#ef4444'; break;
    case 'In Progress': statusColor = '#f59e0b'; break;
    case 'Completed': statusColor = '#10b981'; break;
    case 'Discussion': statusColor = '#8b5cf6'; break;
    case 'Reviewing': statusColor = '#3b82f6'; break;
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1a202c; background-color: #ffffff;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 0;">Project Update: ${request.projectTitle}</h2>
      <p>Dear <strong>${request.fullName}</strong>,</p>
      <p>There has been an update regarding your project request.</p>

      <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid ${statusColor};">
        <p style="margin: 0 0 10px 0; font-size: 1.1em;">
          Current Status: <span style="color: ${statusColor}; font-weight: bold;">${request.status}</span>
        </p>
        ${statusChanged ? `<p style="margin: 0; font-size: 0.9em; color: #718096;">Status updated just now.</p>` : ''}
      </div>

      ${newNote ? `
        <div style="margin: 20px 0; padding: 15px; background-color: #f0fdf4; border-radius: 6px; border-left: 4px solid #10b981;">
          <h4 style="margin: 0 0 8px 0; color: #166534;">Message/Note from Developer:</h4>
          <p style="margin: 0; white-space: pre-wrap; font-style: italic; color: #1e293b;">"${newNote}"</p>
        </div>
      ` : ''}

      <p>All subsequent communication will continue through this email thread. You can reply directly to this email to get in touch.</p>

      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #f3f4f6; font-size: 0.85em; color: #718096; text-align: center;">
        <p>Best Regards,</p>
        <p><strong>Jasbir</strong><br>Full Stack Developer</p>
      </div>
    </div>
  `;
};

// HTML Template: General Contact Message to Admin
const getContactAdminTemplate = (name, email, subject, message) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1a202c; background-color: #ffffff;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
      <p>You have received a new message from the contact form on your portfolio website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 30%;">Sender Name</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Email Address</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">
            <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Subject</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${subject}</td>
        </tr>
      </table>

      <h3 style="color: #4f46e5; margin-top: 20px; margin-bottom: 5px;">Message Details:</h3>
      <p style="background-color: #f8fafc; padding: 12px; border-radius: 4px; border-left: 4px solid #4f46e5; white-space: pre-wrap; margin-top: 0; font-style: italic;">
        "${message}"
      </p>

      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #f3f4f6; font-size: 0.85em; color: #718096; text-align: center;">
        <p>Reply directly to this email or click the sender's address to get in touch.</p>
      </div>
    </div>
  `;
};

// HTML Template: General Contact Auto-Confirmation to Client
const getContactClientTemplate = (name, subject) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1a202c; background-color: #ffffff;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 0;">Message Received</h2>
      <p>Dear <strong>${name}</strong>,</p>
      <p>This is to confirm that I have received your message regarding: <strong>"${subject}"</strong>.</p>
      <p>Thank you for reaching out. I read all inquiries personally and will respond to your email as soon as possible (usually within 24-48 business hours).</p>
      
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #f3f4f6; font-size: 0.85em; color: #718096; text-align: center;">
        <p>Best Regards,</p>
        <p><strong>Jasbir</strong><br>Full Stack Developer</p>
      </div>
    </div>
  `;
};

module.exports = {
  sendEmail,
  getClientConfirmationTemplate,
  getAdminNotificationTemplate,
  getClientUpdateTemplate,
  getContactAdminTemplate,
  getContactClientTemplate
};

