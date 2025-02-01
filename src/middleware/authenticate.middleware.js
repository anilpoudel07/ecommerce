import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

class authenticateClass {
  constructor() {}
  authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    console.log(token);

    if (!token) {
      throw new ApiError(400, "Acess denied");
    }
    try {
      const decoded = jwt.verify(
        token,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoiZHVtbXlfdXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc0ODMzNzY1LCJleHAiOjE2NzQ4MzQwNjV9.kXo2oJf8tl5E6hZBbbrAfL6pgMklJ3_VdGFnMoH8kZM",
      );
      req.userId = decoded.userId;
      next();
    } catch (err) {
      throw ApiError("404", "Invalid or expired access token");
    }
  };
}
export const authenticate = new authenticateClass().authenticate;
