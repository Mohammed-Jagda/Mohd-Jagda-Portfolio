const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Check if email configuration is set up
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

let transporter;
if (isEmailConfigured) {
  transporter = nodemailer.createTransport({
    service: 'gmail', // Or configure other SMTP settings
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
} else {
  console.warn("WARNING: EMAIL_USER and EMAIL_PASS environment variables are not set. Emails will be logged to console instead of sent.");
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend server is running smoothly.' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill all fields: name, email, and message.' });
  }

  // If email configuration exists, send actual email
  if (isEmailConfigured && transporter) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio website:
      
Name: ${name}
Email: ${email}
Message: ${message}`,
      replyTo: email
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email successfully sent from ${email}`);
      return res.status(200).json({ success: true, message: 'Thank you for your message! I will get back to you soon.' });
    } catch (error) {
      console.error('Nodemailer Error:', error);
      return res.status(500).json({ success: false, message: 'Oops! Something went wrong on the server, please try again later.' });
    }
  } else {
    // Development fallback
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for your message! (Development Mode: Message logged to console)' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
