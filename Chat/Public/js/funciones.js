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
			console.log("Error en funcion nav() id invalido");
			break;
	}
}