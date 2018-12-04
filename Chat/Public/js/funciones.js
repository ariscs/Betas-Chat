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

