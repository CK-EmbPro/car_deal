export const contactMessageEmailTemplate = (
  contacterNames: string,
  contacterEmail: string,
  message: string
): string =>
  `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #007BFF;">New Contact Message</h2>
    <p><strong>Sender Name:</strong> ${contacterNames}</p>
    <p><strong>Sender Email:</strong> ${contacterEmail}</p>
    <p><strong>Message:</strong></p>
    <div style="background: #f9f9f9; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      ${message}
    </div>
    <p style="margin-top: 20px;">Please respond to the sender as soon as possible.</p>
    <p style="color: #555; font-size: 0.9em;">This email was automatically generated by the contact form.</p>
  </div>
`;

export const subscriptionMessageEmailTemplate = (subscriberEmail: string): string => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007BFF;">Welcome to Car_Deal Ltd!</h2>
        <p>Dear Subscriber,</p>
        <p>Thank you for subscribing to Car_Deal Ltd's newsletter. We’re thrilled to have you on board.</p>
        <p>You’ll now receive regular updates, news, and exclusive content directly in your inbox at:</p>
        <p style="font-weight: bold;">${subscriberEmail}</p>
        <p>If you have any questions or wish to manage your subscription, feel free to contact us anytime.</p>
        <p style="margin-top: 20px;">Warm regards,<br>The Car_Deal Ltd Team</p>
        <p style="color: #555; font-size: 0.9em;">This email was automatically generated. Please do not reply to this email.</p>
      </div>
    `;
  };
  