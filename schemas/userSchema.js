/*
    Name: Working for Cuser schema page
    description: this is an app for user create read update and delete
    Auther: Ashab Uddin
    Date: 04/09/2021
*/


// dependancy
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username:{ 
        type:String,
        require: true,
    },password: {
        type: String,
        require:true,
    },
    status:{
        type: String,
        enum:['active','inactive']
    },todos:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Todo"
        }
    ]
});


// moudle export
module.exports = userSchema;