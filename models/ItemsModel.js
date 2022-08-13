const mongoose = require('mongoose');
const Item = mongoose.model('Item',{
    Name : {
        type : String,
        required : true
    },
    Price : {
        type : Number,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    image:{
        type:String
    },
    Category:{
        type: String,
        required : true,
        enum: ["FastFood", "Beverage"],
        default: "FastFood"
      
    },
   
});

module.exports = Item;