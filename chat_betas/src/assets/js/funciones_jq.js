//Funciones Jquery
$( ".toggle-switch" ).click(function() {
	
	if ($("#RepetirContraseña").length) {
		$('#registro-button').replaceWith('<input type="submit" id="login-button" class ="mandar" value="Login">');
		$('#RepetirContraseña').remove();
		$('#MandarCorreo').replaceWith('<input type="text" class="inputDatos" id="Correo" placeholder="Correo electronico">');
		$('#MandarContraseña').replaceWith('<input type="password" class="inputDatos" id="Contraseña" placeholder="Contraseña">');
	}else{
		$('#login-button').replaceWith('<input type="submit" id="registro-button" class ="mandar" value="Registrar">');		
		$('.mandar').before('<input type="password" class="inputDatos" id="RepetirContraseña" placeholder="Repita la Contraseña">');
		$('.mandar').before('<input type="text" class="inputDatos" id="RegistroNombreUsuario" placeholder="Nombre de Usuario">');
		$('#Correo').replaceWith('<input type="text" class="inputDatos" id="MandarCorreo" placeholder="Correo electronico">');
		$('#Contraseña').replaceWith('<input type="password" class="inputDatos" id="MandarContraseña" placeholder="Contraseña">');
	}	
});




$(document).ready(function() {
	$("#Principal").mousemove(function(e){
		var pageX = (e.pageX * -1 /15) ;
		var pageY = (e.pageY * -1 /15) ;
		$('#Principal').css("background-position", pageX+"px     "+pageY+"px");
	});
});


$( "#userPictt" ).click(function() {
	$('#AddUser').hide();
	$('#userPict').hide();
	$('#userPictt').hide();
	$('#backPict').css("display","initial");
	$('#message-content').hide();
	$('#BusquedaContactos').hide(); 
	$('#Contacts-tittle').remove();

	$('#Configuracion-web').css("display","initial");  

	$('#search-bar').hide();
	

});


$( "#backPict" ).click(function() {
	
	$('#Configuracion-web').hide();
	$('#AddUser').show();
	$('#userPict').show();
	$('#userPictt').show();
	$('#message-content').show();
	$('#search-bar').show();
	$('#backPict').hide();
	$('#BusquedaContactos').hide(); 
	$('#Contacts-tittle').remove();
	$('#NewUser-input').remove();
	$('#SaveButton').remove();
});

$( ".Settings_User" ).click(function() {
	if ($("#NewUser-input").length) {

		$('#NewUser-input').remove();
	$('#SaveButton').remove();
	}
	else{
		$('.Settings_Password').before('<input type="text" id="NewUser-input" placeholder="Ingrese el usuario">');
	$('.Settings_Password').before('<button id="SaveButton"> Save </button>');
	}
	
	
});

$( ".Settings_Password" ).click(function() {
	if ($("#Newpass-input").length) {

		$('#Newpass-input').remove();
	$('#SaveButton').remove();
	}
	else{
		
		$('.Settings_Password').after('<button id="SaveButton"> Save </button>');
		$('.Settings_Password').after('<input type="password" id="Newpass-input" placeholder="Ingrese el password">');
	}
	
	
});
$( "#IniciarConversacion" ).click(function() {
	if ($("#Contacts-tittle").length) {
		
	$('#BusquedaContactos').hide(); 
	$('#Contacts-tittle').remove();
	$('#search-content').show();
	$('#search-img').show();
	$('#message-content').show();
	}
	else{
	
	$('#BusquedaContactos').css("display","initial");  
	$('#search-bar').after(' <h3 id="Contacts-tittle">Contacts</h3> ');
	$('#Configuracion-web').hide();
	$('#message-content').hide();

	}
	
});
$( "#AddUser-img" ).click(function() {
	$('.sticky').css("display","initial");  
});
$( "#close-img" ).click(function() {
	$('.sticky').hide(); 
});
