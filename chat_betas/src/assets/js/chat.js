//CONSTANTS
const socket = io.connect();
const chat = document.getElementById('chat');
const chats = document.getElementById('chats');
const myId = document.getElementById('Principal-contacts').getAttribute('data-id-personal');
const searchInput = document.getElementById('search-input');
const btnStickyAcccept = document.getElementById('Sticky-aceptar');
//GLOBALS
var btnSendMessage;
var inpMessage;
var time;
var setTimeOn;
var fileInput;
var userFriends = [];
var haveUser = false

//FUNCTIONS
const createRoomSocket = (id) => {
    console.log(myId)
    const data = {
        idContact: id,
        idPersonal: myId 
    }
    
    socket.emit('create-room', data);
};

const getAllId = () => {
    let getId = document.getElementById('message-content');
    getId = getId.children[0];
    while(getId){
        getId.addEventListener('click', createChat)
        createRoomSocket(getId.getAttribute('data-id-contact'))
        userFriends.push({
            username: getId.children[1].children[0].children[0].innerText,
            idUserFriend: getId.getAttribute('data-id-contact'),
        })
        getId = getId.nextElementSibling;
    }
};

const createChat = (e) => {
    let idContact;
    if(e.target.id == 'name-in'){
        idContact = e.target.parentNode.parentNode;
    } else if (e.target.id == 'little-text') {
        idContact = e.target.parentNode.parentNode;
    } else if(e.target.tagName == 'P' || e.target.tagName == 'H3' || e.target.tagName == 'STRONG') {
        idContact = e.target.parentNode.parentNode.parentNode
    }

    
    idContact = idContact.getAttribute('data-id-contact');
    chats.setAttribute('data-id-contact', idContact)
    getMessages(idContact, myId);

    const roomChat = document.getElementById('contacts')
    if(document.getElementById(idContact).nextElementSibling == null){
        roomChat.previousElementSibling.previousElementSibling.previousElementSibling.children[2].innerHTML = `<h1> ${document.getElementById(idContact).innerText} </h1>`
    } else {
        roomChat.previousElementSibling.previousElementSibling.previousElementSibling.children[2] = `<h1> ${document.getElementById(idContact).nextElementSibling.innerText} </h1>`
    }

    
    btnSendMessage = document.getElementsByClassName('pic')[1];
    btnSendMessage.addEventListener('click', sendMessageToContact);
    const divBarMessage = document.getElementsByClassName('input_bar-web')[0];
    divBarMessage.children[0].value = ''
    divBarMessage.children[0].innerText = ''
    divBarMessage.children[0].focus();
    divBarMessage.addEventListener('keyup', isTyping);
}

const getMessages = (idContact, myId) => {
    const containerChats = document.getElementById('chats');
    containerChats.innerHTML = '';
    fetch('/api/get-messages', {
        method: 'POST',
        body: JSON.stringify({idContact, myId}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log(response.length);
        response.sort((a, b) => a.idMensaje - b.idMensaje);
        for(let i = 0; i < response.length; i++){
        if(chats.getAttribute('data-id-contact') == response[i].idUsuarioEmisor){
            containerChats.innerHTML += `
            <div class="in" style="display: none;">
                <div class="in_p">
                    <p>${response[i].msgContenido}</p>
                </div>
                <div class="in_hour">
                    <p>${response[i].msgHora}</p>
                </div>
            </div>`
            } else {
                containerChats.innerHTML += `
                <div class="out" style="display: none;">
                    <div class="out_hour">
                        <p>${response[i].msgHora}</p>
                    </div>
                    <div class="out_p">
                        <p>${response[i].msgContenido}</p>
                    </div>
                </div>`
            }
        }
    });
}

const sendMessageToContact = (e) => {
    const divBarMessage = document.getElementsByClassName('input_bar-web')[0];
    message = divBarMessage.children[0].value;
    if(message.length >= 1){
        const idContact = document.getElementById('chats').getAttribute('data-id-contact');
        const idPersonal = myId
        const chatPersonal = document.getElementById('chats')
        const date = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
        chatPersonal.innerHTML += `
        <div class="out" style="display: none;">
            <div class="out_hour">
                <p>${date}</p>
            </div>
            <div class="out_p">
                <p>${message}</p>
            </div>
        </div>`
    
        const contactProfile = document.getElementById(idContact)
        contactProfile.parentNode.nextElementSibling.children[0].innerText = message; 
        
        socket.emit('message', {message, idContact, idPersonal, date});
        divBarMessage.children[0].value = '';
        divBarMessage.children[0].innerHTML = '';
    }

}

const isTyping = (e) => {
    if(e.keyCode == '13'){
        sendMessageToContact();
    }
    chatUserId = document.getElementById('chats').getAttribute('data-id-contact');
    nombreAmigo = document.getElementById(chatUserId);
    const data = {
        idContact: chatUserId,
        idPersonal: myId,
        message: `${nombreAmigo.innerText} esta escribiendo`
    };

    socket.emit('is-typing', data);
}

const showUsers = (e) => {
    const messageContent = document.getElementById('message-content');
    messageContent.innerHTML = '';
    const usersChar = [];
    //This cycle for is used by add the users
    for(let i = 0; i < userFriends.length; i++){
        if(userFriends[i].username.indexOf(e.target.value) != '-1'){
            usersChar.push(userFriends[i]);
        }
    }
    // This cycle for is used by add the users on the DOM
    if(usersChar.length > 0){
        for(let i = 0; i < usersChar.length; i++){
            if(usersChar[i].username != ''){
                messageContent.innerHTML += `
                <div class="message-in" data-id-contact="${usersChar[i].idUserFriend}"> 
                    <div id="img-in">
                        <div id="userInPict"><img src="img/user.svg" ></div>
                    </div>
                    <div id="datos-in">
                        <div id="name-in">
                            <h3 id="${usersChar[i].idUserFriend}"><h3>${usersChar[i].username}</h3>
                        </div>
                        <div id="little-text">
                            <p>${usersChar[i].msgContenido}</p>
                        </div>
                    </div>
                </div>
                `
                
                getAllId();
            }
        }
    } else if(!haveUser){
        messageContent.innerHTML = '<h3 id="no-friends">No tienes amigos agregado</h3>'
    } else {
        messageContent.innerHTML = '<h3 id="no-match">No hay coincidencias</h3>'
    }
}

const getLastMessage = () => {
    fetch('/api/get-last-messages', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({dataUsers: userFriends})
    })
    .then(res => res.json())
    .then(response => {
        for(let i = 0; i < response.length; i++){
            let addIn;
            if(response[i].length == 1) {
                userFriends[i].msgContenido = response[i][0].msgContenido;
            } else {
                userFriends[i].msgContenido = 'Sin mensajes'
            }
            if(userFriends[i].idUserFriend != '' && userFriends[i].username != ''){
                haveUser = true
                addIn = document.getElementById(userFriends[i].idUserFriend)

                addIn.parentNode.nextElementSibling.children[0].innerHTML = userFriends[i].msgContenido
            } else {
                userFriends.pop();
            }
        }
    })
}

const sendRequestToFriend = () => {
    const emailFriend = document.getElementById('Sticky-agregarAmigo').value;
    fetch('/api/verify-friend', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: emailFriend})
    })
    .then(res => res.json())
    .then(response => {
        if(response.length != 0){
            if(!document.getElementById(response[0].idUsuario)){
                const messageContent = document.getElementById('message-content');
                messageContent.innerHTML += `
                <div class="message-in" data-id-contact="${response[0].idUsuario}"> 
                    <div id="img-in">
                        <div id="userInPict"><img src="img/user.svg" ></div>
                    </div>
                    <div id="datos-in">
                        <div id="name-in">
                            <h3 id="${response[0].idUsuario}">${response[0].nombreUsuario}</h3>
                        </div>
                        <div id="little-text">
                            <p>No le has enviado mensajes</p>
                        </div>
                    </div>
                </div>
                `
                fetch('/api/send-request-friend', {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(response)
                })
                .then(resp => resp.json())
                .then(response => {
                    const deleteMessageNoFriends = messageContent.children[0];
                    haveUser = true;
                    if(deleteMessageNoFriends.tagName == 'H3'){
                        deleteMessageNoFriends.remove();
                    }
                    getAllId();
                })
                response[0].idUsuarioAmigo = myId;
                response[0].nombreUsuario = document.getElementById('myUserName').getAttribute('data-myUser')
                socket.emit('addNewUser', response)
            }
        }
    })
}

const getPendingFriend = () => {
    fetch('/api/get-pending-friends', {
        method: 'get'
    }).then(res => res.json())
    .then(resp => {
        const messageContent = document.getElementById('BusquedaContactos');
        for(let i = 0; i < resp.length; i++) {
            messageContent.innerHTML += `
            <div class="message-in" data-id-contact="${resp[i].idUsuarioAgregado}"> 
                <div id="img-in">
                    <div id="userInPict"><img src="img/user.svg" ></div>
                </div>
                <div id="datos-in-solicitud">
                    <div id="name-in">
                        <h3 id="${resp[i].idUsuarioAgregado}">${resp[i].nombreContacto}</h3>
                    </div>
                </div>
                <div id="aceptarorechazar">
                    <div id="accept">
                        <img src="img/accept.png" id="aceptarorechazar-buttons" >
                    </div>
                    <div id="decline">
                        <img src="img/Close.png" id="aceptarorechazar-buttons">
                    </div>
                </div>
            </div>
            `
            document.getElementById('accept').addEventListener('click', acceptContact);
            document.getElementById('decline').addEventListener('click', declineContact);
        }
        console.log(resp);
    })
}

//LISTENERS
document.addEventListener('DOMContentLoaded', getAllId);
document.addEventListener('DOMContentLoaded', getLastMessage);
document.addEventListener('DOMContentLoaded', getPendingFriend)
document.addEventListener('click', sendRequestToFriend);
searchInput.addEventListener('input', showUsers);

//SOCKETS ON

socket.on('conectado', (data) => {
    console.log(data);
});

socket.on('message', (data) => {
    // const p = document.createElement('p');
    // p.innerText = data.message;
    // p.style.textAlign = 'center';
    const chats = document.getElementById('chats')
    console.log(data)
    if(chats.getAttribute('data-id-contact') == data.idPersonal){
        chats.innerHTML += `
        <div class="out" style="display: none;">
            <div class="out_hour">
                <p>${data.date}</p>
            </div>
            <div class="out_p">
                <p>${data.message}</p>
            </div>
        </div>`
    }
    const contactProfile = document.getElementById(data.idPersonal)
    contactProfile.parentNode.nextElementSibling.children[0].innerText = data.message; 
});

// socket.on('is-typing', (data) => {
//     time = 2000;
//     const tag = document.getElementById(data.idContact)
//     let respaldoTexto;
//     console.log(tag.parentNode.nextElementSibling.children[0].innerText)
//     if(document.getElementsByClassName('typing').length < 1){
//         let p = document.createElement('p');
//         p.setAttribute('class', 'typing');
//         p.innerText = data.message;
//         p.style.textAlign = 'center';
//         let p2 = document.createElement('p');
//         p2.setAttribute('class', 'typing');
//         p2.innerText = data.message;
//         p2.style.textAlign = 'center';
//         if(messages.getAttribute('data-id') == data.idPersonal){
//             messages.appendChild(p);
//         }
//         document.getElementById(data.idPersonal).appendChild(p2);
//     }
//     if(!setTimeOn){
//         setTimeOn = true;
//         setTimeout(() => {
//             setTimeOn = false;
//             const typingInput = document.getElementsByClassName('typing');
//             for(let i = 0; i < typingInput.length; i++){
//                 typingInput[i].remove();
//             }
//         }, time);
//     }
// })
var dataSocket;
socket.on('addNewUser', (data) => {
    dataSocket = data;
    const messageContent = document.getElementById('BusquedaContactos');
    messageContent.innerHTML += `
    <div class="message-in" data-id-contact="${data[0].idUsuarioAmigo}"> 
        <div id="img-in">
            <div id="userInPict"><img src="img/user.svg" ></div>
        </div>
        <div id="datos-in-solicitud">
            <div id="name-in">
                <h3 id="${data[0].idUsuarioAmigo}">${data[0].nombreUsuario}</h3>
            </div>
        </div>
        <div id="aceptarorechazar">
            <div id="accept">
                <img src="img/accept.png" id="aceptarorechazar-buttons" >
            </div>
            <div id="decline">
                <img src="img/Close.png" id="aceptarorechazar-buttons">
            </div>
        </div>
    </div>
    `
    document.getElementById('accept').addEventListener('click', acceptContact)
    document.getElementById('decline').addEventListener('click', declineContact);
})

const acceptContact = (e) => {
    const idFriend = e.target.parentNode.parentNode.children[1].children[0].children[0];
    const data = {
        idUsuario: myId,
        idUsuarioAgregado: idFriend.id,
        nombreContacto: idFriend.innerText
    }
    fetch('api/add-new-friend', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    setTimeout(() => {
        location.replace('/')
    }, 100)
}

const declineContact = (e) => {
    const idFriend = e.target.parentNode.parentNode.children[1].children[0].children[0];
    const data = {
        idUsuario: myId,
        idUsuarioAgregado: idFriend.id,
        nombreContacto: idFriend.innerText
    }
    fetch('api/delete-user-request', {
        method: 'delete',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    setTimeout(() => {
        location.replace('/')
    }, 100)
}