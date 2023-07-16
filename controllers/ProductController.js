const Product = require("../database/models/ProductModel")
const Category = require("../database/models/CategoryModel");





// Create a new product and associate it with a category
const createProduct = async (req, res) => {
  const { category, name,desc,img, price, quantity ,dateAdded,otherImages } = await req.body;


  try {
    const customDate = new Date(dateAdded);
    const categoryCheck = await Category.findOne({ name: category }).maxTimeMS(20000);
    if (!categoryCheck) {
      return res.json({ success: false, message: 'Category not found' });
    }

    const productCheck = await Product.findOne({ name }).maxTimeMS(20000);
    if (productCheck) {
      return res.json({ success: false, message: 'Product already exists' });
    }
    const newProduct = await Product.create({ category: categoryCheck._id, name, desc ,img ,price, quantity,categoryName:categoryCheck.name,dateAdded: customDate,otherImages});
    res.status(200).json({ success: true, product: newProduct, message: 'New Product created' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};







const newArrivals = async(req,res) => {
  try {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Query to find products added in the last 7 days
  const query = {
    dateAdded: { $gte: sevenDaysAgo }
  };

  // Find products based on the query
  Product.find(query)
    .exec()
    .then(products => {
      res.status(200).json({success:true,products});
    })
    .catch(error => {
      res.status(500).json({ error: error.message , success:false });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
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
  const { page  } = req.query;
  const pageNumber = parseInt(page) || 1;
  const limitNumber = 10;

  try {
    
    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / limitNumber);

    const products = await Product.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber).maxTimeMS(20000);

    res.json({ success: true, products, totalPages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}









// random product from random category
const randomProduct = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

   
    const query = {
      dateAdded: { $lte: sevenDaysAgo }
    };

    const categories = await Category.find({}).maxTimeMS(20000); // Get all categories
    const randomProducts = []; 

    for (const category of categories) {

      const productsInCategory = await Product.find(
        { category: category._id, ...query } // Specify the fields you want to include
      ).maxTimeMS(20000);

      // Check if there are products in the current category
      if (productsInCategory.length > 0) {
        // Get a random product from the products in the current category
        const randomProduct = productsInCategory[Math.floor(Math.random() * productsInCategory.length)];
        randomProducts.push(randomProduct);
      }
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









const relatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const checkProduct = await Product.findById(id).maxTimeMS(20000);

    if (!checkProduct) {
      return res.json({ success: false, message: "No product found" });
    }

    const relatedProducts = await Product.aggregate([
      { $match: { _id: { $ne: id }, category: checkProduct.category } },
      { $sample: { size: 3 } }
    ]).maxTimeMS(20000);

    res.json({ success: true, relatedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};













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
  newArrivals
}