import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    // images: {
    //  type: String, //cloudinary url
    // required: true,
    //},
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "VENDOR"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.generateAccessAndRefreshTokens = async function () {
  console.log(process.env.ACESS_TOKEN_SECRET);
  console.log(process.env.REFRESH_TOKEN_SECRET);
  const accessToken = jwt.sign(
    {
      id: this._id,
      role: this.role,
      password: this.password,
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    },
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoiZHVtbXlfdXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc0ODMzNzY1LCJleHAiOjE2NzQ4MzQwNjV9.kXo2oJf8tl5E6hZBbbrAfL6pgMklJ3_VdGFnMoH8kZM",
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign(
    {
      id: this._id,
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    },
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoiZHVtbXlfdXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc0ODMzNzY1LCJleHAiOjE2NzU0Mzc1NjV9.kKzBvib0aOAfWOV89grGq22JH9ynFlM2ydFSVWXWxXk",
    { expiresIn: "7d" },
  );

  return { accessToken, refreshToken };
};

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
