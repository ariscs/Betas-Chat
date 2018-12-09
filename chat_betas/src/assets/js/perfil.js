//COSNTANTS
const profileInfoUser = document.getElementsByClassName('profile_info')[0];
const btnSaveDataProfile = document.getElementsByClassName('buttonConfig')[3];
const btnChangePassword = document.getElementsByClassName('buttonConfig')[2];
const passwordInputs = document.getElementsByClassName('newPassword_inputs')[0];
const btnChangePasswordConfig = document.getElementsByClassName('buttonConfig_two')[0];
const btnEndSession = document.getElementById('CerrarSesion');

let btnChangePasswordPress = false;

//FUNCTIONS
const dataProfile = () => {
    fetch('/api/get-data-user', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(response => {
        profileInfoUser.children[0].children[0].value = response[0].nombreUsuario
        profileInfoUser.children[0].children[0].innerText = response[0].nombreUsuario
        profileInfoUser.children[1].children[0].innerHTML = response[0].correoUsuario
    })
}

const updateUserName = () => {

    const data = getUserName();
    fetch('/api/update-data-user', {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        // profileInfoUser.children[0].children[0].value = response[0].nombreUsuario
        // profileInfoUser.children[1].children[0].innerHTML = response[0].correoUsuario
        console.log(response);
    })
}

const getUserName = () => {
    const data = {}

    const userName = profileInfoUser.children[0].children[0].value
    if(userName.length > 3){
        if(userName != '') {
                data.userName = userName;
                return data;
            } 
          else {
            alert('La contraseña no puede estar vacia');
        }
    } else {
        alert('El nombre de usuario es muy corto');
    }
}

const updatePassUser = () => {
    const data = getPassUser();
    console.log(data);
    if(data){
        fetch('/api/update-pass-user', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            alert('La contraseña ha sido modificada');
            console.log(response)
        })
    }
}

const getPassUser = () => {
    const passwordIn = passwordInputs.children[0];
    const passwordInVal = passwordInputs.children[1];

    const data = {};

    if(passwordIn.value.length > 3){
        if(passwordIn.value != '') {
            if(passwordIn.value === passwordInVal.value){
                data.password = passwordIn.value;
                return data;
            } else {
                alert('Las contraseñas no coinciden')
            }
        } else {
            alert('La contraseña no puede estar vacia')
        }
    } else {
        alert('La contraseña es demasiado corta');
    }
}

const changeToTrueOrFalse = () => {
    if(btnChangePasswordPress){
        btnChangePasswordPress = false;
    } else {
        btnChangePasswordPress = true;
    }
}

const endSession = () => {
    alert('xD')
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

//LISTENERS
document.addEventListener('DOMContentLoaded', dataProfile);
btnSaveDataProfile.addEventListener('click', updateUserName);
btnChangePassword.addEventListener('click', changeToTrueOrFalse);
btnChangePasswordConfig.addEventListener('click', updatePassUser);
btnEndSession.addEventListener('click', endSession)