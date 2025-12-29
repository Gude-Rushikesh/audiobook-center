import { Resend } from "resend";


let resend = null;

function getResend() {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing");
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}
export const sendVerificationEmail = async (email, token) => {
  const link = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  console.log("📧 Sending verification email to:", email);

  try {
    const response = await resend.emails.send({
      from: "Audiobook <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${link}">Verify Email</a>
      `,
    });

    console.log("✅ Email sent via Resend:", response);
  } catch (error) {
    console.error("❌ Resend email error:", error);
  }
};
