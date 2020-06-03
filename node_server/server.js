const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const dbConnection = require('./dbConnection');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);
const passport = require('./config');
const app = express();
const PORT = 5000;

const postRoute = require('./routes/posts');

app.use(morgan('dev'));
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.use(
    session({
        secret: 'potato',
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/posts', postRoute);

app.listen(PORT, () => {
    console.log('App listening on port: ' + PORT);
})

module.exports = app;






