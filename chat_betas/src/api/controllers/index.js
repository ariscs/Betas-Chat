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
            connection.query('SELECT * FROM `contacto` WHERE `idUsuario` = ? AND `estadoContacto` = ?', [idUser, '1'], (err, result) => {
                if(err) throw err;
                if(result.length == 0){
                    result[0] = {idUsuario: idUser, userName: req.session.passport.user.nombreUsuario}
                } else {
                    result[0].userName = req.session.passport.user.nombreUsuario;
                }

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

    endSession: (req, res) => {
        req.session.destroy();
        req.session = null;
        res.json({status: 'OK'})
    },
    
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

    updateContactUser: (req, res) => {
        req.getConnection((err, connection) => {
            connection.query('UPDATE contacto SET `nombreContacto` = ? WHERE `nombreContacto` = ?', [req.body.newUser, req.body.lastUser], (err, result) => {
                res.json({status: 'OK'})
            })
        })
    },
    
    addNewUser: (req, res) => {
        req.getConnection((err, connection) => {
            connection.query('UPDATE contacto SET `estadoContacto` = ? WHERE `idUsuarioAgregado` = ? AND `idUsuario` = ?', ['1' , req.body.idUsuarioAgregado, req.body.idUsuario], (err, result) => {
                res.json({status: 'OK'})
            })
        })
    },

    getPendingFriends: (req, res) => {
        req.getConnection((err, connection) => {
            connection.query('SELECT * FROM `contacto` WHERE `idUsuario` = ? AND `estadoContacto` = ?', [req.session.passport.user.idUsuario, '0'], (err, result) => {
                if (err) throw err;
                res.json(result);
            })
        })
    },

    declineContact: (req, res) => {
        req.getConnection((err, connection) => {
            connection.query('DELETE FROM `contacto` WHERE `idUsuario` = ? AND `idUsuarioAgregado` = ?', [req.body.idUsuarioAgregado, req.body.idUsuario], (err, result) => {
                if (err) throw err;
                connection.destroy();
            })
        });

        req.getConnection((err, connection) => {
            connection.query('DELETE FROM `contacto` WHERE `idUsuario` = ? AND `idUsuarioAgregado` = ?', [req.body.idUsuario, req.body.idUsuarioAgregado], (err, result) => {
                if (err) throw err;
                connection.destroy();
            })
        });
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
        const data = {
            estadoContacto: '1',
            nombreContacto: req.body[0].nombreUsuario,
            idUsuarioAgregado: req.body[0].idUsuario,
            idUsuario: req.session.passport.user.idUsuario
        }
        req.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('INSERT INTO `contacto` SET ?', data, (err, result) => {
                connection.destroy();
            })
        })

        const data1 = {
            estadoContacto: '0',
            nombreContacto: req.session.passport.user.nombreUsuario,
            idUsuarioAgregado: req.session.passport.user.idUsuario,
            idUsuario: req.body[0].idUsuario
        }
        console.log(req.session.passport.user.nombreUsuario);

        req.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('INSERT INTO `contacto` SET ?', data1, (err, result) => {
                connection.destroy();
                res.json({status: 'OK'})
            })
        })
    },



    verifyFriend: (req, res) => {
        req.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('SELECT * FROM `usuario` WHERE `correoUsuario` = ?', [req.body.email], (err, result) => {
                connection.destroy();
                res.json(result);
            } )
        })
    },

    getLastMessages: async (req, res) => {
        var promiseResult = []
        // var promiseResult2 = []
        var result = []
        // var result2 = []
        function getCon(idUserEmisor) {
            return new Promise((resolve, reject) => {
                req.getConnection((err, connection) => {
                    if(err) throw err;
                    const query = connection.query('SELECT * FROM mensaje WHERE idMensaje = (SELECT MAX(idMensaje) FROM mensaje WHERE idUsuarioEmisor = ? AND idUsuarioRemitente = ? OR idUsuarioRemitente = ? AND idUsuarioEmisor = ?);', [req.session.passport.user.idUsuario, idUserEmisor, req.session.passport.user.idUsuario, idUserEmisor], async (err, result) => {
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
            res.json(result)
        })         
        
        // for(let i = 0; i < req.body.dataUsers.length; i++){
        //     promiseResult2.push(getCon2(req.body.dataUsers[i].idUserFriend));
        // }

        // Promise.all(promiseResult2).then((data) => {
        //     result2 = []
        //     data.forEach(obj => {
        //         result2.push(obj)
        //     })
        //     setTimeout(() => {
        //         res.json({res1: result, res2: result2})
        //     }, 100)
        // })
    }
    
}