import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send contact form email
export const sendContactEmail = async (contactData) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission - ${contactData.firstName} ${contactData.lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message || 'No message provided'}</p>
      <hr>
      <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
    `
  };

  return await transporter.sendMail(mailOptions);
};

// Send investor inquiry email
export const sendInquiryEmail = async (inquiryData) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Investor Inquiry - ${inquiryData.firstName} ${inquiryData.lastName}`,
    html: `
      <h2>New Investor Inquiry</h2>
      <p><strong>Name:</strong> ${inquiryData.firstName} ${inquiryData.lastName}</p>
      <p><strong>Email:</strong> ${inquiryData.email}</p>
      <p><strong>Phone:</strong> ${inquiryData.phone || 'Not provided'}</p>
      <p><strong>Investment Amount:</strong> ${inquiryData.investmentAmount}</p>
      <p><strong>Investment Type:</strong> ${inquiryData.investmentType}</p>
      <p><strong>Message:</strong></p>
      <p>${inquiryData.message || 'No message provided'}</p>
      <hr>
      <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
    `
  };

  return await transporter.sendMail(mailOptions);
};

// Send confirmation email to user
export const sendConfirmationEmail = async (email, name) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Thank you for contacting Cubez Capital',
    html: `
      <h2>Thank You for Reaching Out</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in Cubez Capital. We have received your inquiry and our team will get back to you shortly.</p>
      <p>In the meantime, feel free to explore our <a href="https://cubezcapital.com/investments">investment opportunities</a>.</p>
      <br>
      <p>Best regards,</p>
      <p><strong>Cubez Capital Inc.</strong></p>
      <p><a href="https://cubezcapital.com">www.cubezcapital.com</a></p>
    `
  };

  return await transporter.sendMail(mailOptions);
};

export default {
  sendContactEmail,
  sendInquiryEmail,
  sendConfirmationEmail
};