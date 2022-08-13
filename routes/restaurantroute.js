const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploads')
router.post('/restaurant/insert',  auth.verifyUser, auth.verifyRestaurant,  upload.single('image'), function(req,res){
    console.log(req.body);
    if(req.file == undefined){
        return res.status(400).json({
            message : 'Invalid File Format!'
        })
    }
    const rName = req.body.rName;
    const rDescription = req.body.rDescription;
    const rAddress = req.body.rAddress;
    const path = req.file.path;
    const Userid =  req.user._id
  

    const data = new Restaurant (
        {
             image : path,
             rName : rName,
             rDescription : rDescription,
             rAddress : rAddress,
             Userid : Userid
        }
    )
    data.save()
    .then(function(result){
        res.status(201).json({message : "Restaurant added successfully"})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

router.get('/restaurant/show', function(req, res){

    Restaurant.find({})
    .then(function(data){
        console.log("Restaurant");
  
        res.json({success:true, restaurants: data});
    })
    .catch(err=>{
        res.json({success:false, error:err});
    })
})



router.get('/restaurant/:id', function(req, res){

    const userid = req.params.id
    Restaurant.find({Userid : userid})
    .then(function(data){
        res.status(200).json({success:true, items: data})
    })
    .catch(function(e){
        res.status(500).json({success:false, error:e})
    })
})

router.get('/restaurant/allshow', function (req, res) {

    Restaurant.find({})
        .then(function(data){
            console.log(data);
            res.json({success:true, restaurant: data});
        })
        .catch(function(e){
            res.status(500).json({success:false, error:e})
        })

})




module.exports = router;