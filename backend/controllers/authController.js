import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

export const sighup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    // know let's hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new Error("Failed to hash password");
    }

    // let's do verification code
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // create a new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationExpires: Date.now() + 24 * 60 * 60 * 1000, // expires in 24 hours
    });

    // save the user to the database
    await user.save();

    // create json web token

    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined, // don't send the password back
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { verificationToken } = req.body;
  console.log("verifyVerificationToken: verificationToken", verificationToken);

  try {
    // find the user with the verification code
    const user = await User.findOne({
      verificationToken,
      verificationExpires: { $gt: Date.now() }, // check if the code is still valid
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined; // clear the verification code
    user.verificationExpires = undefined; // clear the expiration date

    // save the user in the database
    await user.save();

    // send a success response
    await sendWelcomeEmail(user.email, user.name); // Assuming you have a function to send a welcome email
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  res.send("Login route");
};

export const logout = async (req, res) => {
  res.send("Logout route");
};
