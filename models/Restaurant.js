const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant',{
   rName:{
       type : String
   },
    rAddress : {
        type : String
    },
    rDescription : {
        type : String
    },
    image:{
        type:String
    },
    Userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }  
   
});

module.exports = Restaurant;