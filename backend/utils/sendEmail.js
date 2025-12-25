import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const link = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "Audiobook <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${link}">Verify Email</a>
    `,
  });
};
