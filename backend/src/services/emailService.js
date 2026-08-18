import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"SmartSociety" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'SmartSociety - Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
        <h2>SmartSociety Password Reset</h2>

        <p>You requested to reset your password.</p>

        <p>Your OTP is:</p>

        <h1 style="letter-spacing: 8px;">${otp}</h1>

        <p>This OTP will expire in 10 minutes.</p>

        <p>If you did not request this, please ignore this email.</p>
      </div>
    `
  })
}
