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
    "-password -refreshToken"
  );
  console.log(createdUser);
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  console.log("Full request body:", req.body); // Debugging log

  const { email, password } = req.body;
  console.log("Extracted password:", password); // Debugging log

  if (!email) {
    throw new ApiError(400, "Username or email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  console.log("User found:", user);
  console.log("Stored password:", user.password);
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } =
    await user.generateAccessAndRefreshTokens();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userID: user._id, user, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

export { registerUser, loginUser };
