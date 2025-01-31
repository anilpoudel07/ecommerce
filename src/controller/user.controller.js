import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
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
export { registerUser };


const loginUser = asyncHandler(async (req, res) => {
  const {email, username, password} = req.body;
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { acessToken, refreshToken } = await user.generateAcessAndRefreshTokens();
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  return res
    .status(200).json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          acessToken,
          refreshToken,
        },
        "User logged in successfully",
      ),
    );
});
export { loginUser };
