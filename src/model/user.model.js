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
userSchema.methods.generateAcessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
      fullName: this.fullName,
    },
    process.env.ACESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACESS_TOKEN_EXPIRY,
    },
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAcessAndRefreshTokens = async function() {
  try {
    console.log("User Data:", this);
    const acessToken = await this.generateAcessToken();
    console.log("acess Token Generated:", acessToken);
    const refreshToken = await this.generateRefreshToken();
    console.log("Refresh Token Generated:", refreshToken);

    this.refreshToken = refreshToken;
    await this.save({ validateBeforeSave: false });

    return { acessToken, refreshToken };
  } catch (error) {
    throw new Error("Something went wrong while generating acess and refresh tokens");
  }
};

export const User = mongoose.model("User", userSchema);
