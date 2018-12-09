const express = require('express');
const router = express.Router();

const multer = require('multer');

const multerConf = {
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname)
        },
        filename: (req, file, next) => {
            const ext = file.mimetype.split('/')[1];
            next(null, `${file.fieldname}-${Date.now()}.${ext}`);
        }
    }),
    fileFilter: (req, file, next) => {
        if(!file){
            next();
        }
        const image = file.mimetype.startsWith('image/')
        if(image){
            next(null, true);
        } else {
            next({message: 'Tipo de imagen no permitida'}, false);
        }
    }
}

//Initializations
const controller = require('.././api/controllers/index');
const middleware = require('.././api/middlewares/authorization');
const passport = require('passport');

router.get('/', middleware.isLogged, controller.index);
router.get('/registro', middleware.isLogged, controller.signUp);

router.post('/', passport.authenticate('local-signin', {
    successRedirect: '/chat',
    failureRedirect: '/',
    failureFlash: true
}));
router.post('/registro', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}));

//THIS ROUTES WORK WHEN THE USER LOG IN THE PAGE
router.get('/chat', middleware.authorization, controller.chat);
router.post('/api/get-messages', middleware.authorization, controller.getMessages);
router.post('/api/get-last-messages', middleware.authorization, controller.getLastMessages);
router.get('/api/get-data-user', middleware.authorization, controller.getDataUser);
router.put('/api/update-data-user', middleware.authorization, controller.updateDataUser);
router.put('/api/update-pass-user', middleware.authorization, controller.updatePassUser);
router.post('/api/verify-friend', middleware.authorization, controller.verifyFriend);
router.put('/api/send-request-friend', middleware.authorization, controller.requestToFriend)
router.delete('/api/end-session', middleware.authorization, controller.endSession);
//TEESTT

// router.post('/imagen', multer(multerConf).single('photo'), controller.uploadImg);

module.exports = router;