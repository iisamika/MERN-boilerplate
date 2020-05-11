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

router.post('/login', (req, res, next) => {
    
    passport.authenticate('local-login', function (error, user, info) {

        if (error) {
            res.status(400).json({
                message: error || "Oops something went wrong!"
            });
        }

        req.login(user, function(err)   {
            res.json(user);
        });
    })(req, res, next);
});

router.post('/logout', (req, res) =>    {
    if(req.userName)    {
        req.logout();
        res.send({ msg: 'logging out' });
    }
    else    {
        res.send({ msg: 'no user to logout' });
    }
});

router.get('/user', (req, res, next) => {
    console.log('is session user active?:', req.session.user);
    console.log('user: ', req.user);
    console.log('get request /user', req.body.userName)
    
    if(req.user)    {
        res.json({ user: req.user })
    }
    else{
        res.json({ user: null })
    }
});

module.exports = router;