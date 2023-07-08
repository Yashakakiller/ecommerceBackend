const User = require("../database/models/UserModel")
const Product = require("../database/models/ProductModel")


const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, quantity } = await req.body; // Remove the "await" as it's not necessary here

    const userCheck = await User.findById(id).maxTimeMS(20000);
    if (!userCheck) {
      return res.json({ success: false, message: "User Not Found" });
    }

    if (userCheck.cart.find(item => item._id === _id)) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in cart" });
    }

    const cartItem = { _id, quantity };
    userCheck.cart.unshift(cartItem);
    await userCheck.save();

    res.json({ success: true, message: "Product added to cart", quantity });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};





const deleteFromCart = async (req, res) => {
  try {
    const { id, productId } = req.params;

    const userCheck = await User.findById(id).maxTimeMS(20000);
    if (!userCheck) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    if (!userCheck.cart.includes(productId)) {
      return res.status(400).json({ error: 'Product not found in cart' });
    }

    userCheck.cart.pull(productId);
    await userCheck.save();

    res.json({ success: true, message: 'Product removed from cart' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

  



  const placeOrder = async (req, res) => {
    try {
      const { _id, quantity } = await req.body;
  
      // Fetch the product from the database using the _id
      const product = await Product.findById(_id);
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      if (quantity > product.quantity) {
        return res.status(400).json({ success: false, message: 'Requested quantity exceeds available quantity' });
      }
  
      // Update the product's quantity by subtracting the selected quantity
      product.quantity -= quantity;
      await product.save();
  
      // Place the order
      // Your logic to place the order goes here
  
      res.json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  
  
  







module.exports= {
    addToCart,
    deleteFromCart,
    placeOrder
}