import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

const CategoryRouter = express.Router();

//routes
// create category
CategoryRouter.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
CategoryRouter.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getAll category
CategoryRouter.get("/get-category", categoryController);

//single category
CategoryRouter.get("/single-category/:slug", singleCategoryController);

//delete category
CategoryRouter.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default CategoryRouter;
