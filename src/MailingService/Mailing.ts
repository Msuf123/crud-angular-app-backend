import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
  auth: {
    user: process.env.emailForNodemailer,
    pass: process.env.passwordForNodeMailer
  }
});

var mailOptions = {
  from: 'xrobo17@gmail.com',
  to: 'akshatmalik18t@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

function email() {
  transporter.sendMail(mailOptions, function(err, res) {
    console.log("Error:", err);
    console.log("Response:", res);
  });
}

export { email };
