function nav(id){
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


//Funciones Jquery
$( ".toggle-switch" ).click(function() {
	if ($("#RepetirContraseña").length) {
		$('#RepetirContraseña').remove();
		$('#MandarCorreo').replaceWith('<input type="text" class="inputDatos" id="Correo" placeholder="Correo electronico">');
		$('#MandarContraseña').replaceWith('<input type="text" class="inputDatos" id="Contraseña" placeholder="Contraseña">');
	}else{
		$('#login-button').replaceWith('<input type="submit" id="registro-button" class ="mandar" value="Registrar">');		
		$('.mandar').before('<input type="text" class="inputDatos" id="RepetirContraseña" placeholder="Repita la Contraseña">');
		$('#Correo').replaceWith('<input type="text" class="inputDatos" id="MandarCorreo" placeholder="Correo electronico">');
		$('#Contraseña').replaceWith('<input type="text" class="inputDatos" id="MandarContraseña" placeholder="Contraseña">');
	}	
});


$(document).ready(function() {
	$("#Principal").mousemove(function(e){
		var pageX = (e.pageX* -1 /15) ;
		var pageY = (e.pageY* -1 /15) ;
		$('#Principal').css("background-position", pageX+"px     "+pageY+"px");
	});
});

