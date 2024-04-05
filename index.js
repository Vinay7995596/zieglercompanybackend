const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Route to receive form data
app.post('/send-email', (req, res) => {
  const { fromPlace, toPlace, date, oldCount, email, message } = req.body;

  // Email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
      user: 'ragichattuvinay1919@gmail.com', // Your Gmail email address
      pass: 'plfr jipx cdbs olwz' // Your Gmail password or app-specific password
    }
  });

  const mailOptions = {
    from: 'ragichattuvinay1919@gmail.com',
    to:email, // Recipient email address
    subject: 'New message from your website',
    text: `Thank you for considering our booking service for your upcoming journey. To assist you effectively, kindly provide the following details:
Number of seats required:${fromPlace}\nDestination:destination: ${toPlace}\ndate: ${date}\npassengers:${oldCount}
Rest assured, we are committed to providing you with a seamless and enjoyable booking experience. We eagerly await your response to proceed with your reservation.

Warm regards, \ntransfer.com`
  };

  // Sending email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(PORT, () =>{});
