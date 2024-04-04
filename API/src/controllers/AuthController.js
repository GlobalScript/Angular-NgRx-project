const UserModel = require("../models/UserModel.js");
const bcrypt = require('bcrypt');
const  jwt = require("jsonwebtoken");
const App = require("../../index");

    const handleError = (res, error) => {
        res.status(500).send(error.message);
    };

    const generateToken = (role, firstname, lastname, email, id) => {
            const payload = {
                role,
                firstname,
                lastname,
                email,
                id
            };
            return jwt.sign(payload, process.env.SECRET_KEY_TOKEN, {expiresIn: "24h"});
        };

    exports.registration = (req, res) => {
            const {email, password, lastname, firstname} = req.body;
            UserModel.findOne({email})
            .then((user) => {
                if(user) {
                    return res.status(400).json({message: 'the email is already in the database'});
                }
                if(email && password){
                    const hashPassword = bcrypt.hashSync(password, 10);
                    new UserModel({email, password: hashPassword, lastname, firstname})
                    .save().then(() => App.userNotification());
                    return res.status(200).json({message:'registration successfully'});
                }
                else return res.status(400).json({message: 'username or password is empty'});
            })
            .catch((error) => handleError(res, error));
    };

    exports.login = (req, res) => {
            const {email, password} = req.body;
                UserModel.findOne({email})
            .then((user) => {
                if(!user) {
                    return res.status(400).json({message: 'user not fount'});
                }
            const validPassword = bcrypt.compareSync(password, user.password);
                if(!validPassword) {
                    return res.status(400).json({message: 'wrong password'});
                }
            const token = generateToken(user.role, user.firstname, user.lastname, user.email, user.id);
                    return res.json({token});
            })
            .catch((error) => handleError(res, error));
    };

