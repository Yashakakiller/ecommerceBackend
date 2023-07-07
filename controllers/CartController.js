const User = require("../database/models/UserModel")
const Product = require("../database/models/ProductModel")


const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, quantity } =await req.body;
   // console.log(quantity);
    const userCheck = await User.findById(id).maxTimeMS(20000);
    if (!userCheck) {
      return res.json({ success: false, message: "User Not Found" });
    }
    if (userCheck.cart.includes(_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in cart" });
    }

    // Update the code to include the quantity in the cart item
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
      const { id } = req.params;
      const { _id } = await req.body;
      
      const userCheck = await User.findById(id).maxTimeMS(20000);
      if (!userCheck) {
        return res.json({ success: false, message: 'User Not Found' });
      }
      
      if (!userCheck.cart.includes(_id)) {
        return res.status(400).json({ error: 'Product not found in cart' });
      }
      
      userCheck.cart.pull(_id);
      await userCheck.save();
      
      res.json({ success: true, message: 'Product removed from cart' });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  



  const placeOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { _id, quantity } = await req.body;
     // console.log(req.body);
      const user = await User.findOne({ _id: id }).maxTimeMS(20000);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const productCheck = await Product.findById(_id).maxTimeMS(20000);
      if (!productCheck) {
        return res.json({ success: false, message: 'Product not found with this id' });
      }
  
      productCheck.quantity -= quantity;
      await productCheck.save();
  
      const cartArray = user.cart;
      const orderArray = user.orders;
      orderArray.push(...cartArray);
      user.cart = [];
      await user.save();
  
      res.json({ orderArray });
  
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  
  
  







module.exports= {
    addToCart,
    deleteFromCart,
    placeOrder
}