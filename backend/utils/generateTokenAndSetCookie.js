import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // token expires in 1 day
  });

  // Set the token in a cookie
  res.cookie("token", token, {
    httpOnly: true, // prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // use secure cookies in production
    sameSite: "Strict", // prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expires in 7 days
  });

  return token; // return the token if needed
};
