const ProductModel = require("../models/ProductModel.js");

const handleError = (res, error) => {
  res.status(500).send(error.message);
}

exports.getAllProducts = (req, res) => {
  ProductModel
    .find()
    .sort({ createdAt: -1 })
    .then((products) => res.status(200).json(products))
    .catch((error) => handleError(res, error));
}

exports.getProduct = (req, res) => {
  ProductModel
    .findById(req.params.id)
    .then((prod) => res.status(200).json(prod))
    .catch((error) => handleError(res, error));
}

exports.getProdByName = (req, res) => {
  ProductModel
  .findOne({ title: req.params.name } )
  .then((prod) => res.status(200).json(prod))
  .catch((error) => handleError(res, error));
}

exports.addProduct = (req, res) => {
  new ProductModel(req.body)
    .save()
    .then((product) => res.status(200).json(product))
    .catch((error) => handleError(res, error));
}

exports.deleteProduct = (req, res) => {
  ProductModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({message: 'remove successfully'}))
    .catch((error) => handleError(res, error));
}

exports.updateProduct = (req, res) => {
  ProductModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => res.json(product))
    .catch((error) => handleError(res, error));
}

