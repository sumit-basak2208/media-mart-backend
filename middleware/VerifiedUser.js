const { HTTP_STATUS, errorMessage } = require("../enums/enums");
const { decryptJwt } = require("../helpers/decryptJwt");
const { User } = require("../models/UserSchema");

async function isVerified(req, res, next) {
  try {
    const username = req.body.email;
    
    if (!username) {
      return res.status(HTTP_STATUS.BAD_REQUEST).send({
        error: errorMessage.USER_NOT_EXIST,
      });
    }

    const user = await User.findOne({ email: { $eq: username } });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).send({
        error: errorMessage.NOT_FOUND,
      });
    }

    if (!user.isVerified) {
      return res.status(HTTP_STATUS.NOT_AUTHORIZED).send({
        error: errorMessage.USER_NOT_VERIFIED,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error:
        error.message ||
        "Error in isVerified middleware. Contact the developer for help.",
    });
  }
}

function isAuthorized(authorizeRoles = []) {
  return async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decodedToken = decryptJwt(token);
      const role = decodedToken.role;

      if (!role) {
        return res
          .status(401)
          .json({ message: "Invalid token format: Missing username" });
      }

      if (!authorizeRoles.includes(role)) {
        return res.status(401).json({ message: "Not authorized" });
      }

      req.role = { role };
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  };
}
module.exports = { isVerified, isAuthorized };
