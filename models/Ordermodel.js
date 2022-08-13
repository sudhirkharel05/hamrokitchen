const mongoose = require('mongoose');
const Order = mongoose.model('Order',{
    Date : {
        type : Date,
        default: Date.now()
    },
    Items : [
        [String]
    
    ],
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }
   
});

module.exports = Order;