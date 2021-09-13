/*
    Name: Working for CRUD todo application on todoHandler
    description: this is an app for user create read update and delete
    Auther: Ashab Uddin
    Date: 04/09/2021
*/


// dependencies
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema')
const router = express.Router();
const User = new mongoose.model('User', userSchema);

// singup
router.post('/singup', async(req,res) => {
    try{ 
        const hashedPassword =  await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: "User was inserted successfuly"
        })
    }catch(err){
        res.status(500).json({
            message: "There waas an error"
        })
    }
});

// login
router.post('/login', async(req,res) => {
    try{
    const user = await User.find({username: req.body.username});
    if(user && user.length > 0){
        
        const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
        if(isValidPassword){
            // genarate token
            const token = jwt.sign({
                username:user[0].username,
                userId:user[0]._id
            },process.env.JWT_SECRET,{
                    expiresIn: '1h'
                }
                );

            res.status(200).json({
                access_token: token,
                message: 'Login successful'
            })
        }
        else{
            res.status(401).json({
                error: "Authentication failed!",
            })
        }
}
}catch{
    res.status(401).json({
        error: "Authentication failed!",
    })
}
});

// get all todos
router.get('/all', async(req,res) => {
    try{
        const users = await User.find().populate("todos")
        res.status(200).json({
            data:users,
            message: "Successfully"
        })
    }catch(error){
        res.status(500).json({
            message: `There was a server side error in ${error}!`
        })
    }
});

// module Exports
module.exports = router;