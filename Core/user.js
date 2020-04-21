const mongoose = require('mongoose');
let user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
let model = mongoose.model('Users', user);
module.exports = model;