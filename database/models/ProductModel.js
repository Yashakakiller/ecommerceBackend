const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    categoryName:{
      type:String,
      required:true,
    },
    img:{
      type:String,
      required:true
    },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity:{
    type:Number,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  dateAdded:{
    type: Date,
    default: Date.now
  },
  otherImages: [{
    type: String,
    required: true
  }]
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


