require('dotenv').config()

const mongoose = require('mongoose');
const { User } = require('./model');
const { Token } = require('./model');
const { Task } = require('./model');

mongoose.connect(process.env.db_url);

const registerUser = async (userData) => {
    try {
        let user = await User.create({
            username : userData.username,
            email : userData.email,
            password : userData.password
        })

        return user.username;
    } catch (error) {
        console.log('Error registering the user : ', error);
        return null;
    }
}

const findUser = async (email) => {
    try {
        let user = await User.findOne({ email : email });
        if(!user) {
            console.log('User not found');
            return null;
        }

        return user;
    } catch (error) {
        console.log('Error on finding user : ', error);
        return null;
    }
}

const addToken = async (token) => {
    try {
        await Token.create({
            refreshToken : token
        })

        return true;
    } catch (error) {
        console.log('Error on adding the refresh token : ', error);
        return false;
    }
}

const findToken = async (token) => {
    try {
        let storedToken = await Token.findOne({ refreshToken : token });
        return storedToken;
    } catch (error) {
        console.log('Error finding token : ', error);
        return null;
    }
}

const deleteToken = async (token) => {
    try {
        await Token.deleteOne({ refreshToken : token });
        return true
    } catch (error) {
        console.log('Error deleting token : ', error);
        return false;
    }
}

const createTask = async (taskData) => {
    try {
        let task = await Task.create({
            title : taskData.title,
            description : taskData.description,
            expirationDate : taskData.expirationDate,
            user : taskData.user
        });

        return task;
    } catch (error) {
        console.log('Error creating task : ', error);
        return null;
    }
}

const printTask = async (username) => {
    try {
        let tasks = await Task.find({ user : username });
        return tasks;
    } catch (error) {
        console.log('Error on finding all tasks : ', error);
        return null;
    }
}

const updateTask = async (updatedTaskData) => {
    try {
        let updatedTask = await Task.updateOne({ 
            user : updatedTaskData.user,
            id : updatedTaskData.id,
            $set : {
                title : updatedTaskData.title,
                description : updatedTaskData.description
            }
        })

        return updatedTask;
    } catch (error) {
        console.log('Error updating the task : ', error);
        return null;
    }
}

const deleteTask = async (id, user) => {
    try {
        await Task.deleteOne({ 
            user : user,
            id : id
        })

        return true;
    } catch (error) {
        console.log('Error deleting task or task already deleted : ', error);
        return false;
    }
}

module.exports = {
    registerUser,
    findUser,
    addToken,
    findToken,
    deleteToken,
    createTask,
    printTask,
    updateTask,
    deleteTask
}