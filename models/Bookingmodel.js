const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const Book = mongoose.model('Book',{
    Date : {
        type : Date,
   
    },
    Name : {
        type : String,
     
    },
    phonenumber : {
        type : String,

    },
    enTime:{
        type: String,

    },
    exTime:{
        type: String,

    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    restaurantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }
   
});

module.exports = Book;