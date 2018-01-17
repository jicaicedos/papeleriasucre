var refPapeleriaSucreBD
var formAdicionarProducto
var keyProductoModificar


// ===========================================================================
function modificarProducto() {

	formAdicionarProducto = document.getElementById("form-modificar-producto")

	formAdicionarProducto.addEventListener("submit", modificarProductoEnFirebase, false)

	refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")

	// Permisos en Storage
	// Tener en cuenta que para la seguridad se deben autenticar ya sea por una cuenta de Google,  Facebook,  Twitter o similares
	// request.auth!=null
	cargarImagen()
}

function modificarProductoEnFirebase(event) {

	event.preventDefault()

	// Creamos referencia al elemento que deseamos actualizar
	var storageRef = firebase.storage().ref()

	// Obtenemos los datos ingresados por el usuario en la interfaz
	// los almacenamos en variables const solo para actualizar cuando se obtiene imagen en "firebase.storage"
	const nombreP 		= $("#nombreProducto").val()
	const marcaP 		= $("#marcaProducto").val()
	const tipoP 		= $("#tipoProducto").val()
	const descripcionP 	= $("#descripcionProducto").val()
	const medidasP 		= $("#medidasProducto").val()
	const cantidadP 	= $("#cantidadProducto").val()
	const precioP 		= $("#precioProducto").val()
	var imagenP = ''
	// const imagenP       = $("#imagenProducto").attr("src")

	// Si el usuario eligió una nueva imagen para el producto entonces se actualizará su URL
	// de lo contrario se almacenará la misma ruta de la imagen ya cargada con anterioridad
	var imagenObjeto = $("#file-es")[0].files[0]
	// Obtenemos el nombre de la imagen
	var nombreImagen = ''
	var actualizar = false

	if( imagenObjeto!=null ) {
		nombreImagen = imagenObjeto.name
		actualizar = true
	} else {
		nombreImagen = $("#imagenProducto").attr("src")
	}

	console.log("nombre imagen: "+nombreImagen)

	if(actualizar) {

		// Obtenemos la dirección o URL de la ubicación de la imagen subida en Firebase (storage)
		storageRef.child('imagenes/' + nombreImagen).getDownloadURL().then(function(url) {	
			
			refPapeleriaSucreBD.child(keyProductoModificar).update({
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

	}
	else {
			refPapeleriaSucreBD.child(keyProductoModificar).update({
				nombre: nombreP,
				marca: marcaP,
				tipo: tipoP,
				descripcion: descripcionP,
				medidas: medidasP,
				cantidad: cantidadP,
				precio: precioP,
				imagen: nombreImagen
			});		
			// alert("El producto fue modificado correctamente!")
			alertify.alert("Papelería Sucre","El producto fue modificado correctamente!")

	}


	// Limpiamos los datos ingresados por el usuario en el formulario de "Adicionar producto"
	formAdicionarProducto.reset()
	$("#btnModificarProducto").hide()
	$("#imagenProducto").attr("src","")

	// Después de realizar la modificación volver a la página de "consultar.html"
	// window.location.replace("../consultar.html")

}

// ===========================================================================
function cargarProductoModificar(event) {

	var keyProducto = this.getAttribute("keyProducto")

	localStorage.setItem('nombre',datos[keyProducto].nombre)
	localStorage.setItem('marca',datos[keyProducto].marca)
	localStorage.setItem('tipo',datos[keyProducto].tipo)
	localStorage.setItem('descripcion',datos[keyProducto].descripcion)
	localStorage.setItem('medidas',datos[keyProducto].medidas)
	localStorage.setItem('cantidad',datos[keyProducto].cantidad)
	localStorage.setItem('precio',datos[keyProducto].precio)
	localStorage.setItem('imagen',datos[keyProducto].imagen)	
	localStorage.setItem('keyProducto',keyProducto)

	window.location.replace("../modificar.html")

}

// ===========================================================================
// 	Llenar los datos obtenidos en la página de consultar productos y llenamos
// 	cada campo en el formulario para modificar datos
function llenarFormulario() {
	$("#nombreProducto").val(localStorage.getItem('nombre'))
	$("#marcaProducto").val(localStorage.getItem('marca'))
	$("#tipoProducto").val(localStorage.getItem('tipo'))
	$("#descripcionProducto").val(localStorage.getItem('descripcion'))
	$("#medidasProducto").val(localStorage.getItem('medidas'))
	$("#cantidadProducto").val(localStorage.getItem('cantidad'))
	$("#precioProducto").val(localStorage.getItem('precio'))	
	$("#imagenProducto").attr("src",localStorage.getItem('imagen'))

	// Obtenemos la llave o clave del producto a Modificar
	keyProductoModificar = localStorage.getItem('keyProducto')

	borrarDatosFormularioModificar()
}

function borrarDatosFormularioModificar() {
	localStorage.clear()	
}
