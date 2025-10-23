const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Log SMTP verification at startup for easier debugging
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP verification failed:', error.message || error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

async function sendMail({ to, subject, html, text }) {
  if (!process.env.FROM_EMAIL) {
    throw new Error('FROM_EMAIL is not configured');
  }
  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    text,
    html,
  });
}

module.exports = { transporter, sendMail };
