import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

// Register
authRouter.post("/register", registerController);

// Login
authRouter.post("/login", loginController);

// Forgot Password
authRouter.post("/forgot-password", forgotPasswordController);

// Test route
authRouter.get("/test", requireSignIn, isAdmin, testController);

// Protected User route auth
authRouter.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Admin route auth
authRouter.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update profile
authRouter.put("/profile", requireSignIn, updateProfileController);

// Orders
authRouter.get("/orders", requireSignIn, getOrdersController);

// All orders (Admin only)
authRouter.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// Order status update (Admin only)
authRouter.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default authRouter;
