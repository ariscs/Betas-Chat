$( ".toggle-switch" ).click(function() {

	if ($("#RepetirContraseña").length) {
		
		$('#RepetirContraseña').remove();
		$('#MandarCorreo').replaceWith('<input type="text" class="inputDatos" id="Correo" placeholder="Correo electronico">');
		$('#MandarContraseña').replaceWith('<input type="text" class="inputDatos" id="Contraseña" placeholder="Contraseña">');

	}
		else{
			$('#login-button').replaceWith('<input type="submit" id="registro-button" class ="mandar" value="Registrar">');
				
			$('.mandar').before('<input type="text" class="inputDatos" id="RepetirContraseña" placeholder="Repita la Contraseña">');
			$('#Correo').replaceWith('<input type="text" class="inputDatos" id="MandarCorreo" placeholder="Correo electronico">');
			$('#Contraseña').replaceWith('<input type="text" class="inputDatos" id="MandarContraseña" placeholder="Contraseña">');
		}
	

	
	
		});


$(document).ready(function() {
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

