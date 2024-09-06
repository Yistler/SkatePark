const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

//botones de inicio sesion y crear cuenta
const inicio = document.getElementById('iniciar');
const crear = document.getElementById('crear');
//datos
const email = document.getElementById('email').value;

//Evento para mostrar el panel
signUpButton.addEventListener('click', () => {
	console.log("Mensaje")
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

/* //Evento para validar formulario
inicio.addEventListener('click', (event)=>{
	const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	if(!reg.test(email)){
		alert("Formato de correo electrónico inválido")
		event.preventDefault();
	}
}) */