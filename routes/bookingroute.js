const express = require('express');
const router = express.Router();
const Book = require('../models/Bookingmodel');
const auth = require('../middleware/auth');

router.post('/book/insert',  auth.verifyUser,  function(req,res){
    const Date = req.body.Date;
    const Name = req.body.Name;
    const phonenumber = req.body.phonenumber;
    const enTime = req.body.enTime;
    const exTime = req.body.exTime;
    const UserID =  req.user._id;
    const restaurantID = req.body.restaurantID;
  

    const data = new Book (
        {
             Date : Date,
             Name : Name,
             phonenumber : phonenumber,
             enTime : enTime,
             exTime : exTime,
             UserID : UserID,
             restaurantID :restaurantID
        }
    )
    console.log(data)
    data.save()
    .then(function(data){
        res.json({success:true, items: data});
    })
    .catch(err=>{
        console.log(err)
        res.json({success:false, error:err});
    })
})

module.exports = router;
