const express = require('express');
const app = express();
app.use(express.json());

const nodemailer = require('nodemailer');

// Server static files
app.listen(3000, () => {
    app.use(express.static('public'));
});

// Send email
app.post('/email', (req, res) => {
    console.log('Receiving email data...');
    var data = req.body;

    sendEmail(data.email, data.name, data.message);

    res.end();
});

function sendEmail(email, name, message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'briankov14@gmail.com', // Move to .env
          pass: 'rgryvivlwbxsbftb' // Move to .env
        }
    });
      
    var mailOptions = {
    from: email,
    to: 'briankov14@gmail.com', // Move to .env
    subject: `Mensaje de ${name}`,
    text: `${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}