(function() {

	  var config = {
	    apiKey: "AIzaSyAIfB5JDqbr5_14oJAJh5IOap6PBemiu0A",
	    authDomain: "papeleria-sucre.firebaseapp.com",
	    databaseURL: "https://papeleria-sucre.firebaseio.com",
	    projectId: "papeleria-sucre",
	    storageBucket: "papeleria-sucre.appspot.com",
	    messagingSenderId: "1075654820216"
	  };
	  firebase.initializeApp(config);

	  // llamamos los elemetos
	  const usuario = document.getElementById("usuario")
	  const clave = document.getElementById("clave")
	  const btnInicioSesion = document.getElementById("btnIniciarSesion")
	  const btnRegistrarse = document.getElementById("btnRegistrarse")
	  const btnCerrarSesion = document.getElementById("btnCerrarSesion")

	  btnInicioSesion.addEventListener("click", function(event) {
	  	/* Act on the event */
	  	const email = usuario.value
	  	const pass = clave.value

		const auth = firebase.auth()

		const promise = auth.signInWithEmailAndPassword(email, pass)

		alert("iniciada la sesión")

		promise.catch(e => alert(e.message))

	  });

	  // Adicionar crear usuario
	  btnRegistrarse.addEventListener('click', e => {
	  	// Colocar código para verificar que se trata de un correo real
	  	// 
	  	// 

	  	const email = usuario.value
	  	const pass = clave.value

		const auth = firebase.auth()

		const promise = auth.createUserInWithEmailAndPassword(email, pass)

		alert("Adicionado nuevo usuario")

		promise.catch(e => alert(e.message))

	  });

	  btnCerrarSesion.addEventListener('click', e => {
	  	firebase.auth().signOut()

	  });

	  // Adicionar Cerrar Listener en tiempo real
	  firebase.auth().onAuthStateChanged( firebaseUser => {
	  	if(firebaseUser) {
	  		console.log(firebaseUser)
	  		btnCerrarSesion.classList.remove('hide')
	  	} else {
	  		console.log("No ha iniciado sesión")
	  		btnCerrarSesion.classList.add('hide')
	  	}

	  });


}());




