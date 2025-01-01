import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

const senderEmail = process.env.GMAIL_SENDER_EMAIL
const senderAppPassword = process.env.GMAIL_SENDER_APP_PASSWORD

export const emailSender = (email: string, verificationCode: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: senderAppPassword,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (err, result)=>{
    if(err instanceof Error){
        return console.log('Error sending email');
    }

    console.log('successfully email sent -> ', result);
  })
};
