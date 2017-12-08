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

	// Permisos en Storage
	// Tener en cuenta que para la seguridad se deben autenticar ya sea por una cuenta de Google,  Facebook,  Twitter o similares
	// request.auth!=null
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

	// Obtenemos los datos ingresados por el usuario en la interfaz
	const nombreP 		= $("#nombre-del-producto").val()
	const marcaP 		= $("#marca-del-producto").val()
	const tipoP 		= $("#tipo-del-producto").val()
	const descripcionP 	= $("#descripcion-del-producto").val()
	const medidasP 		= $("#medidas-del-producto").val()
	const cantidadP 	= $("#cantidad-del-producto").val()
	const precioP 		= $("#precio-del-producto").val()


	// Obtenemos la dirección o URL de la ubicación de la imagen subida en Firebase (storage)
	storageRef.child('imagenes/' + nombreImagen).getDownloadURL().then(function(url) {

		refPapeleriaSucreBD.push({
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

	// Limpiamos los datos ingresados por el usuario en el formulario de "Adicionar producto"
	formAdicionarProducto.reset()

	alert('Producto agregado exitosamente')

}

