const mongoose = require('mongoose');
const Customer = mongoose.model('Customer',{
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phonenumber : {
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    image:{
        type : String,
        default : "empty"
    },
    role:{
        type: String,
        required : true,
        enum: ["Admin", "Customer", "Restaurant"],
        default: "Customer"
    }
});

module.exports = Customer;