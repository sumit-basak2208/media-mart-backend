const { errorMessage, HTTP_STATUS } = require("../enums/enums");
const { OTPGenerator } = require("../helpers/generateOtp");
const { HashPassword } = require("../helpers/hashPassword");
const { sendEmail } = require("../helpers/sendEmail");
const { User } = require("../models/UserSchema");

async function InitiateResetPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: { $eq: email } });
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).send({
        error: errorMessage.USER_NOT_EXIST,
      });
    }
    const OTP = OTPGenerator;
    user.isResetPasswordInitiated = true;
    user.resetPasswordOTP = OTP;
    const saveUser = await user.save();
    if (saveUser) {
      await sendEmail(email, OTP, "RESET_PASSWORD");
    }
    res.status(HTTP_STATUS.OK).send({
      message: "Reset password initiated",
      otpStatus: saveUser ? `OTP sent to ${email}` : "Failed to send OTP",
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      error: error.message || "Error initiating reset password",
    });
  }
}

async function ConfirmResetPassword(req, res) {
  try {
    const { email, otp, newPassword } = req.body;
    if (!(email && otp && newPassword)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).send({
        error: errorMessage.REQUIRED_FIELDS,
      });
    }
    const user = await User.findOne({ email: { $eq: email } });
    if (!user.isResetPasswordInitiated) {
      return res.status(HTTP_STATUS.BAD_REQUEST).send({
        error: "Password reset not initiated",
      });
    }
    if (user.resetPasswordOTP != otp) {
      return res.status(HTTP_STATUS.BAD_REQUEST).send({
        error: "Invalid OTP",
      });
    }
    const newHashPassword = await HashPassword(newPassword);
    user.password = newHashPassword;
    user.isResetPasswordInitiated = false;
    user.resetPasswordOTP = null;
    const saveUser = await user.save();
    return res.status(HTTP_STATUS.OK).send({
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      error: error.message || "Error confirming reset password",
    });
  }
}

module.exports = { ConfirmResetPassword, InitiateResetPassword };
