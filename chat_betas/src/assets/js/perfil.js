//COSNTANTS
const btnEndSession = document.getElementById('CerrarSesion');
const settingsUser = document.getElementsByClassName('Settings_User')[0];
const settingsPassword = document.getElementsByClassName('Settings_Password')[0];

//GLOBALS
var myLastUserName;

//FUNCTIONS
const endSession = () => {
    fetch('/api/end-session', {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(response => {
        location.replace('/')
    })
}

const updateUser = () => {
    const newUser = document.getElementById('NewUser-input').value;
    if(newUser == ''){
        alert('El usuario no puede estar vacio');
    } else {
        if(newUser.length <= 2){
            alert('El nombre de usuario es demasiado corto')
        }
        else {
            myLastUserName = document.getElementById('myUserName').getAttribute('data-myuser');
            fetch('/api/update-data-user', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userName: newUser})
            })
            document.getElementById('myUserName').setAttribute('data-myuser', newUser)
            document.getElementById('myUserName').children[0].innerText = newUser
            document.getElementById('user-profile').innerHTML = `<p id="user-profile">Usuario: ${newUser}</p>`
            alert('Tu usario ha sido cambiado con exito');
            fetch('/api/update-user-contact', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({newUser, lastUser: myLastUserName})
            })
        }
    }
}

const updatePassword = () => {
    const newPass = document.getElementById('Newpass-input').value
    if(newPass == ''){
        alert('La contraseña no puede estar vacia')
    } else {
        if(newPass.length <= 6){
            alert('La contraseña es demasiado corta');
        } else {
            fetch('/api/update-pass-user', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password: newPass})
            })
            alert('Tu contraseña ha sido actualizada correctamente')
        }
    }

}

const activeFetchUser = () => {
    setTimeout(() => {
        //CONSTANTS
        const saveButton = document.getElementById('SaveButton');

        //LISTENERS
        saveButton.addEventListener('click', updateUser)
    
    }, 100)
}

const activeFetchPass = () => {
    setTimeout(() => {
        //CONSTANTS
        const saveButton = document.getElementById('SaveButton');

        //LISTENERS
        saveButton.addEventListener('click', updatePassword)
    }, 100)
}

const getDataUser = () => {
    fetch('/api/get-data-user', {
        method: 'get'
    }).then(res => res.json())
    .then(resp => {
        myLastUserName = resp[0].nombreUsuario
        document.getElementById('User_Name_Settings').innerHTML = `<p id="user-profile">Usuario: ${resp[0].nombreUsuario}</p>`
        document.getElementById('User_email_Settings').innerHTML = `<p id="email-profile">Correo: ${resp[0].correoUsuario}</p>`
    })
}

//LISTENERS
btnEndSession.addEventListener('click', endSession);
settingsUser.addEventListener('click', activeFetchUser);
settingsPassword.addEventListener('click', activeFetchPass);
document.addEventListener('DOMContentLoaded', getDataUser);