const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET','POST','DELETE','PUT');
  next();
})


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  auth: {
    user:process.env.GMAIL_USER , 
    pass: process.env.GMAIL_PASSWORD,
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, text, attachments } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
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
