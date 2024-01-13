const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  auth: {
    user:process.env.GMAIL_USER , // Replace with your email
    pass: process.env.GMAIL_PASSWORD, // Replace with your email password
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, text, attachments } = req.body;

  const mailOptions = {
    from: 'sisekodolwana17@gmail.com',
    to,
    subject,
    text,
    attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app }