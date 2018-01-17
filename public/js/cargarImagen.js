function cargarImagen(event) {


	// Obtener elementos
	var uploader = this.document.getElementById("uploader")
	var fileButton = this.document.getElementById("file-es")

	// Escuchador para boton seleccionar imagen
	fileButton.addEventListener("change", function(event) {
		/* Act on the event */

		// Obtener el archivo
		var file = event.target.files[0]

		// Crear una referencia a Storage
		var storageRef = firebase.storage().ref('imagenes/' + file.name)

		// Cargar el archivo
		var task = storageRef.put(file)

		// Actualizar barra de progreso
		task.on('state_changed',
			function progress(snapshot) {
				var porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				uploader.value = porcentaje
			},

			function error() {

			},

			function complete() {

			}

		);

	});	
}