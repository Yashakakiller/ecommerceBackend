const express = require("express");
const { createProduct, getProductsByCategory, deleteProduct, allProducts, randomProduct } = require("../controllers/ProductController");
const productRouter = express.Router()


// route for create product
productRouter.post('/createproduct', createProduct);


// route for get products
productRouter.get('/byCategory', getProductsByCategory);


// route for delete a product
productRouter.delete("/delete/:id",deleteProduct)


// route for fetching all products
productRouter.get("/allproducts",allProducts)


// route for random products from random category
productRouter.get("/bestDeal/product",randomProduct)


module.exports = {
    productRouter
}



