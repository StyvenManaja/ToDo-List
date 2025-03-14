require('dotenv').config();

const bcrypt = require('bcryptjs');
const dataManagement = require('./dataManagement');
const jwt = require('jsonwebtoken');

function generateToken(username) {
    return jwt.sign({ username }, process.env.TOKEN_SECRET_KEY, { expiresIn : '15m' });
}

const registerUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({ message : 'All fields are required' });
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let userData = {
            username : username,
            email : email,
            password : hashedPassword
        }

        let user = await dataManagement.registerUser(userData);
        if(!user) {
            return res.status(403).json({ message : 'Registration failed. Please try again later.' });
        }

        res.json({ message : `Welcome ${user}` });
    } catch (error) {
        console.log('Internal server error : ', error);
        return res.status(500).json({ message : 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message : 'All fields are required' });
        }
    
        let user = await dataManagement.findUser(email);
        if(!user) {
            return res.status(401).json({ message : 'User not found' });
        }
    
        let validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(403).json({ message : 'Invalid credential' });
        }

        let token = generateToken(user.username);
        let refreshToken = jwt.sign({ username : user.username}, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn : '6h' });
        let tokenSaved = await dataManagement.addToken(refreshToken);
        if(!tokenSaved) {
            return res.status(401).json({ message: 'Failed to save refresh token' });
        }
    
        res.json({ 
            message : `Welcome back ${user.username}`,
            token : token,
            refreshToken : refreshToken
        });
    } catch (error) {
        console.log('Internal server error : ', error);
        return res.status(500).json({ message : 'Internal server error' });
    }
}

const logout = async (req, res) => {
    try {
        let { token } = req.body;
        if(!token) {
            return res.status(403).json({ message : 'Token is required' });
        }

        let deleted = await dataManagement.deleteToken(token);
        if(!deleted) {
            return res.status(403).json({ message : 'Can\'t log out user' });
        }

        res.json({ message : 'User disconnected' });
    } catch (error) {
        console.log('Internal server error : ', error);
        return res.status(500).json({ message : 'Internal server error' });
    }
}

const refreshToken = async (req, res) => {
    try {
        let { token } = req.body;
        if(!token) {
            return res.status(403).json({ message : 'Refresh token not given' });
        }

        let storedToken = await dataManagement.findToken(token);
        if(!storedToken) {
            return res.status(403).json({ message : 'Invalid token' });
        }

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decoded) => {
            if(err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(403).json({ message: 'Token has expired' });
                } else if (err.name === "JsonWebTokenError") {
                    return res.status(403).json({ message: 'Invalid token' });
                } else {
                    return res.status(403).json({ message: 'Authentication error' });
                }
            }
            let newAccessToken = generateToken(decoded.username);
            res.json({ newAccessToken : newAccessToken });
        })
    } catch (error) {
        console.log('Internal server error : ', error);
        return res.status(500).json({ message : 'Internal server error' });
    }
}

const createTask = async (req, res) => {
    try {
        let { title, description, expirationDate } = req.body;
        if(!title || !description || !expirationDate) {
            return res.status(403).json({ message : 'All fields are required' });
        }

        let taskData = {
            title : title,
            description : description,
            expirationDate : expirationDate,
            user : req.username
        }

        let task = await dataManagement.createTask(taskData);
        if(!task) {
            return res.status(401).json({ message : 'Error registering task' });
        }

        res.json({ task : task });
    } catch (error) {
        console.log('Internal server error : ', error);
        return res.status(500).json({ message : 'Internal server error' });
    }
}

const getAllTasks = async (req, res) => {
    try {
        let tasks = await dataManagement.printTask(req.username);
        if(!tasks) {
            return res.status(403).json({ message : 'Error on finding task' });
        }   else if(tasks.length === 0) {
            return res.status(403).json({ message : 'No task found' });
        }

        res.json({ tasks : tasks });
    } catch (error) {
        console.log('Internal server error : ', error);
        return res.status(500).json({ message : 'Internal server error' });      
    }
}

const updateTask = async (req, res) => {
    try {
        let { title, description } = req.body;
        let { id } = req.params;
        if(!title || !description) {
            return res.status(403).json({ message : 'All fields are required' });
        }
        let taskData = {
            title : title,
            description : description,
            user : req.username,
            id : id
        }

        let updatedTask = await dataManagement.updateTask(taskData);
        if(!updatedTask) {
            return res.status(403).json({ message : 'Failed to update task' });
        }

        return res.json({ updatedTask : updatedTask });
    } catch (error) {
        console.log('Internal server error : ', error);
        return res.status(500).json({ message : 'Internal server error' });
    }
}

const deleteTask = async (req, res) => {
    try {
        let user = req.username;
        let { id } = req.params;

        let deleted = await dataManagement.deleteTask(id, user);
        if(!deleted) {
            return res.status(403).json({ message : 'Task doesn\'t exist or already deleted' });
        }

        res.json({ message : 'Task deleted' });
    } catch (error) {
        console.log('Internal server error : ', error);
        return res.status(500).json({ message : 'Internal server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logout,
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
}