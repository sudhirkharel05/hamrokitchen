const express = require('express');
const router = express.Router();
const Customer = require('../models/register_model');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const upload = require('../middleware/uploads');
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");


router.post('/register', [
    check('username', 'Username is required !').not().isEmpty(),
    check('email', 'Email is required !').not().isEmpty(),
    check('phonenumber', 'Phone Number is required !').not().isEmpty(),
    check('password', 'Password is required !').not().isEmpty(),
    check('role', 'Your Role is required !').not().isEmpty()
], upload.single('image'), function (req, res) {
    console.log(req.body)
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const username = req.body.username;
        const email = req.body.email;
        const phonenumber = req.body.phonenumber;
        const password = req.body.password;
        const role = req.body.role;
        const image = "";
        bcryptjs.hash(password, 10, function (err, hash) {
            const data = new Customer({

                username: username,
                email: email,
                phonenumber: phonenumber,
                role: role,
                image: image,
                password: hash
            })
            data.save().then(function (result) {
                res.status(201).json({ message: "Registered Success!!" })
                console.log("Registered Successfull");
            }).catch(function (err) {
                res.status(500).json({ error: err });
            })

        })
    }
    else {
        // invalid
        res.send(errors.array());
    }
});

router.post('/user/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    Customer.findOne({ username: username })
        .then(function (userData) {
            if (userData === null) {
                // username false
                return res.status(401).json({ message: "Invalid credentials!!" })
            }
            // if username exists
            bcryptjs.compare(password, userData.password, function (err, result) {
                if (result === false) {
                    // password wrong
                    return res.status(401).json({ message: "Invalid credentials!!" })
                }
                // all good
                // then generate token - ticket
                const token = jwt.sign({ userId: userData._id }, 'anysecretkey');
                //  res.send(token)
                return res.status(200).json({

                    success: true,
                    token: token,
                    role: userData.role,
                    id: userData._id
                })
            })

        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })

})

//update
router.put('/user/update', function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const id = req.body.id;
    Customer.updateOne({ _id: id }, { username: username, email: email, phonenumber: phonenumber })
        .then(
            function () {
                res.status(200).json({ message: "updated" })
            })
        .catch(function () {
            res.status(500).json({ error: e })
        })
});


//change password

router.put('/user/authentication', auth.verifyUser, function (req, res) {
  
    console.log(req.body);
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const _id = req.user._id;
   
    console.log(_id);
   
    Customer.findOne({ _id: _id })
        .then(function (userData) {
            // if username exists
            bcryptjs.compare(password, userData.password, function (err, result) {
                console.log(result, userData)
                if (result === false) {
                    // password wrong
                    return res.status(401).json({ message: "Invalid credentials!!" })
                }
                // all good
               
                else{
                    
                bcryptjs.hash(newPassword, 10, function (err, hash){
                    Customer.updateOne({ _id: id },
                        { password: hash })
                        .then(
                            function (data) {
                                console.log("updated")
                                res.status(200).json({success:true, message: "Password Updated"})
                            })
                        .catch(function (e) {
                            console.log(e)
                          res.status(500).json({success:false, message:e})
                        })
                })
            }
               
            });

})
    .catch(function (e) {
        res.status(500).json({success: false, message: e })
    })

});



router.put('/user/updateprofile', auth.verifyUser,  upload.single('image'), function (req, res) {
    console.log("hit");
    if (req.file == undefined) {
        console.log(req.file)
        return res.status(400).json({
            message: 'Invalid File Format!'
        })
    }
    const email = req.body.email;
    const image = req.file.path;
    const id = req.user._id;
    Customer.updateOne({ _id: id },
        { image: image, email: email })
        .then(
            function (data) {
                console.log("updated")
                res.status(200).json({ message: "updated", user: data.image })
            })
        .catch(function (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        })
});

router.delete("user/delete/:id", function (req, res) {
    const id = req.params.id;
    Customer.deleteOne({ _id: id })
        .then()
        .catch()
})

router.get("/user/single", auth.verifyUser, function (req, res) {
    console.log('.')
    const id = req.user._id;
    Customer.findOne({ _id: id }).then(
        function (data) {
            res.status(200).json({ success: true, username: data.username, email : data.email, phonenumber: data.phonenumber, image: data.image  })
        })
        .catch(function () {
            res.status(500).json({ error: e })
        })
});



router.get('/user/show', function (req, res) {

    Customer.find().then(function (data) {
        //console.log(data1);
        res.send(data);
    })
})





module.exports = router;

