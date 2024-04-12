const { Transporter } = require("../config/emailServer.js");

async function sendEmail(email, OTP, emailType) {
  try {
    emailType.toUpperCase();
    const transporter = Transporter();

    const mailOptions = {
      from: process.env.EMAIL_ID || "",
      to: email,
      subject: `${
        emailType === "REGISTER"
          ? "Welcome to MediaMart - Your OTP for Sign Up"
          : "Password Reset Request for Your MediaMart Account"
      }`,

      html:
        emailType === "REGISTER"
          ? `<h1>Registration OTP: ${OTP}</h1>`
          : `<h1>Forgot password OTP: ${OTP}</h1>`,
    };

    await transporter.sendMail(mailOptions);
    return "Email sent successfully";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { sendEmail };
