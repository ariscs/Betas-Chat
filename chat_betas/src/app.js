const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash')

let server = require('http');
let io = require('socket.io');


//Initializations
const keys = require('./config/keys');
const app = express();
const index = require('./routes/index');
require('./api/helpers/local-auth');
server = server.Server(app);
io = io(server);
require('./api/helpers/socket')(io);

//Settings
app.set('port', 3000 || process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'My-secret-session',
    resave: false,
    saveUninitialized: false
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    next();
});
app.use(myConnection(mysql, keys.dbSettings, 'pool'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/', index);

server.listen(app.get('port'), () => {
    console.log('Se ha conectado al servidor');
});