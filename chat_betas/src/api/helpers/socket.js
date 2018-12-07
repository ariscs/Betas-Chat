const mysql = require('mysql');
const multer = require('multer');
const pool = mysql.createPool(require('../.././config/keys').dbSettings);

// FUNCTIONS
const handleDisconnect = () => {
    pool.connect((err) => {
        if(err){
            console.log('Error the database has disconnect');
            setTimeout(handleDisconnect, 2000);
        }
    })
}

const generateUniqueId = (data) => {
    const generateId = [];
    generateId.push(parseInt(data.idContact + data.idPersonal));
    generateId.push(parseInt(data.idPersonal + data.idContact));

    return generateId;
}

//GLOBALS
var room;

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('create-room', async (data) => {
            if(generateUniqueId(data)[0] >= generateUniqueId(data)[1]){
                socket.join(generateUniqueId(data)[0]);
                room = generateUniqueId(data)[0];
            } else {
                socket.join(generateUniqueId(data)[1]);
                room = generateUniqueId(data)[1];
            }
        
            socket.broadcast.to(room).emit('conectado', room);
        });

        socket.on('message', async (data) => {
            if(generateUniqueId(data)[0] >= generateUniqueId(data)[1]){
                room = generateUniqueId(data)[0];
            } else {
                room = generateUniqueId(data)[1];
            }

            //Save in the database
            const saveData = {
                msgContenido: data.message,
                idUsuarioRemitente: data.idContact,
                idUsuarioEmisor: data.idPersonal,
                msgHora: data.date
            }

            pool.getConnection((err, connection) => {
                if(err) throw err;
                connection.query('INSERT INTO mensaje SET ?', saveData, (err, result) => {
                    if(err) throw err;
                    connection.release();
                    socket.broadcast.to(room).emit('message', data);
                });
            });
        });

        socket.on('is-typing', (data) => {
            if(generateUniqueId(data)[0] >= generateUniqueId(data)[1]){
                room = generateUniqueId(data)[0];
            } else {
                room = generateUniqueId(data)[1];
            }

            socket.broadcast.to(room).emit('is-typing', data)
        })
    });
};