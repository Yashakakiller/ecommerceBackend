const Product = require("../database/models/ProductModel")
const Category = require("../database/models/CategoryModel");






// Create a new product and associate it with a category
const createProduct = async (req, res) => {
  const { category, name, price, img ,quantity} = req.body;

  try {
    const categoryCheck = await Category.findOne({ name: category }).maxTimeMS(20000);
    if (!categoryCheck) {
      return res.json({ success: false, message: 'Category not found' });
    }
    const productCheck = await Product.findOne({name}).maxTimeMS(20000)
    if(productCheck){
      return res.json({success:false , message:"Product is already there "})
    }
    const newProduct = await Product.create({ category: categoryCheck, name, price , img,quantity});
    res.status(200).json({ success: true, product: newProduct, message: 'New Product created' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




const tryProduct = async(req,res) => {
  const products = await Product.find().skip(5).limit(10).maxTimeMS(20000);
  res.json(products);
}




// Get all products with their associated category
const getProductsByCategory = async (req, res) => {
  const { category,page  } = req.query;
  const pageNumber = parseInt(page) || 1;
  const limitNumber = 10;

  try {
    const categoryCheck = await Category.findOne({ name: category }).maxTimeMS(20000);
    if (!categoryCheck) {
      return res.json({ success: false, message: 'Category not found' });
    }

    const filterProducts = { category: categoryCheck._id };
    const totalCount = await Product.countDocuments(filterProducts);
    const totalPages = Math.ceil(totalCount / limitNumber);

    const products = await Product.find(filterProducts)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber).maxTimeMS(20000);

    res.json({ success: true, products, totalPages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};









// delete a product
const deleteProduct = async (req, res) => {
  try {
  const { id } = req.params;
  const product = await Product.findById(id).maxTimeMS(20000);
  if (!product) {
    return res.json({ success: false, message: "Product Not Found" })
  }
  await Product.findByIdAndDelete(id).maxTimeMS(20000);
  res.status(200).json({ success: true, message: "Product Deleted Successfully" })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}









//fetching all products
const allProducts = async (req, res) => {
  try {
  const products = await Product.find({}).maxTimeMS(20000)
  if (!products) {
    return res.json({ success: false, message: "No Products Found" })
  }
  res.json({ success: true, products })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}









// random product from random category
const randomProduct = async (req, res) => {
  try {
  const categories = await Category.find({}).maxTimeMS(20000); // get all categories
  const randomProducts = [];// store random products here

  for (const category of categories) {
    // Get all products in the current category
    const productsInCategory = await Product.find({ category: category._id }).maxTimeMS(20000);

    // Get a random product from the products in the current category
    const randomProduct = productsInCategory[Math.floor(Math.random() * productsInCategory.length)];

    randomProducts.push(randomProduct);
  }

  res.json({ randomProducts });    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};









// fetch single product by id
const singleProduct = async (req,res) => {
  try {
  const {id} = req.params ;
  const checkProduct = await Product.findById(id).maxTimeMS(20000);
  if(!checkProduct){
    return res.json({success:false , message:"No product found"});
  }
  res.json({success:true , product:checkProduct})
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}









const relatedProducts = async (req,res) => {
  try {
    const {id} = req.params;
  const checkProduct = await Product.findById(id).maxTimeMS(20000);
  if(!checkProduct){
    return res.json({success:false , message:"No product found"});
  }
  const relatedProducts = await Product.find({ _id: { $ne: id } ,category:checkProduct.category}).maxTimeMS(20000);
  res.json({success:true,relatedProducts})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}












const searchProduct = async (req, res) => {
  const { query } = req.query;
  try {
    const regex = new RegExp(query, 'i');
    const products = await Product.find({ name: regex }).maxTimeMS(20000);
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};













module.exports = {
  getProductsByCategory,
  createProduct,
  deleteProduct,
  allProducts,
  randomProduct,
  singleProduct,
  relatedProducts,
  searchProduct,
  tryProduct
}