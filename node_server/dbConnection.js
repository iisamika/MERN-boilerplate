const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://localhost:27017/auctionhouse_db';

mongoose.connect(uri).then(
    () => {
        console.log('Connected to mongoDB!');
    },
    err => {
        console.log('Error connecting to mongoDB: ' + err);
    }
);

module.exports = mongoose.connection;