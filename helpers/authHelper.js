// authHelper.js

import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// Hashes the provided password
export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

// Generates an access token
export const generateAccessToken = (userId) => {
  try {
    const token = JWT.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h", 
    });
    return token;
  } catch (error) {
    throw new Error("Error while generating access token");
  }
};

// Sends verification email to the user
export const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).send({ message: "Access denied. Admin privileges required." });
  }
  next();
};

