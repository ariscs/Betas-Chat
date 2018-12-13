function nav(id){
	if(window.matchMedia("(max-width: 767px)").matches)
	{
		switch(id){
			case "contactsButton":
				document.getElementById('chatsMovil').style.display = "none";
				document.getElementById('chatsButton').src = "img/speechGray.svg";
				document.getElementById('config').style.display = "none";
				document.getElementById('configButton').src = "img/settingsGray.svg";
				document.getElementById('contacts').style.display = "initial";
				document.getElementById('contactsButton').src = "img/phone-bookBlue.svg";
				document.getElementById('title-banner').innerHTML = "Contacts"
				break;
			case "chatsButton":
				document.getElementById('chatsMovil').style.display = "initial";
				document.getElementById('chatsButton').src = "img/speechBlue.svg";
				document.getElementById('config').style.display = "none";
				document.getElementById('configButton').src = "img/settingsGray.svg";
				document.getElementById('contacts').style.display = "none";
				document.getElementById('contactsButton').src = "img/phone-bookGray.svg";
				document.getElementById('title-banner').innerHTML = "Chats"
				break;
			case "configButton":
				document.getElementById('chatsMovil').style.display = "none";
				document.getElementById('chatsButton').src = "img/speechGray.svg";
				document.getElementById('config').style.display = "initial";
				document.getElementById('configButton').src = "img/settingsBlue.svg";
				document.getElementById('contacts').style.display = "none";
				document.getElementById('contactsButton').src = "img/phone-bookGray.svg";
				document.getElementById('title-banner').innerHTML = "Settings"
				break;
			default:
				console.log("Error en funcion nav()");
				break;
		}
	}
}

function changePassword(){
	document.getElementById('changePassword').style.display = "block";
}

function savePassword(){
	document.getElementById('changePassword').style.display = "none";
}

function addContact(){
	document.getElementById('addContactWindow').style.display = "flex"
}

function addContactCancel(){
	document.getElementById('addContactWindow').style.display = "none"
}

$(document).ready(function() {
	generarEventoLogin();
	var movementStrength = 100;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();
	$("#Principal").mousemove(function(e){
		var pageX = e.pageX - ($(window).width()/2 );
		var pageY = e.pageY - ($(window).height()/2 );
			var newvalueX = width * pageX * -1 ;
			var newvalueY = height * pageY * -1;
			$('#Principal').css("background-position", newvalueX+"px     "+newvalueY+"px");
		});
});

//Enviar los datos al servidor para redirigi al chat.
//CONSTANTES
const toggleSwit = document.getElementsByClassName('toggle-switch')[0];
let togglePress = false;

//FUNCIONES
const registrarDatos = () => {
	let correo = document.getElementById('MandarCorreo').value;
	const contra = document.getElementById('MandarContraseña').value;
	const repContra = document.getElementById('RepetirContraseña').value;
	const nomUsuario = document.getElementById('RegistroNombreUsuario').value;
	let data = {
		correo,
		contra,
		repContra,
		nomUsuario
	}
	fetch('/registro', {
		method: 'post',
		body: JSON.stringify(data),
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
	.then((res) => {
		window.location.replace('/chat')
	})
}

const login = () => {
	let correo = document.getElementById('Correo').value;
	const contra = document.getElementById('Contraseña').value;

	let data = {
		correo,
		contra
	}

	fetch('/', {
		method: 'post',
		body: JSON.stringify(data),
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
	.then((res) => {
		window.location.replace('/chat')
	})
}

const generarEventoLogin = () => {
	const btnLogin = document.getElementById('login-button');
	btnLogin.addEventListener('click', login);
}

toggleSwit.addEventListener('click', () => {
	if(!togglePress){
		togglePress = true
		setTimeout(() => {
			document.getElementById('registro-button').addEventListener('click', registrarDatos)
		}, 500)
	} else {
		togglePress = false;
	}
});
