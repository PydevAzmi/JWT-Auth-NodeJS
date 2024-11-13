const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const {isEmail, isStrongPassword} = require('validator');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        max_length: [20, "First name must be less than 20 characters"],
        min_length: [2, "First name must be at least 2 characters"],
    },
    last_name: {
        type: String,
        maxlength: [20, "Last name must be less than 20 characters"],
        minlength: [2, "Last name must be at least 2 characters"],
    },
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"],
        maxlength: [20, "Username must be less than 20 characters"],
        minlength: [2, "Username must be at least 2 characters"],
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
        minlength: [10, "Email must be at least 10 characters"],
        validate: [isEmail, "Email is invalid"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        validate: [isStrongPassword, "Password is invalid"],
    },
    is_active:{
        type: Boolean,
        default: false,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    is_superuser: {
        type: Boolean,
        default: false,
    },
    last_time_login: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;