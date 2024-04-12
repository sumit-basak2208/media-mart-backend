const jwt = require("jsonwebtoken");

function decryptJwt(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      userId: decoded._id,
      username: decoded.username,
      email: decoded.email,
      isVerified: decoded.isVerified,
      role: decoded.role,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { decryptJwt };
