const  mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true,
  }
  },
    {
      timestamps: true,
      toJSON: {
        transform: function (doc, ret) {
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.__v;
          delete ret._id;
          ret.id = doc._id;
      },
    }
  });

const ProductModel = mongoose.model('products', productSchema);
module.exports = ProductModel;
