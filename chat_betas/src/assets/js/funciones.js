function nav(id){
<<<<<<< HEAD
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
=======
	switch(id){
		case "contactsButton":
			document.getElementById('chats').style.display = "none";
			document.getElementById('chatsButton').src = "img/speechGray.svg";
			document.getElementById('config').style.display = "none";
			document.getElementById('configButton').src = "img/settingsGray.svg";
			document.getElementById('contacts').style.display = "initial";
			document.getElementById('contactsButton').src = "img/phone-bookBlue.svg";
			break;
		case "chatsButton":
			document.getElementById('chats').style.display = "initial";
			document.getElementById('chatsButton').src = "img/speechBlue.svg";
			document.getElementById('config').style.display = "none";
			document.getElementById('configButton').src = "img/settingsGray.svg";
			document.getElementById('contacts').style.display = "none";
			document.getElementById('contactsButton').src = "img/phone-bookGray.svg";
			break;
		case "configButton":
			document.getElementById('chats').style.display = "none";
			document.getElementById('chatsButton').src = "img/speechGray.svg";
			document.getElementById('config').style.display = "initial";
			document.getElementById('configButton').src = "img/settingsBlue.svg";
			document.getElementById('contacts').style.display = "none";
			document.getElementById('contactsButton').src = "img/phone-bookGray.svg";
			break;
		default:
			console.log("Error en funcion nav()");
			break;
	}
}



$( ".toggle-switch" ).click(function() {
	
	if ($("#RepetirContraseña").length) {
		$('#RepetirContraseña').remove();
		$('#MandarCorreo').replaceWith('<input type="text" class="inputDatos" id="Correo" placeholder="Correo electronico">');
		$('#MandarContraseña').replaceWith('<input type="text" class="inputDatos" id="Contraseña" placeholder="Contraseña">');
		$('#registro-button').replaceWith('<input type="submit" id="login-button" class ="mandar" value="Login">');
		generarEventoLogin();
	}
	else{
		$('#login-button').replaceWith('<input type="submit" id="registro-button" class ="mandar" value="Registrar">');
		
		$('.mandar').before('<input type="text" class="inputDatos" id="RepetirContraseña" placeholder="Repita la Contraseña">');
		$('#Correo').replaceWith('<input type="text" class="inputDatos" id="MandarCorreo" placeholder="Correo electronico">');
		$('#Contraseña').replaceWith('<input type="text" class="inputDatos" id="MandarContraseña" placeholder="Contraseña">');
		const btnRegistrar = document.getElementById('registro-button');
		btnRegistrar.addEventListener('click', registrarDatos);
	}
});

>>>>>>> parent of 72bdaf4... Fusion de manera exitosa intento #8953

$(document).ready(function() {
	generarEventoLogin();
	var movementStrength = 100;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();
	$("#Principal").mousemove(function(e){
<<<<<<< HEAD
		var pageX = e.pageX - ($(window).width()/2 );
		var pageY = e.pageY - ($(window).height()/2 );
			var newvalueX = width * pageX * -1 ;
			var newvalueY = height * pageY * -1;
			$('#Principal').css("background-position", newvalueX+"px     "+newvalueY+"px");
		});
=======
			var pageX = e.pageX - ($(window).width()/2 );
			var pageY = e.pageY - ($(window).height()/2 );
			var newvalueX = width * pageX * -1 ;
			var newvalueY = height * pageY * -1;
			$('#Principal').css("background-position", newvalueX+"px     "+newvalueY+"px");
	});
>>>>>>> parent of 72bdaf4... Fusion de manera exitosa intento #8953
});

//Enviar los datos al servidor para redirigi al chat.
//CONSTANTES
<<<<<<< HEAD
const toggleSwit = document.getElementsByClassName('toggle-switch')[0];
let togglePress = false;
=======
>>>>>>> parent of 72bdaf4... Fusion de manera exitosa intento #8953

//FUNCIONES
const registrarDatos = () => {
	let correo = document.getElementById('MandarCorreo').value;
	const contra = document.getElementById('MandarContraseña').value;
	const repContra = document.getElementById('RepetirContraseña').value;
	let data = {
		correo,
		contra,
		repContra
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
<<<<<<< HEAD
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
=======
}
>>>>>>> parent of 72bdaf4... Fusion de manera exitosa intento #8953
