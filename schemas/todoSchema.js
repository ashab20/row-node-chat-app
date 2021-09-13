/*
    Name: Working for CRUD todo application on schema page
    description: this is an app for user create read update and delete
    Auther: Ashab Uddin
    Date: 04/09/2021
*/


// dependancy
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    status:{
        type: String,
        enum:['active','inactive']
    },
    date:{
        type: Date,
        default: Date.now,
    },user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

// instant methos
todoSchema.methods = {
    findActive : function(){
        return mongoose.model('Todo').find({status: 'active'})
    },
}


// work with static methods
todoSchema.statics = {
    findByJS : function() {
        return this.find({title: /js/i});
    }
}
// by query helper
todoSchema.query = {
    byLanguage : function(language){
        return this.find({title: new RegExp(language, "i")})
    }
}

// moudle export
module.exports = todoSchema;