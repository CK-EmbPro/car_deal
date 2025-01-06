import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EMAIL_CONTEXT } from "../constants/emailContext";
import { contactMessageEmailTemplate } from "../template/emailTemplate";

dotenv.config();

const gmailAuthEmail = process.env.GMAIL_SERVICE_AUTH_EMAIL;
const gmailAuthAppPassword = process.env.GMAIL__SERVICE_AUTH_APP_PASSWORD;

interface EmailSenderOptions{
  emailContext: string,
  signInEmail?: string,
  verificationCode?: string,
  contacterEmail?: string,
  contacterMessage?: string,
  contacterNames?: string

}
export const emailSender = ({
  emailContext,
  signInEmail,
  verificationCode,
  contacterEmail,
  contacterMessage,
  contacterNames,
}: EmailSenderOptions

) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailAuthEmail,
      pass: gmailAuthAppPassword,
    },
  });

  let mailOptions;

  if (emailContext === EMAIL_CONTEXT.VERIFICATION_CODE) {
    const senderEmail = gmailAuthEmail;

    mailOptions = {
      from: senderEmail,
      to: signInEmail,
      subject: "Your Verification Code",
      text: `Your verification code is ${verificationCode}`,
    };
  } else if (emailContext === EMAIL_CONTEXT.CONTACT) {
    const receiverEmail = gmailAuthEmail;
    mailOptions = {
      from: contacterEmail,
      to: receiverEmail,
      subject: "NEW INQUIRY ABOUT CAR_DEAL",
      html: contactMessageEmailTemplate(
        contacterNames!,
        contacterEmail!,
        contacterMessage!
      ),
    };
  }

  transporter.sendMail(mailOptions!, (err, result) => {
    if (err instanceof Error) {
      return console.log("Error sending email");
    }

    console.log("successfully email sent -> ", result);
  });
};
