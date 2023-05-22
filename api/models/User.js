const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username.'],
        unique: true,
        minlength: [3, 'Username cannot be less than 3 characters.'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
    }
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;