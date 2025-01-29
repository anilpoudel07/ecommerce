import { User } from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
class Role {
  constructor() {}
  isUser = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role == "USER") {
      next();
    } else {
      throw new ApiError(403, "Acess denied only allowed to user only");
    }
  });
  isVendor = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === "VENDOR") {
      next();
    } else {
      throw new ApiError(403, "Acess denied only allowed to user only");
    }
  });
  isAdmin = asyncHandler(async (req, res, next) => {
    if (res.user && req.user.role === "ADMIN") {
      next();
    } else {
      throw new ApiError(403, "Acesss denied only allowed to user only");
    }
  });
}
export const isuser = new Role().isUser;

export const isvendor = new Role().isUser;

export const isadmin = new Role().isUser;
