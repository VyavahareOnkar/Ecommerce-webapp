import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler("Please login first to access this resource", 401)
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedData) {
    return next(new ErrorHandler("Unauthorized user", 401));
  }

  req.user = await User.findById(decodedData.id);
  next();
});



export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // console.log(roles);
    // console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `The ${req.user.role} does not have access to this resource`,
          403
        )
      );
    }
    next();
  };
};
