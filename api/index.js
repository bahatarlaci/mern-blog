const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bycrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');

const salt = bycrypt.genSaltSync(10);
const secret = 'mysecretsshhh';

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

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
        jwt.sign({username,id:userDoc.id}, secret, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        res.status(401).json({message: 'Invalid Credentials'});
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) throw err;
        res.json(decoded);
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token').json({message: 'Logged Out'});
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, async (err, decoded) => {
        if (err) throw err;
        res.json(decoded);
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: decoded.id,
        });
        res.json(postDoc);
    });
});

app.get('/posts', async (req, res) => {
    res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: '-1'})
    .limit(20)
    );
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Post.findById(id).populate('author', ['username']));
});

app.listen(4000);