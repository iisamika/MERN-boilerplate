const Strategy = require('passport-local').Strategy;
const LoginData = require('../models/login');
const bcrypt = require('bcrypt');

const LocalPassportStrategy = new Strategy({usernameField: 'userName', passwordField: 'passWord'}, async function(userName, passWord, done) {
    await LoginData.findOne({ userName }).lean().exec((err, user) => {
        if(err) {
            return done(err, null);
        }
        if(!user)    {
            return done('No user found', null);
        }
        const isPasswordValid = bcrypt.compareSync(passWord, user.passWord);

        if(!isPasswordValid){
            return done('Incorrect username or password!', null);
        }
        return done(null, user);
    });
});

module.exports = LocalPassportStrategy;