const express = require('express');
const router = express.Router();
const Item = require('../Models/ItemsModel');
const auth = require('../Middleware/auth');
const upload = require('../Middleware/uploads')

//adding the product if restaurant/admin is logged in
router.post('/item/insert', auth.verifyUser, auth.verifyAdmin, upload.single('image'), function(req,res){
    console.log(req.body);
    if(req.file == undefined){
        return res.status(400).json({
            message : 'Invalid File Format!'
        })
    }
    const Name = req.body.Name;
    const Price = req.body.Price;
    const Description = req.body.Description;
    const Category =  req.body.Category;
    const path = req.file.path;
  
    const data = new Item (
        {
             image : path,
             Name : Name,
             Price : Price,
             Description : Description,
             Category : Category
        }
    )
    data.save()
    .then(function(result){
        res.status(201).json({message : "Items added successfully"})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

//updating the items
router.put('/item/update', auth.verifyUser, auth.verifyRestaurant || auth.verifyAdmin, function(req,res){
    const id = req.body.id;
    const Name = req.body.Name;
    const Price = req.body.Price;
    const Description = req.body.Description;
    const Category =  req.body.Category;

    Item.updateOne({_id : id },
        {Name : Name, Price : Price, Description : Description, Category: Category})
        .then(function(result){
            res.status(200).json({message : 'Updated Successfully'})
        })
        .catch(function(e){
            res.status(500).json({error : e})
        })
})

//delete
router.delete('/item/delete/:id', auth.verifyUser, auth.verifyRestaurant || auth.verifyAdmin, function(req, res){
    const id = req.params.id;
    Item.deleteOne({_id : id})
    .then(function(){
        res.status(200).json({message : 'Deleted Successfully'})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

//show
router.get('/item/show', function(req, res){
    console.log("Item/Show")
    Item.find({})
    .then(function(data){
       
        res.json({success:true, items: data});
    })
    .catch(err=>{
        res.json({success:false, error:err});
    })
})



//show (for single product)
router.get('/item/category/fastfood', function(req, res){
    console.log("fast food")
    const name = "FastFood"
    Item.find({Category : name})
    .then(function(data){
        res.status(200).json({success:true, items: data})
    })
    .catch(function(e){
        res.status(500).json({success:false, error:err})
    })
})

router.get('/item/category/beverage', function(req, res){
    const name = "Beverage"
    Item.find({Category : name})
    .then(function(data){
        res.status(200).json({success:true, items: data})
    })
    .catch(function(e){
        res.status(500).json({success:false, error:err})
    })
})


router.get('/item/single/:id', function(req, res){
    const id = req.params.id;
   
    Item.findOne({_id :id}).then(
    function(data){
        
        res.status(200).json({success:true, items: data})
    })
    .catch(err=>{
        res.json({success:false, error:err});
    })
});

module.exports = router;