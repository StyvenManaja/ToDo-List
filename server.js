require('dotenv').config();

const express = require('express');

const endpoints = require('./endpoints');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

function authentication(req, res, next) {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message : 'Token is missing or expired' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
        if(err) {
            if (err.name === "TokenExpiredError") {
                return res.status(403).json({ message: 'Token has expired' });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                return res.status(403).json({ message: 'Authentication error' });
            }
        }
        req.username = decoded.username;
        next();
    })
    
}

app.get('/', authentication, (req, res) => {
    res.json({ message : `Welcome back ${req.username}` });
})

app.get('/tasks', authentication, endpoints.getAllTasks);

app.post('/add-task', authentication, endpoints.createTask);
app.put('/update-task/:id', authentication, endpoints.updateTask);
app.delete('/delete-task/:id', authentication, endpoints.deleteTask);

app.post('/signup', endpoints.registerUser);
app.post('/login', endpoints.loginUser);
app.post('/refresh', endpoints.refreshToken);
app.post('/logout', endpoints.logout);

app.listen(PORT, () => {
    console.log('Server launched at port : ', PORT);
})