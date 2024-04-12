const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: "",
  },
  isResetPasswordInitiated: {
    type: Boolean,
    default: false,
  },
  resetPasswordOTP: {
    type: String,
    default: null,
  },
  resetPasswordExpiration: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    default: "CUSTOMER",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
