import Product from "../model/products.js";

const ProductController = {
  getAll: async (req, res) => {
    try {
      const getProducts = await Product.find({});
      res.send(getProducts);
    } catch (e) {
      console.log(`An error occurred ${e}`);
      res.send(`An error occurred ${e}`);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const getProduct = await Product.findById(id);
      res.send(getProduct);
    } catch (e) {
      console.log(`An error occurred ${e}`);
      res.send(`An error occurred ${e}`);
    }
  },
  create: async (req, res) => {
    try {
      const createProduct = await Product.create(req.body);
      res.send(`${createProduct} \n has been created`);
    } catch (e) {
      console.log(`An error occurred ${e}`);
      res.send(`An error occurred ${e}`);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
      res.send(`Product at ${id} has been updated\n${updatedProduct}`);
    } catch (e) {
      console.log(`An error occurred ${e}`);
      res.send(`An error occurred ${e}`);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteProduct = await Product.findByIdAndDelete(id);
      res.send(`${deleteProduct}\n has been deleted`);
    } catch (e) {
      console.log(`An error occurred ${e}`);
      res.send(`An error occurred ${e}`);
    }
  }
};

export default ProductController;
