//CONSTANTS
const socket = io.connect();
const chat = document.getElementById('chat');
const chats = document.getElementById('chats');
const myId = document.getElementById('Principal-contacts').getAttribute('data-id-personal');
const searchInput = document.getElementById('search-input')

//GLOBALS
var btnSendMessage;
var inpMessage;
var time;
var setTimeOn;
var fileInput;
var userFriends = [];

//FUNCTIONS
const createRoomSocket = (id) => {
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
        userFriends.push({
            username: getId.children[1].children[0].children[0].innerText,
            idUserFriend: getId.getAttribute('data-id-contact')
        })
        getId.addEventListener('click', createChat)
        createRoomSocket(getId.getAttribute('data-id-contact'))
        getId = getId.nextElementSibling;
    }
};

const createChat = (e) => {
    let idContact;
    if(e.target.id == 'name-in'){
        idContact = e.target.parentNode.parentNode;
    } else if (e.target.id == 'little-text') {
        idContact = e.target.parentNode.parentNode;
    } else if(e.target.tagName == 'P' || e.target.tagName == 'H3') {
        idContact = e.target.parentNode.parentNode.parentNode
    }

    idContact = idContact.getAttribute('data-id-contact');
    chats.setAttribute('data-id-contact', idContact)
    getMessages(idContact, myId);

    btnSendMessage = document.getElementsByClassName('pic')[1];
    btnSendMessage.addEventListener('click', sendMessageToContact);
    const divBarMessage = document.getElementsByClassName('input_bar-web')[0];
    divBarMessage.addEventListener('keyup', isTyping);
}

// const createChat = (e) => {
//     //Delete the inputs and buttons of the chat
//     chat.innerHTML = '';
//     //Create input to send message
//     const inputMessage = document.createElement('input');
//     inputMessage.setAttribute('id', 'message');
//     inputMessage.setAttribute('placeholder', 'Tú mensaje aquí');
//     //Create button to send messsage 
//     const sendMessage = document.createElement('button');
//     sendMessage.innerText = 'Enviar mensaje';
//     sendMessage.setAttribute('id', 'send-message');
//     //Create input type file
//     const inputFile = document.createElement('input');
//     inputFile.setAttribute('type', 'file');
//     inputFile.setAttribute('id', 'file-img');
//     chat.appendChild(inputMessage);
//     chat.appendChild(sendMessage);
//     chat.appendChild(inputFile);
//     chat.setAttribute('data-idContact', e.target.parentNode.id);
//     chat.setAttribute('data-idPersonal', e.target.parentNode.parentNode.getAttribute('data-id'));

//     btnSendMessage = document.getElementById('send-message');
//     inpMessage = document.getElementById('message');
//     btnSendMessage.addEventListener('click', sendMessageToContact);
//     inpMessage.addEventListener('keyup', isTyping);

//     messages.setAttribute('data-id', e.target.parentNode.id);

//     getMessages(e.target.parentNode.id, e.target.parentNode.parentNode.getAttribute('data-id'));

//     fileInput = document.getElementById('file-img');
// }

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
                <div class="out" style="display: none;">
                    <div class="out_p">
                        <p>${response[i].msgContenido}</p>
                    </div>
                    <div class="out_hour">
                        <p>${response[i].msgHora}</p>
                    </div>
                </div>`
            } else {
                containerChats.innerHTML += `
                <div class="in" style="display: none;">
                    <div class="in_p">
                        <p>${response[i].msgContenido}</p>
                    </div>
                    <div class="in_hour">
                        <p>${response[i].msgHora}</p>
                    </div>
                </div>`
            }
        }
    });
}

const sendMessageToContact = () => {
    const divBarMessage = document.getElementsByClassName('input_bar-web')[0];
    message = divBarMessage.children[0].value;

    const idContact = document.getElementById('chats').getAttribute('data-id-contact');
    const idPersonal = myId
    const chatPersonal = document.getElementById('chats')
    const date = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    chatPersonal.innerHTML += `
    <div class="in" style="display: none;">
        <div class="in_p">
            <p>${message}</p>
        </div>
        <div class="in_hour">
            <p>${date}</p>
        </div>
    </div>`

    socket.emit('message', {message, idContact, idPersonal, date});
}

const isTyping = (e) => {
    console.log(e.target.value)
    chatUserId = document.getElementById('chats').getAttribute('data-id-contact');
    nombreAmigo = document.getElementById(chatUserId);
    const data = {
        idContact: chatUserId,
        idPersonal: myId,
        message: `${nombreAmigo.innerText} esta escribiendo`
    };

    // console.log(data);
    
    socket.emit('is-typing', data);
}

const showUsers = (e) => {
    const messageContent = document.getElementById('message-content');
    messageContent.innerHTML = '';
    const usersChar = []
    //This cycle for is used by add the users
    for(let i = 0; i < userFriends.length; i++){
        if(userFriends[i].username.indexOf(e.target.value) != '-1'){
            usersChar.push(userFriends[i]);
        }
    }
    // This cycle for is used by add the users on the DOM
    if(usersChar.length > 0){
        for(let i = 0; i < usersChar.length; i++){
            messageContent.innerHTML += `
            <div class="message-in" data-id-contact="<%= data[i].idUsuarioAgregado %>"> 
                <div id="img-in">
                    <div id="userInPict"><img src="img/user.svg" ></div>
                </div>
                <div id="datos-in">
                    <div id="name-in">
                        <h3 id="${usersChar[i].idUserFriend}"><h3>${usersChar[i].username}</h3>
                    </div>
                    <div id="little-text">
                        <p>Mesnaje de prototipo</p>
                    </div>
                </div>
            </div>
            `
        }
    }

}

//LISTENERS
document.addEventListener('DOMContentLoaded', getAllId);
searchInput.addEventListener('input', showUsers)

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
            <div class="out_p">
                <p>${data.message}</p>
            </div>
            <div class="out_hour">
                <p>${data.date}</p>
            </div>
        </div>`
    }
});

socket.on('is-typing', (data) => {
    // time = 2000;
    // if(document.getElementsByClassName('typing').length < 1){
    //     let p = document.createElement('p');
    //     p.setAttribute('class', 'typing');
    //     p.innerText = data.message;
    //     p.style.textAlign = 'center';
    //     let p2 = document.createElement('p');
    //     p2.setAttribute('class', 'typing');
    //     p2.innerText = data.message;
    //     p2.style.textAlign = 'center';
    //     if(messages.getAttribute('data-id') == data.idPersonal){
    //         messages.appendChild(p);
    //     }
    //     document.getElementById(data.idPersonal).appendChild(p2);
    // }
    // if(!setTimeOn){
    //     setTimeOn = true;
    //     setTimeout(() => {
    //         setTimeOn = false;
    //         const typingInput = document.getElementsByClassName('typing');
    //         for(let i = 0; i < typingInput.length; i++){
    //             typingInput[i].remove();
    //         }
    //     }, time);
    // }
    console.log(data);
})