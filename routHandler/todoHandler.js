/*
    Name: Working for CRUD todo application on todoHandler
    description: this is an app for user create read update and delete
    Auther: Ashab Uddin
    Date: 04/09/2021
*/


// dependencies
const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema')
const userSchema = require('../schemas/userSchema')
const router = express.Router();
const Todo = new mongoose.model('Todo', todoSchema);
const User = new mongoose.model('User', userSchema);
const checkLogin = require('../middlewares/checkLogin')

// Get all the todos
router.get('/', checkLogin, async (req, res) => {
    try{
    const data = await Todo.find({}).populate("user", "name username -_id").select({
        _id:0,
        date:0
    });
    res.status(200).json({
        result: data
        })
    }catch(err){
        res.status(500).json({
            error: 'There was an error to get information'
        })
    }
});

// Get active data
router.get('/active', async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findActive();
        res.status(200).json({
            data,
        })

    }catch(err){
        res.status(500).json({
            error: 'Failed to get data'
        })
    }
});


// Get all the todos
router.get('/js', async (req, res) => {
    try{
    const data = await Todo.findByJS();
    res.status(200).json({
        result: data
        })
    }catch(err){
        res.status(500).json({
            error: 'There was an error to get information'
        })
    }
});


// Get data by language
router.get('/language', async (req, res) => {
    try{
    const data = await Todo.find().byLanguage('react');
    res.status(200).json({
        result: data
        })
    }catch(err){
        res.status(500).json({
            error: 'There was an error to get information'
        })
    }
});

// get todo by id
router.get('/:id', async (req,res) => {
    try{
        const data = await Todo.find({_id: req.params.id});
        res.status(200).json({
            result: data
            })
        }catch(err){
            res.status(500).json({
                error: 'There was an error to get User'
            })
        }
});

// post  router
router.post('/', checkLogin, async(req,res) => {
    const newTodo = new Todo({
        ...req.body,
        user: req.userId,
    });

    try{
        const todo = await newTodo.save();
        await User.updateOne({
            _id:req.userId
        },{
            $push: {
                todos: todo._id
            }
        })
        res.status(200).json({
            message: 'Todo was insered Successfully!'
        });

    }catch(error){

        res.status(500).json({
            error: 'There was a server side error'
        });

    }
});

router.post('/all', (req,res) => {
    Todo.insertMany(req.body,(err) => {
        if(err){
            res.status(500).json({
                error: 'There was a server side error'
            })
        }else{
            res.status(200).json({
                    message: "Todo was inserted successfuly"
                })
            
        
        };
});
});

router.put('/:id', async (req,res) => {
    try{
        const data =  await Todo.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    status:'active',
            }
        },{
            new: true,
            useFindAndModify:false
        });

        res.status(200).json({
            result: data,
            message: "Todo waas updated successfuly"
        });  
    }catch (err) {
        res.status(500).json({
            error: 'There was a server side error'
        })
    }

});


router.delete('/:id', async (req, res) => {
    try{
        await Todo.deleteOne({_id: req.params.id});
        res.status(200).json({            
                message: 'User deleted successfully'
            
            })
        }catch(err){
            res.status(500).json({
                error: 'There was an error to delete user'
            });
        }
});

// module Exports
module.exports = router;