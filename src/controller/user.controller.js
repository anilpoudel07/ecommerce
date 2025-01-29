import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password, role } = req.body;

  if (
    [fullName, email, username, password, role].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "Email or username already exists");
  }

  const user = await User.create({
    fullName,
    email,
    username,
    password,
    role,
  });
  console.log("User created:", user);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  console.log(createdUser);
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
//make a function for loginuser

const loginUser = asyncHandler(async (req, res) => {
  //get the data from the frontend in req.body;
  //hash the password that is done in UserModel
  //find user in the database
  //Compare passwords that is done in UserModel get from there
  //generate jwt token that is done in UserModel get from there
  //return user id
});
export { registerUser, loginUser };
