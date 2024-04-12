const { Router } = require("express");
const { ValidateEmailRegex } = require("../middleware/EmailRegexCheck");
const {
  Register,
  VerifyRegister,
  ResendVerificationEmail,
  Login,
} = require("../controllers/User.control");
const {
  InitiateResetPassword,
  ConfirmResetPassword,
} = require("../controllers/ResetPassword.control");
const { isVerified } = require("../middleware/VerifiedUser");

const UserRoutes = Router();

// validation routes
UserRoutes.route("/register").post(ValidateEmailRegex, Register);
UserRoutes.route("/verify-register").post(
  ValidateEmailRegex,
  VerifyRegister
);
UserRoutes.route("/resent-verification-otp").post(
  ValidateEmailRegex,
  ResendVerificationEmail
);
UserRoutes.route("/reset-password").post(
  ValidateEmailRegex,
  InitiateResetPassword
);
UserRoutes.route("/confirm-reset-password").post(
  ValidateEmailRegex,
  ConfirmResetPassword
);
UserRoutes.route("/login").post(ValidateEmailRegex, isVerified, Login);

module.exports = { UserRoutes };
