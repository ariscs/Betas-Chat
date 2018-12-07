

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

    profile: (req, res) => {
        let data = [req.session.passport.user.idUsuario];
        let returnData;
        req.getConnection(async (err, connection) => {
            await connection.query('SELECT `correoUsuario`, `srcUsuario` FROM `usuario` WHERE `idUsuario` = ?', data, async (err, result) => {
                if(err) throw err;
                returnData = await result;
                res.render('perfil', {returnData});
            })
        });
    },

    uploadImg: (req, res) => {
        if(req.file){
            console.log
        }
    }
}