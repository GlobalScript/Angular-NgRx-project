const CartModel = require( "../models/CartModel.js");

const handleError = (res, error) => {
    res.status(500).send(error.message);
  };

  exports.addFirstCart = (req, res) => {
      new CartModel( req.body )
          .save()
          .then((cart) =>{
                res.status(200).json(cart);
          }) 
            .catch((error) => handleError(res, error));
    };

    exports.addNextCart = (req, res) => {
            if(req.body.cart_id){
          CartModel
            .findByIdAndUpdate(req.body.cart_id, req.body, { new: true })
            .then((cart) => res.json(cart))
            .catch((error) => handleError(res, error));
            }
            else return res.status(200).json({message: 'error when adding the product on the server'});
    };

  exports.allCart = (req, res) => {
         CartModel
            .find({"user_buy": "custom"})
            .then((cart) => res.status(200).json(cart))
            .catch((error) => handleError(res, error));  
    };

    exports.getCart = (req, res) => {
         CartModel
            .findById(req.params.id)
            .then((cart) => res.status(200).json(cart))
            .catch((error) => handleError(res, error));  
    };

    exports.deleteCart = (req, res) => {
      CartModel
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({message: 'remove successfully'}))
        .catch((error) => handleError(res, error));
    }
