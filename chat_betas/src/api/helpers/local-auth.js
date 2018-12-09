const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contra',
    passReqToCallback: true
}, async (req, correo, contra, done) => {
    console.log(req.body.nomUsuario)
    const data = {
        nombreUsuario: req.body.nomUsuario,
        correoUsuario: correo,
        passwordUsuario: bcrypt.hashSync(contra, 10)
    }
    req.getConnection((err, connection) => {
        if(err) throw err;
        connection.query('SELECT * FROM `usuario` WHERE `correoUsuario` = ?', [data.correoUsuario], (err, result) => {
            if(result.length !== 0) {
                return done(null, false, req.flash('signupMessage', 'El usuario o el correo electronico ya estan ocupados'))
            } else {
                connection.query('INSERT INTO usuario SET ?', data, (err, result) => {
                    data.id = result.insertId
                    console.log(data);
                    done(null, data);
                })            
            }
        });
    })
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contra',
    passReqToCallback: true
}, async (req, correo, contra, done) => {
    console.log(correo)
    req.getConnection((err, connection) => {
        if(err) throw err;
        connection.query('SELECT * FROM `usuario` WHERE `correoUsuario` = ?', [correo], (err, result) => {
            if(result.length === 0){
                done(null, false, req.flash('signinMessage', 'El nombre de usuario no existe'))
            } else {
                if(bcrypt.compareSync(contra, result[0].passwordUsuario)){
                    done(null, result[0])
                } else {
                    done(null, false, req.flash('signinMessage', 'El nombre de usuario o la contraseña son incorrectas'))
                }
            }
        })
    })
}))