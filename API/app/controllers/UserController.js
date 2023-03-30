const UserModel = require("../models/UserModel.js");

const handleError = (res, error) => {
        res.status(500).send(error.message);
    };

exports.getUsers = (req, res) => {
            UserModel.find()
            .then((users)=> {
                return res.json(users);
            })
            .catch((error) => handleError(res, error));
    };

    exports.userRole = (req, res) => {
         if(req.body.id){
          UserModel
            .findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then((cart) => res.json(cart))
            .catch((error) => handleError(res, error));
            }
            else return res.status(200).json({message: 'non found user'});
    };

    exports.removeUser = (req, res) => {
		  UserModel
        	.findByIdAndDelete(req.params.id)
        	.then(() => res.status(200).json({message: 'remove successfully'}))
        	.catch((error) => handleError(res, error));
  }