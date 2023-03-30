const  mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cartSchema = new Schema({
  user_buy: {
    type : String,
    required: true,
  },
  cart_id:{
    type: String
  },
  cart: {
    type: String,
    required: true,
  },
  phone_number: {
    type : String,
    default: null,
  },
  first_name: {
    type : String,
    default: null,
  },
  last_name: {
    type : String,
    default: null,
  }
    },
     { timestamps: true,
        toJSON: {
        transform: function (doc, ret) {
        // delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        delete ret._id;
        ret.id = doc._id;
      },
    }
  });

const CartModel = mongoose.model('cart', cartSchema);
module.exports = CartModel;
    