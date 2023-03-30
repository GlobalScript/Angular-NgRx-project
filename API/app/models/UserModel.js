const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true,
        default: 'user'
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
                delete ret.password
                ret.id = doc._id;
            },
        }
    }
);

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;