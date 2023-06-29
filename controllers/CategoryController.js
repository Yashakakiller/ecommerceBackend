const Category = require("../database/models/CategoryModel");



// get all categories
const getAllCategories = async (req,res) => {
    const categories = await Category.find({}).maxTimeMS(20000)
    res.json({categories})
}




// create a new category
const createCategory = async (req, res) => {
    const { name , img , desc} = req.body;
  
    const categoryCheck = await Category.findOne({ name }).maxTimeMS(20000);
    if (categoryCheck) {
      return res.json({ success: false, message: 'Category already exists' });
    }
  
    await Category.create({ name , img  , desc});
    res.status(200).json({ success: true, message: 'New Category created' });
  };
  




// fetch a single category
const singleCategory = async (req, res) => {
    const { id } = req.params;
    const categoryCheck = await Category.findOne({ _id: id }).maxTimeMS(20000);
    
    if (!categoryCheck) {
      return res.json({ success: false, message: "No Category Found!!!" });
    }
    
    res.status(200).json({ success: true, categoryCheck });
  };
  



module.exports = {
    getAllCategories ,
    createCategory ,
    singleCategory
}