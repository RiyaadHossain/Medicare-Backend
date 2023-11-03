import httpStatus from "http-status";
import config from "../config/index.js";
import { jwtHelper } from "../helper/jwtHelper.js";
import APIError from "../errors/APIError.js";

const auth =
  (...requiredRoles) =>
  (req, res, next) => {
    const token = req.headers.authorization;

    try {
      if (!token) {
        throw new APIError(httpStatus.UNAUTHORIZED, "Authenticaion required!");
      }

      // Access Token Verificaiton
      const verifiedUser = jwtHelper.verifyToken(token, config.JWT_SECRET);

      // Role Authorization
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new APIError(httpStatus.FORBIDDEN, "Unauthorized access!");
      }

      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
