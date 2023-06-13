const Product = require("../database/models/ProductModel")
const Category = require("../database/models/CategoryModel");


// Create a new product and associate it with a category
const createProduct = async (req, res) => {
  const { category, name, price, img , title , desc } = req.body;

  try {
    const categoryCheck = await Category.findOne({ name: category });
    if (!categoryCheck) {
      return res.json({ success: false, message: 'Category not found' });
    }
    const productCheck = await Product.findOne({name})
    if(productCheck){
      return res.json({success:false , message:"Product is already there "})
    }
    const newProduct = await Product.create({ category: categoryCheck, name, price , img , title , desc });
    res.status(200).json({ success: true, product: newProduct, message: 'New Product created' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating product' });
  }
};







// Get all products with their associated category
const getProductsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const categoryCheck = await Category.findOne({ name: category });
    if (!categoryCheck) {
      return res.json({ success: false, message: 'Category not found' });
    }
    const products = await Product.find({ category: categoryCheck._id });

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving products by category' });
  }
};






// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.json({ success: false, message: "Product Not Found" })
  }
  await Product.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: "Product Deleted Successfully" })
}






//fetching all products
const allProducts = async (req, res) => {
  const products = await Product.find({})
  if (!products) {
    return res.json({ success: false, message: "No Products Found" })
  }
  res.json({ success: true, products })
}






// random product from random category
const randomProduct = async (req, res) => {
  const categories = await Category.find({}); // get all categories
  const randomProducts = [];// store random products here

  for (const category of categories) {
    // Get all products in the current category
    const productsInCategory = await Product.find({ category: category._id });

    // Get a random product from the products in the current category
    const randomProduct = productsInCategory[Math.floor(Math.random() * productsInCategory.length)];

    randomProducts.push(randomProduct);
  }

  res.json({ randomProducts });
};










module.exports = {
  getProductsByCategory,
  createProduct,
  deleteProduct,
  allProducts,
  randomProduct
}