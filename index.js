/*
    Name: Working for CRUD todo application on index page
    description: this is an app for user create read update and delete
    Auther: Ashab Uddin
    Date: 04/09/2021
*/


// dependancies
const  express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routHandler/todoHandler');
const userHandler = require('./routHandler/userHandler');
const dotenv = require('dotenv');

// Express app initilataion
const app = express();
dotenv.config();
app.use(express.json());



// database conntection with ongoose
mongoose.connect('mongodb://localhost/todo',{useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {
    console.log('connecion succesfuly');
})
.catch(err => {console.log(err)})

// application route
app.use('/todo', todoHandler)
app.use('/user', userHandler)


// Error Handling
const ErrorHandler = (err,req,res,next) => {
    if(res.headersSend){
        return next(err);
    }

    res.status(500).json({error: err})
}

app.use(ErrorHandler);
// Server Setup
app.listen(3000, () => {
    console.log('Server connected to port 3000');
});