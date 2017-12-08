var refPapeleriaSucreBD
var formAdicionarProducto


/*
	Se inicializa la aplicación para adicionar un nuevo producto a la Papelería Sucre

	@refPapeleriaSucreBD Variable que almacena la referencia a la base de datos "papeleriabd" desde Firebase

*/
function adicionarProducto() {

	formAdicionarProducto = document.getElementById("form-ingresar-producto")

	formAdicionarProducto.addEventListener("submit", enviarDatosProductoAFirebase, false)

	refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")

	cargarImagen()
}

/* 
	Se encarga de enviar los datos o atributos del producto a la base de datos hospedada en Firebase
	para lo cual usa e método push({objeto}), al cual se le envía el objeto con todos los valores 
	digitados por el usuario y posteriormente almacenados en la base de datos "papeleriabd"

	@event  Se usa para evitar que se recargue los datos y se almacenen repetidamente con .preventDefault()
			Este parámetro es quien contiene todo lo relacionado con los datos ingresados por el usuario en
			el formulario. 
			Haciendo uso del parámetro name="" en la etiqueta <input type="text" name="<nombres-variables>"></input>

*/
function enviarDatosProductoAFirebase(event) {

	event.preventDefault()

	// Obtenemos el nombre de la imagen
	var nombreImagen = $("#file-es")[0].files[0].name

	// Creamos referencia raiz
	var storageRef = firebase.storage().ref()

	// Creamos referencia a la imagen
	// Queda con dirección "gs://......"
	// Ejemplo:  gs://papeleria-sucre.appspot.com/imagenes/cuaderno_scribe.gif
	// var imagenRuta = storageRef.child('imagenes/' + nombreImagen)
	
	// refPapeleriaSucreBD.push({
	// 	nombre: $("#nombre-del-producto").val(),
	// 	marca: $("#marca-del-producto").val(),
	// 	tipo: $("#tipo-del-producto").val(),
	// 	descripcion: $("#descripcion-del-producto").val(),
	// 	medidas: $("#medidas-del-producto").val(),
	// 	cantidad: $("#cantidad-del-producto").val(),
	// 	precio: $("#precio-del-producto").val(),
	// 	imagen: imagenRuta
	// }).catch(function(error){
	// 	alert('Error: No se logró obtener la ubicación de la imagen del producto')
	// });


	const nombreP = $("#nombre-del-producto").val()
	const marcaP = $("#marca-del-producto").val()
	const tipoP = $("#tipo-del-producto").val()
	const descripcionP = $("#descripcion-del-producto").val()
	const medidasP = $("#medidas-del-producto").val()
	const cantidadP = $("#cantidad-del-producto").val()
	const precioP = $("#precio-del-producto").val()


	// Obtenemos la dirección o URL de la ubicación de la imagen subida en Firebase (storage)
	storageRef.child('imagenes/' + nombreImagen).getDownloadURL().then(function(url) {

		refPapeleriaSucreBD.push({
			// nombre: event.target.nombreProducto.value,
			// marca: event.target.marcaProducto.value,
			// tipo: event.target.tipoProducto.value,
			// descripcion: event.target.descripcionProducto.value,
			// medidas: event.target.medidasProducto.value,
			// cantidad: event.target.cantidadProducto.value,
			// precio: event.target.precioProducto.value,

			nombre: nombreP,
			marca: marcaP,
			tipo: tipoP,
			descripcion: descripcionP,
			medidas: medidasP,
			cantidad: cantidadP,
			precio: precioP,
			imagen: url
		});

	}).catch(function(error){
		alert('Error: No se logró obtener la ubicación de la imagen del producto')
	});

	formAdicionarProducto.reset()

	alert('Producto agregado exitosamente')

}

// Obtener elemento boton cargar imagenes: $("#file-es")[0].files[0].name
// Obtener contenido de elemento: $("#file-es")[0]
// Obtener primer imagen $("#file-es")[0].files[0]  
// Obtener nombre de primer imagen:    $("#file-es")[0].files[0].name

