const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static site
app.use(express.static(path.join(__dirname)));

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/api/contact', upload.single('attachment'), async (req, res) => {
  try {
    const { firstName, email, interest, message } = req.body;
    const attachment = req.file;

    // Send email via SMTP
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'no-reply@addisafrica.org',
      to: process.env.CONTACT_EMAIL || 'addisafricacso@gmail.com',
      subject: `New contact from ${firstName} (${interest})`,
      text: `${message}\n\nFrom: ${firstName} <${email}>`,
      attachments: attachment ? [{ filename: attachment.originalname, path: attachment.path }] : []
    };

    await transporter.sendMail(mailOptions);

    return res.json({ ok: true, message: 'Message sent' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
