const express = require('express');
const router = express.Router();
const LoginData = require('../models/login');
const bcrypt = require('bcrypt');
const passport = require('../config');
const session = require('express-session');

router.route('/add').post((req, res) => {

    const userName = req.body.userName;
    const passWord = bcrypt.hashSync(req.body.passWord, 10);
    const firstName = req.body.firstName || "Please enter your first name";
    const lastName = req.body.lastName || "Please enter your last name";

    const newUser = new LoginData({
        userName,
        passWord,
        userInfo: {
            firstName,
            lastName
        }
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(() => res.json('Some error!'));
});

router.get('/user-info', function(req, res)    {
    console.log('res.user', req.user._id);
    _id = req.user._id
    LoginData.findById({_id}).then(function(data)    {
        console.log('data', data.userInfo);
        res.send(data.userInfo);
    })
});

router.post('/update-user-info', function(req, res) {
    console.log("HELLO!");
    _id = req.user._id;
    let userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    console.log(userInfo);
    LoginData.updateOne({_id}, {$set: {userInfo}}).then(function(data) {
        console.log({_id}, {$set: userInfo})
        //res.send(data.userInfo);
    });
});

router.post('/login', function (req, res, next) {
    next()
    },
    passport.authenticate('local-login'), (req, res) =>{
        let userData = {
            userName: req.user.userName
        };
        res.send(userData);
    }
);

router.post('/logout', (req, res) => {
    if (req.userName) {
        req.logout();
        res.send({ msg: 'logging out' });
    }
    else {
        res.send({ msg: 'no user to logout' });
    }
});

router.get('/', (req, res, next) => {

    if (req.user) {
        res.json({ user: req.user })
    }
    else {
        res.json({ user: null })
    }
});

module.exports = router;