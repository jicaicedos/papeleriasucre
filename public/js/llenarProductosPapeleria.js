function llenarProductosPapeleria() {

	// Creamos una referencia a la raiz del almacenamiento "storage" de nuestra "app" en firebase
	var refAlmacenamiento = firebase.storage().ref()

	// Creamos una referencia a la imagen a subir
	var imagen = refAlmacenamiento.child("imagenes/audifonos.jpg")

	// Cargar archivo a subir
	var file = new File([""], "../img/audifonos.jpg")

	console.log(file)

	imagen.put(file).then(function(snapshot) {
		console.log("archivo subido...")
	}).catch(function(error) {
		console.log("fallo")
	});
}