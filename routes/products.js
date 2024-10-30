import express from "express";
import ProductController from "../controller/products.js";

const productRouter = express.Router();

productRouter.get("/", (req, res) => res.send("hello"));
productRouter.get("/products", ProductController.getAll);
productRouter.get("/products/:id", ProductController.getById);
productRouter.post("/create", ProductController.create);
productRouter.put("/update/:id", ProductController.update);
productRouter.delete("/delete/:id", ProductController.delete);

export default productRouter;
