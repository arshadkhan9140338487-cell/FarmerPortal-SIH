const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    phoneNo: {
        type: Number
    },
    cropName: {
        type: String
    },
    cropValue: {
        type: String
    }
});

const User= mongoose.model("User", userSchema);
module.exports = User;