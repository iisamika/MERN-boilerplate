const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const loginSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    passWord: {
        type: String,
        required: true,
        unique: false,
        trim: false,
        minlength: 3
    },
    userInfo:{
        firstName: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 2
        },

        lastName: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 2
        }
    }
});

const LoginData = mongoose.model('Userdata', loginSchema, 'userdata');

module.exports = LoginData;