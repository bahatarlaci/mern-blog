const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bycrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');

const salt = bycrypt.genSaltSync(10);
const secret = 'mysecretsshhh';

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

mongoose.connect('mongodb+srv://root:sETfYCGdInn7Qll9@mernblog.1sxxbjv.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await User.create({
            username, 
            password: bycrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bycrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({username,id:userDoc.id}, secret, {expiresIn: '1h'}, (err, token) => {res.cookie('token', token).json('Logged In')});
    } else {
        res.status(401).json({message: 'Invalid Credentials'});
    }
});

app.listen(4000);