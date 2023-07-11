const User = require("../database/models/UserModel")
const Product = require("../database/models/ProductModel")


const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, quantity } =await req.body;

    const userCheck = await User.findById(id).maxTimeMS(20000);
    if (!userCheck) {
      return res.json({ success: false, message: "User Not Found" });
    }

    if (userCheck.cart.find((item) => item.toString() === _id)) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in cart" });
    }

    const cartItem = _id;
    userCheck.cart.unshift(cartItem);
    await userCheck.save();

    res.json({ success: true, message: "Product added to cart", quantity });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};






const deleteFromCart = async (req, res) => {  
  try {
    const { id, _id } = req.params;
    console.log(req.params)

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
      const {id} = req.params;
      const { _id, quantity } = await req.body;

      const user = await User.findOne({_id:id});
      if(!user){
        return res.json({success:false,message:"user not found"})
      }
  
      const product = await Product.findById(_id);
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      if (quantity > product.quantity) {
        return res.json({ success: false, message: 'Requested quantity exceeds available quantity' });
      }
  
      product.quantity -= quantity;
      await product.save();
  
      const cartArray = user.cart;
      const orderArray = user.orders;
      orderArray.push(...cartArray);
      user.cart= [];
      await user.save();

  
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