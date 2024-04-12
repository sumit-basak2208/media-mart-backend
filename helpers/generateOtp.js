const otpGenerator = require("otp-generator");

const OTPGenerator = otpGenerator.generate(8, {
  lowerCaseAlphabets: true,
  upperCaseAlphabets: true,
  specialChars: false,
});

module.exports = { OTPGenerator };
