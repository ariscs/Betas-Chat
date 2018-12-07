const bcrypt = require('bcrypt');

module.exports = controller = {
    index: (req, res) => {
        res.render('index');
    },

    signUp: (req, res) => {
        res.render('registro');
    },

    chat: (req, res) => {
        req.getConnection((err, connection) => {
            if(err) throw err;
            const idUser = req.session.passport.user.idUsuario;
            connection.query('SELECT * FROM `contacto` WHERE `idUsuario` = ?', [idUser], (err, result) => {
                if(err) throw err;
                res.render('chat', {data: result});
            })

        })
    },

    getMessages: (req, res) => {
        let data = [];
        var results = [];
        data.push(req.body.idContact);
        data.push(req.body.myId);
        req.getConnection(async (err, connection) => {
            if(err) throw err;
            connection.query('SELECT * FROM `mensaje` WHERE `idUsuarioEmisor` = ? AND `idUsuarioRemitente` = ?', data, (err, result) => {
                if(err) throw err;
                for(let i = 0; i < result.length; i++){
                    results.push(result[i]);
                }
            });

            connection.query('SELECT * FROM `mensaje` WHERE `idUsuarioRemitente` = ? AND `idUsuarioEmisor` = ?', data, async (err, result) => {
                if(err) throw err;
                await results.push(...result);
                res.json(results);
            });  
        });
    },

    // profile: (req, res) => {
    //     let data = [req.session.passport.user.idUsuario];
    //     let returnData;
    //     req.getConnection(async (err, connection) => {
    //         await connection.query('SELECT `correoUsuario`, `srcUsuario` FROM `usuario` WHERE `idUsuario` = ?', data, async (err, result) => {
    //             if(err) throw err;
    //             returnData = await result;
    //             res.render('perfil', {returnData});
    //         })
    //     });
    // },

    // uploadImg: (req, res) => {
    //     if(req.file){
    //         console.log
    //     }
    // },
    
    
    getDataUser: (req, res) => {
        req.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('SELECT idUsuario, nombreUsuario, correoUsuario, srcUsuario  FROM `usuario` WHERE `idUsuario` = ?', [req.session.passport.user.idUsuario], (err, result) =>{
                res.json(result);
            })
        })
    },

    updateDataUser: (req, res) => {
        req.getConnection((err, connection) => {
            connection.query('UPDATE usuario SET `nombreUsuario` = ? WHERE `idUsuario` = ?', [req.body.userName, req.session.passport.user.idUsuario], (err, result) => {
                res.json({status: 'OK'});
            })
        })
    },

    updatePassUser: (req, res) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.getConnection((err, connection) => {
            connection.query('UPDATE usuario SET `passwordUsuario` = ? WHERE `idUsuario` = ?', [hash, req.session.passport.user.idUsuario], (err, result) => {
                res.json({status: 'OK'});
            })
        })
    },

    requestToFriend: (req, res) => {
        console.log(req.body)
        const data = {
            estadoContacto: '1',
            nombreContacto: req.body[0].nombreUsuario,
            idUsuarioAgregado: req.body[0].idUsuario,
            idUsuario: req.session.passport.user.idUsuario
        }
        console.log(data)
        req.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('INSERT INTO `contacto` SET ?', data, (err, result) => {
                res.json({status: 'OK'});
            })
        })
    },

    verifyFriend: (req, res) => {
        req.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('SELECT * FROM `usuario` WHERE `correoUsuario` = ?', [req.body.email], (err, result) => {
                res.json(result);
            } )
        })
    },

    getLastMessages: async (req, res) => {
        console.log(req.body)
        var promiseResult = []
        var promiseResult2 = []
        var result = []
        var result2 = []
        function getCon(idUserEmisor) {
            return new Promise((resolve, reject) => {
                req.getConnection((err, connection) => {
                    if(err) throw err;
                    connection.query('SELECT * FROM `mensaje` WHERE (`idUsuarioRemitente` = ? AND `idUsuarioEmisor` = ?)  ORDER BY `idUsuarioRemitente`', [req.session.passport.user.idUsuario, idUserEmisor], async (err, result) => {
                        connection.destroy();
                        resolve(result);
                    })

                })
            })
        }
        
        function getCon2(idUserEmisor) {
        return new Promise((resolve, reject) => {
                req.getConnection((err, connection) => {
                        if(err) throw err;
                        connection.query('SELECT * FROM `mensaje` WHERE (`idUsuarioEmisor` = ? AND `idUsuarioRemitente` = ?)  ORDER BY `idUsuarioEmisor`', [req.session.passport.user.idUsuario, idUserEmisor], async (err, result) => {
                            connection.destroy();
                            resolve(result);
                    })
                })
            })
        }

        for(let j = 0; j < req.body.dataUsers.length; j++){
            promiseResult.push(getCon(req.body.dataUsers[j].idUserFriend));
        }

        
        Promise.all(promiseResult).then((data) => {
            result = []
            data.forEach(obj => {
                result.push(obj);
            })
        })         
        
        for(let i = 0; i < req.body.dataUsers.length; i++){
            promiseResult2.push(getCon2(req.body.dataUsers[i].idUserFriend));
        }

        Promise.all(promiseResult2).then((data) => {
            result2 = []
            data.forEach(obj => {
                result2.push(obj)
            })
            setTimeout(() => {
                res.json({res1: result, res2: result2})
            }, 100)
        })
    }
    
}