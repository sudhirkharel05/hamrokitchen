const express = require('express');
const router = express.Router();
const Order = require('../models/Ordermodel');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploads')
router.post('/order',  auth.verifyUser,  function(req,res){
   
    const Items = req.body.items;
    console.log("items")
    const UserID = req.user._id


    const data = new Order (
        {     
             Items : Items,
             UserID : UserID,
        }
    )
    data.save()
    .then(function(result){
        res.status(201).json({message : "Order placed successfully", data: data._id})
        console.log("sudhir")
        console.log(data)
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
});

router.get('/order/:id', function(req, res){
    const id = req.params.id;
   
    Order.findOne({_id :id}).then(
    function(data){
        
        res.status(200).json({success:true, items: data})
    })
    .catch(err=>{
        res.json({success:false, error:err});
    })
});

router.get('/shows', auth.verifyUser, function(req, res){
    console.log("hit")
    const id = req.user._id;
    console.log("hit")
   console.log(id);
    Order.find({UserID :id}).then(
    function(data){
        res.status(200).json({success:true, order: data })
    })
    .catch(err=>{
        res.json({success:false, error:err});
    })
});

router.get('/order/show/:id', auth.verifyUser, function(req, res){
    const UserID = req.params.id;
    console.log(UserID);
    Order.find({UserID : UserID})
    .then(function(data){
        res.status(200).json({success:true, orders: data})
    })
    .catch(function(e){
        res.status(500).json({success:false, error:e})
    })
});

router.delete('/order/delete/:id', auth.verifyUser, function(req, res){
    const id = req.params.id;
    Order.deleteOne({_id : id})
    .then(function(){
        res.status(200).json({message : 'Deleted Successfully'})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

router.get('/show', auth.verifyUser, function(req, res){
    console.log("hit")
    const id = req.user._id;
    console.log("hit")
   console.log(id);
    Order.findOne({UserID :id}).then(
    function(data){
        
        res.status(200).json({success:true, order: data })
    })
    .catch(err=>{
        res.json({success:false, error:err});
    })
});

module.exports = router;
