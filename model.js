const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        maxlength : 40
    },
    email : {
        type : String,
        required : true,
        trim : true,
        match : [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password : {
        type : String,
        required : true
    }
})

const tokenSchema = new mongoose.Schema({
    refreshToken : {
        type : String,
        required :true
    }
})

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    expirationDate : {
        type : Date,
        required : true
    },
    user : {
        type : String,
        required : true
    }
})

const User = mongoose.model('users', userSchema);
const Token = mongoose.model('token', tokenSchema);
const Task = mongoose.model('tasks', taskSchema);

module.exports = {
    User,
    Token,
    Task
}