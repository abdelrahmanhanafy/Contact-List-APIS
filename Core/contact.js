const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let contact = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/[a-zA-Z0-9_-]+@[A-Z0-9]+\.[A-Z]/i, "Please enter a valid e-mail address"]
    },
    mobile: {
        type: String,
        required: true,
        match: [/^01\d{9}/i, "Please enter a valid mobile number"]
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date
    },
});
let model = mongoose.model('Contacts', contact);
contact.plugin(uniqueValidator);
module.exports = model;