require('dotenv').config()

const mongoose = require('mongoose');
const { User } = require('./model');
const { Token } = require('./model');

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

module.exports = {
    registerUser,
    findUser,
    addToken,
    findToken,
    deleteToken
}