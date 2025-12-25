import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  const link = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Audiobook App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the button below to verify your email:</p>
      <a href="${link}"
         style="padding:10px 18px;background:#2563eb;color:#fff;
                text-decoration:none;border-radius:6px;">
         Verify Email
      </a>
      <p>This link expires in 24 hours.</p>
    `,
  });
};
